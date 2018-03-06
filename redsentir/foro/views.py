from django.shortcuts import render_to_response, redirect
from django.contrib.auth.decorators import login_required
from .models import Comentario, Respuesta, Foro
from django.contrib.auth.models import User
from django.core.mail import send_mail
@login_required
def index(request):
    foros = Foro.objects.all().order_by('id').reverse()
    return render_to_response(request, 'sitio/foro/foros.html',{'foros':foros})

@login_required
def foro(request,pid):
    if request.method == 'POST':        
        if 'respuesta' in request.POST :
            respuesta = Respuesta(mensaje=request.POST['respuesta'],comentario_id=request.POST['comentario_id'],usuario_id=request.user.pk)
            respuesta.save()
            usuario = User.objects.get(pk=request.user.pk)
            if usuario.email :
                send_mail(
                        'Respuesta comentario Foro',
                        request.user.username+': '+request.POST['respuesta']+' https://redsentir.org/foros/foro/'+pid+'#comentario_'+request.POST['comentario_id'],
                        'comunicaciones@redsentir.org',
                        [usuario.email],
                        fail_silently=True,
                    )
        elif 'mensaje' in request.POST :
            comentario = None
            if 'anonimo' in request.POST :
                comentario = Comentario(mensaje=request.POST['mensaje'],foro_id=pid)
            else :
                comentario = Comentario(usuario=request.user,mensaje=request.POST['mensaje'],foro_id=pid)
            comentario.save()
            expertos = User.objects.all()
            emails = []
            for experto in expertos :
                if experto.has_perm('foro.responder_comentario') :
                    emails.append(experto.email)
            send_mail(
                    'Participacion en Foro',
                    request.user.username+': '+request.POST['mensaje']+' https://redsentir.org/foros/foro/'+pid+'#comentario_'+str(comentario.pk),
                    'comunicaciones@redsentir.org',
                    emails,
                    fail_silently=True,
                )
    foro = Foro.objects.get(pk=pid)    
    comentarios = Comentario.objects.filter(foro_id=pid).order_by('id').reverse()
    return render_to_response(request, 'sitio/foro/foro.html',{'foro':foro,'comentarios':comentarios})

@login_required
def meGusta(request,pid):
    comentario = Comentario.objects.get(pk=pid)
    comentario.me_gusta +=1
    comentario.save()
    return redirect ('https://redsentir.org/foros/foro/'+str(comentario.foro_id)+'#comentario_'+str(comentario.pk))

@login_required
def meGustaR(request,pid):
    respuesta = Respuesta.objects.get(pk=pid)
    respuesta.me_gusta +=1
    respuesta.save()
    return redirect ('https://redsentir.org/foros/foro/'+str(respuesta.comentario.foro_id)+'#comentario_'+str(respuesta.comentario_id))
