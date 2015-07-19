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
                ('id', models.AutoField(verbose_name='ID', auto_created=True, primary_key=True, serialize=False)),
                ('code', models.CharField(max_length=255)),
                ('industry', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Boundary',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, primary_key=True, serialize=False)),
                ('data', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, primary_key=True, serialize=False)),
                ('geo_id', models.IntegerField()),
                ('ind_id', models.TextField(default='0')),
                ('ocp_id', models.TextField(default='0')),
                ('price_parity', models.FloatField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='College',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, primary_key=True, serialize=False)),
                ('tuition', models.IntegerField(null=True)),
                ('in_state', models.IntegerField(null=True)),
                ('out_state', models.IntegerField(null=True)),
                ('school', models.CharField(max_length=255)),
                ('rank', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Name',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('state', models.CharField(max_length=2, null=True)),
                ('city', models.ForeignKey(related_name='names', to='geo.City', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='NeighborhoodBoundary',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, primary_key=True, serialize=False)),
                ('data', models.TextField(null=True)),
                ('city', models.OneToOneField(related_name='neighborhood', to='geo.City', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Occupation',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, primary_key=True, serialize=False)),
                ('code', models.CharField(max_length=255)),
                ('job', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Schools',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('rating', models.IntegerField()),
                ('city', models.ForeignKey(to='geo.City')),
            ],
        ),
        migrations.AddField(
            model_name='college',
            name='city',
            field=models.ForeignKey(to='geo.Name', null=True),
        ),
        migrations.AddField(
            model_name='boundary',
            name='city',
            field=models.OneToOneField(related_name='boundary', to='geo.City', null=True),
        ),
    ]
