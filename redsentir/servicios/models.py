from __future__ import unicode_literals

from django.db import models
from seguridad.models import Perfil,Municipio

class Ips(models.Model):
    municipio = models.ForeignKey(Municipio, on_delete=models.CASCADE)
    telefono = models.CharField(max_length=50,null=True)
    responsables = models.ManyToManyField(Perfil)
    nombre = models.CharField(max_length=100)
    
    def __unicode__(self):
        return u"%s" % self.nombre

class Servicio(models.Model):
    perfil = models.ForeignKey(Perfil, on_delete=models.CASCADE)
    ips = models.ForeignKey(Ips)
    primera_vez = models.BooleanField(default=False)
    nombre = models.CharField(max_length=200)
    identificacion = models.CharField(max_length=200)
    telefono = models.CharField(max_length=200)
    email = models.CharField(max_length=200,null=True)
    fecha = models.DateTimeField(auto_now=True)
    fecha_revision = models.DateTimeField(auto_now=True)
    fecha_cita = models.DateTimeField(null=True,blank=True,default=None)
    observaciones = models.CharField(max_length=200)
    profesional = models.CharField(max_length=200)
    estado = models.CharField(max_length=20,default='activa')
    calificacion = models.IntegerField(default=0)
    observaciones_joven = models.CharField(max_length=200)
    
    def __str__(self):
        return self.perfil.user.username+" | "+self.fecha.strftime("%Y-%m-%d")

class Informacion(models.Model):
    titulo = models.CharField(max_length=50)
    introduccion = models.CharField(max_length=200)
    tema = models.TextField()
    imagen = models.ImageField(upload_to='static/images/foros/', default='static/images/foros/defaultUser.png')
    
    def __unicode__(self):
        return u"%s" % self.titulo