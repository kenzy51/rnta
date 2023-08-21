from shared.views import BaseImportExportModelViewSet

from .resources import ServiceResource
from .serializers import ServiceSerializer
from .services import ServiceRepository


class ServiceViewSet(BaseImportExportModelViewSet):
    queryset = ServiceRepository().get_all()
    serializer_class = ServiceSerializer
    resource_class = ServiceResource
