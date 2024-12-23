from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view
from .serializers import UserSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated



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


