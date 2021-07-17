from django.db import models
from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Dataset, Membership


User = get_user_model()


class DatasetSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    patient_name = serializers.CharField(max_length=100)
    phase = models.CharField(max_length=100, default='undefined')
    role = serializers.SerializerMethodField()

    def get_role(self, obj):
        request = self.context.get("request")
        membership = Membership.objects.get(
            dataset__id=obj.id, user=request.user)

        return membership.role

    class Meta:
        model = Dataset
        fields = ['id', 'patient_name', 'phase', 'role']
