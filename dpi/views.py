from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from users.models import DPI, Medcin, Etablissement, Patient
from .serializers import DPISerializer, SimpleDPISerializer
import qrcode
from io import BytesIO
from rest_framework.generics import RetrieveAPIView
from rest_framework.generics import ListAPIView
from rest_framework.exceptions import NotFound
from PIL import Image
from django.utils import timezone
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from users.permissions import IsDoctor, IsAdmin, IsPatient
import base64

"""from django.core.files.base import ContentFile
from pyzbar.pyzbar import decode
"""



class creer_dpi(APIView):
    permission_classes = [IsAuthenticated, IsDoctor | IsAdmin]
    def post(self, request, *args, **kwargs):
        # Valider les données
        patient_data = request.data.get("patient")
        medecin_nom_prenom = request.data.get("medecin_traitant")  # Nom et prénom du médecin
        personne_contact_data = request.data.get("personne_a_contacter")  # Nouveau champ ajouté

        if not patient_data or not medecin_nom_prenom:
            return Response({"error": "Données incomplètes."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Combiner nom et prénom de la personne à contacter en une seule chaîne
        personne_a_contacter = None
        if personne_contact_data:
            personne_a_contacter = f"{personne_contact_data.get('prenom', '').strip()} {personne_contact_data.get('nom', '').strip()}".strip()

        # Créer ou récupérer le patient
        patient, created = Patient.objects.get_or_create(
            NSS=patient_data.get("nss"),
            defaults={
                "nom": patient_data.get("nom"),
                "prenom": patient_data.get("prenom"),
                "date_naissance": patient_data.get("date_naissance"),
                "adresse": patient_data.get("adresse"),
                "mutuelle": patient_data.get("mutuelle"),
                "personne_a_contacter": personne_a_contacter,  # Ajouter la personne à contacter
            },
        )

        # Si le patient existe déjà, mettre à jour les informations de la personne à contacter
        if not created and personne_a_contacter:
            patient.personne_a_contacter = personne_a_contacter
            patient.save()

       

   
  


        # Séparer le nom et le prénom du médecin
        try:
            medecin_nom, medecin_prenom = medecin_nom_prenom.split(" ", 1)
        except ValueError:
            return Response({"error": "Le nom et le prénom du médecin doivent être fournis séparés par un espace."}, status=status.HTTP_400_BAD_REQUEST)

        # Récupérer le médecin par son nom et prénom
        try:
            medecin = Medcin.objects.get(nom=medecin_nom, prenom=medecin_prenom)
        except Medcin.DoesNotExist:
            return Response({"error": f"Le médecin {medecin_nom} {medecin_prenom} n'existe pas."}, status=status.HTTP_404_NOT_FOUND)
        

        # Créer un nouvel établissement avec une chaîne vide ou "xxxx"
        etablissement = Etablissement.objects.create(nom="xxxx")  # Créer un établissement avec "xxxx"



        # Générer le QR Code
        qr_data = f"NSS: {patient.NSS}, Patient: {patient.nom} {patient.prenom}, Médecin: {medecin.nom}"
        qr = qrcode.make(qr_data)
        qr_binary = BytesIO()
        qr.save(qr_binary, format="PNG")
        qr_binary.seek(0)

        # Convertir l'image en base64 et sauvegarder directement en base64
        qr_base64 = base64.b64encode(qr_binary.read()).decode('utf-8')
      

        # Créer le DPI avec le QR code en base64 et l'établissement créé
        dpi = DPI.objects.create(
            medecin_traitant=medecin,
            etablissement_courant=etablissement,  # Lier l'établissement avec chaîne vide
            patient=patient,
            qr_code=qr_base64,
        )

        return Response({
            "success": f"DPI créé pour le patient {patient.nom} {patient.prenom}.",
            "qr_code": qr_base64  # Envoyer le QR Code sous forme de chaîne base64
        }, status=status.HTTP_201_CREATED)









class consulter_dpi(APIView):
    permission_classes = [IsAuthenticated, IsDoctor | IsPatient] 
    def get(self, request, dpi_id, *args, **kwargs):
        # Récupérer le DPI
        dpi = get_object_or_404(DPI, id=dpi_id)
        serializer = DPISerializer(dpi)

        return Response(serializer.data, status=status.HTTP_200_OK)
  






    
class ListerDPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        dpi_list = DPI.objects.all()

        # Utiliser le sérialiseur SimpleDPISerializer
        serializer = SimpleDPISerializer(dpi_list, many=True)

        return Response(serializer.data, status=200)









class rechercher_dpi_nss(APIView):
     permission_classes = [IsAuthenticated, IsDoctor | IsPatient]  
     def get(self, request, *args, **kwargs):
        # Récupérer le NSS depuis les paramètres GET
        nss = request.query_params.get("nss")
        if not nss:
            return Response({"error": "NSS non fourni."}, status=status.HTTP_400_BAD_REQUEST)

        # Chercher le patient correspondant
        try:
            patient = Patient.objects.get(NSS=nss)
        except Patient.DoesNotExist:
            raise NotFound({"error": "Aucun patient trouvé avec ce NSS."})

        # Chercher le DPI correspondant
        dpi = DPI.objects.filter(patient=patient).first()
        if not dpi:
            raise NotFound({"error": "Aucun DPI trouvé pour ce patient."})

        # Sérialiser le DPI et le retourner
        serializer = DPISerializer(dpi)
        return Response(serializer.data, status=status.HTTP_200_OK)









"""
class rechercher_dpi_qrcode(APIView):
    permission_classes = [IsAuthenticated, IsDoctor | IsPatient] 
    def post(self, request, *args, **kwargs):
        # Récupérer le fichier QR code envoyé
        qr_code_file = request.FILES.get("qr_code")
        if not qr_code_file:
            return Response({"error": "Aucun QR code fourni."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Ouvrir l'image du QR code
            qr_image = Image.open(qr_code_file)
            # Décoder les données du QR code
            decoded_data = decode(qr_image)

            if not decoded_data:
                return Response({"error": "QR code invalide ou non décodable."}, status=status.HTTP_400_BAD_REQUEST)

            # Extraire la donnée du QR code (on suppose qu'il contient le NSS sous forme de texte)
            qr_data = decoded_data[0].data.decode("utf-8")
            # Rechercher le NSS dans le texte décodé
            nss = None
            for part in qr_data.split(','):
                if "NSS" in part:
                    nss = part.split(":")[1].strip()
                    break

            if not nss:
                return Response({"error": "NSS non trouvé dans le QR code."}, status=status.HTTP_400_BAD_REQUEST)

            # Rechercher un DPI en fonction du NSS
            dpi = DPI.objects.filter(patient__NSS=nss).first()
            if not dpi:
                return Response({"error": "Aucun DPI trouvé pour ce NSS."}, status=status.HTTP_404_NOT_FOUND)

            # Retourner les informations du DPI trouvé
            return Response({
                "dpi_id": dpi.id,
                "patient": {
                    "nom": dpi.patient.nom,
                    "prenom": dpi.patient.prenom,
                    "nss": dpi.patient.NSS,
                },
                "medecin_traitant": dpi.medecin_traitant.nom,
                "etablissement_courant": dpi.etablissement_courant.nom,
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": f"Erreur lors de la lecture du QR code: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
"""