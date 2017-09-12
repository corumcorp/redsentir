from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import Comentario
@login_required
def index(request):
    if 'mensaje' in request.POST :
        comentario = Comentario(mensaje=request.POST['mensaje'],foro_id=1)
        comentario.save()
    comentarios = Comentario.objects.all().order_by('id').reverse()
    return render(request, 'sitio/foro/index.html',{'comentarios':comentarios})

@login_required
def comentar(request):
    comentario = Comentario(mensaje=request.POST['mensaje'],foro_id=1)
    comentario.save()
    comentarios = Comentario.objects.all().order_by('id').reverse()
    return render(request, 'sitio/foro/index.html',{'comentarios':comentarios,})
