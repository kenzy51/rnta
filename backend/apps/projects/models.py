from _decimal import Decimal

from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

from phonenumber_field.modelfields import PhoneNumberField
from rest_framework.exceptions import ValidationError

from apps.clients.models import Client
from apps.services.models import Service
from .constants import BudgetTypeChoices, AgentCommissionTypeChoices
from ..accounts.constants import RoleChoices

User = get_user_model()


class Project(models.Model):
    name = models.CharField(
        _('Project name'),
        max_length=255,
        unique=True
    )
    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        verbose_name=_('Client'),
        null=True,
    )
    service = models.ForeignKey(
        Service,
        on_delete=models.PROTECT,
        verbose_name=_('Service'),
        related_name='projects',
        null=True
    )
    service_details = models.ManyToManyField(
        Service,
        verbose_name=_('Service details'),
        blank=True
    )
    budget_type = models.CharField(
        _('Budget type'),
        max_length=255,
        choices=BudgetTypeChoices.choices,
        null=True,
        blank=True
    )
    budget_amount = models.DecimalField(
        _('Budget amount'),
        max_digits=10,
        decimal_places=2,
        default=0
    )
    expenses_amount = models.DecimalField(
        ('Expenses amount'),
        max_digits=10,
        decimal_places=2,
        default=0
    )
    agent = models.ForeignKey(
        'Agent',
        on_delete=models.PROTECT,
        verbose_name=_('Agent'),
        related_name='projects',
        null=True,
        blank=True
    )
    agent_commission_type = models.CharField(
        _('Agent commission type'),
        max_length=255,
        choices=AgentCommissionTypeChoices.choices,
        default=AgentCommissionTypeChoices.PERCENTAGE,
    )
    agent_commission = models.DecimalField(
        _('Agent commission'),
        max_digits=10,
        decimal_places=2,
        default=0
    )
    manager_commission = models.DecimalField(
        _('Manager commission (%)'),
        max_digits=10,
        decimal_places=2,
        default=5
    )
    revenue = models.DecimalField(
        _('Revenue'),
        max_digits=10,
        decimal_places=2,
        default=0
    )
    profit = models.DecimalField(
        _('Profit'),
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )
    total_labor = models.DecimalField(
        _('Total labor'),
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )
    start_date = models.DateField(
        _('Start date')
    )
    end_date = models.DateField(
        _('End date'),
        null=True,
        blank=True
    )
    created_at = models.DateTimeField(
        _('Created at'),
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        _('Updated at'),
        auto_now=True
    )
    delete_date = models.DateTimeField(
        _('Delete date'),
        null=True,
        blank=True
    )

    def update_data(self):
        self.total_labor = sum([labor.amount for labor in self.labors.all()])
        self.revenue = self.budget_amount - self.expenses_amount - self.agent_commission_amount + self.system_reward
        self.profit = self.revenue - self.total_labor
        self.expenses_amount = sum([expense.amount for expense in self.expenses.all()])
        self.save()

    def profit_str(self):
        return f"{self.profit:.2f}"

    def revenue_str(self):
        return f"{self.revenue:.2f}"

    @property
    def agent_commission_amount(self):
        if self.agent_commission_type == AgentCommissionTypeChoices.PERCENTAGE:
            return self.revenue * self.agent_commission / Decimal(100)

        return self.agent_commission

    @property
    def system_reward(self):
        if self.system_rewards.count() == 0:
            return Decimal(0)

        return self.system_rewards.all().aggregate(models.Sum('amount'))['amount__sum']

    def total_labor_str(self):
        if not self.total_labor:
            return '0.00'
        return f"{self.total_labor:.2f}"

    profit_str.short_description = _('Profit')
    revenue_str.short_description = _('Revenue')
    total_labor_str.short_description = _('Total labor')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('Project')
        verbose_name_plural = _('Projects')
        ordering = ['-id']


class Agent(models.Model):
    full_name = models.CharField(
        _('Full name'),
        max_length=255,
        unique=True
    )
    phone = PhoneNumberField(
        _('Phone'),
        null=True,
        blank=True
    )
    email = models.EmailField(
        _('Email'),
        max_length=255,
        null=True,
        blank=True
    )
    created_at = models.DateTimeField(
        _('Created at'),
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        _('Updated at'),
        auto_now=True
    )
    delete_date = models.DateTimeField(
        _('Delete date'),
        null=True,
        blank=True
    )

    def __str__(self):
        return self.full_name

    class Meta:
        verbose_name = _('Agent')
        verbose_name_plural = _('Agents')
        ordering = ['-id']


class SystemReward(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        verbose_name=_('Project'),
        related_name='system_rewards'
    )
    exchange = models.CharField(
        _('Exchange'),
        max_length=255,
    )
    amount = models.DecimalField(
        _('Amount'),
        max_digits=10,
        decimal_places=2,
        default=0
    )
    comment = models.TextField(
        _('Comment'),
        null=True,
        blank=True
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
        _('Deleted at'),
        null=True,
        blank=True
    )

    def __str__(self):
        return f"{self.project} - {self.amount}"

    class Meta:
        verbose_name = _('System reward')
        verbose_name_plural = _('System rewards')
        ordering = ['-id']


class Labor(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        verbose_name=_('Project'),
        related_name='labors'
    )
    employee = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        verbose_name=_('Employee'),
        related_name='labors'
    )
    hours = models.PositiveIntegerField(
        _('Hours'),
        default=0
    )
    minutes = models.PositiveIntegerField(
        _('Minutes'),
        default=0
    )
    amount = models.DecimalField(
        _('Amount'),
        max_digits=10,
        decimal_places=2,
        default=0
    )
    comment = models.TextField(
        _('Comment'),
        null=True,
        blank=True
    )
    created_at = models.DateTimeField(
        _('Created at'),
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        _('Updated at'),
        auto_now=True
    )
    delete_date = models.DateTimeField(
        _('Delete date'),
        null=True,
        blank=True
    )

    def clean(self):
        employee = self.employee

        manager = self.project.labors.filter(
            employee__role=RoleChoices.MANAGER
        ).values_list(
            'employee',
            flat=True
        )

        if manager and employee.role == RoleChoices.MANAGER and employee.pk not in manager:
            raise ValidationError(_('Manager already exists for this project'))

        super().clean()

    def update_data(self):
        self.amount = self.employee.hour_rate * Decimal(self.hours + self.minutes / 60)
        self.save()

    def __str__(self):
        return f'{self.employee} - {self.hours}:{self.minutes}'

    class Meta:
        verbose_name = _('Labor')
        verbose_name_plural = _('Labors')
        ordering = ['-id']
