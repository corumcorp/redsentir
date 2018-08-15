# -*- coding: utf-8 -*-
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import *

@login_required
def inicio(request):
    if not request.user.perfil.es_joven and not request.user.is_superuser:
        return redirect('mesa:inicio')
    if request.POST :
        if not 'publicacion' in request.POST or request.POST['publicacion']==None or request.POST['publicacion']=='':
            imagenes = request.FILES.getlist('imagenes')
            publicacion = Publicacion(contenido=request.POST['contenido'],usuario=request.user,num_img=len(imagenes))
            publicacion.save()
            for imagen in imagenes :
                multiMedia = MultiMedia(publicacion=publicacion,archivo=imagen,tipo='imagen').save()
            if 'video' in request.FILES :
                video = MultiMedia(publicacion=publicacion,archivo=request.FILES['video'],tipo='video').save()
            if 'audio' in request.FILES :
                video = MultiMedia(publicacion=publicacion,archivo=request.FILES['audio'],tipo='video').save()
        elif request.POST['accion'] == 'guardar_comentario':
            comentario = ComentarioP(publicacion_id=request.POST['publicacion'],usuario = request.user)
            if 'imagen_c' in request.FILES:
                comentario.imagen = request.FILES['imagen_c']                
            if 'contenido' in request.POST :
                comentario.contenido = request.POST['contenido']
            comentario.save()            
            Publicacion.objects.filter(pk=comentario.publicacion_id).update(comentarios=(comentario.publicacion.comentarios+1))
        elif 'accion' in request.POST and request.POST['accion']=='borrar':
            publicacion = Publicacion.objects.get(pk=request.POST['publicacion'])
            publicacion.delete()
        elif 'accion' in request.POST and request.POST['accion']=='borrar_comentario':
            comentario = ComentarioP.objects.get(pk=request.POST['comentario'])
            comentario.delete()
            Publicacion.objects.filter(pk=comentario.publicacion_id).update(comentarios=(comentario.publicacion.comentarios-1))        
    publicaciones = Publicacion.objects.all().order_by('id').reverse()[:50]
    return render(request, 'sitio/lineatiempo/inicio.html',{'publicaciones':publicaciones})

@login_required
def meGustaP(request,pid):
    publicacion = Publicacion.objects.get(pk=pid)
    publicacion.me_gusta +=1
    publicacion.save()
    return redirect ('https://redsentir.org/lineatiempo/#publicacion_'+str(publicacion.pk))

@login_required
def meGustaCP(request,pid):
    comentarioP = ComentarioP.objects.get(pk=pid)
    comentarioP.me_gusta +=1
    comentarioP.save()
    return redirect ('https://redsentir.org/lineatiempo/#publicacion_'+str(comentarioP.publicacion_id))
