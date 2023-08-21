from .models import CustomUser


class UserRepository:
    def __init__(self):
        self.manager = CustomUser.objects

    def get_all(self):
        return self.manager.all()

    def get_by_role(self, role):
        return self.manager.filter(role=role)
