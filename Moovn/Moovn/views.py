import json
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views.generic import View
from moovn_apis import apis
from geo.models import Name
import requests
import xmltodict


class IndexView(View):
    city_names = list(Name.objects.all())

    def get(self, request):

        # If they searched for a city:
        if request.GET.get('city'):
            # If the city is in the database:
            if city_names.filter(name=request.GET.get('city')).exists():
                city_name = city_names.get(name=request.GET.get('city'))
                return redirect('?geoid=' + str(city_name.city.geo_id))

        else:
            names = [item.name for item in self.city_names]
            context = {
                'cities': names,
            }

            return render(request, 'index.html', context)


class HomeView(View):

    def get(self, request):
        payload = {"zws-id": apis("zillowkey"), "state": request.GET.get('state'), "city": request.GET.get('city')}
        housing_data = requests.get("http://www.zillow.com/webservice/GetDemographics.htm", params=payload)
        housing_data = xmltodict.parse(housing_data, xml_attribs=True)
        housing_data = json.dumps(housing_data, indent=4)
        housing_data = json.loads(housing_data)

        response = HttpResponse(data=housing_data)
        response.status_code = 200

        return response
