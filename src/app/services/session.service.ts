import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, fromEvent, merge, timer, Subject } from 'rxjs';
import { debounceTime, throttleTime, takeUntil } from 'rxjs/operators';

export interface SessionConfig {
  warningTime: number;      // Tiempo antes de mostrar advertencia (en minutos)
  sessionTimeout: number;   // Tiempo total de sesión (en minutos) 
  inactivityTimeout: number; // Tiempo de inactividad antes de advertencia (en minutos)
}

export interface SessionWarningData {
  timeLeft: number;        // Tiempo restante en segundos
  isVisible: boolean;      // Si el modal debe mostrarse
  isSessionExpired: boolean; // Si la sesión ya expiró
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private config: SessionConfig = {
    warningTime: 2,          // Advertir 2 minutos antes (más frecuente)
    sessionTimeout: 30,      // Sesión de 30 minutos (más realista para JWT)
    inactivityTimeout: 15    // Advertir después de 15 minutos de inactividad (más proactivo)
  };

  private sessionWarningSubject = new BehaviorSubject<SessionWarningData>({
    timeLeft: 0,
    isVisible: false,
    isSessionExpired: false
  });

  private activityTimer?: any;
  private warningTimer?: any;
  private sessionTimer?: any;
  private countdownTimer?: any;
  private destroy$ = new Subject<void>();
  
  private sessionStartTime: number = 0;
  private lastActivityTime: number = 0;
  private isWarningActive = false;
  private autoRenewTimer?: any;  // Timer para renovación automática

