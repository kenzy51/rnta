from django.http import HttpResponse

from rest_framework import generics, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend

from shared.views import BaseImportExportModelViewSet
from shared.serializers import ChoicesSerializer

from .constants import BudgetTypeChoices, AgentCommissionTypeChoices
from .serializers import (
    ProjectSerializer,
    ProjectReadSerializer,
    AgentSerializer,
    SystemRewardSerializer,
    LaborSerializer
)
from .resources import (
    AgentResource,
    SystemRewardResource,
    LaborResource,
    ProjectResource
)
from .services import (
    ProjectService,
    AgentService,
    SystemRewardService,
    LaborService
)


class ProjectViewSet(BaseImportExportModelViewSet):
    queryset = ProjectService().get_all()
    serializer_class = ProjectSerializer
    resource_class = ProjectResource

    def update_data(self, request):
        for project in self.get_queryset():
            project.update_data()

        return HttpResponse(status=status.HTTP_200_OK)

    def get_serializer_class(self):
        if self.action == 'retrieve' or self.action == 'list':
            return ProjectReadSerializer
        return ProjectSerializer


class AgentViewSet(BaseImportExportModelViewSet):
    queryset = AgentService().get_all()
    serializer_class = AgentSerializer
    resource_class = AgentResource
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(delete_date__isnull=True)


class SystemRewardViewSet(BaseImportExportModelViewSet):
    queryset = SystemRewardService().get_all()
    serializer_class = SystemRewardSerializer
    resource_class = SystemRewardResource


class LaborViewSet(BaseImportExportModelViewSet):
    queryset = LaborService().get_all()
    serializer_class = LaborSerializer
    resource_class = LaborResource
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        'project',
    ]

    @action(detail=False, methods=['get'])
    def update_data(self, request):
        for labor in self.get_queryset():
            labor.update_data()

        return Response(status=200)


class BudgetTypeChoicesAPIView(generics.ListAPIView):
    queryset = BudgetTypeChoices.choices
    serializer_class = ChoicesSerializer


class AgentCommissionTypeChoicesAPIView(generics.ListAPIView):
    queryset = AgentCommissionTypeChoices.choices
    serializer_class = ChoicesSerializer
