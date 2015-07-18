from Moovn.moovn_apis import apis
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.views.generic import View
import requests
import requests_cache
import geojson
import json

from rest_framework import permissions
from rest_framework.response import Response

from rest_framework.decorators import api_view, permission_classes

from geo.models import City, Boundary, Name, NeighborhoodBoundary
import xmltodict
import json

requests_cache.install_cache('cache', expire_after=18000)

try:
    with open('geo/all_bls_codes.csv') as file:
        industry = {
                line.split(',')[1][:-1]: line.split(',')[0] for line in file}
except:
    with open('Moovn/geo/all_bls_codes.csv') as file:
        industry = {
                line.split(',')[1][:-1]: line.split(',')[0] for line in file}
try:
    with open('geo/oe_ocup.csv') as file:
        occupations = {
                line.split(',', 1)[0].rstrip('\n'):
                line.split(',', 1)[1].strip().replace('"', '') for line in file}
except:
    with open('Moovn/geo/oe_ocup.csv') as file:
        occupations = {
            line.split(',', 1)[0].rstrip('\n'):
            line.split(',', 1)[1].strip().replace('"', '') for line in file}

try:
    with open("geo/colleges.csv") as file:
        colleges = {line.split(',')[1]: {
                        "rank": line.split(',')[0],
                        "tuition": line.split(',')[2].strip('$'),
                        "city": line.split(',')[3],
                        "state": line.split(',')[4].strip()
                                         } for line in file}
except:
    with open("Moovn/geo/colleges.csv") as file:
        colleges = {line.split(',')[1]: {
                        "rank": line.split(',')[0],
                        "tuition": line.split(',')[2].strip('$'),
                        "city": line.split(',')[3],
                        "state": line.split(',')[4].strip()
                                         } for line in file}

try:
    parity = {}
    with open("geo/price_parity.csv") as file:
        for line in file:
            parity[line.split(',')[0].strip('"')] = {
                        "state": line.split(',')[1].strip('"').strip(),
                        "score": line.split(',')[2].strip('\n')}

except:
    parity = {}
    with open("Moovn/geo/price_parity.csv") as file:
        for line in file:
            parity[line.split(',')[0].strip('"')] = {
                            "state": line.split(',')[1].strip('"').strip(),
                            "score": line.split(',')[2].strip('\n')}


def city_boundary_view(request, state, name):
    name_obj = get_object_or_404(Name, name=name, state=state)
    if name == 'US':
        return JsonResponse(json.loads(name_obj.city.boundary.data))
    return JsonResponse(geojson.loads(name_obj.city.boundary.data))


class HomeView(View):
    def get(self, request, state, city):
        payload = {"zws-id": apis("zillowkey"), "state": state, "city": city}
        housing_data = requests.get("""http://www.zillow.com/
                                    webservice/GetDemographics.htm""",
                                    params=payload)
        housing_data = xmltodict.parse(housing_data.text, xml_attribs=True)
        return JsonResponse(housing_data)


def cell_view(request, state, name):
    query = state + '+' + name
    places = requests.get("""http://api.tiles.mapbox.com/v4/
                          geocode/mapbox.places/""" + query + \
                          ".json?access_token=" + apis('mapbox'))

    places = geojson.loads(places.text)
    coords = [places.features[0].center[0], places.features[0].center[1]]

    signal = requests.get("http://api.opensignal.com/v2/networkstats.json?lat="\
                          + str(coords[1]) + "&lng=" + str(coords[0]) \
                          + "&distance=" + "10" \
                          # + "&network_type=" + {network_type} +
                          + "&json_format=" + "2"  # 2 is suggested \
                          + "&apikey=" + apis('opensignal'))

    signal = json.loads(signal.text)
    return JsonResponse(signal)


def neighborhood_view(request, state, name):
    name = get_object_or_404(Name, name=name, state=state)

    if NeighborhoodBoundary.objects.filter(city=name.city).exists():
        boundaries = json.loads(name.city.neighborhood.data)
        return JsonResponse(boundaries)

    else:
        response = HttpResponse()
        response.status_code = 404
        return HttpResponse()


def neighborhooddata_view(request, state, name, region_id=None):
    if region_id:
        request = requests.get("""http://www.zillow.com/webservice/
                               GetDemographics.htm?""" \
                               + "zws-id=" + apis('zillowkey') \
                               + "&state=" + state \
                               + "&city=" + name
                               + "&regionid=" + region_id)
    else:
        request = requests.get("""http://www.zillow.com/webservice/
                               GetDemographics.htm?""" \
                               + "zws-id=" + apis('zillowkey') \
                               + "&state=" + state \
                               + "&city=" + name)

    return JsonResponse(xmltodict.parse(request.text))


def school_districts_view(request, state, name):
    city = name.replace('-', '_')
    city = city.replace(' ', '-')

    districts = requests.get(
        "http://api.greatschools.org/districts/" +
        state + '/' +
        city + '/' +
        "?key=" + apis("greatschools"))

    return JsonResponse(xmltodict.parse(districts.text))


def school_view(request, state, gsid):
    data = requests.get("http://api.greatschools.org/schools/" + state \
                        + "/" + gsid
                        + "?key=" + apis('greatschools'))

    return JsonResponse(xmltodict.parse(data.text))


