from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^$', index, name='index'),
    url(r'^foro/(?P<pid>\d+)$', foro, name='foro'),
    url(r'^me_gusta/(?P<pid>\d+)$', meGusta, name='me_gusta'),
    url(r'^me_gusta_r/(?P<pid>\d+)$', meGustaR, name = 'me_gusta_r'),
]
