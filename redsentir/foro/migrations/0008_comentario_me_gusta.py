# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-10-27 17:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('foro', '0007_auto_20171027_1122'),
    ]

    operations = [
        migrations.AddField(
            model_name='comentario',
            name='me_gusta',
            field=models.IntegerField(default=0),
        ),
    ]
