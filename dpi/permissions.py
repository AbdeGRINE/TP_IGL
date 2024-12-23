from rest_framework.permissions import BasePermission

class IsDoctorOrAdministrative(BasePermission):
    def has_permission(self, request, view):
        # Vérifiez si l'utilisateur est authentifié et a le rôle de médecin ou administratif
        return request.user.is_authenticated and request.user.role in ["doctor", "administrative"]

class IsDoctorOrPatient(BasePermission):
    def has_permission(self, request, view):
        # Vérifiez si l'utilisateur est authentifié et a le rôle de médecin ou patient
        return request.user.is_authenticated and request.user.role in ["doctor", "patient"]
