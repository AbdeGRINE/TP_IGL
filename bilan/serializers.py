from rest_framework import serializers
from users.models import Bilan, Consultation

class BilanSerializer(serializers.ModelSerializer):
    consultation = serializers.PrimaryKeyRelatedField(queryset=Consultation.objects.all())
    class Meta:
        model = Bilan
        fields = ['nom', 'date_demande', 'date_recuperation', 'status', 'type', 'redigant_laborantin', 'redigant_radiologue', 'consultation']