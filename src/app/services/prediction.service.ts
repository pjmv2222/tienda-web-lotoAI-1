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
  timestamp?: Date;
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
   * @param subscriptionPlan Plan de suscripción específico (opcional: basic, monthly, pro)
   * @returns Observable con la respuesta de la predicción
   */
  generatePrediction(gameId: string, subscriptionPlan?: string): Observable<PredictionResponse> {
    // Usar el sistema de IA real para todos los juegos

    const headers = this.authService.getAuthHeaders();

    // Mapeo de IDs de juego a los nombres correctos para la API
    const gameMapping: { [key: string]: string } = {
      'euromillon': 'euromillon',
      'euromillones': 'euromillon',
      'primitiva': 'primitiva',
      'bonoloto': 'bonoloto',
      'gordo': 'elgordo',
      'gordo-primitiva': 'elgordo',
      'eurodreams': 'eurodreams',
      'loterianacional': 'loterianacional',
      'loteria-nacional': 'loterianacional',
      'lototurf': 'lototurf'
    };

    // Normalizar el ID del juego
    const normalizedGameId = gameMapping[gameId] || gameId;

    // Usar siempre el backend de Node.js como proxy (funciona en desarrollo y producción)
    let url = '';
    if (environment.useMockData) {
      return this.generateMockPrediction(gameId);
    } else {
      // Usar el endpoint del backend que actúa como proxy hacia los servidores Python
      url = `${this.apiUrl}/predictions/${normalizedGameId}`;
      
      // Agregar el parámetro de plan si se especifica
      if (subscriptionPlan) {
        url += `?plan=${subscriptionPlan}`;
        console.log(`Generando predicción para plan específico: ${subscriptionPlan}`);
      }
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
        
        // Añadir timestamp a la respuesta
        response.timestamp = new Date();
        
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

  // Método debug eliminado - ahora se usa el sistema IA real

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
              },
              timestamp: new Date()
            };
            break;
          case 'primitiva':
            prediction = {
              success: true,
              prediction: {
                numeros: this.generateRandomNumbers(6, 1, 49),
                complementario: this.generateRandomNumber(1, 49)
              },
              timestamp: new Date()
            };
            break;
          case 'bonoloto':
            prediction = {
              success: true,
              prediction: {
                numeros: this.generateRandomNumbers(6, 1, 49),
                complementario: this.generateRandomNumber(1, 49),
                reintegro: this.generateRandomNumber(0, 9)
              },
              timestamp: new Date()
            };
            break;
          case 'gordo':
            prediction = {
              success: true,
              prediction: {
                numeros: this.generateRandomNumbers(5, 1, 54),
                clave: this.generateRandomNumber(0, 9)
              },
              timestamp: new Date()
            };
            break;
          case 'eurodreams':
            prediction = {
              success: true,
              prediction: {
                numeros: this.generateRandomNumbers(6, 1, 40),
                dream: this.generateRandomNumber(1, 5)
              },
              timestamp: new Date()
            };
            break;
          case 'loterianacional':
            // Generar un número de 5 dígitos
            const numeroLoteria = this.generateRandomNumber(0, 99999).toString().padStart(5, '0');
            prediction = {
              success: true,
              prediction: {
                numeros: numeroLoteria.split('').map(n => parseInt(n, 10))
              },
              timestamp: new Date()
            };
            break;
          case 'lototurf':
            prediction = {
              success: true,
              prediction: {
                numeros: this.generateRandomNumbers(6, 1, 31),
                caballo: this.generateRandomNumber(1, 12)
              },
              timestamp: new Date()
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
   * Obtiene los headers de autenticación usando el método robusto de AuthService
   */
  private getAuthHeaders(): HttpHeaders {
    return this.authService.getAuthHeaders();
  }
}
