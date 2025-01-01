import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

//these interfaces will be public (in interfaces front):
export interface AuthResponse {
  id_role: string; //the id of patient, not user_patient!
  token: string;
  user: User;
}

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  type: string;
}
export interface UserResponse {
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://6da3-105-105-165-116.ngrok-free.app';
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  private isBrowser: boolean;
  authResponse : AuthResponse;

  setAuthResponse(response: AuthResponse){
    if(this.authResponse){
      this.authResponse.user = response.user;
      this.authResponse.id_role = response.id_role;
      this.authResponse.token  = response.token;
    }
  }

  getAuthResponse(){
    return this.authResponse;
  }

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    const token = this.getToken();
    if (token) {
      this.getCurrentUser().subscribe();
    }
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
            localStorage.setItem('token', response.token);
          }
          this.userSubject.next(response.user);
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/deconnecter_utilisateur/`, {}).pipe(
      tap(() => {
        if (this.isBrowser) {
          localStorage.removeItem('token');
        }
        this.userSubject.next(null);
      })
    );
  }

  getCurrentUser(): Observable<User> {
    return this.http
      .get<UserResponse>(`${this.apiUrl}/obtenir_utilisateur_connecte/`)
      .pipe(
        map((response) => response.user),
        tap((user) => {
          this.userSubject.next(user);
        })
      );
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

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
