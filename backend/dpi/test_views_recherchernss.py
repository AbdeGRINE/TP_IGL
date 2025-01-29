import pytest
from rest_framework.test import APIClient
from django.urls import reverse
from users.models import Patient, DPI, Medcin, Etablissement

@pytest.mark.django_db
def test_rechercher_dpi_nss_non_autorise():
    # Créer les objets nécessaires
    etablissement = Etablissement.objects.create(nom="Clinique Test", adresse="Adresse Test")
    medecin = Medcin.objects.create(nom="Benziada", prenom="Dr.", specialite="Cardiologie", etablissement=etablissement)
    patient1 = Patient.objects.create(
        NSS="123456789012345",
        nom="MESSAOUD",
        prenom="Amel",
        date_naissance="1990-01-01",
        adresse="Adresse Test",
        mutuelle="Test",
    )
    patient2 = Patient.objects.create(
        NSS="987654321098765",
        nom="DUPONT",
        prenom="Jean",
        date_naissance="1992-02-20",
        adresse="Autre adresse",
        mutuelle="Test2",
    )
    dpi = DPI.objects.create(medecin_traitant=medecin, etablissement_courant=etablissement, patient=patient1)

    # Créer un utilisateur non autorisé (un patient qui n'est pas le patient associé au DPI)
    utilisateur = User.objects.create_user(
        username="patient_user",
        password="password123",
        first_name="Jean",
        last_name="DUPONT"
    )

    # Tester la recherche pour un patient non autorisé
    client = APIClient()
    client.force_authenticate(user=utilisateur)  # Authentifier un utilisateur non autorisé
    url = reverse('rechercher_dpi_nss')
    response = client.get(url, {"nss": "123456789012345"})  # NSS d'un autre patient

    # Vérifications : L'utilisateur ne doit pas avoir accès aux données
    assert response.status_code == 403  # On attend une erreur 403 (Forbidden)
    assert response.json() == {"detail": "You do not have permission to perform this action."}  # Message d'erreur attendu





import pytest
from rest_framework.test import APIClient
from django.urls import reverse
from users.models import Patient, DPI, Medcin, Etablissement
from django.contrib.auth.models import User


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

    # Tester la recherche
    client = APIClient()
    client.force_authenticate(user=utilisateur)  # Authentifier l'utilisateur
    url = reverse('rechercher_dpi_nss')
    response = client.get(url, {"nss": "123456789012345"})

    # Vérifications
    assert response.status_code == 200
    data = response.json()
    assert data["patient"]["nom"] == patient.nom
    assert data["patient"]["prenom"] == patient.prenom
    assert data["medecin_traitant"]["nom"] == medecin.nom
    assert data["medecin_traitant"]["prenom"] == medecin.prenom
