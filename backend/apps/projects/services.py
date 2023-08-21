from .repositories import ProjectRepository, AgentRepository, SystemRewardRepository, LaborRepository


class ProjectService:
    def __init__(self):
        self.repository = ProjectRepository()

    def get_all(self):
        return self.repository.get_all()


class AgentService:
    def __init__(self):
        self.repository = AgentRepository()

    def get_all(self):
        return self.repository.get_all()


class SystemRewardService:
    def __init__(self):
        self.repository = SystemRewardRepository()

    def get_all(self):
        return self.repository.get_all()


class LaborService:
    def __init__(self):
        self.repository = LaborRepository()

    def get_all(self):
        return self.repository.get_all()
