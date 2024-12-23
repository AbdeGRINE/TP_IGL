
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

# Register your models here.
from .models import Infermier, Traitement,Ordonnance,Medicament,Etablissement,Hospitalisation, Consultation, Resume, Bilan,DPI,Patient,Medcin

admin.site.register(Hospitalisation)
admin.site.register(Consultation)
admin.site.register(Resume)
admin.site.register(Bilan)
admin.site.register(DPI)
admin.site.register(Patient)
admin.site.register(Medcin)
admin.site.register(Etablissement)
admin.site.register(Medicament)
admin.site.register(Ordonnance)
admin.site.register(Traitement)
admin.site.register(Infermier)





