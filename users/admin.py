from django.contrib import admin

# Register your models here.
from .models import Etablissement,Hospitalisation, Consultation, Resume, Bilan,DPI,Patient,Medcin

admin.site.register(Hospitalisation)
admin.site.register(Consultation)
admin.site.register(Resume)
admin.site.register(Bilan)
admin.site.register(DPI)
admin.site.register(Patient)
admin.site.register(Medcin)
admin.site.register(Etablissement)


