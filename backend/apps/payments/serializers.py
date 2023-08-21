from rest_framework import serializers

from .models import ClientInvoice, ProjectExpense, ManagerBonus


class ClientInvoiceSerializer(serializers.ModelSerializer):
    service = serializers.CharField(source='project.service', read_only=True)

    class Meta:
        model = ClientInvoice
        fields = '__all__'


class ProjectExpenseSerializer(serializers.ModelSerializer):
    project_name = serializers.StringRelatedField(read_only=True, source='project.name')
    service = serializers.StringRelatedField(read_only=True, source='project.service')

    class Meta:
        model = ProjectExpense
        fields = '__all__'


class ManagerBonusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ManagerBonus
        fields = '__all__'
