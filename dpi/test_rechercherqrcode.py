import tempfile
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse  # Importer reverse
from users.models import DPI, Patient, Medcin, Etablissement, User
import qrcode
from PIL import Image
import io

class RechercherDPIQRCodeTest(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Créer un établissement
        self.etablissement = Etablissement.objects.create(
            nom="Hôpital Général"
        )

        # Créer un médecin
        self.medecin = Medcin.objects.create(
            nom="Dr. Smith",
            prenom="Smith",
            specialite="Cardiologie",
            etablissement=self.etablissement
        )

        # Créer un utilisateur ayant les mêmes nom et prénom que le médecin
        self.utilisateur = User.objects.create_user(
            username="dr_smith",
            password="password123",
            first_name="Smith",
            last_name="Dr."
        )

        # Lier l'utilisateur au médecin (via la relation OneToOneField)
        self.medecin.user = self.utilisateur
        self.medecin.save()

        # Créer un patient
        self.patient = Patient.objects.create(
            NSS="123456789",
            nom="Amel",
            prenom="Messaoud",
            date_naissance="1990-01-01",
            adresse="esi",
            mutuelle="Mutuelle A"
        )

        #

        # Générer un QR code avec le NSS
        qr_data = f"NSS: {self.patient.NSS}, Patient: {self.patient.nom} {self.patient.prenom}, Médecin: {self.medecin.nom}, Établissement: {self.etablissement.nom}"
        qr = qrcode.make(qr_data)
        qr_binary = io.BytesIO()
        qr.save(qr_binary, format="PNG")
        qr_binary.seek(0)
        self.qr_code_content = qr_binary.read()

        #Créer un DPI avec le QR code
        self.dpi = DPI.objects.create(
            patient=self.patient,
            medecin_traitant=self.medecin,
            etablissement_courant=self.etablissement,
            qr_code=self.qr_code_content
        )

    def test_rechercher_dpi_qrcode_succes(self):
        # Créer un fichier temporaire pour le QR code
        with tempfile.NamedTemporaryFile(suffix=".png", mode='wb') as qr_code_file:
            qr_code_file.write(self.qr_code_content)
            qr_code_file.seek(0)

            # Authentifier le médecin (utilisateur) pour l'accès
            self.client.login(username="dr_smith", password="password123")

            # Envoyer une requête POST avec le fichier QR code
            with open(qr_code_file.name, 'rb') as file:
                response = self.client.post(reverse('rechercher_dpi_qrcode'), {"qr_code": file}, format="multipart")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("dpi_id", response.data)

    def test_rechercher_dpi_qrcode_non_autorise(self):
        # Créer un utilisateur non autorisé (autre utilisateur)
        non_authorized_user = User.objects.create_user(
            username="user_not_authorized",
            password="password123",
            first_name="User",
            last_name="NotAuthorized"
        )

        # Authentifier l'utilisateur non autorisé
        self.client.login(username="user_not_authorized", password="password123")

        # Créer un fichier temporaire pour le QR code
        with tempfile.NamedTemporaryFile(suffix=".png", mode='wb') as qr_code_file:
            qr_code_file.write(self.qr_code_content)
            qr_code_file.seek(0)

            # Envoyer une requête POST avec le fichier QR code
            with open(qr_code_file.name, 'rb') as file:
                response = self.client.post(reverse('rechercher_dpi_qrcode'), {"qr_code": file}, format="multipart")

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertIn("detail", response.data)  # Vérifier si un message d'erreur lié aux permissions est retourné




    def test_rechercher_dpi_qrcode_echec(self):  
      # Créer un utilisateur non authentifié
      response = self.client.post(reverse('rechercher_dpi_qrcode'), {}, format="multipart")

      # Vérifier que la réponse est une erreur 403 pour un utilisateur non authentifié
      self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
      self.assertIn("detail", response.data)  # Vérifie le message d'erreur lié aux permissions

      # Authentifier l'utilisateur pour tester le QR code invalide
      self.client.login(username="dr_smith", password="password123")

      # Tester maintenant avec un QR code invalide (sans NSS)
      invalid_qr_data = "Nom: Doe, Prenom: John, Médecin: Dr. Smith, Etablissement: Hôpital Général"
      invalid_qr_code = qrcode.make(invalid_qr_data)
      qr_binary = io.BytesIO()
      invalid_qr_code.save(qr_binary, format="PNG")
      qr_binary.seek(0)

      with tempfile.NamedTemporaryFile(suffix=".png", mode='wb') as qr_code_file:
          qr_code_file.write(qr_binary.read())
          qr_code_file.seek(0)

          # Envoyer une requête POST avec un QR code invalide
          with open(qr_code_file.name, 'rb') as file:
              response = self.client.post(reverse('rechercher_dpi_qrcode'), {"qr_code": file}, format="multipart")

      # Vérifier que la réponse est une erreur 400 pour un QR code invalide
      self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
      self.assertIn("NSS non trouvé dans le QR code.", response.data['error'])
