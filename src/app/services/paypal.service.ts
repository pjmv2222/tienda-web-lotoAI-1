import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

declare const paypal: any;

@Injectable({
  providedIn: 'root'
})
export class PaypalService {
  constructor(private http: HttpClient) {}

  /**
   * Crea una orden de pago en PayPal
   */
  createOrder(planId: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/payments/create-paypal-order`, {
      planId
    }).pipe(
      catchError(error => {
        console.error('Error al crear la orden de PayPal:', error);
        return throwError(() => new Error('No se pudo crear la orden de PayPal'));
      })
    );
  }

  /**
   * Procesa un pago con PayPal
   */
  processPayment(planId: string, paypalOrderId: string, userId?: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/payments/process-paypal`, {
      planId,
      paypalOrderId,
      userId
    }).pipe(
      catchError(error => {
        console.error('Error al procesar el pago con PayPal:', error);
        return throwError(() => new Error('Error al procesar el pago con PayPal'));
      })
    );
  }

  /**
   * Inicializa el botón de PayPal
   */
  initPayPalButton(containerId: string, planId: string, onSuccess: (orderId: string) => void): void {
    // Asegurarse de que el script de PayPal esté cargado
    if (typeof paypal === 'undefined') {
      this.loadPayPalScript().then(() => {
        this.renderButton(containerId, planId, onSuccess);
      });
    } else {
      this.renderButton(containerId, planId, onSuccess);
    }
  }

  /**
   * Renderiza el botón de PayPal
   */
  private renderButton(containerId: string, planId: string, onSuccess: (orderId: string) => void): void {
    // Obtener el precio del plan
    const amount = this.getPlanPrice(planId);

    paypal.Buttons({
      style: {
        color: 'blue',
        shape: 'rect',
        label: 'pay',
        height: 40
      },
      createOrder: (data: any, actions: any) => {
        return new Promise((resolve, reject) => {
          this.createOrder(planId).subscribe({
            next: (response: any) => {
              resolve(response.orderId);
            },
            error: (error: any) => {
              console.error('Error al crear la orden:', error);
              reject(error);
            }
          });
        });
      },
      onApprove: (data: any, actions: any) => {
        // Llamar a la función de éxito con el ID de la orden
        onSuccess(data.orderID);
      },
      onError: (err: any) => {
        console.error('Error en el botón de PayPal:', err);
      }
    }).render(`#${containerId}`);
  }

  /**
   * Carga el script de PayPal
   */
  private loadPayPalScript(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${environment.paypal.clientId}&currency=${environment.paypal.currency}`;
      script.onload = () => resolve();
      script.onerror = (error) => reject(error);
      document.body.appendChild(script);
    });
  }

  /**
   * Obtiene el precio del plan
   */
  private getPlanPrice(planId: string): number {
    switch (planId) {
      case 'basic':
        return 1.22;
      case 'monthly':
        return 10.22;
      case 'pro':
        return 122;
      default:
        return 1.22;
    }
  }
}
