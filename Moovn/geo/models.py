from django.db import models


class NeighborhoodBoundary(models.Model):
    city = models.OneToOneField('City', null=True, related_name='neighborhood')
    data = models.TextField(null=True)


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


class City(models.Model):
    geo_id = models.IntegerField()
    ind_id = models.TextField(default="0")
    ocp_id = models.TextField(default="0")
    price_parity = models.FloatField(null=True)


class College(models.Model):
    city = models.ForeignKey('Name', null=True)
    tuition = models.IntegerField(null=True)
    in_state = models.IntegerField(null=True)
    out_state = models.IntegerField(null=True)
    school = models.CharField(max_length=255)
    rank = models.CharField(max_length=255)


class Bls(models.Model):
    code = models.CharField(max_length=255)
    industry = models.CharField(max_length=255)


class Occupation(models.Model):
    code = models.CharField(max_length=255)
    job = models.CharField(max_length=255)
