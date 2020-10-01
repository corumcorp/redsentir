from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^guia/(?P<pid>\d+)$', guia, name='guia'),
    url(r'^modulo/(?P<pid>\d+)$', modulo, name='modulo'),
    url(r'^jovenes$', jovenes, name='jovenes'),
    url(r'^docentes$', docentes, name='docentes'),
    url(r'^docentes_familiar$', docentes_familiar, name='docentes_familiar'),
    url(r'^encuentro/(?P<pid>\d+)$', encuentro, name='encuentro'),
    url(r'^encuentros$', encuentros, name='encuentros'),
]
