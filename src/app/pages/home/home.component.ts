import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { environment } from '../../../environments/environment';
import { SubscriptionService } from '../../services/subscription.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  hasSubscriptions: boolean = false;
  private authSubscription: Subscription | null = null;
  isBrowser: boolean;
  isProduction: boolean = environment.production; // Variable para controlar el modo de producción
  userId: string | null = null;
  subscriptionsCount: number = 0;
  environment = environment; // Exponer environment para usar en la plantilla

  // Imágenes para el slider con títulos descriptivos
  sliderImages = [
    { src: 'assets/img/slider/descarga.jfif', alt: 'Inteligencia Artificial para Loterías' },
    { src: 'assets/img/slider/descarga (1).jfif', alt: 'Predicciones basadas en datos' },
    { src: 'assets/img/slider/descarga (2).jfif', alt: 'Algoritmos avanzados de análisis' },
    { src: 'assets/img/slider/descarga (3).jfif', alt: 'Combinaciones optimizadas' },
    { src: 'assets/img/slider/descarga (4).jfif', alt: 'Estadísticas en tiempo real' },
    { src: 'assets/img/slider/descarga (5).jfif', alt: 'Tecnología de vanguardia' },
    { src: 'assets/img/slider/descarga (6).jfif', alt: 'Análisis predictivo' },
    { src: 'assets/img/slider/descarga (7).jfif', alt: 'Resultados personalizados' }
  ];

  // Grupos de imágenes para mostrar 4 por slide
  imageGroups: any[] = [];

  // Configuración del slider mejorada
  noWrapSlides = false; // Permite que el carrusel vuelva al principio
  showIndicators = true; // Muestra los indicadores de posición
  interval = 5000; // Intervalo de cambio de grupo de imágenes (5 segundos)

  constructor(
    private authService: AuthService,
    private subscriptionService: SubscriptionService,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /**
   * Método para verificar el estado de la suscripción del usuario
   * Se usa para depuración
   */
  checkSubscriptionStatus(): void {
    if (!this.currentUser) {
      console.error('No hay usuario autenticado');
      return;
    }

    console.log('Verificando estado de suscripción para el usuario:', this.currentUser.id);

    // Verificar suscripción activa usando el servicio
    this.subscriptionService.hasActiveSubscription().subscribe({
      next: (hasActive) => {
        console.log('¿Tiene suscripción activa?', hasActive);

        // Verificar planes específicos
        this.subscriptionService.hasActivePlan('basic').subscribe(hasBasic => {
          console.log('¿Tiene plan básico activo?', hasBasic);
        });

        this.subscriptionService.hasActivePlan('monthly').subscribe(hasMonthly => {
          console.log('¿Tiene plan mensual activo?', hasMonthly);
        });

        this.subscriptionService.hasActivePlan('pro').subscribe(hasPro => {
          console.log('¿Tiene plan pro activo?', hasPro);
        });
      },
      error: (error) => {
        console.error('Error al verificar suscripción:', error);
      }
    });

    // Obtener todas las suscripciones del usuario
    this.subscriptionService.getUserSubscriptions().subscribe({
      next: (subscriptions) => {
        console.log('Suscripciones del usuario desde el servicio:', subscriptions);
      },
      error: (error) => {
        console.error('Error al obtener suscripciones:', error);
      }
    });
  }

  ngOnInit(): void {
    // Agrupar imágenes en grupos de 4 para el carrusel
    this.createImageGroups();

    // Verificar si el servicio de autenticación está disponible
    if (this.authService && this.authService.currentUser) {
      // Suscribirse al usuario actual
      this.authSubscription = this.authService.currentUser.subscribe({
        next: (user) => {
          this.currentUser = user;
          
          if (this.currentUser) {
            this.userId = this.currentUser.id;
            this.subscriptionsCount = this.currentUser.subscriptions?.length ?? 0;
            this.hasSubscriptions = this.subscriptionsCount > 0;
            console.log('Suscripciones del usuario:', this.currentUser.subscriptions);
          } else {
            console.log('El usuario no tiene suscripciones activas');
          }
        },
        error: (error) => {
          console.error('Error al obtener el usuario actual:', error);
        }
      });
    } else {
      console.warn('El servicio de autenticación no está disponible');
    }
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción para evitar memory leaks
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  /**
   * Agrupa las imágenes en grupos de 4 para mostrarlas en el carrusel
   */
  createImageGroups(): void {
    const imagesPerGroup = 4; // Número de imágenes por grupo
    this.imageGroups = [];

    // Crear grupos de 4 imágenes
    for (let i = 0; i < this.sliderImages.length; i += imagesPerGroup) {
      const group = this.sliderImages.slice(i, i + imagesPerGroup);

      // Si el grupo tiene menos de 4 imágenes, completar con las primeras imágenes
      if (group.length < imagesPerGroup) {
        const remaining = imagesPerGroup - group.length;
        const additionalImages = this.sliderImages.slice(0, remaining);
        this.imageGroups.push([...group, ...additionalImages]);
      } else {
        this.imageGroups.push(group);
      }
    }
  }

  navigateToPlans(planType: string) {
    // Navegar a la página de planes con el plan específico
    this.router.navigate(['/planes'], { queryParams: { plan: planType } });
  }
}
