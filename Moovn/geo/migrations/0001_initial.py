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
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('geo_id', models.IntegerField()),
                ('ind_id', models.TextField(default='0')),
                ('ocp_id', models.TextField(default='0')),
            ],
        ),
        migrations.CreateModel(
            name='Name',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('state', models.CharField(null=True, max_length=2)),
                ('city', models.ForeignKey(to='geo.City', related_name='names', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='NeighborhoodBoundary',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(null=True, max_length=255)),
                ('region_id', models.IntegerField(null=True)),
                ('data', models.TextField(null=True)),
                ('city', models.ForeignKey(to='geo.City', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='SchoolDistrictBoundary',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Schools',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('rating', models.IntegerField()),
                ('city', models.ForeignKey(to='geo.City')),
            ],
        ),
        migrations.AddField(
            model_name='boundary',
            name='city',
            field=models.OneToOneField(to='geo.City', related_name='boundary', null=True),
        ),
    ]
