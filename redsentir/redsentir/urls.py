from django.conf.urls import url
from django.contrib import admin
from django.conf.urls import include
from django.contrib.auth.views import login, logout, password_reset
from django.conf import settings
from django.conf.urls.static import static
from pagina.views import index
from seguridad.views import perfilUsuario
urlpatterns = [
    url(r'^$', index, name='index'),
    url(r'^perfil/(?P<pid>\d+)$', perfilUsuario, name='perfil'),
    url(r'^pagina/', include('pagina.urls', namespace='pagina')),
    url(r'^login$', login, name="login"),
    url(r'^logout$', logout, name="logout"),
    url('^', include('django.contrib.auth.urls')),
    url(r'^oauth/', include('social_django.urls', namespace='social')),
    url(r'^admin/', admin.site.urls),
    url(r'^mesa/', include('mesa.urls', namespace='mesa')),
    url(r'^seguridad/', include('seguridad.urls', namespace='seguridad')),
    url(r'^lineabase/', include('lineabase.urls', namespace='lineabase')),
    url(r'^lineatiempo/', include('lineatiempo.urls', namespace='lineatiempo')),
    url(r'^formacion/', include('formacion.urls', namespace='formacion')),
    url(r'^foros/', include('foro.urls', namespace='foro')),
    url(r'^servicios_amigables/', include('servicios.urls', namespace='servicios_amigables')),
    url(r'^djga/', include('google_analytics.urls')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

admin.site.site_header = "ADMIN - RED SENTIR"
