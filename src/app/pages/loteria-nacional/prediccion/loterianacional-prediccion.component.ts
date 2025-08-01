import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { SubscriptionService } from '../../../services/subscription.service';
import { PredictionService, PredictionResponse } from '../../../services/prediction.service';
import { EuromillonesBallComponent } from '../../../components/euromillones-ball/euromillones-ball.component';
import { UserPredictionService } from '../../../services/user-prediction.service';

@Component({
  selector: 'app-loterianacional-prediccion',
  standalone: true,
  imports: [CommonModule, RouterLink, EuromillonesBallComponent],
  templateUrl: './loterianacional-prediccion.component.html',
  styleUrl: './loterianacional-prediccion.component.css'
})
export class LoterianacionalPrediccionComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  hasBasicPlan: boolean | null = null;
  hasMonthlyPlan: boolean | null = null;
  hasProPlan: boolean | null = null;
  isLoadingSubscriptionStatus = true;
  private subscriptions: Subscription[] = [];
  private verificationsCompleted = 0;

  isGeneratingPrediction = false;
  predictionResults: any[] = [];
  predictionError: string | null = null;
  maxPredictions = 3;
  userPlan: string = 'basic';
  showEmptyBalls = true;
  emptyNumbers = Array(5).fill(null);
  emptyReintegro = null;
  proximoSorteo: string = '';
  boteActual: string = '';
  private numberFrequency: Map<number, number> = new Map();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private subscriptionService: SubscriptionService,
    private predictionService: PredictionService,
    private http: HttpClient,
    private userPredictionService: UserPredictionService
  ) {}

  ngOnInit(): void {
    this.loadPredictionStatus();
    this.loadLotteryInfo();
    this.isLoggedIn = !!this.authService.currentUserValue;
    if (this.isLoggedIn) {
      const basicSub = this.subscriptionService.hasActivePlan('basic').subscribe(hasBasic => {
        this.hasBasicPlan = hasBasic;
        this.checkAllVerificationsCompleted();
      });
      this.subscriptions.push(basicSub);
      const monthlySub = this.subscriptionService.hasActivePlan('monthly').subscribe(hasMonthly => {
        this.hasMonthlyPlan = hasMonthly;
        if (hasMonthly) this.maxPredictions = 10;
        this.checkAllVerificationsCompleted();
      });
      this.subscriptions.push(monthlySub);
      const proSub = this.subscriptionService.hasActivePlan('pro').subscribe(hasPro => {
        this.hasProPlan = hasPro;
        if (hasPro) this.maxPredictions = 20;
        this.checkAllVerificationsCompleted();
      });
      this.subscriptions.push(proSub);
      this.loadSavedPredictions();
    } else {
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: this.router.url } });
    }
  }

  private checkAllVerificationsCompleted(): void {
    this.verificationsCompleted++;
    if (this.verificationsCompleted >= 3) {
      this.isLoadingSubscriptionStatus = false;
      if (!this.hasBasicPlan && !this.hasMonthlyPlan && !this.hasProPlan) {
        this.predictionError = 'Necesitas una suscripción activa para generar predicciones. <a routerLink="/planes">Ver planes disponibles</a>';
      }
    }
  }

  private loadPredictionStatus() {
    this.userPredictionService.getPredictionStatus('loterianacional').subscribe({
      next: (response) => {
        if (response.success) {
          this.predictionResults = response.data.predictions.map(p => p.data);
          this.maxPredictions = response.data.maxAllowed;
          this.userPlan = response.data.userPlan;
          this.updatePredictionDisplay();
        }
      },
      error: () => {
        console.log('🔄 [DEBUG] Error al cargar desde backend, manteniendo predicciones de localStorage...');
      }
    });
  }

  private loadLotteryInfo(): void {
    const hoy = new Date();
    const diaSemana = hoy.getDay();
    let diasHastaProximo = 0;
    if (diaSemana <= 1) diasHastaProximo = 1 - diaSemana;
    else if (diaSemana <= 3) diasHastaProximo = 3 - diaSemana;
    else if (diaSemana <= 5) diasHastaProximo = 5 - diaSemana;
    else diasHastaProximo = 0;
    if (diasHastaProximo === 0 && hoy.getHours() >= 21) {
      if (diaSemana === 1) diasHastaProximo = 2;
      else if (diaSemana === 3) diasHastaProximo = 2;
      else if (diaSemana === 5) diasHastaProximo = 1;
      else diasHastaProximo = 3;
    }
    const proximoSorteoDate = new Date(hoy);
    proximoSorteoDate.setDate(hoy.getDate() + diasHastaProximo);
    const opciones: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    this.proximoSorteo = proximoSorteoDate.toLocaleDateString('es-ES', opciones);
    this.proximoSorteo = this.proximoSorteo.charAt(0).toUpperCase() + this.proximoSorteo.slice(1);
    this.cargarBoteActual();
  }

  private cargarBoteActual(): void {
    this.http.get('assets/botes.json').subscribe({
      next: (data: any) => {
        if (data && data.loterianacional) this.boteActual = data.loterianacional;
        else this.boteActual = 'Consultar oficial';
      },
      error: () => { this.boteActual = 'Consultar oficial'; }
    });
  }

  private updatePredictionDisplay(): void {
    if (this.predictionResults.length > 0) {
      this.showEmptyBalls = false;
      this.updateNumberFrequency();
    }
  }

  private updateNumberFrequency(): void {
    this.numberFrequency.clear();
    this.predictionResults.forEach(prediction => {
      if (prediction.numeros) {
        prediction.numeros.forEach((num: number) => {
          this.numberFrequency.set(num, (this.numberFrequency.get(num) || 0) + 1);
        });
      }
    });
  }

  async generatePrediction() {
    if (this.isGeneratingPrediction) return;
    try {
      const canGenerate = await this.userPredictionService.canGeneratePrediction('loterianacional').toPromise();
      if (!canGenerate) {
        this.predictionError = `Ya has generado el máximo de ${this.maxPredictions} predicciones. Adquiere una nueva suscripción para seguir generando pronósticos afortunados.`;
        return;
      }
      this.isGeneratingPrediction = true;
      this.predictionError = null;
      this.showEmptyBalls = false;
      const response = await this.predictionService.generatePrediction('loterianacional').toPromise();
      if (response && response.success && response.prediction) {
        await this.userPredictionService.createPrediction('loterianacional', response.prediction).toPromise();
        this.predictionResults.push({
          numeros: response.prediction.numeros || [],
          reintegro: response.prediction.reintegro || null
        });
        this.updatePredictionDisplay();
      } else {
        this.predictionError = response?.error || 'Error al generar predicción';
      }
    } catch (error) {
      this.predictionError = 'Error al generar predicción. Intenta de nuevo.';
    } finally {
      this.isGeneratingPrediction = false;
    }
  }

  private loadSavedPredictions(): void {
    try {
      const savedJson = localStorage.getItem('loterianacional_predictions');
      if (savedJson) {
        const savedData = JSON.parse(savedJson);
        const savedTime = new Date(savedData.timestamp).getTime();
        const currentTime = new Date().getTime();
        const hoursDiff = (currentTime - savedTime) / (1000 * 60 * 60);
        if (hoursDiff < 24) {
          if (Array.isArray(savedData.predictions)) {
            this.predictionResults = savedData.predictions.map((pred: any) => ({
              numeros: Array.isArray(pred.numeros) ? pred.numeros : [],
              reintegro: typeof pred.reintegro === 'number' ? pred.reintegro : null
            }));
            this.updateNumberFrequency();
          } else {
            this.predictionResults = [];
          }
        } else {
          localStorage.removeItem('loterianacional_predictions');
        }
      }
    } catch {
      this.predictionResults = [];
    }
  }

  private savePredictionsToStorage(): void {
    try {
      const dataToSave = {
        timestamp: new Date().toISOString(),
        predictions: this.predictionResults
      };
      localStorage.setItem('loterianacional_predictions', JSON.stringify(dataToSave));
    } catch {}
  }

  private loadPredictionsFromStorage() {
    const saved = localStorage.getItem('loterianacionalPredictions');
    if (saved) {
      this.predictionResults = JSON.parse(saved);
    }
    this.updatePredictionDisplay();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
} 