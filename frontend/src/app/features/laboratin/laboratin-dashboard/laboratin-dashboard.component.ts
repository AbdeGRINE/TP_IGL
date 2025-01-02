import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { Chart } from 'chart.js/auto'; // hada nahinah (it was the courbe )
import { Chart, registerables } from 'chart.js';
//import { LaboranService } from ../../services/laboran.service;
Chart.register(...registerables);

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
  @ViewChild('testChart', { static: false }) chartCanvas!: ElementRef;
  public chart: Chart | null = null;

  
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
          nom: 'Bilan Sanguin',
          tests: [
            //check les changements
            { nom: 'Test1', resultat: '7,90' },
            { nom: 'Test2', resultat: '0,5' },
            { nom: 'Test3', resultat: '20,5' },
            { nom: 'Test4', resultat: '7,90' },
            { nom: 'Test5', resultat: '8,98' },
            { nom: 'Test6', resultat: '10,09' },
            { nom: 'Test7', resultat: '19,09' },
            { nom: 'Test1', resultat: '7,90' },
            { nom: 'Test2', resultat: '0,5' },
            { nom: 'Test3', resultat: '20,5' },
            { nom: 'Test4', resultat: '7,90' },
            { nom: 'Test5', resultat: '8,98' },
            { nom: 'Test6', resultat: '10,09' },
            { nom: 'Test7', resultat: '19,09' },
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
    
  ];
///initiaisation
  selectedPatient: Patient | null = null;
  selectedBilan: Bilan | null = null;
  bilansModalVisible = false;
  testModalVisible = false;
  originalBilans: Bilan[] = [];
  editedResults: { [key: string]: string } = {};

  ngOnInit() {
    Chart.register(...registerables);
  }

  openBilansModal(patient: Patient) {
    this.selectedPatient = patient;
    this.originalBilans = JSON.parse(JSON.stringify(patient.bilans));
    this.bilansModalVisible = true;
  }
//same from the infermier
  closeBilansModal() {
    this.bilansModalVisible = false;
    this.selectedPatient = null;
  }

  openTestModal(bilan: Bilan) {
    this.selectedBilan = bilan;
    this.testModalVisible = true;
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
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    this.testModalVisible = false;
    this.selectedBilan = null;
    this.editedResults = {};
  }

 
  generateChart() {
    console.log('Generating chart...');
    if (!this.selectedBilan) {
      console.log('No bilan selected');
      return;
    }
    if (!this.chartCanvas) {
      console.log('No canvas element found');
      return;
    }
  
    if (this.chart) {
      console.log('Destroying old chart');
      this.chart.destroy();
    }
  
    const cleanData = this.selectedBilan.tests
      .map(test => ({
        name: test.nom,
        value: parseFloat(test.resultat.replace(',', '.').replace('%', ''))
      }));
    
    console.log('Clean data:', cleanData);
  
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