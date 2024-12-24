from django.urls import path
from . import views

urlpatterns = [
    path('soins/creer/', views.creer_soin, name='creer_soin'),
    path('soins/dpi/<int:dpi_id>/', views.Soins_par_dpi, name='Soins_par_dpi'),
    path('soins/<int:pk>/modifier-status/', views.modifier_status_soin, name='modifier_status_soin'),
]

