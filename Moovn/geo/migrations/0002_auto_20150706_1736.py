# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('geo', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='name',
            name='city',
            field=models.ForeignKey(null=True, related_name='names', to='geo.City'),
        ),
    ]
