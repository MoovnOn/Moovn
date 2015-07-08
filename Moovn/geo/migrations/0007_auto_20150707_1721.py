# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('geo', '0006_auto_20150706_1747'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='housing',
            name='city',
        ),
        migrations.RemoveField(
            model_name='city',
            name='state',
        ),
        migrations.AddField(
            model_name='name',
            name='state',
            field=models.CharField(null=True, max_length=2),
        ),
        migrations.DeleteModel(
            name='Housing',
        ),
    ]
