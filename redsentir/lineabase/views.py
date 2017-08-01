from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required
def index(request):
    return render(request, 'sitio/lineabase/lineabase.html')

@login_required
def sociodemograficos(request):
    return render(request, 'sitio/lineabase/sociodemograficos.html')

@login_required
def actividades(request):
    return render(request, 'sitio/lineabase/actividades.html')

@login_required
def relaciones(request):
    return render(request, 'sitio/lineabase/relaciones.html')

@login_required
def salud(request):
    return render(request, 'sitio/lineabase/salud.html')

@login_required
def plan(request):
    return render(request, 'sitio/lineabase/plan.html')

@login_required
def subgrupos(request):
    return render(request, 'sitio/lineabase/subgrupos.html')

@login_required
def embarazo(request):
    return render(request, 'sitio/lineabase/embarazo.html')

@login_required
def discucion(request):
    return render(request, 'sitio/lineabase/discucion.html')
    