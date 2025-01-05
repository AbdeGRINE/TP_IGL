import pytest
from django.conf import settings

# Test pour vérifier que Django est configuré correctement
def test_django_settings():
    assert settings.DATABASES['default']['ENGINE'] == 'django.db.backends.sqlite3'  # Vérifiez le backend de la base de données
    assert settings.DEBUG is False  # Assurez-vous que DEBUG est désactivé en production

# Test pour vérifier l'accès à un modèle
def test_patient_model():
    from users.models import Patient
    patient = Patient.objects.first()
    assert patient is not None  # Vérifiez qu'il y a au moins un patient
