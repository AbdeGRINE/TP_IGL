# Generated by Django 5.1.4 on 2024-12-31 09:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_alter_bilan_date_recuperation'),
    ]

    operations = [
        migrations.AddField(
            model_name='bilan',
            name='graphique',
            field=models.CharField(choices=[('Attaché', 'Attache'), ('Non_Attaché', 'Non Attache')], default='Non_Attaché', max_length=20),
        ),
    ]
