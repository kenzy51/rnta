from .models import Client


class ClientRepository:
    def __init__(self):
        self.manager = Client.objects

    def get_all(self):
        return self.manager.all()
