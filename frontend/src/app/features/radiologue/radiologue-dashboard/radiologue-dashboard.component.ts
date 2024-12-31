import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { Bilan } from '../../../models/interfaces/consultation';

interface DemandeBilan {
  id: number,
  nom : string,
  medecin : string,
  date : string,
}

@Component({
  selector: 'app-radiologue-dashboard',
  imports: [HeaderComponent, CommonModule],
  templateUrl: './radiologue-dashboard.component.html',
  styleUrl: './radiologue-dashboard.component.css'
})
export class RadiologueDashboardComponent {
  selectedBilan : Bilan | null  = null;
  isViewBilanRadioOpen : Boolean;
  Demandes : DemandeBilan[] = [{
    id: 1,
    nom: 'test',
    medecin: 'test',
    date: 'test',
  },
  {
    id: 1,
    nom: 'test',
    medecin: 'test',
    date: 'test',
  },
  {
    id: 1,
    nom: 'test',
    medecin: 'test',
    date: 'test',
  },
]

constructor(){
  this.isViewBilanRadioOpen = false;
}

openViewBilanRadio(bilan: Bilan){
  this.isViewBilanRadioOpen = true;
  this.selectedBilan = bilan;
}

closeViewBilanRadio(){
  this.isViewBilanRadioOpen = false;
}
}
