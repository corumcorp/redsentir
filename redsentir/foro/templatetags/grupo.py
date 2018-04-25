from django import template
from django.contrib.auth.models import Group

register = template.Library()

#@register.simple_tag
@register.filter(name='esExperto')
def esExperto(user, nombre_grupo):
    grupo = Group.objects.get(name=nombre_grupo)
    return True if grupo in user.groups.all() else False
    #return user.groups.filter(name=nombre_grupo).exists()
