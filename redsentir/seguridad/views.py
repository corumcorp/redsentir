from django.shortcuts import render
from django.contrib.auth.models import User
from .models import *
from django.contrib.auth.views import login
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse

def registro(request):
    if request.POST:
        if 'username' in request.POST :
            if 'password' in request.POST and 'password1' in request.POST and request.POST['password'] != '':
                if request.POST['password'] == request.POST['password1'] :                    
                    usuario = User.objects.create_user(username = request.POST['username'],password = request.POST['password'],email = request.POST['email'])
                    perfil = None
                    if 'genero' in request.POST :
                        pgenero = request.POST['genero'];
                    else :
                        pgenero = None
                    if not 'avatar' in request.FILES :
                        perfil = Perfil(user_id=usuario.id,genero=pgenero)
                    else :
                        perfil = Perfil(user_id=usuario.id,avatar=pavatar,genero=pgenero)                   
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
    