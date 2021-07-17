from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()


class Dataset(models.Model):
    patient_name = models.CharField(max_length=100)
    phase = models.CharField(default='undefined', max_length=100)
    volume_url = models.CharField(max_length=2083, default='')
    annotation_url = models.CharField(max_length=2083, default='')
    header = models.JSONField(default=dict())
    members = models.ManyToManyField(User, through='Membership')


class Membership(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    role = models.CharField(max_length=10)
