from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view
from .serializers import ResumeSerializer,GetOrdonnanceSerializer, OrdonnanceSerializer, SoinSerializer,UserSerializer,ConsultationSerializer,ConsultationDetailWithResumeSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Consultation, Infermier, Ordonnance,DPI,StatusOrdonnance,Soin, StatusSoin
from .permissions import IsDoctor, IsPatient, IsAdmin, IsInfermier, IsLaborantin, IsRadiologue
# Create your views here.

@api_view(['POST'])
def authentifier_utilisateur(request: Request) -> Response:
    try:
        user= User.objects.get(username = request.data['username'])
        if user.check_password(request.data['password']):
            serializer = UserSerializer(instance= user)
            token,created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key,"user": serializer.data})
        return Response({"details": "incorrect password"})
    except User.DoesNotExist:
        return Response({"details": "user not found"})

@api_view(['POST'])
def inscrire_utilisateur(request: Request) -> Response:
    serializer = UserSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        user= User.objects.get(username = request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token= Token.objects.create(user= user)
        return Response({"token": token.key, "user": serializer.data})
    return Response(serializer.errors)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def deconnecter_utilisateur(request: Request) -> Response:
        try:
            request.user.auth_token.delete()
            return Response({"details": "Utilisateur deconnecte"})
        except:
            return Response({"details": "Erreur deconnexion"})

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def obtenir_utilisateur_connecte(request: Request) -> Response:
    if request.user.is_authenticated:
        serializer = UserSerializer(instance= request.user)
        return Response({"user": serializer.data})
    return Response({"detail": "user not found"})

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

#------------------------------------------------Gestion des soins---------------------------------------#

@api_view(['POST'])
@permission_classes([IsAuthenticated,IsInfermier])
def creer_soin(request):
    """
    Créer un soin pour un patient par un infermier.
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
                return Response({'error': 'Infermier not found'}, status=404)

            # Enregistrer le soin si tous les éléments sont valides
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
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
        return Response({"error": "Aucun soin trouvée pour ce DPI."}, status=404)

    serializer = SoinSerializer(soins, many=True)
    return Response(serializer.data, status=200)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated,IsInfermier])
def modifier_status_soin(request, pk):
    """
    Modifier le statut d'un soin existant.
    """
    try:
        soin = Soin.objects.get(pk=pk)
    except Soin.DoesNotExist:
        return Response({'error': 'Soin not found'}, status=404)

    # Mettre à jour le statut du soin
    status_new = request.data.get('status')
    if status_new not in dict(StatusSoin.choices):
        return Response({'error': 'Status invalide'}, status=400)

    soin.status = status_new
    soin.save()

    serializer = SoinSerializer(soin)
    return Response(serializer.data, status=200)