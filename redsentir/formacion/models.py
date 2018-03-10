from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Encuentro(models.Model):
    titulo = models.CharField(max_length=50)
    subTitulo = models.CharField(max_length=50, null=True, blank=True, default=None)    
    parrafo1 = models.TextField()
    parrafo2 = models.TextField()
    parrafo3 = models.TextField()
    parrafo4 = models.TextField()
    parrafo5 = models.TextField(null=True, blank=True, default=None)
    parrafo6 = models.TextField(null=True, blank=True, default=None)
    imagen1 = models.ImageField(upload_to='static/images/pagina/articulo')
    imagen2 = models.ImageField(upload_to='static/images/pagina/articulo')
    imagen3 = models.ImageField(upload_to='static/images/pagina/articulo')
    imagen4 = models.ImageField(upload_to='static/images/pagina/articulo',null=True, blank=True, default=None)
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
    carreta11 = models.ImageField(upload_to='static/images/pagina/articulo', null=True, blank=True, default=None)
    carreta12 = models.ImageField(upload_to='static/images/pagina/articulo', null=True, blank=True, default=None)
    carreta13 = models.ImageField(upload_to='static/images/pagina/articulo', null=True, blank=True, default=None)
    carreta14 = models.ImageField(upload_to='static/images/pagina/articulo', null=True, blank=True, default=None)
    carreta15 = models.ImageField(upload_to='static/images/pagina/articulo', null=True, blank=True, default=None)
    entrevista1 = models.CharField(max_length=500)
    entrevista2 = models.CharField(max_length=500, null=True, blank=True, default=None)
    entrevista3 = models.CharField(max_length=500, null=True, blank=True, default=None)
    entrevista4 = models.CharField(max_length=500, null=True, blank=True, default=None)
    entrevista5 = models.CharField(max_length=500, null=True, blank=True, default=None)
    
    def __unicode__(self):
        return u"%s" % self.titulo