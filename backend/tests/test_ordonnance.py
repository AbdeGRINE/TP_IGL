from django.urls import reverse
import pytest
from rest_framework import status
from rest_framework.test import APIClient
from users.models import DPI, Consultation, Etablissement, Medcin, Ordonnance, Patient

client= APIClient()


@pytest.mark.django_db
def test_valider_ordonnance(client):
    patient = Patient.objects.create(
        NSS='123456789012345',
        nom='Dupont',
        prenom='Jean',
        date_naissance='1980-01-01',
        adresse='10 rue Exemple',
        mutuelle='Mutuelle X'
    )


    etablissement=Etablissement.objects.create(
        nom='CHU'
    )
    medcin=Medcin.objects.create(
        nom='doctor',
        etablissement_id=1
    )

    dpi = DPI.objects.create(
        etablissement_courant_id=1,
        medecin_traitant_id=1,
        patient_id=1
    )

    # Créer une consultation
    consultation = Consultation.objects.create(
        date='2024-12-16',
        medecin_consulte='Dr. Martin',
        dpi_id=1,  # Remplacez par une valeur valide
    )

    # Créer une ordonnance
    ordonnance = Ordonnance.objects.create(
        id=1,  # ID explicite pour éviter les conflits
        date='2024-12-16',
        status='Non_validé',
        observation='Ordonnance de test',
        consultation=consultation
    )
   
    url = reverse('valider_ordonnance', kwargs={'ordonnance_id': ordonnance.id})
    response = client.patch(url)

    
    assert response.status_code == status.HTTP_200_OK
    
   
    ordonnance.refresh_from_db()
    assert ordonnance.status == 'Validé'
