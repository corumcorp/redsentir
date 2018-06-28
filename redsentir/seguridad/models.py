from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


class Municipio(models.Model):
    nombre = models.CharField(max_length=20)
    imagen_mapa = models.ImageField(upload_to='static/images/mesa/municipio', default='static/images/isotiporedsentir.png')
    imagen_fondo = models.ImageField(upload_to='static/images/mesa/municipio', default='static/images/isotiporedsentir.png')
    
    def __unicode__(self):
        return u"%s" % self.nombre

class Perfil(models.Model):
    user = models.OneToOneField(User,related_name='perfil')
    municipio = models.ForeignKey(Municipio, on_delete=models.CASCADE,null=True,blank=True,default=None)
    identificacion = models.IntegerField(default=0)
    fecha_nacimiento = models.DateTimeField(null=True,blank=True,default=None)
    telefono = models.CharField(max_length=20,null=True,blank=True,default=None)
    avatar = models.ImageField(upload_to='static/images/avatar/', default='static/images/avatar/defaultUser.png')
    genero = models.CharField(max_length=20, null=True)
    es_experto = models.BooleanField(default=False)
    es_joven = models.BooleanField(default=False)
    es_actor = models.BooleanField(default=False)
    agenda_cita = models.BooleanField(default=False)
    
    def __unicode__(self):
        return u"%s" % self.user.username
    
    def edad(self):
            import datetime
            self.full_clean()
            mi_edad = datetime.date.today().year - self.fecha_nacimiento.year
            return mi_edad