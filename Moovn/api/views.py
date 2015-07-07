from Moovn.moovn_apis import apis
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.views.generic import View
import requests
import geojson
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
#from rest_framework import ViewSets

from geo.models import City, Boundary, Name
import xmltodict


# @api_view(['GET',])
# @permission_classes((permissions.AllowAny,))
def city_boundary_view(request, state, name):

    name = get_object_or_404(Name, name=name, state=state)
    response = JsonResponse(geojson.loads(name.city.boundary.data))

    return response


class HomeView(View):

    def get(self, request, state, city):
        payload = {"zws-id": apis("zillowkey"), "state": state, "city": city}
        housing_data = requests.get("http://www.zillow.com/webservice/GetDemographics.htm", params=payload)
        housing_data = xmltodict.parse(housing_data.text, xml_attribs=True)
        response = JsonResponse(housing_data)

        return response


# @api_view(['GET',])
# @permission_classes((permissions.AllowAny,))
def cell_view(request, state, name):
    query = state + '+' + name
    coords = requests.get("http://api.tiles.mapbox.com/v4/geocode/mapbox.places/" \
                         + query +".json?access_token=" + apis('mapbox'))

    signal = requests.get("http://api.opensignal.com/v2/networkstats.json?lat=" \
                + coords[0] + "&lng=" + coords[1] \
                + "&distance=" + 10 \
                #+ "&network_type=" + {network_type} +
                + "&json_format=" + 2 # 2 is suggested \
                + "&apikey=" + apis('opensignal'))

    return JsonResponse(signal)
