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
export class LaboranService{
  
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

  // Update test results(modification)
  updateTestResults(patientId: string, bilanNom: string, newResults: { [key: string]: string }): boolean { //hadoo g3 ml ancient data
    const patient = this.patients.find(p => p.id === patientId);
    if (patient) {//patient trouve 
      const bilan = patient.bilans.find(b => b.nom === bilanNom);
      if (bilan) { //bilan trouvé
        bilan.tests.forEach(test => {
          if (newResults[test.nom]) {
            //hna tsra la mise a jour des test 
            test.resultat = newResults[test.nom];
          }
        });
        return true;
      }
    }
    return false;
  }
}