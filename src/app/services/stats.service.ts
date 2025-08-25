import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, interval } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface PublicStats {
  totalVisitors: number;
  totalUsers: number;
  totalSubscribers: number;
  lastUpdated: string;
}

export interface StatsResponse {
  success: boolean;
  data: PublicStats;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private apiUrl = `${environment.apiUrl}/stats`;
  private statsSubject = new BehaviorSubject<PublicStats>({
    totalVisitors: 0,
    totalUsers: 0,
    totalSubscribers: 0,
    lastUpdated: new Date().toISOString()
  });

  public stats$ = this.statsSubject.asObservable();

  constructor(private http: HttpClient) {
    // Cargar estadísticas al inicializar el servicio
    this.loadStats();
    
    // Actualizar estadísticas cada 5 minutos
    interval(5 * 60 * 1000).pipe(
      switchMap(() => this.getPublicStats())
    ).subscribe();
  }

  /**
   * Obtener estadísticas públicas desde el servidor
   */
  getPublicStats(): Observable<StatsResponse> {
    return this.http.get<StatsResponse>(`${this.apiUrl}/public`).pipe(
      tap(response => {
        if (response.success) {
          this.statsSubject.next(response.data);
        }
      }),
      catchError(error => {
        console.error('Error obteniendo estadísticas:', error);
        throw error;
      })
    );
  }

  /**
   * Registrar visita del usuario actual
   */
  trackVisitor(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/track-visitor`, {}).pipe(
      tap((response: any) => {
        // Actualizar estadísticas después de registrar visita
        if (response.success && response.data.isNewVisitor) {
          this.loadStats();
        }
      }),
      catchError(error => {
        console.error('Error registrando visitante:', error);
        // No es crítico si falla el tracking
        return [];
      })
    );
  }

  /**
   * Obtener estadísticas detalladas (requiere autenticación)
   */
  getDetailedStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/detailed`);
  }

  /**
   * Cargar estadísticas inmediatamente
   */
  private loadStats(): void {
    this.getPublicStats().subscribe();
  }

  /**
   * Formatear número con separadores de miles
   */
  formatNumber(num: number): string {
    return num.toLocaleString('es-ES');
  }

  /**
   * Obtener estadísticas actuales (valor inmediato)
   */
  getCurrentStats(): PublicStats {
    return this.statsSubject.value;
  }

  /**
   * Forzar actualización de estadísticas
   */
  refreshStats(): void {
    this.loadStats();
  }
}
