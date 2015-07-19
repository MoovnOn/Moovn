# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('geo', '0003_auto_20150718_2054'),
    ]

    operations = [
        migrations.RenameField(
            model_name='college',
            old_name='name',
            new_name='school',
        ),
        migrations.RemoveField(
            model_name='college',
            name='city',
        ),
        migrations.AddField(
            model_name='name',
            name='college',
            field=models.ForeignKey(null=True, to='geo.College'),
        ),
    ]
