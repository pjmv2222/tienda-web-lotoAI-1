import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

export interface UserPredictionStatus {
  gameType: string;
  currentCount: number;
  maxAllowed: number;
  remaining: number;
  canGenerate: boolean;
  predictions: any[];
  userPlan: string;
}

export interface UserPredictionSummary {
  userPlan: string;
  games: {
    gameType: string;
    currentCount: number;
    maxAllowed: number;
    remaining: number;
    canGenerate: boolean;
  }[];
  totalPredictionsToday: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserPredictionService {
  private apiUrl = `${environment.apiUrl}/predictions`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    return this.authService.getAuthHeaders();
  }

  /**
   * Obtener el estado de predicciones para un juego específico
   */
  getPredictionStatus(gameType: string): Observable<{success: boolean, data: UserPredictionStatus}> {
    return this.http.get<{success: boolean, data: UserPredictionStatus}>(
      `${this.apiUrl}/status/${gameType}`,
      { headers: this.getAuthHeaders() }
    );
  }

  /**
   * Obtener resumen de todas las predicciones del usuario
   */
  getPredictionSummary(): Observable<{success: boolean, data: UserPredictionSummary}> {
    return this.http.get<{success: boolean, data: UserPredictionSummary}>(
      `${this.apiUrl}/summary`,
      { headers: this.getAuthHeaders() }
    );
  }

  /**
   * Crear nueva predicción
   */
  createPrediction(gameType: string, predictionData: any): Observable<any> {
    return this.http.post(
      this.apiUrl,
      { gameType, predictionData },
      { headers: this.getAuthHeaders() }
    );
  }

  /**
   * Limpiar predicciones para un juego
   */
  clearPredictions(gameType: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${gameType}`,
      { headers: this.getAuthHeaders() }
    );
  }

  /**
   * Verificar si el usuario puede generar más predicciones
   */
  canGeneratePrediction(gameType: string): Observable<boolean> {
    return new Observable(observer => {
      this.getPredictionStatus(gameType).subscribe({
        next: (response) => {
          observer.next(response.data.canGenerate);
          observer.complete();
        },
        error: (error) => {
          console.error('Error verificando límite de predicciones:', error);
          observer.next(false); // Por seguridad, no permitir si hay error
          observer.complete();
        }
      });
    });
  }
} 