import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LotteryResultsService, LotteryResult } from '../../services/lottery-results.service';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css'
})
export class ResultadosComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  resultados: LotteryResult[] = [];
  isLoading = true;
  error: string | null = null;
  lastUpdated: Date | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private lotteryService: LotteryResultsService
  ) {}

  ngOnInit(): void {
    this.loadResultados();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadResultados(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.isLoading = false;
      return;
    }

    this.lotteryService.getLatestResults()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resultados) => {
          this.resultados = resultados;
          this.lastUpdated = new Date();
          this.isLoading = false;
          this.error = null;
        },
        error: (error) => {
          console.error('Error cargando resultados:', error);
          this.error = 'Error al cargar los resultados. Mostrando datos de ejemplo.';
          this.resultados = this.getResultadosEjemplo();
          this.isLoading = false;
        }
      });
  }

  private getResultadosEjemplo(): LotteryResult[] {
    return [
      {
        juego: 'euromillones',
        nombreJuego: 'EuroMillones',
        fecha: '2024-01-16',
        sorteo: 'Sorteo 006/2024',
        numeros: [7, 12, 18, 33, 42],
        estrellas: [3, 8],
        complementario: 15
      },
      {
        juego: 'primitiva',
        nombreJuego: 'La Primitiva',
        fecha: '2024-01-15',
        sorteo: 'Sorteo 005/2024',
        numeros: [5, 14, 23, 31, 45, 49],
        complementario: 12,
        reintegro: 7
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

  getGameIcon(juego: string): string {
    const icons: { [key: string]: string } = {
      'euromillones': 'fas fa-star',
      'primitiva': 'fas fa-gem',
      'bonoloto': 'fas fa-coins',
      'elgordo': 'fas fa-crown',
      'eurodreams': 'fas fa-moon',
      'lototurf': 'fas fa-horse',
      'loterianacional': 'fas fa-flag'
    };
    return icons[juego] || 'fas fa-dice';
  }

  getGameColor(juego: string): string {
    const colors: { [key: string]: string } = {
      'euromillones': '#FF6B35',
      'primitiva': '#0066CC',
      'bonoloto': '#00AA55',
      'elgordo': '#CC0066',
      'eurodreams': '#6633CC',
      'lototurf': '#FF9900',
      'loterianacional': '#CC3300'
    };
    return colors[juego] || '#666666';
  }

  refreshResultados(): void {
    this.isLoading = true;
    this.error = null;
    this.loadResultados();
  }

  formatDate(fecha: string): string {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  trackByGame(index: number, resultado: LotteryResult): string {
    return resultado.juego;
  }
} 