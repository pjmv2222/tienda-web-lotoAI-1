import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { RouterModule, Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
  activePlanType: string = '';
  private authSubscription: Subscription | null = null;
  private destroy$ = new Subject<void>();
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
    console.log('Estado actual - hasSubscriptions:', this.hasSubscriptions);
    console.log('Estado actual - activePlanType:', this.activePlanType);

    // Recargar las suscripciones
    this.loadUserSubscriptions();

    // Verificar suscripción activa usando el servicio
    this.subscriptionService.hasActiveSubscription()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (hasActive) => {
          console.log('¿Tiene suscripción activa?', hasActive);

          // Verificar planes específicos
          this.subscriptionService.hasActivePlan('basic')
            .pipe(takeUntil(this.destroy$))
            .subscribe(hasBasic => {
              console.log('¿Tiene plan básico activo?', hasBasic);
            });

          this.subscriptionService.hasActivePlan('monthly')
            .pipe(takeUntil(this.destroy$))
            .subscribe(hasMonthly => {
              console.log('¿Tiene plan mensual activo?', hasMonthly);
            });

          this.subscriptionService.hasActivePlan('pro')
            .pipe(takeUntil(this.destroy$))
            .subscribe(hasPro => {
              console.log('¿Tiene plan pro activo?', hasPro);
            });
        },
        error: (error) => {
          console.error('Error al verificar suscripción:', error);
        }
      });
  }

  ngOnInit(): void {
    // Agrupar imágenes en grupos de 4 para el carrusel
    this.createImageGroups();

    // Verificar si el servicio de autenticación está disponible
    if (this.authService && this.authService.currentUser) {
      // Suscribirse al usuario actual
      this.authSubscription = this.authService.currentUser
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (user) => {
            this.currentUser = user;
            
            if (this.currentUser) {
              this.userId = this.currentUser.id;
              
              // Obtener información completa del usuario desde el backend
            this.loadUserProfile();
            
            // Verificar suscripciones usando SubscriptionService
            this.loadUserSubscriptions();
          } else {
            console.log('El usuario no está autenticado');
            this.hasSubscriptions = false;
            this.activePlanType = '';
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
    // Cancelar todas las suscripciones para evitar memory leaks
    this.destroy$.next();
    this.destroy$.complete();
    
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

  /**
   * Extrae solo el nombre del usuario (incluyendo nombres compuestos) sin apellidos
   * Ejemplos:
   * - "Pedro Julian Martín Velasco" → "Pedro Julian"
   * - "Ana García López" → "Ana"
   * - "María José" → "María José"
   */
  getDisplayName(): string {
    if (!this.currentUser) return '';
    
    // Usar 'nombre' si está disponible, sino 'name' como fallback
    const fullName = this.currentUser.nombre || this.currentUser.name || '';
    if (!fullName) return '';
    
    // Dividir el nombre completo por espacios
    const nameParts = fullName.trim().split(' ').filter(part => part.length > 0);
    
    if (nameParts.length === 0) return '';
    if (nameParts.length === 1) return nameParts[0]; // Solo un nombre
    
    // Para nombres compuestos, determinar cuántas partes son nombre vs apellido
    // Estrategia: Los primeros 1-2 elementos son generalmente nombres
    // Si hay 2 partes, asumir que es nombre simple + apellido
    // Si hay 3+ partes, asumir que las primeras 2 son nombres compuestos
    if (nameParts.length === 2) {
      // "Pedro García" → "Pedro" (nombre simple + apellido)
      return nameParts[0];
    } else if (nameParts.length >= 3) {
      // "Pedro Julian Martín Velasco" → "Pedro Julian" (nombre compuesto + apellidos)
      // "María José García López" → "María José" (nombre compuesto + apellidos)
      return `${nameParts[0]} ${nameParts[1]}`;
    }
    
    return nameParts[0]; // Fallback
  }

  /**
   * Carga el perfil completo del usuario desde el backend
   */
  private loadUserProfile(): void {
    if (!this.currentUser) return;

    this.authService.getCurrentUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.user) {
            // Actualizar la información del usuario
            this.currentUser = {
              ...this.currentUser,
              ...response.user
            };
            console.log('Información del usuario actualizada:', this.currentUser);
          }
        },
        error: (error) => {
          console.error('Error al cargar el perfil del usuario:', error);
        }
      });
  }

  /**
   * Carga las suscripciones del usuario usando SubscriptionService
   */
  private loadUserSubscriptions(): void {
    if (!this.currentUser) return;

    // Verificar cada tipo de plan para determinar cuál tiene activo
    this.subscriptionService.hasActivePlan('basic')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (hasBasic) => {
          if (hasBasic) {
            this.hasSubscriptions = true;
            this.activePlanType = 'Plan Básico';
            return;
          }
          
          // Si no tiene básico, verificar mensual
          this.subscriptionService.hasActivePlan('monthly')
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (hasMonthly) => {
                if (hasMonthly) {
                  this.hasSubscriptions = true;
                  this.activePlanType = 'Plan Mensual';
                  return;
                }
                
                // Si no tiene mensual, verificar pro
                this.subscriptionService.hasActivePlan('pro')
                  .pipe(takeUntil(this.destroy$))
                  .subscribe({
                    next: (hasPro) => {
                      if (hasPro) {
                        this.hasSubscriptions = true;
                        this.activePlanType = 'Plan Pro';
                      } else {
                        // No tiene ningún plan activo
                        this.hasSubscriptions = false;
                        this.activePlanType = '';
                      }
                    },
                    error: (error) => {
                      console.error('Error al verificar plan pro:', error);
                      this.hasSubscriptions = false;
                      this.activePlanType = '';
                    }
                  });
              },
              error: (error) => {
                console.error('Error al verificar plan mensual:', error);
                this.hasSubscriptions = false;
                this.activePlanType = '';
              }
            });
        },
        error: (error) => {
          console.error('Error al verificar plan básico:', error);
          this.hasSubscriptions = false;
          this.activePlanType = '';
        }
      });
  }
}
