# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('geo', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='College',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID', auto_created=True)),
                ('amount_is', models.IntegerField(null=True)),
                ('amount_os', models.IntegerField(null=True)),
                ('name', models.TextField()),
            ],
        ),
        migrations.AddField(
            model_name='city',
            name='price_parity',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='college',
            name='city',
            field=models.ForeignKey(to='geo.City', null=True),
        ),
    ]
