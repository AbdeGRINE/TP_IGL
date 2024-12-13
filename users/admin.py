from django.contrib import admin

# Register your models here.
from .models import Hospitalisation, Consultation, Resume, Bilan

admin.site.register(Hospitalisation)
admin.site.register(Consultation)
admin.site.register(Resume)
admin.site.register(Bilan)
