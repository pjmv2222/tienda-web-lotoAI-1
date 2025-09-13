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
  selector: 'app-primitiva-prediccion',
  standalone: true,
  imports: [CommonModule, RouterLink, EuromillonesBallComponent],
  templateUrl: './primitiva-prediccion.component.html',
  styleUrl: './primitiva-prediccion.component.css'
})
export class PrimitivaPrediccionComponent implements OnInit, OnDestroy {
  // Variables para el usuario y suscripciones
  isLoggedIn = false;
  hasBasicPlan: boolean | null = null;  // null = no verificado, true/false = verificado
  hasMonthlyPlan: boolean | null = null;
  hasProPlan: boolean | null = null;
  isLoadingSubscriptionStatus = true;
  private subscriptions: Subscription[] = [];
  private verificationsCompleted = 0;

  // Variables para las predicciones
  isGeneratingPrediction = false;
  predictionResults: any[] = [];
  predictionError: string | null = null;
  maxPredictions = 3; // Por defecto, plan básico
  userPlan: string = 'basic'; // Plan del usuario
  
  // Nuevas variables para el estado inicial con bolas vacías
  showEmptyBalls = true;
  emptyNumbers = Array(6).fill(null); // 6 números principales vacíos
  emptyComplementario = null;   // 1 complementario vacío

  // Información del sorteo
  proximoSorteo: string = '';
  boteActual: string = '';

  // Análisis de frecuencia
  private numberFrequency: Map<number, number> = new Map()

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
    // Cargar estado de predicciones desde el backend
    this.loadPredictionStatus();
    this.loadLotteryInfo();

    // Verificar si el usuario está autenticado
    this.isLoggedIn = !!this.authService.currentUserValue;

