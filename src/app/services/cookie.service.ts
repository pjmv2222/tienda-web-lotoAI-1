import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

export interface CookieConsent {
  necessary: boolean; // Siempre true, no se puede rechazar
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private consentKey = 'cookie_consent';
  private consentShownKey = 'cookie_consent_shown';
  private defaultConsent: CookieConsent = {
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
    preferences: false
  };

  private consentSubject = new BehaviorSubject<CookieConsent>(this.defaultConsent);
  public consent$: Observable<CookieConsent> = this.consentSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Cargar el consentimiento guardado
      const savedConsent = this.getCookie(this.consentKey);
      if (savedConsent) {
        try {
          const parsedConsent = JSON.parse(savedConsent);
          this.consentSubject.next({
            ...this.defaultConsent,
            ...parsedConsent
          });
        } catch (e) {
          console.error('Error al parsear el consentimiento de cookies:', e);
        }
      }
    }
  }

  /**
   * Establece una cookie
   */
  setCookie(name: string, value: string, options: CookieOptions = {}): void {
    if (!isPlatformBrowser(this.platformId)) return;

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (options.expires) {
      const expireDate = options.expires instanceof Date 
        ? options.expires 
        : new Date(Date.now() + options.expires * 24 * 60 * 60 * 1000);
      cookieString += `; expires=${expireDate.toUTCString()}`;
    }

    if (options.path) cookieString += `; path=${options.path}`;
    if (options.domain) cookieString += `; domain=${options.domain}`;
    if (options.secure) cookieString += '; secure';
    if (options.sameSite) cookieString += `; samesite=${options.sameSite}`;

    document.cookie = cookieString;
  }

  /**
   * Obtiene el valor de una cookie
   */
  getCookie(name: string): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    const matches = document.cookie.match(
      new RegExp(`(?:^|; )${encodeURIComponent(name)}=([^;]*)`)
    );
    return matches ? decodeURIComponent(matches[1]) : null;
  }

  /**
   * Elimina una cookie
   */
  deleteCookie(name: string, options: CookieOptions = {}): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.setCookie(name, '', {
      ...options,
      expires: new Date(0)
    });
  }

  /**
   * Guarda el consentimiento de cookies
   */
  saveConsent(consent: Partial<CookieConsent>): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const newConsent = {
      ...this.consentSubject.value,
      ...consent,
      necessary: true // Siempre true
    };

    this.consentSubject.next(newConsent);
    
    // Guardar en una cookie para persistencia
    this.setCookie(
      this.consentKey, 
      JSON.stringify(newConsent), 
      {
        expires: 365, // 1 año
        path: '/',
        sameSite: 'Lax'
      }
    );

    // Marcar que se ha mostrado el banner
    this.setCookie(
      this.consentShownKey,
      'true',
      {
        expires: 365,
        path: '/',
        sameSite: 'Lax'
      }
    );
  }

  /**
   * Acepta todas las cookies
   */
  acceptAll(): void {
    this.saveConsent({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
      preferences: true
    });
  }

  /**
   * Rechaza todas las cookies excepto las necesarias
   */
  rejectAll(): void {
    this.saveConsent({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
      preferences: false
    });
  }

  /**
   * Verifica si se debe mostrar el banner de cookies
   */
  shouldShowCookieBanner(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return this.getCookie(this.consentShownKey) !== 'true';
  }

  /**
   * Verifica si una categoría de cookies está permitida
   */
  isCategoryAllowed(category: keyof CookieConsent): boolean {
    return category === 'necessary' || this.consentSubject.value[category];
  }

  /**
   * Establece una cookie solo si la categoría está permitida
   */
  setConditionalCookie(
    name: string, 
    value: string, 
    category: keyof CookieConsent, 
    options: CookieOptions = {}
  ): boolean {
    if (this.isCategoryAllowed(category)) {
      this.setCookie(name, value, options);
      return true;
    }
    return false;
  }
}
