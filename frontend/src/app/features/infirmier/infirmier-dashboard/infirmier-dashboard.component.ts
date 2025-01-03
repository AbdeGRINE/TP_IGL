import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiDataService } from '../../../services/api-data.service';
import { AuthService } from '../../../services/auth.service';

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
  id: string;
  nom: string;
  date: string;
  status: string;
  observation: string;
  dpi: string;
  infermier: string;
}

interface Ordonnance {
  titre: string;
  traitements: Traitement[];
}

interface Traitement {
  medicament: string;
  dose: string;
  duree: string;
}

@Component({
  selector: 'app-infirmier-dashboard',
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './infirmier-dashboard.component.html',
  styleUrl: './infirmier-dashboard.component.css',
})
export class InfirmierDashboardComponent {
  constructor(
    private apiDataService: ApiDataService,
    private authService: AuthService
  ) {}
  patients: Patient[] | null = null;
  // Fetching Patients from the backend once the pages is loaded:
  ngOnInit() {
    this.apiDataService.getAll<Patient[]>('dpi/listerall/').subscribe({
      next: (data) => (this.patients = data),
      error: (err) => console.error('Error fetching users:', err),
    });
  }
  //------------------------------------------------------------------
  // Soin and Ordonnace modals logic:
  //Initialization:
  selectedPatient: Patient | null = null;
  soinsModalVisible = false;
  newSoin: Soin = {
    id: '',
    nom: '',
    date: '',
    status: '',
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
    //fetch ordonnance from backend too:
    //still not done!
    this.soinsModalVisible = true;
  }

  closeSoinsModal() {
    this.soinsModalVisible = false;
    this.selectedPatient = null;
  }


  openOrdonnanceModal(ordonnance: Ordonnance) {
    this.selectedOrdonnance = ordonnance;
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
      this.newSoins.push({ ...this.newSoin }); //to put just the new one.
      this.selectedPatient.soins.push({ ...this.newSoin }); //for the list
      this.newSoin = {
        id: '',
        nom: '',
        date: '',
        status: '',
        observation: '',
        dpi: '',
        infermier: '',
      }; // Reset input fields to null.
    } else {
      alert("Veuillez remplir tous les champs avant d'ajouter un soin.");
    }
  }

  handleSaveSoins() {
    this.apiDataService
      .put(`Soin/creer/`, this.newSoins, `${this.authService.getToken()}`)
      .subscribe({
        next: (response) => {
          alert('Les soins du patient ont été enregistrées avec succès!');
          this.closeSoinsModal();
          console.log(response);
        },
        error: (err) => {
          alert('Impossible d"enregistrer le patient. Veuillez réessayer.');
          console.error(err);
        },
      });
  }
}
