import pytest
from rest_framework.test import APIClient
from django.urls import reverse
from dpi.models import Patient, DPI, Medcin, Etablissement

@pytest.mark.django_db
def test_rechercher_dpi_nss():
    # Créer les objets nécessaires
    etablissement = Etablissement.objects.create(nom="Clinique Test", adresse="Adresse Test")
    medecin = Medcin.objects.create(nom="Benziada", prenom="Dr.", specialite="Cardiologie", etablissement=etablissement)
    patient = Patient.objects.create(
        NSS="123456789012345",
        nom="MESSAOUD",
        prenom="Amel",
        date_naissance="1990-01-01",
        adresse="Adresse Test",
        mutuelle="Test",
    )
    dpi = DPI.objects.create(medecin_traitant=medecin, etablissement_courant=etablissement, patient=patient)

    # Tester la recherche
    client = APIClient()
    url = reverse('rechercher_dpi_nss')
    response = client.get(url, {"nss": "123456789012345"})

    assert response.status_code == 200
    data = response.json()
    assert data["patient"]["nom"] == patient.nom
    assert data["patient"]["prenom"] == patient.prenom
    assert data["medecin_traitant"]["nom"] == medecin.nom
