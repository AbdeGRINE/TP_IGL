from django.urls import path
from .views import creer_dpi, consulter_dpi, rechercher_dpi_nss    #, rechercher_dpi_qrcode  # Importer la nouvelle vue
from . import views

urlpatterns = [
    path('creer/', creer_dpi.as_view(), name='creer_dpi'),
    path('consulter-dpi/<int:dpi_id>/', consulter_dpi.as_view(), name='consulter_dpi'),
    path('rechercher-dpi/', rechercher_dpi_nss.as_view(), name='rechercher_dpi_nss'),
    #path('rechercher-dpi-qrcode/', rechercher_dpi_qrcode.as_view(), name='rechercher_dpi_qrcode'), 
     
]


   
