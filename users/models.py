from django.db import models
from django.contrib.auth.models import User

# Enum-like fields
class StatusHospitalisation(models.TextChoices):
    EN_COURS = 'En_cours'
    TERMINE = 'Terminé'


class StatusOrdonnance(models.TextChoices):
    VALIDE = 'Validé'
    NON_VALIDE = 'Non_validé'

class StatusGraphique(models.TextChoices):
    ATTACHE = 'Attaché'
    NON_ATTACHE = 'Non_Attaché'

class StatusSoin(models.TextChoices):
    PROGRAMME = 'Programmé'
    COMPLETE = 'Complété'
    ANNULE = 'Annulé'


class TypeMedicament(models.TextChoices):
    ORAL = 'Oral'
    INJECTION = 'Injection'
    TOPIQUE = 'Topique'
    AUTRE = 'Autre'


class TypeBilan(models.TextChoices):
    BIOLOGIQUE = 'Biologique'
    RADIOLOGIQUE = 'Radiologique'


class StatusBilan(models.TextChoices):
    EN_COURS = 'En_cours'
    TERMINE = 'Terminé'


class Groupe(models.TextChoices):
    MATIN = 'Matin'
    MIDI = 'Midi'
    NUIT = 'Nuit'


class Role(models.TextChoices):
    PATIENT = 'Patient'
    MEDECIN = 'Médecin'
    INFIRMIER = 'Infirmier'
    ADMINISTRATIF = 'Administratif'
    PHARMACIEN = 'Pharmacien'
    LABORANTIN = 'Laborantin'
    RADIOLOGUE = 'Radiologue'

# Models

class Etablissement(models.Model):
    nom = models.CharField(max_length=100)
    adresse = models.CharField(max_length=100)

    def __str__(self):
        return self.nom

class Patient(models.Model):
    NSS = models.CharField(max_length=15, unique=True)
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    date_naissance = models.DateField()
    adresse = models.CharField(max_length=100)
    mutuelle = models.CharField(max_length=50)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='patient', null=True, blank=True)
    personne_a_contacter = models.CharField(max_length=255, blank=True, null=True)


    
    def __str__(self):
        return f'{self.nom} {self.prenom}'
    








class Medcin(models.Model):
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    specialite = models.CharField(max_length=100)
    etablissement = models.ForeignKey(Etablissement, on_delete=models.CASCADE)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='medcin', null=True, blank=True)


    def __str__(self):
        return f'{self.nom} {self.prenom}'

class DPI(models.Model):
    date_creation = models.DateField(auto_now_add=True)
    qr_code = models.TextField()
    medecin_traitant = models.ForeignKey(Medcin, on_delete=models.CASCADE)
    etablissement_courant = models.ForeignKey(Etablissement, on_delete=models.CASCADE, null=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)

    def __str__(self):
        return f'DPI for {self.patient}'

class Hospitalisation(models.Model):
    date_entre = models.DateField()
    date_sortie = models.DateField()
    duree = models.CharField(max_length=50)
    certificat_medical = models.CharField(max_length=255)
    depense = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=StatusHospitalisation.choices, default=StatusHospitalisation.EN_COURS)
    dpi = models.ForeignKey(DPI, on_delete=models.CASCADE)

    def __str__(self):
        return f'Hospitalisation for {self.dpi.patient}'

class Consultation(models.Model):
    date = models.DateField(auto_now_add=True)
    medecin_consulte = models.CharField(max_length=100)
    dpi = models.ForeignKey(DPI, on_delete=models.CASCADE)

    def __str__(self):
        return f'Consultation on {self.date} by {self.medecin_consulte}'

class Resume(models.Model):
    date_prochaine_consultation = models.DateField()
    mesures_prises = models.TextField()
    consultation = models.ForeignKey(Consultation, on_delete=models.CASCADE)
    autres = models.TextField()

    def __str__(self):
        return f'Resumé for consultation on {self.consultation.date}'

class Laborantin(models.Model):
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    etablissement = models.ForeignKey(Etablissement, on_delete=models.CASCADE)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='laborantin', null=True, blank=True)

    def __str__(self):
        return f'{self.nom} {self.prenom}'

