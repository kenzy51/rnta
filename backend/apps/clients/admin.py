from django.contrib import admin

from import_export.admin import ImportExportModelAdmin
from import_export.formats import base_formats

from .models import Client
from .resources import ClientResource


@admin.register(Client)
class ClientAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'legal_entity',
        'site',
        'created_at',
        'updated_at',
    )
    list_display_links = (
        'id',
        'name',
    )
    list_filter = (
        'created_at',
        'updated_at',
    )
    search_fields = (
        'name',
        'legal_entity',
        'site',
    )
    resource_class = ClientResource
    formats = (
        base_formats.XLSX,
    )
