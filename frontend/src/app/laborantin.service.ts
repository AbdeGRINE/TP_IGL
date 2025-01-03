
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Patient {
  id: string;
  nom: string;
  medecin: string;
  dateDeCreation: Date;
  bilans: Bilan[];
}

export interface Bilan {
  id: number;
  nom: string;
  tests: Test[];
}

export interface Test {
  id: number;
  nom: string;
  resultat: string;
}

@Injectable({
  providedIn: 'root'
})
export class LaborantinService {
  constructor(private http: HttpClient) {}
 
  //api url
  private apiUrl = 'http://localhost:8000/api/laboratory';
  //getter des patients
  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/patients/`)
      .pipe(
        map((patients: Patient[]) => {
          return patients.map(patient => ({
            ...patient,
            dateDeCreation: new Date(patient.dateDeCreation)
          }));
        }),
        
      );

 }
//get un seul patient 
getPatient(id: string): Observable<Patient> {
  return this.http.get<Patient>(`${this.apiUrl}/patients/${id}/`)
    .pipe(
      map(patient => ({
        ...patient,
        dateDeCreation: new Date(patient.dateDeCreation)
      })),
      
    );
}
//get les bilans d'un patient 
getPatientBilans(patientId: string): Observable<Bilan[]> {
  return this.http.get<Bilan[]>(`${this.apiUrl}/patients/${patientId}/bilans/`)
}


//sauvegarder les tests
saveTestResults(bilanId: number, tests: Partial<Test>[]): Observable<Bilan> {
  return this.http.put<Bilan>(`${this.apiUrl}/bilans/${bilanId}/tests/`, { tests })
   
}
}