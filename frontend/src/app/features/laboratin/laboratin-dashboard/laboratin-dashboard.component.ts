import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { BilanService } from '../../../services/bilan.servise';

Chart.register(...registerables);

// Update the interfaces to match the new structure
interface Medecin {
  id: number;
  nom: string;
  prenom: string;
  specialite: string;
  etablissement: number;
}

interface Bilan {
  id: number; 
  nom: string;
  date_demande: string;
  date_recuperation: string | null;
  status: string;
  type: string;
  redigant_laborantin: number | null;
  redigant_radiologue: number | null;
  consultation: number;
  graphique: string;
}

interface Patient {
  id: number;
  nom: string;
  medecin: Medecin;
  dateDeCreation: string;
  bilans: Bilan[];
}

interface Test {
  id: number;
  nom: string;
  resultat: string;
  unite: string;
}

interface DetailedBilan extends Bilan {
  tests: Test[];
}

@Component({
  selector: 'app-laboratin-dashboard',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './laboratin-dashboard.component.html',
  styleUrl: './laboratin-dashboard.component.css',
})
export class LaboratinDashboardComponent implements OnInit {
  @ViewChild('testChart', { static: false }) chartCanvas!: ElementRef;
  public chart: Chart | null = null;

  patients: Patient[] = [];
  selectedPatient: Patient | null = null;
  selectedBilan: DetailedBilan | null = null;
  bilansModalVisible = false;
  testModalVisible = false;
  editedResults: { [key: string]: string } = {};

  constructor(private bilanService: BilanService) {}

  ngOnInit() {
    Chart.register(...registerables);
    this.getBilansEnCours();
  }

  getBilansEnCours() {  
    this.bilanService.getBilansEnCours().subscribe(
      (patients: Patient[]) => {
        this.patients = patients;
      },
      (error) => {
        console.error('Error loading patients:', error);
        alert('Erreur lors du chargement des patients');
      }
    );
  }

  openBilansModal(patient: Patient) {
    this.selectedPatient = patient;
    this.bilansModalVisible = true;
  }

  closeBilansModal() {
    this.bilansModalVisible = false;
    this.selectedPatient = null;
  }

  openTestModal(bilan: Bilan) {
    this.bilanService.getBilanBiologique(bilan.id).subscribe(
      (detailedBilan: DetailedBilan) => {
        this.selectedBilan = detailedBilan;
        this.testModalVisible = true;
        this.editedResults = {};
        detailedBilan.tests.forEach(test => {
          this.editedResults[test.nom] = test.resultat || '';
        });
        setTimeout(() => this.generateChart(), 100);
      },
      (error) => {
        console.error('Error loading bilan details:', error);
        alert('Erreur lors du chargement des détails du bilan');
      }
    );
  }




  closeTestModal() {
    if (this.hasUnsavedChanges()) {
      if (confirm('Vous avez des modifications non sauvegardées. Voulez-vous vraiment fermer?')) {
        this.discardChanges();
      } else {
        return;
      }
    }
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    this.testModalVisible = false;
    this.selectedBilan = null;
    this.editedResults = {};
  }

  generateChart() {
    if (!this.selectedBilan || !this.chartCanvas) {
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }

    const cleanData = this.selectedBilan.tests
      .map(test => ({
        name: test.nom,
        value: parseFloat(test.resultat.replace(',', '.').replace('%', ''))
      }))
      .filter(item => !isNaN(item.value));

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: cleanData.map(item => item.name),
        datasets: [{
          label: 'Résultats des tests',
          data: cleanData.map(item => item.value),
          backgroundColor: 'rgba(70, 187, 145, 0.6)',
          borderColor: 'rgba(70, 187, 145, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Résultats des tests'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
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
    
    

    const testResults: { [key: string]: string } = {};
    this.selectedBilan.tests.forEach(test => {
      testResults[test.nom] = this.editedResults[test.nom] || test.resultat;
    });

    this.bilanService.updateTestResults(this.selectedBilan.id, testResults).subscribe(
      () => {
        alert('Résultats sauvegardés avec succès!');
        this.closeTestModal();
        this.getBilansEnCours(); // Refresh the list
      },
      (error) => {
        console.error('Error saving results:', error);
        alert('Erreur lors de la sauvegarde des résultats');
      }
    );
  }
  discardChanges() {
    this.testModalVisible = false;
    this.selectedBilan = null;
    this.editedResults = {};
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  isResultValid(result: string): boolean {
    return result.trim() !== '';
  }
}