from __future__ import unicode_literals

from django.db import models

class Carrusel(models.Model):
    nombre = models.CharField(max_length=20)
    imagen = models.ImageField(upload_to='static/images/pagina/carrusel')
    descripcion = models.CharField(max_length=20, null=True)
    
    def __str__(self):
        return self.nombre
