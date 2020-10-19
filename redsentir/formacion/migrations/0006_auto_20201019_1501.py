# -*- coding: utf-8 -*-
# Generated by Django 1.11.15 on 2020-10-19 20:01
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('formacion', '0005_videos'),
    ]

    operations = [
        migrations.CreateModel(
            name='Podcast',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=100)),
                ('entrevista', models.CharField(blank=True, default=None, max_length=500, null=True)),
            ],
            options={
                'verbose_name_plural': 'Podcast Con-Ciencia Familiar',
            },
        ),
        migrations.RemoveField(
            model_name='videos',
            name='subTitulo',
        ),
        migrations.AlterField(
            model_name='videos',
            name='titulo',
            field=models.CharField(max_length=100),
        ),
    ]
