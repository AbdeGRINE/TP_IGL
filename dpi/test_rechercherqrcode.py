import tempfile
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse  # Importer reverse
from .models import DPI, Patient, Medcin, Etablissement
import qrcode
from PIL import Image
import io 

class RechercherDPIQRCodeTest(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Créer un patient
        self.patient = Patient.objects.create(
            NSS="123456789",
            nom="Amel",
            prenom="Messaoud",
            date_naissance="1990-01-01",
            adresse="esi",
            mutuelle="Mutuelle A"
        )

        # Créer un établissement
        self.etablissement = Etablissement.objects.create(
            nom="Hôpital Général"
        )

        # Créer un médecin
        self.medecin = Medcin.objects.create(
            nom="Dr. Smith",
            etablissement=self.etablissement
        )

        # Générer un QR code avec le NSS
        qr_data = f"NSS: {self.patient.NSS}, Patient: {self.patient.nom} {self.patient.prenom}, Médecin: {self.medecin.nom}, Établissement: {self.etablissement.nom}"
        qr = qrcode.make(qr_data)
        qr_binary = io.BytesIO()
        qr.save(qr_binary, format="PNG")
        qr_binary.seek(0)
        self.qr_code_content = qr_binary.read()

        # Créer un DPI avec le QR code
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

            # Envoyer une requête POST avec le fichier QR code
            with open(qr_code_file.name, 'rb') as file:
                response = self.client.post(reverse('rechercher_dpi_qrcode'), {"qr_code": file}, format="multipart")
    
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("dpi_id", response.data)

    def test_rechercher_dpi_qrcode_echec(self):
      # Envoyer une requête POST sans QR code
      response = self.client.post(reverse('rechercher_dpi_qrcode'), {}, format="multipart")
      self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
      self.assertIn("error", response.data)
    
      # Tester avec un QR code invalide (sans NSS)
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

      self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
      self.assertIn("NSS non trouvé dans le QR code.", response.data['error'])  # Mise à jour ici
  

