import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../../services/navigation.service';
import { FormBuilder, FormGroup, FormArray, FormControl , ReactiveFormsModule, FormsModule} from '@angular/forms';


interface OrdonnanceGlobale  {
  nom: string,
  state: string,
}

interface Ordonnance  {
  medicament: string,
  dose: string,
  duree: string,
}

interface Bilan {
  id: string;
  nom: string;
  checked : boolean;
}

@Component({
  selector: 'app-creer-consultation',
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './creer-consultation.component.html',
  styleUrl: './creer-consultation.component.css'
})
export class CreerConsultationComponent implements OnInit {
  //private formBuilder = inject(FormBuilder);
  Consultation ;
  

  constructor(private fb:FormBuilder){
    this.Consultation = this.fb.group({
      date: new Date().toISOString().split('T')[0],
      resume: '',
      bilansBiologique: this.fb.array([]),
      bilansRadiologique: this.fb.array([])
    });
    // this.Consultation = new FormGroup('');
    // this.Consultation = this.formBuilder.group({
    //   date: [new Date().toISOString().split('T')[0]],
    //   bilanBiologique : this.formBuilder.group({
    //     bilan1 : '',
    //     bilan2 : '',
    //     bilan3 : '',
    //   }),
    //   bilanRadiologique : this.formBuilder.group({
    //     bilan1 : '',
    //     bilan2 : '',
    //     bilan3 : '',
    //   }),
    //   resume : ''
    // })
  }
  ngOnInit(): void {
    //this.bilansBiologique.forEach(() => this.control.push(new FormControl()))
  }


  onSubmit(){
    console.log(this.Consultation.value);
  }
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

  bilansBiologique = [{
    "id": 1,
    "nom" : "bilan 1",
    "checked" : false
  },{
    "id": 2,
    "nom" : "bilan 2",
    "checked" : false
  },{
    "id": 3,
    "nom" : "bilan 3",
    "checked" : false
  }
]

bilansRadio = [{
  "id": 1,
  "nom" : "bilan 1",
},{
  "id": 2,
  "nom" : "bilan 2",
},{
  "id": 3,
  "nom" : "bilan 3",
}
]

}
