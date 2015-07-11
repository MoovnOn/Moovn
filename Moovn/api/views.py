from Moovn.moovn_apis import apis
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.views.generic import View
from ipware.ip import get_ip, get_real_ip
import requests
import geojson
import json
#pandas as pd

from rest_framework import permissions
from rest_framework.response import Response

from rest_framework.decorators import api_view, permission_classes

from geo.models import City, Boundary, Name
import xmltodict
import json


# with open('geo/bls_industry.csv') as file:
try:
    with open('geo/all_bls_codes.csv') as file:
        industry = {
            line.split(',')[1][:-1]: line.split(',')[0] for line in file
            }
except:
    with open('Moovn/geo/all_bls_codes.csv') as file:
        industry = {
            line.split(',')[1][:-1]: line.split(',')[0] for line in file
        }

# @api_view(['GET',])
# @permission_classes((permissions.AllowAny,))
def city_boundary_view(request, state, name):
    name_obj = get_object_or_404(Name, name=name, state=state)
    if name == 'US':
        return JsonResponse(json.loads(name_obj.city.boundary.data))
    return JsonResponse(geojson.loads(name_obj.city.boundary.data))


class HomeView(View):
    def get(self, request, state, city):
        payload = {"zws-id": apis("zillowkey"), "state": state, "city": city}
        housing_data = requests.get("http://www.zillow.com/webservice/GetDemographics.htm", params=payload)
        housing_data = xmltodict.parse(housing_data.text, xml_attribs=True)
        return JsonResponse(housing_data)


@api_view(['GET', ])
# @permission_classes((permissions.AllowAny,))
def cell_view(request, state, name):
    query = state + '+' + name
    places = requests.get("http://api.tiles.mapbox.com/v4/geocode/mapbox.places/" \
                          + query + ".json?access_token=" + apis('mapbox'))

    places = geojson.loads(places.text)
    coords = [places.features[0].center[0], places.features[0].center[1]]

    signal = requests.get("http://api.opensignal.com/v2/networkstats.json?lat=" \
                          + str(coords[1]) + "&lng=" + str(coords[0]) \
                          + "&distance=" + "10" \
                          # + "&network_type=" + {network_type} +
                          + "&json_format=" + "2"  # 2 is suggested \
                          + "&apikey=" + apis('opensignal'))

    signal = json.loads(signal.text)
    return JsonResponse(signal)


def neighborhood_view(request, state, name):
    name = get_object_or_404(Name, name=name, state=state)
    boundaryset = list(name.city.neighborhoodboundary_set.all())

    collection = []
    for x in boundaryset:
        collection.extend(geojson.loads(x.data).features)

    collection = geojson.FeatureCollection(collection)
    return JsonResponse(collection)


def neighborhooddata_view(request, state, name, region_id=None):
    if region_id:
        request = requests.get("http://www.zillow.com/webservice/GetDemographics.htm?" \
                               + "zws-id=" + apis('zillowkey') \
                               + "&state=" + state \
                               + "&city=" + name
                               + "&regionid=" + region_id)
    else:
        request = requests.get("http://www.zillow.com/webservice/GetDemographics.htm?" \
                               + "zws-id=" + apis('zillowkey') \
                               + "&state=" + state \
                               + "&city=" + name)

    return JsonResponse(xmltodict.parse(request.text))


def school_view(request, state, name):
    districts = requests.get(
        "http://api.education.com/service/service.php?f=districtSearch&key=" \
        + moovn_apis('education.com') + "&sn=sf&v=4" \
        + "&State=" + state \
        + "&City=" + name \
        + "&Resf=" + "json")


def industry_view(request, state, name):
    name = get_object_or_404(Name, name=name, state=state)
    seriesids = name.city.ind_id.split(',')
    headers = {'Content-type': 'application/json'}
    data = json.dumps({"seriesid": seriesids,
                       "startyear": "2015", "endyear": "2015",
                       "registrationKey": apis("blskey"),
                       })
    ind_data = requests.post('http://api.bls.gov/publicAPI/v2/timeseries/data/', data=data, headers=headers)
    ndata = json.loads(ind_data.text)
    datadict = {}
    if len(ndata["Results"]["series"]) == 0:
        response = HttpResponse(print("no data"))
        return response
    else:
        for line in ndata["Results"]["series"]:
            for name in industry:
                if industry[name] == line["seriesID"][10:-2] and len(line["data"]) > 0:
                    datadict[name] = line["data"][0]["value"]

    for val in datadict:
        if val != "Total Nonfarm" and val != "Total Private" and val != "Government":
            datadict[val] = \
                round(
                    ((float(datadict[val]) / float(datadict["Total Nonfarm"])) * 100), ndigits=1)
    datadict['Gov'] = str(round((float(datadict["Total Nonfarm"]) - float(datadict["Total Private"])), ndigits=1))
    response = JsonResponse(datadict)
    # response = HttpResponse(ind_data)

    return response


jcdata = "1,2,3,4,5,6,7,8,9,10," \
         "11,12,13,14,15,16,17,18,19,20," \
         "21,22,23,24,25,26,27,28,29,30," \
         "31,32"


def jobs_view(request, state, name):
    # ip = get_real_ip(request)
    ip = request.META.get("REMOTE_ADDR")
    # browser = request.user_agent.browser
    browser = request.META.get("HTTP_USER_AGENT")
    headers = {"user-agent": browser}
    if ip is not None:
        # # name = get_object_or_404(Name, name=name, state=state)
        # data = json.dumps({"v": "1.1",
        #                    "format": "json",
        #                    "t.p": apis("glass_tp"),
        #                    "t.k": apis("glass_tk"),
        #                    "userip": ip,
        #                    "useragent": browser,
        #                    "action": "jobs-stats",
        #                    # "l": "city",
        #                    # "city": name.name,
        #                    # "city": "Denver",
        #                    # "state": name.state,
        #                    # "state": "CO",
        #                    # "fromAge": "30",
        #                    # "radius": "25",
        #                    # "jc": jcdata,
        #                    # "returnJobTitles": True,
        #                    "returnStates": True,
        #                    "admLevelRequested": "1"
        #                    })
        # gldata = requests.get('http://api.glassdoor.com/api/api.htm', data=data, headers=headers)
        # response = HttpResponse(gldata)
        # return response
        return HttpResponse("IP: {}, User-Agent: {}".format(ip, browser))
    else:
        return HttpResponse("No ip didn't work")
