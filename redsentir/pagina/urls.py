from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^$', index, name='index'),
    url(r'^encuentro$', encuentro, name='encuentro'),
        url(r'^nosotros$', nosotros, name='nosotros'),
]
