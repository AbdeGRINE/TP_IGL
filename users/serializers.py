from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Resume,Consultation

class UserSerializer (serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields =['id','username','password','email']

class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = ['id', 'date', 'dpi']

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ['date_prochaine_consultation', 'mesures_prises', 'autres']


class ConsultationDetailWithResumeSerializer(serializers.ModelSerializer):
    resumes = ResumeSerializer(source='resume_set', many=True)  # Inclure les résumés

    class Meta:
        model = Consultation
        fields = ['id', 'date', 'medecin_consulte', 'dpi', 'resumes']
