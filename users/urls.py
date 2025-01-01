from django.urls import path
from . import views

urlpatterns = [
    path('authentifier_utilisateur/', views.authentifier_utilisateur),
    path('inscrire_utilisateur/', views.inscrire_utilisateur),
    path('deconnecter_utilisateur/', views.deconnecter_utilisateur),
    path('obtenir_utilisateur_connecte/', views.obtenir_utilisateur_connecte),
<<<<<<< HEAD
    path('creer_patient', views.creer_patient),
    path('creer_medcin', views.creer_medcin),
    # path('creer_pharmacien', views.creer_pharmacien),
    path('creer_laborantin', views.creer_laborantin),
    path('creer_radiologue', views.creer_radiologue),
    path('creer_infirmier', views.creer_infirmier),
    # path('creer_administratif', views.creer_administratif),
=======
>>>>>>> origin/Grine/Ajout_fonctionnalités
]

