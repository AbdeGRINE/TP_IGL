from django.urls import path
from . import views

urlpatterns = [
    path('demander_bilan/', views.demander_bilan),
    path('consulter_bilans_biologiques_en_cours/', views.consulter_bilans_biologiques_en_cours),
    path('consulter_bilans_radiologiques_en_cours/', views.consulter_bilans_radiologiques_en_cours),
    path('saisir_resultat_bilan_biologique/', views.saisir_resultat_bilan_biologique),

]