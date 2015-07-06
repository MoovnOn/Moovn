from django.db import models


class NeighborhoodBoundary(models.Model):
    pass


class SchoolDistrictBoundary(models.Model):
    pass


class Boundary(models.Model):
    pass


class Names(models.Model):
    pass


class Housing(models.Model):
    city = models.ForeignKey('City')
    onebrprice = models.IntegerField()
    twobrprice = models.IntegerField()
    threebrprice = models.IntegerField()

class Schools(models.Model):
    city = models.ForeignKey('City')
    name = models.CharField(max_length=255)
    rating = models.IntegerField()


# class IndustryData(models.Model):
#     city = models.ForeignKey('City')

class City(models.Model):
    geo_id = models.IntegerField()
    state = models.CharField(max_length=2)
    boundary = models.OneToOneField('Boundary')
    names = models.ForeignKey('Names')
