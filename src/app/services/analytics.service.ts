import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CookieService } from './cookie.service';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private initialized = false;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /**
   * Inicializa el servicio de análisis si el usuario ha dado su consentimiento
   */
  initializeAnalytics(googleAnalyticsId: string): void {
    if (!isPlatformBrowser(this.platformId) || this.initialized) return;

    // Verificar si el usuario ha aceptado las cookies analíticas
    this.cookieService.consent$.subscribe(consent => {
      if (consent.analytics) {
        this.setupGoogleAnalytics(googleAnalyticsId);
        this.trackPageViews();
      } else if (this.initialized) {
        // Si el usuario revoca el consentimiento, desactivar el seguimiento
        this.disableAnalytics();
      }
    });
  }

  /**
   * Configura Google Analytics
   */
  private setupGoogleAnalytics(googleAnalyticsId: string): void {
    if (this.initialized) return;

    // Crear el script de Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
    document.head.appendChild(script);

    // Inicializar dataLayer y gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    
    // Configurar para respetar la privacidad
    window.gtag('config', googleAnalyticsId, {
      'anonymize_ip': true,
      'cookie_flags': 'SameSite=None;Secure',
      'cookie_expires': 365 * 24 * 60 * 60 // 1 año en segundos
    });

    this.initialized = true;
  }

  /**
   * Configura el seguimiento de vistas de página
   */
  private trackPageViews(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if (this.initialized && window.gtag) {
        window.gtag('event', 'page_view', {
          page_path: event.urlAfterRedirects
        });
      }
    });
  }

  /**
   * Desactiva el seguimiento de análisis
   */
  private disableAnalytics(): void {
    if (!isPlatformBrowser(this.platformId) || !this.initialized) return;

    // Eliminar cookies de Google Analytics
    this.cookieService.deleteCookie('_ga');
    this.cookieService.deleteCookie('_gid');
    this.cookieService.deleteCookie('_gat');
    
    // Otras cookies de GA que podrían existir
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const name = cookie.split('=')[0].trim();
      if (name.startsWith('_ga') || name.startsWith('_gid') || name.startsWith('_gat')) {
        this.cookieService.deleteCookie(name);
      }
    }

    this.initialized = false;
  }

  /**
   * Registra un evento personalizado
   */
  trackEvent(eventCategory: string, eventAction: string, eventLabel?: string, eventValue?: number): void {
    if (!isPlatformBrowser(this.platformId) || !this.initialized || !window.gtag) return;

    window.gtag('event', eventAction, {
      'event_category': eventCategory,
      'event_label': eventLabel,
      'value': eventValue
    });
  }
}
