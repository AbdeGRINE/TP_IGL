import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { NavigationService } from '../../../services/navigation.service';
import { FormBuilder, FormGroup, FormArray, FormControl , ReactiveFormsModule, FormsModule} from '@angular/forms';
import { DPI, Traitement, Ordonnance, Consultation, Bilan } from '../../../models/interfaces/consultation';




@Component({
  selector: 'app-creer-consultation',
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './afficher-consultation.component.html',
  styleUrl: './afficher-consultation.component.css'
})
export class AfficherConsultationComponent {
  ResultatBilan1 = {
    glycemie: 0,
    cholestrol: 0,
  }

  selectedConsultation :Consultation = {id : 1,
    dateDeCreation : new Date('2023-01-01'),
    resume : 'doit etre hospitalise',
    bilanRadiologique : [{
      id : "1",
      nom : "Bilan 1",
    }],
    bilansBiologique : [{
      id : "1",
      nom : "Bilan 1",
    }],
    ordonnances : [
      {
        titre: 'Ordonnance 1',
        state: 'En attente',
        traitements : [{
          medicament : 'doliprane',
          dose : '2000mg',
          duree: '2 jours',
        }]
      },
  ]
  }

  patient: DPI = 
    {
      id: 'P12345',
      nom: 'Benziada',
      prenom : 'Fares',
      NSS : 123456,
      dateNaissance :new Date("01-01-2004"),
      adresse : "Reghaia",
      telephone : "0666666666",
      mutuelle: "/",
      personneAContacter :"/",
      medecin: 'Grine',
      dateDeCreation: new Date('2023-01-01'),
      consultations: [{
        id : 1,
        dateDeCreation : new Date('2023-01-01'),
        resume : 'doit etre hospitalise',
        bilanRadiologique : [{
          id : "1",
          nom : "Bilan 1",
        }],
        bilansBiologique : [{
          id : "1",
          nom : "Bilan 1",
        }],
        ordonnances : [
          {
            titre: 'Ordonnance 1',
            state: 'En attente',
            traitements : [{
              medicament : 'doliprane',
              dose : '2000mg',
              duree: '2 jours',
            }]
          },
      ]}
      ],
      soins: [
      ],
    };

  selectedPatient: DPI;

  selectedOrdonnance: Ordonnance | null = null;

  selectedBilanBiologique: Bilan | null = null;
  selectedBilanRadiologique: Bilan | null = null ;

  constructor(){
    this.selectedPatient = this.patient;
    this.selectedOrdonnance = null;
    console.log(this.selectedPatient);
    
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


}
