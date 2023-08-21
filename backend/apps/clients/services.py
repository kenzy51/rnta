from .repositories import ClientRepository


class ClientService:
    def __init__(self):
        self.repository = ClientRepository()

    def get_all(self):
        return self.repository.get_all()

