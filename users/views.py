from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, PatientSerializer, LaborantinSerializer, MedcinSerializer, RadiologueSerializer, InfirmierSerializer, AdministratifSerializer
from .models import Groupe, Patient, Medcin, Laborantin, Radiologue, Infermier, Admin
import random

# Create your views here. 


@api_view(['POST'])
def authentifier_utilisateur(request: Request) -> Response:
    # all
    try:
        user= User.objects.get(username = request.data['username'])
        if user.check_password(request.data['password']):
            serializer = UserSerializer(instance= user)
            token,created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key,"user": serializer.data},status= status.HTTP_200_OK)
        return Response({"details": "incorrect password"},status= status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response({"details": "user not found"},status= status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def inscrire_utilisateur(request: Request) -> Response:
    # superuser
    serializer = UserSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        user= User.objects.get(username = request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token= Token.objects.create(user= user)
        return Response({"token": token.key},status= status.HTTP_200_OK)
    return Response(serializer.errors,status= status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def deconnecter_utilisateur(request: Request) -> Response:
    # all
    try:
        request.user.auth_token.delete()
        return Response({"details": "Utilisateur deconnecte"},status= status.HTTP_200_OK)
    except:
        return Response({"details": "Erreur deconnexion"},status= status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def obtenir_utilisateur_connecte(request: Request) -> Response:
    # all
    if request.user.is_authenticated:
        serializer = UserSerializer(instance= request.user)
        return Response({"user": serializer.data},status= status.HTTP_200_OK)
    return Response({"detail": "user not found"},status= status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def creer_patient(request: Request) -> Response:
    # superuser
    serializer = PatientSerializer(data=request.data)
    if serializer.is_valid():
        nom = serializer.validated_data['nom']
        prenom = serializer.validated_data['prenom']
        username = f"{nom}_{prenom}"
        password = username
        user = User.objects.create_user(
            username=username,
            password=password,
            email=''
        )
        token, _ = Token.objects.get_or_create(user=user)
        patient = serializer.save(user=user)
        patient_data = PatientSerializer(instance=patient).data
        return Response({
                "patient": patient_data,
                "user": {"username": username, "token": token.key}
            },status= status.HTTP_200_OK)
    return Response(serializer.errors,status= status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def creer_medcin(request: Request) -> Response:
    # superuser
    serializer = MedcinSerializer(data=request.data)
    if serializer.is_valid():
        nom = serializer.validated_data['nom']
        prenom = serializer.validated_data['prenom']
        username = f"{nom}_{prenom}"
        password = username
        user = User.objects.create_user(
            username=username,
            password=password,
            email=''
        )
        token, _ = Token.objects.get_or_create(user=user)
        medcin = serializer.save(user=user)
        medcin_data = MedcinSerializer(instance=medcin).data
        return Response({
                "medcin": medcin_data,
                "user": {"username": username, "token": token.key}
            },status= status.HTTP_200_OK)
    return Response(serializer.errors,status= status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def creer_laborantin(request: Request) -> Response:
    # superuser
    serializer = LaborantinSerializer(data=request.data)
    if serializer.is_valid():
        nom = serializer.validated_data['nom']
        prenom = serializer.validated_data['prenom']
        username = f"{nom}_{prenom}"
        password = username
        user = User.objects.create_user(
            username=username,
            password=password,
            email=''
        )
        token, _ = Token.objects.get_or_create(user=user)
        laborantin = serializer.save(user=user)
        laborantin_data = LaborantinSerializer(instance=laborantin).data
        return Response({
                "laborantin": laborantin_data,
                "user": {"username": username, "token": token.key}
            },status= status.HTTP_200_OK)
    return Response(serializer.errors,status= status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def creer_radiologue(request: Request) -> Response:
    # superuser
    serializer = RadiologueSerializer(data=request.data)
    if serializer.is_valid():
        nom = serializer.validated_data['nom']
        prenom = serializer.validated_data['prenom']
        username = f"{nom}_{prenom}"
        password = username
        user = User.objects.create_user(
            username=username,
            password=password,
            email=''
        )
        token, _ = Token.objects.get_or_create(user=user)
        radiologue = serializer.save(user=user)
        radiologue_data = RadiologueSerializer(instance=radiologue).data
        return Response({
                "radiologue": radiologue_data,
                "user": {"username": username, "token": token.key}
            },status= status.HTTP_200_OK)
    return Response(serializer.errors,status= status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def creer_infirmier(request: Request) -> Response:
    # superuser
    serializer = InfirmierSerializer(data=request.data)
    if serializer.is_valid():
        nom = serializer.validated_data['nom']
        prenom = serializer.validated_data['prenom']
        username = f"{nom}_{prenom}"
        password = username
        user = User.objects.create_user(
            username=username,
            password=password,
            email=''
        )
        token, _ = Token.objects.get_or_create(user=user)
        random_group = random.choice([Groupe.MATIN, Groupe.MIDI, Groupe.NUIT])
        infirmier = serializer.save(user=user,groupe=random_group)
        infirmier_data = InfirmierSerializer(instance=infirmier).data
        return Response({
                "infirmier": infirmier_data,
                "user": {"username": username, "token": token.key}
            },status= status.HTTP_200_OK)
    return Response(serializer.errors,status= status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def creer_administratif(request: Request) -> Response:
    # superuser
    serializer = AdministratifSerializer(data=request.data)
    if serializer.is_valid():
        nom = serializer.validated_data['nom']
        prenom = serializer.validated_data['prenom']
        username = f"{nom}_{prenom}"
        password = username
        user = User.objects.create_user(
            username=username,
            password=password,
            email=''
        )
        token, _ = Token.objects.get_or_create(user=user)
        administratif = serializer.save(user=user)
        administratif_data = AdministratifSerializer(instance= administratif).data
        return Response({
                "administratif": administratif_data,
                "user": {"username": username, "token": token.key}
            },status= status.HTTP_200_OK)
    return Response({"detail":"creer creer_administratif"},status= status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def consulter_profil_patient(request: Request) -> Response:
    # all
    patient_id = request.data['patient']
    patient = Patient.objects.get(id= patient_id)
    serializer = PatientSerializer(patient)
    return Response(serializer.data,status= status.HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def consulter_profil_medcin(request: Request) -> Response:
    # all
    medcin_id = request.data['medcin']
    medcin = Medcin.objects.get(id= medcin_id)
    serializer = MedcinSerializer(medcin)
    return Response(serializer.data, status= status.HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def consulter_profil_laborantin(request: Request) -> Response:
    # all
    laborantin_id = request.data['laborantin']
    laborantin = Laborantin.objects.get(id= laborantin_id)
    serializer = LaborantinSerializer(laborantin)
    return Response(serializer.data, status= status.HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def consulter_profil_radiologue(request: Request) -> Response:
    # all
    radiologue_id = request.data['radiologue']
    radiologue = Radiologue.objects.get(id= radiologue_id)
    serializer = RadiologueSerializer(radiologue)
    return Response(serializer.data, status= status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def consulter_profil_infirmier(request: Request) -> Response:
    # all
    infirmier_id = request.data['infirmier']
    infirmier = Infermier.objects.get(id= infirmier_id)
    serializer = InfirmierSerializer(infirmier)
    return Response(serializer.data, status= status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def consulter_profil_administratif(request: Request) -> Response:
    # all
    administratif_id = request.data['administratif']
    administratif = Admin.objects.get(id= administratif_id)
    serializer = AdministratifSerializer(administratif)
    return Response(serializer.data, status= status.HTTP_200_OK)