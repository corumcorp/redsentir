from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import Pregunta

@login_required
def index(request):
    preguntas = Pregunta.objects.all().order_by('id').reverse()
    return render(request, 'sitio/faq/preguntas.html',{'preguntas':preguntas})

@login_required
def pregunta(request,pid):
    pregunta = Pregunta.objects.get(pk=pid)
    return render(request, 'sitio/faq/pregunta.html',{'pregunta':pregunta})


    
