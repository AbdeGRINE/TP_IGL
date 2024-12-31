from django.urls import path
from . import views

urlpatterns = [
    path('authentifier_utilisateur/', views.authentifier_utilisateur),
    path('inscrire_utilisateur/', views.inscrire_utilisateur),
    path('deconnecter_utilisateur/', views.deconnecter_utilisateur),
    path('obtenir_utilisateur_connecte/', views.obtenir_utilisateur_connecte),
    path('creer_patient/', views.creer_patient),
    path('creer_medcin/', views.creer_medcin), 
    path('creer_laborantin/', views.creer_laborantin),
    path('creer_radiologue/', views.creer_radiologue),
    path('creer_infirmier/', views.creer_infirmier),
    path('creer_administratif/', views.creer_administratif),
    path('consulter_profil_patient/',views.consulter_profil_patient),
    path('consulter_profil_medcin/',views.consulter_profil_medcin),
    path('consulter_profil_laborantin/',views.consulter_profil_laborantin),
    path('consulter_profil_radiologue/',views.consulter_profil_radiologue),
    path('consulter_profil_infirmier/',views.consulter_profil_infirmier),
    path('consulter_profil_administratif/',views.consulter_profil_administratif),
]