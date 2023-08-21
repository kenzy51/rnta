from .models import Project, Agent, SystemReward, Labor


class ProjectRepository:
    def __init__(self):
        self.manager = Project.objects

    def get_all(self):
        return self.manager.all()


class AgentRepository:
    def __init__(self):
        self.manager = Agent.objects

    def get_all(self):
        return self.manager.all()


class SystemRewardRepository:
    def __init__(self):
        self.manager = SystemReward.objects

    def get_all(self):
        return self.manager.all()


class LaborRepository:
    def __init__(self):
        self.manager = Labor.objects

    def get_all(self):
        return self.manager.all()
