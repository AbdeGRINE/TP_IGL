from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, PatientSerializer, LaborantinSerializer, MedcinSerializer, RadiologueSerializer, InfirmierSerializer
from .models import Groupe
import random

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



@api_view(['POST'])
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
def creer_patient(request: Request) -> Response:
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
            })
    return Response(serializer.errors)

@api_view(['POST'])
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
def creer_medcin(request: Request) -> Response:
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
            })
    return Response(serializer.errors)

# @api_view(['POST'])
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
# def creer_pharmacien(request: Request) -> Response:
#     return Response({"detail":"creer creer_pharmacien"})

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def creer_laborantin(request: Request) -> Response:
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
            })
    return Response(serializer.errors)

@api_view(['POST'])
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
def creer_radiologue(request: Request) -> Response:
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
            })
    return Response(serializer.errors)


@api_view(['POST'])
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
def creer_infirmier(request: Request) -> Response:
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
            })
    return Response(serializer.errors)

# @api_view(['POST'])
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
# def creer_administratif(request: Request) -> Response:
#     return Response({"detail":"creer creer_administratif"})