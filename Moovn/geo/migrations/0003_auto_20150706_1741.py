# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('geo', '0002_auto_20150706_1736'),
    ]

    operations = [
        migrations.RenameField(
            model_name='boundary',
            old_name='boundary',
            new_name='data',
        ),
    ]
