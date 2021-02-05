from rest_framework import serializers
# from .models import Candidate
from client.models import Client, Job


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'


class ClientSerializer(serializers.ModelSerializer):
    # jobs = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    jobs = JobSerializer(many=True, read_only=True, allow_null=True)

    class Meta:
        model = Client
        fields = '__all__'
