import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { SubscriptionService } from '../../services/subscription.service';
import { Subscription } from 'rxjs';
import { EuromillonesBallComponent } from '../../components/euromillones-ball/euromillones-ball.component';
import { HttpClient } from '@angular/common/http';
import { LotteryBaseComponent } from '../../shared/lottery-base.component';
import { PredictionService, PredictionResponse } from '../../services/prediction.service';

interface LotteryData {
  botes: { [key: string]: string };
  resultados: Array<{
    game: string;
    numbers: number[];
    date: string;
    complementario?: number;
    reintegro?: number;
  }>;
}

@Component({
  selector: 'app-bonoloto',
  standalone: true,
  imports: [RouterLink, CommonModule, EuromillonesBallComponent],
  templateUrl: './bonoloto.component.html',
  styleUrl: './bonoloto.component.css'
})
export class BonolotoComponent extends LotteryBaseComponent implements OnInit, OnDestroy {
  protected override gameId: string = 'bonoloto';

  isLoggedIn = false;
  hasBasicPlan = false;
  hasMonthlyPlan = false;
  hasProPlan = false;
  private subscriptions: Subscription[] = [];

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

    // CORRECCIÓN: Obtener estado inicial de autenticación
    const currentUser = this.authService.currentUserValue;
    this.isLoggedIn = !!currentUser;
    
    console.log('Estado inicial de autenticación:', {
      isLoggedIn: this.isLoggedIn,
      user: currentUser ? 'presente' : 'null'
    });

    // Verificación inicial si ya está autenticado
    if (this.isLoggedIn) {
      console.log('Usuario ya autenticado al inicializar, verificando suscripciones...');
      this.checkSubscriptions();
    }

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

  // Variables para las predicciones
  isGeneratingPrediction = false;
  predictionResult: PredictionResponse['prediction'] | null = null;
  predictionError: string | null = null;

  // generateBasicPrediction method removed - prediction generation now handled by dedicated prediction pages

  showSubscriptionOptions(): void {
    // Lógica para mostrar las opciones de suscripción
    console.log('Mostrando opciones de suscripción...');
    // Navegar a la página de planes de suscripción
    this.router.navigate(['/planes']);
  }

  ngOnDestroy(): void {
    // Cancelar todas las suscripciones para evitar memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
