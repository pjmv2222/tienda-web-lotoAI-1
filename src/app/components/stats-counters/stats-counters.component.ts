import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { StatsService, PublicStats } from '../../services/stats.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stats-counters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-counters.component.html',
  styleUrl: './stats-counters.component.css'
})
export class StatsCountersComponent implements OnInit, OnDestroy {
  stats: PublicStats = {
    totalVisitors: 0,
    totalUsers: 0,
    totalSubscribers: 0,
    lastUpdated: ''
  };

  isLoading = true;
  private subscription?: Subscription;

  // Valores animados para los contadores
  animatedVisitors = 0;
  animatedUsers = 0;
  animatedSubscribers = 0;

  constructor(
    private statsService: StatsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Solo ejecutar en el navegador, no en SSR
    if (isPlatformBrowser(this.platformId)) {
      // Suscribirse a las estadísticas
      this.subscription = this.statsService.stats$.subscribe(stats => {
        this.stats = stats;
        this.isLoading = false;
        
        // Animar contadores cuando lleguen los datos
        this.animateCounters();
      });

      // Registrar visita del usuario actual
      this.statsService.trackVisitor().subscribe();
    } else {
      // En SSR, simplemente marcar como no loading
      this.isLoading = false;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Animar contadores con efecto de conteo incremental
   */
  private animateCounters(): void {
    this.animateCounter('visitors', this.stats.totalVisitors);
    this.animateCounter('users', this.stats.totalUsers);
    this.animateCounter('subscribers', this.stats.totalSubscribers);
  }

  /**
   * Animar un contador específico
   */
  private animateCounter(type: string, targetValue: number): void {
    const duration = 2000; // 2 segundos
    const steps = 60; // 60 pasos para suavidad
    const increment = targetValue / steps;
    const stepDuration = duration / steps;

    let currentValue = 0;
    const timer = setInterval(() => {
      currentValue += increment;
      
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(timer);
      }

      // Actualizar el valor correspondiente
      switch (type) {
        case 'visitors':
          this.animatedVisitors = Math.floor(currentValue);
          break;
        case 'users':
          this.animatedUsers = Math.floor(currentValue);
          break;
        case 'subscribers':
          this.animatedSubscribers = Math.floor(currentValue);
          break;
      }
    }, stepDuration);
  }

  /**
   * Formatear número con separadores de miles
   */
  formatNumber(num: number): string {
    return this.statsService.formatNumber(num);
  }

  /**
   * Refrescar estadísticas manualmente
   */
  refreshStats(): void {
    this.isLoading = true;
    this.statsService.refreshStats();
  }
}
