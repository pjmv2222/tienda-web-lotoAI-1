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
  selector: 'app-bonoloto-prediccion',
  standalone: true,
  imports: [CommonModule, RouterLink, EuromillonesBallComponent],
  templateUrl: './bonoloto-prediccion.component.html',
  styleUrl: './bonoloto-prediccion.component.css'
})
export class BonolotoPrediccionComponent implements OnInit, OnDestroy {
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
  emptyComplementario = null;
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
    this.userPredictionService.getPredictionStatus('bonoloto').subscribe({
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
        if (data && data.bonoloto) this.boteActual = data.bonoloto;
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
      const canGenerate = await this.userPredictionService.canGeneratePrediction('bonoloto').toPromise();
      if (!canGenerate) {
        this.predictionError = `Ya has generado el máximo de ${this.maxPredictions} predicciones. Adquiere una nueva suscripción para seguir generando pronósticos afortunados.`;
        return;
      }
      this.isGeneratingPrediction = true;
      this.predictionError = null;
      this.showEmptyBalls = false;
      const response = await this.predictionService.generatePrediction('bonoloto').toPromise();
      if (response && response.success && response.prediction) {
        await this.userPredictionService.createPrediction('bonoloto', response.prediction).toPromise();
        this.predictionResults.push({
          id: Date.now(),
          numeros: response.prediction.numeros || [],
          complementario: response.prediction.complementario || null,
          timestamp: new Date()
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
      const savedJson = localStorage.getItem('bonoloto_predictions');
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
            localStorage.removeItem('bonoloto_predictions');
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
        timestamp: new Date(),
        predictions: this.predictionResults
      };
      localStorage.setItem('bonoloto_predictions', JSON.stringify(dataToSave));
    } catch {}
  }

  private loadPredictionsFromStorage() {
    if (!isPlatformBrowser(this.platformId)) {
      this.updatePredictionDisplay();
      return;
    }
    
    const saved = localStorage.getItem('bonolotoPredictions');
    if (saved) {
      this.predictionResults = JSON.parse(saved);
    }
    this.updatePredictionDisplay();
  }

  clearPredictions() {
    // Solo limpiar la visualización local, NO el historial de la base de datos
    this.predictionResults = [];
    this.numberFrequency.clear();
    this.showEmptyBalls = true;
    
    // Limpiar solo el localStorage local para la visualización
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('bonoloto_predictions');
    }
    
    // NO llamamos al backend para mantener el historial y contadores intactos
    console.log('🧹 Predicciones limpiadas de la visualización (historial mantenido)');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Formatea la fecha de timestamp para mostrar hace cuánto tiempo se generó
   */
  formatTimestamp(timestamp: string | Date | undefined): string {
    if (!timestamp) return '';
    
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    if (isNaN(date.getTime())) return '';
    
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${date.toLocaleDateString()} a las ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (hours > 0) {
      return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
      return `Hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    } else {
      return 'Hace unos momentos';
    }
  }

  /**
   * Copia la predicción al portapapeles
   */
  copyPredictionToClipboard(prediction: any): void {
    let textToCopy = `Predicción Bonoloto`;
    
    // Agregar timestamp
    if (prediction.timestamp) {
      const timestampString = this.formatTimestamp(prediction.timestamp);
      if (timestampString) {
        textToCopy += ` - ${timestampString}`;
      }
    }
    
    textToCopy += `\nNúmeros: ${prediction.numeros.join(', ')}`;
    
    if (prediction.complementario) {
      textToCopy += `\nComplementario: ${prediction.complementario}`;
    }
    
    textToCopy += `\n\nGenerado por IA en loto-ai.com`;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        this.showCopySuccess();
      }).catch(() => {
        this.fallbackCopyToClipboard(textToCopy);
      });
    } else {
      this.fallbackCopyToClipboard(textToCopy);
    }
  }

  /**
   * Método alternativo para copiar en navegadores sin soporte de clipboard API
   */
  private fallbackCopyToClipboard(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      this.showCopySuccess();
    } catch (error) {
      console.error('Error copiando al portapapeles:', error);
    }
    
    document.body.removeChild(textArea);
  }

  /**
   * Muestra mensaje de éxito al copiar
   */
  private showCopySuccess(): void {
    // Crear elemento temporal para mostrar mensaje
    const message = document.createElement('div');
    message.textContent = '✅ Predicción copiada al portapapeles';
    message.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4CAF50;
      color: white;
      padding: 10px 15px;
      border-radius: 5px;
      z-index: 10000;
      font-size: 14px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(message);
    
    // Remover después de 3 segundos
    setTimeout(() => {
      if (document.body.contains(message)) {
        document.body.removeChild(message);
      }
    }, 3000);
  }
} 