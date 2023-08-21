from .repositories import ClientInvoiceRepository, ProjectExpenseRepository, ManagerBonusRepository


class ClientInvoiceService:
    def __init__(self):
        self.repository = ClientInvoiceRepository()

    def get_all(self):
        return self.repository.get_all()


class ProjectExpenseService:
    def __init__(self):
        self.repository = ProjectExpenseRepository()

    def get_all(self):
        return self.repository.get_all()


class ManagerBonusService:
    def __init__(self):
        self.repository = ManagerBonusRepository()

    def get_all(self):
        return self.repository.get_all()
