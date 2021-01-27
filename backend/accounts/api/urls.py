from django.urls import path

import accounts.api.views as views

urlpatterns = [
    path("create/", views.UserCreate.as_view(), name="user_create"),
    path(
        "changepassword/",
        views.ChangePasswordView.as_view(),
        name="user_change_password",
    ),
    path("detail/", views.UserDetail.as_view(), name="user_get_detail"),
]
