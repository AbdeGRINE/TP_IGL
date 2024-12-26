import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';


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

interface ResulatsBilan {
  glycemie : number,
  cholestrol : number,
}


@Component({
  selector: 'app-afficher-consultation',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './afficher-consultation.component.html',
  styleUrl: './afficher-consultation.component.css'
})
export class AfficherConsultationComponent {
  date = new Date().toISOString().split('T')[0];
  ResultatBilan1 = {
    "glycemie": 0,
    "cholestrol": 0,
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

Resume = "Blablabalblabla"


  isViewOrdonnanceOpen = false;
  isPopupOpen = false;
  isViewBilanBioOpen = false;
  isViewBilanRadioOpen = false;

openViewOrdonnance() {
  this.isViewOrdonnanceOpen = true;
  this.isPopupOpen = true;
}

closeViewOrdonnance() {
  this.isViewOrdonnanceOpen = false;
  this.isPopupOpen = false;
}

openViewBilanBio(){
  this.isViewBilanBioOpen = true;
  this.isPopupOpen = true;
}

closeViewBilanBio(){
  this.isViewBilanBioOpen = false;
  this.isPopupOpen = false;
}

openViewBilanRadio(){
  this.isViewBilanRadioOpen = true;
  this.isPopupOpen = true;
}

closeViewBilanRadio(){
  this.isViewBilanRadioOpen = false;
  this.isPopupOpen = false;
}

}
