# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('geo', '0003_auto_20150706_1741'),
    ]

    operations = [
        migrations.AlterField(
            model_name='boundary',
            name='city',
            field=models.OneToOneField(to='geo.City'),
        ),
    ]
