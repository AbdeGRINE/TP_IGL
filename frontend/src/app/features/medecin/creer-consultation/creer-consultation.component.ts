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
  templateUrl: './creer-consultation.component.html',
  styleUrl: './creer-consultation.component.css'
})
export class CreerConsultationComponent implements OnInit {

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
      consultations: [
      ],
      soins: [
      ],
    };

  // Soin and Ordonnace modals logic:
  //Initialization:
  selectedPatient: DPI;

  newTraitement: Traitement = {
    medicament: '',
    dose: '',
    duree : '',
  };
  
  newOrdonnace : Ordonnance = {
    titre: 'Ordonnance 1',
    state : 'en attente',
    traitements: [],
  };

  newConsultation: Consultation = {
    id :0,
    dateDeCreation: new Date(),
    ordonnances: [],
    bilanRadiologique: [],
    bilansBiologique: [],
    resume : "",
  }

  selectedOrdonnance: Ordonnance | null = null;
  //private formBuilder = inject(FormBuilder);
  //Consultation ;
  

  selectedBilanBiologique: Bilan[] = [];
  selectedBilanRadiologique: Bilan[] = [];

  constructor(private fb:FormBuilder){
    this.selectedPatient = this.patient;
    this.selectedOrdonnance = null;
    this.newConsultation.id =  this.selectedPatient.consultations.length + 1,
    console.log(this.selectedPatient);
    // this.Consultation = this.fb.group({
    //   date: new Date().toISOString().split('T')[0],
    //   resume: '',
    //   bilansBiologique: this.fb.array([]),
    //   bilansRadiologique: this.fb.array([])
    // });
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
    this.selectedPatient = this.patient;
    this.selectedOrdonnance = null;
    console.log(this.selectedPatient);
    //this.bilansBiologique.forEach(() => this.control.push(new FormControl()))
  }


  Ordonnances : Ordonnance[] = [
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

  trait : Traitement = {
    medicament : 'doliprane',
    dose : '2000mg',
    duree: '2 jours',
  }

  isAddOrdonnanceOpen = false;
  isViewOrdonnanceOpen = false;
  wantsToDelete = false;
  isPopupOpen = false;

  openAddOrdonnance() {
    this.selectedOrdonnance = this.newOrdonnace;
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

  EnregistrerOrdonnace(){
    if (
      this.newOrdonnace?.traitements
    ) {
      //this.selectedPatient.consultations.
      this.newConsultation.ordonnances.push({ ...this.newOrdonnace });
      this.newConsultation.bilansBiologique = [...this.selectedBilanBiologique];
      this.newConsultation.bilanRadiologique = [...this.selectedBilanRadiologique];
      console.log(this.selectedPatient);
      this.newOrdonnace = {titre: `Ordonnance ${this.newConsultation.ordonnances.length + 1}`,
        state : 'en attente',
        traitements: [],}
    } else {
      console.log(this.selectedOrdonnance);
      alert("Veuillez remplir tous les champs avant d'ajouter un soin.");
    }
    this.isAddOrdonnanceOpen = false;
    this.isPopupOpen = false;
    console.log(this.isPopupOpen);
  }

  AjouterOrdonnance(){

  }

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


  openWantsToDelete(ordonnance : Ordonnance) {
    this.wantsToDelete = true;
    this.isPopupOpen = true;
  }

  closeWantsToDelete() {
    this.wantsToDelete = false;
    this.isPopupOpen = false;
  }
 
  deleteOrdonnace() {
    // logic to delete
  }


  bilansBiologique: Bilan[] = [{
    id: '1',
    nom: "bilan 1",
  },{
    id: '2',
    nom : "bilan 2",
  },{
    id: '3',
    nom : "bilan 3",
  }
]

bilansRadio = [{
  id: '1',
  nom : "bilan 1",
},{
  id: '2',
  nom : "bilan 2",
},{
  id: '3',
  nom : "bilan 3",
}
]

onCheckboxChangeBio(bilan: Bilan, event: any) {
  if (event.target.checked) {
     console.log(bilan)
    this.selectedBilanBiologique = [...this.selectedBilanBiologique, bilan];
  }
  else{
    this.selectedBilanBiologique = this.selectedBilanBiologique.filter(elt => elt !== bilan);
  }
  console.log(this.selectedBilanBiologique);
}


onCheckboxChangeRadio(bilan: Bilan, event: any) {
  if (event.target.checked) {
     console.log(bilan)
    this.selectedBilanRadiologique = [...this.selectedBilanRadiologique, bilan];
  }
  else{
    this.selectedBilanRadiologique = this.selectedBilanRadiologique.filter(elt => elt !== bilan);
  }
  console.log(this.selectedBilanRadiologique);
}


addNewTrait() {
  console.log(this.newTraitement);
  if (
    this.selectedOrdonnance &&
    this.newTraitement.medicament &&
    this.newTraitement.dose &&
    this.newTraitement.duree
  ) {
    if(typeof this.newTraitement.dose === 'number' && typeof this.newTraitement.duree === 'number' ){
      this.selectedOrdonnance.traitements.push({ ...this.newTraitement });
      this.newTraitement = { medicament: '', dose: '', duree: '' }; // Reset input fields
    }
    else{
      alert("La dose et la duree doivent etre des nombres !");
    }
  } else {
    alert("Veuillez remplir tous les champs avant d'ajouter un traitement.");
  }
}

onSubmit(){
  if (
    this.newConsultation
  ) {
    this.newConsultation.bilansBiologique = this.selectedBilanBiologique;
    this.newConsultation.bilanRadiologique = this.selectedBilanRadiologique;
    this.selectedPatient.consultations.push({ ...this.newConsultation });
    this.newConsultation = {
      id:  this.selectedPatient.consultations.length,
      bilanRadiologique : [],
      bilansBiologique : [],
      dateDeCreation: new Date,
      ordonnances : [],
      resume : "",
    }

  } else {
    alert("Veuillez remplir tous les champs avant d'ajouter une consultation.");
  }
  console.log(this.selectedPatient);

}

}
