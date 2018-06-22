from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from seguridad.models import Municipio

@login_required
def index(request):
    return render(request, 'sitio/mesa/mapa.html')

@login_required
def municipio(request,pid):
    municipio = Municipio.objects.get(pk=pid)
    return render(request, 'sitio/mesa/municipio.html',{'municipio':municipio})


    