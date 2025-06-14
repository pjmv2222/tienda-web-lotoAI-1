import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StripeService } from '../../services/stripe.service';
import { PaypalService } from '../../services/paypal.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Stripe, StripeCardElement, StripeElements } from '@stripe/stripe-js';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  note?: string;
  popular?: boolean;
}

@Component({
  selector: 'app-pasarela-pago',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, DatePipe, HttpClientModule],
  templateUrl: './pasarela-pago.component.html',
  styleUrl: './pasarela-pago.component.css'
})
export class PasarelaPagoComponent implements OnInit, OnDestroy, AfterViewInit {
  planId: string = '';
  planInfo: Plan | null = null;
  currentDate: Date = new Date();
  selectedPaymentMethod: string = 'card';

  // Campos para tarjeta
  cardName: string = '';
  cardError: string = '';
  isLoading: boolean = false;

  // Elementos de Stripe
  private elements: StripeElements | null = null;
  private cardElement: StripeCardElement | null = null;
  private paymentIntentId: string = '';
  private clientSecret: string = '';
  private subscription: Subscription | null = null;

  // Número de referencia para transferencia
  referenceNumber: string = 'REF-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

  // Elementos de PayPal
  @ViewChild('paypalButtonContainer') paypalButtonContainer!: ElementRef;

  // Indica si hay una transacción de PayPal activa
  hasActivePayPalTransaction: boolean = false;

  // Planes disponibles
  planes: Plan[] = [
    {
      id: 'basic',
      name: 'Plan Básico',
      price: 1.22,
      period: 'IVA incluido',
      description: 'Ideal para usuarios que quieren probar nuestro servicio.',
      features: [
        '3 combinaciones para cada 1 de los 7 juegos',
        'Predicciones para primeros premios y premios secundarios',
        'Válido únicamente para el sorteo inmediato a la fecha de inscripción',
        'Acceso a todas nuestras IAs especializadas'
      ],
      buttonText: 'Comenzar ahora',
      note: 'Pago único'
    },
    {
      id: 'monthly',
      name: 'Plan Mensual',
      price: 10.22,
      period: 'IVA incluido',
      description: 'Para jugadores habituales que buscan mejorar sus probabilidades.',
      features: [
        'Hasta 4 combinaciones ganadoras para cada uno de los 7 sorteos',
        'Predicciones para primeros premios y premios secundarios',
        'Válido para todos los sorteos del mes en curso desde la fecha de inscripción',
        'Acceso a todas nuestras IAs especializadas',
        'Notificaciones de sorteos'
      ],
      buttonText: 'Suscribirse',
      popular: true
    },
    {
      id: 'pro',
      name: 'Plan Pro',
      price: 122,
      period: 'IVA incluido',
      description: 'La mejor opción para jugadores serios que quieren maximizar sus posibilidades.',
      features: [
        'Combinaciones ganadoras ilimitadas para cada uno de los 7 sorteos',
        'Predicciones para primeros premios y premios secundarios',
        'Válido durante 365 días desde la fecha de inscripción',
        'Acceso prioritario a todas nuestras IAs especializadas',
        'Notificaciones personalizadas de sorteos',
        'Soporte prioritario 24/7',
        'Análisis estadísticos avanzados'
      ],
      buttonText: 'Obtener Pro'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stripeService: StripeService,
    private paypalService: PaypalService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.planId = params['plan'];
      this.loadPlanInfo();
    });

