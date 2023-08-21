from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model

from import_export import resources, fields
from import_export.widgets import ManyToManyWidget, ForeignKeyWidget

from utils.translations import get_verbose_name_by_name

from apps.accounts.constants import RoleChoices
from apps.services.models import Service

from .models import Client, Project, Labor, Agent, SystemReward

User = get_user_model()


class AgentResource(resources.ModelResource):
    full_name = fields.Field(
        column_name=get_verbose_name_by_name(Agent, 'full_name'),
        attribute='full_name',
    )
    phone = fields.Field(
        column_name=get_verbose_name_by_name(Agent, 'phone'),
        attribute='phone',
    )
    email = fields.Field(
        column_name=get_verbose_name_by_name(Agent, 'email'),
        attribute='email',
    )

    class Meta:
        model = Agent
        fields = (
            'id',
            'full_name',
            'phone',
            'email',
        )
        export_order = fields
        import_id_fields = ('full_name',)


class SystemRewardResource(resources.ModelResource):
    project = fields.Field(
        column_name=get_verbose_name_by_name(Project, 'name'),
        attribute='project',
        widget=ForeignKeyWidget(Project, 'name'),
    )
    exchange = fields.Field(
        column_name=get_verbose_name_by_name(SystemReward, 'exchange'),
        attribute='exchange',
    )
    amount = fields.Field(
        column_name=get_verbose_name_by_name(SystemReward, 'amount'),
        attribute='amount',
    )
    comment = fields.Field(
        column_name=get_verbose_name_by_name(SystemReward, 'comment'),
        attribute='comment',
    )
    created_at = fields.Field(
        column_name=get_verbose_name_by_name(SystemReward, 'created_at'),
        attribute='created_at',
        readonly=True,
    )
    updated_at = fields.Field(
        column_name=get_verbose_name_by_name(SystemReward, 'updated_at'),
        attribute='updated_at',
        readonly=True,
    )
    deleted_at = fields.Field(
        column_name=get_verbose_name_by_name(SystemReward, 'deleted_at'),
        attribute='deleted_at',
        readonly=True,
    )

    class Meta:
        model = SystemReward
        fields = (
            'id',
            'project',
            'exchange',
            'amount',
            'comment',
            'created_at',
            'updated_at',
            'deleted_at',
        )
        export_order = fields


class LaborResource(resources.ModelResource):
    project = fields.Field(
        column_name=get_verbose_name_by_name(Project, 'name'),
        attribute='project',
        widget=ForeignKeyWidget(Project, 'name'),
    )
    employee = fields.Field(
        column_name=get_verbose_name_by_name(Labor, 'employee'),
        attribute='employee',
        widget=ForeignKeyWidget(User, 'username'),
    )
    service = fields.Field(
        column_name=get_verbose_name_by_name(Project, 'service'),
        attribute='project__service',
        readonly=True,
    )
    hours = fields.Field(
        column_name=get_verbose_name_by_name(Labor, 'hours'),
        attribute='hours',
    )
    minutes = fields.Field(
        column_name=get_verbose_name_by_name(Labor, 'minutes'),
        attribute='minutes',
    )
    amount = fields.Field(
        column_name=get_verbose_name_by_name(Labor, 'amount'),
        attribute='amount',
    )
    comment = fields.Field(
        column_name=get_verbose_name_by_name(Labor, 'comment'),
        attribute='comment',
    )

    class Meta:
        model = Labor
        fields = (
            'id',
            'project',
            'employee',
            'service',
            'hours',
            'minutes',
            'amount',
            'comment',
        )
        export_order = fields


