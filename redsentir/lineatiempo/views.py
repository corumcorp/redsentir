# -*- coding: utf-8 -*-
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import *

@login_required
def inicio(request):
    if request.POST :            
        publicacion = Publicacion(contenido=request.POST['contenido'],usuario=request.user)
        publicacion.save()
        if 'video' in request.FILES :
            video = MultiMedia(publicacion=publicacion,archivo=request.FILES['video'],tipo='video').save()
        imagenes = request.FILES.getlist('imagenes')
        for imagen in imagenes :
            multiMedia = MultiMedia(publicacion=publicacion,archivo=imagen,tipo='imagen').save()
    publicaciones = Publicacion.objects.all().order_by('id').reverse()[:10]
    return render(request, 'sitio/lineatiempo/inicio.html',{'publicaciones':publicaciones})
