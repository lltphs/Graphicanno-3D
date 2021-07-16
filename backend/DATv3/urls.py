"""DATv3 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib import admin
from .views import upload_dicom, get_list_volume, get_nrrd_volume, get_nrrd_annotation, post_annotation, get_textures, media_access
from django.urls import path, include
from django.conf.urls.static import static
from django.conf.urls import url

admin.site.site_title = settings.ADMIN_SITE_TITLE
admin.site.site_header = settings.ADMIN_SITE_HEADER

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('accounts.api.urls')),
    path('api/token/', include('authentication.api.urls')),
    path('api/upload-dicom/<user_name>/', upload_dicom, name='upload_dicom'),
    path('api/get-list-volume/<user_name>/', get_list_volume, name='get_list_volume'),
    path('api/get-nrrd-volume/<user_name>/<patient_name>/<phase>/', get_nrrd_volume, name='get_nrrd'),
    path('api/get-nrrd-annotation/<user_name>/<patient_name>/<phase>/', get_nrrd_annotation, name='get_nrrd_annotation'),
    path('api/post-annotation/<user_name>/<patient_name>/<phase>/', post_annotation, name='save_annotation'),
    path('api/get-textures/<filename>/', get_textures, name='get_textures'),
    url(r'^media/(?P<path>.*)', media_access, name='media'),
]