    // Verificar si hay una transacción de PayPal activa
    this.checkActivePayPalTransaction();
  }

  /**
   * Verifica si hay una transacción de PayPal activa en localStorage
   */
  private checkActivePayPalTransaction(): void {
    const transactionData = localStorage.getItem('paypal_transaction');
    if (transactionData) {
      try {
        const transaction = JSON.parse(transactionData);
        // Verificar si la transacción no ha expirado (24 horas)
        const now = Date.now();
        const transactionTime = transaction.timestamp || 0;
        const hoursSinceTransaction = (now - transactionTime) / (1000 * 60 * 60);

        if (hoursSinceTransaction < 24) {
          this.hasActivePayPalTransaction = true;
          // Si hay una transacción activa, seleccionar automáticamente PayPal como método de pago
          if (transaction.planId === this.planId) {
            this.selectedPaymentMethod = 'paypal';
          }
        } else {
          // La transacción ha expirado, eliminarla
          localStorage.removeItem('paypal_transaction');
          this.hasActivePayPalTransaction = false;
        }
      } catch (e) {
        console.error('Error al procesar la transacción de PayPal:', e);
        localStorage.removeItem('paypal_transaction');
        this.hasActivePayPalTransaction = false;
      }
    } else {
      this.hasActivePayPalTransaction = false;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadPlanInfo(): void {
    const plan = this.planes.find(p => p.id === this.planId);
    if (plan) {
      this.planInfo = plan;
      if (this.selectedPaymentMethod === 'card') {
        this.initStripe();
      }
    } else {
      // Si no se encuentra el plan, redirigir a la página de planes
      this.router.navigate(['/planes']);
    }
  }

  ngAfterViewInit(): void {
    // Inicializar PayPal si es el método seleccionado
    if (this.selectedPaymentMethod === 'paypal' && this.planInfo) {
      this.initPayPal();
    }
  }

  async initStripe(): Promise<void> {
    if (this.selectedPaymentMethod === 'card') {
      try {
        console.log('Inicializando Stripe...');
        this.elements = await this.stripeService.createElements();
        if (this.elements) {
          console.log('Elementos de Stripe creados correctamente');
          this.cardElement = this.elements.create('card', {
            style: {
              base: {
                fontSize: '16px',
                color: '#32325d',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                '::placeholder': {
                  color: '#aab7c4'
                }
              },
              invalid: {
                color: '#e74c3c',
                iconColor: '#e74c3c'
              }
            }
          }) as StripeCardElement;

          console.log('Elemento de tarjeta creado:', this.cardElement);

          // Asegurarse de que el elemento DOM existe antes de montar
          setTimeout(() => {
            const cardElementContainer = document.getElementById('card-element');
            if (!cardElementContainer) {
              console.error('No se encontró el contenedor #card-element en el DOM');
              this.cardError = 'Error al inicializar el formulario de pago';
              return;
            }

            if (this.cardElement) {
              console.log('Montando elemento de tarjeta en el DOM');
              this.cardElement.mount('#card-element');
              this.cardElement.on('change', (event) => {
                console.log('Evento de cambio en la tarjeta:', event);
                this.cardError = event.error ? event.error.message : '';
              });
              console.log('Elemento de tarjeta montado correctamente');
            } else {
              console.error('El elemento de tarjeta es nulo');
              this.cardError = 'Error al crear el elemento de tarjeta';
            }
          }, 300); // Aumentamos el tiempo para asegurar que el DOM está listo
        } else {
          console.error('No se pudieron crear los elementos de Stripe');
          this.cardError = 'Error al inicializar el formulario de pago';
        }
      } catch (error) {
        console.error('Error al inicializar Stripe:', error);
        this.cardError = 'Error al conectar con el procesador de pagos';
      }
    }
  }

  selectPaymentMethod(method: string): void {
    console.log('Método de pago seleccionado:', method);
    this.selectedPaymentMethod = method;
    this.cardError = ''; // Limpiar errores anteriores

    if (method === 'card') {
      // Dar tiempo al DOM para actualizarse antes de inicializar Stripe
      setTimeout(() => {
        this.initStripe();
      }, 100);
    } else if (method === 'paypal') {
      // Dar tiempo al DOM para actualizarse antes de inicializar PayPal
      setTimeout(() => {
        this.initPayPal();
      }, 100);
    }
  }

  processPay(): void {
    if (!this.planInfo) {
      this.cardError = 'No se ha seleccionado ningún plan';
      return;
    }

    this.isLoading = true;

    switch (this.selectedPaymentMethod) {
      case 'card':
        this.processCardPayment();
        break;
      case 'paypal':
        this.processPayPalPayment();
        break;
      case 'transfer':
        this.processTransferPayment();
        break;
      default:
        this.isLoading = false;
        this.cardError = 'Método de pago no válido';
    }
  }

  processCardPayment(): void {
    if (!this.planInfo) return;
    if (!this.cardElement) {
      this.cardError = 'Error: El elemento de tarjeta no está inicializado';
      this.isLoading = false;
      return;
    }

    // Obtener el ID del usuario si está autenticado
    const userId = this.getUserId();

    // Primero crear un PaymentIntent
    this.stripeService.createPaymentIntent(this.planInfo.price * 100, this.planId, userId)
      .subscribe({
        next: (paymentIntent) => {
          this.paymentIntentId = paymentIntent.id;
          this.clientSecret = paymentIntent.clientSecret;

          // Luego confirmar el pago con los datos de la tarjeta
          if (this.cardElement) {
            this.stripeService.confirmCardPayment(this.clientSecret, this.cardElement)
              .subscribe({
              next: (result) => {
                this.isLoading = false;
                if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
                  // Notificar al servidor que el pago fue exitoso
                  // Usamos el ID del PaymentIntent que ya fue confirmado
                  this.http.post<any>(`${environment.apiUrl}/payments/confirm-payment`, {
                    paymentIntentId: result.paymentIntent.id,
                    userId,
                    planId: this.planId
                  }).subscribe({
                      next: (finalResult) => {
                        if (finalResult.success) {
                          // Guardar información del pago reciente en localStorage
                          try {
                            localStorage.setItem('recent_payment', JSON.stringify({
                              timestamp: new Date().toISOString(),
                              userId: userId || 'guest',
                              paymentIntentId: result.paymentIntent.id,
                              planId: this.planId
                            }));
                            console.log('Información de pago reciente guardada en localStorage');
                          } catch (e) {
                            console.warn('Error al guardar información de pago en localStorage:', e);
                          }

                          this.navigateToConfirmation();
                        } else {
                          this.cardError = 'Error al finalizar el proceso de pago';
                        }
                      },
                      error: (error) => {
                        this.cardError = 'Error al finalizar el proceso: ' + (error.message || 'Intente nuevamente');
                      }
                    });
                } else if (result.error) {
                  this.cardError = result.error.message || 'Error al procesar el pago';
                }
              },
              error: (error) => {
                this.isLoading = false;
                this.cardError = 'Error al confirmar el pago: ' + (error.message || 'Intente nuevamente');
              }
            });
          } else {
            this.isLoading = false;
            this.cardError = 'Error: El elemento de tarjeta no está disponible';
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.cardError = 'Error al iniciar el pago: ' + (error.message || 'Intente nuevamente');
        }
      });
  }

  /**
   * Inicializa el botón de PayPal
   * Este método se mantiene para compatibilidad con el código existente
   * pero ya no se usa con la nueva implementación
   */
  initPayPal(): void {
    // Ya no necesitamos inicializar PayPal con el SDK
    // Ahora usamos un botón personalizado que redirecciona directamente a PayPal
    if (!this.planInfo) return;

    // Limpiar cualquier mensaje de error anterior
    this.cardError = '';
  }

  /**
   * Maneja el éxito del pago con PayPal
   * Este método se mantiene para compatibilidad con el código existente
   * pero ya no se usa directamente con la nueva implementación
   */
  onPayPalPaymentSuccess(orderId: string): void {
    if (!this.planInfo) return;

    this.isLoading = true;
    console.log('Pago con PayPal exitoso, ID de orden:', orderId);

    // En un entorno de producción, aquí se comunicaría con el backend
    // para registrar el pago y activar la suscripción

    // Simulamos un procesamiento exitoso
    setTimeout(() => {
      this.isLoading = false;
      this.navigateToConfirmation();
    }, 1500);
  }

  /**
   * Procesa un pago con PayPal
   */
  processPayPalPayment(): void {
    if (!this.planInfo) return;

    this.isLoading = false;
    // Mostrar un mensaje al usuario para que haga clic en el botón de PayPal
    this.cardError = 'Por favor, haz clic en el botón de PayPal para completar tu pago.';
  }

  /**
   * Redirecciona al usuario a PayPal para completar el pago
   */
  redirectToPayPal(): void {
    if (!this.planInfo) {
      this.cardError = 'Error: No se pudo cargar la información del plan';
      return;
    }

    this.isLoading = true;
    this.cardError = 'Abriendo PayPal en una nueva ventana...';

    // Construir la URL de PayPal para pago directo - versión más simple
    const amount = this.planInfo.price;
    const planName = encodeURIComponent(this.planInfo.name);

    // Generar un ID de transacción único para seguimiento
    const transactionId = 'txn_' + Date.now() + '_' + Math.floor(Math.random() * 1000000);

    // Guardar información de la transacción en localStorage para recuperarla después
    localStorage.setItem('paypal_transaction', JSON.stringify({
      transactionId: transactionId,
      planId: this.planId,
      amount: amount,
      timestamp: Date.now()
    }));

    // Actualizar el estado de la transacción activa
    this.hasActivePayPalTransaction = true;

    // Usar la URL de PayPal.me que es más sencilla y directa
    // Esta URL redirecciona al usuario a PayPal para completar el pago
    const paypalUrl = `https://www.paypal.com/paypalme/lotoIA/${amount}EUR`;

    console.log('Abriendo PayPal con URL:', paypalUrl);

    // Abrir PayPal en una nueva ventana/pestaña
    const paypalWindow = window.open(paypalUrl, '_blank');

    // Si el navegador bloquea la ventana emergente, ofrecer un enlace alternativo
    if (!paypalWindow || paypalWindow.closed || typeof paypalWindow.closed === 'undefined') {
      this.isLoading = false;
      this.cardError = 'El navegador ha bloqueado la ventana emergente. Por favor, haz clic en el botón de nuevo para intentarlo o habilita las ventanas emergentes.';
    } else {
      // Iniciar un temporizador para verificar periódicamente si el usuario ha completado el pago
      this.startPaymentCheckTimer();
    }
  }

  /**
   * Inicia un temporizador para verificar si el usuario ha completado el pago en PayPal
   */
  private startPaymentCheckTimer(): void {
    this.isLoading = false;
    this.cardError = 'Esperando confirmación de pago. Por favor, completa el pago en la ventana de PayPal y luego haz clic en "He completado el pago" cuando termines.';
  }

  /**
   * Verifica si el pago de PayPal ha sido completado
   */
  checkPayPalPaymentStatus(): void {
    this.isLoading = true;

    // Recuperar información de la transacción
    const transactionData = localStorage.getItem('paypal_transaction');
    if (!transactionData) {
      this.isLoading = false;
      this.cardError = 'No se encontró información de la transacción.';
      return;
    }

    const transaction = JSON.parse(transactionData);

    // Notificar al servidor sobre el pago
    this.http.post<any>(`${environment.apiUrl}/payments/verify-paypal-payment`, {
      transactionId: transaction.transactionId,
      planId: transaction.planId,
      amount: transaction.amount,
      userId: this.getUserId()
    }).subscribe({
      next: (result) => {
        this.isLoading = false;
        if (result.success) {
          // Limpiar datos de la transacción
          localStorage.removeItem('paypal_transaction');

          // Guardar información del pago reciente en localStorage
          try {
            localStorage.setItem('recent_payment', JSON.stringify({
              timestamp: new Date().toISOString(),
              userId: this.getUserId() || 'guest',
              paymentMethod: 'paypal',
              planId: transaction.planId
            }));
            console.log('Información de pago reciente con PayPal guardada en localStorage');
          } catch (e) {
            console.warn('Error al guardar información de pago con PayPal en localStorage:', e);
          }

          // Navegar a la página de confirmación
          this.navigateToConfirmation();
        } else {
          this.cardError = 'No se pudo verificar el pago. Por favor, contacta con soporte si ya has realizado el pago.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.cardError = 'Error al verificar el pago: ' + (error.message || 'Intente nuevamente');
      }
    });
  }

  processTransferPayment(): void {
    if (!this.planInfo) return;

    // Obtener el ID del usuario si está autenticado
    const userId = this.getUserId();

    // Procesar el pago por transferencia
    this.subscription = this.stripeService.processTransferPayment(this.planId, this.referenceNumber, userId)
      .subscribe({
        next: (result) => {
          this.isLoading = false;
          if (result.success) {
            // Guardar información del pago reciente en localStorage
            try {
              localStorage.setItem('recent_payment', JSON.stringify({
                timestamp: new Date().toISOString(),
                userId: userId || 'guest',
                paymentMethod: 'transfer',
                planId: this.planId,
                referenceNumber: this.referenceNumber
              }));
              console.log('Información de pago reciente por transferencia guardada en localStorage');
            } catch (e) {
              console.warn('Error al guardar información de pago por transferencia en localStorage:', e);
            }

            this.navigateToConfirmation();
          } else {
            this.cardError = 'Error al registrar la transferencia';
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.cardError = 'Error al registrar la transferencia: ' + (error.message || 'Intente nuevamente');
        }
      });
  }

  // Método para obtener el ID del usuario actual
  private getUserId(): string | undefined {
    // Obtener el usuario del servicio de autenticación
    const currentUser = this.authService.currentUserValue;
    return currentUser?.id;
  }

  navigateToConfirmation(): void {
    // Redirigir a la página de confirmación correspondiente
    switch (this.planId) {
      case 'basic':
        this.router.navigate(['/confirmacion-plan-basico']);
        break;
      case 'monthly':
        this.router.navigate(['/confirmacion-plan-mensual']);
        break;
      case 'pro':
        this.router.navigate(['/confirmacion-plan-pro']);
        break;
      default:
        console.error('Plan no reconocido');
    }
  }
}
