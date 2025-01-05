from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Patient, Medcin, Laborantin, Radiologue, Infermier, Etablissement, Admin

class UserSerializer (serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    class Meta(object):
        model = User
        fields =['id','username','password','email','type']

    
    def get_type(self, obj):
        if hasattr(obj, 'patient'):
            return {"type": "patient", "id": obj.patient.id}
        elif hasattr(obj, 'medcin'):
            return {"type": "medcin", "id": obj.medcin.id}
        elif hasattr(obj, 'laborantin'):
            return {"type": "laborantin", "id": obj.laborantin.id}
        elif hasattr(obj, 'radiologue'):
            return {"type": "radiologue", "id": obj.radiologue.id}
        elif hasattr(obj, 'infermier'):
            return {"type": "infermier", "id": obj.infermier.id}
        elif hasattr(obj, 'admin'):
            return {"type": "admin", "id": obj.admin.id}
        return None


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['NSS', 'nom', 'prenom', 'date_naissance', 'adresse', 'mutuelle']


class MedcinSerializer(serializers.ModelSerializer):
    etablissement = serializers.PrimaryKeyRelatedField(queryset=Etablissement.objects.all())
    class Meta:
        model = Medcin
        fields = ['id', 'nom', 'prenom','specialite','etablissement']



class LaborantinSerializer(serializers.ModelSerializer):
    etablissement = serializers.PrimaryKeyRelatedField(queryset=Etablissement.objects.all())
    class Meta:
        model = Laborantin
        fields = ['id', 'nom', 'prenom','etablissement']

class RadiologueSerializer(serializers.ModelSerializer):
    etablissement = serializers.PrimaryKeyRelatedField(queryset=Etablissement.objects.all())
    class Meta:
        model = Radiologue
        fields = ['id', 'nom', 'prenom','etablissement']

class InfirmierSerializer(serializers.ModelSerializer):
    etablissement = serializers.PrimaryKeyRelatedField(queryset=Etablissement.objects.all())
    class Meta:
        model = Infermier
        fields = ['id', 'nom', 'prenom','groupe','etablissement']
        read_only_fields = ['groupe']

class EtablissementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etablissement
        fields = ['id', 'nom', 'adresse']

class AdministratifSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ['id', 'nom', 'prenom']