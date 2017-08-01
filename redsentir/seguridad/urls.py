from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^registro$', registro, name='registro'),
]
