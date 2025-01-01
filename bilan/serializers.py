from rest_framework import serializers
from users.models import Bilan, Consultation, Test, CompteRendu, Image

class BilanSerializer(serializers.ModelSerializer):
    consultation = serializers.PrimaryKeyRelatedField(queryset=Consultation.objects.all())
    class Meta:
        model = Bilan
        fields = ['nom', 'date_demande', 'date_recuperation', 'status', 'type', 'redigant_laborantin', 'redigant_radiologue', 'consultation', 'graphique']

class TestSerializer(serializers.ModelSerializer):
    bilan = serializers.PrimaryKeyRelatedField(queryset=Bilan.objects.all())
    class Meta:
        model = Test
        fields = ['nom', 'resultat', 'unite', 'autres', 'bilan']

class GraphiqueSerializer(serializers.Serializer):
    graphique = serializers.CharField(max_length=255)

class CompteRenduSerializer(serializers.ModelSerializer):
    bilan = serializers.PrimaryKeyRelatedField(queryset= Bilan.objects.all())
    class Meta:
        model = CompteRendu
        fields = ['nom','resultat','bilan']

class ImageSerializer(serializers.ModelSerializer):
    # compterendu = serializers.PrimaryKeyRelatedField(queryset= CompteRendu.objects.all())
    class Meta:
        model = Image
        fields = ['donnee','compte_rendu']
        read_only_fields = ['compte_rendu']