from django.shortcuts import render
# from django.http import HttpResponse
from rest_framework import generics, status
from .serializers import PatientSerializer, CreatePatientSerializer
from .models import Patient
from rest_framework.views import APIView
from rest_framework.response import Response

# # Create your views here.
# def main(request):
#     return HttpResponse('<h1> hello <h1>')

class PatientView(generics.CreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class CreatePatientView(APIView):
    serializer_class = CreatePatientSerializer

    def post(self, request):
        if not self.request.session.exists(request.session.session_key): 
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)