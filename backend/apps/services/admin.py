from django.contrib import admin

from mptt.admin import DraggableMPTTAdmin
from import_export.admin import ImportExportModelAdmin
from import_export.formats import base_formats

from .models import Service
from .resources import ServiceResource


@admin.register(Service)
class ServiceAdmin(ImportExportModelAdmin, DraggableMPTTAdmin):
    list_display = (
        'tree_actions',
        'indented_title',
        'name'
    )
    list_display_links = (
        'indented_title',
    )
    search_fields = (
        'name',
    )
    list_filter = (
        'created_at',
        'updated_at',
    )
    resource_class = ServiceResource
    formats = (
        base_formats.XLSX,
    )
