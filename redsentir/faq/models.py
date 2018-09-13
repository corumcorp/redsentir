from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Pregunta(models.Model):
    pregunta = models.CharField(max_length=100)
    respuesta = models.TextField()
    link1 = models.CharField(max_length=200, null=True, blank=True, default=None)
    descripcion_link1 = models.CharField(max_length=20, null=True, blank=True, default=None)
    link2 = models.CharField(max_length=200, null=True, blank=True, default=None)
    descripcion_link2 = models.CharField(max_length=20, null=True, blank=True, default=None)
    video = models.CharField(max_length=200, null=True, blank=True, default=None)
    
    def __unicode__(self):  
        return u"%s" % self.pregunta
    
    class Meta:
        verbose_name_plural='preguntas frecuentes'
