import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../../services/navigation.service';
import { DPI, Traitement, Ordonnance, Consultation, Bilan } from '../../../models/interfaces/consultation';


@Component({
  selector: 'app-afficher-dpi',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './afficher-dpi.component.html',
  styleUrl: './afficher-dpi.component.css'
})
export class AfficherDpiComponent {

    patient: DPI = 
        {
          id: 'P12345',
          nom: 'Benziada',
          medecin: 'Grine',
          prenom : 'Fares',
          NSS : 123456,
          dateNaissance :new Date("01-01-2004"),
          adresse : "Reghaia",
          telephone : "0666666666",
          mutuelle: "/",
          personneAContacter :"/",
          dateDeCreation: new Date('2023-01-01'),
          consultations: [
            {
              id : 1,
              ordonnances : [],
              dateDeCreation: new Date('2023-01-01'),
              resume: "Resume de la consultation",
              bilansBiologique: [],
              bilanRadiologique: [],
            },
          ],
          soins: [
          ],
        };



    downloadImage() {
      const image = document.getElementById('qrCodeImage') as HTMLImageElement;
        const link = document.createElement('a');
      link.href = image.src;  
      link.download = 'qr_code.png';  
      link.click();
    }
}
