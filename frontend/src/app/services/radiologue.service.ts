import { Injectable, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { of } from 'rxjs';

interface Bilan {
  nom: string;
  date_demande: string; // 2005-01-02
  date_recuperation: string | null;
  status: 'En_cours' | 'Terminé';
  type: 'Radiologique' | 'Biologique';
  redigant_laborantin: number | null;
  redigant_radiologue: number | null;
  consultation: number;
  graphique: 'Attaché' | 'Non_Attaché';
  radioBase64 : string;
  compteRendu : string,
}

@Injectable({
  providedIn: 'root'
})
export class RadiologueService implements OnInit{
  private apiUrl = 'http://127.0.0.1:8000/';
  private bilansSubject = new BehaviorSubject<Bilan[]>([]);
  bilans$ = this.bilansSubject.asObservable();
  private isBrowser: boolean;
    bilans : Bilan[] = [];

    setBilansRadiologique(bilan : Bilan){

    }

    getBilansRadiologique(){
      return this.bilans;
    }

  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object) {this.isBrowser = isPlatformBrowser(platformId);}


  ngOnInit(): void {
    
  }

    getBilansRadiologueEnCours(): Observable<Bilan[]> {
      const AuthResponseString = this.isBrowser ? localStorage.getItem('authResponse') : null;
      const AuthResponse = AuthResponseString ? JSON.parse(AuthResponseString) : null;
      
      if (!AuthResponse) {
        throw new Error('No authentication response found');
      }
      console.log(`token: ${AuthResponse.token}`)
  
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authentification' : `Token ${AuthResponse.token}`
      });
      console.log(AuthResponse);
  
      return this.http.get<Bilan[]>(`${this.apiUrl}bilan/consulter_bilans_radiologiques_en_cours/`, { headers })
      .pipe(
        tap(bilans => {
          console.log('Response from backend:', bilans);
          this.bilansSubject.next(bilans);
        }),
        catchError(error => {
          console.error('Error fetching bilans:', error);
          if (error.error) {
            console.error('Error response body:', error.error);
          }
          return of([]);  // Return an observable of an empty array
        })
        
        
      );
    }

    saisirResultatsBilanRadiologique<T>(endpoint: string, data: any): Observable<T>{
      const url = `${this.apiUrl}/${endpoint}`;
      console.log(data);
      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization' : `Token ${JSON.parse(localStorage.getItem('authResponse') || '{}').token}` });
      console.log(headers);
      return this.http.post<T>(url, data, { headers });
    }

  }
