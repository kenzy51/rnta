from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from import_export.admin import ImportExportModelAdmin
from import_export.formats import base_formats

from .models import Project, Agent, SystemReward, Labor
from .resources import ProjectResource, AgentResource, SystemRewardResource, LaborResource


class LaborInline(admin.TabularInline):
    model = Labor
    extra = 1


@admin.register(Project)
class ProjectAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'client',
        'service',
        'agent',
        'budget_type',
        'budget_amount',
        'expenses_amount',
        'agent_commission',
        'revenue',
        'created_at',
        'updated_at',
    )
    list_filter = (
        'client',
        'service',
        'agent',
        'budget_type',
        'created_at',
        'updated_at',
    )
    inlines = (
        LaborInline,
    )
    search_fields = (
        'name',
    )
    resource_class = ProjectResource
    formats = (
        base_formats.XLSX,
    )

    actions = ['update_data']

    def update_data(self, request, queryset):
        for project in queryset:
            project.update_data()

    update_data.short_description = _('Update data')


@admin.register(Labor)
class LaborAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = (
        'project',
        'employee',
        'hours',
        'minutes',
        'created_at',
        'updated_at',
    )
    list_filter = (
        'project',
        'employee',
        'created_at',
        'updated_at',
    )
    readonly_fields = (
        'amount',
        'created_at',
        'updated_at',
    )
    resource_class = LaborResource
    formats = (
        base_formats.XLSX,
    )

    actions = ['update_data']

    def update_data(self, request, queryset):
        for labor in queryset:
            labor.update_data()

    update_data.short_description = _('Update data')


@admin.register(Agent)
class AgentAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = (
        'id',
        'full_name',
        'email',
        'phone',
        'created_at',
        'updated_at',
    )
    list_filter = (
        'created_at',
        'updated_at',
    )
    resource_class = AgentResource
    formats = (
        base_formats.XLSX,
    )


@admin.register(SystemReward)
class SystemRewardAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = (
        'id',
        'exchange',
        'amount',
        'created_at',
        'updated_at',
    )
    list_filter = (
        'created_at',
        'updated_at',
    )
    resource_class = SystemRewardResource
    formats = (
        base_formats.XLSX,
    )
