
from django.urls import path
from . import views

urlpatterns = [
    path('creer/', views.creer_consultation, name='creer_consultation'),
    path('dpi/<int:dpi_id>/', views.liste_consultations_par_dpi, name='liste_consultations_par_dpi'),
    path('resume/', views.enregistrer_resume_consultation, name='enregistrer_resume_consultation'),
    path('<int:consultation_id>/', views.consultation_detail, name='consultation_detail'),
]

