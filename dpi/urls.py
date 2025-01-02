from django.urls import path
from .views import ListerDPI_par_medecin,  ListerDPIByBiologiqueStatus, ListerDPIByRadiologiqueStatus, creer_dpi, consulter_dpi, rechercher_dpi_nss, ListerDPI    #, rechercher_dpi_qrcode  # Importer la nouvelle vue
from . import views

urlpatterns = [
    path('creer/', creer_dpi.as_view(), name='creer_dpi'),
    path('consulter-dpi/<int:dpi_id>/', consulter_dpi.as_view(), name='consulter_dpi'),
    path('rechercher-dpi/', rechercher_dpi_nss.as_view(), name='rechercher_dpi_nss'),
    path('listerall/', ListerDPI.as_view(), name='lister_dpi'),
    path('lister_par_medecin/<int:medecin_id>/', ListerDPI_par_medecin.as_view(), name='ListerDPI_par_medecin'),
    path('radiologique/', ListerDPIByRadiologiqueStatus.as_view(), name='ListerDPIByRadiologiqueStatus'),
    path('biologique/', ListerDPIByBiologiqueStatus.as_view(), name='ListerDPIByBiologiqueStatus'),
    #path('rechercher-dpi-qrcode/', rechercher_dpi_qrcode.as_view(), name='rechercher_dpi_qrcode'), 
     
]