    // Verificar si el usuario tiene suscripciones activas
    if (this.isLoggedIn) {
      // Verificar plan básico
      const basicSub = this.subscriptionService.hasActivePlan('basic').subscribe(hasBasic => {
        this.hasBasicPlan = hasBasic;
        console.log('Usuario tiene plan básico:', this.hasBasicPlan);
        this.checkAllVerificationsCompleted();
      });
      this.subscriptions.push(basicSub);

      // Verificar plan mensual
      const monthlySub = this.subscriptionService.hasActivePlan('monthly').subscribe(hasMonthly => {
        this.hasMonthlyPlan = hasMonthly;
        console.log('Usuario tiene plan mensual:', this.hasMonthlyPlan);

        // Si tiene plan mensual, puede generar más predicciones
        if (hasMonthly) {
          this.maxPredictions = 10;
        }
        this.checkAllVerificationsCompleted();
      });
      this.subscriptions.push(monthlySub);

      // Verificar plan pro
      const proSub = this.subscriptionService.hasActivePlan('pro').subscribe(hasPro => {
        this.hasProPlan = hasPro;
        console.log('Usuario tiene plan pro:', this.hasProPlan);

        // Si tiene plan pro, puede generar más predicciones
        if (hasPro) {
          this.maxPredictions = 20;
        }
        this.checkAllVerificationsCompleted();
      });
      this.subscriptions.push(proSub);

      // Verificar si hay predicciones guardadas
      this.loadSavedPredictions();

      // La generación automática se manejará en checkAllVerificationsCompleted()
      // cuando se completen todas las verificaciones de suscripción
    } else {
      // El usuario no está autenticado, redirigir a la página de login
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: this.router.url }
      });
    }
  }

  /**
   * Verifica si todas las verificaciones de suscripción han sido completadas
   */
  private checkAllVerificationsCompleted(): void {
    this.verificationsCompleted++;
    if (this.verificationsCompleted >= 3) {
      this.isLoadingSubscriptionStatus = false;
      console.log('Todas las verificaciones de suscripción completadas');
      
      // Verificar si el usuario tiene algún plan activo
      if (!this.hasBasicPlan && !this.hasMonthlyPlan && !this.hasProPlan) {
        console.log('El usuario no tiene ningún plan activo');
        this.predictionError = 'Necesitas una suscripción activa para generar predicciones. <a routerLink="/planes">Ver planes disponibles</a>';
      }
    }
  }

  /**
   * Cargar estado de predicciones desde el backend
   */
  private loadPredictionStatus() {
    console.log('🔍 [DEBUG] Cargando estado de predicciones...');
    
    this.userPredictionService.getPredictionStatus('primitiva').subscribe({
      next: (response) => {
        console.log('✅ [DEBUG] Respuesta del backend:', response);
        
        if (response.success) {
          console.log('✅ [DEBUG] Datos recibidos:', {
            predictions: response.data.predictions,
            maxAllowed: response.data.maxAllowed,
            userPlan: response.data.userPlan
          });
          
          this.predictionResults = response.data.predictions.map(p => p.data);
          this.maxPredictions = response.data.maxAllowed;
          this.userPlan = response.data.userPlan;
          
          console.log('✅ [DEBUG] Estado actualizado:', {
            predictionResultsLength: this.predictionResults.length,
            maxPredictions: this.maxPredictions,
            userPlan: this.userPlan
          });
          
          // Actualizar la interfaz
          this.updatePredictionDisplay();
        } else {
          console.log('❌ [DEBUG] Respuesta no exitosa:', response);
        }
      },
      error: (error) => {
        console.error('❌ [DEBUG] Error cargando estado de predicciones:', error);
        console.error('❌ [DEBUG] Error detallado:', {
          status: error.status,
          statusText: error.statusText,
          url: error.url,
          message: error.message
        });
        
        // Fallback al comportamiento anterior si falla
        console.log('🔄 [DEBUG] Error al cargar desde backend, manteniendo predicciones de localStorage...');
      }
    });
  }

  /**
   * Carga información sobre el próximo sorteo y bote actual
   */
  private loadLotteryInfo(): void {
    // Obtener la fecha del próximo sorteo (lunes, miércoles, viernes y sábado)
    const hoy = new Date();
    const diaSemana = hoy.getDay(); // 0 (domingo) a 6 (sábado)

    // Calcular días hasta el próximo sorteo
    let diasHastaProximo = 0;
    if (diaSemana <= 1) { // Domingo o lunes
      diasHastaProximo = 1 - diaSemana;
    } else if (diaSemana <= 3) { // Martes o miércoles
      diasHastaProximo = 3 - diaSemana;
    } else if (diaSemana <= 5) { // Jueves o viernes
      diasHastaProximo = 5 - diaSemana;
    } else { // Sábado
      diasHastaProximo = 0;
    }

    // Si es día de sorteo y ya pasó la hora, ir al siguiente
    if (diasHastaProximo === 0 && hoy.getHours() >= 21) {
      if (diaSemana === 1) { // Lunes
        diasHastaProximo = 2; // Próximo miércoles
      } else if (diaSemana === 3) { // Miércoles
        diasHastaProximo = 2; // Próximo viernes
      } else if (diaSemana === 5) { // Viernes
        diasHastaProximo = 1; // Próximo sábado
      } else { // Sábado
        diasHastaProximo = 3; // Próximo lunes
      }
    }

    // Establecer la fecha del próximo sorteo
    const proximoSorteoDate = new Date(hoy);
    proximoSorteoDate.setDate(hoy.getDate() + diasHastaProximo);

    // Formatear la fecha
    const opciones: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    };
    this.proximoSorteo = proximoSorteoDate.toLocaleDateString('es-ES', opciones);
    this.proximoSorteo = this.proximoSorteo.charAt(0).toUpperCase() + this.proximoSorteo.slice(1);

    // Cargar el bote desde el mismo archivo que usa el header
    this.cargarBoteActual();
  }

  /**
   * Carga el bote actual desde el archivo JSON
   */
  private cargarBoteActual(): void {
    this.http.get('assets/botes.json').subscribe({
      next: (data: any) => {
        if (data && data.primitiva) {
          this.boteActual = data.primitiva;
        } else {
          this.boteActual = 'Consultar oficial';
        }
      },
      error: (error) => {
        console.error('Error cargando bote de Primitiva:', error);
        this.boteActual = 'Consultar oficial';
      }
    });
  }

  /**
   * Actualiza la visualización de las predicciones
   */
  private updatePredictionDisplay(): void {
    if (this.predictionResults.length > 0) {
      this.showEmptyBalls = false;
      this.updateNumberFrequency();
    }
  }

  /**
   * Actualiza la frecuencia de los números
   */
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

  /**
   * Genera una nueva predicción (método actualizado)
   */
  async generatePrediction() {
    if (this.isGeneratingPrediction) return;

    // Verificar límite usando el servicio
    try {
      const canGenerate = await this.userPredictionService.canGeneratePrediction('primitiva').toPromise();
      
      if (!canGenerate) {
        this.predictionError = `Ya has generado el máximo de ${this.maxPredictions} predicciones. Adquiere una nueva suscripción para seguir generando pronósticos afortunados.`;
        return;
      }

      this.isGeneratingPrediction = true;
      this.predictionError = null;
      this.showEmptyBalls = false;

      // Generar predicción usando el servicio existente
      const response = await this.predictionService.generatePrediction('primitiva').toPromise();
      
      if (response && response.success && response.prediction) {
        // Guardar en el backend
        await this.userPredictionService.createPrediction('primitiva', response.prediction).toPromise();
        
        // Actualizar la interfaz
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
      console.error('Error generando predicción:', error);
      this.predictionError = 'Error al generar predicción. Intenta de nuevo.';
    } finally {
      this.isGeneratingPrediction = false;
    }
  }

  /**
   * Carga predicciones guardadas previamente
   */
  private loadSavedPredictions(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    try {
      const savedJson = localStorage.getItem('primitiva_predictions');
      if (savedJson) {
        const savedData = JSON.parse(savedJson);

        // Verificar si las predicciones son recientes (menos de 24 horas)
        const savedTime = new Date(savedData.timestamp).getTime();
        const currentTime = new Date().getTime();
        const hoursDiff = (currentTime - savedTime) / (1000 * 60 * 60);

        if (hoursDiff < 24) {
          console.log('Cargando predicciones guardadas (generadas hace', Math.round(hoursDiff), 'horas)');

          // Verificar que las predicciones tengan el formato correcto
          if (Array.isArray(savedData.predictions)) {
            this.predictionResults = savedData.predictions.map((pred: any) => this.preserveAllPredictionFields(pred));

            // Actualizar la frecuencia de los números
            this.updateNumberFrequency();
          } else {
            console.warn('El formato de las predicciones guardadas no es válido');
            this.predictionResults = [];
          }
        } else {
          console.log('Las predicciones guardadas son demasiado antiguas (', Math.round(hoursDiff), 'horas)');
          if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('primitiva_predictions');
          }
        }
      }
    } catch (error) {
      console.error('Error cargando predicciones guardadas:', error);
      this.predictionResults = [];
    }
  }

  /**
   * Guarda las predicciones en localStorage
   */
  private savePredictionsToStorage(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    try {
      const dataToSave = {
        timestamp: new Date(),
        predictions: this.predictionResults
      };
      localStorage.setItem('primitiva_predictions', JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error guardando predicciones en localStorage:', error);
    }
  }

  /**
   * Preserva todos los campos de una predicción para evitar pérdida de datos
   */
  private preserveAllPredictionFields(prediction: any): any {
    const preserved: any = {};
    
    // Campos principales
    if (Array.isArray(prediction.numeros)) {
      preserved.numeros = prediction.numeros;
    }
    if (Array.isArray(prediction.estrellas)) {
      preserved.estrellas = prediction.estrellas;
    }
    if (Array.isArray(prediction.numero)) {
      preserved.numero = prediction.numero;
    }
    
    // Campos complementarios
    if (typeof prediction.complementario === 'number') {
      preserved.complementario = prediction.complementario;
    }
    if (typeof prediction.reintegro === 'number') {
      preserved.reintegro = prediction.reintegro;
    }
    if (typeof prediction.clave === 'number') {
      preserved.clave = prediction.clave;
    }
    if (typeof prediction.dream === 'number') {
      preserved.dream = prediction.dream;
    }
    if (typeof prediction.caballo === 'number') {
      preserved.caballo = prediction.caballo;
    }
    
    return preserved;
  }

  /**
   * Fallback para localStorage (compatibilidad)
   */
  private loadPredictionsFromStorage() {
    if (!isPlatformBrowser(this.platformId)) {
      this.updatePredictionDisplay();
      return;
    }
    
    const saved = localStorage.getItem('primitivaPredictions');
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
      localStorage.removeItem('primitiva_predictions');
    }
    
    // NO llamamos al backend para mantener el historial y contadores intactos
    console.log('🧹 Predicciones limpiadas de la visualización (historial mantenido)');
  }

  ngOnDestroy(): void {
    // Cancelar todas las suscripciones para evitar memory leaks
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
    let textToCopy = `Predicción La Primitiva`;
    
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