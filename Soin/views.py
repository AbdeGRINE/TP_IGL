from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from .serializers import SoinSerializer
from rest_framework.permissions import IsAuthenticated
from users.models import Infermier, DPI, Soin, StatusSoin
from users.permissions import IsInfermier


#------------------------------------------------Gestion des soins---------------------------------------#

@swagger_auto_schema(
    operation_description="Créer un soin pour un patient par un infirmier.",
    responses={
        201: "Soin créé avec succès.",
        400: "Erreur de validation des données.",
        404: "DPI ou Infirmier non trouvé.",
    },
    methods=['post']
)
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsInfermier])
def creer_soin(request):
    """
    Créer un soin pour un patient par un infirmier.
    """
    if request.method == 'POST':
        # Sérialiser les données du soin
        serializer = SoinSerializer(data=request.data)

        if serializer.is_valid():
            try:
                dpi = DPI.objects.get(id=request.data.get('dpi'))
                infermier = Infermier.objects.get(id=request.data.get('infermier'))
            except DPI.DoesNotExist:
                return Response({'error': 'DPI not found'}, status=404)
            except Infermier.DoesNotExist:
                return Response({'error': 'Infirmier not found'}, status=404)

            # Enregistrer le soin si tous les éléments sont valides
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@swagger_auto_schema(
    operation_description="Récupère toutes les soins liées à un DPI spécifique.",
    responses={
        200: "Liste des soins récupérée avec succès.",
        404: "Aucun soin trouvé pour ce DPI.",
        500: "Erreur interne du serveur.",
    },
    methods=['get']
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def Soins_par_dpi(request, dpi_id):
    """
    Récupère toutes les soins liées à un DPI spécifique.
    """
    try:
        soins = Soin.objects.filter(dpi=dpi_id)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

    if not soins.exists():
        return Response({"error": "Aucun soin trouvé pour ce DPI."}, status=404)

    serializer = SoinSerializer(soins, many=True)
    return Response(serializer.data, status=200)

@swagger_auto_schema(
    operation_description="Modifier le statut d'un soin existant.",
    responses={
        200: "Statut du soin mis à jour avec succès.",
        400: "Statut invalide ou erreur dans la mise à jour.",
        404: "Soin non trouvé.",
    },
    methods=['patch']
)
@api_view(['PATCH'])
@permission_classes([IsAuthenticated, IsInfermier])
def modifier_status_soin(request, pk):
    """
    Modifier le statut d'un soin existant.
    """
    try:
        soin = Soin.objects.get(pk=pk)
    except Soin.DoesNotExist:
        return Response({'error': 'Soin non trouvé'}, status=404)

    # Mettre à jour le statut du soin
    status_new = request.data.get('status')
    if status_new not in dict(StatusSoin.choices):
        return Response({'error': 'Statut invalide'}, status=400)

    soin.status = status_new
    soin.save()

    serializer = SoinSerializer(soin)
    return Response(serializer.data, status=200)
