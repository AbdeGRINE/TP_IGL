import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule,NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../../services/navigation.service';
import { DPI, Traitement, Ordonnance, Consultation, Bilan } from '../../../models/interfaces/interfaces';
import { DpiService } from '../../../services/dpi.service';
import { ConsultationService } from '../../../services/consultation.service';
import * as QRCode from 'qrcode';
import { from } from 'rxjs';
import { setAccessedFromAfficherDPI } from '../../../guards/medecin/afficher-consultation.guard';
import { setAccessedFromAfficherDpi } from '../../../guards/medecin/creer-consultation.guard';


@Component({
  selector: 'app-afficher-dpi',
  imports: [CommonModule, HeaderComponent,RouterModule],
  templateUrl: './afficher-dpi.component.html',
  styleUrl: './afficher-dpi.component.css'
})
export class AfficherDpiComponent implements OnInit{

    patient: DPI ;

    showParentUI: boolean = true;

    qrCodeDataUrl: string | null = null; //our image URL.

    isPopupOpen : boolean = false;

    indexOfConsultationToDelete : number = -1;

    consultationToDelete : Consultation | null = null;

    constructor(private route : Router,private router: ActivatedRoute, private dpiService: DpiService, private consultationService : ConsultationService){
      this.patient = this.dpiService.getDPI();
    }

    downloadImage() {
      const image = document.getElementById('qrCodeImage') as HTMLImageElement;
      const link = document.createElement('a');
      link.href = image.src;
      link.download = `QR_code.png`;
      link.click();
    }

    ngOnInit() {
      if (this.patient) {
        // You can now use the DPI object in your template
        console.log('DPI object:', this.patient);
      } else {
        // If DPI is not found (e.g., user navigated directly), handle accordingly
        console.log('No DPI object found.');
    }
    this.generateQRCode();
    this.route.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
            // Check the current URL to determine if the child route is active
            const currentRoute = this.route.url;
            this.showParentUI = !(currentRoute.includes('afficher-consultation') || currentRoute.includes("creer-consultation"));
          }
        });
  }

  generateQRCode(): void {
    if (this.patient?.decodeBase64) {
      QRCode.toDataURL(this.patient.decodeBase64, {
        errorCorrectionLevel: 'H',
        width: 351,
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
  

  navigateToViewConsultation(consultation : Consultation){
    this.consultationService.setConsultation(consultation);
    setAccessedFromAfficherDPI(true);
    this.route.navigate(['afficher-consultation', consultation.id], { relativeTo: this.router });
}

  goBack(){
    this.route.navigate(['../..',], { relativeTo: this.router });
  }
  NavigateToCreerConsultation(){
    console.log(this.dpiService.getDPI());
    setAccessedFromAfficherDpi(true);
    this.route.navigate(['creer-consultation'], { relativeTo: this.router });
  }

  deleteConsultation(){
    this.patient.consultations = this.patient.consultations.filter(c => c.id !== this.consultationToDelete?.id);
    console.log(this.patient);
    this.dpiService.setDPI(this.patient);
    this.closeDeletionPopup();
  }

  OpenDeletionPopup(index : number){
    this.isPopupOpen = true;
    console.log(index);
    this.indexOfConsultationToDelete = index;
    this.consultationToDelete = this.patient.consultations[this.indexOfConsultationToDelete];
    console.log(this.consultationToDelete);
  }
  closeDeletionPopup(){
    this.indexOfConsultationToDelete = -1;
    this.isPopupOpen = false;
  }
}