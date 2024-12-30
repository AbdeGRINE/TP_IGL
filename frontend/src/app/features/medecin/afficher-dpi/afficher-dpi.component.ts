import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule,NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../../services/navigation.service';
import { DPI, Traitement, Ordonnance, Consultation, Bilan } from '../../../models/interfaces/consultation';
import { DpiService } from '../../../services/dpi.service';
import { ConsultationService } from '../../../services/consultation.service';


@Component({
  selector: 'app-afficher-dpi',
  imports: [CommonModule, HeaderComponent,RouterModule],
  templateUrl: './afficher-dpi.component.html',
  styleUrl: './afficher-dpi.component.css'
})
export class AfficherDpiComponent implements OnInit{

    patient: DPI | null = null;

    showParentUI: boolean = true;


    constructor(private route : Router,private router: ActivatedRoute, private dpiService: DpiService, private consultationService : ConsultationService){}

    downloadImage() {
      const image = document.getElementById('qrCodeImage') as HTMLImageElement;
      const link = document.createElement('a');
      link.href = image.src;  
      link.download = 'qr_code.png';  
      link.click();
    }

    ngOnInit() {
      this.patient = this.dpiService.getDPI();
      if (this.patient) {
        // You can now use the DPI object in your template
        console.log('DPI object:', this.patient);
      } else {
        // If DPI is not found (e.g., user navigated directly), handle accordingly
        console.log('No DPI object found.');
    }
    this.route.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
            // Check the current URL to determine if the child route is active
            const currentRoute = this.route.url;
            this.showParentUI = !currentRoute.includes('afficher-consultation');
          }
        });
  }
  navigateToViewConsultation(consultation : Consultation){
    this.consultationService.setConsultation(consultation);
    this.route.navigate(['afficher-consultation', consultation.id], { relativeTo: this.router });
}

  goBack(){
    this.route.navigate(['../..',], { relativeTo: this.router });
  }
}