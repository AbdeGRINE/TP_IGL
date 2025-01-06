from rest_framework import serializers
from django.contrib.auth.models import User
from Ordonnance.serializers import OrdonnanceSerializer
from bilan.serializers import BilanSerializer
from users.models import Consultation, Resume

class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = ['id', 'date', 'dpi']

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ['id','date_prochaine_consultation', 'mesures_prises', 'autres']

class ConsultationDetailSerializer(serializers.ModelSerializer):
    resumes = ResumeSerializer(source='resume_set', many=True)  # Inclure les résumés
    ordonnances = OrdonnanceSerializer(source='ordonnance_set',many=True, read_only=True)
    bilans = BilanSerializer(source='bilan_set',many=True, read_only=True)
    
    class Meta:
        model = Consultation
        fields = ['id', 'date', 'medecin_consulte', 'ordonnances', 'bilans', 'dpi', 'resumes']

