from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^$', index, name='index'),
    url(r'^me_gusta/(?P<pid>\d+)$', meGusta, name='me_gusta'),
]
