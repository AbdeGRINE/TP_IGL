from django.urls import path
from . import views

urlpatterns = [
    path('authentifier_utilisateur/', views.authentifier_utilisateur),
    path('inscrire_utilisateur/', views.inscrire_utilisateur),
    path('deconnecter_utilisateur/', views.deconnecter_utilisateur),
    path('obtenir_utilisateur_connecte/', views.obtenir_utilisateur_connecte),
]