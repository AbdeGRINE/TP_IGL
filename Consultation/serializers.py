from rest_framework import serializers
from django.contrib.auth.models import User
from users.models import Consultation, Resume

class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = ['id', 'date', 'medecin_consulte','dpi']

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ['id','date_prochaine_consultation', 'mesures_prises', 'autres']

class ConsultationDetailWithResumeSerializer(serializers.ModelSerializer):
    resumes = ResumeSerializer(source='resume_set', many=True)  # Inclure les résumés

    class Meta:
        model = Consultation
        fields = ['id', 'date', 'medecin_consulte', 'dpi', 'resumes']

