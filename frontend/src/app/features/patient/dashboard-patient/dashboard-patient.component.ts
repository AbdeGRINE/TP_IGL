import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../../services/navigation.service';
import * as QRCode from 'qrcode';
import { DPI, Consultation} from '../../../models/interfaces/interfaces';
import { from } from 'rxjs';

@Component({
  selector: 'app-dashboard-patient',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './dashboard-patient.component.html',
  styleUrl: './dashboard-patient.component.css',
})
export class DashboardPatientComponent {
  patient: DPI = {
    nom: 'Ammar',
    decodeBase64: 'SGVsbG8sIFdvcmxkIQ==',
    id: '',
    prenom: '',
    NSS: '',
    dateNaissance: new Date(),
    adresse: '',
    telephone: '',
    mutuelle: '',
    personneAContacter: '',
    medecin: '',
    dateDeCreation: new Date(),
    consultations: [],
    soins: []
  };

  Consultations: Consultation[] = [
    {
      id: 1,
      dateDeCreation: new Date('2023-01-01'),
      ordonnances: [],
      resume: '',
      bilansBiologique: [],
      bilanRadiologique: []
    },
    {
      id: 1,
      dateDeCreation: new Date('2023-01-01'),
      ordonnances: [],
      resume: '',
      bilansBiologique: [],
      bilanRadiologique: []
    },
    {
      id: 1,
      dateDeCreation: new Date('2023-01-01'),
      ordonnances: [],
      resume: '',
      bilansBiologique: [],
      bilanRadiologique: []
    },
    {
      id: 1,
      dateDeCreation: new Date('2023-01-01'),
      ordonnances: [],
      resume: '',
      bilansBiologique: [],
      bilanRadiologique: []
    },
    {
      id: 1,
      dateDeCreation: new Date('2023-01-01'),
      ordonnances: [],
      resume: '',
      bilansBiologique: [],
      bilanRadiologique: []
    },
    {
      id: 1,
      dateDeCreation: new Date('2023-01-01'),
      ordonnances: [],
      resume: '',
      bilansBiologique: [],
      bilanRadiologique: []
    },
  ];

  qrCodeDataUrl: string | null = null; //our image URL.
  // Automatically generate the QR code on load
  ngOnInit(): void {
    this.generateQRCode();
  }

  generateQRCode(): void {
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
  }

  downloadImage() {
    const image = document.getElementById('qrCodeImage') as HTMLImageElement;
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `QR_code_${this.patient.nom}.png`;
    link.click();
  }
}
