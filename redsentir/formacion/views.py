from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required
def guia(request,pid):
    return render(request, 'sitio/formacion/guia.html')