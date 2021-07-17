from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import DatasetViewSet

router = DefaultRouter()
router.register(r'', DatasetViewSet, basename='dataset')
urlpatterns = router.urls
