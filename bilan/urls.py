from django.urls import path
from . import views

urlpatterns = [
    path('demander_bilan/', views.demander_bilan),
]