def nearby_schools_view(request, state):
    lat = request.GET.get('lat')
    lon = request.GET.get('lon')

    data = requests.get("http://api.greatschools.org/schools/nearby?key=" +
                        apis('greatschools') + "&state=" + state +
                        "&lat=" + lat + "&lon=" + lon)

    returndata = xmltodict.parse(data.text)
    returndata['lat'] = lat
    returndata['lon'] = lon

    return JsonResponse(returndata)  # xmltodict.parse(data.text))


def industry_view(request, state, name):
    name = get_object_or_404(Name, name=name, state=state)
    seriesids = name.city.ind_id.split(',')
    headers = {'Content-type': 'application/json'}
    data = json.dumps({"seriesid": seriesids,
                       "startyear": "2015", "endyear": "2015",
                       "registrationKey": apis("blskey"),
                       })
    ind_data = requests.post('http://api.bls.gov/publicAPI/v2/timeseries/data/',
                             data=data, headers=headers)

    ndata = json.loads(ind_data.text)
    datadict = {}
    if len(ndata["Results"]["series"]) == 0:
        response = HttpResponse(print("no data"))
        return response
    else:
        for line in ndata["Results"]["series"]:
            for name in industry:
                if industry[name] == line["seriesID"][10:-2] and \
                   len(line["data"]) > 0:

                    datadict[name] = line["data"][0]["value"]

    for val in datadict:
        if val != "Total Nonfarm" and val != "Total Private" and \
           val != "Government":

            datadict[val] = round(100 * float(datadict[val]) /  \
                                  float(datadict["Total Nonfarm"]), ndigits=1)

    datadict['Gov'] = str(round(float(datadict["Total Nonfarm"]) - \
                                float(datadict["Total Private"]), ndigits=1))

    return JsonResponse(datadict)

def salary_view(request, state, name, job):

    name = get_object_or_404(Name, name=name, state=state)
    jobtitle = job.title()
    locids = name.city.ocp_id.split(',')
    seriesids = []

    for series in locids:
        for line in occupations:
            if jobtitle == occupations[line]:
                for item in range(11, 16):
                    seriesids.append(series + line + str(item))

    headers = {'Content-type': 'application/json'}
    data = json.dumps({"seriesid": seriesids,
                       "startyear": "2014", "endyear": "2014",
                       "registrationKey": apis("blskey"),
                       })

    ocp_data = requests.post('http://api.bls.gov/publicAPI/v2/timeseries/data/',
                             data=data, headers=headers)
    ndata = json.loads(ocp_data.text)
    datadict = {}
    typecodes = {"11": "10th", "12": "25th", "13": "50th", "14": "75th",
                 "15": "90th"}

    if not ndata["Results"] or not ndata["Results"]["series"]:
        response = HttpResponse("no data")
        return response

    else:
        for line in ndata["Results"]["series"]:
            for job in occupations:
                if job == line['seriesID'][17:-2] and len(line["data"]) > 0:
                    datadict[occupations[job] \
                    + typecodes[str(line['seriesID'][-2:])]] = \
                    line["data"][0]["value"]

    for value in datadict:
        if datadict[value] == "-":
            response = HttpResponse("no data")
            return response

    return JsonResponse(datadict)


main_ind = [str(num) for num in range(110000, 530000, 20000)]

def industry_size_view(request, state, name):

    name = get_object_or_404(Name, name=name, state=state)
    locid = name.city.ocp_id.split(',')[0][4:11]
    seriesids = [("OEUM" + locid + "000000" + ocup + "01") for ocup in main_ind]
    seriesids += [("OEUM" + locid + "000000" + "000000" + "01")]
    headers = {'Content-type': 'application/json'}

    data = json.dumps({"seriesid": seriesids,
                       "startyear": "2014", "endyear": "2014",
                       "registrationKey": apis("blskey"),
                       })

    ocp_data = requests.post('http://api.bls.gov/publicAPI/v2/timeseries/data/',
                             data=data, headers=headers)
    ndata = json.loads(ocp_data.text)
    datadict = {}

    if not ndata["Results"] or not ndata["Results"]["series"]:
        response = HttpResponse("no data")
        return response

    else:
        for line in ndata["Results"]["series"]:
            for job in occupations:
                if job == line['seriesID'][17:-2] and len(line["data"]) > 0:
                    datadict[occupations[job]] = line["data"][0]["value"]

    allind = datadict["All"]
    datadict.pop("All", None)

    for ind in datadict:
        datadict[ind] = round(100 * float(datadict[ind]) / float(allind), 2)

    return JsonResponse(datadict)


def college_view(request, state, name):

    name = get_object_or_404(Name, name=name, state=state)
    selected = {"colleges": ""}
    college_list = []

    for college in colleges:
        if name.name in colleges[college]["city"] and name.state in \
           colleges[college]["state"]:

            college_list.append({college: colleges[college]})

    selected["colleges"] = college_list

    return JsonResponse(selected)


def parity_view(request, state, name):

    name = get_object_or_404(Name, name=name, state=state)
    data = "no data"

    for city in parity:
        if name.name in city and name.state in parity[city]["state"]:
            data = parity[city]["score"]

    if float(data) <= 100:
        new_data = round((100 - float(data)), 1)
        string = """Cost of living in {} is {}% lower than the national
                 average.""".format(name.name, new_data)

        return HttpResponse(string)

    else:
        new_data = round((float(data) - 100))
        string = """Cost of living in {} is {}% higher than the national
                 average.""".format(name.name, new_data)

        return HttpResponse(string)
