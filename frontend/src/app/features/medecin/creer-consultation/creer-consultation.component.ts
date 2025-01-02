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

  selectedPatient: DPI;

  indexOfOrdonnanceToDelete : number = -1;

  OrdonnanceToDelete : Ordonnance | null = null;

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
      alert("Veuillez remplir tous les champs avant d'ajouter une ordonnance.");
    }
    this.isAddOrdonnanceOpen = false;
    this.isPopupOpen = false;
    console.log(this.isPopupOpen);
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


  bilansBiologique: Bilan[] = [
  //   {
  //   id: '1',
  //   nom: "bilan 1",
  // },{
  //   id: '2',
  //   nom : "bilan 2",
  // },{
  //   id: '3',
  //   nom : "bilan 3",
  // }
]

bilansRadio = [
//   {
//   id: '1',
//   nom : "bilan 1",
// },{
//   id: '2',
//   nom : "bilan 2",
// },{
//   id: '3',
//   nom : "bilan 3",
// }
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
    this.newConsultation && this.newConsultation.resume
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
    this.goBack();

  } else {
    alert("Veuillez remplir le resume d'ajouter une consultation.");
  }
  console.log(this.selectedPatient);
  this.dpiService.setDPI(this.selectedPatient);
}


goBack(){
  this.router.navigate(['../',], { relativeTo: this.route });
}

deleteOrdonnance(){
  console.log(this.newConsultation);
  this.newConsultation.ordonnances = this.newConsultation?.ordonnances.filter(c => c.titre !== this.OrdonnanceToDelete?.titre);
  this.indexOfOrdonnanceToDelete = -1;
  this.wantsToDelete = false;
  this.isPopupOpen = false;
}

OpenDeletionPopup(index : number){
  this.wantsToDelete = true;
  this.isPopupOpen = true;
  console.log(index);
  this.indexOfOrdonnanceToDelete = index;
  this.OrdonnanceToDelete = this.newConsultation.ordonnances[this.indexOfOrdonnanceToDelete];
  console.log(this.OrdonnanceToDelete);
}
closeDeletionPopup(){
  console.log(this.newConsultation)
  this.indexOfOrdonnanceToDelete = -1;
  this.isPopupOpen = false;
  this.wantsToDelete = false;
}
}
