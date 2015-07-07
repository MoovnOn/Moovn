from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse

from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
#from rest_framework import ViewSets

from geo.models import City, Boundary, Name

@api_view(['GET',])
@permission_classes((permissions.AllowAny,))
def city_boundary_view(request):

    city_name = request.GET.get('name')
    city_state = request.GET.get('state')
    name = get_object_or_404(Name, name=city_name, state=city_state)

    response = HttpResponse(data=name.city.boundary.data)
    response.status_code = 200

    return response
