from .models import Service


class ServiceRepository:
    def __init__(self):
        self.manager = Service.objects

    def get_all(self):
        return self.manager.all()
