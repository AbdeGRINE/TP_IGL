import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';


// Interface for the Medecin object
interface Medecin {
  id: number;
  nom: string;
  prenom: string;
  specialite: string;
  etablissement: number;
}

// Interface for the Bilan object
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

// Interface for the Patient object with nested Medecin and Bilans
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
  

@Injectable({
  providedIn: 'root'
})
export class BilanService {
  private apiUrl = 'http://127.0.0.1:8000/bilan';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    });
  }

  // Get all ongoing biological tests with patient information
  getBilansEnCours(): Observable<Patient[]> {
    return this.http.get<Patient[]>(
      `${this.apiUrl}/consulter_bilans_biologiques_en_cours_with_Patients/`,
      { headers: this.getHeaders() }
    );
  }

  // Get the list of test related to a specific bilan
  getBilanBiologique(bilanId: number): Observable<DetailedBilan> {
    return this.http.get<{ bilan: Bilan; tests: Test[] }>(
      `${this.apiUrl}/consulter_bilan_biologique_tests/?bilan=${bilanId}`,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => {
        return {
          ...response.bilan,
          tests: response.tests
        } as DetailedBilan;
      })
    );
  } 

  // Submit biological test results
  updateTestResults(bilanId: number, testResults: { [key: string]: string }) {
    console.log('Payload:', {
      bilan_id: bilanId,
      test_results: testResults
    });
  
    return this.http.post(
      `${this.apiUrl}/update_test_results/`,
      {
        bilan_id: bilanId,
        test_results: testResults
      },
      { headers: this.getHeaders() }
    );
  }
  

  
}