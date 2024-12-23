from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Patient, Resume,Consultation, Soin,Traitement,Ordonnance,Medicament

class UserSerializer (serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields =['id','username','password','email']

class UserCreateForPatientSerializer(serializers.ModelSerializer):
    patient = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'patient']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        # Lier le patient à l'utilisateur créé
        user.patient = validated_data['patient']
        user.save()
        return user

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

class MedicamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicament
        fields = ['id', 'nom', 'code']

class TraitementSerializer(serializers.ModelSerializer):
    medicament = serializers.PrimaryKeyRelatedField(queryset=Medicament.objects.all())
    medicament = MedicamentSerializer() 
    
    class Meta:
        model = Traitement
        fields = ['id','medicament', 'duree', 'dosage']

class OrdonnanceSerializer(serializers.ModelSerializer):
    medicaments = serializers.ListField(
        child=serializers.DictField(),
        write_only=True  # Only used during creation, not returned in response
    )

    class Meta:
        model = Ordonnance
        fields = ['id','status','date', 'observation', 'consultation', 'medicaments']

    def create(self, validated_data):
        # Extract and remove medicaments data from validated_data:
        medicaments_data = validated_data.pop('medicaments')

        # Create the Ordonnance object.
        ordonnance = Ordonnance.objects.create(**validated_data)

        # Loop through the list of medicaments to create Traitement objects:
        for medicament_data in medicaments_data:
            medicament_id = medicament_data.get('medicament')
            duree = medicament_data.get('duree')
            dosage = medicament_data.get('dosage')

            try:
                medicament = Medicament.objects.get(id=medicament_id)
            except Medicament.DoesNotExist:
                raise serializers.ValidationError(
                    {"medicaments": [f"Medicament with id {medicament_id} does not exist."]}
                )

            Traitement.objects.create(
                ordonnance=ordonnance,
                medicament=medicament,
                duree=duree,
                dosage=dosage
            )

        return ordonnance
    
class GetOrdonnanceSerializer(serializers.ModelSerializer):
    traitement_set = TraitementSerializer(many=True)

    class Meta:
        model = Ordonnance
        fields = ['id', 'date', 'status', 'observation', 'traitement_set']

class SoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Soin
        fields = ['id', 'nom', 'date', 'status', 'observation', 'dpi', 'infermier']
        read_only_fields = ['id', 'date']

    def create(self, validated_data):
        soin = Soin.objects.create(**validated_data)
        return soin
    
class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id', 'NSS', 'nom', 'prenom', 'date_naissance', 'adresse', 'mutuelle']