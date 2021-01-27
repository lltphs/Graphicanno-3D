from django.conf import settings
from django.http import HttpResponse
from django.http import HttpResponseForbidden
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework_simplejwt.tokens import AccessToken

from utils.simple_jwt import authenticate_from_request, authenticate_from_raw_token

User = get_user_model()

def remove_last_slash(path):
    new_path = path
    while new_path[len(new_path) - 1] == '/':
        new_path = path[:-1]
    return new_path

def media_access(request, path):
    r"""
    When trying to access :
    myproject.com/media/uploads/passport.png

    If access is authorized, the request will be redirected to
    myproject.com/protected/media/uploads/passport.png

    This special URL will be handle by nginx we the help of X-Accel
    """
    access_granted = False

    user = request.user

    token = request.GET.get('token')
    if user.is_anonymous and token and token != '':
        try:
            user = authenticate_from_raw_token(token)[0]
        except:
            pass

    if user.is_anonymous and request.headers:
        try:
            user = authenticate_from_request(request)[0]
        except:
            pass

    if user.is_authenticated:
        if user.is_staff:
            # If admin, everything is granted
            access_granted = True
        elif user.is_active:
            # For simple user, only their documents can be accessed
            # TODO: Chi nhung user duoc accept moi truy cap duoc anh trong dataset va workspace do
            access_granted = True

    if access_granted:
        response = HttpResponse()
        response['X-Accel-Redirect'] = settings.PROTECTED_MEDIA_URL + remove_last_slash(path)
        response['Content-Disposition'] = 'attachment; filename="{}"'.format(remove_last_slash(path).split('/')[-1])
        return response
    else:
        return HttpResponseForbidden('Not authorized to access this media.')
