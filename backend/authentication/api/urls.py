from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import ObtainTokenPairWithColorView, LogoutAndBlacklistRefreshTokenForUserView

urlpatterns = [
    path('obtain/', ObtainTokenPairWithColorView.as_view(), name='token_create'),
    path('refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('blacklist/', LogoutAndBlacklistRefreshTokenForUserView.as_view(), name='token_blacklist'),
]
