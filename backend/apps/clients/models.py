from django.db import models
from django.utils.translation import gettext_lazy as _


class Client(models.Model):
    name = models.CharField(
        _('Name'),
        max_length=255,
        unique=True
    )
    legal_entity = models.CharField(
        _('Legal entity'),
        max_length=255,
    )
    site = models.URLField(
        _('Site'),
        max_length=255
    )
    created_at = models.DateTimeField(
        _('Created at'),
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        _('Updated at'),
        auto_now=True
    )
    deleted_at = models.DateTimeField(
        _('Delete date'),
        null=True,
        blank=True
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('Client')
        verbose_name_plural = _('Clients')
        ordering = ['-id']
