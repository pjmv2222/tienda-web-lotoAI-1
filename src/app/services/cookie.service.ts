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

    // Método mejorado para nombres de cookies sin caracteres especiales
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(';');
    
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }
    
    // Fallback con regex original para casos especiales
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
    console.log('✅ [CookieService] Usuario acepta todas las cookies');
    
    this.saveConsent({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
      preferences: true
    });
    
    console.log('✅ [CookieService] Todas las cookies guardadas correctamente');
  }

  /**
   * Rechaza todas las cookies no esenciales
   */
  rejectAll(): void {
    console.log('❌ [CookieService] Usuario rechaza cookies no esenciales');
    
    this.saveConsent({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
      preferences: false
    });
    
    console.log('✅ [CookieService] Solo cookies necesarias guardadas');
  }

  /**
   * Verifica si se debe mostrar el banner de cookies
   */
  shouldShowCookieBanner(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    
    const hasShown = this.getCookie(this.consentShownKey);
    const hasConsent = this.getCookie(this.consentKey);
    
    console.log('🍪 [CookieService] Verificando banner:', {
      hasShown: hasShown,
      hasConsent: hasConsent ? 'SÍ' : 'NO',
      shouldShow: hasShown !== 'true'
    });
    
    return hasShown !== 'true';
  }

  /**
   * Obtiene el estado actual del consentimiento
   */
  getConsentStatus(): { hasConsent: boolean, consent: CookieConsent | null } {
    if (!isPlatformBrowser(this.platformId)) {
      return { hasConsent: false, consent: null };
    }
    
    const consentCookie = this.getCookie(this.consentKey);
    
    if (consentCookie) {
      try {
        const consent = JSON.parse(consentCookie);
        return { hasConsent: true, consent };
      } catch (e) {
        console.error('Error al parsear consentimiento:', e);
        return { hasConsent: false, consent: null };
      }
    }
    
    return { hasConsent: false, consent: null };
  }

  /**
   * Resetea todas las preferencias de cookies (útil para testing o cambio de opinión del usuario)
   */
  resetAllCookiePreferences(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    console.log('🧹 [CookieService] Reseteando todas las preferencias de cookies');
    
    // Eliminar cookies de consentimiento
    this.deleteCookie(this.consentKey, { path: '/' });
    this.deleteCookie(this.consentShownKey, { path: '/' });
    
    // Resetear el estado interno
    this.consentSubject.next(this.defaultConsent);
    
    console.log('✅ [CookieService] Preferencias reseteadas');
  }

  /**
   * Muestra información detallada sobre el estado de las cookies (para debugging)
   */
  debugCookieStatus(): void {
    if (!isPlatformBrowser(this.platformId)) {
      console.log('🍪 [CookieService] No está en el browser');
      return;
    }
    
    const status = this.getConsentStatus();
    const shouldShow = this.shouldShowCookieBanner();
    
    console.log('🍪 [CookieService] Estado completo de cookies:', {
      hasConsent: status.hasConsent,
      consent: status.consent,
      shouldShowBanner: shouldShow,
      consentCookie: this.getCookie(this.consentKey),
      shownCookie: this.getCookie(this.consentShownKey),
      allCookies: document.cookie
    });
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
