import pytest
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.models import User
from users.models import DPI, Patient, Medcin, Etablissement  # Remplacez "app" par le nom de votre application
import base64
from django.urls import reverse




@pytest.mark.django_db
def test_lister_dpi_authenticated_user():
    # Création d'un utilisateur authentifié
    user = User.objects.create_user(username="testuser", password="testpassword")

    # Création des données liées
    patient1 = Patient.objects.create(
        NSS="123456789012345",
        nom="Messoud",
        prenom="Amel",
        date_naissance="1990-01-01",
        adresse="Adresse Test",
        mutuelle="Test"
    )
    

    etablissement1 = Etablissement.objects.create(
        nom="Clinique Test",
        adresse="Adresse Test"
    )

    medecin1 = Medcin.objects.create(
        nom="Benziada",
        prenom="Dr.",
        specialite="Cardiologie",
      etablissement=etablissement1  # Ajoutez un établissement valide ici

    )

    qr_code_bytes = base64.b64decode("iVBORw0KGgoAAAANSUhEUgAA...")
    dpi1 = DPI.objects.create(
        patient=patient1,
        medecin_traitant=medecin1,
        etablissement_courant=etablissement1,
        qr_code=qr_code_bytes 
    )

    patient2 = Patient.objects.create(
        NSS="987654321098765",
        nom="Doe",
        prenom="John",
        date_naissance="1985-06-15",
        adresse="Adresse 2",
        mutuelle="Mutuelle XYZ"
    )
    etablissement2 = Etablissement.objects.create(
        nom="Hôpital Test",
        adresse="Adresse 2"
    )
    medecin2 = Medcin.objects.create(
        nom="Smith",
        prenom="Dr.",
        specialite="Dermatologie",
        etablissement=etablissement2
    )
    
    dpi2 = DPI.objects.create(
        patient=patient2,
        medecin_traitant=medecin2,
        etablissement_courant=etablissement2,
         qr_code=qr_code_bytes 
    )

    # Client API
    client = APIClient()
    client.login(username="testuser", password="testpassword")  # Authentifier l'utilisateur

    # Requête GET vers la vue
    response = client.get(reverse('lister_dpi'))
  # Remplacez l'URL par celle de votre vue

    # Résultat attendu
    expected_data = [
        {
            "id": dpi1.id,
            "patient_nom": patient1.nom,
            "patient_prenom": patient1.prenom,
            "medecin_traitant": {
                "id": medecin1.id,
                "nom": medecin1.nom,
                "prenom": medecin1.prenom,
                "specialite": medecin1.specialite,
            },
            "etablissement_courant": {
                "id": etablissement1.id,
                "nom": etablissement1.nom,
                "adresse": etablissement1.adresse,
            },
        },
        {
            "id": dpi2.id,
            "patient_nom": patient2.nom,
            "patient_prenom": patient2.prenom,
            "medecin_traitant": {
                "id": medecin2.id,
                "nom": medecin2.nom,
                "prenom": medecin2.prenom,
                "specialite": medecin2.specialite,
            },
            "etablissement_courant": {
                "id": etablissement2.id,
                "nom": etablissement2.nom,
                "adresse": etablissement2.adresse,
            },
        }
    ]

    # Assertions
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == expected_data




@pytest.mark.django_db
def test_lister_dpi_unauthenticated_user():
    # Client API sans authentification
    client = APIClient()

    # Requête GET vers la vue
    
    response = client.get(reverse('lister_dpi'))

    # Remplacez l'URL par celle de votre vue

    # Assertions
    assert response.status_code == status.HTTP_403_FORBIDDEN
