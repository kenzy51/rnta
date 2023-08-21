from shared.views import BaseImportExportModelViewSet

from .resources import ClientResource
from .serializers import ClientSerializer
from .services import ClientService


class ClientViewSet(BaseImportExportModelViewSet):
    queryset = ClientService().get_all()
    serializer_class = ClientSerializer
    resource_class = ClientResource
