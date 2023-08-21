from rest_framework import generics
from rest_framework.decorators import action
from rest_framework.response import Response

from shared.serializers import ChoicesSerializer
from shared.views import BaseImportExportModelViewSet

from .constants import RoleChoices
from .serializers import CustomUserSerializer
from .services import UserService


class CustomUserViewSet(BaseImportExportModelViewSet):
    queryset = UserService().get_all()
    serializer_class = CustomUserSerializer

    @action(detail=False, methods=['get'])
    def me(self, request):
        if request.user.is_anonymous:
            return Response({'detail': 'Not found.'}, status=404)

        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def update_data(self, request):
        if request.user.is_anonymous:
            return Response({'detail': 'Not found.'}, status=404)

        request.user.update_data()

        return Response(status=200)

    @action(detail=False, methods=['get'], url_path='get_by_role/(?P<role>\w+)')
    def get_by_role(self, request, role):
        users = UserService().get_by_role(role)
        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data)


class RoleChoicesAPIView(generics.ListAPIView):
    queryset = RoleChoices.choices
    serializer_class = ChoicesSerializer
