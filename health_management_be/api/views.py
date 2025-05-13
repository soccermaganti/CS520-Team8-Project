from django.shortcuts import render
# from django.http import HttpResponse
from rest_framework import generics, status
from .serializers import CreatePatientSerializer, GetPatientSerializer, UpdatePatientSerializer, DeletePatientSerializer, CreateDoctorSerializer, GetDoctorSerializer, UpdateDoctorSerializer, DeleteDoctorSerializer
from .models import supabase
from rest_framework.views import APIView
from rest_framework.response import Response
import json

# # Create your views here.
# def main(request):
#     return HttpResponse('<h1> hello <h1>')

class SupabaseReadPatientView(generics.CreateAPIView):
    serializer_class = GetPatientSerializer

    # def post(self, request):
    #     if not self.request.session.exists(request.session.session_key):
    #         self.request.session.create()
        
    #     serializer = self.serializer_class(data=request.data)
    #     if serializer.is_valid():
    #         email = serializer.validated_data.get('email')
    #         queryset = supabase.table("Patient").select("*").eq('email', email).execute()
    #         return Response(queryset, status=status.HTTP_202_ACCEPTED)
    def get(self, request):
        if not self.request.session.exists(request.session.session_key): 
            self.request.session.create()
        
        email = request.query_params.get('email')
        if email:
            queryset = supabase.table("Patient").select("*").eq('email', email).execute()
            return Response(queryset, status=status.HTTP_202_ACCEPTED)
        else:
            queryset = supabase.table("Patient").select("*").execute()
            return Response(queryset, status=status.HTTP_200_OK)
    
class SupabaseCreatePatientView(generics.CreateAPIView):
    serializer_class = CreatePatientSerializer

    def post(self, request):
        if not self.request.session.exists(request.session.session_key): 
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            data.update({'dob': data['dob'].strftime('%Y-%m-%d')}) 
            supabase.table("Patient").insert(data).execute()
            query = supabase.table("Patient").select("*").eq('email', data['email']).execute()
            return Response(query, status=status.HTTP_201_CREATED)

class SupabaseUpdatePatientView(generics.UpdateAPIView):
    serializer_class = UpdatePatientSerializer

    def put(self, request):
        if not self.request.session.exists(request.session.session_key): 
            self.request.session.create()
        pid = request.data['pid']
        data = request.data.dict()
        del data['pid']
        data = dict(filter(lambda item: item[1] is not '', data.items()))
        print(data)
        query = supabase.table("Patient").update(data).eq('pid', pid).execute()
        return Response(query, status=status.HTTP_200_OK)

class SupabaseDeletePatientView(generics.UpdateAPIView):
    serializer_class = DeletePatientSerializer

    def post(self, request):
        if not self.request.session.exists(request.session.session_key): 
            self.request.session.create()
        pid = request.data['pid']
        query = supabase.table("Patient").delete().eq('pid', pid).execute()
        return Response(query, status=status.HTTP_204_NO_CONTENT)

class SupabaseGetDoctorView(APIView):
    serializer_class = GetDoctorSerializer

    # def post(self, request):
    #     if not self.request.session.exists(request.session.session_key):
    #         self.request.session.create()
        
    #     serializer = self.serializer_class(data=request.data)
    #     if serializer.is_valid():
    #         email = serializer.validated_data.get('email')
    #         queryset = supabase.table("Doctor").select("*").eq('email', email).execute()
    #         return Response(queryset, status=status.HTTP_202_ACCEPTED)
    def get(self, request):
        if not self.request.session.exists(request.session.session_key): 
            self.request.session.create()
        
        email = request.query_params.get('email')
        if email:
            queryset = supabase.table("Doctor").select("*").eq('email', email).execute()
            return Response(queryset, status=status.HTTP_202_ACCEPTED)
        else:
            queryset = supabase.table("Doctor").select("*").execute()
            return Response(queryset, status=status.HTTP_200_OK)
    

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

class SupabaseUpdateDoctorView(generics.UpdateAPIView):
    serializer_class = UpdateDoctorSerializer

    def put(self, request):
        if not self.request.session.exists(request.session.session_key): 
            self.request.session.create()
        pid = request.data['doctor_id']
        data = request.data.dict()
        del data['doctor_id']
        data = dict(filter(lambda item: item[1] is not '', data.items()))
        print(data)
        query = supabase.table("Doctor").update(data).eq('doctor_id', pid).execute()
        return Response(query, status=status.HTTP_200_OK)

class SupabaseDeleteDoctorView(generics.UpdateAPIView):
    serializer_class = DeleteDoctorSerializer

    def post(self, request):
        if not self.request.session.exists(request.session.session_key): 
            self.request.session.create()
        pid = request.data['doctor_id']
        query = supabase.table("Doctor").delete().eq('doctor_id', pid).execute()
        return Response(query, status=status.HTTP_204_NO_CONTENT)