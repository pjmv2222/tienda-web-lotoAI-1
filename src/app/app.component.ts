import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';
import { SessionWarningModalComponent } from './components/session-warning-modal/session-warning-modal.component';
import { AnalyticsService } from './services/analytics.service';
import { CookieService } from './services/cookie.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CookieBannerComponent,
    SessionWarningModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'tienda-web-loto-ai';
  
  // Versión de cache para forzar renovación cuando sea necesario
  private static readonly CACHE_VERSION = 'v2025.1.14-auth-fix';

  constructor(
    private analyticsService: AnalyticsService,
    private cookieService: CookieService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Inicializar el servicio de análisis con tu ID de Google Analytics
    // Reemplaza 'UA-XXXXXXXXX-X' con tu ID real cuando lo tengas
    this.analyticsService.initializeAnalytics('UA-XXXXXXXXX-X');
    
    // Agregar funciones globales para debugging de cookies (solo en desarrollo)
    if (typeof window !== 'undefined') {
      (window as any).debugCookies = () => this.cookieService.debugCookieStatus();
      (window as any).resetCookies = () => this.cookieService.resetAllCookiePreferences();
      
      console.log('🔧 [AppComponent] Funciones de debugging disponibles:');
      console.log('   debugCookies() - Muestra el estado actual de las cookies');
      console.log('   resetCookies() - Resetea todas las preferencias de cookies');
    }

    // Verificar y limpiar tokens corruptos al inicializar la app
    this.checkAndCleanCorruptedTokens();
  }

  /**
   * Detecta y limpia tokens JWT corruptos o que causan errores 403
   */
  private checkAndCleanCorruptedTokens(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      // Verificar versión de cache almacenada
      const storedVersion = localStorage.getItem('app_cache_version');
      
      if (storedVersion !== AppComponent.CACHE_VERSION) {
        console.log('🔄 [AppComponent] Nueva versión detectada - limpiando cache y tokens');
        
        // Limpiar localStorage relacionado con autenticación
        const authKeys = ['currentUser', 'auth_token', 'refresh_token'];
        authKeys.forEach(key => {
          if (localStorage.getItem(key)) {
            localStorage.removeItem(key);
            console.log(`🗑️ [AppComponent] Removed ${key} from localStorage`);
          }
        });

        // Limpiar cookies de autenticación
        if (this.cookieService) {
          this.cookieService.deleteCookie('auth_token');
          this.cookieService.deleteCookie('refresh_token');
          console.log('🗑️ [AppComponent] Cleared auth cookies');
        }

        // Marcar nueva versión como aplicada
        localStorage.setItem('app_cache_version', AppComponent.CACHE_VERSION);
        
        console.log('✅ [AppComponent] Cache limpiado exitosamente');
      }
    } catch (error) {
      console.error('❌ [AppComponent] Error limpiando tokens corruptos:', error);
    }
  }
}
