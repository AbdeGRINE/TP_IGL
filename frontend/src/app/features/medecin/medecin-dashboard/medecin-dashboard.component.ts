import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router , RouterModule,NavigationEnd, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import jsQR from 'jsqr';
import { DPI, Traitement, Ordonnance, Consultation, Bilan } from '../../../models/interfaces/consultation';
import { DpiService } from '../../../services/dpi.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule


@Component({
  selector: 'app-medecin-dashboard',
  imports: [CommonModule, HeaderComponent,RouterModule, FormsModule],
  templateUrl: './medecin-dashboard.component.html',
  styleUrl: './medecin-dashboard.component.css',
})
export class MedecinDashboardComponent implements OnInit{

  showParentUI: boolean = true;

  DPIs: DPI[] = [{
    id: 'P12345',
    nom: 'Benziada',
<<<<<<< HEAD
    prenom: 'Fares',
    NSS: '123456',
    dateNaissance: new Date("01-01-2004"),
    adresse: "Reghaia",
    telephone: "0666666666",
=======
    prenom : 'Fares',
    NSS : "123456",
    dateNaissance :new Date("01-01-2004"),
    adresse : "Reghaia",
    telephone : "0666666666",
>>>>>>> 4c9d319a2322b8e3308614a562da0c0cbd65824b
    mutuelle: "/",
    personneAContacter: "/",
    medecin: 'Grine',
    dateDeCreation: new Date('2023-01-01'),
    consultations: [{
      id: 1,
      dateDeCreation: new Date('2024-12-30'),
      resume: 'doit etre hospitalise',
      bilanRadiologique: [{
        id: "2",
        nom: "Bilan 2",
      }],
      bilansBiologique: [{
        id: "1",
        nom: "Bilan 1",
      }],
      ordonnances: [
        {
          titre: 'Ordonnance 1',
          state: 'En attente',
          traitements: [{
            medicament: 'doliprane',
            dose: '2000mg',
            duree: '2 jours',
          }]
        },
      ]
    }
    ],
    soins: [],
    decodeBase64: 'SGVsbG8sIFdvcmxkIQ=='
  },
  {
    id: 'P12345',
    nom: 'Benziada',
<<<<<<< HEAD
    prenom: 'Fares',
    NSS: '123456',
    dateNaissance: new Date("01-01-2004"),
    adresse: "Reghaia",
    telephone: "0666666666",
=======
    prenom : 'Fares',
    NSS : "123456",
    dateNaissance :new Date("01-01-2004"),
    adresse : "Reghaia",
    telephone : "0666666666",
>>>>>>> 4c9d319a2322b8e3308614a562da0c0cbd65824b
    mutuelle: "/",
    personneAContacter: "/",
    medecin: 'Grine',
    dateDeCreation: new Date('2023-01-01'),
    consultations: [{
      id: 1,
      dateDeCreation: new Date('2023-01-01'),
      resume: 'doit etre hospitalise',
      bilanRadiologique: [{
        id: "1",
        nom: "Bilan 1",
      }],
      bilansBiologique: [{
        id: "1",
        nom: "Bilan 1",
      }],
      ordonnances: [
        {
          titre: 'Ordonnance 1',
          state: 'En attente',
          traitements: [{
            medicament: 'doliprane',
            dose: '2000mg',
            duree: '2 jours',
          }]
        },
      ]
    }
    ],
    soins: [],
    decodeBase64: ''
  },
  {
    id: 'P12345',
    nom: 'Benziada',
<<<<<<< HEAD
    prenom: 'Fares',
    NSS: '123456',
    dateNaissance: new Date("01-01-2004"),
    adresse: "Reghaia",
    telephone: "0666666666",
=======
    prenom : 'Fares',
    NSS : '123456',
    dateNaissance :new Date("01-01-2004"),
    adresse : "Reghaia",
    telephone : "0666666666",
>>>>>>> 4c9d319a2322b8e3308614a562da0c0cbd65824b
    mutuelle: "/",
    personneAContacter: "/",
    medecin: 'Grine',
    dateDeCreation: new Date('2023-01-01'),
    consultations: [{
      id: 1,
      dateDeCreation: new Date('2023-01-01'),
      resume: 'doit etre hospitalise',
      bilanRadiologique: [{
        id: "1",
        nom: "Bilan 1",
      }],
      bilansBiologique: [{
        id: "1",
        nom: "Bilan 1",
      }],
      ordonnances: [
        {
          titre: 'Ordonnance 1',
          state: 'En attente',
          traitements: [{
            medicament: 'doliprane',
            dose: '2000mg',
            duree: '2 jours',
          }]
        },
      ]
    }
    ],
    soins: [],
    decodeBase64: ''
  },
  {
    id: 'P12345',
    nom: 'Benziada',
<<<<<<< HEAD
    prenom: 'Fares',
    NSS: '123456',
    dateNaissance: new Date("01-01-2004"),
    adresse: "Reghaia",
    telephone: "0666666666",
=======
    prenom : 'Fares',
    NSS : '123456',
    dateNaissance :new Date("01-01-2004"),
    adresse : "Reghaia",
    telephone : "0666666666",
>>>>>>> 4c9d319a2322b8e3308614a562da0c0cbd65824b
    mutuelle: "/",
    personneAContacter: "/",
    medecin: 'Grine',
    dateDeCreation: new Date('2023-01-01'),
    consultations: [{
      id: 1,
      dateDeCreation: new Date('2023-01-01'),
      resume: 'doit etre hospitalise',
      bilanRadiologique: [{
        id: "1",
        nom: "Bilan 1",
      }],
      bilansBiologique: [{
        id: "1",
        nom: "Bilan 1",
      }],
      ordonnances: [
        {
          titre: 'Ordonnance 1',
          state: 'En attente',
          traitements: [{
            medicament: 'doliprane',
            dose: '2000mg',
            duree: '2 jours',
          }]
        },
      ]
    }
    ],
    soins: [],
    decodeBase64: ''
  },
  {
    id: 'P12345',
    nom: 'Benziada',
<<<<<<< HEAD
    prenom: 'Fares',
    NSS: '123456',
    dateNaissance: new Date("01-01-2004"),
    adresse: "Reghaia",
    telephone: "0666666666",
=======
    prenom : 'Fares',
    NSS : '123456',
    dateNaissance :new Date("01-01-2004"),
    adresse : "Reghaia",
    telephone : "0666666666",
>>>>>>> 4c9d319a2322b8e3308614a562da0c0cbd65824b
    mutuelle: "/",
    personneAContacter: "/",
    medecin: 'Grine',
    dateDeCreation: new Date('2023-01-01'),
    consultations: [{
      id: 1,
      dateDeCreation: new Date('2024-12-30'),
      resume: 'doit etre hospitalise',
      bilanRadiologique: [{
        id: "2",
        nom: "Bilan 2",
      }],
      bilansBiologique: [{
        id: "1",
        nom: "Bilan 1",
      }],
      ordonnances: [
        {
          titre: 'Ordonnance 1',
          state: 'En attente',
          traitements: [{
            medicament: 'doliprane',
            dose: '2000mg',
            duree: '2 jours',
          }]
        },
      ]
    }
    ],
    soins: [],
    decodeBase64: ''
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
    this.router.navigate(['/medecin-dashboard/creer-dpi-medecin']);
  
    //this.router.navigate(['./creer-dpi-medecin'], { relativeTo: this.route });
  }

  // ---------------------------------------------- SEARCH Logic:
  // In any reload of the page: DPIsList will be DPIs.
  DPIsList: DPI[] = [...this.DPIs]; //copy the DPIs array to DPIsList:
  matchedDPI: null | DPI = {
    id: '',
    nom: '',
    telephone: '',
    dateDeCreation: new Date(),
    decodeBase64: '',
    NSS: '',
    prenom: '',
    dateNaissance: new Date(),
    adresse: '',
    mutuelle: '',
    personneAContacter: '',
    medecin: '',
    consultations: [],
    soins: []
  };
  decodedBase64: string | null = null; //the result of decoding QR code will be here.
  searchedNSS: string | null = null; //the searched NSS by the user.

  // Search by QR code logic:
  matchDPIbyQRcode(): void {
    this.matchedDPI =
      this.DPIs.find((DPI) => DPI.decodeBase64 === this.decodedBase64) || null;
    if (this.matchedDPI) {
      this.DPIsList = [this.matchedDPI];
    } else {
      alert('Aucun patient n a été trouvé correspondant au code QR.');
    }
  }

  //function of decoding the QR code:
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          // Create a canvas to extract image data
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          if (context) {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height);
            // Get image data and decode the QR code
            const imageData = context.getImageData(0, 0, img.width, img.height);
            const qrCodeData = jsQR(imageData.data, img.width, img.height);
            if (qrCodeData) {
              // The QR code data extracted
              this.decodedBase64 = qrCodeData.data;
              alert('DPI trouve!');
              //search by QR directly when the user sumbit the image:
              this.matchDPIbyQRcode();
              // console.log('Decoded Base64:', this.decodedBase64);
            } else {
              alert('Aucun code QR trouvé.');
            }
          }
        };
        img.src = e.target.result; // Load the uploaded image
      };
      reader.readAsDataURL(file); // Convert image to base64
    }
  }
  
  // Search by NSS logic:
  matchDPIbyNSS(): void {
    if (this.searchedNSS) {
      this.matchedDPI =
        this.DPIs.find((DPI) => DPI.NSS === this.searchedNSS) || null;
      if (this.matchedDPI) {
        this.DPIsList = [this.matchedDPI];
        this.searchedNSS = null;
        alert('DPI trouvé!');
      } else {
        alert('Aucun patient n a été trouvé correspondant au ce NSS.');
      }
    } else {
      alert('Ecrire le NSS avant la recherche!');
    }
  }
}
