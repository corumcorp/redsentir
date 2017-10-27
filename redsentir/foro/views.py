from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Comentario
from django.contrib.auth.models import User
from django.core.mail import send_mail

@login_required
def index(request):
    if 'mensaje' in request.POST :
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
                fail_silently=False,
            )
    comentarios = Comentario.objects.all().order_by('id').reverse()
    return render(request, 'sitio/foro/index.html',{'comentarios':comentarios})