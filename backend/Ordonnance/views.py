from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from .serializers import GetOrdonnanceSerializer, MedicamentSerializer, OrdonnanceSerializer
from rest_framework.permissions import IsAuthenticated
from users.models import Medicament, Ordonnance, StatusOrdonnance
from users.permissions import IsDoctor
#------------------------------------------------Gestion des ordonnances---------------------------------------#


@swagger_auto_schema(
    operation_description="Créer une ordonnance. (L'ID de la consultation doit être fourni dans la requête.)",
    responses={
        201: "Ordonnance créée avec succès.",
        400: "Erreur de validation des données.",
    },
    methods=['post']
)
@api_view(['POST'])
#@permission_classes([IsAuthenticated, IsDoctor])
def creer_ordonnance(request):
    """
    Créer une ordonnance.
    """
    if request.method == 'POST':
        serializer = OrdonnanceSerializer(data=request.data)
        if serializer.is_valid():
            # Sauvegarder l'ordonnance et les traitements associés
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@swagger_auto_schema(
    operation_description="Récupère toutes les ordonnances liées à une consultation spécifique.",
    responses={
        200: "Liste des ordonnances récupérée avec succès.",
        404: "Aucune ordonnance trouvée pour cette consultation.",
        500: "Erreur interne du serveur.",
    },
    methods=['get']
)
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

@swagger_auto_schema(
    operation_description="Récupère toutes les ordonnances liées à un DPI spécifique.",
    responses={
        200: "Liste des ordonnances récupérée avec succès.",
        404: "Aucune ordonnance trouvée pour ce DPI.",
        500: "Erreur interne du serveur.",
    },
    methods=['get']
)
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

@swagger_auto_schema(
    operation_description="Récupère tous les médicaments disponibles.",
    responses={
        200: "Liste des médicaments récupérée avec succès.",
        404: "Aucun médicament trouvé.",
        500: "Erreur interne du serveur.",
    },
    methods=['get']
)
@api_view(['GET'])
#@permission_classes([IsAuthenticated])  # Uncomment this if authentication is needed
def liste_medicaments(request):
    """
    Récupère tous les médicaments.
    """
    try:
        medicaments = Medicament.objects.all()
    except Exception as e:
        return Response({"error": str(e)}, status=500)

    if not medicaments.exists():
        return Response({"error": "Aucun médicament trouvé."}, status=404)

    # Sérialiser les médicaments
    serializer = MedicamentSerializer(medicaments, many=True)
    return Response(serializer.data, status=200)

@swagger_auto_schema(
    operation_description="Valide une ordonnance en changeant son statut à 'Validé'.",
    responses={
        200: "Ordonnance validée avec succès.",
        404: "Ordonnance non trouvée.",
        500: "Erreur interne du serveur.",
    },
    methods=['patch']
)
@api_view(['PATCH'])
#@permission_classes()  # Uncomment and modify permissions if needed
def valider_ordonnance(request, ordonnance_id):
    """
    Valide une ordonnance en changeant son statut à 'Validé'.
    """
    try:
        ordonnance = Ordonnance.objects.get(id=ordonnance_id)
    except Ordonnance.DoesNotExist:
        return Response({"error": "Ordonnance non trouvée."}, status=404)

    # Mettre à jour le statut de l'ordonnance
    ordonnance.status = StatusOrdonnance.VALIDE
    ordonnance.save()

    # Sérialiser et retourner l'ordonnance mise à jour
    serializer = OrdonnanceSerializer(ordonnance)
    return Response(serializer.data, status=200)

@swagger_auto_schema(
    operation_description="Récupère une ordonnance avec ses traitements et les médicaments associés.",
    responses={
        200: "Détails de l'ordonnance récupérés avec succès.",
        404: "Ordonnance non trouvée.",
        500: "Erreur interne du serveur.",
    },
    methods=['get']
)
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
