import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, RouterLink, FormsModule, DatePipe],
  templateUrl: './pasarela-pago.component.html',
  styleUrl: './pasarela-pago.component.css'
})
export class PasarelaPagoComponent implements OnInit {
  planId: string = '';
  planInfo: Plan | null = null;
  currentDate: Date = new Date();
  selectedPaymentMethod: string = 'card';

  // Campos para tarjeta
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  cardName: string = '';

  // Número de referencia para transferencia
  referenceNumber: string = 'REF-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.planId = params['plan'];
      this.loadPlanInfo();
    });
  }

  loadPlanInfo(): void {
    const plan = this.planes.find(p => p.id === this.planId);
    if (plan) {
      this.planInfo = plan;
    } else {
      // Si no se encuentra el plan, redirigir a la página de planes
      this.router.navigate(['/planes']);
    }
  }

  selectPaymentMethod(method: string): void {
    this.selectedPaymentMethod = method;
  }

  processPay(): void {
    // Aquí iría la lógica de procesamiento del pago
    // En un entorno real, se conectaría con una pasarela de pago

    console.log('Procesando pago con método:', this.selectedPaymentMethod);

    // Simulamos un proceso de pago exitoso
    setTimeout(() => {
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
    }, 1500); // Simulamos un pequeño retraso para dar sensación de procesamiento
  }
}
