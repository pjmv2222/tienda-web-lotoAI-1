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

  // Planes disponibles
  planes: Plan[] = [
    {
      id: 'basic',
      name: 'Plan Básico',
      price: 1.22,
      period: 'IVA incluido',
      description: 'Ideal para usuarios que quieren probar nuestro servicio.',
      features: [
        '1 combinación ganadora para cada uno de los 7 sorteos',
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
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.planId = params['plan'];
      this.loadPlanInfo();
    });
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
    this.cardError = 'Redirigiendo a PayPal...';

    // Construir la URL de PayPal para pago directo - versión más simple
    const amount = this.planInfo.price;
    const planName = encodeURIComponent(this.planInfo.name);

    // Usar la URL de PayPal.me que es más sencilla y directa
    // Esta URL redirecciona al usuario a PayPal para completar el pago
    const paypalUrl = `https://www.paypal.com/paypalme/lotoIA/${amount}EUR`;

    console.log('Redirigiendo a PayPal con URL:', paypalUrl);

    // Redireccionar a PayPal
    setTimeout(() => {
      window.location.href = paypalUrl;
    }, 1000);
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
    // Aquí deberías implementar la lógica para obtener el ID del usuario autenticado
    // Por ejemplo, desde un servicio de autenticación
    return undefined; // Por ahora devolvemos undefined
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
