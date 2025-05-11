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

@Component({
  selector: 'app-loteria-nacional',
  standalone: true,
  imports: [RouterLink, CommonModule, EuromillonesBallComponent],
  templateUrl: './loteria-nacional.component.html',
  styleUrl: './loteria-nacional.component.css'
})
export class LoteriaNacionalComponent extends LotteryBaseComponent implements OnInit, OnDestroy {
  protected override gameId: string = 'loterianacional';

  isLoggedIn = false;
  hasBasicPlan = false;
  hasMonthlyPlan = false;
  hasProPlan = false;
  private subscriptions: Subscription[] = [];

  // Variables para las predicciones
  isGeneratingPrediction = false;
  predictionResult: PredictionResponse['prediction'] | null = null;
  predictionError: string | null = null;

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

    // Verificar si el usuario está autenticado
    this.isLoggedIn = !!this.authService.currentUserValue;

    // Verificar si el usuario tiene suscripciones activas
    if (this.isLoggedIn) {
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
    } else {
      // El usuario no está autenticado, no tiene ningún plan
      this.hasBasicPlan = false;
      this.hasMonthlyPlan = false;
      this.hasProPlan = false;
      console.log('Usuario no autenticado, no tiene planes activos');
    }
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

    console.log('Generando predicción básica para Lotería Nacional...');

    // Llamar al servicio de predicciones
    if (this.predictionService) {
      this.predictionService.generatePrediction('loterianacional').subscribe({
        next: (response: PredictionResponse) => {
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
