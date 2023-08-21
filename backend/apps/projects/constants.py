from django.db import models
from django.utils.translation import gettext_lazy as _


class BudgetTypeChoices(models.TextChoices):
    VARIABLE = 'variable', _('Variable')
    FIXED = 'fixed', _('Fixed')


class AgentCommissionTypeChoices(models.TextChoices):
    PERCENTAGE = 'percentage', _('Percentage')
    FIXED = 'fixed', _('Fixed')
