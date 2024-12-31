// laboratin-dashboard.component.ts

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';

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
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './laboratin-dashboard.component.html',
  styleUrl: './laboratin-dashboard.component.css',
})
export class LaboratinDashboardComponent implements OnInit {
  @ViewChild('testChart') chartCanvas?: ElementRef;
  private chart: Chart | null = null;

  // Mock data
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
            { nom: 'Test2', resultat: '0,5' },
            { nom: 'Test3', resultat: '20,5' },
            { nom: 'Test4', resultat: '7,90' },
            { nom: 'Test5', resultat: '8,98' },
            { nom: 'Test6', resultat: '10,09' },
            { nom: 'Test7', resultat: '19,09' },
          ],
        },
        {
          nom: 'Les analyses d\'urines',
          tests: [
            { nom: 'Ibuprofen', resultat: '200' },
          ],
        },
      ],
    },
    // Add more mock patients if needed
  ];

  selectedPatient: Patient | null = null;
  selectedBilan: Bilan | null = null;
  bilansModalVisible = false;
  testModalVisible = false;
  originalBilans: Bilan[] = [];
  editedResults: { [key: string]: string } = {};

  ngOnInit() {}

  // Patient -> Bilans Modal methods
  openBilansModal(patient: Patient) {
    this.selectedPatient = patient;
    this.originalBilans = JSON.parse(JSON.stringify(patient.bilans));
    this.bilansModalVisible = true;
  }

  closeBilansModal() {
    this.bilansModalVisible = false;
    this.selectedPatient = null;
  }

  // Bilan -> Tests Modal methods
  openTestModal(bilan: Bilan) {
    this.selectedBilan = bilan;
    this.testModalVisible = true;
    this.editedResults = {};
    bilan.tests.forEach(test => {
      this.editedResults[test.nom] = test.resultat || '';
    });

    // Wait for DOM to update before creating chart
    setTimeout(() => {
      this.createChart();
    }, 0);
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

  // Chart methods
  private createChart() {
    if (!this.selectedBilan || !this.chartCanvas) return;

    if (this.chart) {
      this.chart.destroy();
    }

    const cleanData = this.selectedBilan.tests
      .map(test => ({
        name: test.nom,
        value: parseFloat(test.resultat.replace(',', '.').replace('%', ''))
      }))
      .filter(item => !isNaN(item.value));

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: cleanData.map(item => item.name),
        datasets: [{
          label: 'Résultats des tests',
          data: cleanData.map(item => item.value),
          backgroundColor: 'rgba(70, 187, 145, 0.2)',
          borderColor: 'rgba(70, 187, 145, 1)',
          borderWidth: 2,
          tension: 0.4
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
            text: 'Évolution des résultats'
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

  // Test results methods
  updateTestResult(testName: string, newValue: string) {
    this.editedResults[testName] = newValue;
    // Update chart when values change
    setTimeout(() => {
      this.createChart();
    }, 0);
  }

  hasUnsavedChanges(): boolean {
    if (!this.selectedBilan) return false;
    return this.selectedBilan.tests.some(test => 
      this.editedResults[test.nom] !== test.resultat
    );
  }

  saveTestResults() {
    if (!this.selectedBilan) return;
    
    this.selectedBilan.tests.forEach(test => {
      if (this.editedResults[test.nom] !== undefined) {
        test.resultat = this.editedResults[test.nom];
      }
    });

    alert('Résultats sauvegardés avec succès!');
    this.closeTestModal();
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