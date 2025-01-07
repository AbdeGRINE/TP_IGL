import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { AuthResponse, Bilan, User } from '../models/interfaces/interfaces';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RadiologueService {
  private apiUrl = 'http://127.0.0.1:8000/';
  private bilansSubject = new BehaviorSubject<Bilan[]>([]);
  bilans$ = this.bilansSubject.asObservable();
  private isBrowser: boolean;
    bilan : Bilan = {
    id : -1,
    nom: "IRM",
    date_demande: "2024-12-31",
    date_recuperation: null,
    status: "En_cours",
    type: "Radiologique",
    redigant_laborantin: null,
    redigant_radiologue: null,
    consultation: 1,
    graphique: "Non_Attaché"
    }

    setBilanRadiologique(bilan : Bilan){

    }

    getBilanRadiologique(){
      return this.bilan;
    }

  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object) {this.isBrowser = isPlatformBrowser(platformId);}

    getBilansRadiologueEnCours(): Observable<Bilan[]> {
      let token = null;
      const auth = localStorage.getItem('authResponse') || null;

      if (auth) {
      // Parse the string back to an object
      const parsedAuth = JSON.parse(auth);

      // Now you can access a specific field
      token = parsedAuth?.token; }

      console.log(token);  
      console.log(`token ${token}`);
  
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
              });
      console.log(headers);
  
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


    postBilanResponse<Reponse_Bilan>(endpoint: string, data: Reponse_Bilan): Observable<Reponse_Bilan> {
      let token = null;
      const auth = localStorage.getItem('authResponse') || null;

      if (auth) {
      // Parse the string back to an object
      const parsedAuth = JSON.parse(auth);

      // Now you can access a specific field
      token = parsedAuth?.token; }

      console.log(token);  
      console.log(`token ${token}`);
      const url = `${this.apiUrl}${endpoint}`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : `Token ${token}`,
      });
      return this.http.post<Reponse_Bilan>(url, data, { headers });
    }
}
