import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { NavigationService } from '../../../services/navigation.service';
import { FormsModule } from '@angular/forms';
import { ApiDataService } from '../../../services/api-data.service';
import { Router, RouterModule,NavigationEnd, ActivatedRoute } from '@angular/router';
import { DPI } from '../../../models/interfaces/consultation';

@Component({
  selector: 'app-creer-dpi',
  imports: [HeaderComponent, FormsModule, RouterModule],
  templateUrl: './creer-dpi-medecin.component.html',
  styleUrl: './creer-dpi-medecin.component.css',
})

export class CreerDPIMedecinComponent implements OnInit{
  patient: DPI = {
    id: '',
    nom: '',
    prenom: '',
    NSS: '',
    adresse: '',
    telephone: '',
    mutuelle: '',
    medecin: '',
    personneAContacter: '',
    dateNaissance: new Date(),
    dateDeCreation:  new Date(),
    consultations: [],
    soins: [],
    decodeBase64 : '',
  };
  
  constructor(
    private apiDataService: ApiDataService,
    private route : Router,
    private router: ActivatedRoute, 
    
  ) {}
  ngOnInit(): void {

  }

  navigateToMedecinDashboard() {
    this.route.navigate(['/medecin-dashboard']);
  }

  inputValidation(): boolean {
    if (
      !this.patient.nom ||
      !this.patient.prenom ||
      !this.patient.NSS ||
      !this.patient.adresse ||
      !this.patient.telephone ||
      !this.patient.mutuelle ||
      !this.patient.medecin ||
      !this.patient.personneAContacter
    ) {
      alert('Veuillez remplir tous les champs obligatoires!');
      return false;
    }
    //`/^[a-zA-Z\s]+$/ is a regular expression.
    if (!/^[a-zA-Z\s]+$/.test(this.patient.nom)) {
      alert('Nom ne doit pas contenir de chiffres.');
      return false;
    }
    if (!/^[a-zA-Z\s]+$/.test(this.patient.prenom)) {
      alert('Prenom ne doit pas contenir de chiffres.');
      return false;
    }
    if (!/^\d+$/.test(this.patient.NSS)) {
      alert('NSS doit être un nombre.');
      return false;
    }

    if (
      !/^\d+$/.test(this.patient.telephone) ||
      !/^\d{10}$/.test(this.patient.telephone) ||
      !this.patient.telephone.startsWith('0')
    ) {
      alert(
        'Numéro de téléphone doit être un nombre! Comporter 10 chiffres et commencer par 0.'
      );
      return false;
    }
    if (!/^[a-zA-Z\s]+$/.test(this.patient.medecin)) {
      alert('Medecin traitant ne doit pas contenir de chiffres.');
      return false;
    }
    if (!/^[a-zA-Z\s]+$/.test(this.patient.personneAContacter)) {
      alert('Personne à contacter ne doit pas contenir de chiffres.');
      return false;
    }
    return true;
  }

  handleSaveDPI() {
    if (this.inputValidation()) {
      this.apiDataService.post('DPIs', this.patient).subscribe({
        next: (response) => {
          alert('Patient saved successfully!');
          console.log(response);
          this.route.navigate(['/medecin-dashboard']);
        },
        error: (err) => {
          alert('Failed to save patient. Please try again.');
          console.error(err);
        },
      });
    }
    this.navigateToMedecinDashboard();
  }

}