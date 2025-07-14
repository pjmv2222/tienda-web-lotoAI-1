import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';
import { SessionWarningModalComponent } from './components/session-warning-modal/session-warning-modal.component';
import { AnalyticsService } from './services/analytics.service';
import { CookieService } from './services/cookie.service';

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
  constructor(
    private analyticsService: AnalyticsService,
    private cookieService: CookieService
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
  }
}
