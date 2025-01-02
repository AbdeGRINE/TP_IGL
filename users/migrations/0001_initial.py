# Generated by Django 5.1.4 on 2025-01-01 22:04

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Bilan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=100)),
                ('date_demande', models.DateField(auto_now_add=True)),
                ('date_recuperation', models.DateField(blank=True, null=True)),
                ('status', models.CharField(choices=[('En_cours', 'En Cours'), ('Terminé', 'Termine')], default='En_cours', max_length=20)),
                ('type', models.CharField(choices=[('Biologique', 'Biologique'), ('Radiologique', 'Radiologique')], max_length=20)),
                ('graphique', models.CharField(choices=[('Attaché', 'Attache'), ('Non_Attaché', 'Non Attache')], default='Non_Attaché', max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Consultation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now_add=True)),
                ('medecin_consulte', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='DPI',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_creation', models.DateField(auto_now_add=True)),
                ('qr_code', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Etablissement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=100)),
                ('adresse', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Medicament',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=100)),
                ('code', models.CharField(max_length=50)),
                ('type', models.CharField(choices=[('Oral', 'Oral'), ('Injection', 'Injection'), ('Topique', 'Topique'), ('Autre', 'Autre')], max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Admin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=50)),
                ('prenom', models.CharField(max_length=50)),
                ('user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='admin', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='CompteRendu',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=100)),
                ('resultat', models.TextField()),
                ('bilan', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.bilan')),
            ],
        ),
        migrations.AddField(
            model_name='bilan',
            name='consultation',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.consultation'),
        ),
        migrations.AddField(
            model_name='consultation',
            name='dpi',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.dpi'),
        ),
        migrations.AddField(
            model_name='dpi',
            name='etablissement_courant',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='users.etablissement'),
        ),
        migrations.CreateModel(
            name='Hospitalisation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_entre', models.DateField()),
                ('date_sortie', models.DateField()),
                ('duree', models.CharField(max_length=50)),
                ('certificat_medical', models.CharField(max_length=255)),
                ('depense', models.DecimalField(decimal_places=2, max_digits=10)),
                ('status', models.CharField(choices=[('En_cours', 'En Cours'), ('Terminé', 'Termine')], default='En_cours', max_length=20)),
                ('dpi', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.dpi')),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('donnee', models.BinaryField()),
                ('compte_rendu', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.compterendu')),
            ],
        ),
        migrations.CreateModel(
            name='Infermier',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=50)),
                ('prenom', models.CharField(max_length=50)),
                ('groupe', models.CharField(choices=[('Matin', 'Matin'), ('Midi', 'Midi'), ('Nuit', 'Nuit')], max_length=20)),
                ('etablissement', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.etablissement')),
                ('user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='infermier', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Laborantin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=50)),
                ('prenom', models.CharField(max_length=50)),
                ('etablissement', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.etablissement')),
                ('user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='laborantin', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='bilan',
            name='redigant_laborantin',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='users.laborantin'),
        ),
        migrations.CreateModel(
            name='Medcin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=50)),
                ('prenom', models.CharField(max_length=50)),
                ('specialite', models.CharField(max_length=100)),
                ('etablissement', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.etablissement')),
                ('user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='medcin', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='dpi',
            name='medecin_traitant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.medcin'),
        ),
        migrations.CreateModel(
            name='Ordonnance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now_add=True)),
                ('status', models.CharField(choices=[('Validé', 'Valide'), ('Non_validé', 'Non Valide')], default='Non_validé', max_length=20)),
                ('observation', models.TextField()),
                ('consultation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.consultation')),
            ],
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('NSS', models.CharField(max_length=15, unique=True)),
                ('nom', models.CharField(max_length=50)),
                ('prenom', models.CharField(max_length=50)),
                ('date_naissance', models.DateField()),
                ('adresse', models.CharField(max_length=100)),
                ('mutuelle', models.CharField(max_length=50)),
                ('personne_a_contacter', models.CharField(blank=True, max_length=255, null=True)),
                ('user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='patient', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='dpi',
            name='patient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.patient'),
        ),
        migrations.CreateModel(
            name='Radiologue',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=50)),
                ('prenom', models.CharField(max_length=50)),
                ('etablissement', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.etablissement')),
                ('user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='radiologue', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='bilan',
            name='redigant_radiologue',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='users.radiologue'),
        ),
        migrations.CreateModel(
            name='Resume',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_prochaine_consultation', models.DateField()),
                ('mesures_prises', models.TextField()),
                ('autres', models.TextField()),
                ('consultation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.consultation')),
            ],
        ),
        migrations.CreateModel(
            name='Soin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=100)),
                ('date', models.DateField(auto_now_add=True)),
                ('status', models.CharField(choices=[('Programmé', 'Programme'), ('Complété', 'Complete'), ('Annulé', 'Annule')], max_length=20)),
                ('observation', models.TextField()),
                ('dpi', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.dpi')),
                ('infermier', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.infermier')),
            ],
        ),
        migrations.CreateModel(
            name='Test',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=100)),
                ('resultat', models.CharField(max_length=100)),
                ('unite', models.CharField(max_length=50)),
                ('autres', models.TextField()),
                ('bilan', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.bilan')),
            ],
        ),
        migrations.CreateModel(
            name='Traitement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('duree', models.CharField(max_length=50)),
                ('dosage', models.CharField(max_length=50)),
                ('medicament', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.medicament')),
                ('ordonnance', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='traitement_set', to='users.ordonnance')),
            ],
        ),
    ]
