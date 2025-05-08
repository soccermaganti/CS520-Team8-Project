from django.db import models
import uuid

import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.environ.get("NEXT_PUBLIC_SUPABASE_PRIVATE_KEY")
supabase: Client = create_client(url, key)

# Create your models here. make in memory model
class Patient(models.Model):
    pid = models.UUIDField(primary_key=True, default= uuid.uuid4)
    # doctor_id = models.UUIDField(null=True)
    name = models.CharField(max_length=20)
    email = models.CharField(max_length=20)
    phone_num = models.CharField(max_length=20)
    dob = models.DateField()

class Doctor(models.Model):
    doctor_id = models.UUIDField()
    specialty = models.CharField(max_length=20)
    name = models.CharField(max_length=20)
    email = models.CharField(max_length=20)
    phone_num = models.CharField(max_length=20)


