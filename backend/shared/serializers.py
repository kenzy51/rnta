from rest_framework import serializers


class ChoicesSerializer(serializers.Serializer):
    value = serializers.CharField()
    display_name = serializers.CharField()

    def to_representation(self, obj):
        return {'value': str(obj[0]), 'display_name': str(obj[1])}


class EmptySerializer(serializers.Serializer):
    pass
