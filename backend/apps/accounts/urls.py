from django.urls import path
from rest_framework import routers

from .views import CustomUserViewSet, RoleChoicesAPIView

router = routers.DefaultRouter()

router.register(r'users', CustomUserViewSet)

urlpatterns = [
    path('role-choices/', RoleChoicesAPIView.as_view(), name='role-choices'),
]

urlpatterns += router.urls
