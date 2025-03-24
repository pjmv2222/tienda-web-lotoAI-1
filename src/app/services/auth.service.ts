import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';
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
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private getUserFromStorage(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      const userStr = localStorage.getItem('currentUser');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }

  private setUserInStorage(user: User | null): void {
    if (isPlatformBrowser(this.platformId)) {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('currentUser');
      }
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/check-email`, { email });
  }

  register(userData: UserRegistration): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, userData).pipe(
      tap(user => {
        this.setUserInStorage(user);
        this.currentUserSubject.next(user);
      })
    );
  }

  login(credentials: UserLogin): Observable<User> {
    console.log('1. Iniciando petición de login');
    const httpOptions = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      observe: 'response' as 'response'
    };
  
    return this.http.post<any>(`${this.apiUrl}/login`, credentials, httpOptions)
      .pipe(
        tap(response => {
          console.log('2. Respuesta completa:', response);
          console.log('3. Headers de respuesta:', response.headers);
        }),
        map(response => {
          const body = response.body;
          if (!body.success) {
            throw new Error(body.message || 'Error en la autenticación');
          }

          const userData: User = {
            id: body.user.id,
            email: body.user.email,
            nombre: body.user.nombre,
            apellido: body.user.apellido,
            verified: body.user.verified,
            role: body.user.role,
            token: body.token
          };

          this.setUserInStorage(userData);
          this.currentUserSubject.next(userData);
          return userData;
        })
      );
  }

  logout(): void {
    this.setUserInStorage(null);
    this.currentUserSubject.next(null);
  }

  // Single implementation of getCurrentUser with all necessary configurations
  getCurrentUser(): Observable<UserProfile> {
    const httpOptions = {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${this.currentUserValue?.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
    return this.http.get<UserProfile>(`${this.apiUrl}/profile`, httpOptions);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(resetData: UserPasswordReset): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, resetData);
  }

  verifyEmail(token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-email`, { token });
  }

  update(userData: Partial<User>): Observable<User> {
    const currentUser = this.currentUserValue;
    if (!currentUser) {
      throw new Error('No hay usuario autenticado');
    }

    return this.http.put<User>(`${this.apiUrl}/users/${currentUser.id}`, userData).pipe(
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

    return this.http.delete<void>(`${this.apiUrl}/users/${currentUser.id}`).pipe(
      tap(() => {
        this.logout();
      })
    );
  }

  // Eliminar esta implementación duplicada
  // getCurrentUser(): Observable<UserProfile> {
  //   return this.http.get<UserProfile>(`${this.apiUrl}/users/profile`);
  // }

  updateProfile(userId: string, userData: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.apiUrl}/users/${userId}`, userData);
  }

  deleteAccount(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${userId}`);
  }
}
