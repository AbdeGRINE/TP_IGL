import { Injectable, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { of } from 'rxjs';


interface DPI {
  id : string,
  patient_nom : string,
  patient_prenom : string,
  medecin_traitant : string,
  etablissement_courant : string,
  date_creation : string,
}

@Injectable({
  providedIn: 'root'
})
export class MedecinService {
    private apiUrl = 'http://127.0.0.1:8000/';
    private DPIsSubject = new BehaviorSubject<DPI[]>([]);
    DPIs$ = this.DPIsSubject.asObservable();
    // private DPISubject = new BehaviorSubject<DPI>();
    // DPI$ = this.DPISubject.asObservable();
    private isBrowser: boolean;

    constructor(private http: HttpClient,
      @Inject(PLATFORM_ID) platformId: Object) {this.isBrowser = isPlatformBrowser(platformId);}

      
    // getDPI(id : number): Observable<DPI> {
    //       const AuthResponseString = this.isBrowser ? localStorage.getItem('authResponse') : null;
    //       const AuthResponse = AuthResponseString ? JSON.parse(AuthResponseString) : null;
          
    //       if (!AuthResponse) {
    //         throw new Error('No authentication response found');
    //       }
    //       console.log(`token: ${AuthResponse.token}`)
      
    //       const headers = new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         'Authentification' : `Token ${AuthResponse.token}`
    //       });
    //       console.log(headers);
      
    //       return this.http.get<DPI>(`${this.apiUrl}/dpi/consulter-dpi/${id}/`, { headers })
    //       .pipe(
    //         tap(DPIs => {
    //           console.log('Response from backend:', DPIs);
    //           this.DPISubject.next(DPIs);
    //         }),
    //         catchError(error => {
    //           console.error('Error fetching bilans:', error);
    //           if (error.error) {
    //             console.error('Error response body:', error.error);
    //           }
    //           return of();  // Return an observable of an empty array
    //         })
            
            
    //       );
    //     }

        getDPIsMedecin(): Observable<DPI[]> {
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
          console.log(headers);
      
          return this.http.get<DPI[]>(`${this.apiUrl}dpi/lister_par_medecin/${AuthResponse.user.id}/`, { headers })
          .pipe(
            tap(DPIs => {
              console.log('Response from backend:', DPIs);
              this.DPIsSubject.next(DPIs);
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
}
