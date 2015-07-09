from django.db import models


class NeighborhoodBoundary(models.Model):
    name = models.CharField(max_length=255, null=True)
    region_id = models.IntegerField(null=True)
    city = models.ForeignKey('City', null=True)
    data = models.TextField(null=True)


class SchoolDistrictBoundary(models.Model):
    pass


class Boundary(models.Model):
    city = models.OneToOneField('City', related_name='boundary', null=True)
    data = models.TextField()


class Name(models.Model):
    name = models.CharField(max_length=255)
    state = models.CharField(max_length=2, null=True)
    city = models.ForeignKey('City', related_name='names', null=True)


class Schools(models.Model):
    city = models.ForeignKey('City')
    name = models.CharField(max_length=255)
    rating = models.IntegerField()


# class IndustryData(models.Model):
#     city = models.ForeignKey('City')

class City(models.Model):
    geo_id = models.IntegerField()
    ind_id = models.TextField(default="0")

