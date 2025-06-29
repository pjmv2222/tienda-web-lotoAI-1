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
  predictionResults: Array<{
    numeros?: number[];
    estrellas?: number[];
    complementario?: number;
    reintegro?: number;
    clave?: number;
    dream?: number;
    caballo?: number;
    numero?: number[];
  }> = [];
  predictionError: string | null = null;
  maxPredictions = 3; // Número máximo de predicciones para el plan básico

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
    this.verificationsCompleted++;
    
    if (this.verificationsCompleted >= 3) { // 3 verificaciones: basic, monthly, pro
      this.isLoadingSubscriptionStatus = false;
      
      // Si no hay predicciones guardadas y el usuario tiene al menos un plan, generar automáticamente
      if (this.predictionResults.length === 0 && (this.hasBasicPlan || this.hasMonthlyPlan || this.hasProPlan)) {
        setTimeout(() => this.generatePredictions(), 100); // Pequeño delay para evitar problemas de timing
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

    // Establecer el bote actual (simulado)
    this.boteActual = '17.000.000 €';

    // En un entorno real, se obtendría de una API o base de datos
    this.http.get<any>('assets/data/botes.json').subscribe({
      next: (data) => {
        if (data && data.euromillon) {
          this.boteActual = data.euromillon;
        }
      },
      error: (error) => {
        console.error('Error al cargar información del bote:', error);
      }
    });
  }

  /**
   * Genera predicciones para Euromillón
   */
  generatePredictions(): void {
    // Si aún estamos cargando el estado de suscripción, no hacer nada
    if (this.isLoadingSubscriptionStatus) {
      console.log('Aún cargando estado de suscripción...');
      return;
    }

    // Verificar si el usuario tiene un plan activo (comparaciones estrictas)
    if (this.hasBasicPlan === false && this.hasMonthlyPlan === false && this.hasProPlan === false) {
      console.log('El usuario no tiene un plan activo según las propiedades del componente');

      // Verificar si hay un pago reciente en localStorage
      try {
        const paymentData = localStorage.getItem('recent_payment');
        if (paymentData) {
          const payment = JSON.parse(paymentData);
          const paymentTime = new Date(payment.timestamp).getTime();
          const currentTime = new Date().getTime();
          const hoursDiff = (currentTime - paymentTime) / (1000 * 60 * 60);

          // Si el pago es de menos de 24 horas, permitir generar predicciones
          if (hoursDiff < 24) {
            console.log('Se encontró un pago reciente en localStorage, permitiendo generar predicciones');
            // Continuar con la generación de predicciones
            this.isGeneratingPrediction = true;
            this.predictionResults = [];
            this.predictionError = null;
            this.generateMultiplePredictions();
            return;
          }
        }
      } catch (e) {
        console.warn('Error al verificar pago reciente en localStorage:', e);
      }

      this.predictionError = 'Necesitas una suscripción activa para generar predicciones';
      return;
    }

    // Indicar que se está generando la predicción
    this.isGeneratingPrediction = true;
    this.predictionResults = [];
    this.predictionError = null;

    console.log('Generando predicciones para Euromillón...');

    // Verificar nuevamente el estado de la suscripción antes de generar la predicción
    this.subscriptionService.hasActiveSubscription().subscribe({
      next: (hasActive) => {
        console.log('Verificación de suscripción activa antes de generar predicción:', hasActive);

        if (!hasActive) {
          console.warn('La verificación de suscripción indica que el usuario no tiene una suscripción activa');

          // Verificar si hay un pago reciente en localStorage como respaldo
          try {
            const paymentData = localStorage.getItem('recent_payment');
            if (paymentData) {
              const payment = JSON.parse(paymentData);
              const paymentTime = new Date(payment.timestamp).getTime();
              const currentTime = new Date().getTime();
              const hoursDiff = (currentTime - paymentTime) / (1000 * 60 * 60);

              // Si el pago es de menos de 24 horas, permitir generar predicciones
              if (hoursDiff < 24) {
                console.log('Se encontró un pago reciente en localStorage, permitiendo generar predicciones');
                // Proceder con la generación de las predicciones
                this.generateMultiplePredictions();
                return;
              }
            }
          } catch (e) {
            console.warn('Error al verificar pago reciente en localStorage:', e);
          }

          this.isGeneratingPrediction = false;
          this.predictionError = 'No se detectó una suscripción activa. Por favor, actualiza la página o contacta con soporte.';
          return;
        }

        // Proceder con la generación de las predicciones
        this.generateMultiplePredictions();
      },
      error: (error) => {
        console.error('Error al verificar suscripción antes de generar predicción:', error);

        // En caso de error, verificar si hay un pago reciente en localStorage como respaldo
        try {
          const paymentData = localStorage.getItem('recent_payment');
          if (paymentData) {
            const payment = JSON.parse(paymentData);
            const paymentTime = new Date(payment.timestamp).getTime();
            const currentTime = new Date().getTime();
            const hoursDiff = (currentTime - paymentTime) / (1000 * 60 * 60);

            // Si el pago es de menos de 24 horas, permitir generar predicciones
            if (hoursDiff < 24) {
              console.log('Se encontró un pago reciente en localStorage, permitiendo generar predicciones a pesar del error');
              // Proceder con la generación de las predicciones
              this.generateMultiplePredictions();
              return;
            }
          }
        } catch (e) {
          console.warn('Error al verificar pago reciente en localStorage:', e);
        }

        this.isGeneratingPrediction = false;
        this.predictionError = 'Error al verificar tu suscripción. Por favor, inténtalo de nuevo.';
      }
    });
  }

  /**
   * Genera múltiples predicciones según el plan del usuario
   */
  private generateMultiplePredictions(): void {
    // Número de predicciones a generar según el plan
    let numPredictions = 3; // Plan básico

    if (this.hasProPlan) {
      numPredictions = 5; // Plan pro
    } else if (this.hasMonthlyPlan) {
      numPredictions = 5; // Plan mensual
    }

    console.log(`Generando ${numPredictions} predicciones...`);

    // Generar predicciones secuencialmente
    this.generatePredictionSequence(0, numPredictions);
  }

  /**
   * Genera predicciones de forma secuencial para evitar sobrecarga
   */
  private generatePredictionSequence(current: number, total: number): void {
    if (current >= total) {
      // Todas las predicciones han sido generadas
      this.isGeneratingPrediction = false;

      // Guardar las predicciones en localStorage
      this.savePredictions();

      // Actualizar la frecuencia de los números
      this.updateNumberFrequency();
      return;
    }

    // Generar una predicción
    this.predictionService.generatePrediction('euromillon').subscribe({
      next: (response: PredictionResponse) => {
        if (response.success && response.prediction) {
          // Asegurarse de que la predicción tenga el formato correcto
          const validPrediction = {
            numeros: Array.isArray(response.prediction.numeros) ? response.prediction.numeros : [],
            estrellas: Array.isArray(response.prediction.estrellas) ? response.prediction.estrellas : [],
            complementario: typeof response.prediction.complementario === 'number' ? response.prediction.complementario : undefined,
            reintegro: typeof response.prediction.reintegro === 'number' ? response.prediction.reintegro : undefined,
            clave: typeof response.prediction.clave === 'number' ? response.prediction.clave : undefined,
            dream: typeof response.prediction.dream === 'number' ? response.prediction.dream : undefined,
            caballo: typeof response.prediction.caballo === 'number' ? response.prediction.caballo : undefined,
            numero: Array.isArray(response.prediction.numero) ? response.prediction.numero : undefined
          };

          this.predictionResults.push(validPrediction);
        } else {
          console.warn('Error en predicción:', response.error);
        }

        // Generar la siguiente predicción
        this.generatePredictionSequence(current + 1, total);
      },
      error: (error) => {
        console.error('Error al generar predicción:', error);
        this.predictionError = 'Error al comunicarse con el servidor de predicciones';
        this.isGeneratingPrediction = false;
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
