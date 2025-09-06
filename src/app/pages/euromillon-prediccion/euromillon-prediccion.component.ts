import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { SubscriptionService } from '../../services/subscription.service';
import { PredictionService, PredictionResponse } from '../../services/prediction.service';
import { EuromillonesBallComponent } from '../../components/euromillones-ball/euromillones-ball.component';
import { UserPredictionService } from '../../services/user-prediction.service';
import { SafeLocalStorageService } from '../../services/safe-local-storage.service';

@Component({
  selector: 'app-euromillon-prediccion',
  standalone: true,
  imports: [CommonModule, RouterLink, EuromillonesBallComponent],
  templateUrl: './euromillon-prediccion.component.html',
  styleUrl: './euromillon-prediccion.component.css'
})
export class EuromillonPrediccionComponent implements OnInit, OnDestroy {
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
  emptyNumbers = Array(5).fill(null); // 5 números principales vacíos
  emptyStars = Array(2).fill(null);   // 2 estrellas vacías

  // Información del sorteo
  proximoSorteo: string = '';
  boteActual: string = '';

  // Análisis de frecuencia
  private numberFrequency: Map<number, number> = new Map();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private subscriptionService: SubscriptionService,
    private predictionService: PredictionService,
    private http: HttpClient,
    private userPredictionService: UserPredictionService,
    private safeLocalStorage: SafeLocalStorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Leer el parámetro del plan desde la URL
    this.route.queryParams.subscribe(params => {
      const planFromUrl = params['plan'];
      if (planFromUrl && ['basic', 'monthly', 'pro'].includes(planFromUrl)) {
        this.userPlan = planFromUrl;
        console.log('Plan especificado desde URL:', this.userPlan);
        
        // Ajustar el máximo de predicciones según el plan
        switch (this.userPlan) {
          case 'basic':
            this.maxPredictions = 3;
            break;
          case 'monthly':
            this.maxPredictions = 10;
            break;
          case 'pro':
            this.maxPredictions = 20;
            break;
        }
      }
    });

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

      // ✅ Removido: loadSavedPredictions() - ahora solo usa loadPredictionStatus() como las demás páginas
      
