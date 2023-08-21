from .repositories import ServiceRepository


class ServiceService:
    def __init__(self):
        self.repository = ServiceRepository()

    def get_all(self):
        return self.repository.get_all()
