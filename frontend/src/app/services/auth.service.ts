import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
<<<<<<< HEAD
  
//These intefaces should be in model, public for all the components (we need them in the header)
=======
import { isPlatformBrowser } from '@angular/common';

>>>>>>> d84b03e495db39b4438c513639d8a8c53c00ff05
export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface UserResponse {
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/users';
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  private isBrowser: boolean;

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
<<<<<<< HEAD
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/authentifier_utilisateur/`, {
        username,
        password,
=======
    return this.http.post<AuthResponse>(`${this.apiUrl}/authentifier_utilisateur/`,
      { username, password }
    ).pipe(
      tap(response => {
        if (this.isBrowser) {
          localStorage.setItem('token', response.token);
        }
        this.userSubject.next(response.user);
>>>>>>> d84b03e495db39b4438c513639d8a8c53c00ff05
      })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
          this.userSubject.next(response.user);
        })
      );
  }

  // no need to it:
  register(userData: {
    username: string;
    password: string;
    email: string;
  }): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/inscrire_utilisateur/`, userData)
      .pipe(
<<<<<<< HEAD
        tap((response) => {
          localStorage.setItem('token', response.token);
=======
        tap(response => {
          if (this.isBrowser) {
            localStorage.setItem('token', response.token);
          }
>>>>>>> d84b03e495db39b4438c513639d8a8c53c00ff05
          this.userSubject.next(response.user);
        })
      );
  }

  logout(): Observable<any> {
<<<<<<< HEAD
    return this.http.post(`${this.apiUrl}/deconnecter_utilisateur/`, {}).pipe(
      tap(() => {
        localStorage.removeItem('token');
        this.userSubject.next(null);
      })
    );
=======
    return this.http.post(`${this.apiUrl}/deconnecter_utilisateur/`, {})
      .pipe(
        tap(() => {
          if (this.isBrowser) {
            localStorage.removeItem('token');
          }
          this.userSubject.next(null);
        })
      );
>>>>>>> d84b03e495db39b4438c513639d8a8c53c00ff05
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
}
