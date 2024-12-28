import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { DPI, Traitement, Ordonnance, Consultation, Bilan } from '../../../models/interfaces/consultation';


@Component({
  selector: 'app-medecin-dashboard',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './medecin-dashboard.component.html',
  styleUrl: './medecin-dashboard.component.css',
})
export class MedecinDashboardComponent {
  DPIs: DPI[] = [{
    id: 'P12345',
    nom: 'Benziada',
    prenom : 'Fares',
    NSS : 123456,
    dateNaissance :new Date("01-01-2004"),
    adresse : "Reghaia",
    telephone : "0666666666",
    mutuelle: "/",
    personneAContacter :"/",
    medecin: 'Grine',
    dateDeCreation: new Date('2023-01-01'),
    consultations: [{
      id : 1,
      dateDeCreation : new Date('2023-01-01'),
      resume : 'doit etre hospitalise',
      bilanRadiologique : [{
        id : "1",
        nom : "Bilan 1",
      }],
      bilansBiologique : [{
        id : "1",
        nom : "Bilan 1",
      }],
      ordonnances : [
        {
          titre: 'Ordonnance 1',
          state: 'En attente',
          traitements : [{
            medicament : 'doliprane',
            dose : '2000mg',
            duree: '2 jours',
          }]
        },
    ]}
    ],
    soins: [
    ],
  },
  {
    id: 'P12345',
    nom: 'Benziada',
    prenom : 'Fares',
    NSS : 123456,
    dateNaissance :new Date("01-01-2004"),
    adresse : "Reghaia",
    telephone : "0666666666",
    mutuelle: "/",
    personneAContacter :"/",
    medecin: 'Grine',
    dateDeCreation: new Date('2023-01-01'),
    consultations: [{
      id : 1,
      dateDeCreation : new Date('2023-01-01'),
      resume : 'doit etre hospitalise',
      bilanRadiologique : [{
        id : "1",
        nom : "Bilan 1",
      }],
      bilansBiologique : [{
        id : "1",
        nom : "Bilan 1",
      }],
      ordonnances : [
        {
          titre: 'Ordonnance 1',
          state: 'En attente',
          traitements : [{
            medicament : 'doliprane',
            dose : '2000mg',
            duree: '2 jours',
          }]
        },
    ]}
    ],
    soins: [
    ],
  },
  {
    id: 'P12345',
    nom: 'Benziada',
    prenom : 'Fares',
    NSS : 123456,
    dateNaissance :new Date("01-01-2004"),
    adresse : "Reghaia",
    telephone : "0666666666",
    mutuelle: "/",
    personneAContacter :"/",
    medecin: 'Grine',
    dateDeCreation: new Date('2023-01-01'),
    consultations: [{
      id : 1,
      dateDeCreation : new Date('2023-01-01'),
      resume : 'doit etre hospitalise',
      bilanRadiologique : [{
        id : "1",
        nom : "Bilan 1",
      }],
      bilansBiologique : [{
        id : "1",
        nom : "Bilan 1",
      }],
      ordonnances : [
        {
          titre: 'Ordonnance 1',
          state: 'En attente',
          traitements : [{
            medicament : 'doliprane',
            dose : '2000mg',
            duree: '2 jours',
          }]
        },
    ]}
    ],
    soins: [
    ],
  },
  {
    id: 'P12345',
    nom: 'Benziada',
    prenom : 'Fares',
    NSS : 123456,
    dateNaissance :new Date("01-01-2004"),
    adresse : "Reghaia",
    telephone : "0666666666",
    mutuelle: "/",
    personneAContacter :"/",
    medecin: 'Grine',
    dateDeCreation: new Date('2023-01-01'),
    consultations: [{
      id : 1,
      dateDeCreation : new Date('2023-01-01'),
      resume : 'doit etre hospitalise',
      bilanRadiologique : [{
        id : "1",
        nom : "Bilan 1",
      }],
      bilansBiologique : [{
        id : "1",
        nom : "Bilan 1",
      }],
      ordonnances : [
        {
          titre: 'Ordonnance 1',
          state: 'En attente',
          traitements : [{
            medicament : 'doliprane',
            dose : '2000mg',
            duree: '2 jours',
          }]
        },
    ]}
    ],
    soins: [
    ],
  },
  {
    id: 'P12345',
    nom: 'Benziada',
    prenom : 'Fares',
    NSS : 123456,
    dateNaissance :new Date("01-01-2004"),
    adresse : "Reghaia",
    telephone : "0666666666",
    mutuelle: "/",
    personneAContacter :"/",
    medecin: 'Grine',
    dateDeCreation: new Date('2023-01-01'),
    consultations: [{
      id : 1,
      dateDeCreation : new Date('2023-01-01'),
      resume : 'doit etre hospitalise',
      bilanRadiologique : [{
        id : "1",
        nom : "Bilan 1",
      }],
      bilansBiologique : [{
        id : "1",
        nom : "Bilan 1",
      }],
      ordonnances : [
        {
          titre: 'Ordonnance 1',
          state: 'En attente',
          traitements : [{
            medicament : 'doliprane',
            dose : '2000mg',
            duree: '2 jours',
          }]
        },
    ]}
    ],
    soins: [
    ],
  }
  ];

  constructor(private router: Router){}

  navigateToViewDPI(DPI: DPI) {
    this.router.navigateByUrl('/afficher-dpi', { state: DPI });
  }
}
