from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from users.models import TypeBilan, StatusBilan, StatusGraphique
from .serializers import BilanSerializer, TestSerializer, GraphiqueSerializer, CompteRenduSerializer, ImageSerializer
from users.serializers import UserSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from users.models import Bilan, Test, CompteRendu, Image, Consultation
from datetime import date
from base64 import b64decode
from rest_framework import status

# Create your views here.

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def demander_bilan(request: Request) -> Response:
    # medcin
    serializer = BilanSerializer(data = request.data)
    if serializer.is_valid():
        default_status = StatusBilan.EN_COURS
        default_date = date.today()
        default_graphique = StatusGraphique.NON_ATTACHE
        bilan = serializer.save(status= default_status, date_demande= default_date, graphique= default_graphique)
        bilan_data = BilanSerializer(instance = bilan).data
        return Response(bilan_data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def consulter_bilans_biologiques_en_cours(request: Request) -> Response:
    # laborantin
    bilans = Bilan.objects.filter(status=StatusBilan.EN_COURS, type=TypeBilan.BIOLOGIQUE)
    bilans_data = BilanSerializer(bilans, many=True).data
    return Response(bilans_data, status=status.HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def consulter_bilans_radiologiques_en_cours(request: Request) -> Response:
    # radiologue
    bilans = Bilan.objects.filter(status=StatusBilan.EN_COURS, type=TypeBilan.RADIOLOGIQUE)
    bilans_data = BilanSerializer(bilans, many=True).data
    return Response(bilans_data, status=status.HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def consulter_bilans(request: Request) -> Response:
    # medcin patien infirmier
    bilans = Bilan.objects.filter(consultation= request.data['consultation'])
    bilans_data = BilanSerializer(bilans, many=True).data
    return Response(bilans_data, status=status.HTTP_200_OK)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def saisir_resultat_bilan_biologique(request: Request) -> Response:
    # laborantin
    graphique_data = {"graphique": request.data.get('graphique')}
    graphique_serializer = GraphiqueSerializer(data=graphique_data)
    tests_data = request.data.get('tests', [])
    serializer = TestSerializer(data=tests_data, many=True)
    if graphique_serializer.is_valid() and serializer.is_valid():
        serializer.save()
        bilan_id = tests_data[0]['bilan']
        bilan = Bilan.objects.get(id= bilan_id)
        bilan.graphique = graphique_serializer.data['graphique']
        bilan.date_recuperation= date.today()
        bilan.status= StatusBilan.TERMINE
        bilan.redigant_laborantin= request.user.laborantin
        bilan.save()
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)
    return Response({"tests": serializer.errors,"graphique": graphique_serializer.errors}, status= status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def saisir_resultat_bilan_radiologique(request: Request) -> Response:
    # radiologue
    compterendu_data = request.data.get('compterendu')
    compterendu_serailizer = CompteRenduSerializer(data= compterendu_data)
    image_data = request.data.get('image')
    image_serializer = ImageSerializer(data= image_data)
    if image_serializer.is_valid() and compterendu_serailizer.is_valid():
        compterendu = compterendu_serailizer.save()
        image_serializer.save(compte_rendu = compterendu, donnee = b64decode(image_data['donnee']))
        bilan_id = compterendu_data['bilan']
        bilan = Bilan.objects.get(id = bilan_id)
        bilan.graphique = StatusGraphique.ATTACHE
        bilan.date_recuperation= date.today()
        bilan.status= StatusBilan.TERMINE
        bilan.redigant_radiologue= request.user.radiologue
        bilan.save()
        return Response({"compte_rendu":compterendu_serailizer.data,"image":image_serializer.data}, status=status.HTTP_200_OK)
    return Response({"compterendu":compterendu_serailizer.errors,"image": image_serializer.errors}, status= status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def consulter_bilan_biologique(request: Request) -> Response:
    # medcin patient infirmier
    bilan_id = request.data['bilan']
    bilan = Bilan.objects.get(id= bilan_id)
    bilan_data = BilanSerializer(bilan).data
    tests = Test.objects.filter(bilan= bilan)
    if tests:
        tests_data = TestSerializer(tests, many=True).data
        return Response({"bilan": bilan_data,"tests": tests_data}, status=status.HTTP_200_OK)
    return Response({"bilan": bilan_data}, status=status.HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def consulter_bilan_radiologique(request: Request) -> Response:
    # medcin patient infirmier
    bilan_id = request.data['bilan']
    bilan = Bilan.objects.get(id= bilan_id)
    bilan_data = BilanSerializer(bilan).data
    try:
        compterendu = CompteRendu.objects.get(bilan= bilan)
    except:
        return Response({"bilan": bilan_data}, status=status.HTTP_200_OK)
    compterendu_data = CompteRenduSerializer(compterendu).data
    image = Image.objects.get(compte_rendu = compterendu)
    image_data = ImageSerializer(image).data
    return Response({"bilan": bilan_data,"compterendu": compterendu_data, "image": image_data}, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def envoyer_donnees_graphes(request: Request) -> Response:
    # medcin patient infirmier
    dpi_id = request.data['dpi']
    consultations = Consultation.objects.filter(dpi= dpi_id)
    tests = []
    if consultations:
        for consultation in consultations:
            bilans = Bilan.objects.filter(consultation= consultation, type= TypeBilan.BIOLOGIQUE, graphique= StatusGraphique.ATTACHE)
            if bilans:
                for bilan in bilans:
                    tests += Test.objects.filter(bilan= bilan)
    if tests:
        tests_data = TestSerializer(tests, many=True).data 
        return Response(tests_data, status=status.HTTP_200_OK)
    return Response({"detail":"pas de graphiques attachés"}, status= status.HTTP_400_BAD_REQUEST)