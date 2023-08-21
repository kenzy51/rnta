from django.contrib import admin

from import_export.admin import ImportExportModelAdmin
from import_export.formats import base_formats

from .models import CustomUser
from .resources import CustomUserResource


@admin.register(CustomUser)
class CustomUserAdmin(ImportExportModelAdmin):
    list_display = (
        'id',
        'username',
        'first_name',
        'last_name',
        'email',
        'role',
        'salary',
        'hour_rate',
    )
    list_display_links = (
        'id',
        'username',
    )
    list_filter = (
        'role',
    )
    search_fields = (
        'username',
        'first_name',
        'last_name',
        'email',
    )
    ordering = (
        'id',
    )

    resource_class = CustomUserResource
    formats = (
        base_formats.XLSX,
    )

    actions = ['update_data']

    def update_data(self, request, queryset):
        for user in queryset:
            user.update_data()
