
from django.urls import path
from . import views

urlpatterns = [
     path('consultations/creer/', views.creer_consultation, name='creer_consultation'),
    path('consultations/dpi/<int:dpi_id>/', views.liste_consultations_par_dpi, name='liste_consultations_par_dpi'),
]