class Radiologue(models.Model):
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    etablissement = models.ForeignKey(Etablissement, on_delete=models.CASCADE)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='radiologue', null=True, blank=True)

    def __str__(self):
        return f'{self.nom} {self.prenom}'

class Bilan(models.Model):
    nom = models.CharField(max_length=100)
    date_demande = models.DateField(auto_now_add=True)
    date_recuperation = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=StatusBilan.choices, default=StatusBilan.EN_COURS)
    type = models.CharField(max_length=20, choices=TypeBilan.choices)
    redigant_laborantin = models.ForeignKey(Laborantin,null=True, blank=True, on_delete=models.SET_NULL)
    redigant_radiologue = models.ForeignKey(Radiologue, null=True, blank=True, on_delete=models.SET_NULL)
    graphique  = models.CharField(max_length=20, choices=StatusGraphique.choices, default= StatusGraphique.NON_ATTACHE)
    consultation = models.ForeignKey(Consultation, on_delete=models.CASCADE)

    def __str__(self):
        return f'Bilan {self.nom} for consultation on {self.consultation.date}'

class Ordonnance(models.Model):
    date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=StatusOrdonnance.choices, default=StatusOrdonnance.NON_VALIDE)
    observation = models.TextField()
    consultation = models.ForeignKey(Consultation, on_delete=models.CASCADE)

    def __str__(self):
        return f'Ordonnance for consultation on {self.consultation.date}'

class Medicament(models.Model):
    nom = models.CharField(max_length=100)
    code = models.CharField(max_length=50)
    type = models.CharField(max_length=20, choices=TypeMedicament)


    def __str__(self):
        return self.nom

class Traitement(models.Model):
    ordonnance = models.ForeignKey(Ordonnance,related_name='traitement_set', on_delete=models.CASCADE)
    medicament = models.ForeignKey(Medicament, on_delete=models.CASCADE)
    duree = models.CharField(max_length=50)
    dosage = models.CharField(max_length=50)

    def __str__(self):
        return f'Traitement for ordonnance {self.ordonnance.id}'

class Infermier(models.Model):
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    groupe = models.CharField(max_length=20, choices=Groupe.choices)
    etablissement = models.ForeignKey(Etablissement, on_delete=models.CASCADE)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='infermier', null=True, blank=True)

    def __str__(self):
        return f'{self.nom} {self.prenom}'

class Soin(models.Model):
    nom = models.CharField(max_length=100)
    date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=StatusSoin.choices)
    observation = models.TextField()
    dpi = models.ForeignKey(DPI, on_delete=models.CASCADE)
    infermier = models.ForeignKey(Infermier, on_delete=models.CASCADE)

    def __str__(self):
        return f'Soin {self.nom} for {self.dpi.patient}'

class Test(models.Model):
    nom = models.CharField(max_length=100)
    resultat = models.CharField(max_length=100)
    unite = models.CharField(max_length=50)
    autres = models.TextField()
    bilan = models.ForeignKey(Bilan, on_delete=models.CASCADE)

    def __str__(self):
        return f'Test {self.nom} for bilan {self.bilan.nom}'

class CompteRendu(models.Model):
    nom = models.CharField(max_length=100)
    resultat = models.TextField()
    bilan = models.ForeignKey(Bilan, on_delete=models.CASCADE)

    def __str__(self):
        return f'Compte rendu for bilan {self.bilan.nom}'

class Image(models.Model):
    donnee = models.BinaryField()
    compte_rendu = models.ForeignKey(CompteRendu, on_delete=models.CASCADE)

    def __str__(self):
        return f'Image for compte rendu {self.compte_rendu.id}'

class Admin(models.Model):
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='admin', null=True, blank=True)

    def __str__(self):
        return f'{self.nom} {self.prenom}'





"""
class PersonneAContacter(models.Model):
    prenom = models.CharField(max_length=50)
    nom = models.CharField(max_length=50)
    n_tlph = models.CharField(max_length=15)
    relation = models.CharField(max_length=50)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.prenom} {self.nom} (Contact for {self.patient})'
"""