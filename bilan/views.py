from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from users.models import TypeBilan, StatusBilan
from .serializers import BilanSerializer, TestSerializer
from users.serializers import UserSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from users.models import Bilan
from datetime import date

# Create your views here.

@api_view(['POST'])
def demander_bilan(request: Request) -> Response:
    serializer = BilanSerializer(data = request.data)
    if serializer.is_valid():
        default_status = StatusBilan.EN_COURS
        default_date = date.today()
        bilan = serializer.save(status= default_status, date_demande= default_date)
        bilan_data = BilanSerializer(instance = bilan).data
        return Response({
            "bilan":bilan_data
        })
    return Response(serializer.errors)



@api_view(['GET'])
def consulter_bilans_biologiques_en_cours(request: Request) -> Response:
    bilans = Bilan.objects.filter(status=StatusBilan.EN_COURS, type=TypeBilan.BIOLOGIQUE)
    bilans_data = BilanSerializer(bilans, many=True).data
    return Response(bilans_data)

@api_view(['GET'])
def consulter_bilans_radiologiques_en_cours(request: Request) -> Response:
    bilans = Bilan.objects.filter(status=StatusBilan.EN_COURS, type=TypeBilan.RADIOLOGIQUE)
    bilans_data = BilanSerializer(bilans, many=True).data
    return Response(bilans_data)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def saisir_resultat_bilan_biologique(request: Request) -> Response:
    serializer = TestSerializer(data= request.data,many= True)
    if serializer.is_valid():
        serializer.save()
        bilan_id = request.data[0]['bilan']
        bilan = Bilan.objects.get(id= bilan_id)
        bilan.date_recuperation= date.today()
        bilan.status= StatusBilan.TERMINE
        bilan.redigant_laborantin= request.user.laborantin
        bilan.save()
        return Response({"data": serializer.data})
    return Response(serializer.errors)