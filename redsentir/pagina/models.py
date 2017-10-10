from __future__ import unicode_literals

from django.db import models

class Carrusel(models.Model):
    nombre = models.CharField(max_length=20)
    imagen = models.ImageField(upload_to='static/images/pagina/carrusel')
    descripcion = models.CharField(max_length=20, null=True)
    
    def __str__(self):
        return self.nombre

class Noticia(models.Model):
    titulo = models.CharField(max_length=50)
    subTitulo = models.CharField(max_length=50, null=True)
    imagen = models.ImageField(upload_to='static/images/pagina/noticia')
    descripcion = models.CharField(max_length=1000, null=True)
    
    def __str__(self):
        return self.titulo