  public sessionWarning$ = this.sessionWarningSubject.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService?: any  // Inyección opcional para evitar dependencia circular
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeActivityTracking();
    }
  }

  /**
   * Configura la inyección del AuthService después de la inicialización
   * Esto evita la dependencia circular
   */
  setAuthService(authService: any): void {
    this.authService = authService;
  }

  /**
   * Inicia una nueva sesión
   */
  startSession(): void {
    console.log('🟢 [SessionService] Iniciando nueva sesión');
    
    this.sessionStartTime = Date.now();
    this.lastActivityTime = Date.now();
    this.isWarningActive = false;
    
    this.clearAllTimers();
    this.hideWarningModal();
    
    if (isPlatformBrowser(this.platformId)) {
      this.setupTimers();
    }
  }

  /**
   * Termina la sesión actual
   */
  endSession(): void {
    console.log('🔴 [SessionService] Terminando sesión');
    
    this.clearAllTimers();
    this.hideWarningModal();
    this.sessionStartTime = 0;
    this.lastActivityTime = 0;
  }

  /**
   * Extiende la sesión actual (renovar token)
   */
  extendSession(): void {
    console.log('🔄 [SessionService] Extendiendo sesión');
    
    this.sessionStartTime = Date.now();
    this.lastActivityTime = Date.now();
    this.isWarningActive = false;
    
    this.clearAllTimers();
    this.hideWarningModal();
    this.setupTimers();
  }

  /**
   * Registra actividad del usuario
   */
  registerActivity(): void {
    this.lastActivityTime = Date.now();
    
    // Si hay una advertencia activa y el usuario está activo, resetear timers
    if (this.isWarningActive) {
      console.log('🔄 [SessionService] Usuario activo durante advertencia, reseteando timers');
      this.isWarningActive = false;
      this.hideWarningModal();
      this.clearAllTimers();
      this.setupTimers();
    }
  }

  /**
   * Muestra modal de sesión próxima a expirar
   */
  showSessionWarningModal(timeLeft: number): void {
    console.log(`⚠️ [SessionService] Mostrando advertencia de sesión: ${timeLeft} segundos restantes`);
    
    this.isWarningActive = true;
    this.sessionWarningSubject.next({
      timeLeft,
      isVisible: true,
      isSessionExpired: false
    });

    this.startCountdown(timeLeft);
  }

  /**
   * Muestra modal de sesión expirada
   */
  showSessionExpiredModal(): void {
    console.log('❌ [SessionService] Mostrando modal de sesión expirada');
    
    this.clearAllTimers();
    this.sessionWarningSubject.next({
      timeLeft: 0,
      isVisible: true,
      isSessionExpired: true
    });
  }

  /**
   * Oculta el modal de advertencia
   */
  hideWarningModal(): void {
    this.sessionWarningSubject.next({
      timeLeft: 0,
      isVisible: false,
      isSessionExpired: false
    });
  }

  /**
   * Obtiene el tiempo restante de sesión en minutos
   */
  getSessionTimeLeft(): number {
    if (this.sessionStartTime === 0) return 0;
    
    const elapsed = (Date.now() - this.sessionStartTime) / (1000 * 60);
    const remaining = this.config.sessionTimeout - elapsed;
    
    return Math.max(0, remaining);
  }

  /**
   * Obtiene el tiempo desde la última actividad en minutos
   */
  getTimeSinceLastActivity(): number {
    if (this.lastActivityTime === 0) return 0;
    
    return (Date.now() - this.lastActivityTime) / (1000 * 60);
  }

  /**
   * Verifica si la sesión está expirada
   */
  isSessionExpired(): boolean {
    return this.getSessionTimeLeft() <= 0;
  }

  /**
   * Verifica si el usuario está inactivo
   */
  isUserInactive(): boolean {
    return this.getTimeSinceLastActivity() >= this.config.inactivityTimeout;
  }

  private initializeActivityTracking(): void {
    // Eventos que indican actividad del usuario
    const activityEvents = [
      'mousedown', 'mousemove', 'keypress', 'scroll', 
      'touchstart', 'click', 'keydown'
    ];

    const activity$ = merge(
      ...activityEvents.map(event => fromEvent(document, event))
    );

    // Throttle para evitar demasiadas llamadas
    activity$.pipe(
      throttleTime(1000), // Máximo una vez por segundo
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.registerActivity();
    });
  }

  private setupTimers(): void {
    console.log('🔧 [SessionService] Configurando timers de sesión');
    
    // Timer para renovación automática del token (5 minutos antes de expirar)
    const autoRenewTime = (this.config.sessionTimeout - 5) * 60 * 1000;
    if (autoRenewTime > 0) {
      this.autoRenewTimer = setTimeout(() => {
        this.attemptAutoTokenRenewal();
      }, autoRenewTime);
    }

    // Timer para advertencia de inactividad
    this.activityTimer = setTimeout(() => {
      if (this.getTimeSinceLastActivity() >= this.config.inactivityTimeout) {
        const sessionTimeLeft = this.getSessionTimeLeft();
        if (sessionTimeLeft > 0) {
          this.showSessionWarningModal(Math.floor(sessionTimeLeft * 60));
        }
      }
    }, this.config.inactivityTimeout * 60 * 1000);

    // Timer para advertencia de sesión próxima a expirar
    const warningTime = (this.config.sessionTimeout - this.config.warningTime) * 60 * 1000;
    this.warningTimer = setTimeout(() => {
      const timeLeft = this.config.warningTime * 60; // en segundos
      this.showSessionWarningModal(timeLeft);
    }, warningTime);

    // Timer para expiración de sesión
    this.sessionTimer = setTimeout(() => {
      this.showSessionExpiredModal();
    }, this.config.sessionTimeout * 60 * 1000);
  }

  /**
   * Intenta renovar automáticamente el token antes de que expire
   */
  private attemptAutoTokenRenewal(): void {
    console.log('🔄 [SessionService] Intentando renovación automática de token');
    
    if (this.authService && typeof this.authService.refreshCurrentToken === 'function') {
      this.authService.refreshCurrentToken().subscribe({
        next: (response: any) => {
          console.log('✅ [SessionService] Token renovado automáticamente');
          // Extender la sesión con el nuevo token
          this.extendSession();
        },
        error: (error: any) => {
          console.warn('⚠️ [SessionService] Fallo renovación automática:', error);
          // Si falla la renovación automática, mostrar advertencia al usuario
          const timeLeft = this.config.warningTime * 60;
          this.showSessionWarningModal(timeLeft);
        }
      });
    } else {
      console.warn('⚠️ [SessionService] AuthService no disponible para renovación automática');
      // Fallback: mostrar advertencia al usuario
      const timeLeft = this.config.warningTime * 60;
      this.showSessionWarningModal(timeLeft);
    }
  }

  private startCountdown(seconds: number): void {
    let timeLeft = seconds;
    
    this.countdownTimer = setInterval(() => {
      timeLeft--;
      
      this.sessionWarningSubject.next({
        timeLeft,
        isVisible: true,
        isSessionExpired: false
      });
      
      if (timeLeft <= 0) {
        clearInterval(this.countdownTimer);
        this.showSessionExpiredModal();
      }
    }, 1000);
  }

  private clearAllTimers(): void {
    console.log('🧹 [SessionService] Limpiando todos los timers');
    
    if (this.activityTimer) {
      clearTimeout(this.activityTimer);
      this.activityTimer = undefined;
    }
    
    if (this.warningTimer) {
      clearTimeout(this.warningTimer);
      this.warningTimer = undefined;
    }
    
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer);
      this.sessionTimer = undefined;
    }
    
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = undefined;
    }
    
    if (this.autoRenewTimer) {
      clearTimeout(this.autoRenewTimer);
      this.autoRenewTimer = undefined;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.clearAllTimers();
  }
} 