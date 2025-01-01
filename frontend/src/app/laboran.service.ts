import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Patient {
  id: string;
  nom: string;
  medecin: string;
  dateDeCreation: Date;
  bilans: Bilan[];
}

export interface Bilan {
  nom: string;
  tests: Test[];
}

export interface Test {
  nom: string;
  resultat: string;
}

@Injectable({
  providedIn: 'root'
})
export class PatientBilanService {
  private apiUrl = 'http://localhost:8000/api';
  private patientsSubject = new BehaviorSubject<Patient[]>([]);
  patients$ = this.patientsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/patients`);
  }

  updateTestResults(patientId: string, bilanId: string, tests: Test[]): Observable<any> {
    return this.http.put(`${this.apiUrl}/patients/${patientId}/bilans/${bilanId}/tests`, { tests });
  }

  getBilansByPatient(patientId: string): Observable<Bilan[]> {
    return this.http.get<Bilan[]>(`${this.apiUrl}/patients/${patientId}/bilans`);
  }

  saveBilanResults(patientId: string, bilanId: string, results: { [key: string]: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/patients/${patientId}/bilans/${bilanId}/results`, { results });
  }
}