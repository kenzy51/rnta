from .models import ClientInvoice, ProjectExpense, ManagerBonus


class ClientInvoiceRepository:
    def __init__(self):
        self.manager = ClientInvoice.objects

    def get_all(self):
        return self.manager.all()


class ProjectExpenseRepository:
    def __init__(self):
        self.manager = ProjectExpense.objects

    def get_all(self):
        return self.manager.all()


class ManagerBonusRepository:
    def __init__(self):
        self.manager = ManagerBonus.objects

    def get_all(self):
        return self.manager.all()
