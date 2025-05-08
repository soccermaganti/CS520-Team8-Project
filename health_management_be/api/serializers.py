from rest_framework import serializers
from .models import Patient, Doctor

class CreatePatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('name', 'email', 'phone_num', 'dob')

class GetPatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('email',)

class UpdatePatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('pid','name', 'email', 'phone_num', 'dob')

class DeletePatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('pid',)

class GetDoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ('doctor_id',)

class CreateDoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ('specialty','name', 'email', 'phone_num')

class UpdateDoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ('doctor_id','specialty','name', 'email', 'phone_num')

class DeleteDoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ('doctor_id',)