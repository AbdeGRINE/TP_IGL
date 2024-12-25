import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../../services/navigation.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';


interface OrdonnanceGlobale  {
  nom: string,
  state: string,
}

interface Ordonnance  {
  medicament: string,
  dose: string,
  duree: string,
}

@Component({
  selector: 'app-creer-consultation',
  imports: [HeaderComponent, CommonModule],
  templateUrl: './creer-consultation.component.html',
  styleUrl: './creer-consultation.component.css'
})
export class CreerConsultationComponent {
  Ordonnances : OrdonnanceGlobale[] = [
    {
      nom: 'Ordonnance 1',
      state: 'En attente',
    },
    {
      nom: 'Ordonnance 1',
      state: 'En attente',
    },
  {
    nom: 'Ordonnance 1',
    state: 'En attente',
  },
]

  Ordonnance : Ordonnance = {
    medicament : 'doliprane',
    dose : '2000mg',
    duree: '2 jours',
  }

  isAddOrdonnanceOpen = false;
  isViewOrdonnanceOpen = false;
  wantsToDelete = false;
  isPopupOpen = false;

  openAddOrdonnance() {
    this.isAddOrdonnanceOpen = true;
    this.isPopupOpen = true;
  }

  closeAddOrdonnance() {
    this.isAddOrdonnanceOpen = false;
    this.isPopupOpen = false;
  }

  AnnulerOrdonnance(){
    this.isAddOrdonnanceOpen = false;
    this.isPopupOpen = false;
  }

  EnregistrerOrdonnaces(){
    this.isAddOrdonnanceOpen = false;
    this.isPopupOpen = false;
  }

  AjouterOrdonnance(){

  }

  openViewOrdonnance() {
    this.isViewOrdonnanceOpen = true;
    this.isPopupOpen = true;
  }

  closeViewOrdonnance() {
    this.isViewOrdonnanceOpen = false;
    this.isPopupOpen = false;
  }


  openWantsToDelete() {
    this.wantsToDelete = true;
    this.isPopupOpen = true;
  }

  closeWantsToDelete() {
    this.wantsToDelete = false;
    this.isPopupOpen = false;
  }
 
  deleteOrdonnace() {
    this.wantsToDelete = false;
    this.isPopupOpen = false;
  }

}
