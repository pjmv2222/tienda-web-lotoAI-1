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
    this.http.get<any>(`/assets/botes.json?t=${timestamp}`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    }).subscribe({
      next: (data) => {
        if (data && data[this.gameId]) {
          this.boteActual = data[this.gameId];
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
      if (diff > 0 && diff < diasHastaProximo) {
        diasHastaProximo = diff;
      }
    }

    // Si no encontramos un día futuro, tomamos el primer día de sorteo de la próxima semana
    if (diasHastaProximo === 7) {
      diasHastaProximo = 7 + diasSorteo[0] - diaSemana;
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
