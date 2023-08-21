from django.urls import path
from rest_framework import routers

from .views import ClientInvoiceViewSet, ProjectExpenseViewSet, ManagerBonusViewSet, LegalPersonChoicesAPIView

router = routers.DefaultRouter()

router.register(r'client-invoices', ClientInvoiceViewSet, basename='client-invoices')
router.register(r'project-expenses', ProjectExpenseViewSet, basename='project-expenses')
router.register(r'manager-bonuses', ManagerBonusViewSet, basename='manager-bonuses')

urlpatterns = [
    path('legal-person-choices/', LegalPersonChoicesAPIView.as_view(), name='legal-person-choices'),
]

urlpatterns += router.urls
