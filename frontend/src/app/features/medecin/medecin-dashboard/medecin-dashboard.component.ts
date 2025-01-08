import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import jsQR from 'jsqr';
import { DpiService } from '../../../services/dpi.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { setAccessedFromMedecin } from '../../../guards/medecin/afficher-dpi.guard';
import { AuthService } from '../../../services/auth.service';
import { AuthResponse } from '../../../models/interfaces/interfaces';
import { ApiDataService } from '../../../services/api-data.service';

export interface DPI {
  id: string;
  patient_nom: string;
  patient_prenom: string;
  medecin_traitant: MedecinTraitant;
  etablissement_courant: EtablissementCourant;
  date_creation: string;
  telephone: string;
  nss: string;
  qr_code: string;
}

export interface MedecinTraitant {
  id: number;
  nom: string;
  prenom: string;
  specialite: string;
}

export interface EtablissementCourant {
  id: number;
  nom: string;
  adresse: string;
}


@Component({
  selector: 'app-medecin-dashboard',
  imports: [CommonModule, HeaderComponent, RouterModule, FormsModule],
  templateUrl: './medecin-dashboard.component.html',
  styleUrl: './medecin-dashboard.component.css',
})
export class MedecinDashboardComponent implements OnInit {
  showParentUI: boolean = true;

  isPopupOpen: boolean;

  indexOfDPIToDelete: number = -1;

  DPIToDelete: DPI | null = null;

  DPIs: DPI[] | null = null;

  DPIsList: DPI[] | null = this.DPIs; //copy the DPIs array to DPIsList:


  authResponse: AuthResponse;
  constructor(
    private router: Router,
    private dpiService: DpiService,
    private authService: AuthService,
    private apiDataService: ApiDataService
  ) {
    this.isPopupOpen = false;
    this.authResponse = this.authService.getAuthResponse();
  }

  ngOnInit(): void {
    // this.DPIs = this.dpiService.getDPIs();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check the current URL to determine if the child route is active
        const currentRoute = this.router.url;
        this.showParentUI = !(
          currentRoute.includes('afficher-dpi') ||
          currentRoute.includes('creer-dpi') ||
          currentRoute.includes('medecin-creer-dpi')
        );
      }
    });

    //fetch DPIs data:
    this.apiDataService
      .get<DPI[]>(
        `dpi/lister_par_medecin/${this.authResponse.user.type.id}`,
        `${this.authService.getToken()}`
      )
      .subscribe({
        next: (data) => {
          this.DPIs = data; 
          this.DPIsList = this.DPIs;
          console.log(this.DPIs);
        },
        error: (err) => console.error('Error fetching soins:', err),
      });
  }

  navigateToViewDPI(DPI: DPI) {
    this.dpiService.setDPI(DPI);
    setAccessedFromMedecin(true);
    this.router.navigate(['/medecin-dashboard/afficher-dpi', DPI.id]);
  }

  navigateToCreerDPI() {
    this.router.navigate(['/medecin-dashboard/medecin-creer-dpi']);
    //this.router.navigate(['./creer-dpi-medecin'], { relativeTo: this.route });
  }

  // ---------------------------------------------- SEARCH Logic:
  // In any reload of the page: DPIsList will be DPIs.
  matchedDPI: null | DPI = {
    id: '',
    patient_nom: '',
    patient_prenom: '',
    medecin_traitant: {
      id: 0,
      nom: '',
      prenom: '',
      specialite: '',
    },
    etablissement_courant: {
      id: 0,
      nom: '',
      adresse: '',
    },
    date_creation: '',
    nss: '',
    qr_code: '',
    telephone: '',
  };
  decodedBase64: string | null = null; //the result of decoding QR code will be here.
  searchedNSS: string | null = null; //the searched NSS by the user.

  // Search by QR code logic:
  matchDPIbyQRcode(): void {
    this.matchedDPI =
      this.DPIs?.find((DPI) => DPI.qr_code === this.decodedBase64) || null;
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
        this.DPIs?.find((DPI) => DPI.nss === this.searchedNSS) || null;
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

  //Delete Section View:
  deleteConsultation() {
    this.DPIs = this.DPIs?.filter((c) => c.id !== this.DPIToDelete?.id) || null;
    console.log(this.DPIs);
    // this.dpiService.setDPIs(this.DPIs || null);
    this.closeDeletionPopup();
  }

  OpenDeletionPopup(index: number) {
    this.isPopupOpen = true;
    console.log(index);
    this.indexOfDPIToDelete = index;
    if (this.DPIs) {
      this.DPIToDelete = this.DPIs[this.indexOfDPIToDelete];
    } else {
      this.DPIToDelete = null;
    }
    console.log(this.DPIToDelete);
  }

  closeDeletionPopup() {
    this.indexOfDPIToDelete = -1;
    this.isPopupOpen = false;
  }
}