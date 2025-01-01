import pytest
from rest_framework.test import APIClient
from django.urls import reverse
from users.models import DPI, Medcin, Etablissement, Patient
from django.contrib.auth.models import User
from users.permissions import IsDoctor, IsAdmin, IsPatient
from django.utils import timezone
import base64



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
      "personne_a_contacter": "Nom Contact Personne"
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
    assert response.status_code in [401, 403]
     # Vérifier l'URL du QR code (si applicable)
    if response.status_code == 201:
        assert 'qr_code' in response.data 



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
      "personne_a_contacter": "Nom Contact Personne"
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
    if response.status_code == 201:
        assert 'qr_code' in response.data 





@pytest.mark.django_db
def test_creer_dpi_utilisateur_autorise():
    # Créer un établissement
    etablissement = Etablissement.objects.create(nom="Clinique Test", adresse="Adresse Test")

    # Créer un médecin dans la table Medcin
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

    # Données du patient
    patient_data = {
      "nss": "123456789012345",
      "nom": "MESSAOUD",
      "prenom": "Amel",
      "date_naissance": "1990-01-01",
      "adresse": "Adresse Test",
      "mutuelle": "Test",
      "personne_a_contacter": "Nom Contact Personne"
    }

    # Payload pour la création du DPI
    payload = {
        "patient": patient_data,
        "medecin_traitant": medecin.id,
        "etablissement_courant": etablissement.id,
        
    }

    # Authentifier l'utilisateur
    client = APIClient()
    client.force_authenticate(user=utilisateur)

    # URL de la vue pour créer un DPI
    url = reverse('creer_dpi')  # Remplace par le nom réel de ta vue
    response = client.post(url, payload, format='json')






    # Vérifications
    assert response.status_code == 201  # L'utilisateur est autorisé et peut créer un DPI
    assert DPI.objects.count() == 1  # Vérifier qu'un DPI a été créé

    # Vérifier les détails du DPI créé
    dpi = DPI.objects.first()
    assert dpi.date_creation is not None  # Vérifier que la date de création est définie 
    assert dpi.date_creation <= timezone.localdate()  # Comparer la date sans l'heure
    assert "success" in response.json()

    assert 'qr_code' in response.data  # Check for the base64 encoded QR code


  

