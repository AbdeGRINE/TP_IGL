import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';

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
}
