from django.conf.urls import url
from django.contrib import admin
from django.conf.urls import include
from django.contrib.auth.views import login, logout
from django.conf import settings
from django.conf.urls.static import static
from mesa.views import index

urlpatterns = [
    url(r'^$', index, name='index'),    
    url(r'^login$', login, name="login"),
    url(r'^logout$', logout, name="logout"),
    url(r'^oauth/', include('social_django.urls', namespace='social')),
    url(r'^admin/', admin.site.urls),
    url(r'^mesa/', include('mesa.urls', namespace='mesa')),
    url(r'^seguridad/', include('seguridad.urls', namespace='seguridad')),
    url(r'^lineabase/', include('lineabase.urls', namespace='lineabase')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

admin.site.site_header = "ADMIN - RED SENTIR"
