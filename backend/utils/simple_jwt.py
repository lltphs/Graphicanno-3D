from rest_framework import HTTP_HEADER_ENCODING
from rest_framework_simplejwt.authentication import AUTH_HEADER_TYPE_BYTES
from rest_framework_simplejwt.exceptions import AuthenticationFailed, InvalidToken, TokenError
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.state import User

def get_header(request):
    """
    Extracts the header containing the JSON web token from the given
    request.
    """
    header = request.META.get('HTTP_AUTHORIZATION')

    if isinstance(header, str):
        # Work around django test client oddness
        header = header.encode(HTTP_HEADER_ENCODING)

    return header


def get_raw_token(header):
    """
    Extracts an unvalidated JSON web token from the given "Authorization"
    header value.
    """
    parts = header.split()

    if len(parts) == 0:
        # Empty AUTHORIZATION header sent
        return None

    if parts[0] not in AUTH_HEADER_TYPE_BYTES:
        # Assume the header does not contain a JSON web token
        return None

    if len(parts) != 2:
        raise AuthenticationFailed(
            _('Authorization header must contain two space-delimited values'),
            code='bad_authorization_header',
        )

    return parts[1]

def get_validated_token(raw_token):
    """
    Validates an encoded JSON web token and returns a validated token
    wrapper object.
    """
    messages = []
    for AuthToken in api_settings.AUTH_TOKEN_CLASSES:
        try:
            return AuthToken(raw_token)
        except TokenError as e:
            messages.append({'token_class': AuthToken.__name__,
                                'token_type': AuthToken.token_type,
                                'message': e.args[0]})

    raise InvalidToken({
        'detail': _('Given token not valid for any token type'),
        'messages': messages,
    })

def get_user(validated_token):
    """
    Attempts to find and return a user using the given validated token.
    """
    try:
        user_id = validated_token[api_settings.USER_ID_CLAIM]
    except KeyError:
        raise InvalidToken(_('Token contained no recognizable user identification'))

    try:
        user = User.objects.get(**{api_settings.USER_ID_FIELD: user_id})
    except User.DoesNotExist:
        raise AuthenticationFailed(_('User not found'), code='user_not_found')

    if not user.is_active:
        raise AuthenticationFailed(_('User is inactive'), code='user_inactive')

    return user


def authenticate_from_request(request):
    header = get_header(request)
    if header is None:
        return None

    raw_token = get_raw_token(header)
    if raw_token is None:
        return None

    validated_token = get_validated_token(raw_token)

    return get_user(validated_token), validated_token

def authenticate_from_raw_token(raw_token):
    if raw_token is None:
        return None

    validated_token = get_validated_token(raw_token)

    return get_user(validated_token), validated_token
