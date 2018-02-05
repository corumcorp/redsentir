from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^$', index, name='inicio'),
    url(r'^marinilla$', marinilla, name='marinilla'),
    url(r'^abejorral$', abejorral, name='abejorral'),
    url(r'^sanluis$', sanluis, name='sanluis'),
    url(r'^sanfrancisco$', sanfrancisco, name='sanfrancisco'),
    url(r'^argelia$', argelia, name='argelia'),
    url(r'^sonson$', sonson, name='sonson'),
]
