from rest_framework import serializers
from django.contrib.auth.models import User
from users.models import Soin

class SoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Soin
        fields = ['id', 'nom', 'date', 'status', 'observation', 'dpi', 'infermier']
        read_only_fields = ['id', 'date']

    def create(self, validated_data):
        soin = Soin.objects.create(**validated_data)
        return soin
    