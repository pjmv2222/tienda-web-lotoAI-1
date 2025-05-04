import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, map, catchError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

export interface Subscription {
  id: string;
  planId: string;
  status: string;
  startDate: Date;
  endDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = '/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  /**
   * Verifica si el usuario actual tiene una suscripción activa
   */
  hasActiveSubscription(): Observable<boolean> {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      return of(false);
    }

    return this.http.get<any>(`${this.apiUrl}/subscriptions/check/${currentUser.id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => response.hasActiveSubscription),
      catchError(error => {
        console.error('Error al verificar suscripción:', error);
        return of(false);
      })
    );
  }

  /**
   * Verifica si el usuario tiene una suscripción activa de un plan específico
   */
  hasActivePlan(planId: string): Observable<boolean> {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser || !currentUser.subscriptions || currentUser.subscriptions.length === 0) {
      return of(false);
    }

    // Verificar en las suscripciones del usuario
    const hasActivePlan = currentUser.subscriptions.some(sub =>
      sub.activa && sub.tipo === planId
    );

    return of(hasActivePlan);
  }

  /**
   * Obtiene todas las suscripciones del usuario actual
   */
  getUserSubscriptions(): Observable<Subscription[]> {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      return of([]);
    }

    return this.http.get<any>(`${this.apiUrl}/subscriptions/user/${currentUser.id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => response.subscriptions || []),
      catchError(error => {
        console.error('Error al obtener suscripciones:', error);
        return of([]);
      })
    );
  }

  /**
   * Obtiene los headers de autenticación
   */
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.currentUserValue?.token;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}
