import pytest
from rest_framework.test import APIClient
from django.urls import reverse
from .models import Medcin, Etablissement, Patient, DPI, PersonneAContacter
from django.test import TestCase
from django.utils import timezone
from django.contrib.auth.models import User



@pytest.mark.django_db
def test_creer_dpi_non_authentifie():
    # Créer les objets nécessaires
    etablissement = Etablissement.objects.create(nom="Clinique Test", adresse="Adresse Test")
    medecin = Medcin.objects.create(nom="Benziada", prenom="Dr.", etablissement=etablissement)
    patient_data = {
        "nss": "123456789012345",
        "nom": "MESSAOUD",
        "prenom": "Amel",
        "date_naissance": "1990-01-01",
        "adresse": "Adresse Test",
        "mutuelle": "Test",
    }
    payload = {
        "patient": patient_data,
        "medecin_traitant": medecin.id,
        "etablissement_courant": etablissement.id,
    }

    client = APIClient()
    url = reverse('creer_dpi')  # Assurez-vous que le chemin est correctement défini
    response = client.post(url, payload, format='json')

    # Vérifier qu'un utilisateur non authentifié reçoit un code 401
    assert response.status_code == 401


@pytest.mark.django_db
def test_creer_dpi_utilisateur_non_autorise():
    # Créer un utilisateur sans rôle approprié (par exemple un patient)
    user = User.objects.create_user(username="testuser", password="password")
    etablissement = Etablissement.objects.create(nom="Clinique Test", adresse="Adresse Test")
    medecin = Medcin.objects.create(nom="Benziada", prenom="Dr.", etablissement=etablissement)
    patient_data = {
        "nss": "123456789012345",
        "nom": "MESSAOUD",
        "prenom": "Amel",
        "date_naissance": "1990-01-01",
        "adresse": "Adresse Test",
        "mutuelle": "Test",
    }
    payload = {
        "patient": patient_data,
        "medecin_traitant": medecin.id,
        "etablissement_courant": etablissement.id,
    }

    client = APIClient()
    client.force_authenticate(user=user)  # Authentifier l'utilisateur
    url = reverse('creer_dpi')
    response = client.post(url, payload, format='json')

    # Vérifier qu'un utilisateur sans les bonnes permissions reçoit un code 403
    assert response.status_code == 403


@pytest.mark.django_db
def test_creer_dpi_utilisateur_autorise():
    # Créer un utilisateur avec les bonnes permissions (par exemple un médecin)
    user = User.objects.create_user(username="testdoctor", password="password")
    # Assurez-vous d'ajouter le rôle 'doctor' à cet utilisateur (via un champ `role` par exemple)
    user.role = "doctor"
    user.save()

    # Créer les objets nécessaires
    etablissement = Etablissement.objects.create(nom="Clinique Test", adresse="Adresse Test")
    medecin = Medcin.objects.create(nom="Benziada", prenom="Dr.", etablissement=etablissement)
    patient_data = {
        "nss": "123456789012345",
        "nom": "MESSAOUD",
        "prenom": "Amel",
        "date_naissance": "1990-01-01",
        "adresse": "Adresse Test",
        "mutuelle": "Test",
    }
    payload = {
        "patient": patient_data,
        "medecin_traitant": medecin.id,
        "etablissement_courant": etablissement.id,
    }

    client = APIClient()
    client.force_authenticate(user=user)  # Authentifier l'utilisateur
    url = reverse('creer_dpi')
    response = client.post(url, payload, format='json')

    # Vérifier que l'utilisateur avec les bonnes permissions peut créer le DPI
    assert response.status_code == 201
    assert DPI.objects.count() == 1
    dpi = DPI.objects.first()  # Récupérer le DPI créé
    assert dpi.date_creation is not None  # Vérifier que la date de création est définie
    assert dpi.date_creation <= timezone.localdate()  # Comparer la date sans l'heure
    assert "success" in response.json()

    # Vérifier que la personne à contacter a bien été ajoutée
    personne_contact_data = {
        "prenom": "Karim",
        "nom": "Benziada",
        "n_tlph": "0123456789",
        "relation": "Frère"
    }
    personne_contact = PersonneAContacter.objects.first()
    assert personne_contact is not None
    assert personne_contact.prenom == personne_contact_data["prenom"]
    assert personne_contact.nom == personne_contact_data["nom"]
    assert personne_contact.n_tlph == personne_contact_data["n_tlph"]
    assert personne_contact.relation == personne_contact_data["relation"]
