import pytest
from rest_framework.test import APIClient
from django.urls import reverse
from .models import DPI, Medcin, Etablissement, Patient

@pytest.mark.django_db
def test_consulter_dpi():
    # Création des objets nécessaires
    etablissement = Etablissement.objects.create(nom="Clinique Test", adresse="Adresse Test")
    medecin = Medcin.objects.create(nom="Benziada", prenom="Dr.", etablissement=etablissement)
    patient = Patient.objects.create(
        NSS="123456789012345",
        nom="MESSAOUD",
        prenom="Amel",
        date_naissance="1990-01-01",
        adresse="Adresse Test",
        mutuelle="Test",
    )
    dpi = DPI.objects.create(medecin_traitant=medecin, etablissement_courant=etablissement, patient=patient)

    # Tester l'accès au DPI
    client = APIClient()
    url = reverse('consulter_dpi', kwargs={"dpi_id": dpi.id})
    response = client.get(url)

    assert response.status_code == 200
    data = response.json()
    assert data["patient"]["nom"] == patient.nom
    assert data["patient"]["prenom"] == patient.prenom
    assert data["medecin_traitant"]["nom"] == medecin.nom
    assert data["etablissement_courant"]["nom"] == etablissement.nom
