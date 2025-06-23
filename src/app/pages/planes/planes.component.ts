import { Component, OnInit, ElementRef } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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

interface Faq {
  question: string;
  answer: string;
  active: boolean;
}

interface Testimonial {
  name: string;
  plan: string;
  text: string;
  avatar: string;
}

@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './planes.component.html',
  styleUrl: './planes.component.css'
})
export class PlanesComponent implements OnInit {
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
        'Combinaciones ganadoras ilimitadas para cada uno de los 7 sorteos',
        'Predicciones para primeros premios y premios secundarios',
        'Válido para todos los sorteos del mes en curso desde la fecha de inscripción durante 30 días',
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

  aiSystems = [
    {
      name: 'Da Vinci',
      lottery: 'Euromillones',
      description: 'IA especializada en analizar patrones históricos y tendencias estadísticas de Euromillones para generar combinaciones con mayor probabilidad de acierto.',
      icon: 'fa-brain'
    },
    {
      name: 'Prognosis',
      lottery: 'La Primitiva',
      description: 'IA entrenada con décadas de resultados de La Primitiva, capaz de identificar secuencias y patrones ocultos para maximizar tus posibilidades.',
      icon: 'fa-chart-line'
    },
    {
      name: 'Ástrid',
      lottery: 'El Gordo de la Primitiva',
      description: 'IA especializada en El Gordo de la Primitiva que utiliza algoritmos de aprendizaje profundo para predecir combinaciones con mayor probabilidad estadística.',
      icon: 'fa-robot'
    },
    {
      name: 'Sináptica',
      lottery: 'EuroDreams',
      description: 'IA diseñada específicamente para EuroDreams, con capacidad para analizar millones de combinaciones y seleccionar las más prometedoras.',
      icon: 'fa-network-wired'
    },
    {
      name: 'Nóvax',
      lottery: 'Lotería Nacional',
      description: 'IA especializada en Lotería Nacional que analiza tendencias históricas de números premiados para identificar patrones y generar predicciones.',
      icon: 'fa-microchip'
    },
    {
      name: 'Axioma',
      lottery: 'Lototurf',
      description: 'IA entrenada exclusivamente con datos de Lototurf, capaz de generar combinaciones optimizadas basándose en análisis estadísticos avanzados.',
      icon: 'fa-cogs'
    },
    {
      name: 'Fortunata',
      lottery: 'Bonoloto',
      description: 'IA especializada en Bonoloto que utiliza algoritmos de machine learning para identificar patrones y generar combinaciones con mayor probabilidad de premio.',
      icon: 'fa-lightbulb'
    }
  ];

  faqs: Faq[] = [
    {
      question: '¿Cómo funciona la suscripción?',
      answer: 'Nuestras suscripciones se renuevan automáticamente cada mes. Puedes cancelar en cualquier momento desde tu perfil de usuario sin compromiso ni penalización.',
      active: false
    },
    {
      question: '¿Puedo cambiar de plan?',
      answer: 'Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se aplicarán inmediatamente y se ajustará el cobro prorrateado.',
      active: false
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos tarjetas de crédito/débito (Visa, Mastercard, American Express), PayPal y transferencia bancaria.',
      active: false
    },
    {
      question: '¿Ofrecen garantía de devolución?',
      answer: 'Sí, ofrecemos una garantía de devolución de 14 días. Si no estás satisfecho con nuestro servicio, puedes solicitar un reembolso completo dentro de los primeros 14 días de tu suscripción.',
      active: false
    },
    {
      question: '¿Garantizan que voy a ganar?',
      answer: 'No podemos garantizar premios ya que los sorteos de lotería son juegos de azar. Nuestro sistema mejora las probabilidades estadísticas, pero el resultado final siempre será aleatorio.',
      active: false
    }
  ];

  testimonials: Testimonial[] = [
    {
      name: 'Carlos G.',
      plan: 'Plan Mensual',
      text: 'Llevo 3 meses usando el plan mensual y ya he recuperado la inversión con varios premios menores. Las predicciones son muy acertadas.',
      avatar: 'assets/img/avatar1.jpg'
    },
    {
      name: 'María L.',
      plan: 'Plan Pro',
      text: 'El plan Pro vale cada céntimo. He conseguido un premio importante en Euromillones siguiendo las combinaciones que me recomendó la IA.',
      avatar: 'assets/img/avatar2.jpg'
    },
    {
      name: 'Javier R.',
      plan: 'Plan Mensual',
      text: 'Me encanta la interfaz y lo fácil que es generar predicciones. He notado que los números que me sugiere suelen salir con más frecuencia.',
      avatar: 'assets/img/avatar3.jpg'
    }
  ];

  constructor(private el: ElementRef, private router: Router) {}

  ngOnInit(): void {
    // Inicialización del componente
  }

  selectPlan(plan: Plan): void {
    console.log(`Plan seleccionado: ${plan.name}`);

    // Si el plan es gratuito, redirigir directamente a la confirmación
    if (plan.id === 'basic') {
      // Para el plan básico, aunque tiene un precio de 1.22€, podemos decidir si queremos
      // que pase por la pasarela de pago o no. En este caso, lo enviamos a la pasarela.
      this.router.navigate(['/pasarela-pago', plan.id]);
    } else {
      // Para planes de pago, redirigir a la pasarela de pago
      this.router.navigate(['/pasarela-pago', plan.id]);
    }
  }

  toggleFaq(index: number): void {
    this.faqs[index].active = !this.faqs[index].active;
  }

  scrollToPlans(): void {
    const plansElement = this.el.nativeElement.querySelector('.plans-container');
    if (plansElement) {
      plansElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
