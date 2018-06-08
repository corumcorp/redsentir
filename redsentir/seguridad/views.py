from django.shortcuts import render
from django.contrib.auth.models import User
from .models import *
from django.contrib.auth.views import login
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
import csv
from djqscsv import render_to_csv_response
from django.contrib.auth.decorators import login_required
from django.http import Http404
from datetime import datetime, date, timedelta
from lineatiempo.models import Publicacion

def registro(request):
    if request.POST:
        if 'username' in request.POST :
            usuarioTmp = User.objects.filter(username = request.POST['username']).first()
            if usuarioTmp != None:
                return render(request, 'registration/registro.html',{'usuario':'el nombre de usuario '+request.POST['username']+' ya existe'})            
            if 'password' in request.POST and 'password1' in request.POST and request.POST['password'] != '':
                if request.POST['password'] == request.POST['password1'] :                    
                    usuario = User.objects.create_user(username = request.POST['username'],password = request.POST['password'],email = request.POST['email'])
                    perfil = None
                    if 'genero' in request.POST :
                        pgenero = request.POST['genero']
                    else :
                        pgenero = None
                    if not 'avatar' in request.FILES :
                        perfil = Perfil(
                            user_id=usuario.id,
                            genero=pgenero,
                            fecha_nacimiento=request.POST['fecha_nacimiento'],
                            telefono=request.POST['telefono']
                        )
                    else :
                        perfil = Perfil(
                            user_id=usuario.id,
                            avatar=request.FILES['avatar'],
                            genero=pgenero,
                            fecha_nacimiento=request.POST['fecha_nacimiento'],
                            telefono=request.POST['telefono']
                        )
                    if perfil.edad() < 20 :
                        perfil.es_joven = True
                    perfil.save()
                    return HttpResponseRedirect(reverse(login,args=[]))
                else :
                    return render(request, 'registration/registro.html',{'password':'las claves deben coincidir'})
            else :
                return render(request, 'registration/registro.html',{'password':'ingrese clave de seguridad valida'})
        else :
            return render(request, 'registration/registro.html',{'usuario':'debe ingresar un usuario'})            
    else :
        return render(request, 'registration/registro.html')

@login_required
def exportarUsuarios(request):
    if request.user.is_superuser :
        return render_to_csv_response(User.objects.all())
    else :
        raise Http404

@login_required
def perfilUsuario(request, pid):
    usuario = User.objects.get(pk=pid)
    publicaciones = Publicacion.objects.filter(usuario_id=usuario.pk).order_by('id').reverse()[:20]
    return render(request, 'sitio/perfil/perfil.html', {'usuario':usuario,'publicaciones':publicaciones})
