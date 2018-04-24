# -*- coding: utf-8 -*-
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import *

@login_required
def inicio(request):
    if request.POST : 
        if 'accion' in request.POST :
            publicacion = Publicacion.objects.get(pk=request.POST['publicacion'])
            publicacion.delete()
        else :
            imagenes = request.FILES.getlist('imagenes')
            publicacion = Publicacion(contenido=request.POST['contenido'],usuario=request.user,num_img=len(imagenes))
            publicacion.save()
            if 'video' in request.FILES :
                video = MultiMedia(publicacion=publicacion,archivo=request.FILES['video'],tipo='video').save()
            for imagen in imagenes :
                multiMedia = MultiMedia(publicacion=publicacion,archivo=imagen,tipo='imagen').save()
    publicaciones = Publicacion.objects.all().order_by('id').reverse()[:10]
    return render(request, 'sitio/lineatiempo/inicio.html',{'publicaciones':publicaciones})

@login_required
def meGustaP(request,pid):
    publicacion = Publicacion.objects.get(pk=pid)
    publicacion.me_gusta +=1
    publicacion.save()
    return redirect ('https://redsentir.org/lineatiempo/#publicacion_'+str(publicacion.pk))
