import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { AuthResponse, User } from '../models/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //run the django server and put its linke here:
  private apiUrl = 'http://127.0.0.1:8000';
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  private isBrowser: boolean;

  authResponse: AuthResponse = {
    token: '',
    user: {
      id: '',
      username: '',
      password: '',
      email: '',
      type: {
        id: '',
        type: '',
      },
    },
  };

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    // const token = this.getToken();
    // if (token) {
    //   this.getCurrentUser().subscribe();
    // }

    const storedData = localStorage.getItem('authResponse');
    if (storedData) {
      this.authResponse = JSON.parse(storedData);
    }
  }

  // setAuthResponse(response: AuthResponse) {
  //   this.authResponse.user = response.user;
  //   this.authResponse.token = response.token;
  // }

  getAuthResponse() {
    return this.authResponse;
  }

  getToken() {
    return this.authResponse.token;
  }

  //example: return the id of infirmier role (not user).
  getIdRole() {
    return this.authResponse.user.type.id;
  }
  login(username: string, password: string): Observable<AuthResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<AuthResponse>(
        `${this.apiUrl}/users/authentifier_utilisateur/`,
        {
          username,
          password,
        },
        { headers }
      )
      .pipe(
        tap((response) => {
          if (this.isBrowser) {
            localStorage.setItem('authResponse', JSON.stringify(response));
          }
          this.userSubject.next(response.user);
        })
      );
  }

  logout(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.getToken}`,
    });
    return this.http.post(`${this.apiUrl}/users/deconnecter_utilisateur/`, {headers}).pipe(
      tap(() => {
        if (this.isBrowser) {
          localStorage.removeItem('authResponse');
        }
        this.userSubject.next(null);
      })
    );
  }

  // getCurrentUser(): Observable<User> {
  //   return this.http
  //     .get<UserResponse>(`${this.apiUrl}/obtenir_utilisateur_connecte/`)
  //     .pipe(
  //       map((response) => response.user),
  //       tap((user) => {
  //         this.userSubject.next(user);
  //       })
  //     );
  // }

  // getToken(): string | null {
  //   if (this.isBrowser) {
  //     return localStorage.getItem('token');
  //   }
  //   return null;
  // }

  // isLoggedIn(): boolean {
  //   return !!this.getToken();
  // }

  //no need!
  // register(userData: {
  //   username: string;
  //   password: string;
  //   email: string;
  // }): Observable<AuthResponse> {
  //   return this.http
  //     .post<AuthResponse>(`${this.apiUrl}/inscrire_utilisateur/`, userData)
  //     .pipe(
  //       tap((response) => {
  //         if (this.isBrowser) {
  //           localStorage.setItem('token', response.token);
  //         }
  //         this.userSubject.next(response.user);
  //       })
  //     );
  // }
}
