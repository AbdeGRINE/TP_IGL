from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view
from .serializers import GetOrdonnanceSerializer, OrdonnanceSerializer
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from users.models import Ordonnance,StatusOrdonnance
from users.permissions import IsDoctor, IsPatient, IsAdmin, IsInfermier, IsLaborantin, IsRadiologue
 

# Create your views here.
#------------------------------------------------Gestion des ordonnances---------------------------------------#

@api_view(['POST'])
@permission_classes([IsAuthenticated,IsDoctor])
def creer_ordonnance(request,dpi_id):
    """
    Creer une ordonnace (l'id du consultation doit etre fourni dans la req).
    """
    if request.method == 'POST':
        serializer = OrdonnanceSerializer(data=request.data)
        if serializer.is_valid():
            # Sauvegarder l'ordonnance et les traitements associés
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ordonnances_par_consultation(request, consultation_id):
    """
    Récupère toutes les ordonnances liées à une consultation spécifique.
    """
    try:
        ordonnances = Ordonnance.objects.filter(consultation=consultation_id)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

    if not ordonnances.exists():
        return Response({"error": "Aucune ordonnance trouvée pour cette consultation."}, status=404)

    serializer = OrdonnanceSerializer(ordonnances, many=True)
    return Response(serializer.data, status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ordonnances_par_dpi(request, dpi_id):
    """
    Récupère toutes les ordonnances liées à un DPI spécifique.
    """
    try:
        # Filtrer les ordonnances par les consultations associées au DPI
        ordonnances = Ordonnance.objects.filter(consultation__dpi_id=dpi_id)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

    if not ordonnances.exists():
        return Response({"error": "Aucune ordonnance trouvée pour ce DPI."}, status=404)

    # Sérialiser les ordonnances
    serializer = OrdonnanceSerializer(ordonnances, many=True)
    return Response(serializer.data, status=200)

@api_view(['PATCH'])
#@permission_classes()  # a modifier ici
def valider_ordonnance(request, ordonnance_id):

    """
    Valide une ordonnance en changeant son status à 'Validé'.
    """
    try:
        ordonnance = Ordonnance.objects.get(id=ordonnance_id)
    except Ordonnance.DoesNotExist:
        return Response({"error": "Ordonnance non trouvée."})

    # Mettre à jour le status de l'ordonnance
    ordonnance.status = StatusOrdonnance.VALIDE
    ordonnance.save()

    # Sérialiser et retourner l'ordonnance mise à jour
    serializer = OrdonnanceSerializer(ordonnance)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ordonnance_details(request, ordonnance_id):
    """
    Récupère une ordonnance avec ses traitements et les médicaments associés.
    """
    try:
        ordonnance = Ordonnance.objects.prefetch_related('traitement_set__medicament').get(id=ordonnance_id)
    except Ordonnance.DoesNotExist:
        return Response({"error": "Ordonnance non trouvée."}, status=404)

    serializer = GetOrdonnanceSerializer(ordonnance)
    return Response(serializer.data, status=200)
