import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { NavigationService } from '../../../services/navigation.service';
import { FormBuilder, FormGroup, FormArray, FormControl , ReactiveFormsModule, FormsModule} from '@angular/forms';
import { DPI, Traitement, Ordonnance, Consultation, Bilan } from '../../../models/interfaces/consultation';
import { ConsultationService } from '../../../services/consultation.service';



@Component({
  selector: 'app-creer-consultation',
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './afficher-consultation.component.html',
  styleUrl: './afficher-consultation.component.css'
})
export class AfficherConsultationComponent implements OnInit {
  ResultatBilan1 = {
    glycemie: 0,
    cholestrol: 0,
  }

  selectedConsultation :Consultation | null = null ;

  selectedOrdonnance: Ordonnance | null = null;
  selectedBilanBiologique: Bilan | null = null;
  selectedBilanRadiologique: Bilan | null = null ;

  constructor(private router: Router, private route: ActivatedRoute,private consultationService : ConsultationService){
    this.selectedOrdonnance = null;
    
  }

  ngOnInit() {
    this.selectedConsultation = this.consultationService.getConsultation();
    if (this.selectedConsultation) {
      // You can now use the DPI object in your template
      console.log('Consultatio object:', this.selectedConsultation);
    } else {
      // If DPI is not found (e.g., user navigated directly), handle accordingly
      console.log('No Consultatio object found.');
  }
  }


  trait : Traitement = {
    medicament : 'doliprane',
    dose : '2000mg',
    duree: '2 jours',
  }

  isViewOrdonnanceOpen = false;
  isPopupOpen = false;
  isViewBilanBioOpen = false;
  isViewBilanRadioOpen = false;


  openViewOrdonnance(ordonnance: Ordonnance) {
    this.selectedOrdonnance = ordonnance;
    this.isViewOrdonnanceOpen = true;
    this.isPopupOpen = true;
    console.log(this.selectedOrdonnance);
  }

  closeViewOrdonnance() {
    this.isViewOrdonnanceOpen = false;
    this.isPopupOpen = false;
  }

  openViewBilanBio(bilan: Bilan){
    this.isViewBilanBioOpen = true;
    this.isPopupOpen = true;
    this.selectedBilanBiologique = bilan;
  }
  
  closeViewBilanBio(){
    this.isViewBilanBioOpen = false;
    this.isPopupOpen = false;
  }
  
  openViewBilanRadio(bilan: Bilan){
    this.isViewBilanRadioOpen = true;
    this.isPopupOpen = true;
    this.selectedBilanRadiologique = bilan;
  }
  
  closeViewBilanRadio(){
    this.isViewBilanRadioOpen = false;
    this.isPopupOpen = false;
  }


  goBack(){
    this.router.navigate(['../..'], { relativeTo: this.route });
  }


}
