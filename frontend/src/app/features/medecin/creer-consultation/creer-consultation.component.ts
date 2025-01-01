import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { DPI, Traitement, Ordonnance, Consultation, Bilan } from '../../../models/interfaces/interfaces';
import { DpiService } from '../../../services/dpi.service';
import { Router, RouterModule,ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-creer-consultation',
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule, FormsModule,RouterModule],
  templateUrl: './creer-consultation.component.html',
  styleUrl: './creer-consultation.component.css'
})
export class CreerConsultationComponent implements OnInit {

  //   {
  //     id: 'P12345',
  //     nom: 'Benziada',
  //     prenom: 'Fares',
  //     NSS: '123456',
  //     dateNaissance: new Date("01-01-2004"),
  //     adresse: "Reghaia",
  //     telephone: "0666666666",
  //     mutuelle: "/",
  //     personneAContacter: "/",
  //     medecin: 'Grine',
  //     dateDeCreation: new Date('2023-01-01'),
  //     consultations: [],
  //     soins: [],
  //     decodeBase64: '',
  //   };

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
  selectedBilanBiologique: Bilan[] = [];
  selectedBilanRadiologique: Bilan[] = [];

  constructor(private dpiService : DpiService, private router : Router, private route : ActivatedRoute){
    this.selectedPatient = this.dpiService.getDPI();
    this.selectedOrdonnance = null;
    this.newConsultation.id =  this.selectedPatient.consultations.length + 1,
    console.log(this.selectedPatient);
  }
  ngOnInit(): void {
    this.selectedOrdonnance = null;
    console.log(this.selectedPatient);
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
      this.newConsultation.ordonnances.push({ ...this.newOrdonnace });
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
    alert("La nouvelle Consultation a etait creer avec succes!");


  } else {
    alert("Veuillez remplir tous les champs avant d'ajouter une consultation.");
  }
  console.log(this.selectedPatient);
  this.dpiService.setDPI(this.selectedPatient);
}


goBack(){
  this.router.navigate(['../',], { relativeTo: this.route });
}
}
