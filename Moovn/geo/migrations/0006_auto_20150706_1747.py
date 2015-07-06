# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('geo', '0005_auto_20150706_1743'),
    ]

    operations = [
        migrations.AlterField(
            model_name='boundary',
            name='city',
            field=models.OneToOneField(null=True, to='geo.City', related_name='boundary'),
        ),
    ]
