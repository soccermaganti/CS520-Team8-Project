from django.urls import path
from .views import SupabasePatientView, SupabaseCreatePatientView, SupabaseCreateDoctorView, SupabaseDoctorView

urlpatterns = [
    # path('inmemory', PatientView.as_view()),
    path('patients', SupabasePatientView.as_view()),
    path('create_patient', SupabaseCreatePatientView.as_view()),
    path('doctors', SupabaseDoctorView.as_view()),
    path('create_doctor', SupabaseCreateDoctorView.as_view())
    # path('', main)

]