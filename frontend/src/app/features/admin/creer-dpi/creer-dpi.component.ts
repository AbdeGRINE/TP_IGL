import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { NavigationService } from '../../../services/navigation.service';
import { FormsModule } from '@angular/forms';
import { ApiDataService } from '../../../services/api-data.service';

interface Patient {
  nom: string;
  prenom: string;
  nss: string;
  adresse: string;
  n_tlph: string;
  mutuelle: string;
  medecin: string;
  personne: string;
}

@Component({
  selector: 'app-creer-dpi',
  imports: [HeaderComponent, FormsModule],
  templateUrl: './creer-dpi.component.html',
  styleUrl: './creer-dpi.component.css',
})
<<<<<<< HEAD
=======

>>>>>>> 3ed76e4b46a5a8fc5f773acece4b2d1ddf8792e9
export class CreerDPIComponent {
  patient: Patient = {
    nom: '',
    prenom: '',
    nss: '',
    adresse: '',
    n_tlph: '',
    mutuelle: '',
    medecin: '',
    personne: '',
  };
<<<<<<< HEAD

=======
  
>>>>>>> 3ed76e4b46a5a8fc5f773acece4b2d1ddf8792e9
  constructor(
    private navigationService: NavigationService,
    private apiDataService: ApiDataService
  ) {}

  navigateToAdminDashboard() {
<<<<<<< HEAD
    this.navigationService.navigateTo('/login');
=======
    this.navigationService.navigateTo('/admin-dashboard');
>>>>>>> 3ed76e4b46a5a8fc5f773acece4b2d1ddf8792e9
  }

  inputValidation(): boolean {
    if (
      !this.patient.nom ||
      !this.patient.prenom ||
      !this.patient.nss ||
      !this.patient.adresse ||
      !this.patient.n_tlph ||
      !this.patient.mutuelle ||
      !this.patient.medecin ||
      !this.patient.personne
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
    if (!/^\d+$/.test(this.patient.nss)) {
      alert('NSS doit être un nombre.');
      return false;
    }

    if (
      !/^\d+$/.test(this.patient.n_tlph) ||
      !/^\d{10}$/.test(this.patient.n_tlph) ||
      !this.patient.n_tlph.startsWith('0')
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
    if (!/^[a-zA-Z\s]+$/.test(this.patient.personne)) {
      alert('Personne à contacter ne doit pas contenir de chiffres.');
      return false;
    }
    return true;
  }

  handleSaveDPI() {
<<<<<<< HEAD
    //subscibe methode handle the success or error.
=======
>>>>>>> 3ed76e4b46a5a8fc5f773acece4b2d1ddf8792e9
    if (this.inputValidation()) {
      this.apiDataService.post('DPIs', this.patient).subscribe({
        next: (response) => {
          alert('Patient saved successfully!');
          console.log(response);
          this.navigationService.navigateTo('/admin-dashboard');
        },
        error: (err) => {
          alert('Failed to save patient. Please try again.');
          console.error(err);
        },
      });
    }
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 3ed76e4b46a5a8fc5f773acece4b2d1ddf8792e9
