from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse

from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
#from rest_framework import ViewSets

from geo.models import City, Boundary, Name

@api_view(['GET',])
@permission_classes((permissions.AllowAny,))
def city_boundary_view(request, state, name):

    name = get_object_or_404(Name, name=name, state=state)
    response = JsonResponse(name.city.boundary.data)
    
    return response
