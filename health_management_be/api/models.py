from django.db import models
import uuid

# Create your models here. make in memory model
class Patient(models.Model):
    pid = models.UUIDField(primary_key=True, default= uuid.uuid4)
    doctor_id = models.UUIDField(null=True)
    name = models.CharField(max_length=20)
    email = models.CharField(max_length=20)
    phone_num = models.CharField(max_length=20)
    dob = models.DateField()

class Doctor(models.Model):
    doctor_id = models.UUIDField()
    name = models.CharField(max_length=20)
    email = models.CharField(max_length=20)
    phone_num = models.CharField(max_length=20)
    dob = models.DateField()