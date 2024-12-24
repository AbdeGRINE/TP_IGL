import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../../services/navigation.service';

interface Consultation {
  id: string;
  dateDeCreation: Date;
}

@Component({
  selector: 'app-afficher-dpi',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './afficher-dpi.component.html',
  styleUrl: './afficher-dpi.component.css'
})
export class AfficherDpiComponent {
    Consultations : Consultation[] = [
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
    ]

    downloadImage() {
      const image = document.getElementById('qrCodeImage') as HTMLImageElement;
        const link = document.createElement('a');
      link.href = image.src;  
      link.download = 'qr_code.png';  
      link.click();
    }
}
