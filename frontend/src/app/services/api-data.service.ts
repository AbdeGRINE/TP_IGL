import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ordonnance, Resume } from '../models/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})

//I create a db.json file, a simulation for our Data Base.
//You can GET, POST, PUSH from/to this Data Base simulation,
//using the methodes declared in this service.
//Run the db with: `json-server --watch src/db.json --port 3000`,
//after installing the json-server.
export class ApiDataService {
  //run the django server and put its linke here:
  private baseUrl = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient) {}

  //---------------------------------------------------Geneal methodes:
  //The <T> makes the method flexible to work with different data types.
  // If you're posting data and expecting a response of type User, you'd call post<User>.
  post<T>(endpoint: string, data: any, token: string): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    });
    return this.http.post<T>(url, data, { headers });
  }
  get<T>(endpoint: string, token: string): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    });
    return this.http.get<T>(url, { headers });
  }

  put<T>(endpoint: string, data: any, token: string): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    });
    return this.http.put<T>(url, data, { headers });
  }
  //--------------------------------------------------- Specific methodes:
  createConsultation<T>(
    endpoint: string,
    dpiID: any,
    token: string
  ): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    });
    const body = {
      dpi: `${dpiID}`,
    };
    return this.http.post<T>(url, body, { headers });
  }

  createOrdonnace<T>(
    endpoint: string,
    ordonnace: Ordonnance,
    token: string
  ): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    });
    const body = {
      consultation: ordonnace.consultation, // ID de la consultation existante
      observation: 'exemple',
      medicaments: ordonnace.medicaments,
    };
    return this.http.post<T>(url, body, { headers });
  }

  createResume<T>(
    endpoint: string,
    Resume: Resume,
    token: string
  ): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    });
    const body = {
      consultation: Resume.consultation,
      resume: {
        mesures_prises: Resume.mesures_prises,
        autres: '/',
        date_prochaine_consultation: '1869-01-21',
      },
    };
    return this.http.post<T>(url, body, { headers });
  }

  getAll<T>(endpoint: string): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.get<T>(url);
  }
}
