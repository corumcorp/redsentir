# -*- coding: utf-8 -*-
from django.shortcuts import render, redirect
from foro.models import Foro
import random

def index(request):
    #url = request.build_absolute_uri()
    #print(url)
    #if not url == 'https://redsentir.org/':
    #print('hola mundo')
    #return redirect('https://redsentir.org/')
    n = random.randint(0,Foro.objects.count()-1)
    elemento = Foro.objects.all()[n]
    return render(request, 'pagina/inicio.html', {'elemento': elemento})

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

