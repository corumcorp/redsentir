from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


class Foro(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=50)
    introduccion = models.CharField(max_length=200)
    tema = models.TextField()
    imagen = models.ImageField(upload_to='static/images/foros/', default='static/images/foros/defaultUser.png')
    
    def __unicode__(self):
        return u"%s" % self.titulo
    
    class Meta:
        permissions = (
            ("recibe_notificaciones", "recibe_notificaciones"),
        )

class Comentario(models.Model):
    fecha = models.DateTimeField(auto_now=True)
    foro = models.ForeignKey(Foro, on_delete=models.CASCADE)
    mensaje = models.CharField(max_length=200)
    usuario = models.ForeignKey(User, null=True,default=None)
    me_gusta = models.IntegerField(default=0)
    respuestas = models.IntegerField(default=0)

    def __unicode__(self):
        return u"%s" % self.mensaje

class Respuesta(models.Model):
    fecha = models.DateTimeField(auto_now=True)
    comentario = models.ForeignKey(Comentario)
    mensaje = models.CharField(max_length=200)
    usuario = models.ForeignKey(User, null=True,default=None)
    me_gusta = models.IntegerField(default=0)

    def __unicode__(self):
        return u"%s" % self.mensaje
