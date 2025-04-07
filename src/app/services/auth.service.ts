import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, map } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { User, UserLogin, UserRegistration, UserPasswordReset, UserPasswordForgot } from '../models/user.model';
import { environment } from '../../environments/environment';

interface UserProfile {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  telefono?: string;
  fechaRegistro: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      isPlatformBrowser(this.platformId) ? this.getUserFromStorage() : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private getUserFromStorage(): User | null {
    try {
      const userStr = localStorage.getItem('currentUser');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error al leer usuario del localStorage:', error);
      return null;
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.currentUserValue?.token;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/auth/check-email`, { email });
  }

  register(userData: UserRegistration): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, userData);
  }

  login(credentials: UserLogin): Observable<any> {
    const url = `${this.apiUrl}/auth/login`;
    console.log('Intentando login:', {
      url,
      email: credentials.email,
      apiUrl: this.apiUrl,
      fullUrl: url,
      headers: { 'Content-Type': 'application/json' }
    });

    return this.http.post<any>(url, credentials, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      tap(response => {
        console.log('Respuesta del servidor:', response);
        if (response.success) {
          const user = {
            ...response.user,
            token: response.token
          };
          this.setUserInStorage(user);
          this.currentUserSubject.next(user);
        }
      }),
      catchError(error => {
        console.error('Error detallado en login:', {
          status: error.status,
          statusText: error.statusText,
          url: error.url,
          message: error.message,
          error: error.error,
          headers: error.headers
        });
        throw error;
      })
    );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/profile`, { headers: this.getAuthHeaders() })
      .pipe(
        tap(response => {
          if (response.success) {
            const updatedUser = {
              ...this.currentUserValue,
              ...response.user
            };
            this.setUserInStorage(updatedUser);
            this.currentUserSubject.next(updatedUser);
          }
        }),
        catchError(error => {
          if (error.status === 401) {
            this.logout();
          }
          throw error;
        })
      );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/forgot-password`, { email });
  }

  resetPassword(resetData: UserPasswordReset): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/reset-password`, resetData);
  }

  verifyEmail(token: string): Observable<any> {
    console.log('Verificando email con token:', token);
    return this.http.get(`${this.apiUrl}/auth/verify/${token}`).pipe(
      tap(response => {
        console.log('Respuesta de verificación:', response);
      }),
      catchError(error => {
        console.error('Error en verificación:', error);
        throw error;
      })
    );
  }

  update(userData: Partial<User>): Observable<User> {
    const currentUser = this.currentUserValue;
    if (!currentUser) {
      throw new Error('No hay usuario autenticado');
    }

    return this.http.put<User>(`${this.apiUrl}/auth/users/${currentUser.id}`, userData).pipe(
      tap(updatedUser => {
        const newUser = { ...currentUser, ...updatedUser };
        this.setUserInStorage(newUser);
        this.currentUserSubject.next(newUser);
      })
    );
  }

  delete(): Observable<void> {
    const currentUser = this.currentUserValue;
    if (!currentUser) {
      throw new Error('No hay usuario autenticado');
    }

    return this.http.delete<void>(`${this.apiUrl}/auth/users/${currentUser.id}`).pipe(
      tap(() => {
        this.logout();
      })
    );
  }

  updateProfile(userId: string, userData: Partial<User>): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/auth/profile`,
      userData,
      { headers: this.getAuthHeaders() }
    ).pipe(
      tap(response => {
        if (response.success) {
          const updatedUser = {
            ...this.currentUserValue,
            ...response.user
          };
          this.setUserInStorage(updatedUser);
          this.currentUserSubject.next(updatedUser);
        }
      })
    );
  }

  deleteAccount(userId: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/auth/profile`,
      { headers: this.getAuthHeaders() }
    ).pipe(
      tap(() => {
        this.logout();
        window.location.href = '/auth/login';
      })
    );
  }

  changePassword(passwordData: { currentPassword: string; newPassword: string }): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/auth/change-password`,
      passwordData,
      { headers: this.getAuthHeaders() }
    );
  }

  private setUserInStorage(user: User | null): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
          localStorage.removeItem('currentUser');
        }
      } catch (error) {
        console.error('Error al guardar usuario en localStorage:', error);
      }
    }
  }
}
