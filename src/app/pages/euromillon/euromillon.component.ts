import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { EuromillonesBallComponent } from '../../components/euromillones-ball/euromillones-ball.component';
import { AuthService } from '../../services/auth.service';
import { SubscriptionService } from '../../services/subscription.service';
import { PredictionService, PredictionResponse } from '../../services/prediction.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { LotteryBaseComponent } from '../../shared/lottery-base.component';

interface LotteryData {
  botes: { [key: string]: string };
  resultados: Array<{
    game: string;
    numbers: number[];
    stars?: number[];
    date: string;
    complementario?: number;
    reintegro?: number;
    joker?: string;
    millon?: string;
  }>;
}

@Component({
  selector: 'app-euromillon',
  standalone: true,
  imports: [RouterLink, CommonModule, EuromillonesBallComponent],
  templateUrl: './euromillon.component.html',
  styleUrl: './euromillon.component.css'
})
export class EuromillonComponent extends LotteryBaseComponent implements OnInit, OnDestroy {
  protected override gameId: string = 'euromillones';

  isLoggedIn = false;
  hasBasicPlan: boolean | null = null;    // Cambiar a null para evitar false inicial
  hasMonthlyPlan: boolean | null = null;  // Cambiar a null para evitar false inicial
  hasProPlan: boolean | null = null;      // Cambiar a null para evitar false inicial
  isLoadingSubscriptionStatus = false;    // Nueva propiedad para controlar el loading
  private mutationObserver: MutationObserver | null = null;
  private subscriptions: Subscription[] = [];

  // Variables para las predicciones
  isGeneratingPrediction = false;
  predictionResult: PredictionResponse['prediction'] | null = null;
  predictionError: string | null = null;

  // Variables para los últimos resultados
  ultimosResultados: {
    fecha: string;
    numeros: number[];
    estrellas: number[];
  } | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private subscriptionService: SubscriptionService,
    predictionService: PredictionService,
    http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
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

    // Cargar los últimos resultados desde lottery-data.json
    this.loadUltimosResultados();

    console.log('[DIAGNÓSTICO] EuromillonComponent: ngOnInit iniciado');

    // Programar una verificación para comprobar si las bolas se están renderizando correctamente
    setTimeout(() => {
      console.log('[DIAGNÓSTICO] EuromillonComponent: Verificando bolas después de 1 segundo');
      this.checkBallsRendering();
      this.setupMutationObserver();
    }, 1000);

    setTimeout(() => {
      console.log('[DIAGNÓSTICO] EuromillonComponent: Verificando bolas después de 3 segundos');
      this.checkBallsRendering();
    }, 3000);

    // Verificación adicional después de 5 segundos
    setTimeout(() => {
      console.log('[DIAGNÓSTICO] EuromillonComponent: Verificando bolas después de 5 segundos');
      this.checkBallsRendering();
      this.forceRenderMissingBalls();
    }, 5000);

