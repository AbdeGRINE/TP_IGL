// src/app/services/laboratin.service.ts
import { Injectable } from '@angular/core';

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

@Injectable({
  providedIn: 'root'
})
export class LaboranService {
  
  private patients: Patient[] = [
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
            { nom: 'Test3', resultat: '20,5' }
          ]
        }
      ]
    }
  ];

  // Get all patients
  getPatients(): Patient[] {
    return this.patients;
  }

  // Get all bilans for a specific patient(for the bilan modal)
  getBilansForPatient(patientId: string): Bilan[] | null {
    const patient = this.patients.find(p => p.id === patientId);
    return patient ? patient.bilans : null;
  }

  //this is a getter for one bilan (to gointo the test modal)
  getBilanForPatient(patientId: string, bilanNom: string): Bilan | null {
    const patient = this.patients.find(p => p.id === patientId);
    if (patient) {
      const bilan = patient.bilans.find(b => b.nom === bilanNom);
      return bilan || null;
    }
    return null;
  }

  // Get all tests for a specific bilan of a patient
  getTestsForBilan(patientId: string, bilanNom: string): Test[] | null {
    const bilan = this.getBilanForPatient(patientId, bilanNom);
    return bilan ? bilan.tests : null;
  }

  updateTestResults(patientId: string, bilanNom: string, newResults: { [key: string]: string }): boolean {
    ////objet qui contient le nom su test et le resultat(newResults)
    const patient = this.patients.find(p => p.id === patientId);
    if (patient) {
      const bilan = patient.bilans.find(b => b.nom === bilanNom);
      if (bilan) {
        bilan.tests.forEach(test => {
          if (newResults[test.nom]) {
            test.resultat = newResults[test.nom];
          }
        });
        return true;
      }
    }
    return false;
  }
 
}