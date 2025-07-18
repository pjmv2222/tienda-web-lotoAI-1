import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

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

// Formato de datos del scraper extendido
interface ScrapedResult {
  game: string;
  date: string;
  numbers: number[];
  stars?: number[];
  complementary?: number;
  reintegro?: number;
  clave?: number;
  dream?: number;
  caballo?: number;
  millon?: string;
  joker?: string;
  premios?: string[];
}

export interface LotteryData {
  botes: { [key: string]: string };
  resultados: ScrapedResult[];
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class LotteryResultsService {

  constructor(private http: HttpClient) { }

  /**
   * Obtiene solo los últimos resultados directamente desde lottery-data.json (patrón original)
   */
  getLatestResults(): Observable<LotteryResult[]> {
    const timestamp = new Date().getTime();
    const headers = {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    };
    
    return this.http.get<LotteryData>(`assets/lottery-data.json?t=${timestamp}`, { headers })
      .pipe(
        map(data => {
          if (data && data.resultados && Array.isArray(data.resultados)) {
            // Transformar datos del scraper al formato esperado por el frontend
            return data.resultados.map(resultado => ({
              juego: resultado.game,
              nombreJuego: this.getGameDisplayName(resultado.game),
              fecha: resultado.date || new Date().toISOString().split('T')[0],
              sorteo: 'Sorteo actual',
              numeros: resultado.numbers || [],
              ...(resultado.stars && { estrellas: resultado.stars }),
              ...(resultado.millon && { millon: resultado.millon }),
              ...(resultado.joker && { joker: resultado.joker }),
              ...(resultado.complementary && { complementario: resultado.complementary }),
              ...(resultado.reintegro && { reintegro: resultado.reintegro }),
              ...(resultado.clave && { clave: resultado.clave }),
              ...(resultado.dream && { dream: resultado.dream }),
              ...(resultado.caballo && { caballo: resultado.caballo }),
              ...(resultado.premios && { premios: resultado.premios })
            }));
          }
          return [];
        }),
        catchError(error => {
          console.error('Error al obtener resultados desde lottery-data.json:', error);
          return of(this.getFallbackData());
        })
      );
  }

  /**
   * Obtiene solo los botes actuales directamente desde botes.json (patrón original)
   */
  getCurrentJackpots(): Observable<{ [key: string]: string }> {
    const timestamp = new Date().getTime();
    const headers = {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    };
    
    return this.http.get<{ [key: string]: string }>(`assets/botes.json?t=${timestamp}`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al obtener botes desde botes.json:', error);
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