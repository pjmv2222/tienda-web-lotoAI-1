import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LotteryResult {
  juego: string;
  nombreJuego: string;
  fecha: string;
  sorteo?: string;
  numeros: number[];
  estrellas?: number[];
  complementario?: number;
  reintegro?: number;
  clave?: number;
  dream?: number;
  caballo?: number;
  millon?: string;
  joker?: string;
  numero?: string;
}

export interface LotteryData {
  botes: { [key: string]: string };
  resultados: LotteryResult[];
  timestamp: string;
}

interface BackendResponse {
  success: boolean;
  data: LotteryResult[];
  lastUpdated: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LotteryResultsService {
  private readonly apiUrl = environment.production 
    ? 'https://loto-ia.com/api' 
    : 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene solo los últimos resultados desde el backend
   */
  getLatestResults(): Observable<LotteryResult[]> {
    return this.http.get<BackendResponse>(`${this.apiUrl}/lottery-results/latest`)
      .pipe(
        map(response => response.data || []),
        catchError(error => {
          console.error('Error al obtener resultados del backend:', error);
          return of(this.getFallbackData());
        })
      );
  }

  /**
   * Obtiene solo los botes actuales desde el backend
   */
  getCurrentJackpots(): Observable<{ [key: string]: string }> {
    return this.http.get<any>(`${this.apiUrl}/lottery-results/jackpots`)
      .pipe(
        map(response => response.data || {}),
        catchError(error => {
          console.error('Error al obtener botes del backend:', error);
          return of({});
        })
      );
  }

  /**
   * Obtiene resultado específico de un juego
   */
  getGameResult(gameName: string): Observable<LotteryResult | null> {
    return this.getLatestResults().pipe(
      map(results => {
        const result = results.find(r => r.juego === gameName);
        return result || null;
      })
    );
  }

  /**
   * Mapea nombres de juegos a nombres mostrados
   */
  getGameDisplayName(gameName: string): string {
    const displayNames: { [key: string]: string } = {
      'euromillones': 'EuroMillones',
      'primitiva': 'La Primitiva',
      'bonoloto': 'Bonoloto',
      'elgordo': 'El Gordo de la Primitiva',
      'eurodreams': 'EuroDreams',
      'lototurf': 'Lototurf',
      'loterianacional': 'Lotería Nacional'
    };
    return displayNames[gameName] || gameName;
  }

  /**
   * Obtiene el color tema para cada juego
   */
  getGameColor(gameName: string): string {
    const colors: { [key: string]: string } = {
      'euromillones': '#FF6B35',
      'primitiva': '#0066CC',
      'bonoloto': '#00AA55',
      'elgordo': '#CC0066',
      'eurodreams': '#6633CC',
      'lototurf': '#FF9900',
      'loterianacional': '#CC3300'
    };
    return colors[gameName] || '#666666';
  }

  /**
   * Datos de fallback en caso de error del backend
   */
  private getFallbackData(): LotteryResult[] {
    return [
      {
        juego: 'euromillones',
        nombreJuego: 'EuroMillones',
        fecha: '2024-01-16',
        sorteo: 'Sorteo 006/2024',
        numeros: [7, 12, 18, 33, 42],
        estrellas: [3, 8],
        millon: 'ABC12345'
      },
      {
        juego: 'primitiva',
        nombreJuego: 'La Primitiva',
        fecha: '2024-01-15',
        sorteo: 'Sorteo 005/2024',
        numeros: [5, 14, 23, 31, 45, 49],
        complementario: 12,
        reintegro: 7,
        joker: '1234567'
      },
      {
        juego: 'bonoloto',
        nombreJuego: 'Bonoloto',
        fecha: '2024-01-16',
        sorteo: 'Sorteo 012/2024',
        numeros: [2, 11, 19, 28, 35, 44],
        complementario: 8,
        reintegro: 3
      },
      {
        juego: 'elgordo',
        nombreJuego: 'El Gordo de la Primitiva',
        fecha: '2024-01-14',
        sorteo: 'Sorteo 002/2024',
        numeros: [9, 17, 26, 38, 51],
        clave: 4
      },
      {
        juego: 'eurodreams',
        nombreJuego: 'EuroDreams',
        fecha: '2024-01-15',
        sorteo: 'Sorteo 015/2024',
        numeros: [6, 13, 22, 29, 37, 40],
        dream: 2
      },
      {
        juego: 'lototurf',
        nombreJuego: 'Lototurf',
        fecha: '2024-01-16',
        sorteo: 'Sorteo 012/2024',
        numeros: [3, 8, 12, 15, 18, 20],
        reintegro: 9,
        caballo: 6
      },
      {
        juego: 'loterianacional',
        nombreJuego: 'Lotería Nacional',
        fecha: '2024-01-13',
        sorteo: 'Sorteo 004/2024',
        numeros: [85734],
        numero: '85734',
        reintegro: 4
      }
    ];
  }
} 