from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^$', inicio, name='inicio'),
    url(r'^pedir_cita$', pedirCita, name = 'pedir_cita'),
    url(r'^lista_citas$', listaCitas, name = 'lista_citas'),
]