from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import *

@login_required
def guia(request,pid):
    return render(request, 'sitio/formacion/guia.html',{'prueba':20,})

@login_required
def modulo(request,pid):
    return render(request, 'sitio/formacion/modulo.html',{'prueba':20,})

@login_required
def jovenes(request):
    return render(request, 'sitio/formacion/jovenes.html')

@login_required
def docentes(request):
    return render(request, 'sitio/formacion/docentes.html')

@login_required
def docentes_familiar(request):
    return render(request, 'sitio/formacion/docentes_familiar.html')

@login_required
def videos_familiar(request):
    videos_familiar = Videos.objects.all().order_by('id').reverse()
    return render(request, 'sitio/formacion/videos_familiar.html', {'videos_familiar':videos_familiar})

@login_required
def podcasts_familiar(request):
    podcasts_familiar = Podcast.objects.all().order_by('id').reverse()
    return render(request, 'sitio/formacion/podcasts_familiar.html', {'podcasts_familiar':podcasts_familiar})

@login_required
def encuentro(request,pid):
    encuentro = Encuentro.objects.get(pk=pid)
    return render(request, 'sitio/formacion/encuentro.html',{'encuentro': encuentro})

@login_required
def encuentros(request):
    encuentros = Encuentro.objects.all().order_by('id').reverse()
    return render(request, 'sitio/formacion/encuentros.html',{'encuentros':encuentros})
