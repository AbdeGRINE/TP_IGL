from django.urls import path
from . import views

urlpatterns = [
    path('creer/', views.creer_soin, name='creer_soin'),
    path('dpi/<int:dpi_id>/', views.Soins_par_dpi, name='Soins_par_dpi'),
    path('<int:pk>/modifier-status/', views.modifier_status_soin, name='modifier_status_soin'),
]

