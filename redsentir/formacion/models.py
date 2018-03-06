from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Encuentro(models.Model):
    titulo = models.CharField(max_length=50)
    subTitulo = models.CharField(max_length=50, null=True)    
    parrafo1 = models.TextField()
    parrafo2 = models.TextField()
    parrafo3 = models.TextField()
    parrafo4 = models.TextField()
    parrafo5 = models.TextField()
    parrafo6 = models.TextField()
    imagen1 = models.ImageField(upload_to='static/images/pagina/articulo')
    imagen2 = models.ImageField(upload_to='static/images/pagina/articulo')
    imagen3 = models.ImageField(upload_to='static/images/pagina/articulo')
    imagen4 = models.ImageField(upload_to='static/images/pagina/articulo')
    video = models.CharField(max_length=500)
    carreta1 = models.ImageField(upload_to='static/images/pagina/articulo')
    carreta2 = models.ImageField(upload_to='static/images/pagina/articulo')
    carreta3 = models.ImageField(upload_to='static/images/pagina/articulo')
    carreta4 = models.ImageField(upload_to='static/images/pagina/articulo')
    carreta5 = models.ImageField(upload_to='static/images/pagina/articulo')
    carreta6 = models.ImageField(upload_to='static/images/pagina/articulo')
    carreta7 = models.ImageField(upload_to='static/images/pagina/articulo')
    carreta8 = models.ImageField(upload_to='static/images/pagina/articulo')
    carreta9 = models.ImageField(upload_to='static/images/pagina/articulo')
    carreta10 = models.ImageField(upload_to='static/images/pagina/articulo')
    carreta11 = models.ImageField(upload_to='static/images/pagina/articulo')
    carreta12 = models.ImageField(upload_to='static/images/pagina/articulo')
    carreta13 = models.ImageField(upload_to='static/images/pagina/articulo')
    carreta14 = models.ImageField(upload_to='static/images/pagina/articulo')
    carreta15 = models.ImageField(upload_to='static/images/pagina/articulo')
    entrevista1 = models.CharField(max_length=500)
    entrevista2 = models.CharField(max_length=500)
    entrevista3 = models.CharField(max_length=500)
    entrevista4 = models.CharField(max_length=500)
    entrevista5 = models.CharField(max_length=500)
    
    def __unicode__(self):
        return u"%s" % self.titulo