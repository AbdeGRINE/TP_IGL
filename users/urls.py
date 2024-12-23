from django.urls import path
from . import views

urlpatterns = [
    path('authentifier_utilisateur/', views.authentifier_utilisateur),
    path('inscrire_utilisateur/', views.inscrire_utilisateur),
    path('deconnecter_utilisateur/', views.deconnecter_utilisateur),
    path('obtenir_utilisateur_connecte/', views.obtenir_utilisateur_connecte),
    path('consultations/creer/', views.creer_consultation, name='creer_consultation'),
    path('consultations/dpi/<int:dpi_id>/', views.liste_consultations_par_dpi, name='liste_consultations_par_dpi'),
    path('ordonnances/creer/', views.creer_ordonnance, name='creer_ordonnance'),
    path('ordonnances/consultation/<int:consultation_id>/', views.ordonnances_par_consultation, name='ordonnances_par_consultation'),
    path('ordonnances/dpi/<int:dpi_id>/', views.ordonnances_par_dpi, name='ordonnances_par_dpi'),
    path('ordonnances/<int:ordonnance_id>/', views.ordonnance_details, name='ordonnance_details'),
    path('ordonnances/<int:ordonnance_id>/valider/', views.valider_ordonnance, name='valider_ordonnance'),
    path('soins/creer/', views.creer_soin, name='creer_soin'),
    path('soins/dpi/<int:dpi_id>/', views.Soins_par_dpi, name='Soins_par_dpi'),
    path('soins/<int:pk>/modifier-status/', views.modifier_status_soin, name='modifier_status_soin'),
]

