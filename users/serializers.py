from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Patient, Medcin, Laborantin, Radiologue, Infermier, Etablissement


class UserSerializer (serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields =['id','username','password','email']



class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['NSS', 'nom', 'prenom', 'date_naissance', 'adresse', 'mutuelle']


class MedcinSerializer(serializers.ModelSerializer):
    etablissement = serializers.PrimaryKeyRelatedField(queryset=Etablissement.objects.all())
    class Meta:
        model = Medcin
        fields = ['id', 'nom', 'prenom','specialite','etablissement']


# class PharmacienSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Medcin
#         fields = ['id', 'nom', 'prenom']

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
        fields = ['id', 'nom', 'prenom','etablissement']

class EtablissementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etablissement
        fields = ['id', 'nom', 'adresse']

# class AdministratifSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Medcin
#         fields = ['id', 'nom', 'prenom']

