// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

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
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/users';
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = this.getToken();
    if (token) {
      this.getCurrentUser().subscribe();
    }
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/authentifier_utilisateur/`, 
      { username, password }
    ).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.userSubject.next(response.user);
      })
    );
  }

  register(userData: { username: string; password: string; email: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/inscrire_utilisateur/`, userData)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          this.userSubject.next(response.user);
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/deconnecter_utilisateur/`, {})
      .pipe(
        tap(() => {
          localStorage.removeItem('token');
          this.userSubject.next(null);
        })
      );
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<UserResponse>(`${this.apiUrl}/obtenir_utilisateur_connecte/`)
      .pipe(
        map(response => response.user),
        tap(user => {
          this.userSubject.next(user);
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}