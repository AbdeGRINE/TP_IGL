from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view
from .serializers import ConsultationSerializer, ResumeSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from users.models import Consultation, Infermier, Ordonnance,DPI,StatusOrdonnance,Soin, StatusSoin
from users.permissions import IsDoctor, IsPatient, IsAdmin, IsInfermier, IsLaborantin, IsRadiologue
# Create your views here. 

#------------------------------------------------Gestion des consultation---------------------------------------#
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated,IsDoctor])
def creer_consultation(request):
    """
    Cree une consultation .
    """
    data = request.data
    try:
       
        serializer = ConsultationSerializer(data=data)
        if serializer.is_valid():
            dpi_id = data.get('dpi')

            # Vérifier si le DPI existe
            try:
                dpi = DPI.objects.get(id=dpi_id)
            except DPI.DoesNotExist:
                return Response({"error": "DPI non trouvé"}, status=404)

            medecin_traitant = dpi.medecin_traitant  # Supposons que le champ "medecin_traitant" existe dans DPI

            consultation = serializer.save(dpi=dpi, medecin_consulte=medecin_traitant)

            # Traitement du résumé (si présent)
            resume_data = data.get('resume')
            if resume_data:
                resume_serializer = ResumeSerializer(data=resume_data)
                if resume_serializer.is_valid():
                    resume_serializer.save(consultation=consultation)
                else:
                    return Response(resume_serializer.errors, status=400)

            return Response({
                "message": "Consultation et résumé créés avec succès",
                "consultation": ConsultationSerializer(instance=consultation).data
            }, status=201)

        return Response(serializer.errors, status=400)
    except KeyError:
        return Response({"error": "Données manquantes"}, status=400)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def liste_consultations_par_dpi(request,dpi_id):
    """
    Récupère toutes les consultations liées à un DPI spécifique.
    """
    try:
        consultations = Consultation.objects.filter(dpi=dpi_id) # Filtrer les ordonnances par les consultations associées au DPI
    except Exception as e:
        return Response({"error": str(e)}, status=500)

    if not consultations.exists():
        return Response({"error": "Aucune ordonnance trouvée pour ce DPI."}, status=404)

    # Sérialiser les ordonnances
    serializer = ConsultationSerializer(consultations, many=True)
    return Response(serializer.data, status=200)

