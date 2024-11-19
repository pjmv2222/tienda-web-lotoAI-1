import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface AuthResponse {
  token: string;
  user: User;
}

interface User {
  id?: string;
  email?: string;
  // ... otros campos
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.production 
    ? 'https://api.loto-ia.com' 
    : 'http://localhost:3000';
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    // Verificar si hay un token guardado al iniciar el servicio
    const token = localStorage.getItem('token');
    if (token) {
      this.validateToken();
    }
  }

  register(userData: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData)
      .pipe(
        map((response: AuthResponse) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            this.userSubject.next(response.user);
          }
          return response;
        })
      );
  }

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response: AuthResponse) => {
          localStorage.setItem('token', response.token);
          this.userSubject.next(response.user);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  private validateToken(): void {
    this.http.get(`${this.apiUrl}/validate-token`).subscribe(
      (response: any) => {
        if (response && response.user) {
          this.userSubject.next(response.user);
        } else {
          this.logout();
        }
      },
      () => {
        this.logout();
      }
    );
  }
}
