from rest_framework.permissions import BasePermission
from .models import Medcin, Patient, Infermier, Laborantin, Radiologue  

class IsDoctor(BasePermission):
    """
    Permission personnalisée pour permettre uniquement aux utilisateurs médecins d'accéder.
    """
    def has_permission(self, request, view):
        # Vérifie si l'utilisateur est un médecin en cherchant dans le modèle Medcin
        return Medcin.objects.filter(user=request.user).exists()


class IsPatient(BasePermission):
    """
    Permission personnalisée pour permettre uniquement aux utilisateurs patients d'accéder.
    """
    def has_permission(self, request, view):
        # Vérifie si l'utilisateur est un patient en cherchant dans le modèle Patient
        return Patient.objects.filter(user=request.user).exists()


class IsAdmin(BasePermission):
    """
    Permission personnalisée pour permettre uniquement aux utilisateurs admin d'accéder.
    """
    def has_permission(self, request, view):
        # Vérifie si l'utilisateur appartient au groupe admin
        return request.user.groups.filter(name='admin').exists()


class IsInfermier(BasePermission):
    """
    Permission personnalisée pour permettre uniquement aux utilisateurs infirmiers d'accéder.
    """
    def has_permission(self, request, view):
        # Vérifie si l'utilisateur est un infirmier en cherchant dans le modèle Infermier
        return Infermier.objects.filter(user=request.user).exists()


class IsLaborantin(BasePermission):
    """
    Permission personnalisée pour permettre uniquement aux utilisateurs laborantins d'accéder.
    """
    def has_permission(self, request, view):
        # Vérifie si l'utilisateur est un laborantin en cherchant dans le modèle Laborantin
        return Laborantin.objects.filter(user=request.user).exists()


class IsRadiologue(BasePermission):
    """
    Permission personnalisée pour permettre uniquement aux utilisateurs radiologues d'accéder.
    """
    def has_permission(self, request, view):
        # Vérifie si l'utilisateur est un radiologue en cherchant dans le modèle Radiologue
        return Radiologue.objects.filter(user=request.user).exists()


