# -*- coding: utf-8 -*-
from django.shortcuts import render, redirect

def inicio(request):
    return render(request, 'sitio/lineatiempo/inicio.html')