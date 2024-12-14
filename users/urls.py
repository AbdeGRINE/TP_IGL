from django.urls import path
from . import views

urlpatterns = [
    path('authentifier_utilisateur/', views.authentifier_utilisateur),
    path('inscrire_utilisateur/', views.inscrire_utilisateur),
    path('deconnecter_utilisateur/', views.deconnecter_utilisateur),
    path('obtenir_utilisateur_connecte/', views.obtenir_utilisateur_connecte),
    path('consultation/creer/', views.creer_consultation, name='creer_consultation'),
    path('consultations/', views.liste_consultations_utilisateur, name='liste_consultations_utilisateur'),
]