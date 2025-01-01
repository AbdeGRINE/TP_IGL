from rest_framework import serializers
from users.models import DPI, Medcin, Etablissement, Patient

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ["NSS", "nom", "prenom", "date_naissance", "adresse", "mutuelle", "personne_a_contacter"]



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









class SimpleMedcinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medcin
        fields = ['id', 'nom', 'prenom', 'specialite']

class SimpleEtablissementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etablissement
        fields = ['id', 'nom', 'adresse']

class SimpleDPISerializer(serializers.ModelSerializer):
    medecin_traitant = SimpleMedcinSerializer()
    etablissement_courant = SimpleEtablissementSerializer()
    patient_nom = serializers.CharField(source='patient.nom')
    patient_prenom = serializers.CharField(source='patient.prenom')

    class Meta:
        model = DPI
        fields = ['id', 'patient_nom', 'patient_prenom', 'medecin_traitant', 'etablissement_courant']


