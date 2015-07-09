from Moovn.moovn_apis import apis
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.views.generic import View
import requests
import geojson
import json
# pandas as pd


from rest_framework import permissions
# from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
# from rest_framework import ViewSets

from geo.models import City, Boundary, Name
import xmltodict
import json

with open('geo/bls_industry.csv') as file:
    industry = {
        line.split(',')[1][:-1]: line.split(',')[0] for line in file
        }

# @api_view(['GET',])
# @permission_classes((permissions.AllowAny,))
def city_boundary_view(request, state, name):
    name = get_object_or_404(Name, name=name, state=state)
    return JsonResponse(geojson.loads(name.city.boundary.data))


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
        collection.extend(geojson.loads(x).features)

    collection = geojson.FeatureCollection(collection)
    return JsonResponse(collection)


# def school_view(request, state, name):
#     districts = requests.get(
#         "http://api.education.com/service/service.php?f=districtSearch&key=" \
#         <YourAPIKey>"&sn=sf&v=4" + "&State=" + state + "&City=" + name \
#         "&Resf=" + "json")
#     # the registration wants client computer IP address...
#     # what?

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
        if val != "gov" and val != "totl_p" and val != "total":
            datadict[val] = \
                round(
                    ((float(datadict[val]) / (float((datadict["gov"])) + float(datadict["totl_p"]))) * 100), ndigits=1)
    response = JsonResponse(datadict)
    # response = HttpResponse(ind_data)

    return response
