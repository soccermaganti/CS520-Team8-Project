from rest_framework import serializers
from .models import Patient, Doctor

class CreatePatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('name', 'email', 'phone_num', 'dob')

class CreateDoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ('department', 'specialty','name', 'email', 'phone_num')