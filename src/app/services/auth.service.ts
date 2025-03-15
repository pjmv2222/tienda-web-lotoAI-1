import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      this.getUserFromStorage()
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private getUserFromStorage(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
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
        this.currentUserSubject.next(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
      })
    );
  }

  login(credentials: UserLogin): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.currentUserSubject.next(response.user);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
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
        this.currentUserSubject.next(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
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

  getCurrentUser(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/users/profile`);
  }

  updateProfile(userId: string, userData: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.apiUrl}/users/${userId}`, userData);
  }

  deleteAccount(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${userId}`);
  }
}
