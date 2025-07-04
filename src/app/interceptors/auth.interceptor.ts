import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { SessionService } from '../services/session.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authService: AuthService,
    private sessionService: SessionService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Agregar token JWT a todas las requests
    const authReq = this.addTokenHeader(req, this.authService.currentUserValue?.token);

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !this.isAuthUrl(req.url)) {
          return this.handle401Error(authReq, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string | null | undefined) {
    if (token) {
      return request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
    }
    return request;
  }

  private isAuthUrl(url: string): boolean {
    return url.includes('/auth/login') || 
           url.includes('/auth/register') || 
           url.includes('/auth/forgot-password') ||
           url.includes('/auth/refresh-token');
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      // Intentar renovar el token
      const refreshToken = this.authService.getRefreshToken();
      
      if (refreshToken) {
        return this.authService.refreshToken(refreshToken).pipe(
          switchMap((tokenResponse: any) => {
            this.isRefreshing = false;
            
            if (tokenResponse?.token) {
              this.refreshTokenSubject.next(tokenResponse.token);
              
              // Actualizar el usuario con el nuevo token
              this.authService.updateTokenInStorage(tokenResponse.token);
              
              // Reintentar la request original con el nuevo token
              return next.handle(this.addTokenHeader(request, tokenResponse.token));
            }
            
            // Si no se pudo renovar, cerrar sesión
            this.sessionService.showSessionExpiredModal();
            return throwError(() => new Error('Token refresh failed'));
          }),
          catchError((error) => {
            this.isRefreshing = false;
            
            // Token no válido o expirado completamente
            this.sessionService.showSessionExpiredModal();
            return throwError(() => error);
          })
        );
      } else {
        // No hay refresh token, mostrar modal de sesión expirada
        this.isRefreshing = false;
        this.sessionService.showSessionExpiredModal();
        return throwError(() => new Error('No refresh token available'));
      }
    }

    // Si ya se está renovando el token, esperar
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }
} 