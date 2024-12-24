import pytest
from rest_framework.test import APIClient
from django.urls import reverse
from users.models import DPI, Medcin, Etablissement, Patient
from django.contrib.auth.models import User
from users.permissions import IsDoctor, IsPatient


@pytest.mark.django_db
def test_consulter_dpi_utilisateur_non_autorise():
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

    # Créer un utilisateur non autorisé (ex. un patient qui n'est pas le patient associé au DPI)
    user = User.objects.create_user(username="patient_user", password="password")

    client = APIClient()
    client.force_authenticate(user=user)  # Authentifier l'utilisateur
    url = reverse('consulter_dpi', kwargs={"dpi_id": dpi.id})
    response = client.get(url)

    # Vérifier qu'un utilisateur sans les bonnes permissions reçoit un code 403
    assert response.status_code == 403


@pytest.mark.django_db
def test_consulter_dpi_utilisateur_autorise():
    # Création des objets nécessaires
    etablissement = Etablissement.objects.create(nom="Clinique Test", adresse="Adresse Test") 



     
    medecin = Medcin.objects.create(nom="Benziada", prenom="Dr.", specialite="Cardiologie", etablissement=etablissement)

    # Créer un utilisateur ayant les mêmes nom et prénom que le médecin
    utilisateur = User.objects.create_user(
        username="dr_benziada",
        password="password123",
        first_name="Benziada",
        last_name="Dr."
    )

    # Lier l'utilisateur au médecin (via la relation OneToOneField)
    medecin.user = utilisateur
    medecin.save()


    patient = Patient.objects.create(
        NSS="123456789012345",
        nom="MESSAOUD",
        prenom="Amel",
        date_naissance="1990-01-01",
        adresse="Adresse Test",
        mutuelle="Test",
    )
    dpi = DPI.objects.create(medecin_traitant=medecin, etablissement_courant=etablissement, patient=patient)





    client = APIClient()
    client.force_authenticate(user=utilisateur)   # Authentifier l'utilisateur
    url = reverse('consulter_dpi', kwargs={"dpi_id": dpi.id})
    response = client.get(url)

    # Vérifications
    assert response.status_code == 200  # L'utilisateur est autorisé et peut consulter le DPI
    data = response.json()
    assert data["patient"]["nom"] == patient.nom
    assert data["patient"]["prenom"] == patient.prenom
    assert data["medecin_traitant"]["nom"] == medecin.nom
    assert data["etablissement_courant"]["nom"] == etablissement.nom
