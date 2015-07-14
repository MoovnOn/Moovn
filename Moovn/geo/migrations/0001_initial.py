# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Boundary',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', serialize=False, auto_created=True)),
                ('data', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', serialize=False, auto_created=True)),
                ('geo_id', models.IntegerField()),
                ('ind_id', models.TextField(default='0')),
                ('ocp_id', models.TextField(default='0')),
            ],
        ),
        migrations.CreateModel(
            name='Name',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', serialize=False, auto_created=True)),
                ('name', models.CharField(max_length=255)),
                ('state', models.CharField(null=True, max_length=2)),
                ('city', models.ForeignKey(null=True, related_name='names', to='geo.City')),
            ],
        ),
        migrations.CreateModel(
            name='NeighborhoodBoundary',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', serialize=False, auto_created=True)),
                ('data', models.TextField(null=True)),
                ('city', models.OneToOneField(null=True, related_name='neighborhood', to='geo.City')),
            ],
        ),
        migrations.CreateModel(
            name='Schools',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', serialize=False, auto_created=True)),
                ('name', models.CharField(max_length=255)),
                ('rating', models.IntegerField()),
                ('city', models.ForeignKey(to='geo.City')),
            ],
        ),
        migrations.AddField(
            model_name='boundary',
            name='city',
            field=models.OneToOneField(null=True, related_name='boundary', to='geo.City'),
        ),
    ]
