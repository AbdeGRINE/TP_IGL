from django.urls import path
from . import views

urlpatterns = [
    path('demander_bilan/', views.demander_bilan),
    path('consulter_bilans_biologiques_en_cours/', views.consulter_bilans_biologiques_en_cours),
    path('consulter_bilans_radiologiques_en_cours/', views.consulter_bilans_radiologiques_en_cours),
    path('consulter_bilans/', views.consulter_bilans),
    path('saisir_resultat_bilan_biologique/', views.saisir_resultat_bilan_biologique),
    path('saisir_resultat_bilan_radiologique/', views.saisir_resultat_bilan_radiologique),
    path('consulter_bilan_biologique/', views.consulter_bilan_biologique),
    path('consulter_bilan_radiologique/', views.consulter_bilan_radiologique),
    path('envoyer_donnees_graphes/',views.envoyer_donnees_graphes),
    path('consulter_bilans_biologiques_en_cours_with_Patients/',views.consulter_bilans_biologiques_en_cours_with_Patients),
    path('consulter_bilan_biologique_tests/',views.consulter_bilan_biologique_tests),
    path('update_test_results/',views.update_test_results),
]
