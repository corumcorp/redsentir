from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^$', inicio, name='inicio'),
    url(r'^me_gusta_p/(?P<pid>\d+)$', meGustaP, name = 'me_gusta_p'),
]
