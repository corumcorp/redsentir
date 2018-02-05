from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required
def index(request):
    return render(request, 'sitio/mesa/mapa.html')

@login_required
def marinilla(request):
    return render(request, 'sitio/mesa/marinilla.html')

@login_required
def argelia(request):
    return render(request, 'sitio/mesa/argelia.html')

@login_required
def sonson(request):
    return render(request, 'sitio/mesa/sonson.html')

@login_required
def abejorral(request):
    return render(request, 'sitio/mesa/abejorral.html')

@login_required
def sanluis(request):
    return render(request, 'sitio/mesa/sanluis.html')

@login_required
def sanfrancisco(request):
    return render(request, 'sitio/mesa/sanfrancisco.html')


    