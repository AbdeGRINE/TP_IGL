import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiDataService } from '../../../services/api-data.service';
import { AuthService } from '../../../services/auth.service';
import { AuthResponse } from '../../../models/interfaces/interfaces';

//This Patient can be named DPI:
export interface Patient {
  id: number;
  patient_nom: string;
  patient_prenom: string;
  medecin_traitant: MedecinTraitant;
  etablissement_courant: EtablissementCourant;
  date_creation: string;
  ordonnances: Ordonnance[];
  soins: Soin[];
}

export interface MedecinTraitant {
  id: number;
  nom: string;
  prenom: string;
  specialite: string;
}

export interface EtablissementCourant {
  id: number;
  nom: string;
  adresse: string;
}

interface Soin {
  nom: string;
  date: string;
  status: string;
  observation: string;
  dpi: string;
  infermier: string;
}

interface Ordonnance {
  id: string;
  date: string;
  traitement_set: Traitement[];
}

interface Traitement {
  medicament: Medicament;
  duree: string;
  dosage: string;
}

interface Medicament {
  nom: string;
}

@Component({
  selector: 'app-infirmier-dashboard',
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './infirmier-dashboard.component.html',
  styleUrl: './infirmier-dashboard.component.css',
})
export class InfirmierDashboardComponent {
  authResponse: AuthResponse;
  constructor(
    private apiDataService: ApiDataService,
    private authService: AuthService
  ) {
    this.authResponse = this.authService.getAuthResponse();
  }
  patients: Patient[] | null = null;
  // Fetching Patients from the backend once the pages is loaded:
  ngOnInit() {
    this.apiDataService.getAll<Patient[]>('dpi/listerall/').subscribe({
      next: (data) => {
        this.patients = data;
      console.log("HELLO: ", this.patients);
      },
      error: (err) => console.error('Error fetching users:', err),
    });
  }
  //------------------------------------------------------------------
  // Soin and Ordonnace modals logic:
  //Initialization:
  selectedPatient: Patient | null = null;
  soinsModalVisible = false;
  newSoin: Soin = {
    nom: '',
    date: `${this.formatDate(new Date())}`,
    status: 'Programmé',
    observation: '',
    dpi: '',
    infermier: ``,
  };
  newSoins: Soin[] = [];
  selectedOrdonnance: Ordonnance | null = null;
  ordonnanceModalVisible = false;

  //Methodes:
  openSoinsModal(patient: Patient) {
    this.selectedPatient = patient;
    //fetch Soins from the backend:
    this.apiDataService
      .get<Soin[]>(
        `Soin/dpi/${this.selectedPatient?.id}/`,
        `${this.authService.getToken()}`
      )
      .subscribe({
        next: (data) => {
          if (this.selectedPatient) {
            this.selectedPatient.soins = data; // Assign only if selectedPatient is not null
          }
        },
        error: (err) => console.error('Error fetching soins:', err),
      });

    //fetch ordonnances from backend too:
    this.apiDataService
      .get<Ordonnance[]>(
        `Ordonnance/dpi/${this.selectedPatient?.id}/`,
        `${this.authService.getToken()}`
      )
      .subscribe({
        next: (data) => {
          if (this.selectedPatient) {
            this.selectedPatient.ordonnances = data; // Assign only if selectedPatient is not null
          }
        },
        error: (err) => console.error('Error fetching soins:', err),
      });
    this.soinsModalVisible = true;
  }

  closeSoinsModal() {
    this.newSoins = []; //reset
    this.soinsModalVisible = false;
    this.selectedPatient = null;
  }

  openOrdonnanceModal(ordonnance: Ordonnance) {
    this.selectedOrdonnance = ordonnance;
    //get the specific ordonnace:
    this.apiDataService
      .get<Ordonnance>(
        `Ordonnance/${this.selectedOrdonnance?.id}/`,
        `${this.authService.getToken()}`
      )
      .subscribe({
        next: (data) => {
          if (this.selectedOrdonnance) {
            this.selectedOrdonnance = data;
          }
        },
        error: (err) => console.error('Error fetching soins:', err),
      });
    this.ordonnanceModalVisible = true;
  }

  closeOrdonnanceModal() {
    this.ordonnanceModalVisible = false;
    this.selectedOrdonnance = null;
  }

  addNewSoin() {
    if (this.selectedPatient && this.newSoin.nom && this.newSoin.observation) {
      //when pushing to selectedPatient, we push also into to the patient.
      //because the two variables refrences the same object.
      //this.selectedPatient = patient is an assignement by reference.

      //to put just the new one.
      this.newSoins.push({
        ...this.newSoin,
        dpi: `${this.selectedPatient.id}`,
        infermier: `${this.authResponse.user.type.id}`,
      });
      //for the front list:
      if (!this.selectedPatient.soins) {
        this.selectedPatient.soins = [];
      }
      this.selectedPatient.soins.push({
        ...this.newSoin,
        dpi: `${this.selectedPatient.id}`,
        infermier: `${this.authResponse.user.type.id}`,
      });
      // Reset input fields:
      this.newSoin = {
        nom: '',
        date: `${this.formatDate(new Date())}`,
        status: 'Programmé',
        observation: '',
        dpi: `${this.selectedPatient.id}`,
        infermier: `${this.authResponse.user.id}`,
      };
    } else {
      alert("Veuillez remplir tous les champs avant d'ajouter un soin.");
    }
  }

  handleSaveSoins() {
    this.apiDataService
      .post(`Soin/creer/`, this.newSoins, `${this.authService.getToken()}`)
      .subscribe({
        next: (response) => {
          alert('Les soins du patient ont été enregistrées avec succès!');
          this.closeSoinsModal();
        },
        error: (err) => {
          alert('Impossible d"enregistrer le patient. Veuillez réessayer.');
          console.error(err);
        },
      });
    this.newSoins = []; //reset
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
}
