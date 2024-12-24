from django.urls import path
from . import views

urlpatterns = [
    path('ordonnances/creer/', views.creer_ordonnance, name='creer_ordonnance'),
    path('ordonnances/consultation/<int:consultation_id>/', views.ordonnances_par_consultation, name='ordonnances_par_consultation'),
    path('ordonnances/dpi/<int:dpi_id>/', views.ordonnances_par_dpi, name='ordonnances_par_dpi'),
    path('ordonnances/<int:ordonnance_id>/', views.ordonnance_details, name='ordonnance_details'),
    path('ordonnances/<int:ordonnance_id>/valider/', views.valider_ordonnance, name='valider_ordonnance'),
]
