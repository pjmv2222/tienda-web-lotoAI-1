import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { SubscriptionService } from '../../services/subscription.service';
import { PredictionService, PredictionResponse } from '../../services/prediction.service';
import { EuromillonesBallComponent } from '../../components/euromillones-ball/euromillones-ball.component';

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
  
  // Nuevas variables para el estado inicial con bolas vacías
  showEmptyBalls = true;
  emptyNumbers = Array(5).fill(null); // 5 números principales vacíos
  emptyStars = Array(2).fill(null);   // 2 estrellas vacías

  // Información del sorteo
  proximoSorteo: string = '';
  boteActual: string = '';
  loading: boolean = true;

  // Análisis de frecuencia
  private numberFrequency: Map<number, number> = new Map();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private subscriptionService: SubscriptionService,
    private predictionService: PredictionService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Cargar información del próximo sorteo
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
      
      // Cargar predicciones guardadas si existen
      this.loadSavedPredictions();
      
      // Si no hay predicciones guardadas, mostrar las bolas vacías
      if (this.predictionResults.length === 0) {
        this.showEmptyBalls = true;
      } else {
        this.showEmptyBalls = false;
      }
    }
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
   * Carga el bote actual desde el mismo archivo que usa el header
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
        // Aplicar la misma lógica de limpieza que el header
        let boteValue = response['euromillones'];
        
        // Eliminar texto adicional y dejar solo el número
        boteValue = boteValue.replace('MILLONES', '').replace('€', '').replace('€', '').trim();
        
        // Asignar el valor limpio
        this.boteActual = boteValue;
      } else {
        this.boteActual = 'No disponible';
      }
    } catch (error) {
      console.error('Error cargando bote:', error);
      this.boteActual = 'No disponible';
    } finally {
      this.loading = false;
    }
  }

  /**
   * Limpia todas las predicciones generadas
   */
  clearPredictions(): void {
    this.predictionResults = [];
    this.showEmptyBalls = true;
    this.numberFrequency.clear();
    this.predictionError = null; // Limpiar errores previos
    
    // Limpiar el localStorage
    try {
      localStorage.removeItem('euromillon_predictions');
    } catch (e) {
      console.warn('No se pudo limpiar las predicciones del localStorage:', e);
    }
    
    console.log('Predicciones limpiadas');
  }

  /**
   * Genera predicciones para Euromillón
   */
  generatePredictions(): void {
    // Verificar si el usuario tiene al menos un plan activo
    if (!this.hasBasicPlan && !this.hasMonthlyPlan && !this.hasProPlan) {
      this.predictionError = 'Necesitas una suscripción activa para generar predicciones. Por favor, suscríbete a uno de nuestros planes.';
      return;
    }

    // Verificar límite de predicciones
    if (this.predictionResults.length >= 3) {
      this.predictionError = 'Ya has generado el máximo de 3 predicciones. Usa "Limpiar predicciones" para empezar de nuevo.';
      return;
    }

    this.isGeneratingPrediction = true;
    this.predictionError = null;
    this.showEmptyBalls = false; // Ocultar las bolas vacías mientras se generan predicciones

    console.log('Generando predicciones para Euromillón...');

    // Llamar al servicio de predicción (solo 1 predicción por solicitud)
    this.predictionService.generatePrediction('euromillones').subscribe({
      next: (response) => {
        console.log('Predicción generada exitosamente:', response);
        
        if (response.success && response.prediction) {
          // Ocultar bolas vacías y mostrar predicción real
          this.showEmptyBalls = false;
          
          // Agregar nueva predicción a los resultados existentes
          this.predictionResults.push({
            numeros: response.prediction.numeros || [],
            estrellas: response.prediction.estrellas || []
          });
          
          this.savePredictions();
        } else {
          this.predictionError = response.error || 'Error desconocido al generar predicción';
        }
        
        this.isGeneratingPrediction = false;
      },
      error: (error) => {
        console.error('Error al generar predicciones:', error);
        this.predictionError = 'No se pudieron generar las predicciones. Inténtalo de nuevo.';
        this.isGeneratingPrediction = false;
        this.showEmptyBalls = true; // Volver a mostrar bolas vacías si hay error
      }
    });
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
    try {
      localStorage.setItem('euromillon_predictions', JSON.stringify({
        timestamp: new Date().toISOString(),
        predictions: this.predictionResults
      }));
    } catch (e) {
      console.warn('No se pudo guardar las predicciones en localStorage:', e);
    }
  }

  /**
   * Carga predicciones guardadas previamente
   */
  private loadSavedPredictions(): void {
    try {
      const savedJson = localStorage.getItem('euromillon_predictions');
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
          localStorage.removeItem('euromillon_predictions');
        }
      }
    } catch (e) {
      console.warn('Error al cargar predicciones guardadas:', e);
      try {
        localStorage.removeItem('euromillon_predictions');
      } catch (e) {
        // Ignorar errores al limpiar
      }
    }
  }
}
