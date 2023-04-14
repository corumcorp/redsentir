from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.core import serializers
from .models import *
from seguridad.models import Municipio
from django.core.mail import send_mail

@login_required
def inicio(request):
    if not request.user.perfil.es_joven and not request.user.is_superuser :
        return redirect('mesa:inicio')
    servicios = Servicio.objects.filter(perfil_id=request.user.perfil.pk)
    servicios = serializers.serialize('json', servicios)
    informacion = Informacion.objects.first()
    servicio = Servicio.objects.filter(perfil_id=request.user.perfil.pk).last()
    if servicio != None and (servicio.estado=='activa' or servicio.estado=='agendado'):
        return render(request,'sitio/servicios/cita_pedir.html',{'servicio':servicio,'informacion':informacion,'servicios':servicios})    
    municipios = serializers.serialize('json', Municipio.objects.all())
    ipses = serializers.serialize('json', Ips.objects.all())    
    return render(request, 'sitio/servicios/inicio.html',{'informacion':informacion,'ipses':ipses,'municipios':municipios,'servicios':servicios})

@login_required
def listaCitas(request):  
    if request.method == 'POST':
        if 'accion' in request.POST :
            servicio = Servicio.objects.get(pk=request.POST['servicio'])
            if request.POST['accion']=='asistio' :
                servicio.estado = 'asistio'
            if request.POST['accion']=='no_asistio' :
                servicio.estado = 'no_asistio'
            if request.POST['accion']=='agendar' :
                servicio.fecha_cita = request.POST['fecha_cita']
                servicio.observaciones = request.POST['observaciones']
                servicio.profesional = request.POST['profesional']
                servicio.estado = 'agendado'                
                if servicio.perfil.user.email :
                        mensaje = 'Radicado :'+str(servicio.pk)
                        mensaje += '\n Fecha cita :'+servicio.fecha_cita
                        mensaje += '\n Observaciones :'+servicio.observaciones
                        mensaje += '\n Profesional :'+servicio.profesional
                        mensaje += '\n Municipio :'+servicio.ips.municipio.nombre
                        mensaje += '\n Ips :'+servicio.ips.nombre
                        if servicio.ips.telefono :
                            mensaje += '\n Telefono :'+servicio.ips.telefono
                        send_mail('SOLICITUD DE SERVICIO AMIGABLE',mensaje,'gomezmunera@corum.org.co',[servicio.perfil.user.email],fail_silently=False,)
            servicio.save()
    servicios = Servicio.objects.filter(ips__responsables__pk=request.user.perfil.pk)
    servicios = serializers.serialize('json', servicios)
    informacion = Informacion.objects.first()
    return render(request, 'sitio/servicios/lista_citas.html',{'servicios':servicios,'informacion':informacion})

@login_required
def pedirCita(request):    
    ips = Ips.objects.get(pk=request.POST['ips'])
    servicio = Servicio(perfil_id=request.user.perfil.pk,ips_id=ips.pk)
    servicio.nombre = request.POST['nombre']
    servicio.identificacion = request.POST['identificacion']
    servicio.telefono = request.POST['telefono']
    if 'email' in request.POST :
        servicio.email = request.POST['email']
    if 'primera_vez' in request.POST :
        servicio.primera_vez = True   
    servicio.save()
    informacion = Informacion.objects.first()
    personas = ips.responsables.all()
    for persona in personas :
        if persona.user.email :
                mensaje = 'Municipio:'+ips.municipio.nombre
                mensaje += '\n nombre:'+request.user.username
                mensaje += '\n Identificacion:'+request.POST['identificacion']
                mensaje += '\n Telefono:'+request.POST['telefono']
                mensaje += '\n Genero:'+servicio.perfil.genero
                mensaje += '\n https://redsentir.org/servicios_amigables/lista_citas'
                send_mail('SOLICITUD DE SERVICIO AMIGABLE',mensaje,'gomezmunera@corum.org.co',[persona.user.email],fail_silently=False,)
    servicios = Servicio.objects.filter(perfil_id=request.user.perfil.pk)
    servicios = serializers.serialize('json', servicios)
    return render(request,'sitio/servicios/cita_pedir.html',{'servicio':servicio,'informacion':informacion,'servicios':servicios})

@login_required
def cancelarCita(request,pid):
    servicio = Servicio.objects.get(pk=pid)
    servicio.estado = 'cancelado'
    servicio.save()
    personas = servicio.ips.responsables.all()
    for persona in personas :
        if persona.user.email :
                mensaje = 'Municipio:'+servicio.ips.municipio.nombre
                mensaje += '\n nombre:'+request.user.username
                mensaje += '\n Identificacion:'+servicio.identificacion
                mensaje += '\n Telefono:'+servicio.telefono
                mensaje += '\n Genero:'+servicio.perfil.genero
                send_mail('CANCELACION DE SERVICIO AMIGABLE',mensaje,'gomezmunera@corum.org.co',[persona.user.email],fail_silently=True,)
    return redirect('servicios_amigables:inicio')
    