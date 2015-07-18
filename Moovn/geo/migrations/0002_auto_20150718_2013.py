# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('geo', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='college',
            name='in_state',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='college',
            name='out_state',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='college',
            name='tuition',
            field=models.IntegerField(null=True),
        ),
    ]
