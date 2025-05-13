from django.urls import path
from .views import SupabaseReadPatientView, SupabaseCreatePatientView, SupabaseUpdatePatientView, SupabaseDeletePatientView, SupabaseCreateDoctorView, SupabaseGetDoctorView, SupabaseUpdateDoctorView, SupabaseDeleteDoctorView

urlpatterns = [
    # path('inmemory', PatientView.as_view()),
    path('read_patient', SupabaseReadPatientView.as_view()),
    path('create_patient', SupabaseCreatePatientView.as_view()),
    path('update_patient', SupabaseUpdatePatientView.as_view()),
    path('delete_patient', SupabaseDeletePatientView.as_view()),

    path('read_doctor', SupabaseGetDoctorView.as_view()),
    path('create_doctor', SupabaseCreateDoctorView.as_view()),
    path('update_doctor', SupabaseUpdateDoctorView.as_view()),
    path('delete_doctor', SupabaseDeleteDoctorView.as_view()),

    
    # path('', main)

]