from django.shortcuts import render
from .models import Carrusel

def index(request):
    carrusel = Carrusel.objects.all
    return render(request, 'pagina/index.html', {'carrusel': carrusel})

def encuentro(request):
    return render(request, 'pagina/encuentro.html')

def nosotros(request):
    return render(request, 'pagina/nosotros.html')

