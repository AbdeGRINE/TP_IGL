from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view
from users.models import TypeBilan, StatusBilan
from .serializers import BilanSerializer
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
