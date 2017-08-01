from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


class Perfil(models.Model):
    user = models.OneToOneField(User,related_name='perfil')
    telefono = models.CharField(max_length=20)
    avatar = models.ImageField(upload_to='static/images/avatar/', default='static/images/avatar/defaultUser.png')
    genero = models.CharField(max_length=20, null=True)
    
    def __str__(self):
        return self.user.username+" | "+self.telefono
