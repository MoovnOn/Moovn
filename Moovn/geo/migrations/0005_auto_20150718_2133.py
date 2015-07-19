# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('geo', '0004_auto_20150718_2113'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='name',
            name='college',
        ),
        migrations.AddField(
            model_name='college',
            name='city',
            field=models.ForeignKey(null=True, to='geo.Name'),
        ),
    ]
