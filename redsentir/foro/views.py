from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Comentario, Respuesta
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.shortcuts import redirect

@login_required
def index(request):
    if request.method == 'POST':        
        if 'respuesta' in request.POST :
            respuesta = Respuesta(mensaje=request.POST['respuesta'],comentario_id=request.POST['comentario_id'],usuario_id=request.POST['usuario'])
            respuesta.save()
            usuario = User.objects.get(pk=request.POST['usuario'])
            if usuario.email :
                send_mail(
                        'Respuesta comentario Foro',
                        request.user.username+': '+request.POST['respuesta'],
                        'noresponder@redsentir.org',
                        [usuario.email],
                        fail_silently=True,
                    )
        elif 'mensaje' in request.POST :
            comentario = None
            if 'anonimo' in request.POST :
                comentario = Comentario(mensaje=request.POST['mensaje'],foro_id=1)
            else :
                comentario = Comentario(usuario=request.user,mensaje=request.POST['mensaje'],foro_id=1)
            comentario.save()
            expertos = User.objects.all()
            emails = []
            for experto in expertos :
                if experto.has_perm('foro.responder_comentario') :
                    emails.append(experto.email)
            send_mail(
                    'Participacion en Foro',
                    request.user.username+': '+request.POST['mensaje'],
                    'noresponder@redsentir.org',
                    emails,
                    fail_silently=True,
                )
    
    comentarios = Comentario.objects.all().order_by('id').reverse()
    return render(request, 'sitio/foro/index.html',{'comentarios':comentarios})

@login_required
def meGusta(request,pid):
    comentario = Comentario.objects.get(pk=pid)
    comentario.me_gusta +=1
    comentario.save()
    return redirect ('foro:index')