class ProjectResource(resources.ModelResource):
    id = fields.Field(
        column_name='ID',
        attribute='id',
    )
    name = fields.Field(
        column_name=get_verbose_name_by_name(Project, 'name'),
        attribute='name',
    )
    client = fields.Field(
        column_name=get_verbose_name_by_name(Project, 'client'),
        attribute='client',
        widget=ForeignKeyWidget(Client, 'name'),
    )
    client_name = fields.Field(
        column_name=get_verbose_name_by_name(Client, 'name'),
        attribute='client',
        readonly=True,
    )
    client_legal_entity = fields.Field(
        column_name=get_verbose_name_by_name(Client, 'legal_entity'),
        attribute='client__legal_entity',
        readonly=True,
    )
    client_site = fields.Field(
        column_name=get_verbose_name_by_name(Client, 'site'),
        attribute='client__site',
        readonly=True,
    )
    service = fields.Field(
        column_name=get_verbose_name_by_name(Project, 'service'),
        attribute='service',
        widget=ForeignKeyWidget(Service, 'name'),
    )
    service_details = fields.Field(
        column_name=get_verbose_name_by_name(Project, 'service_details'),
        attribute='service_details',
        widget=ManyToManyWidget(Service, field='name'),
    )
    budget_type = fields.Field(
        column_name=get_verbose_name_by_name(Project, 'budget_type'),
        attribute='budget_type',
    )
    budget_amount = fields.Field(
        column_name=get_verbose_name_by_name(Project, 'budget_amount'),
        attribute='budget_amount',
    )
    expenses_amount = fields.Field(
        column_name=get_verbose_name_by_name(Project, 'expenses_amount'),
        attribute='expenses_amount',
    )
    agent = fields.Field(
        column_name=get_verbose_name_by_name(Project, 'agent'),
        attribute='agent',
        widget=ForeignKeyWidget(Agent, 'full_name'),
    )
    agent_commission = fields.Field(
        column_name=get_verbose_name_by_name(Project, 'agent_commission'),
        attribute='agent_commission',
    )
    system_reward = fields.Field(
        column_name=_('System reward'),
        attribute='system_rewards',
        readonly=True,
    )
    revenue = fields.Field(
        column_name=get_verbose_name_by_name(Project, 'revenue'),
        attribute='revenue',
    )
    profit = fields.Field(
        column_name=get_verbose_name_by_name(Project, 'profit'),
        attribute='profit',
    )
    total_labor = fields.Field(
        column_name=get_verbose_name_by_name(Project, 'total_labor'),
        attribute='total_labor',
        readonly=True,
    )
    start_date = fields.Field(
        column_name=get_verbose_name_by_name(Project, 'start_date'),
        attribute='start_date',
    )
    end_date = fields.Field(
        column_name=get_verbose_name_by_name(Project, 'end_date'),
        attribute='end_date',
        readonly=True,
    )
    manager_specialists = fields.Field(
        column_name=RoleChoices.MANAGER.label,
        attribute='manager_specialists',
        readonly=True,
    )
    seo_specialists = fields.Field(
        column_name=RoleChoices.SEO_SPECIALIST.label,
        attribute='seo_specialists',
        readonly=True,
    )
    context_specialists = fields.Field(
        column_name=RoleChoices.CONTEXT_SPECIALIST.label,
        attribute='context_specialists',
        readonly=True,
    )
    target_specialists = fields.Field(
        column_name=RoleChoices.TARGET_SPECIALIST.label,
        attribute='target_specialists',
        readonly=True,
    )

    def dehydrate_service_details(self, obj):
        try:
            service_details = obj.service_details.all()
            return ', '.join([service_detail.name for service_detail in service_details])
        except Exception as e:
            return '-'

    def dehydrate_system_rewards(self, obj):
        try:
            system_rewards = obj.system_rewards.all()
            return ', '.join([system_reward.exchange for system_reward in system_rewards])
        except Exception as e:
            return '-'

    def dehydrate_budget_type(self, obj):
        return obj.get_budget_type_display()

    def dehydrate_manager_specialists(self, obj):
        try:
            managers = obj.labors.filter(employee__role=RoleChoices.MANAGER)
            manager_names = {manager.employee.full_name for manager in managers}
            return ', '.join(manager_names)
        except Exception as e:
            return '-'

    def dehydrate_seo_specialists(self, obj):
        try:
            specialists = obj.labors.filter(employee__role=RoleChoices.SEO_SPECIALIST)
            specialist_names = {specialist.employee.full_name for specialist in specialists}
            return ', '.join(specialist_names)
        except Exception as e:
            return '-'

    def dehydrate_context_specialists(self, obj):
        try:
            specialists = obj.labors.filter(employee__role=RoleChoices.CONTEXT_SPECIALIST)
            specialist_names = {specialist.employee.full_name for specialist in specialists}
            return ', '.join(specialist_names)
        except Exception as e:
            return '-'

    def dehydrate_target_specialists(self, obj):
        try:
            specialists = obj.labors.filter(employee__role=RoleChoices.TARGET_SPECIALIST)
            specialist_names = {specialist.employee.full_name for specialist in specialists}
            return ', '.join(specialist_names)
        except Exception as e:
            return '-'

    def dehydrate_system_reward(self, obj):
        try:
            return obj.system_rewards.all().sum('amount')
        except Exception as e:
            return '-'

    class Meta:
        model = Project
        fields = (
            'id',
            'name',
            'client',
            'client_name',
            'client_legal_entity',
            'client_site',
            'service',
            'service_details',
            'budget_type',
            'budget_amount',
            'expenses_amount',
            'agent',
            'agent_commission',
            'system_reward',
            'revenue',
            'profit',
            'total_labor',
            'start_date'
        )
        export_order = fields
        import_id_fields = (
            'name',
        )
