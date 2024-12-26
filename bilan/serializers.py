from rest_framework import serializers
from users.models import Bilan, Consultation, Test

class BilanSerializer(serializers.ModelSerializer):
    consultation = serializers.PrimaryKeyRelatedField(queryset=Consultation.objects.all())
    class Meta:
        model = Bilan
        fields = ['nom', 'date_demande', 'date_recuperation', 'status', 'type', 'redigant_laborantin', 'redigant_radiologue', 'consultation']

class TestSerializer(serializers.ModelSerializer):
    bilan = serializers.PrimaryKeyRelatedField(queryset=Bilan.objects.all())
    class Meta:
        model = Test
        fields = ['nom', 'resultat', 'unite', 'autres', 'bilan']