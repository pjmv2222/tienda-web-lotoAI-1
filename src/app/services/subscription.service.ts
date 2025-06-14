import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, map, catchError, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

export interface Subscription {
  id: string;
  planId: string;
  status: string;
  startDate: Date;
  endDate: Date;
}

export interface Payment {
  id: string;
  status: string;
  createdAt: Date;
  amount: number;
  paymentMethod: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  /**
   * Verifica si el usuario actual tiene una suscripción activa
   * o un pago reciente (menos de 24 horas)
   */
  hasActiveSubscription(): Observable<boolean> {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      return of(false);
    }

    // Primero verificamos si hay una suscripción activa
    return this.http.get<any>(`${this.apiUrl}/subscriptions/check/${currentUser.id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      switchMap(response => {
        // Si hay una suscripción activa, devolvemos true
        if (response.hasActiveSubscription) {
          return of(true);
        }

        // Si no hay suscripción activa, verificamos pagos recientes
        return this.hasRecentPayment();
      }),
      catchError(error => {
        console.error('Error al verificar suscripción:', error);
        // Si hay un error al verificar la suscripción, verificamos pagos recientes
        return this.hasRecentPayment();
      })
    );
  }

  /**
   * Verifica si el usuario tiene un pago reciente (menos de 24 horas)
   * Esta es una solución temporal para usuarios que han pagado pero
   * cuya suscripción no se ha registrado correctamente
   */
  private hasRecentPayment(): Observable<boolean> {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      return of(false);
    }

    // Verificar en localStorage si hay un registro de pago reciente
    try {
      const paymentData = localStorage.getItem('recent_payment');
      if (paymentData) {
        const payment = JSON.parse(paymentData);
        const paymentTime = new Date(payment.timestamp).getTime();
        const currentTime = new Date().getTime();
        const hoursDiff = (currentTime - paymentTime) / (1000 * 60 * 60);

        // Si el pago es de menos de 24 horas, consideramos que tiene una suscripción activa
        if (hoursDiff < 24) {
          console.log('Se encontró un pago reciente en localStorage');
          return of(true);
        }
      }
    } catch (e) {
      console.warn('Error al verificar pago reciente en localStorage:', e);
    }

    // Si no hay registro en localStorage, verificamos en el servidor
    return this.http.get<any>(`${this.apiUrl}/payments/recent/${currentUser.id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => {
        const hasRecentPayment = response.hasRecentPayment || false;

        // Si hay un pago reciente, lo guardamos en localStorage
        if (hasRecentPayment) {
          try {
            localStorage.setItem('recent_payment', JSON.stringify({
              timestamp: new Date().toISOString(),
              userId: currentUser.id
            }));
          } catch (e) {
            console.warn('Error al guardar pago reciente en localStorage:', e);
          }
        }

        return hasRecentPayment;
      }),
      catchError(error => {
        console.error('Error al verificar pagos recientes:', error);
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
