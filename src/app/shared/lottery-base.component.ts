import { Directive, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PredictionService, PredictionResponse } from '../services/prediction.service';

/**
 * Componente base para todas las páginas de lotería
 * Proporciona funcionalidad común como carga de botes y fechas de sorteo
 */
@Directive()
export abstract class LotteryBaseComponent implements OnInit {
  // Nombre del juego (debe ser establecido por las clases hijas)
  protected abstract gameId: string;

  // Variables para información del bote y próximo sorteo
  boteActual: string = 'Cargando...';
  proximoSorteo: string = 'Cargando...';

  // Mapeo de días de sorteo para cada juego
  private sorteosDias: { [key: string]: number[] } = {
    'euromillones': [2, 5], // Martes y Viernes
    'primitiva': [4, 6], // Jueves y Sábado
    'bonoloto': [1, 2, 3, 4, 5, 6], // Lunes a Sábado
    'gordo': [0], // Domingo
    'eurodreams': [1, 4], // Lunes y Jueves
    'loterianacional': [4, 6], // Jueves y Sábado
    'lototurf': [0] // Domingo
  };

  constructor(
    protected http: HttpClient,
    protected predictionService?: PredictionService
  ) {}

  ngOnInit(): void {
    this.cargarInformacionBote();
  }

  /**
   * Carga la información del bote y próximo sorteo desde el archivo botes.json
   */
  cargarInformacionBote(): void {
    const timestamp = new Date().getTime();
    this.http.get<any>(`/assets/data/botes.json?t=${timestamp}`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    }).subscribe({
      next: (data) => {
        // Mapeo entre gameId del componente y claves del JSON
        const nameMapping: { [key: string]: string } = {
          'euromillones': 'euromillon',
          'primitiva': 'primitiva',
          'bonoloto': 'bonoloto',
          'gordo': 'gordo',
          'lototurf': 'lototurf',
          'eurodreams': 'eurodreams',
          'loterianacional': 'loterianacional'
        };

        const jsonKey = nameMapping[this.gameId] || this.gameId;
        if (data && data[jsonKey]) {
          this.boteActual = data[jsonKey].bote + ' ' + data[jsonKey].moneda;
          this.proximoSorteo = this.calcularProximoSorteo();
        }
      },
      error: (error) => {
        console.error(`Error al cargar información del bote para ${this.gameId}:`, error);
      }
    });
  }

  /**
   * Calcula la fecha del próximo sorteo basado en los días configurados para cada juego
   * Considera si es día de sorteo y si ya pasó la hora del sorteo (21:00h)
   */
  private calcularProximoSorteo(): string {
    const hoy = new Date();
    let proximoSorteo = new Date(hoy);

    // Obtener los días de sorteo para este juego
    const diasSorteo = this.sorteosDias[this.gameId] || [1]; // Por defecto, lunes

    // Día actual de la semana (0 = domingo, 1 = lunes, ...)
    const diaSemana = hoy.getDay();

    // Encontrar el próximo día de sorteo
    let diasHastaProximo = 7;
    
    for (const diaSorteo of diasSorteo) {
      const diff = (diaSorteo + 7 - diaSemana) % 7;
      
      // Si es hoy (diff = 0), verificar si ya pasó la hora del sorteo
      if (diff === 0) {
        if (hoy.getHours() < 21) {
          // Es hoy y aún no han sido las 21:00, usar hoy
          diasHastaProximo = 0;
          break;
        }
        // Si ya pasaron las 21:00, buscar el siguiente día de sorteo
        continue;
      }
      
      // Si es un día futuro
      if (diff > 0 && diff < diasHastaProximo) {
        diasHastaProximo = diff;
      }
    }

    // Si no encontramos un día válido, buscar el primer día de sorteo de la próxima semana
    if (diasHastaProximo === 7) {
      diasHastaProximo = (7 - diaSemana + diasSorteo[0]) % 7;
      if (diasHastaProximo === 0) {
        diasHastaProximo = 7;
      }
    }

    // Establecer la fecha del próximo sorteo
    proximoSorteo.setDate(hoy.getDate() + diasHastaProximo);

    // Formatear la fecha
    const opciones: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    };
    let fechaFormateada = proximoSorteo.toLocaleDateString('es-ES', opciones);

    // Capitalizar primera letra
    fechaFormateada = fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);

    return fechaFormateada;
  }
}
