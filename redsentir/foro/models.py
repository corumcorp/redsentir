from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


class Foro(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    introduccion = models.CharField(max_length=20)
    tema = models.CharField(max_length=200)
    imagen = models.ImageField(upload_to='static/images/foros/', default='static/images/foros/defaultUser.png')
    
    def __unicode__(self):
        return u"%s" % self.tema

class Comentario(models.Model):
    fecha = models.DateTimeField(auto_now=True)
    foro = models.ForeignKey(Foro, on_delete=models.CASCADE)
    mensaje = models.CharField(max_length=200)
    usuario = models.ForeignKey(User, null=True,default=None)    

    def __unicode__(self):
        return u"%s" % self.mensaje