      // La generación automática se manejará en checkAllVerificationsCompleted()
      // cuando se completen todas las verificaciones de suscripción
    } else {
      // El usuario no está autenticado, redirigir a la página de login
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: this.router.url }
      });
    }
  }

  ngOnDestroy(): void {
    // Cancelar todas las suscripciones para evitar memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Verifica si todas las verificaciones de suscripción se han completado
   */
  private checkAllVerificationsCompleted(): void {
    // Solo marcar las verificaciones como completadas sin generar automáticamente
    if (this.hasBasicPlan !== null && this.hasMonthlyPlan !== null && this.hasProPlan !== null) {
      this.isLoadingSubscriptionStatus = false;
      
      // Verificar si el usuario tiene algún plan activo
      if (!this.hasBasicPlan && !this.hasMonthlyPlan && !this.hasProPlan) {
        this.predictionError = 'Necesitas una suscripción activa para generar predicciones. Por favor, suscríbete a uno de nuestros planes.';
        this.showEmptyBalls = false; // No mostrar bolas vacías si no tiene suscripción
        return;
      }
      
      // ✅ Removido: loadSavedPredictions() - ya se maneja en loadPredictionStatus()
      
      // Si no hay predicciones guardadas, mostrar las bolas vacías
      if (this.predictionResults.length === 0) {
        this.showEmptyBalls = true;
      } else {
        this.showEmptyBalls = false;
      }
    }
  }

  /**
   * Cargar estado de predicciones desde el backend
   */
  private loadPredictionStatus() {
    console.log('🔍 [DEBUG] Cargando estado de predicciones para plan:', this.userPlan);
    
    // 🆕 Pasar el plan específico al servicio
    this.userPredictionService.getPredictionStatus('euromillon', this.userPlan).subscribe({
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
          this.userPlan = response.data.userPlan; // ✅ Restaurado: usar plan real del backend
          
          console.log('✅ [DEBUG] Estado actualizado:', {
            predictionResultsLength: this.predictionResults.length,
            maxPredictions: this.maxPredictions,
            userPlan: this.userPlan,
            planFromUrl: this.userPlan
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
        
        // Fallback: mostrar bolas vacías si falla la carga desde backend
        console.log('🔄 [DEBUG] Error en backend, mostrando interfaz vacía...');
        this.predictionResults = [];
        this.showEmptyBalls = true;
      }
    });
  }

  /**
   * Carga información sobre el próximo sorteo y bote actual
   */
  private loadLotteryInfo(): void {
    // Obtener la fecha del próximo sorteo (martes y viernes)
    const hoy = new Date();
    const diaSemana = hoy.getDay(); // 0 (domingo) a 6 (sábado)

    // Calcular días hasta el próximo sorteo (martes = 2, viernes = 5)
    let diasHastaProximo = 0;
    if (diaSemana <= 2) { // Domingo, lunes o martes
      diasHastaProximo = 2 - diaSemana;
    } else if (diaSemana <= 5) { // Miércoles, jueves o viernes
      diasHastaProximo = 5 - diaSemana;
    } else { // Sábado
      diasHastaProximo = 3; // Martes (2 días + 1)
    }

    // Si es día de sorteo y ya pasó la hora, ir al siguiente
    if (diasHastaProximo === 0 && hoy.getHours() >= 21) {
      if (diaSemana === 2) { // Martes
        diasHastaProximo = 3; // Próximo viernes
      } else { // Viernes
        diasHastaProximo = 4; // Próximo martes
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
   * Cargar el bote actual desde el mismo archivo que usa el header
   */
  private async cargarBoteActual(): Promise<void> {
    try {
      const timestamp = new Date().getTime();
      const headers = {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      };
      
      const response = await this.http.get<{ [key: string]: string }>(`assets/botes.json?t=${timestamp}`, { headers }).toPromise();

      if (response && response['euromillones']) {
        // Usar el valor completo como en la página principal
        this.boteActual = response['euromillones'];
      } else {
        this.boteActual = 'No disponible';
      }
    } catch (error) {
      console.error('Error cargando bote:', error);
      this.boteActual = 'No disponible';
    }
  }

  /**
   * Actualiza la frecuencia de los números en las predicciones
   */
  private updateNumberFrequency(): void {
    // Limpiar el mapa de frecuencia
    this.numberFrequency.clear();

    // Contar la frecuencia de cada número
    for (const prediction of this.predictionResults) {
      if (prediction.numeros) {
        for (const num of prediction.numeros) {
          const count = this.numberFrequency.get(num) || 0;
          this.numberFrequency.set(num, count + 1);
        }
      }
    }

    console.log('Frecuencia de números actualizada:', this.numberFrequency);
  }

  /**
   * Obtiene los números más frecuentes en las predicciones
   * @returns Array de objetos con el número y su frecuencia
   */
  getMostFrequentNumbers(): { number: number, count: number }[] {
    // Convertir el mapa a un array
    const frequencyArray = Array.from(this.numberFrequency.entries())
      .map(([number, count]) => ({ number, count }))
      .sort((a, b) => b.count - a.count) // Ordenar por frecuencia descendente
      .slice(0, 5); // Tomar los 5 más frecuentes

    return frequencyArray;
  }

  /**
   * Guarda las predicciones en localStorage
   */
  private savePredictions(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    const success = this.safeLocalStorage.setObject('euromillon_predictions', {
      timestamp: new Date().toISOString(),
      predictions: this.predictionResults
    });
    
    if (!success) {
      console.warn('No se pudo guardar las predicciones en localStorage');
    }
  }

  /**
   * Carga predicciones guardadas previamente
   */
  private loadSavedPredictions(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    const savedData = this.safeLocalStorage.getObject<{timestamp: string, predictions: any}>('euromillon_predictions');
    
    if (savedData && savedData.predictions) {
      // Verificar si las predicciones son recientes (menos de 24 horas)
      const savedTime = new Date(savedData.timestamp).getTime();
      const currentTime = new Date().getTime();
      const hoursDiff = (currentTime - savedTime) / (1000 * 60 * 60);

      if (hoursDiff < 24) {
        console.log('Cargando predicciones guardadas (generadas hace', Math.round(hoursDiff), 'horas)');

        // Verificar que las predicciones tengan el formato correcto
        if (Array.isArray(savedData.predictions)) {
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

          // Actualizar la frecuencia de los números
          this.updateNumberFrequency();
        } else {
          console.warn('El formato de las predicciones guardadas no es válido');
          this.predictionResults = [];
        }
      } else {
        console.log('Las predicciones guardadas son demasiado antiguas (', Math.round(hoursDiff), 'horas)');
        this.safeLocalStorage.removeItem('euromillon_predictions');
        this.predictionResults = [];
      }
    } else {
      // No hay predicciones guardadas
      this.predictionResults = [];
    }
  }

  private updatePredictionDisplay() {
    // Actualizar la interfaz después de cargar/actualizar predicciones
    this.showEmptyBalls = this.predictionResults.length === 0;
    this.updateNumberFrequency();
    this.savePredictions();
  }

  /**
   * Genera una nueva predicción (método actualizado)
   */
  async generatePrediction() {
    if (this.isGeneratingPrediction) return;

    // Verificar límite usando el servicio con el plan específico
    try {
      const canGenerate = await this.userPredictionService.canGeneratePrediction('euromillon', this.userPlan).toPromise();
      
      if (!canGenerate) {
        this.predictionError = `Ya has generado el máximo de ${this.maxPredictions} predicciones para el plan ${this.userPlan}. Adquiere una nueva suscripción para seguir generando pronósticos afortunados.`;
        return;
      }

      this.isGeneratingPrediction = true;
      this.predictionError = null;
      this.showEmptyBalls = false;

      // Generar predicción usando el servicio existente con el plan específico
      const response = await this.predictionService.generatePrediction('euromillones', this.userPlan).toPromise();
      
      if (response && response.success && response.prediction) {
        // Guardar la predicción en el backend con el plan específico
        await this.userPredictionService.createPrediction('euromillon', response.prediction, this.userPlan).toPromise();
        
        // Actualizar la interfaz
        this.predictionResults.push({
          numeros: response.prediction.numeros || [],
          estrellas: response.prediction.estrellas || []
        });
        this.updatePredictionDisplay();
        
        // ✅ Recargar el estado para actualizar los contadores
        this.loadPredictionStatus();
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
   * Método de generación de predicciones (compatibilidad con template)
   */
  generatePredictions() {
    this.generatePrediction();
  }

  /**
   * Limpiar predicciones SOLO de la visualización (mantener historial)
   */
  clearPredictions() {
    // Solo limpiar la visualización local, NO el historial de la base de datos
    this.predictionResults = [];
    this.numberFrequency.clear();
    this.showEmptyBalls = true;
    
    // Limpiar solo el localStorage local para la visualización
    this.safeLocalStorage.removeItem('euromillon_predictions');
    
    // NO llamamos al backend para mantener el historial y contadores intactos
    console.log('🧹 Predicciones limpiadas de la visualización (historial mantenido)');
  }

  /**
   * Fallback para localStorage (compatibilidad)
   */
  private loadPredictionsFromStorage() {
    const saved = this.safeLocalStorage.getItem('euromillonPredictions');
    if (saved) {
      try {
        this.predictionResults = JSON.parse(saved);
      } catch (error) {
        console.warn('Error parsing saved predictions:', error);
        this.predictionResults = [];
      }
    }
  }
}
