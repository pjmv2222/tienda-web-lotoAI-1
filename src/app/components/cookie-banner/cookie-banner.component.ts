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
    // Forzar la visualización del banner para pruebas
    this.showBanner = true;

    // También verificar con el servicio (comentado para pruebas)
    // this.showBanner = this.cookieService.shouldShowCookieBanner();

    console.log('CookieBannerComponent inicializado, showBanner:', this.showBanner);

    // Obtener el consentimiento actual
    this.cookieService.consent$.subscribe(consent => {
      this.consent = { ...consent };
      console.log('Consentimiento actual:', this.consent);
    });
  }

  acceptAll(): void {
    this.cookieService.acceptAll();
    this.showBanner = false;
  }

  rejectAll(): void {
    this.cookieService.rejectAll();
    this.showBanner = false;
  }

  savePreferences(): void {
    this.cookieService.saveConsent(this.consent);
    this.showBanner = false;
    this.showDetails = false;
  }

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  closeBanner(): void {
    // Solo oculta el banner sin guardar preferencias
    this.showBanner = false;
  }
}
