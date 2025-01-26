from rest_framework import serializers
from users.models import DPI,Bilan, Consultation, Test, CompteRendu, Image, TypeBilan,StatusBilan,Patient
from users.serializers import MedcinSerializer

class BilanSerializer(serializers.ModelSerializer):
    consultation = serializers.PrimaryKeyRelatedField(queryset=Consultation.objects.all())
    class Meta:
        model = Bilan
        fields = ['id','nom', 'date_demande', 'date_recuperation', 'status', 'type', 'redigant_laborantin', 'redigant_radiologue', 'consultation', 'graphique']


class PatientBilanSerializer(serializers.ModelSerializer):
    medecin = serializers.SerializerMethodField()
    dateDeCreation = serializers.SerializerMethodField()
    bilans = serializers.SerializerMethodField()
    
    class Meta:
        model = Patient
        fields = ['id', 'nom', 'medecin', 'dateDeCreation', 'bilans']
    
    def get_medecin(self, obj):
        # Get the DPI for this patient
        dpi = DPI.objects.filter(patient=obj).first()
        if dpi:
            return MedcinSerializer(dpi.medecin_traitant).data
        return None
    
    def get_dateDeCreation(self, obj):
        # Get the DPI creation date
        dpi = DPI.objects.filter(patient=obj).first()
        if dpi:
            return dpi.date_creation
        return None
    
    def get_bilans(self, obj):
        # Get bilans through DPI and consultations
        bilans = Bilan.objects.filter(
            consultation__dpi__patient=obj,
            type=TypeBilan.BIOLOGIQUE,
            status=StatusBilan.EN_COURS
        )
        return BilanSerializer(bilans, many=True).data

class TestSerializer(serializers.ModelSerializer):
    bilan = serializers.PrimaryKeyRelatedField(queryset=Bilan.objects.all())
    class Meta:
        model = Test
        fields = ['id','nom', 'resultat', 'unite', 'autres', 'bilan']

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