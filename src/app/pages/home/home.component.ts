import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { isPlatformBrowser } from '@angular/common';

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

  // Imágenes para el slider
  sliderImages = [
    { src: 'assets/img/slider/descarga.jfif', alt: 'Imagen 1' },
    { src: 'assets/img/slider/descarga (1).jfif', alt: 'Imagen 2' },
    { src: 'assets/img/slider/descarga (2).jfif', alt: 'Imagen 3' },
    { src: 'assets/img/slider/descarga (3).jfif', alt: 'Imagen 4' },
    { src: 'assets/img/slider/descarga (4).jfif', alt: 'Imagen 5' },
    { src: 'assets/img/slider/descarga (5).jfif', alt: 'Imagen 6' },
    { src: 'assets/img/slider/descarga (6).jfif', alt: 'Imagen 7' },
    { src: 'assets/img/slider/descarga (7).jfif', alt: 'Imagen 8' }
  ];

  // Configuración del slider
  noWrapSlides = false;
  showIndicators = true;
  interval = 5000; // Intervalo de cambio de imagen en milisegundos

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Verificar si el servicio de autenticación está disponible
    if (this.authService && this.authService.currentUser) {
      // Suscribirse al usuario actual
      this.authSubscription = this.authService.currentUser.subscribe({
        next: (user) => {
          this.currentUser = user;

          // Verificar si el usuario existe y tiene suscripciones de forma segura
          this.hasSubscriptions = !!this.currentUser?.subscriptions?.length;

          if (this.currentUser?.subscriptions) {
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
}
