from django.db import models
from django.utils.translation import gettext_lazy as _


class RoleChoices(models.TextChoices):
    OWNER = 'OWNER', _('Owner')
    ADMIN = 'ADMIN', _('Admin')
    MANAGER = 'MANAGER', _('Manager')
    SEO_SPECIALIST = 'SEO_SPECIALIST', _('SEO Specialist')
    CONTEXT_SPECIALIST = 'CONTEXT_SPECIALIST', _('Context Specialist')
    TARGET_SPECIALIST = 'TARGET_SPECIALIST', _('Target Specialist')
