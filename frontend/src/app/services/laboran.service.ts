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

  //this is a getter for one bilan
  getBilanForPatient(patientId: string, bilanNom: string): Bilan | null {
    const patient = this.patients.find(p => p.id === patientId);
    if (patient) {
      const bilan = patient.bilans.find(b => b.nom === bilanNom);
      return bilan || null;
    }
    return null;
  }

 
}