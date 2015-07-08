# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('geo', '0008_auto_20150708_1546'),
    ]

    operations = [
        migrations.AddField(
            model_name='city',
            name='ind_id',
            field=models.IntegerField(default=0),
        ),
    ]
