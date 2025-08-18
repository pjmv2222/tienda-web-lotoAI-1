import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, map, catchError, switchMap, tap, shareReplay } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

export interface Subscription {
  id: string;
  planId: string;
  status: string;
  startDate: Date;
  endDate: Date;
}

export interface Payment {
  id: string;
  status: string;
  createdAt: Date;
  amount: number;
  paymentMethod: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = environment.apiUrl;
  
  // Cache para evitar múltiples llamadas API
  private subscriptionsCache$: Observable<Subscription[]> | null = null;
  private cacheTimestamp: number = 0;
  private readonly CACHE_DURATION = 30000; // 30 segundos
  private currentUserId: string | null = null;
  
  // Cache específico para hasActivePlan
  private planCache: Map<string, { result: boolean, timestamp: number }> = new Map();
  private readonly PLAN_CACHE_DURATION = 10000; // 10 segundos

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  /**
   * Verifica si el usuario actual tiene una suscripción activa
   * o un pago reciente (menos de 24 horas)
   */
  hasActiveSubscription(): Observable<boolean> {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      return of(false);
    }

    // Primero verificamos si hay una suscripción activa
    return this.http.get<any>(`${this.apiUrl}/subscriptions/check/${currentUser.id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      switchMap(response => {
        // Si hay una suscripción activa, devolvemos true
        if (response.hasActiveSubscription) {
          return of(true);
        }

        // Si no hay suscripción activa, verificamos pagos recientes
        return this.hasRecentPayment();
      }),
      catchError(error => {
        console.error('Error al verificar suscripción:', error);
        // Si hay un error al verificar la suscripción, verificamos pagos recientes
        return this.hasRecentPayment();
      })
    );
  }

  /**
   * Verifica si el usuario tiene un pago reciente (menos de 24 horas)
   * Esta es una solución temporal para usuarios que han pagado pero
   * cuya suscripción no se ha registrado correctamente
   */
  private hasRecentPayment(): Observable<boolean> {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      return of(false);
    }

    // Verificar en localStorage si hay un registro de pago reciente (solo en browser)
    if (isPlatformBrowser(this.platformId)) {
      try {
        const paymentData = localStorage.getItem('recent_payment');
        if (paymentData) {
          const payment = JSON.parse(paymentData);
          const paymentTime = new Date(payment.timestamp).getTime();
          const currentTime = new Date().getTime();
          const hoursDiff = (currentTime - paymentTime) / (1000 * 60 * 60);

          // Si el pago es de menos de 24 horas, consideramos que tiene una suscripción activa
          if (hoursDiff < 24) {
            console.log('Se encontró un pago reciente en localStorage');
            return of(true);
          }
        }
      } catch (e) {
        console.warn('Error al verificar pago reciente en localStorage:', e);
      }
    }

    // Si no hay registro en localStorage, verificamos en el servidor
    return this.http.get<any>(`${this.apiUrl}/payments/recent/${currentUser.id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => {
        const hasRecentPayment = response.hasRecentPayment || false;

        // Si hay un pago reciente, lo guardamos en localStorage (solo en browser)
        if (hasRecentPayment && isPlatformBrowser(this.platformId)) {
          try {
            localStorage.setItem('recent_payment', JSON.stringify({
              timestamp: new Date().toISOString(),
              userId: currentUser.id
            }));
          } catch (e) {
            console.warn('Error al guardar pago reciente en localStorage:', e);
          }
        }

        return hasRecentPayment;
      }),
      catchError(error => {
        console.error('Error al verificar pagos recientes:', error);
        return of(false);
      })
    );
  }

  /**
   * Verifica si el usuario tiene una suscripción activa de un plan específico
   * MEJORADO: Con caché para evitar múltiples llamadas
   */
  hasActivePlan(planId: string): Observable<boolean> {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      console.log('hasActivePlan: No hay usuario autenticado');
      return of(false);
    }

    // Crear clave de caché única para usuario y plan
    const cacheKey = `${currentUser.id}-${planId}`;
    const now = Date.now();
    
    // Verificar si hay resultado en caché válido
    const cached = this.planCache.get(cacheKey);
    if (cached && (now - cached.timestamp) < this.PLAN_CACHE_DURATION) {
      console.log(`✅ [SUBSCRIPTION-SERVICE] hasActivePlan('${planId}') - usando caché: ${cached.result}`);
      return of(cached.result);
    }

    console.log(`🔍 [SUBSCRIPTION-SERVICE] hasActivePlan('${planId}') - consultando servidor...`);

    // Ahora, para cualquier plan (incluido el básico), solo se considera activo si existe en la base de datos
    return this.getUserSubscriptions().pipe(
      map(subscriptions => {
        console.log('hasActivePlan: Todas las suscripciones del usuario:', subscriptions);
        if (!subscriptions || subscriptions.length === 0) {
          console.log('hasActivePlan: No se encontraron suscripciones activas');
          return false;
        }
        // Buscar si alguna suscripción activa coincide con el plan solicitado
        const hasMatchingPlan = subscriptions.some((subscription: any) => {
          const isActive = subscription.status === 'active';
          const hasMatchingPlanId = subscription.planId === planId;
          const hasMatchingPlanType = subscription.plan_type === planId;
          const planMatches = hasMatchingPlanId || hasMatchingPlanType;
          return isActive && planMatches;
        });
        
        // Guardar en caché
        this.planCache.set(cacheKey, { result: hasMatchingPlan, timestamp: now });
        
        console.log(`hasActivePlan: ¿Usuario tiene plan '${planId}' activo? ${hasMatchingPlan}`);
        return hasMatchingPlan;
      }),
      catchError(error => {
        console.error('hasActivePlan: Error al verificar plan específico:', error);
        console.error('hasActivePlan: Status:', error.status);
        console.error('hasActivePlan: Message:', error.message);
        // En caso de error, guardar false en caché por un tiempo muy corto
        this.planCache.set(cacheKey, { result: false, timestamp: now });
        return of(false);
      })
    );
  }

  /**
   * Obtiene todas las suscripciones del usuario actual
   */
  getUserSubscriptions(): Observable<Subscription[]> {
    const currentUser = this.authService.currentUserValue;
    console.log('🔍 [SUBSCRIPTION-SERVICE] getUserSubscriptions - currentUser:', currentUser);
    
    if (!currentUser) {
      console.warn('⚠️ [SUBSCRIPTION-SERVICE] No hay usuario logueado');
      return of([]);
    }

    // Verificar si el usuario cambió o si el caché expiró
    const now = Date.now();
    const cacheExpired = (now - this.cacheTimestamp) > this.CACHE_DURATION;
    const userChanged = this.currentUserId !== currentUser.id;

    if (this.subscriptionsCache$ && !cacheExpired && !userChanged) {
      console.log('🎯 [SUBSCRIPTION-SERVICE] Usando caché de suscripciones');
      return this.subscriptionsCache$;
    }

    // Limpiar caché si el usuario cambió
    if (userChanged) {
      console.log('👤 [SUBSCRIPTION-SERVICE] Usuario cambió, limpiando caché');
      this.subscriptionsCache$ = null;
      this.currentUserId = currentUser.id;
    }

    const url = `${this.apiUrl}/subscriptions/user/${currentUser.id}`;
    console.log('🔍 [SUBSCRIPTION-SERVICE] Llamando a URL:', url);

    this.subscriptionsCache$ = this.http.get<any>(url, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => {
        console.log('📨 [SUBSCRIPTION-SERVICE] Respuesta del servidor:', response);
        console.log('📨 [SUBSCRIPTION-SERVICE] response.subscriptions:', response.subscriptions);
        return response.subscriptions || [];
      }),
      tap(() => {
        this.cacheTimestamp = now;
        console.log('✅ [SUBSCRIPTION-SERVICE] Caché actualizado');
      }),
      shareReplay(1), // Compartir la misma respuesta entre múltiples suscriptores
      catchError(error => {
        console.error('❌ [SUBSCRIPTION-SERVICE] Error al obtener suscripciones:', error);
        console.error('❌ [SUBSCRIPTION-SERVICE] Error status:', error.status);
        console.error('❌ [SUBSCRIPTION-SERVICE] Error message:', error.message);
        // Limpiar caché en caso de error
        this.subscriptionsCache$ = null;
        return of([]);
      })
    );

    return this.subscriptionsCache$;
  }

  /**
   * Limpia todos los cachés de suscripciones y planes
   */
  public clearSubscriptionsCache(): void {
    console.log('🧹 [SUBSCRIPTION-SERVICE] Limpiando todos los cachés');
    this.subscriptionsCache$ = null;
    this.planCache.clear();
    this.cacheTimestamp = 0;
    this.currentUserId = null;
  }

  /**
   * Obtiene los headers de autenticación
   */
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.currentUserValue?.token;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}
