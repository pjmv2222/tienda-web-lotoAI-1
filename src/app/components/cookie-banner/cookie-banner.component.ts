import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CookieService, CookieConsent } from '../../services/cookie.service';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.css']
})
export class CookieBannerComponent implements OnInit {
  showBanner = false;
  showDetails = false;
  consent: CookieConsent = {
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
    preferences: false
  };

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    console.log('CookieBannerComponent inicializado');
    
    // Verificar si se debe mostrar el banner basado en el consentimiento previo
    this.showBanner = this.cookieService.shouldShowCookieBanner();
    
    console.log('¿Debe mostrarse el banner de cookies?:', this.showBanner);

    // Obtener el consentimiento actual
    this.cookieService.consent$.subscribe(consent => {
      this.consent = { ...consent };
      console.log('Consentimiento actual:', this.consent);
    });
  }

  acceptAll(): void {
    console.log('👤 [CookieBanner] Usuario hace clic en "Aceptar todas"');
    this.cookieService.acceptAll();
    this.showBanner = false;
    this.showDetails = false;
    console.log('👤 [CookieBanner] Banner ocultado después de aceptar todas');
  }

  rejectAll(): void {
    console.log('👤 [CookieBanner] Usuario hace clic en "Solo necesarias"');
    this.cookieService.rejectAll();
    this.showBanner = false;
    this.showDetails = false;
    console.log('👤 [CookieBanner] Banner ocultado después de rechazar opcionales');
  }

  savePreferences(): void {
    console.log('👤 [CookieBanner] Usuario guarda preferencias personalizadas:', this.consent);
    this.cookieService.saveConsent(this.consent);
    this.showBanner = false;
    this.showDetails = false;
    console.log('👤 [CookieBanner] Banner ocultado después de guardar preferencias');
  }

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
    console.log('👤 [CookieBanner] Panel de detalles:', this.showDetails ? 'ABIERTO' : 'CERRADO');
  }

  closeBanner(): void {
    // Solo oculta el banner sin guardar preferencias
    this.showBanner = false;
    this.showDetails = false;
    console.log('👤 [CookieBanner] Banner cerrado sin guardar preferencias');
  }
}
