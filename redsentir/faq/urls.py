from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^$', index, name='inicio'),
    url(r'^pregunta/(?P<pid>\d+)$', pregunta, name='pregunta'),
]
