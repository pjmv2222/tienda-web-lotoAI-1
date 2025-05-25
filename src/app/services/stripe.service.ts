import { Injectable } from '@angular/core';
import { loadStripe, Stripe, StripeCardElement, StripeElements } from '@stripe/stripe-js';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

export interface PaymentIntent {
  clientSecret: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripe: Promise<Stripe | null>;

  constructor(private http: HttpClient) {
    this.stripe = loadStripe(environment.stripe.publishableKey);
  }

  /**
   * Crea un PaymentIntent en el servidor
   */
  createPaymentIntent(amount: number, planId: string, userId?: string): Observable<PaymentIntent> {
    // Usar environment.apiUrl para consistencia en todos los entornos
    return this.http.post<PaymentIntent>(`${environment.apiUrl}/payments/create-payment-intent`, {
      amount,
      planId,
      userId
    }).pipe(
      catchError(error => {
        console.error('Error al crear el PaymentIntent:', error);
        return throwError(() => new Error('No se pudo crear el PaymentIntent'));
      })
    );
  }

  /**
   * Confirma un pago con los datos de la tarjeta
   */
  confirmCardPayment(clientSecret: string, cardElement: StripeCardElement): Observable<any> {
    return from(this.stripe).pipe(
      switchMap(stripe => {
        if (!stripe) {
          return throwError(() => new Error('Stripe no ha sido inicializado'));
        }

        return from(stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              // Aquí puedes añadir detalles de facturación si los tienes
            }
          }
        }));
      }),
      catchError(error => {
        console.error('Error al confirmar el pago:', error);
        return throwError(() => new Error('Error al procesar el pago'));
      })
    );
  }

  /**
   * Crea elementos de Stripe para el formulario de pago
   */
  async createElements(): Promise<StripeElements | null> {
    const stripe = await this.stripe;
    if (!stripe) {
      console.error('Stripe no ha sido inicializado');
      return null;
    }

    return stripe.elements();
  }

  /**
   * Procesa un pago con tarjeta
   */
  processCardPayment(planId: string, userId?: string): Observable<any> {
    return this.createPaymentIntent(this.getPlanPrice(planId), planId, userId).pipe(
      switchMap(paymentIntent => {
        return this.http.post<any>(`${environment.apiUrl}/payments/confirm-payment`, {
          paymentIntentId: paymentIntent.id,
          userId,
          planId
        });
      })
    );
  }

  /**
   * Procesa un pago con PayPal
   */
  processPayPalPayment(planId: string, paypalOrderId: string, userId?: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/payments/process-paypal`, {
      planId,
      paypalOrderId,
      userId
    });
  }

  /**
   * Procesa un pago por transferencia
   */
  processTransferPayment(planId: string, referenceNumber: string, userId?: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/payments/process-transfer`, {
      planId,
      referenceNumber,
      userId
    });
  }

  /**
   * Obtiene el precio de un plan en céntimos
   */
  private getPlanPrice(planId: string): number {
    switch (planId) {
      case 'basic':
        return 122; // 1.22€ en céntimos
      case 'monthly':
        return 1022; // 10.22€ en céntimos
      case 'pro':
        return 12200; // 122€ en céntimos
      default:
        return 122;
    }
  }

  /**
   * Simula un pago exitoso (para desarrollo)
   */
  simulateSuccessfulPayment(planId: string): Observable<any> {
    // En un entorno real, esto se conectaría con el backend
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({ success: true, planId });
        observer.complete();
      }, 1500);
    });
  }
}
