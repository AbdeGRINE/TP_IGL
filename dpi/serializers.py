from rest_framework import serializers
from users.models import DPI, Medcin, Etablissement, Patient

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ["NSS", "nom", "prenom", "date_naissance", "adresse", "mutuelle"]



class MedcinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medcin
        fields = ['id', 'nom', 'prenom']

class EtablissementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etablissement
        fields = ['id', 'nom', 'adresse']

class DPISerializer(serializers.ModelSerializer):
    patient = PatientSerializer()  # Imbriquer les détails du patient
    medecin_traitant = MedcinSerializer()  # Imbriquer les détails du médecin
    etablissement_courant = EtablissementSerializer()  # Imbriquer les détails de l'établissement

    class Meta:
        model = DPI
        fields = ['id', 'patient', 'medecin_traitant', 'etablissement_courant', 'qr_code']



