import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { SubscriptionService } from '../../services/subscription.service';
import { Subscription } from 'rxjs';
import { EuromillonesBallComponent } from '../../components/euromillones-ball/euromillones-ball.component';
import { HttpClient } from '@angular/common/http';
import { LotteryBaseComponent } from '../../shared/lottery-base.component';
import { PredictionService } from '../../services/prediction.service';

interface LotteryData {
  botes: { [key: string]: string };
  resultados: Array<{
    game: string;
    numbers: number[];
    date: string;
    complementario?: number;
    reintegro?: number;
    joker?: string;
    millon?: string;
  }>;
}

@Component({
  selector: 'app-primitiva',
  standalone: true,
  imports: [RouterLink, CommonModule, EuromillonesBallComponent],
  templateUrl: './primitiva.component.html',
  styleUrl: './primitiva.component.css'
})
export class PrimitivaComponent extends LotteryBaseComponent implements OnInit, OnDestroy {
  protected override gameId: string = 'primitiva';

  isLoggedIn = false;
  hasBasicPlan = false;
  hasMonthlyPlan = false;
  hasProPlan = false;
  private subscriptions: Subscription[] = [];

  // Variables para las predicciones
  isGeneratingPrediction = false;
  predictionResult: any = null;
  predictionError: string | null = null;

