import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../../services/navigation.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';


interface Ordonnance  {
  nom: string,
  state: string,
}


@Component({
  selector: 'app-creer-consultation',
  imports: [HeaderComponent, CommonModule],
  templateUrl: './creer-consultation.component.html',
  styleUrl: './creer-consultation.component.css'
})
export class CreerConsultationComponent {
  Ordonnances : Ordonnance[] = [
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



}
