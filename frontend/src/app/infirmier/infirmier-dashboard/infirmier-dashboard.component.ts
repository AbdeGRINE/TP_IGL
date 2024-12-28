import { Component } from '@angular/core';
import { HeaderComponent } from '../../features/shared/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
interface Patient {
  id: string;
  nom: string;
  medecin: string;
  dateDeCreation: Date;
  ordonnances: Ordonnance[];
  soins: Soin[];
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

interface Soin {
  titre: string;
  observation: string;
}

@Component({
  selector: 'app-infirmier-dashboard',
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './infirmier-dashboard.component.html',
  styleUrl: './infirmier-dashboard.component.css',
})
export class InfirmierDashboardComponent {
  patients: Patient[] = [
    {
      id: 'P12345',
      nom: 'Benziada',
      medecin: 'Grine',
      dateDeCreation: new Date('2023-01-01'), //?
      ordonnances: [
        {
          titre: 'ordonnance 1',
          traitements: [
            {
              medicament: 'Paracetamol',
              dose: '500mg',
              duree: '7 jours',
            },
            {
              medicament: 'Ibuprofen',
              dose: '200mg',
              duree: '5 jours',
            },
            {
              medicament: 'Ibuprofen',
              dose: '200mg',
              duree: '5 jours',
            },
            {
              medicament: 'Ibuprofen',
              dose: '200mg',
              duree: '5 jours',
            },
            {
              medicament: 'Ibuprofen',
              dose: '200mg',
              duree: '5 jours',
            },
            {
              medicament: 'Ibuprofen',
              dose: '200mg',
              duree: '5 jours',
            },
            {
              medicament: 'Ibuprofen',
              dose: '200mg',
              duree: '5 jours',
            },
            {
              medicament: 'Ibuprofen',
              dose: '200mg',
              duree: '5 jours',
            },
            {
              medicament: 'Ibuprofen',
              dose: '200mg',
              duree: '5 jours',
            },
            {
              medicament: 'Ibuprofen',
              dose: '200mg',
              duree: '5 jours',
            },
          ],
        },
        {
          titre: 'Ordonnance 2',
          traitements: [
            {
              medicament: 'Ibuprofen',
              dose: '200mg',
              duree: '5 jours',
            },
          ],
        },
      ],
      soins: [
        {
          titre: 'soin 1',
          observation: "Ce soin là est un soin d'un module qui s'appelle IGL.",
        },
      ],
    },
  ];

  // Soin and Ordonnace modals logic:
  //Initialization:
  selectedPatient: Patient | null = null;
  soinsModalVisible = false;
  newSoin: Soin = {
    titre: '',
    observation: '',
  };
  originalSoins: Soin[] = []; // To store the original soins
  selectedOrdonnance: Ordonnance | null = null;
  ordonnanceModalVisible = false;

  //Methodes:
  openSoinsModal(patient: Patient) {
    this.selectedPatient = patient;
    this.originalSoins = JSON.parse(JSON.stringify(patient.soins)); // Deep copy of patient.soins
    this.soinsModalVisible = true;
  }

  closeSoinsModal() {
    this.soinsModalVisible = false;
    this.selectedPatient = null;
  }

  cancelSoinsModal() {
    //it can be null.
    if (this.selectedPatient) {
      this.selectedPatient.soins = this.originalSoins; // Revert to original, this means that patient also will be reverted.
    }
    this.closeSoinsModal();
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
    if (
      this.selectedPatient &&
      this.newSoin.titre &&
      this.newSoin.observation
    ) {
      //when pushing to selectedPatient, we push also into to the patient.
      //because the two variables refrences the same object.
      //this.selectedPatient = patient is an assignement by reference.
      this.selectedPatient.soins.push({ ...this.newSoin });
      this.newSoin = { titre: '', observation: '' }; // Reset input fields to null.
    } else {
      alert("Veuillez remplir tous les champs avant d'ajouter un soin.");
    }
  }

  handleSaveSoins() {
    //now you need just to push the patients to data base.
    this.closeSoinsModal();
  }
}
