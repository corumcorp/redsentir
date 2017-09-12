from django.shortcuts import render
from .models import Carrusel

def index(request):
    carrusel = Carrusel.objects.all
    return render(request, 'pagina/index.html', {'carrusel': carrusel})
