import openpyxl
import tablib

from django.http import HttpResponse
from django.utils.translation import gettext_lazy as _
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from shared.serializers import EmptySerializer


class BaseImportExportModelViewSet(viewsets.ModelViewSet):
    resource_class = None

    def check_resource(self):
        if not self.resource_class:
            raise NotImplementedError(
                _('You must set resource_class attribute in your view class')
            )

    def data_export(self, queryset):
        self.check_resource()

        dataset = self.resource_class().export(queryset=queryset)
        response = HttpResponse(dataset.xls, content_type='application/vnd.ms-excel')
        response['Content-Disposition'] = 'attachment; filename="agent.xls"'

        return response

    def data_import(self, request):
        self.check_resource()

        file = request.FILES.get('file')

        if not file:
            return Response(
                {'detail': _("File not found")},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            workbook = openpyxl.load_workbook(file, read_only=True)
            sheet = workbook.active

            data = []
            for row in sheet.iter_rows(values_only=True):
                data.append(row)

            dataset = tablib.Dataset()
            dataset.headers = data[0]
            dataset.extend(data[1:])

            result = self.resource_class().import_data(dataset, dry_run=False)

            if result.has_errors():
                row_errors = result.row_errors()
                errors = [(row, [str(error.error) for error in error_list]) for row, error_list in row_errors]
                error_response = {
                    'errors': errors
                }
                return Response(error_response, status=status.HTTP_400_BAD_REQUEST)

            return Response(
                {'detail': _("Imported successfully")},
                status=status.HTTP_200_OK
            )

        except openpyxl.utils.exceptions.InvalidFileError:
            error_response = {
                'error': _('Invalid file format. Only XLSX files are supported.')
            }
            return Response(error_response, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], url_path='export')
    def export_data(self, request):
        queryset = self.get_queryset()
        response = self.data_export(queryset)
        return response

    @swagger_auto_schema(
        operation_description=_('Generate projects'),
        responses={200: 'OK'},
        request_body=EmptySerializer,
        manual_parameters=[
            openapi.Parameter(
                name='file',
                in_=openapi.IN_QUERY,
                required=False,
                type=openapi.TYPE_FILE,
                description='File to upload',
            )
        ]
    )
    @action(detail=False, methods=['post'])
    def import_data(self, request):
        response = self.data_import(request)
        return response
