from django.shortcuts import render
from rest_framework import ViewSets

from geo.models import 

class BoundaryViewSet(ViewSets.ModelViewSet):
    model = Boundary
