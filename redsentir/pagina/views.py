# -*- coding: utf-8 -*-
from django.shortcuts import render, redirect
from .models import Carrusel, Noticia

def index(request):
    url = request.build_absolute_uri()
    print(url)
    if not url == 'https://redsentir.org/':
        print('hola mundo')
        return redirect('https://redsentir.org/')
    carrusel = Carrusel.objects.all
    noticias = Noticia.objects.all
    return render(request, 'pagina/index.html', {'carrusel': carrusel, 'noticias': noticias})

def encuentro(request):
    noticias = Noticia.objects.all
    return render(request, 'pagina/encuentro.html',{'noticias': noticias})

def nosotros(request):
    noticias = Noticia.objects.all
    return render(request, 'pagina/nosotros.html',{'noticias': noticias})

def noticia(request, pid):
    noticias = Noticia.objects.all
    noticia = Noticia.objects.get(pk=pid)
    return render(request, 'pagina/noticia.html',{'noticia': noticia, 'noticias': noticias})

