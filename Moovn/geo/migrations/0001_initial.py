# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bls',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('code', models.CharField(max_length=255)),
                ('industry', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Boundary',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('data', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('geo_id', models.IntegerField()),
                ('ind_id', models.TextField(default='0')),
                ('ocp_id', models.TextField(default='0')),
                ('price_parity', models.FloatField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='College',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('tuition', models.CharField(null=True, max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('rank', models.CharField(max_length=255)),
                ('city', models.ForeignKey(null=True, to='geo.City')),
            ],
        ),
        migrations.CreateModel(
            name='Name',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('state', models.CharField(null=True, max_length=2)),
                ('city', models.ForeignKey(null=True, to='geo.City', related_name='names')),
            ],
        ),
        migrations.CreateModel(
            name='NeighborhoodBoundary',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('data', models.TextField(null=True)),
                ('city', models.OneToOneField(null=True, to='geo.City', related_name='neighborhood')),
            ],
        ),
        migrations.CreateModel(
            name='Occupation',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('code', models.CharField(max_length=255)),
                ('job', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Schools',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('rating', models.IntegerField()),
                ('city', models.ForeignKey(to='geo.City')),
            ],
        ),
        migrations.AddField(
            model_name='boundary',
            name='city',
            field=models.OneToOneField(null=True, to='geo.City', related_name='boundary'),
        ),
    ]
