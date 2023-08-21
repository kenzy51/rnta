from django.contrib import admin

from import_export.admin import ImportExportModelAdmin
from import_export.formats import base_formats

from .models import ProjectExpense, ClientInvoice, ManagerBonus
from .resources import ClientInvoiceResource, ProjectExpenseResource, ManagerBonusResource


class ClientInvoiceInline(admin.TabularInline):
    model = ManagerBonus.client_invoice.through
    extra = 0

    def has_delete_permission(self, request, obj=None):
        return False

    def has_change_permission(self, request, obj=None):
        return False


@admin.register(ProjectExpense)
class ProjectExpenseAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = (
        'id',
        'project',
        'amount',
    )
    list_display_links = (
        'id',
        'project',
    )
    search_fields = (
        'project__name',
        'amount',
    )
    resource_class = ProjectExpenseResource
    formats = (
        base_formats.XLSX,
    )

    actions = ['update_data']

    def update_data(self, request, queryset):
        for obj in queryset:
            obj.update_data()

    update_data.short_description = 'Update data'


@admin.register(ClientInvoice)
class ClientInvoiceAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = (
        'id',
        'project',
        'amount',
        'comment',
    )
    list_display_links = (
        'id',
        'project',
    )
    list_filter = (
        'project',
    )
    search_fields = (
        'project__name',
        'amount',
        'comment',
    )
    resource_class = ClientInvoiceResource
    formats = (
        base_formats.XLSX,
    )


@admin.register(ManagerBonus)
class ManagerBonusAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = (
        'id',
        'manager',
    )
    list_display_links = (
        'id',
        'manager',
    )
    search_fields = (
        'manager',
    )
    inlines = (
        ClientInvoiceInline,
    )
    resource_class = ManagerBonusResource
    formats = (
        base_formats.XLSX,
    )

    def get_export_data(self, file_format, queryset, *args, **kwargs):
        return ManagerBonusResource().export(queryset)