    // Verificación final después de 10 segundos
    setTimeout(() => {
      console.log('[DIAGNÓSTICO] EuromillonComponent: Verificación final después de 10 segundos');
      this.checkBallsRendering();
      // Intentar una última vez con las bolas que aún falten
      this.forceRenderMissingBalls();
    }, 10000);
  }

  /**
   * NUEVA FUNCIÓN: Verificar suscripciones del usuario
   * Se puede llamar tanto en la inicialización como después del re-login
   */
  private checkSubscriptions(): void {
    this.isLoadingSubscriptionStatus = true;
    let completedChecks = 0;
    const totalChecks = 3;

    const checkCompleted = () => {
      completedChecks++;
      if (completedChecks === totalChecks) {
        this.isLoadingSubscriptionStatus = false;
        console.log('Todas las verificaciones de suscripción completadas');
        console.log('Estado final de planes:', {
          hasBasicPlan: this.hasBasicPlan,
          hasMonthlyPlan: this.hasMonthlyPlan,
          hasProPlan: this.hasProPlan
        });
      }
    };

    // Verificar plan básico
    const basicSub = this.subscriptionService.hasActivePlan('basic').subscribe(hasBasic => {
      this.hasBasicPlan = hasBasic;
      console.log('Usuario tiene plan básico:', this.hasBasicPlan);
      checkCompleted();
    });
    this.subscriptions.push(basicSub);

    // Verificar plan mensual
    const monthlySub = this.subscriptionService.hasActivePlan('monthly').subscribe(hasMonthly => {
      this.hasMonthlyPlan = hasMonthly;
      console.log('Usuario tiene plan mensual:', this.hasMonthlyPlan);
      checkCompleted();
    });
    this.subscriptions.push(monthlySub);

    // Verificar plan pro
    const proSub = this.subscriptionService.hasActivePlan('pro').subscribe(hasPro => {
      this.hasProPlan = hasPro;
      console.log('Usuario tiene plan pro:', this.hasProPlan);
      checkCompleted();
    });
    this.subscriptions.push(proSub);

    // Verificar si hay una predicción guardada en localStorage
    this.loadSavedPrediction();
  }

  /**
   * NUEVA FUNCIÓN: Resetear estado de suscripciones cuando el usuario no está autenticado
   */
  private resetSubscriptionStatus(): void {
    this.hasBasicPlan = false;
    this.hasMonthlyPlan = false;
    this.hasProPlan = false;
    this.isLoadingSubscriptionStatus = false;
    console.log('Usuario no autenticado, planes reseteados');
  }

  ngOnDestroy(): void {
    console.log('[DIAGNÓSTICO] EuromillonComponent: ngOnDestroy llamado');
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }

    // Cancelar todas las suscripciones para evitar memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private setupMutationObserver(): void {
    // Solo ejecutar en el navegador, no en SSR
    if (!isPlatformBrowser(this.platformId)) {
      console.log('[DIAGNÓSTICO] EuromillonComponent: setupMutationObserver saltado en SSR');
      return;
    }

    // Observar el primer contenedor de bolas para detectar cambios en el DOM
    const container = document.getElementById('most-frequent-numbers-container');
    if (!container) {
      console.warn('[DIAGNÓSTICO] EuromillonComponent: No se pudo encontrar el contenedor para observar');
      return;
    }

    console.log('[DIAGNÓSTICO] EuromillonComponent: Configurando MutationObserver');

    // Crear un observador que detecte cambios en los hijos del contenedor
    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          if (mutation.removedNodes.length > 0) {
            console.warn(`[DIAGNÓSTICO] EuromillonComponent: Se eliminaron ${mutation.removedNodes.length} nodos del contenedor`);
            Array.from(mutation.removedNodes).forEach((node: Node) => {
              if (node instanceof HTMLElement) {
                console.warn(`[DIAGNÓSTICO] EuromillonComponent: Nodo eliminado: ${node.tagName} ${node.id || 'sin ID'}`);
              }
            });
          }
          if (mutation.addedNodes.length > 0) {
            console.log(`[DIAGNÓSTICO] EuromillonComponent: Se añadieron ${mutation.addedNodes.length} nodos al contenedor`);
          }
        }
      });

      // Verificar el estado actual del contenedor después de las mutaciones
      this.checkBallsRendering();
    });

    // Iniciar la observación
    this.mutationObserver.observe(container, { childList: true, subtree: true });
    console.log('[DIAGNÓSTICO] EuromillonComponent: MutationObserver iniciado');
  }

  private checkBallsRendering(): void {
    // Solo ejecutar en el navegador, no en SSR
    if (!isPlatformBrowser(this.platformId)) {
      console.log('[DIAGNÓSTICO] EuromillonComponent: checkBallsRendering saltado en SSR');
      return;
    }

    // Verificar las bolas en el primer contenedor (números más frecuentes)
    const firstContainer = document.querySelector('.stats-container .stats-card:first-child .lottery-balls-container');
    if (firstContainer) {
      const ballWrappers = firstContainer.querySelectorAll('.ball-wrapper');
      console.log(`[DIAGNÓSTICO] EuromillonComponent: Primer contenedor tiene ${ballWrappers.length} ball-wrappers`);

      ballWrappers.forEach((wrapper, index) => {
        const canvas = wrapper.querySelector('canvas');
        const ballId = wrapper.getAttribute('id');
        if (canvas) {
          console.log(`[DIAGNÓSTICO] EuromillonComponent: Bola ${index} (${ballId}) tiene canvas`);
        } else {
          console.warn(`[DIAGNÓSTICO] EuromillonComponent: Bola ${index} (${ballId}) NO tiene canvas`);
        }
      });
    } else {
      console.warn('[DIAGNÓSTICO] EuromillonComponent: No se encontró el primer contenedor de bolas');
    }

    // Verificar las bolas en el segundo contenedor (estrellas más frecuentes)
    const secondContainer = document.querySelector('.stats-container .stats-card:nth-child(2) .lottery-balls-container');
    if (secondContainer) {
      const ballWrappers = secondContainer.querySelectorAll('.ball-wrapper');
      console.log(`[DIAGNÓSTICO] EuromillonComponent: Segundo contenedor tiene ${ballWrappers.length} ball-wrappers`);

      ballWrappers.forEach((wrapper, index) => {
        const canvas = wrapper.querySelector('canvas');
        if (canvas) {
          console.log(`[DIAGNÓSTICO] EuromillonComponent: Estrella ${index} tiene canvas`);
        } else {
          console.warn(`[DIAGNÓSTICO] EuromillonComponent: Estrella ${index} NO tiene canvas`);
        }
      });
    }

    // Verificar las bolas en el tercer contenedor (números menos frecuentes)
    const thirdContainer = document.querySelector('.stats-container .stats-card:nth-child(3) .lottery-balls-container');
    if (thirdContainer) {
      const ballWrappers = thirdContainer.querySelectorAll('.ball-wrapper');
      console.log(`[DIAGNÓSTICO] EuromillonComponent: Tercer contenedor tiene ${ballWrappers.length} ball-wrappers`);

      // Las bolas menos frecuentes siempre usan imágenes estáticas, no necesitan canvas
      ballWrappers.forEach((wrapper, index) => {
        const img = wrapper.querySelector('img');
        const fallback = wrapper.querySelector('.fallback-ball');
        if (img) {
          console.log(`[DIAGNÓSTICO] EuromillonComponent: Bola menos frecuente ${index} tiene imagen estática`);
        } else if (fallback) {
          console.log(`[DIAGNÓSTICO] EuromillonComponent: Bola menos frecuente ${index} usa imagen de respaldo`);
        } else {
          console.warn(`[DIAGNÓSTICO] EuromillonComponent: Bola menos frecuente ${index} NO tiene imagen visible`);
        }
      });
    }

    // Verificar las bolas en el cuarto contenedor (últimos resultados)
    const fourthContainer = document.getElementById('last-results-container');
    if (fourthContainer) {
      const ballWrappers = fourthContainer.querySelectorAll('.ball-wrapper');
      console.log(`[DIAGNÓSTICO] EuromillonComponent: Contenedor de últimos resultados tiene ${ballWrappers.length} ball-wrappers`);

      ballWrappers.forEach((wrapper, index) => {
        const canvas = wrapper.querySelector('canvas');
        const img = wrapper.querySelector('img');
        const ballId = wrapper.getAttribute('id');
        if (canvas) {
          console.log(`[DIAGNÓSTICO] EuromillonComponent: Bola de resultado ${index} (${ballId}) tiene canvas`);
        } else if (img) {
          console.log(`[DIAGNÓSTICO] EuromillonComponent: Bola de resultado ${index} (${ballId}) tiene imagen estática`);
        } else {
          console.warn(`[DIAGNÓSTICO] EuromillonComponent: Bola de resultado ${index} (${ballId}) NO tiene representación visual`);
        }
      });
    } else {
      console.warn('[DIAGNÓSTICO] EuromillonComponent: No se encontró el contenedor de últimos resultados');
    }
  }

  // generateBasicPrediction method removed - prediction generation now handled by dedicated prediction pages

  // callPredictionService method removed - prediction generation now handled by dedicated prediction pages

  showSubscriptionOptions(): void {
    // Lógica para mostrar las opciones de suscripción
    console.log('Mostrando opciones de suscripción...');
    // Navegar a la página de planes de suscripción
    this.router.navigate(['/planes']);
  }

  /**
   * Carga una predicción guardada previamente en localStorage
   */
  private loadSavedPrediction(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    try {
      const savedPredictionJson = localStorage.getItem('euromillon_last_prediction');
      if (savedPredictionJson) {
        const savedData = JSON.parse(savedPredictionJson);

        // Verificar si la predicción es reciente (menos de 24 horas)
        const savedTime = new Date(savedData.timestamp).getTime();
        const currentTime = new Date().getTime();
        const hoursDiff = (currentTime - savedTime) / (1000 * 60 * 60);

        if (hoursDiff < 24) {
          console.log('Cargando predicción guardada de Euromillón (generada hace', Math.round(hoursDiff), 'horas)');
          this.predictionResult = savedData.prediction;
        } else {
          console.log('La predicción guardada es demasiado antigua (', Math.round(hoursDiff), 'horas)');
          localStorage.removeItem('euromillon_last_prediction');
        }
      }
    } catch (e) {
      console.warn('Error al cargar la predicción guardada:', e);
      // Limpiar el localStorage en caso de error
      try {
        localStorage.removeItem('euromillon_last_prediction');
      } catch (e) {
        // Ignorar errores al limpiar
      }
    }
  }

  /**
   * Intenta forzar el renderizado de las bolas que no se han renderizado correctamente
   */
  private forceRenderMissingBalls(): void {
    // Solo funciona en el navegador
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    console.log('[DIAGNÓSTICO] EuromillonComponent: Intentando forzar renderizado de bolas faltantes');

    // Forzar limpieza de contextos WebGL para liberar recursos
    const contextManager = (window as any).WebGLContextManager;
    if (contextManager) {
      if (typeof contextManager.forceCleanupContexts === 'function') {
        contextManager.forceCleanupContexts();
      } else if (typeof contextManager.cleanupLowPriorityContexts === 'function') {
        contextManager.cleanupLowPriorityContexts();
      }
    }

    // Verificar y forzar renderizado en todos los contenedores
    const containers = [
      // Cuarto contenedor (últimos resultados)
      document.getElementById('last-results-container'),
      // Segundo contenedor (estrellas)
      document.querySelector('.stats-container .stats-card:nth-child(2) .lottery-balls-container'),
      // Primer contenedor (números más frecuentes)
      document.querySelector('.stats-container .stats-card:first-child .lottery-balls-container')
    ];

    // El tercer contenedor (números menos frecuentes) usa imágenes estáticas, no necesita forzar renderizado WebGL

    // Programar una segunda limpieza de contextos después de un breve retraso
    setTimeout(() => {
      if (contextManager && typeof contextManager.forceCleanupContexts === 'function') {
        contextManager.forceCleanupContexts();
      }
    }, 500);

    // Procesar cada contenedor con un retraso para dar tiempo a que se liberen recursos
    containers.forEach((container, containerIndex) => {
      if (!container) return;

      // Retrasar el procesamiento de cada contenedor para escalonar la carga
      setTimeout(() => {
        const ballWrappers = container.querySelectorAll('.ball-wrapper');
        let missingBalls = 0;

        // Procesar cada bola en el contenedor
        ballWrappers.forEach((wrapper, index) => {
          const canvas = wrapper.querySelector('canvas');
          const img = wrapper.querySelector('img');
          const ballComponent = wrapper.querySelector('app-euromillones-ball');

          // Verificar si hay alguna representación visual (canvas, imagen o fallback)
          const fallback = wrapper.querySelector('.fallback-ball');
          const hasVisualRepresentation = canvas || img || fallback;

          // Si no hay representación visual, intentar forzar el renderizado
          if (!hasVisualRepresentation) {
            missingBalls++;
            const containerName = containerIndex === 0 ? 'últimos resultados' :
                                 containerIndex === 1 ? 'estrellas frecuentes' : 'números frecuentes';
            console.log(`[DIAGNÓSTICO] EuromillonComponent: Forzando renderizado de bola ${index} en contenedor ${containerName}`);

            // Forzar reflow del DOM para intentar que se renderice
            const htmlWrapper = wrapper as HTMLElement;
            htmlWrapper.style.display = 'none';

            // Usar un timeout escalonado para dar tiempo a que se liberen recursos
            setTimeout(() => {
              // Volver a mostrar el wrapper
              htmlWrapper.style.display = 'inline-block';

              // Si hay un componente de bola, intentar forzar su renderizado
              if (ballComponent) {
                // Intentar forzar la creación de imagen estática
                try {
                  // Forzar un cambio visual para provocar una re-renderización
                  const element = ballComponent as HTMLElement;
                  element.style.transform = 'scale(1.01)';

                  setTimeout(() => {
                    element.style.transform = 'scale(1)';

                    // Intentar forzar la creación de imagen estática nuevamente después de un breve retraso
                    setTimeout(() => {
                      // Forzar un reflow adicional
                      element.style.opacity = '0.99';
                      setTimeout(() => {
                        element.style.opacity = '1';
                      }, 50);
                    }, 100);
                  }, 50);
                } catch (e) {
                  console.error('Error al forzar renderizado:', e);
                }
              }
            }, 200 + (100 * index)); // Escalonar los tiempos para evitar sobrecarga
          }
        });

        if (missingBalls > 0) {
          const containerName = containerIndex === 0 ? 'últimos resultados' :
                               containerIndex === 1 ? 'estrellas frecuentes' : 'números frecuentes';
          console.log(`[DIAGNÓSTICO] EuromillonComponent: Se encontraron ${missingBalls} bolas faltantes en el contenedor ${containerName}`);
        }
      }, 800 * containerIndex); // Retrasar cada contenedor para dar tiempo a procesar el anterior
    });

    // Programar una verificación final después de todos los intentos
    setTimeout(() => {
      this.checkBallsRendering();
    }, 5000);
  }

  /**
   * Cargar los últimos resultados desde lottery-data.json
   */
  private async loadUltimosResultados(): Promise<void> {
    try {
      console.log('[EUROMILLONES] Cargando últimos resultados...');
      const timestamp = new Date().getTime();
      const response = await this.http.get<LotteryData>(`assets/lottery-data.json?t=${timestamp}`).toPromise();
      
      if (response?.resultados && Array.isArray(response.resultados)) {
        const resultado = response.resultados.find(r => r.game === 'euromillones');
        if (resultado) {
          this.ultimosResultados = {
            fecha: resultado.date,
            numeros: resultado.numbers || [],
            estrellas: resultado.stars || []
          };
          console.log('[EUROMILLONES] Últimos resultados cargados:', this.ultimosResultados);
        } else {
          console.warn('[EUROMILLONES] No se encontraron datos de euromillones en lottery-data.json');
          // Usar datos de fallback
          this.ultimosResultados = {
            fecha: 'Viernes, 5 de abril de 2024',
            numeros: [12, 20, 25, 31, 48],
            estrellas: [4, 12]
          };
        }
      } else {
        console.warn('[EUROMILLONES] Estructura de datos incorrecta en lottery-data.json');
        // Usar datos de fallback
        this.ultimosResultados = {
          fecha: 'Viernes, 5 de abril de 2024',
          numeros: [12, 20, 25, 31, 48],
          estrellas: [4, 12]
        };
      }
    } catch (error) {
      console.error('[EUROMILLONES] Error al cargar últimos resultados:', error);
      // Usar datos de fallback en caso de error
      this.ultimosResultados = {
        fecha: 'Viernes, 5 de abril de 2024',
        numeros: [12, 20, 25, 31, 48],
        estrellas: [4, 12]
      };
    }
  }
}
