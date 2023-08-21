from _decimal import Decimal

from django.contrib.auth.hashers import make_password
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

from apps.accounts.constants import RoleChoices


class CustomUser(AbstractUser):
    role = models.CharField(
        _('Role'),
        choices=RoleChoices.choices,
        max_length=20,
        default=RoleChoices.ADMIN
    )
    salary = models.DecimalField(
        _('Salary'),
        max_digits=10,
        decimal_places=2,
        default=0
    )
    hour_rate = models.DecimalField(
        _('Hour rate'),
        max_digits=10,
        decimal_places=2,
        default=0
    )

    def update_data(self):
        self.hour_rate = self.salary / 176
        self.save()

    @property
    def is_owner(self):
        return self.role == RoleChoices.OWNER

    @property
    def is_admin(self):
        return self.role == RoleChoices.ADMIN

    @property
    def is_manager(self):
        return self.role == RoleChoices.MANAGER

    @property
    def is_seo_specialist(self):
        return self.role == RoleChoices.SEO_SPECIALIST

    @property
    def is_context_specialist(self):
        return self.role == RoleChoices.CONTEXT_SPECIALIST

    @property
    def is_target_specialist(self):
        return self.role == RoleChoices.TARGET_SPECIALIST

    @property
    def full_name(self):
        return self.get_full_name() or self.username

    def save(self, *args, **kwargs):
        if not self.password:
            self.password = make_password(self.email)

        super().save(*args, **kwargs)

    class Meta:
        verbose_name = _('User')
        verbose_name_plural = _('Users')
        ordering = ['-id']
