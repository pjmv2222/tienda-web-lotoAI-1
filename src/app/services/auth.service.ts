import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, map, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { User, UserLogin, UserRegistration, UserPasswordReset, UserPasswordForgot } from '../models/user.model';
import { environment } from '../../environments/environment';
import { CookieService } from './cookie.service';
import { SessionService } from './session.service';

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
  private userStorageKey = 'currentUser';
  private tokenCookieKey = 'auth_token';
  private refreshTokenCookieKey = 'refresh_token';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private sessionService: SessionService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      isPlatformBrowser(this.platformId) ? this.getUserFromStorage() : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
    
    // Configurar la referencia del AuthService en SessionService para evitar dependencia circular
    this.sessionService.setAuthService(this);
  }

  private getUserFromStorage(): User | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    
    try {
      // Intentar obtener el usuario del localStorage
      let userStr = localStorage.getItem(this.userStorageKey);
      let user: User | null = userStr ? JSON.parse(userStr) : null;

      // Si no hay usuario en localStorage, verificar si hay un token en las cookies
      if (!user) {
        const token = this.cookieService.getCookie(this.tokenCookieKey);
        if (token) {
          // Si hay un token, intentar obtener el usuario
          this.getCurrentUserFromToken(token).subscribe({
            next: (userData) => {
              if (userData) {
                user = { ...userData, token };
                this.setUserInStorage(user);
                this.currentUserSubject.next(user);
              }
            },
            error: (error) => {
              console.error('Error al obtener usuario desde token:', error);
              this.cookieService.deleteCookie(this.tokenCookieKey);
            }
          });
        }
      }

      return user;
    } catch (error) {
      console.error('Error al leer usuario del almacenamiento:', error);
      return null;
    }
  }

  private getCurrentUserFromToken(token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/profile`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }).pipe(
      map(response => response.user),
      catchError(error => {
        console.error('❌ [AuthService] Error obteniendo usuario desde token:', {
          status: error.status,
          message: error.message
        });
        
        // Si el token es inválido, limpiar cookies
        if (error.status === 401 || error.status === 403) {
          console.log('🔄 [AuthService] Token de cookie inválido - limpiando');
          this.cookieService.deleteCookie(this.tokenCookieKey);
          this.cookieService.deleteCookie(this.refreshTokenCookieKey);
        }
        
        throw error;
      })
    );
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public getAuthHeaders(): HttpHeaders {
    // Múltiples formas de obtener el token para debugging
    const tokenFromUser = this.currentUserValue?.token;
    const tokenFromCookie = this.cookieService.getCookie(this.tokenCookieKey);
    
    // Fallback directo desde document.cookie
    let tokenFromDocument = null;
    if (isPlatformBrowser(this.platformId)) {
      const cookieMatch = document.cookie.match(/auth_token=([^;]*)/);
      tokenFromDocument = cookieMatch ? decodeURIComponent(cookieMatch[1]) : null;
    }
    
    const finalToken = tokenFromUser || tokenFromCookie || tokenFromDocument;
    
    // TEMPORALMENTE COMENTADO PARA DEBUGGING DEL BUCLE
    /*
    console.log('AuthHeaders Debug:', {
      tokenFromUser: tokenFromUser ? 'EXISTS' : 'NULL',
      tokenFromCookie: tokenFromCookie ? 'EXISTS' : 'NULL', 
      tokenFromDocument: tokenFromDocument ? 'EXISTS' : 'NULL',
      finalToken: finalToken ? 'EXISTS' : 'NULL',
      cookieServiceResult: this.cookieService.getCookie(this.tokenCookieKey)
    });
    */
    
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${finalToken}`
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
      headers: { 'Content-Type': 'application/json' }
    });

    return this.http.post<any>(url, credentials, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      tap(response => {
        console.log('Respuesta del servidor:', response);
        if (response.token && response.user) {
          const user = {
            ...response.user,
            token: response.token
          };

          // Guardar el token JWT en una cookie segura
          this.cookieService.setConditionalCookie(
            this.tokenCookieKey,
            response.token,
            'necessary',
            {
              expires: 7, // 7 días
              path: '/',
              secure: true,
              sameSite: 'Strict'
            }
          );

          // Guardar refresh token si viene en la respuesta
          if (response.refreshToken) {
            this.cookieService.setConditionalCookie(
              this.refreshTokenCookieKey,
              response.refreshToken,
              'necessary',
              {
                expires: 30, // 30 días para refresh token
                path: '/',
                secure: true,
                sameSite: 'Strict'
              }
            );
          }

          // Guardar el usuario en localStorage (sin el token)
          this.setUserInStorage(user);
          this.currentUserSubject.next(user);

          // Iniciar tracking de sesión
          this.sessionService.startSession();
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
    console.log('🚪 [AuthService] Cerrando sesión');
    
    // Terminar tracking de sesión
    this.sessionService.endSession();
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.userStorageKey);
      this.cookieService.deleteCookie(this.tokenCookieKey, { path: '/' });
      this.cookieService.deleteCookie(this.refreshTokenCookieKey, { path: '/' });
    }
    this.currentUserSubject.next(null);
  }

  /**
   * Limpia una sesión corrupta de manera más agresiva
   */
  clearCorruptedSession() {
    console.log('🔄 [AuthService] Limpiando sesión corrupta');
    
    // Terminar tracking de sesión
    this.sessionService.endSession();
    
    if (isPlatformBrowser(this.platformId)) {
      // Limpiar localStorage más agresivamente
      const authKeys = ['currentUser', 'auth_token', 'refresh_token'];
      authKeys.forEach(key => {
        localStorage.removeItem(key);
      });
      
      // Limpiar cookies con diferentes configuraciones
      this.cookieService.deleteCookie(this.tokenCookieKey, { path: '/' });
      this.cookieService.deleteCookie(this.refreshTokenCookieKey, { path: '/' });
      this.cookieService.deleteCookie('auth_token', { path: '/' });
      this.cookieService.deleteCookie('refresh_token', { path: '/' });
    }
    
    this.currentUserSubject.next(null);
    console.log('✅ [AuthService] Sesión corrupta limpiada');
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/profile`, { headers: this.getAuthHeaders() })
      .pipe(
        tap(response => {
          if (response.user) {
            const updatedUser = {
              ...this.currentUserValue,
              ...response.user
            };
            this.setUserInStorage(updatedUser);
            this.currentUserSubject.next(updatedUser);
          }
        }),
        catchError(error => {
          console.error('❌ [AuthService] Error en getCurrentUser:', {
            status: error.status,
            url: error.url,
            message: error.message
          });
          
          // Para errores 401 o 403, limpiar sesión completamente
          if (error.status === 401 || error.status === 403) {
            console.log('🔄 [AuthService] Token inválido detectado - limpiando sesión');
            this.clearCorruptedSession();
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

  resendVerificationEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/resend-verification`, { email });
  }

  verifyEmail(token: string): Observable<any> {
    console.log('Verificando email con token:', token);
    return this.http.get(`${this.apiUrl}/auth/verify-email/${token}`).pipe(
      tap((response: any) => {
        console.log('Respuesta de verificación:', response);
        if (response && response.user) {
          this.storeAuthenticatedUser(response.user, response.token);
        }
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
        if (response.user) {
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
          // Guardar usuario sin el token en localStorage
          const { token, ...userWithoutToken } = user;
          localStorage.setItem(this.userStorageKey, JSON.stringify(userWithoutToken));
        } else {
          localStorage.removeItem(this.userStorageKey);
        }
      } catch (error) {
        console.error('Error al guardar usuario en localStorage:', error);
      }
    }
  }

  /**
   * Almacena un usuario autenticado después de la verificación de email
   * @param user Datos del usuario
   * @param token Token de autenticación
   */
  storeAuthenticatedUser(user: any, token: string): void {
    if (!user || !token) {
      console.error('No se puede almacenar usuario sin datos o token');
      return;
    }

    try {
      // Crear objeto de usuario completo
      const authenticatedUser = {
        ...user,
        token
      };

      // Guardar el token en una cookie segura
      this.cookieService.setConditionalCookie(
        this.tokenCookieKey,
        token,
        'necessary',
        {
          expires: 7, // 7 días
          path: '/',
          secure: true,
          sameSite: 'Strict'
        }
      );

      // Guardar el usuario en localStorage y actualizar el BehaviorSubject
      this.setUserInStorage(authenticatedUser);
      this.currentUserSubject.next(authenticatedUser);

      console.log('Usuario autenticado almacenado correctamente');
    } catch (error) {
      console.error('Error al almacenar usuario autenticado:', error);
    }
  }

  /**
   * Obtiene el refresh token almacenado
   */
  getRefreshToken(): string | null {
    return this.cookieService.getCookie(this.refreshTokenCookieKey);
  }

  /**
   * Actualiza el token en el almacenamiento
   */
  updateTokenInStorage(newToken: string): void {
    const currentUser = this.currentUserValue;
    if (currentUser) {
      const updatedUser = { ...currentUser, token: newToken };
      this.setUserInStorage(updatedUser);
      this.currentUserSubject.next(updatedUser);
    }
    
    // Actualizar también en cookies
    this.cookieService.setConditionalCookie(
      this.tokenCookieKey,
      newToken,
      'necessary',
      {
        expires: 7,
        path: '/',
        secure: true,
        sameSite: 'Strict'
      }
    );
  }

  /**
   * Renueva el token actual
   */
  refreshCurrentToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }
    
    return this.refreshToken(refreshToken);
  }

  /**
   * Renueva el token usando el refresh token
   */
  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/refresh-token`, { 
      refreshToken 
    }).pipe(
      tap(response => {
        if (response.token) {
          this.updateTokenInStorage(response.token);
          
          // Si también viene un nuevo refresh token, actualizarlo
          if (response.refreshToken) {
            this.cookieService.setConditionalCookie(
              this.refreshTokenCookieKey,
              response.refreshToken,
              'necessary',
              {
                expires: 30, // 30 días para refresh token
                path: '/',
                secure: true,
                sameSite: 'Strict'
              }
            );
          }
        }
      }),
      catchError(error => {
        // Si falla la renovación, cerrar sesión
        this.logout();
        return throwError(() => error);
      })
    );
  }
}
