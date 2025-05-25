import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

// Interfaz para la respuesta de predicción
export interface PredictionResponse {
  success: boolean;
  prediction?: {
    numeros?: number[];
    estrellas?: number[];
    complementario?: number;
    reintegro?: number;
    clave?: number;
    dream?: number;
    caballo?: number;
    numero?: number[];
  };
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private apiUrl = environment.apiUrl;
  private iaApiUrl = environment.iaApiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  /**
   * Genera una predicción para un juego específico
   * @param gameId Identificador del juego (euromillones, primitiva, bonoloto, etc.)
   * @returns Observable con la respuesta de la predicción
   */
  generatePrediction(gameId: string): Observable<PredictionResponse> {
    const headers = this.getAuthHeaders();

    // Mapeo de IDs de juego a los nombres correctos para la API
    const gameMapping: { [key: string]: string } = {
      'euromillon': 'euromillon',
      'euromillones': 'euromillon',
      'primitiva': 'primitiva',
      'bonoloto': 'bonoloto',
      'gordo': 'gordo-primitiva',
      'gordo-primitiva': 'gordo-primitiva',
      'eurodreams': 'eurodreams',
      'loterianacional': 'loteria-nacional',
      'loteria-nacional': 'loteria-nacional',
      'lototurf': 'lototurf'
    };

    // Normalizar el ID del juego
    const normalizedGameId = gameMapping[gameId] || gameId;

    // En producción, usamos la API directa o el backend como proxy
    // En desarrollo, usamos el proxy del backend o una simulación
    let url = '';
    if (environment.production) {
      // En producción, intentamos usar directamente la API de IA
      url = `${environment.iaApiUrl}/${normalizedGameId}/predict`;
      console.log(`Usando API directa: ${url}`);
    } else {
      // Para desarrollo, podemos usar una simulación o el backend
      if (environment.useMockData) {
        return this.generateMockPrediction(gameId);
      }
      url = `${this.apiUrl}/predictions/${normalizedGameId}`;
    }

    console.log(`Solicitando predicción a: ${url}`);

    // Datos de entrada para la IA (podrían ser personalizados)
    const inputData = {
      input: [1, 2, 3, 4, 5, 6, 7]
    };

    // Realizar la petición HTTP
    return this.http.post<PredictionResponse>(url, inputData, { headers }).pipe(
      map((response: any) => {
        console.log('Respuesta del servidor:', response);
        // Si no hay respuesta o no tiene la estructura esperada, devolver un error
        if (!response || typeof response !== 'object') {
          return {
            success: false,
            error: 'Respuesta del servidor inválida'
          };
        }
        return response;
      }),
      catchError(error => {
        console.error('Error al generar la predicción:', error);
        // Devolver un objeto de error en caso de fallo
        return of({
          success: false,
          error: error.message || 'Error al comunicarse con el servidor'
        });
      })
    );
  }

  /**
   * Genera una predicción simulada para pruebas (modo desarrollo)
   * @param gameId Identificador del juego
   * @returns Observable con una predicción simulada
   */
  generateMockPrediction(gameId: string): Observable<PredictionResponse> {
    // Simulación de tiempo de respuesta del servidor
    return new Observable<PredictionResponse>(observer => {
      setTimeout(() => {
        let prediction: PredictionResponse;

        switch (gameId) {
          case 'euromillones':
            prediction = {
              success: true,
              prediction: {
                numeros: this.generateRandomNumbers(5, 1, 50),
                estrellas: this.generateRandomNumbers(2, 1, 12)
              }
            };
            break;
          case 'primitiva':
            prediction = {
              success: true,
              prediction: {
                numeros: this.generateRandomNumbers(6, 1, 49),
                complementario: this.generateRandomNumber(1, 49)
              }
            };
            break;
          case 'bonoloto':
            prediction = {
              success: true,
              prediction: {
                numeros: this.generateRandomNumbers(6, 1, 49),
                complementario: this.generateRandomNumber(1, 49),
                reintegro: this.generateRandomNumber(0, 9)
              }
            };
            break;
          case 'gordo':
            prediction = {
              success: true,
              prediction: {
                numeros: this.generateRandomNumbers(5, 1, 54),
                clave: this.generateRandomNumber(0, 9)
              }
            };
            break;
          case 'eurodreams':
            prediction = {
              success: true,
              prediction: {
                numeros: this.generateRandomNumbers(6, 1, 40),
                dream: this.generateRandomNumber(1, 5)
              }
            };
            break;
          case 'loterianacional':
            // Generar un número de 5 dígitos
            const numeroLoteria = this.generateRandomNumber(0, 99999).toString().padStart(5, '0');
            prediction = {
              success: true,
              prediction: {
                numero: numeroLoteria.split('').map(n => parseInt(n, 10))
              }
            };
            break;
          case 'lototurf':
            prediction = {
              success: true,
              prediction: {
                numeros: this.generateRandomNumbers(6, 1, 31),
                caballo: this.generateRandomNumber(1, 12)
              }
            };
            break;
          default:
            prediction = {
              success: false,
              error: 'Juego no soportado'
            };
        }

        observer.next(prediction);
        observer.complete();
      }, 1500); // Simular 1.5 segundos de tiempo de respuesta
    });
  }

  /**
   * Genera un array de números aleatorios únicos
   * @param count Cantidad de números a generar
   * @param min Valor mínimo (inclusive)
   * @param max Valor máximo (inclusive)
   * @returns Array de números aleatorios
   */
  private generateRandomNumbers(count: number, min: number, max: number): number[] {
    const numbers: number[] = [];
    while (numbers.length < count) {
      const num = this.generateRandomNumber(min, max);
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    return numbers.sort((a, b) => a - b); // Ordenar de menor a mayor
  }

  /**
   * Genera un número aleatorio entre min y max (inclusive)
   * @param min Valor mínimo
   * @param max Valor máximo
   * @returns Número aleatorio
   */
  private generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
