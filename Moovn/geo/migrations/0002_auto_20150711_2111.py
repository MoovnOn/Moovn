# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('geo', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='neighborhoodboundary',
            name='name',
        ),
        migrations.RemoveField(
            model_name='neighborhoodboundary',
            name='region_id',
        ),
        migrations.AlterField(
            model_name='neighborhoodboundary',
            name='city',
            field=models.OneToOneField(to='geo.City', null=True, related_name='neighborhood'),
        ),
    ]