  // Variables para los últimos resultados
  ultimosResultados: {
    fecha: string;
    numeros: number[];
    complementario?: number;
    reintegro?: number;
  } | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private subscriptionService: SubscriptionService,
    http: HttpClient,
    predictionService: PredictionService
  ) {
    super(http, predictionService);
  }

  override ngOnInit(): void {
    super.ngOnInit(); // Llama al método de la clase base para cargar la información del bote

    // CORRECCIÓN: Suscribirse a cambios en el estado de autenticación
    const authSub = this.authService.currentUser.subscribe(user => {
      const wasLoggedIn = this.isLoggedIn;
      this.isLoggedIn = !!user;
      
      console.log('Estado de autenticación cambió:', {
        wasLoggedIn,
        isLoggedIn: this.isLoggedIn,
        user: user ? 'presente' : 'null'
      });

      // Si el usuario se autentica (login inicial o re-login después de token expirado)
      if (this.isLoggedIn && (!wasLoggedIn || user)) {
        console.log('Usuario autenticado, verificando suscripciones...');
        this.checkSubscriptions();
      } else if (!this.isLoggedIn) {
        // El usuario no está autenticado, resetear planes
        this.resetSubscriptionStatus();
      }
    });
    this.subscriptions.push(authSub);

    // Verificación inicial si ya está autenticado
    if (this.isLoggedIn) {
      this.checkSubscriptions();
    }

    // Cargar los últimos resultados desde lottery-data.json
    this.loadUltimosResultados();
  }

  /**
   * NUEVA FUNCIÓN: Verificar suscripciones del usuario
   * Se puede llamar tanto en la inicialización como después del re-login
   */
  private checkSubscriptions(): void {
    // Verificar plan básico
    const basicSub = this.subscriptionService.hasActivePlan('basic').subscribe(hasBasic => {
      this.hasBasicPlan = hasBasic;
      console.log('Usuario tiene plan básico:', this.hasBasicPlan);
    });
    this.subscriptions.push(basicSub);

    // Verificar plan mensual
    const monthlySub = this.subscriptionService.hasActivePlan('monthly').subscribe(hasMonthly => {
      this.hasMonthlyPlan = hasMonthly;
      console.log('Usuario tiene plan mensual:', this.hasMonthlyPlan);
    });
    this.subscriptions.push(monthlySub);

    // Verificar plan pro
    const proSub = this.subscriptionService.hasActivePlan('pro').subscribe(hasPro => {
      this.hasProPlan = hasPro;
      console.log('Usuario tiene plan pro:', this.hasProPlan);
    });
    this.subscriptions.push(proSub);
  }

  /**
   * NUEVA FUNCIÓN: Resetear estado de suscripciones cuando el usuario no está autenticado
   */
  private resetSubscriptionStatus(): void {
    this.hasBasicPlan = false;
    this.hasMonthlyPlan = false;
    this.hasProPlan = false;
    console.log('Usuario no autenticado, planes reseteados');
  }

  showSubscriptionOptions(): void {
    // Lógica para mostrar las opciones de suscripción
    console.log('Mostrando opciones de suscripción...');
    // Navegar a la página de planes de suscripción
    this.router.navigate(['/planes']);
  }

  generateBasicPrediction(): void {
    // Verificar si el usuario tiene un plan activo
    if (!this.hasBasicPlan && !this.hasMonthlyPlan && !this.hasProPlan) {
      console.log('El usuario no tiene un plan activo');
      this.predictionError = 'Necesitas una suscripción activa para generar predicciones';
      return;
    }

    // Indicar que se está generando la predicción
    this.isGeneratingPrediction = true;
    this.predictionResult = null;
    this.predictionError = null;

    console.log('Generando predicción básica para La Primitiva...');

    // Llamar al servicio de predicciones
    if (this.predictionService) {
      this.predictionService.generatePrediction('primitiva').subscribe({
        next: (response: any) => {
          console.log('Predicción generada:', response);
          this.isGeneratingPrediction = false;

          if (response.success) {
            this.predictionResult = response.prediction;
          } else {
            this.predictionError = response.error || 'Error al generar la predicción';
          }
        },
        error: (error: any) => {
          console.error('Error al generar la predicción:', error);
          this.isGeneratingPrediction = false;
          this.predictionError = 'Error al comunicarse con el servidor de predicciones';
        }
      });
    } else {
      console.error('El servicio de predicciones no está disponible');
      this.isGeneratingPrediction = false;
      this.predictionError = 'El servicio de predicciones no está disponible';
    }
  }

  ngOnDestroy(): void {
    // Cancelar todas las suscripciones para evitar memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Cargar los últimos resultados desde lottery-data.json
   */
  private async loadUltimosResultados(): Promise<void> {
    try {
      console.log('[PRIMITIVA] Cargando últimos resultados...');
      const timestamp = new Date().getTime();
      const response = await this.http.get<LotteryData>(`assets/lottery-data.json?t=${timestamp}`).toPromise();
      
      if (response?.resultados && Array.isArray(response.resultados)) {
        const resultado = response.resultados.find(r => r.game === 'primitiva');
        if (resultado) {
          this.ultimosResultados = {
            fecha: resultado.date,
            numeros: resultado.numbers || [],
            complementario: resultado.complementario,
            reintegro: resultado.reintegro
          };
          console.log('[PRIMITIVA] Últimos resultados cargados:', this.ultimosResultados);
        } else {
          console.warn('[PRIMITIVA] No se encontraron datos de primitiva en lottery-data.json');
          // Usar datos de fallback
          this.ultimosResultados = {
            fecha: 'Sábado, 6 de abril de 2024',
            numeros: [2, 14, 22, 31, 37, 45],
            complementario: 18,
            reintegro: 6
          };
        }
      } else {
        console.warn('[PRIMITIVA] Estructura de datos incorrecta en lottery-data.json');
        // Usar datos de fallback
        this.ultimosResultados = {
          fecha: 'Sábado, 6 de abril de 2024',
          numeros: [2, 14, 22, 31, 37, 45],
          complementario: 18,
          reintegro: 6
        };
      }
    } catch (error) {
      console.error('[PRIMITIVA] Error al cargar últimos resultados:', error);
      // Usar datos de fallback en caso de error
      this.ultimosResultados = {
        fecha: 'Sábado, 6 de abril de 2024',
        numeros: [2, 14, 22, 31, 37, 45],
        complementario: 18,
        reintegro: 6
      };
    }
  }
}
