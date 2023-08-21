from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError

from apps.payments.constants import LegalPersonChoices
from apps.projects.models import Project
from apps.accounts.constants import RoleChoices

User = get_user_model()


class ClientInvoice(models.Model):
    invoice_number = models.CharField(
        _('Invoice number'),
        max_length=255,
        unique=True
    )
    legal_person = models.CharField(
        _('Legal person (Our)'),
        choices=LegalPersonChoices.choices,
        max_length=255,
        null=True,
        blank=True,
        db_index=True
    )
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        verbose_name=_('Project'),
        related_name='invoices'
    )
    payment_purpose = models.TextField(
        _('Payment purpose'),
    )
    amount = models.DecimalField(
        _('Amount'),
        max_digits=10,
        decimal_places=2
    )
    billing_date = models.DateField(
        _('Billing date'),
        default=timezone.now
    )
    paid_date = models.DateField(
        _('Paid date'),
        null=True,
        blank=True
    )
    close_date = models.DateField(
        _('Close date'),
        null=True,
        blank=True
    )
    comment = models.TextField(
        _('Comment'),
        null=True,
        blank=True
    )
    created_at = models.DateField(
        _('Created at'),
        auto_now_add=True
    )
    updated_at = models.DateField(
        _('Updated at'),
        auto_now=True
    )
    deleted = models.BooleanField(
        _('Deleted'),
        default=False
    )
    deleted_comment = models.TextField(
        _('Deleted comment'),
        blank=True
    )

    def __str__(self):
        return f'{self.legal_person} {self.project} {self.amount}'

    class Meta:
        verbose_name = _('Client invoice (Summary)')
        verbose_name_plural = _('Client invoices (Summary)')
        ordering = ['-id']


class ProjectExpense(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        verbose_name=_('Project'),
        related_name='expenses'
    )
    stock_market = models.CharField(
        _('Stock market'),
        max_length=255,
        null=True,
        blank=True,
    )
    month_request = models.DateField(
        _('Request month'),
        null=True,
        blank=True
    )
    budget_request = models.DecimalField(
        _('Budget request'),
        max_digits=10,
        decimal_places=2,
        default=0
    )
    spent = models.DecimalField(
        _('Spent'),
        max_digits=10,
        decimal_places=2,
        default=0
    )
    commission = models.DecimalField(
        _('Commission'),
        max_digits=10,
        decimal_places=2,
        default=0
    )
    amount = models.DecimalField(
        _('Amount'),
        max_digits=10,
        decimal_places=2,
        default=0
    )
    project_comment = models.TextField(
        _('Comment to project'),
        null=True,
        blank=True
    )
    expense_comment = models.TextField(
        _('Comment to expense'),
        null=True,
        blank=True,
    )
    paid_date = models.DateField(
        _('Paid date'),
        null=True,
        blank=True
    )
    deleted = models.BooleanField(
        _('Deleted'),
        default=False
    )
    deleted_comment = models.TextField(
        _('Deleted comment'),
        blank=True
    )
    created_at = models.DateField(
        _('Created at'),
        auto_now_add=True
    )
    updated_at = models.DateField(
        _('Updated at'),
        auto_now=True
    )

    def update_data(self):
        self.amount = self.budget_request * (1 + self.commission / 100)
        self.save()

    def __str__(self):
        return f"{self.project} - {self.amount}"

    class Meta:
        verbose_name = _('Project expense')
        verbose_name_plural = _('Project expenses')
        ordering = ['-id']


class ManagerBonus(models.Model):
    manager = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        verbose_name=_('Manager'),
        related_name='bonus'
    )
    client_invoice = models.ManyToManyField(
        ClientInvoice,
        verbose_name=_('Client invoice'),
        related_name='bonuses',
        blank=True,
    )

    def clean(self):
        if self.manager.role != RoleChoices.MANAGER:
            raise ValidationError(_('Only manager can have bonuses'))

    def __str__(self):
        return f"{self.manager} - {self.client_invoice}"

    class Meta:
        verbose_name = _('Manager bonus')
        verbose_name_plural = _('Manager bonuses')
        ordering = ['-id']
