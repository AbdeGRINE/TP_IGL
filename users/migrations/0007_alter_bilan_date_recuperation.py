# Generated by Django 5.1.4 on 2024-12-25 23:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_rename_status_medicament_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bilan',
            name='date_recuperation',
            field=models.DateField(blank=True, null=True),
        ),
    ]
