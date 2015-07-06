# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('geo', '0004_auto_20150706_1742'),
    ]

    operations = [
        migrations.AlterField(
            model_name='boundary',
            name='city',
            field=models.OneToOneField(related_name='boundary', to='geo.City'),
        ),
    ]
