from django import template
from django.contrib.auth.models import Group

register = template.Library()

@register.simple_tag
def esExperto(user):
    grupo = Group.objects.get(name="experto")
    return True if grupo in user.groups.all() else return False