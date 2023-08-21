from django.urls import path
from rest_framework import routers

from .views import (
    ProjectViewSet,
    AgentViewSet,
    SystemRewardViewSet,
    LaborViewSet,
    BudgetTypeChoicesAPIView,
    AgentCommissionTypeChoicesAPIView
)

router = routers.DefaultRouter()

router.register(r'projects', ProjectViewSet)
router.register(r'agents', AgentViewSet)
router.register(r'system-rewards', SystemRewardViewSet)
router.register(r'labors', LaborViewSet)

urlpatterns = [
    path('budget-type-choices/', BudgetTypeChoicesAPIView.as_view(), name='budget-type-choices'),
    path('agent-commission-type-choices/', AgentCommissionTypeChoicesAPIView.as_view(), name='agent-commission-type-choices'),
]

urlpatterns += router.urls
