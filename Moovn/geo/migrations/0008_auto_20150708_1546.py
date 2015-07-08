# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('geo', '0007_auto_20150707_1721'),
    ]

    operations = [
        migrations.AddField(
            model_name='neighborhoodboundary',
            name='city',
            field=models.ForeignKey(to='geo.City', null=True),
        ),
        migrations.AddField(
            model_name='neighborhoodboundary',
            name='data',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='neighborhoodboundary',
            name='name',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='neighborhoodboundary',
            name='region_id',
            field=models.IntegerField(null=True),
        ),
    ]
