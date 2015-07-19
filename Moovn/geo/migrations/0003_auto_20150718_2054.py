# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('geo', '0002_auto_20150718_2013'),
    ]

    operations = [
        migrations.AlterField(
            model_name='college',
            name='city',
            field=models.ForeignKey(null=True, to='geo.Name'),
        ),
    ]
