# -*- coding: utf-8 -*-
from django.shortcuts import render
from .models import Carrusel, Noticia

def index(request):
    carrusel = Carrusel.objects.all
    noticias = Noticia.objects.all
    return render(request, 'pagina/index.html', {'carrusel': carrusel, 'noticias': noticias})

def encuentro(request):
    return render(request, 'pagina/encuentro.html')

def nosotros(request):
    return render(request, 'pagina/nosotros.html')

def noticia(request, pid):
    noticia = Noticia.objects.get(pk=pid)
    return render(request, 'pagina/noticia.html',{'noticia': noticia})

