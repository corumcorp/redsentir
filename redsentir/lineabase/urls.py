from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^$', index, name='index'),
    url(r'^sociodemograficos$', sociodemograficos, name='sociodemograficos'),
    url(r'^actividades$', actividades, name='actividades'),
    url(r'^relaciones$', relaciones, name='relaciones'),
    url(r'^salud$', salud, name='salud'),
    url(r'^plan$', plan, name='plan'),
    url(r'^subgrupos$', subgrupos, name='subgrupos'),
    url(r'^embarazo$', embarazo, name='embarazo'),
    url(r'^discucion$', discucion, name='discucion'),
]
