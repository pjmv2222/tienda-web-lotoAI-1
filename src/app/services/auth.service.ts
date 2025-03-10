import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, delay } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

interface AuthResponse {
  token: string;
  user: User;
}

interface User {
  id: string;
  email: string;
  nombre: string;
  apellidos: string;
  // ... otros campos del usuario
}

interface RegisterData {
  email: string;
  password: string;
  nombre: string;
  apellidos: string;
  nif: string;
  fechaNacimiento: string;
  direccion: string;
  codigoPostal: string;
  poblacion: string;
  provincia: string;
  telefono: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
  verificationToken?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  // Por ahora, usaremos datos mock
  private mockUsers: string[] = ['test@example.com'];

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      this.getStoredUser()
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private getStoredUser(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem('currentUser') || 'null');
    }
    return null;
  }

  private setStoredUser(user: User | null): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  register(data: any): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/auth/register`, data)
      .pipe(
        tap(response => {
          if (response.success && response.verificationToken) {
            this.simulateEmailSending(data.email, response.verificationToken);
          }
        })
      );
  }

  private simulateEmailSending(email: string, token: string): void {
    console.log(`
      ===============================================
      Simulación de Email de Verificación
      ===============================================
      Para: ${email}
      Asunto: Verifica tu cuenta en LotoIA
      
      Hola,
      
      Gracias por registrarte en LotoIA. Para completar tu registro,
      por favor haz clic en el siguiente enlace:
      
      http://localhost:4000/verify-email/${token}
      
      Este enlace expirará en 24 horas.
      
      Saludos,
      El equipo de LotoIA
      ===============================================
    `);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        map(user => {
          // Almacenar detalles del usuario y token jwt en el localStorage
          this.setStoredUser(user);
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }

  verifyEmail(token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/verify-email/${token}`);
  }

  // Método para verificar si el email ya existe
  checkEmailExists(email: string): Observable<boolean> {
    // Simulamos verificación de email
    return of(this.mockUsers.includes(email)).pipe(delay(500));
  }

  // Método para solicitar recuperación de contraseña
  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/request-password-reset`, { email });
  }

  // Método para resetear la contraseña
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/reset-password`, { token, newPassword });
  }
}
