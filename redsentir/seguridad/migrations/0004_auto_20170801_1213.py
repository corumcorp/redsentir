# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-08-01 17:13
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('seguridad', '0003_auto_20170724_1814'),
    ]

    operations = [
        migrations.AlterField(
            model_name='perfil',
            name='avatar',
            field=models.ImageField(default='static/img/avatar/defaultUser.png', upload_to='static/img/avatar/'),
        ),
        migrations.AlterField(
            model_name='perfil',
            name='genero',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
