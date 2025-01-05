from django.urls import path
from . import views

urlpatterns = [
    path('creer/', views.creer_ordonnance, name='creer_ordonnance'),
    path('consultation/<int:consultation_id>/', views.ordonnances_par_consultation, name='ordonnances_par_consultation'),
    path('dpi/<int:dpi_id>/', views.ordonnances_par_dpi, name='ordonnances_par_dpi'),
    path('<int:ordonnance_id>/', views.ordonnance_details, name='ordonnance_details'),
    path('<int:ordonnance_id>/valider/', views.valider_ordonnance, name='valider_ordonnance'),
    path('<int:ordonnance_id>/valider/', views.valider_ordonnance, name='valider_ordonnance'),
    path('choix_medicaments/', views.liste_medicaments, name='liste_medicaments'),

]
