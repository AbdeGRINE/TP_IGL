import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router , RouterModule,NavigationEnd, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { DPI, Traitement, Ordonnance, Consultation, Bilan } from '../../../models/interfaces/consultation';
import { DpiService } from '../../../services/dpi.service';


@Component({
  selector: 'app-medecin-dashboard',
  imports: [CommonModule, HeaderComponent,RouterModule],
  templateUrl: './medecin-dashboard.component.html',
  styleUrl: './medecin-dashboard.component.css',
})
export class MedecinDashboardComponent implements OnInit{

  showParentUI: boolean = true;

  DPIs: DPI[] = [{
    id: 'P12345',
    nom: 'Benziada',
    prenom : 'Fares',
    NSS : "123456",
    dateNaissance :new Date("01-01-2004"),
    adresse : "Reghaia",
    telephone : "0666666666",
    mutuelle: "/",
    personneAContacter :"/",
    medecin: 'Grine',
    dateDeCreation: new Date('2023-01-01'),
    consultations: [{
      id : 1,
      dateDeCreation : new Date('2024-12-30'),
      resume : 'doit etre hospitalise',
      bilanRadiologique : [{
        id : "2",
        nom : "Bilan 2",
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
    NSS : "123456",
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
    NSS : '123456',
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
    NSS : '123456',
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
    NSS : '123456',
    dateNaissance :new Date("01-01-2004"),
    adresse : "Reghaia",
    telephone : "0666666666",
    mutuelle: "/",
    personneAContacter :"/",
    medecin: 'Grine',
    dateDeCreation: new Date('2023-01-01'),
    consultations: [{
      id : 1,
      dateDeCreation : new Date('2024-12-30'),
      resume : 'doit etre hospitalise',
      bilanRadiologique : [{
        id : "2",
        nom : "Bilan 2",
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

  constructor(private router: Router,private route: ActivatedRoute , private dpiService: DpiService){}
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check the current URL to determine if the child route is active
        const currentRoute = this.router.url;
        this.showParentUI = !(currentRoute.includes('afficher-dpi') || currentRoute.includes('creer-dpi'));
      }
    });
  }

  

  navigateToViewDPI(DPI: DPI) {
    this.dpiService.setDPI(DPI);
    this.router.navigate(['/medecin-dashboard/afficher-dpi', DPI.id]);
  }

  navigateToCreerDPI(){
    this.router.navigate(['./creer-dpi'], { relativeTo: this.route });
  }
}
