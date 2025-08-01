import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { SubscriptionService } from '../../../services/subscription.service';
import { PredictionService, PredictionResponse } from '../../../services/prediction.service';
import { EuromillonesBallComponent } from '../../../components/euromillones-ball/euromillones-ball.component';
import { UserPredictionService } from '../../../services/user-prediction.service';

@Component({
  selector: 'app-lototurf-prediccion',
  standalone: true,
  imports: [CommonModule, RouterLink, EuromillonesBallComponent],
  templateUrl: './lototurf-prediccion.component.html',
  styleUrl: './lototurf-prediccion.component.css'
})
export class LototurfPrediccionComponent implements OnInit, OnDestroy {
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
  emptyNumbers = Array(6).fill(null);
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
    private userPredictionService: UserPredictionService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadPredictionStatus();
    this.loadLotteryInfo();
    this.isLoggedIn = !!this.authService.currentUserValue;
    
    // El guard ya verificó que el usuario está logueado y tiene suscripción
    // Solo necesitamos cargar los detalles de la suscripción
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
  }

  private checkAllVerificationsCompleted(): void {
    this.verificationsCompleted++;
    if (this.verificationsCompleted >= 3) {
      this.isLoadingSubscriptionStatus = false;
      // El guard ya verificó que tiene suscripción, no necesitamos mostrar error
    }
  }

  private loadPredictionStatus() {
    this.userPredictionService.getPredictionStatus('lototurf').subscribe({
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
        if (data && data.lototurf) {
          this.boteActual = data.lototurf;
        } else {
          // Lototurf puede no tener bote acumulado, mostrar vacío
          this.boteActual = '';
        }
      },
      error: () => { 
        // En caso de error, también mostrar vacío para Lototurf
        this.boteActual = ''; 
      }
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
      const canGenerate = await this.userPredictionService.canGeneratePrediction('lototurf').toPromise();
      if (!canGenerate) {
        this.predictionError = `Ya has generado el máximo de ${this.maxPredictions} predicciones. Adquiere una nueva suscripción para seguir generando pronósticos afortunados.`;
        return;
      }
      this.isGeneratingPrediction = true;
      this.predictionError = null;
      this.showEmptyBalls = false;
      const response = await this.predictionService.generatePrediction('lototurf').toPromise();
      if (response && response.success && response.prediction) {
        await this.userPredictionService.createPrediction('lototurf', response.prediction).toPromise();
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
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    try {
      const savedJson = localStorage.getItem('lototurf_predictions');
      if (savedJson) {
        const savedData = JSON.parse(savedJson);
        const savedTime = new Date(savedData.timestamp).getTime();
        const currentTime = new Date().getTime();
        const hoursDiff = (currentTime - savedTime) / (1000 * 60 * 60);
        if (hoursDiff < 24) {
          if (Array.isArray(savedData.predictions)) {
            // Mapeo completo preservando todos los campos
            this.predictionResults = savedData.predictions.map((pred: any) => ({
              numeros: Array.isArray(pred.numeros) ? pred.numeros : [],
              estrellas: Array.isArray(pred.estrellas) ? pred.estrellas : [],
              complementario: typeof pred.complementario === 'number' ? pred.complementario : undefined,
              reintegro: typeof pred.reintegro === 'number' ? pred.reintegro : undefined,
              clave: typeof pred.clave === 'number' ? pred.clave : undefined,
              dream: typeof pred.dream === 'number' ? pred.dream : undefined,
              caballo: typeof pred.caballo === 'number' ? pred.caballo : undefined,
              numero: Array.isArray(pred.numero) ? pred.numero : undefined
            }));
            this.updateNumberFrequency();
          } else {
            this.predictionResults = [];
          }
        } else {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('lototurf_predictions');
          }
        }
      }
    } catch (error) {
      console.error('Error cargando predicciones guardadas:', error);
      this.predictionResults = [];
    }
  }

  private savePredictionsToStorage(): void {
    try {
      const dataToSave = {
        timestamp: new Date().toISOString(),
        predictions: this.predictionResults
      };
      localStorage.setItem('lototurf_predictions', JSON.stringify(dataToSave));
    } catch {}
  }

  private loadPredictionsFromStorage() {
    if (!isPlatformBrowser(this.platformId)) {
      this.updatePredictionDisplay();
      return;
    }
    
    const saved = localStorage.getItem('lototurfPredictions');
    if (saved) {
      this.predictionResults = JSON.parse(saved);
    }
    this.updatePredictionDisplay();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
} 