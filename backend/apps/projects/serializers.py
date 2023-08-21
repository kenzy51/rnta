from rest_framework import serializers

from .models import Project, Agent, SystemReward, Labor
from apps.clients.serializers import ClientSerializer


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class ProjectReadSerializer(serializers.ModelSerializer):
    client = ClientSerializer(read_only=True)
    agent = serializers.StringRelatedField(read_only=True)
    service = serializers.StringRelatedField(read_only=True)
    service_details = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Project
        fields = '__all__'


class AgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = '__all__'


class SystemRewardSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemReward
        fields = '__all__'


class LaborSerializer(serializers.ModelSerializer):
    project_name = serializers.CharField(source='project.name', read_only=True)
    employee_full_name = serializers.CharField(source='employee.full_name', read_only=True)

    class Meta:
        model = Labor
        fields = '__all__'
