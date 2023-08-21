from .repositories import UserRepository


class UserService:
    def __init__(self):
        self.repository = UserRepository()

    def get_all(self):
        return self.repository.get_all()

    def get_by_role(self, role):
        return self.repository.get_by_role(role)