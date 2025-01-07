import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { NavigationService } from '../../../services/navigation.service';
import { FormsModule } from '@angular/forms';
import { ApiDataService } from '../../../services/api-data.service';
import { AuthService } from '../../../services/auth.service';
import { AuthResponse } from '../../../models/interfaces/interfaces';


export interface Patient {
  nom: string;
  prenom: string;
  date_naissance: string;
  adresse: string;
  //   n_tlph: string;
  nss: string;
  mutuelle: string;
  medecin_traitant: string;
  personne_a_contacter: PersonneAContacter;
}

export interface PersonneAContacter {
  nom: string;
  prenom: string;
}

@Component({
  selector: 'app-creer-dpi',
  imports: [HeaderComponent, FormsModule],
  templateUrl: './creer-dpi.component.html',
  styleUrl: './creer-dpi.component.css',
})
export class CreerDPIComponent {
  patient: Patient = {
    nom: '',
    prenom: '',
    date_naissance: '',
    adresse: '',
    nss: '',
    mutuelle: '',
    medecin_traitant: '',
    personne_a_contacter: {
      nom: '',
      prenom: '#',
    },
  };
  authResponse: AuthResponse;
  constructor(
    private navigationService: NavigationService,
    private apiDataService: ApiDataService,
    private authService: AuthService
  ) {
    this.authResponse = this.authService.getAuthResponse();
  }

  navigateToAdminDashboard() {
    this.navigationService.navigateTo('/admin-dashboard');
  }

  inputValidation(): boolean {
    if (
      !this.patient.nom ||
      !this.patient.prenom ||
      !this.patient.nss ||
      !this.patient.adresse ||
      !this.patient.date_naissance ||
      !this.patient.mutuelle ||
      !this.patient.medecin_traitant ||
      !this.patient.personne_a_contacter.nom
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
    // if (
    //   !/^\d+$/.test(this.patient.n_tlph) ||
    //   !/^\d{10}$/.test(this.patient.n_tlph) ||
    //   !this.patient.n_tlph.startsWith('0')
    // ) {
    //   alert(
    //     'Numéro de téléphone doit être un nombre! Comporter 10 chiffres et commencer par 0.'
    //   );
    //   return false;
    // }

    if (!/^[a-zA-Z\s]+$/.test(this.patient.medecin_traitant)) {
      alert('Medecin traitant ne doit pas contenir de chiffres.');
      return false;
    }
    if (!/^[a-zA-Z\s]+$/.test(this.patient.personne_a_contacter.nom)) {
      alert('Personne à contacter ne doit pas contenir de chiffres.');
      return false;
    }
    return true;
  }

  handleSaveDPI() {
    if (this.inputValidation()) {
      //format the date of birth:
      this.formatDate(this.patient.date_naissance);
      console.log("PATIENT: ", this.patient); 
      this.apiDataService
        .post('dpi/creer/', this.patient, `${this.authService.getToken()}`)
        .subscribe({
          next: (response) => {
            alert('Le DPI a été créé avec succès !');
            console.log(response);
            this.navigationService.navigateTo('/admin-dashboard');
          },
          error: (err) => {
            alert('Impossible d"enregistrer le DPI. Veuillez réessayer.');
            console.error(err);
          },
        });
    }
  }

  formatDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  }
}
