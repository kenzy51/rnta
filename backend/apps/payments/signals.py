from django.db.models.signals import post_save
from django.dispatch import receiver

from apps.accounts.constants import RoleChoices

from .models import ClientInvoice, ManagerBonus


@receiver(post_save, sender=ClientInvoice)
def client_invoice_post_save(sender, instance, created, **kwargs):
    labor = instance.project.labors.filter(
        employee__role=RoleChoices.MANAGER
    ).first()

    if not labor:
        return

    manager_bonus = ManagerBonus.objects.get_or_create(manager=labor.employee)[0]

    if not instance.deleted:
        manager_bonus.client_invoice.add(instance)
    else:
        manager_bonus.client_invoice.remove(instance)
