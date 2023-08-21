from django.utils.translation import gettext_lazy as _

from rest_framework import viewsets, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from shared.serializers import ChoicesSerializer
from shared.views import BaseImportExportModelViewSet

from .constants import LegalPersonChoices
from .serializers import ClientInvoiceSerializer, ProjectExpenseSerializer, ManagerBonusSerializer
from .resources import ClientInvoiceResource, ProjectExpenseResource, ManagerBonusResource
from .services import ClientInvoiceRepository, ProjectExpenseRepository, ManagerBonusRepository


class ClientInvoiceViewSet(BaseImportExportModelViewSet):
    queryset = ClientInvoiceRepository().get_all()
    serializer_class = ClientInvoiceSerializer
    resource_class = ClientInvoiceResource


class ProjectExpenseViewSet(BaseImportExportModelViewSet):
    queryset = ProjectExpenseRepository().get_all()
    serializer_class = ProjectExpenseSerializer
    resource_class = ProjectExpenseResource

    @action(detail=False, methods=['get'])
    def update_data(self, request):
        for obj in self.get_queryset():
            obj.update_data()

        return Response(status=200)


class ManagerBonusViewSet(viewsets.ModelViewSet):
    queryset = ManagerBonusRepository().get_all()
    serializer_class = ManagerBonusSerializer

    @swagger_auto_schema(
        operation_description=_('Generate managers bonuses'),
        responses={200: 'OK'},
        manual_parameters=[
            openapi.Parameter(
                name='start_date',
                in_=openapi.IN_QUERY,
                required=True,
                type=openapi.TYPE_STRING,
                description='Period paid date in client invoice. Format %d.%m.%Y',
            ),
            openapi.Parameter(
                name='end_date',
                in_=openapi.IN_QUERY,
                required=True,
                type=openapi.TYPE_STRING,
                description='Period paid date in client invoice. Format %d.%m.%Y',
            ),
        ]
    )
    @action(detail=False, methods=['get'], url_path='export')
    def export_data(self, request):
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        queryset = self.get_queryset()
        response = ManagerBonusResource().export(
            queryset,
            start_date=start_date,
            end_date=end_date
        )
        return response


class LegalPersonChoicesAPIView(generics.ListAPIView):
    queryset = LegalPersonChoices.choices
    serializer_class = ChoicesSerializer
