import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DPI, Consultation } from '../../../models/interfaces/interfaces';
import { DpiService } from '../../../services/dpi.service';
import { ConsultationService } from '../../../services/consultation.service';
import * as QRCode from 'qrcode';
import { setAccessedFromAfficherDPI } from '../../../guards/medecin/afficher-consultation.guard';
import { setAccessedFromAfficherDpi } from '../../../guards/medecin/creer-consultation.guard';
import { ApiDataService } from '../../../services/api-data.service';
import { AuthResponse } from '../../../models/interfaces/interfaces';
import { AuthService } from '../../../services/auth.service';
import { setAccessedFromMedecin } from '../../../guards/medecin/afficher-dpi.guard';
import { Cons } from 'rxjs';

//Because the respons of DPI is not the same as our declaration in interfaces.sevice,
//and beacuse change what in intefaces.service will implies nourmus changes,
//we choose to write this, as a bad choice:
export interface DPIResponse {
  id: number;
  patient: Patient;
  medecin_traitant: MedecinTraitant;
  etablissement_courant: EtablissementCourant;
  qr_code: string;
  date_creation: string;
}
export interface Patient {
  NSS: string;
  nom: string;
  prenom: string;
  date_naissance: string;
  adresse: string;
  mutuelle: string;
  personne_a_contacter: string;
}
export interface MedecinTraitant {
  id: number;
  nom: string;
  prenom: string;
}
export interface EtablissementCourant {
  id: number;
  nom: string;
  adresse: string;
}

@Component({
  selector: 'app-afficher-dpi',
  imports: [CommonModule, HeaderComponent, RouterModule],
  templateUrl: './afficher-dpi.component.html',
  styleUrl: './afficher-dpi.component.css',
})
export class AfficherDpiComponent implements OnInit {
  patient: DPI;
  DPIResponse: DPIResponse | null = null;
  showParentUI: boolean = true;
  qrCodeDataUrl: string | null = null; //our image URL.
  isPopupOpen: boolean = false;
  indexOfConsultationToDelete: number = -1;
  consultationToDelete: Consultation | null = null;
  consultation: Consultation | null = null;
  authResponse: AuthResponse;

  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private dpiService: DpiService,
    private consultationService: ConsultationService,
    private apiDataService: ApiDataService,
    private authService: AuthService
  ) {
    this.patient = this.dpiService.getDPI(); //bring patient's data.
    this.authResponse = this.authService.getAuthResponse();
  }

  ngOnInit() {
    setAccessedFromMedecin(true);
    //fetch DPI here:
    this.apiDataService
      .get<DPIResponse>(
        `dpi/consulter-dpi/${this.patient.id}/`,
        `${this.authService.getToken()}`
      )
      .subscribe({
        next: (data) => {
          if (this.patient) {
            this.DPIResponse = data;
          }
        },
        error: (err) => console.error('Error fetching Patient', err),
      });
    this.generateQRCode();
    //fetch Consultation here:
    this.apiDataService
      .get<Consultation[]>(
        `Consultation/dpi/${this.patient.id}/`,
        `${this.authService.getToken()}`
      )
      .subscribe({
        next: (data) => {
          if (this.patient) {
            this.patient.consultations = data;
          }
        },
        error: (err) => console.error('Error fetching Consultation', err),
      });

    //Routing... etc.
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check the current URL to determine if the child route is active
        const currentRoute = this.route.url;
        this.showParentUI = !(
          currentRoute.includes('afficher-consultation') ||
          currentRoute.includes('creer-consultation')
        );
      }
    });
  }

  //-------------------------------------------------------QR code Section:
  generateQRCode(): void {
    if (this.patient.qr_code) {
      QRCode.toDataURL(this.patient.qr_code, {
        errorCorrectionLevel: 'H',
      })
        .then((url) => {
          this.qrCodeDataUrl = url;
        })
        .catch((err) => {
          console.error('Error generating QR Code:', err);
        });
    } else {
      console.error('Error: Patient decodeBase64 value is undefined');
    }
  }

  downloadImage() {
    const image = document.getElementById('qrCodeImage') as HTMLImageElement;
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `QR_code${this.patient.patient_nom}_${this.patient.patient_prenom}.png`;
    link.click();
  }
  //------------------------------------------------------- Navigation Section:
  navigateToViewConsultation(consultation: Consultation) {
    this.consultationService.setConsultation(consultation);
    setAccessedFromAfficherDPI(true);
    this.route.navigate(['afficher-consultation', consultation.id], {
      relativeTo: this.router,
    });
  }

  goBack() {
    this.route.navigate(['../..'], { relativeTo: this.router });
  }

  NavigateToCreerConsultation() {
    //creat consultation using the end point:
    this.apiDataService
      .createConsultation<Consultation>(
        'Consultation/creer/',
        this.patient.id,
        `${this.authService.getToken()}`
      )
      .subscribe({
        next: (response) => {
          if (!this.patient.consultations) {
            this.patient.consultations = [];
          }
          this.patient.consultations.push({ ...response });
          this.dpiService.setDPI(this.patient);
        },
        error: (err) => {
          alert('Impossible de creer la consultation. Veuillez réessayer.');
          console.error(err);
        },
      });

    setAccessedFromAfficherDpi(true);
    this.route.navigate(['creer-consultation'], { relativeTo: this.router });
  }

  //------------------------------------------------------- Delete Section:
  deleteConsultation() {
    this.patient.consultations = this.patient.consultations.filter(
      (c) => c.id !== this.consultationToDelete?.id
    );
    console.log(this.patient);
    this.dpiService.setDPI(this.patient);
    this.closeDeletionPopup();
  }

  OpenDeletionPopup(index: number) {
    this.isPopupOpen = true;
    console.log(index);
    this.indexOfConsultationToDelete = index;
    this.consultationToDelete =
      this.patient.consultations[this.indexOfConsultationToDelete];
    console.log(this.consultationToDelete);
  }

  closeDeletionPopup() {
    this.indexOfConsultationToDelete = -1;
    this.isPopupOpen = false;
  }
}
