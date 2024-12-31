import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../../services/navigation.service';
import * as QRCode from 'qrcode';

//to test:
interface Patient {
  nom: string;
  QR_code_base64: string;
}

interface Consultation {
  id: string;
  dateDeCreation: Date;
}

@Component({
  selector: 'app-dashboard-patient',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './dashboard-patient.component.html',
  styleUrl: './dashboard-patient.component.css',
})
export class DashboardPatientComponent {
  patient: Patient = {
    nom: 'Amal',
    QR_code_base64: 'SGVsbG8sIFdvcmxkIQ==',
  };

  Consultations: Consultation[] = [
    {
      id: '1',
      dateDeCreation: new Date('2023-01-01'),
    },
    {
      id: '1',
      dateDeCreation: new Date('2023-01-01'),
    },
    {
      id: '1',
      dateDeCreation: new Date('2023-01-01'),
    },
    {
      id: '1',
      dateDeCreation: new Date('2023-01-01'),
    },
    {
      id: '1',
      dateDeCreation: new Date('2023-01-01'),
    },
    {
      id: '1',
      dateDeCreation: new Date('2023-01-01'),
    },
  ];

  qrCodeDataUrl: string | null = null; //our image URL.
  // Automatically generate the QR code on load
  ngOnInit(): void {
    this.generateQRCode();
  }

  generateQRCode(): void {
    QRCode.toDataURL(this.patient.QR_code_base64, {
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
