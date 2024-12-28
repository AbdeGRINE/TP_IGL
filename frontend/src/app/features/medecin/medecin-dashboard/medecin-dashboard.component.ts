import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';
import { FormsModule } from '@angular/forms';
import jsQR from 'jsqr';

interface DPI {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  dateDeCreation: Date;
  decodeBase64: string;
  nss: string;
}
@Component({
  selector: 'app-medecin-dashboard',
  imports: [CommonModule, HeaderComponent, FormsModule],
  templateUrl: './medecin-dashboard.component.html',
  styleUrl: './medecin-dashboard.component.css',
})
export class MedecinDashboardComponent {
  DPIs: DPI[] = [
    {
      id: 'P12345',
      nom: 'John Doe',
      email: 'john.doe@example.com',
      telephone: '+1234567890',
      dateDeCreation: new Date('2023-01-01'),
      decodeBase64: 'SGVsbG8sIFdvcmxkIQ==',
      nss: '123',
    },
    {
      id: 'P12345',
      nom: 'John Doe',
      email: 'john.doe@example.com',
      telephone: '+1234567890',
      dateDeCreation: new Date('2023-01-01'),
      decodeBase64: 'vcmxkIQ==',
      nss: '12345',
    },
    {
      id: 'P12345',
      nom: 'John Doe',
      email: 'john.doe@example.com',
      telephone: '+1234567890',
      dateDeCreation: new Date('2023-01-01'),
      decodeBase64: 'SGVsbG==',
      nss: '44',
    },
    {
      id: 'P12345',
      nom: 'John Doe',
      email: 'john.doe@example.com',
      telephone: '+1234567890',
      dateDeCreation: new Date('2023-01-01'),
      decodeBase64: 'SGVsbG==',
      nss: '44',
    },
    {
      id: 'P12345',
      nom: 'John Doe',
      email: 'john.doe@example.com',
      telephone: '+1234567890',
      dateDeCreation: new Date('2023-01-01'),
      decodeBase64: 'SGVsbG==',
      nss: '44',
    },
  ];

  // ---------------------------------------------- SEARCH Logic:
  // In any reload of the page: DPIsList will be DPIs.
  DPIsList: DPI[] = [...this.DPIs]; //copy the DPIs array to DPIsList:
  matchedDPI: null | DPI = {
    id: '',
    nom: '',
    email: '',
    telephone: '',
    dateDeCreation: new Date(),
    decodeBase64: '',
    nss: '',
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
        this.DPIs.find((DPI) => DPI.nss === this.searchedNSS) || null;
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
