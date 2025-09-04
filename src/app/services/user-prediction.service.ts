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

// Nueva interfaz para el resumen de planes históricos
export interface PlanSummary {
  plan_id: string;
  plan_name: string;
  is_basic_plan: boolean;
  status: string;
  status_display: string;
  created_at: string | null;
  expires_at: string | null;
  price: string;
  predictions_used: {
    game_id: string;
    game_name: string;
    total_allowed: number;
    used: number;
    remaining: number;
  }[];
  games?: {
    game_id: string;
    game_name: string;
    total_allowed: number;
    used: number;
    remaining: number;
  }[];
}

export interface ProfilePredictionSummaryResponse {
  success: boolean;
  plans?: PlanSummary[];  // Formato anterior (opcional para compatibilidad)
  data?: {               // Formato nuevo del backend
    games: {
      game_id: string;
      game_name: string;
      total_allowed: number;
      used: number;
      remaining: number;
    }[];
  };
}

// Interfaces para el historial de predicciones
export interface PredictionHistoryItem {
  id: number;
  gameType: string;
  gameName: string;
  predictionData: any;
  createdAt: string;
  predictionDate: string;
}

export interface PredictionHistoryResponse {
  userId: number;
  totalPredictions: number;
  gamesWithPredictions: number;
  oldestPrediction: string | null;
  predictionsByGame: { [key: string]: PredictionHistoryItem[] };
  gameNames: { [key: string]: string };
}

@Injectable({
  providedIn: 'root'
})
export class UserPredictionService {
  private apiUrl = `${environment.apiUrl}/predictions/user`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    return this.authService.getAuthHeaders();
  }

  /**
   * Obtener el estado de predicciones para un juego específico
   * @param gameType Tipo de juego
   * @param plan Plan de suscripción específico (opcional)
   */
  getPredictionStatus(gameType: string, plan?: string): Observable<{success: boolean, data: UserPredictionStatus}> {
    let url = `${this.apiUrl}/status/${gameType}`;
    if (plan) {
      url += `?plan=${plan}`;
    }
    return this.http.get<{success: boolean, data: UserPredictionStatus}>(
      url,
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
   * Obtener resumen de predicciones específico para el componente de perfil
   */
  getProfilePredictionSummary(plan?: string): Observable<ProfilePredictionSummaryResponse> {
    let url = `${environment.apiUrl}/predictions/profile-summary`;
    if (plan) {
      url += `?plan=${plan}`;
    }
    return this.http.get<ProfilePredictionSummaryResponse>(
      url,
      { headers: this.getAuthHeaders() }
    );
  }

  /**
   * Obtener historial completo de predicciones del usuario
   */
  getPredictionHistory(): Observable<{success: boolean, data: PredictionHistoryResponse}> {
    return this.http.get<{success: boolean, data: PredictionHistoryResponse}>(
      `${this.apiUrl}/history`,
      { headers: this.getAuthHeaders() }
    );
  }

  /**
   * Crear nueva predicción
   */
  createPrediction(gameType: string, predictionData: any, subscriptionPlan?: string): Observable<any> {
    const body: any = { gameType, predictionData };
    
    // Agregar el plan si se especifica
    if (subscriptionPlan) {
      body.subscriptionPlan = subscriptionPlan;
    }
    
    return this.http.post(
      this.apiUrl,
      body,
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
   * @param gameType Tipo de juego
   * @param plan Plan de suscripción específico (opcional)
   */
  canGeneratePrediction(gameType: string, plan?: string): Observable<boolean> {
    return new Observable(observer => {
      this.getPredictionStatus(gameType, plan).subscribe({
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