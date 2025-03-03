import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../../services/navigation.service';
import {
  DPI,
  Traitement,
  Ordonnance,
  Consultation,
  Bilan,
} from '../../../models/interfaces/interfaces';
import { DpiService } from '../../../services/dpi.service';
import { ConsultationService } from '../../../services/consultation.service';
import * as QRCode from 'qrcode';
import { from } from 'rxjs';
import { setAccessedFromADashboardPatient } from '../../../guards/patient/afficher-consultation.guard';
import { ApiDataService } from '../../../services/api-data.service';
// import { AuthResponse } from '../../../models/interfaces/interfaces';

@Component({
  selector: 'app-dashboard-patient',
  imports: [CommonModule, HeaderComponent, RouterModule],
  templateUrl: './dashboard-patient.component.html',
  styleUrl: './dashboard-patient.component.css',
})
export class DashboardPatientComponent {
  patient: DPI;

  showParentUI: boolean = true;

  qrCodeDataUrl: string | null = null; //our image URL.

  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private dpiService: DpiService,
    private consultationService: ConsultationService,
    private apiDataService: ApiDataService
  ) {
    this.patient = this.dpiService.getDPI();
  }

  downloadImage() {
    const image = document.getElementById('qrCodeImage') as HTMLImageElement;
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `QR_code.png`;
    link.click();
  }

  // -------------------Trying to fetch Data:
  ngOnInit() {
    //trying to fetch data
    this.apiDataService
      .get(
        `dpi/consulter-dpi/1/`,
        '3a03779b0655e0518a93a3748d68ee478ee62dd0'
      )
      .subscribe({
        next: (data) => console.log('The Patient', data),
        error: (err) => console.error('Error fetching:', err),
      });
    if (this.patient) {
      // You can now use the DPI object in your template
      console.log('DPI object:', this.patient);
    } else {
      // If DPI is not found (e.g., user navigated directly), handle accordingly
      console.log('No DPI object found.');
    }
    // this.generateQRCode();
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check the current URL to determine if the child route is active
        const currentRoute = this.route.url;
        this.showParentUI = !currentRoute.includes('afficher-consultation');
      }
    });
  }

  // generateQRCode(): void {
  //   if (this.patient?.decodeBase64) {
  //     QRCode.toDataURL(this.patient.decodeBase64, {
  //       errorCorrectionLevel: 'H',
  //       width: 351,
  //     })
  //       .then((url) => {
  //         this.qrCodeDataUrl = url;
  //       })
  //       .catch((err) => {
  //         console.error('Error generating QR Code:', err);
  //       });
  //   } else {
  //     console.error('Error: Patient decodeBase64 value is undefined');
  //   }
  // }

  navigateToViewConsultation(consultation: Consultation) {
    this.consultationService.setConsultation(consultation);
    setAccessedFromADashboardPatient(true);
    this.route.navigate(['patient-afficher-consultation', consultation.id], {
      relativeTo: this.router,
    });
  }
}
