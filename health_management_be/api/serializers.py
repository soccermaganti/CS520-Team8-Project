from rest_framework import serializers
from .models import Patient

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('pid','doctor_id', 'name', 'email', 'phone_num', 'dob')   

class CreatePatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('name', 'email', 'phone_num', 'dob')