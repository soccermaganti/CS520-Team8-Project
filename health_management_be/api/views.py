from django.shortcuts import render
# from django.http import HttpResponse
from rest_framework import generics, status
from .serializers import CreatePatientSerializer, CreateDoctorSerializer
from .models import supabase
from rest_framework.views import APIView
from rest_framework.response import Response

# # Create your views here.
# def main(request):
#     return HttpResponse('<h1> hello <h1>')

class SupabasePatientView(APIView):
    # serializer_class = PatientSerializer
    def get(self, request):
        if not self.request.session.exists(request.session.session_key):
            self.request.session.create()
        queryset = supabase.table("Patient").select("*").execute()
        return Response(queryset, status=status.HTTP_202_ACCEPTED)
    
class SupabaseCreatePatientView(APIView):
    serializer_class = CreatePatientSerializer

    def post(self, request):
        if not self.request.session.exists(request.session.session_key): 
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            data.update({'dob': data['dob'].strftime('%Y-%m-%d')}) 
            supabase.table("Patient").insert(data).execute()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

class SupabaseDoctorView(APIView):
    def get(self, request):
        if not self.request.session.exists(request.session.session_key):
            self.request.session.create()
        queryset = supabase.table("Doctor").select("*").execute()
        return Response(queryset, status=status.HTTP_202_ACCEPTED)

class SupabaseCreateDoctorView(APIView):
    serializer_class = CreateDoctorSerializer

    def post(self, request):
        if not self.request.session.exists(request.session.session_key): 
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            supabase.table("Doctor").insert(data).execute()
            return Response(serializer.data, status=status.HTTP_201_CREATED)