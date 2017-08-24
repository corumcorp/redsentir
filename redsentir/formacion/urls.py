from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^guia/(?P<pid>\d+)$', guia, name='guia'),
]
