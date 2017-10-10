from django.shortcuts import render, redirect
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
    comentario = None
    if 'anonimo' in request.POST:
        comentario = Comentario(mensaje=request.POST['mensaje'],foro_id=1)
        request.POST['anonimo']
    else :
        comentario = Comentario(usuario=request.user,mensaje=request.POST['mensaje'],foro_id=1)
    comentario.save()
    redirect('index')
