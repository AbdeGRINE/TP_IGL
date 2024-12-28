import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Patient {
  id: string;
  nom: string;
  medecin: string;
  dateDeCreation: Date;
  bilans: Bilan[];
}

interface Bilan {
  nom: string;
  tests: Test[];
}

interface Test {
  nom: string;
  resultat: string;
}

@Component({
  selector: 'app-laboratin-dashboard',
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './laboratin-dashboard.component.html',
  styleUrl: './laboratin-dashboard.component.css',
})
export class LaboratinDashboardComponent {
  patients: Patient[] = [
    {
      id: 'P12345',
      nom: 'Benziada',
      medecin: 'Grine',
      dateDeCreation: new Date('2023-01-01'),
      bilans: [
        {
          nom: 'Bilan Sanguin',
          tests: [
            { nom: 'Test1', resultat: '7,90' },
            { nom: 'Test2', resultat: '0,5%' },
            { nom: 'Test3', resultat: '20,5%' },
            { nom: 'Test4', resultat: '7,90' },
            { nom: 'Test5', resultat: '8,98' },
            { nom: 'Test6', resultat: '10,09' },
            { nom: 'Test7', resultat: '19,09' },
          ],
        },
        {
          nom: 'Les analyses d"urines',
          tests: [
            { nom: 'Ibuprofen', resultat: '200mg' },
          ],
        },
      ],
    },
    {
      id: 'P12345',
      nom: 'Benziada',
      medecin: 'Grine',
      dateDeCreation: new Date('2023-01-01'),
      bilans: [
        {
          nom: 'Bilan Sanguin',
          tests: [
            { nom: 'Test1', resultat: '7,90' },
            { nom: 'Test2', resultat: '0,5%' },
            { nom: 'Test3', resultat: '20,5%' },
            { nom: 'Test4', resultat: '7,90' },
            { nom: 'Test5', resultat: '8,98' },
            { nom: 'Test6', resultat: '10,09' },
            { nom: 'Test7', resultat: '19,09' },
          ],
        },
        {
          nom: 'Les analyses d"urines',
          tests: [
            { nom: 'Ibuprofen', resultat: '200mg' },
          ],
        },
      ],
    },
  ];

  selectedPatient: Patient | null = null;
  selectedBilan: Bilan | null = null;
  bilansModalVisible = false;
  testModalVisible = false;
  originalBilans: Bilan[] = [];
  editedResults: { [key: string]: string } = {}; // Store edited results temporarily
  
  newBilan: Bilan = {
    nom: '',
    tests: [],
  };

  // Patient -> Bilans Modal
  openBilansModal(patient: Patient) {
    this.selectedPatient = patient;
    this.originalBilans = JSON.parse(JSON.stringify(patient.bilans));
    this.bilansModalVisible = true;
  }

  closeBilansModal() {
    this.bilansModalVisible = false;
    this.selectedPatient = null;
  }

  // Bilan -> Tests Modal

  openTestModal(bilan: Bilan) {
    this.selectedBilan = bilan;
    this.testModalVisible = true;
    // Initialize editedResults with current values
    this.editedResults = {};
    bilan.tests.forEach(test => {
      this.editedResults[test.nom] = test.resultat || '';
    });
  }

  closeTestModal() {
    if (this.hasUnsavedChanges()) {
      if (confirm('Vous avez des modifications non sauvegardées. Voulez-vous vraiment fermer?')) {
        this.discardChanges();
      } else {
        return;
      }
    }
    this.testModalVisible = false;
    this.selectedBilan = null;
    this.editedResults = {};
  }

  updateTestResult(testName: string, newValue: string) {
    this.editedResults[testName] = newValue;
  }

  hasUnsavedChanges(): boolean {
    if (!this.selectedBilan) return false;
    return this.selectedBilan.tests.some(test => 
      this.editedResults[test.nom] !== test.resultat
    );
  }

  saveTestResults() {
    if (!this.selectedBilan) return;
    
    // Update the actual test results
    this.selectedBilan.tests.forEach(test => {
      if (this.editedResults[test.nom] !== undefined) {
        test.resultat = this.editedResults[test.nom];
      }
    });

    // TODO: Add API call to save changes to database
    alert('Résultats sauvegardés avec succès!');
    this.closeTestModal();
  }

  discardChanges() {
    this.testModalVisible = false;
    this.selectedBilan = null;
    this.editedResults = {};
  }

  isResultValid(result: string): boolean {
    // Add your validation logic here
    return result.trim() !== '';
  }
}