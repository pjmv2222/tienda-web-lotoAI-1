import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, map, catchError, switchMap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
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
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
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

    // Verificar en localStorage si hay un registro de pago reciente (solo en browser)
    if (isPlatformBrowser(this.platformId)) {
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
    }

    // Si no hay registro en localStorage, verificamos en el servidor
    return this.http.get<any>(`${this.apiUrl}/payments/recent/${currentUser.id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => {
        const hasRecentPayment = response.hasRecentPayment || false;

        // Si hay un pago reciente, lo guardamos en localStorage (solo en browser)
        if (hasRecentPayment && isPlatformBrowser(this.platformId)) {
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
    if (!currentUser) {
      console.log('hasActivePlan: No hay usuario autenticado');
      return of(false);
    }

    console.log(`hasActivePlan: Verificando plan '${planId}' para usuario ${currentUser.id}`);

    // Consultar directamente la API para verificar el plan específico
    return this.http.get<any>(`${this.apiUrl}/subscriptions/check/${currentUser.id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => {
        console.log('hasActivePlan: Respuesta de la API:', response);
        
        // Verificar si tiene suscripción activa del plan específico
        if (response.hasActiveSubscription && response.subscription) {
          console.log(`hasActivePlan: plan_id en respuesta: '${response.subscription.plan_id}', buscando: '${planId}'`);
          
          // CORRECCIÓN PRINCIPAL: Verificar tanto plan_id como plan_type
          const hasMatchingPlanId = response.subscription.plan_id === planId;
          const hasMatchingPlanType = response.subscription.plan_type === planId;
          const hasMatchingPlan = hasMatchingPlanId || hasMatchingPlanType;
          
          console.log(`hasActivePlan: plan_id coincide: ${hasMatchingPlanId}`);
          console.log(`hasActivePlan: plan_type coincide: ${hasMatchingPlanType}`);
          console.log(`hasActivePlan: ¿Plan coincide? ${hasMatchingPlan}`);
          
          return hasMatchingPlan;
        }
        
        console.log('hasActivePlan: No hay suscripción activa o no se encontró la suscripción en la respuesta');
        console.log('hasActivePlan: response.hasActiveSubscription:', response.hasActiveSubscription);
        console.log('hasActivePlan: response.subscription:', response.subscription);
        return false;
      }),
      catchError(error => {
        console.error('hasActivePlan: Error al verificar plan específico:', error);
        console.error('hasActivePlan: Status:', error.status);
        console.error('hasActivePlan: Message:', error.message);
        return of(false);
      })
    );
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
