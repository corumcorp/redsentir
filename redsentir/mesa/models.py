from __future__ import unicode_literals

from django.db import models
from seguridad.models import Municipio

# Create your models here.

class Plan(models.Model):
    municipio = models.ForeignKey(Municipio)
    nombre = models.CharField(max_length=50)
    imagen = models.ImageField(upload_to='static/images/mesa', null=True, default=None)
    acciones = models.TextField()
    actores = models.TextField()
    requerimientos = models.TextField()
    compromisos = models.TextField()
    plazo = models.DateField(null=True, default=None)
    estado = models.CharField(max_length=20, null=True, default=None)
    
    def __unicode__(self):  
        return u"%s" % self.nombre
    
    class Meta:
        verbose_name_plural='planes'