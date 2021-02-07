from rest_framework import serializers
from client.models import Client, Job, Outreach


class OutreachSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outreach
        fields = '__all__'

    # override
    def create(self, validated_data):
        return Outreach.objects.create(
            state=validated_data.get("state"), editor_state=validated_data.get("editor_state"),
            job=validated_data.get("job"),
        )


class JobSerializer(serializers.ModelSerializer):
    outreaches = OutreachSerializer(many=True, read_only=True, allow_null=True)

    class Meta:
        model = Job
        fields = '__all__'


class ClientSerializer(serializers.ModelSerializer):
    # jobs = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    jobs = JobSerializer(many=True, read_only=True, allow_null=True)

    class Meta:
        model = Client
        fields = '__all__'
