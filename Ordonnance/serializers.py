from rest_framework import serializers
from django.contrib.auth.models import User
from users.models import Traitement,Ordonnance,Medicament

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
