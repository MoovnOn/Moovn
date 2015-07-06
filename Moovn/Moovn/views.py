from django.shortcuts import render, redirect
from django.views.generic import View

from geo.models import Name

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
                       'cities':names,
                       }

            return render(request, 'index.html', context)
