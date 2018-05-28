from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

class Publicacion(models.Model):
    contenido = models.CharField(max_length=1000, null=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now=True)
    me_gusta = models.IntegerField(default=0)
    comentarios = models.IntegerField(default=0)
    num_img = models.IntegerField(default=0)
    
    def __unicode__(self):
        return u"%s" % self.contenido

class MultiMedia(models.Model):
    archivo = models.FileField(upload_to='static/images/publicaciones')
    tipo = models.CharField(max_length=10)
    publicacion = models.ForeignKey(Publicacion, on_delete=models.CASCADE)

class ComentarioP(models.Model):
    publicacion = models.ForeignKey(Publicacion, on_delete=models.CASCADE)
    contenido = models.CharField(max_length=1000, null=True)
    imagen = models.ImageField(upload_to='static/images/publicaciones', null=True, default=None)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now=True)
    me_gusta = models.IntegerField(default=0)
    
    def __unicode__(self):
        return u"%s" % self.contenido