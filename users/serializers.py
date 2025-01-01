from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Patient, Medcin, Laborantin, Radiologue, Infermier, Etablissement, Admin

class UserSerializer (serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields =['id','username','password','email','type']

    
    def get_type(self, obj):
        if hasattr(obj, 'patient'):
            return 'patient'
        elif hasattr(obj, 'medcin'):
            return 'medcin'
        elif hasattr(obj, 'laborantin'):
            return 'laborantin'
        elif hasattr(obj, 'radiologue'):
            return 'radiologue'
        elif hasattr(obj, 'infirmier'):
            return 'infirmier'
        elif hasattr(obj, 'administratif'):
            return 'administratif'
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