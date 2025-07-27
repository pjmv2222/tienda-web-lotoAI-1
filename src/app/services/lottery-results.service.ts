import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

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

interface LotteryResult {
  juego: string;
  nombreJuego: string;
  fecha: string;
  sorteo: string;
  numeros: number[];
  sorteos?: { dia: string; fecha: string; premios: string[]; reintegros: string[] }[];
  estrellas?: number[];
  complementario?: number;
  reintegro?: number;
  clave?: number;
  dream?: number;
  caballo?: number;
  millon?: string;
  joker?: string;
  premios?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class LotteryResultsService {

  constructor(private http: HttpClient) { }

  /**
   * Obtiene resultados desde el backend
   */
  getBackendResults(): Observable<LotteryResult[]> {
    return this.http.get<any>('/api/lottery-results/latest')
      .pipe(
        map(response => response.data || []),
        catchError(error => {
          console.error('Error al obtener resultados del backend:', error);
          return of([]);
        })
      );
  }

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
            return data.resultados.map(resultado => {
              // Procesar fecha correctamente
              const fechaValida = this.procesarFecha(resultado.date);
              
              // Determinar número de sorteo basado en la fecha
              const numeroSorteo = this.calcularNumeroSorteo(fechaValida, resultado.game);
              
              // Manejar números especiales para Lotería Nacional
              let numeros: number[] = [];
              let sorteos: any[] = [];
              
              if (resultado.game === 'loterianacional') {
                if ((resultado as any).sorteos && Array.isArray((resultado as any).sorteos)) {
                  // Múltiples sorteos (jueves y sábado)
                  sorteos = (resultado as any).sorteos;
                  // Para números, usar todos los premios de todos los sorteos
                  numeros = [];
                  sorteos.forEach(sorteo => {
                    if (sorteo.premios && Array.isArray(sorteo.premios)) {
                      const premiosSorteo = sorteo.premios.map((premio: string) => parseInt(premio, 10)).filter((n: number) => !isNaN(n));
                      numeros.push(...premiosSorteo);
                    }
                  });
                } else if (resultado.premios) {
                  // Un solo sorteo (formato actual)
                  numeros = resultado.premios.map((premio: string) => parseInt(premio, 10)).filter((n: number) => !isNaN(n));
                }
              } else {
                numeros = resultado.numbers || [];
              }

              return {
                juego: resultado.game,
                nombreJuego: this.getGameDisplayName(resultado.game),
                fecha: fechaValida,
                sorteo: `Sorteo ${numeroSorteo}`,
                numeros: numeros,
                ...(sorteos.length > 0 && { sorteos: sorteos }), // Conditionally add sorteos
                ...(resultado.stars ? { estrellas: resultado.stars } : {}),
                ...(resultado.millon ? { millon: resultado.millon } : {}),
                ...(resultado.joker ? { joker: resultado.joker } : {}),
                ...(resultado.complementary !== undefined ? { complementario: resultado.complementary } : {}),
                ...(resultado.reintegro !== undefined ? { reintegro: resultado.reintegro } : {}),
                ...(resultado.clave !== undefined ? { clave: resultado.clave } : {}),
                ...(resultado.dream !== undefined ? { dream: resultado.dream } : {}),
                ...(resultado.caballo !== undefined ? { caballo: resultado.caballo } : {}),
                ...(resultado.premios ? { premios: resultado.premios } : {})
              };
            });
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
   * Procesa y valida fechas del scraper
   */
  private procesarFecha(fecha: string): string {
    if (!fecha || fecha === 'pending') {
      // Si no hay fecha válida, usar la fecha actual
      return new Date().toISOString().split('T')[0];
    }

    // Si viene en formato DD/MM/YYYY (español)
    if (fecha.includes('/')) {
      const partes = fecha.split('/');
      if (partes.length === 3) {
        const [dia, mes, año] = partes;
        // Convertir a formato ISO (YYYY-MM-DD)
        return `${año}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
      }
    }

    // Si ya viene en formato ISO, validar que sea una fecha válida
    const fechaDate = new Date(fecha);
    if (!isNaN(fechaDate.getTime())) {
      return fecha;
    }

    // Fallback: fecha actual
    return new Date().toISOString().split('T')[0];
  }

  /**
   * Calcula el número de sorteo aproximado basado en la fecha y el juego
   */
  private calcularNumeroSorteo(fecha: string, juego: string): string {
    const fechaActual = new Date(fecha);
    const año = fechaActual.getFullYear();
    const inicioAño = new Date(año, 0, 1);
    
    // Calcular días transcurridos desde inicio del año
    const diasTranscurridos = Math.floor((fechaActual.getTime() - inicioAño.getTime()) / (1000 * 60 * 60 * 24));
    
    // Frecuencia de sorteos por juego (sorteos por semana)
    const frecuencias: { [key: string]: number } = {
      'euromillones': 2, // Martes y viernes
      'primitiva': 2, // Jueves y sábado
      'bonoloto': 6, // Lunes a sábado
      'elgordo': 1, // Domingo
      'eurodreams': 2, // Lunes y jueves
      'lototurf': 1, // Domingo
      'loterianacional': 2 // Jueves y sábado
    };
    
    const frecuencia = frecuencias[juego] || 1;
    const sorteoAproximado = Math.floor((diasTranscurridos / 7) * frecuencia) + 1;
    
    return `${sorteoAproximado.toString().padStart(3, '0')}/${año}`;
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
        reintegro: 4
      }
    ];
  }
}