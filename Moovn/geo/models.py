from django.db import models


class NeighborhoodBoundary(models.Model):
    pass

class SchoolDistrictBoundary(models.Model):
    pass


class Boundary(models.Model):
    pass


class Names(models.Model):

class City(models.Model):
    name = models.CharField(max_length=255)
    state = models.CharField(max_length=2)
    boundary = models.OneToOneField('Boundary')
    names = models.ForeignKey('names')
