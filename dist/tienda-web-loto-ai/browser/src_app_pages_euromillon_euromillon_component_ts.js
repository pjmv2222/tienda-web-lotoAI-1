"use strict";
(self["webpackChunktienda_web_loto_ai"] = self["webpackChunktienda_web_loto_ai"] || []).push([["src_app_pages_euromillon_euromillon_component_ts"],{

/***/ 1181:
/*!**********************************************************!*\
  !*** ./src/app/pages/euromillon/euromillon.component.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EuromillonComponent: () => (/* binding */ EuromillonComponent)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _components_euromillones_ball_euromillones_ball_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/euromillones-ball/euromillones-ball.component */ 1913);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/auth.service */ 4796);
/* harmony import */ var _services_subscription_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/subscription.service */ 4227);








function EuromillonComponent_span_48_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "GRATIS");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function EuromillonComponent_p_61_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Necesitas ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "a", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "iniciar sesi\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, " para generar predicciones");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function EuromillonComponent_p_62_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Necesitas ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "a", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "suscribir este plan");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, " para generar predicciones");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function EuromillonComponent_span_67_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "10,22\u20AC");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function EuromillonComponent_span_68_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "ACTIVADO");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function EuromillonComponent_button_81_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function EuromillonComponent_button_81_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.showSubscriptionOptions());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Suscribir");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function EuromillonComponent_button_82_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Generar");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", true);
  }
}
function EuromillonComponent_p_83_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Necesitas ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "a", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "iniciar sesi\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, " para generar predicciones premium");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function EuromillonComponent_span_88_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "122\u20AC");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function EuromillonComponent_span_89_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "ACTIVADO");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function EuromillonComponent_button_104_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function EuromillonComponent_button_104_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.showSubscriptionOptions());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Suscribir");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function EuromillonComponent_button_105_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Generar");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", true);
  }
}
function EuromillonComponent_p_106_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Necesitas ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "a", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "iniciar sesi\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, " para generar predicciones premium");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
class EuromillonComponent {
  constructor(router, authService, subscriptionService) {
    this.router = router;
    this.authService = authService;
    this.subscriptionService = subscriptionService;
    this.isLoggedIn = false;
    this.hasBasicPlan = false;
    this.hasMonthlyPlan = false;
    this.hasProPlan = false;
    this.mutationObserver = null;
    this.subscriptions = [];
  }
  ngOnInit() {
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
      // Para pruebas: simular que el usuario tiene un plan básico
      // Comentar o eliminar estas líneas en producción
      this.hasBasicPlan = true;
      console.log('Simulando que el usuario tiene plan básico (para pruebas)');
    }
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
  ngOnDestroy() {
    console.log('[DIAGNÓSTICO] EuromillonComponent: ngOnDestroy llamado');
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }
    // Cancelar todas las suscripciones para evitar memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  setupMutationObserver() {
    // Observar el primer contenedor de bolas para detectar cambios en el DOM
    const container = document.getElementById('most-frequent-numbers-container');
    if (!container) {
      console.warn('[DIAGNÓSTICO] EuromillonComponent: No se pudo encontrar el contenedor para observar');
      return;
    }
    console.log('[DIAGNÓSTICO] EuromillonComponent: Configurando MutationObserver');
    // Crear un observador que detecte cambios en los hijos del contenedor
    this.mutationObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          if (mutation.removedNodes.length > 0) {
            console.warn(`[DIAGNÓSTICO] EuromillonComponent: Se eliminaron ${mutation.removedNodes.length} nodos del contenedor`);
            Array.from(mutation.removedNodes).forEach(node => {
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
    this.mutationObserver.observe(container, {
      childList: true,
      subtree: true
    });
    console.log('[DIAGNÓSTICO] EuromillonComponent: MutationObserver iniciado');
  }
  checkBallsRendering() {
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
  generateBasicPrediction() {
    // Lógica para generar una predicción básica
    console.log('Generando predicción básica...');
    // Aquí se implementaría la lógica para llamar al servicio de predicciones
  }
  showSubscriptionOptions() {
    // Lógica para mostrar las opciones de suscripción
    console.log('Mostrando opciones de suscripción...');
    // Navegar a la página de planes de suscripción
    this.router.navigate(['/planes']);
  }
  /**
   * Intenta forzar el renderizado de las bolas que no se han renderizado correctamente
   */
  forceRenderMissingBalls() {
    console.log('[DIAGNÓSTICO] EuromillonComponent: Intentando forzar renderizado de bolas faltantes');
    // Forzar limpieza de contextos WebGL para liberar recursos
    const contextManager = window.WebGLContextManager;
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
    document.querySelector('.stats-container .stats-card:first-child .lottery-balls-container')];
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
            const containerName = containerIndex === 0 ? 'últimos resultados' : containerIndex === 1 ? 'estrellas frecuentes' : 'números frecuentes';
            console.log(`[DIAGNÓSTICO] EuromillonComponent: Forzando renderizado de bola ${index} en contenedor ${containerName}`);
            // Forzar reflow del DOM para intentar que se renderice
            const htmlWrapper = wrapper;
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
                  const element = ballComponent;
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
            }, 200 + 100 * index); // Escalonar los tiempos para evitar sobrecarga
          }
        });
        if (missingBalls > 0) {
          const containerName = containerIndex === 0 ? 'últimos resultados' : containerIndex === 1 ? 'estrellas frecuentes' : 'números frecuentes';
          console.log(`[DIAGNÓSTICO] EuromillonComponent: Se encontraron ${missingBalls} bolas faltantes en el contenedor ${containerName}`);
        }
      }, 800 * containerIndex); // Retrasar cada contenedor para dar tiempo a procesar el anterior
    });
    // Programar una verificación final después de todos los intentos
    setTimeout(() => {
      this.checkBallsRendering();
    }, 5000);
  }
  static {
    this.ɵfac = function EuromillonComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || EuromillonComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_subscription_service__WEBPACK_IMPORTED_MODULE_2__.SubscriptionService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: EuromillonComponent,
      selectors: [["app-euromillon"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
      decls: 243,
      vars: 83,
      consts: [[1, "page-container"], [1, "breadcrumb"], ["routerLink", "/home"], [1, "fas", "fa-home"], [1, "separator"], ["routerLink", "/home", 1, "link"], [1, "current"], [1, "content-container"], [1, "lottery-header"], [1, "lottery-logo"], ["src", "assets/img/cabecera_EuromillonesAJ_topaz.png", "alt", "Euromillones Logo", 1, "lottery-image"], [1, "lottery-info"], [1, "lottery-title"], [1, "jackpot-info"], [1, "jackpot-label"], [1, "jackpot-amount"], [1, "next-draw"], [1, "next-draw-label"], [1, "next-draw-date"], [1, "lottery-description"], [1, "prediction-options"], [1, "options-container"], [1, "option-card"], [1, "option-header"], ["class", "option-price", "style", "display: none;", 4, "ngIf"], [1, "option-price", "active", 2, "display", "inline-block"], [1, "option-features"], [1, "generate-btn", 3, "click", "disabled"], ["class", "login-required", 4, "ngIf"], [1, "option-card", "premium"], ["class", "option-price", 4, "ngIf"], ["class", "option-price active", 4, "ngIf"], ["class", "generate-btn premium-btn", 3, "click", 4, "ngIf"], ["class", "generate-btn premium-btn", 3, "disabled", 4, "ngIf"], [1, "option-card", "premium", "pro"], [1, "how-it-works"], [1, "steps-container"], [1, "step"], [1, "step-number"], [1, "step-content"], [1, "statistics"], [1, "stats-container"], [1, "stats-card"], ["id", "most-frequent-numbers-container", 1, "lottery-balls-container"], ["id", "ball-wrapper-17", 1, "ball-wrapper"], [3, "number", "size", "staticRendering"], ["id", "ball-wrapper-23", 1, "ball-wrapper"], ["id", "ball-wrapper-44", 1, "ball-wrapper"], ["id", "ball-wrapper-19", 1, "ball-wrapper"], ["id", "ball-wrapper-4", 1, "ball-wrapper"], ["id", "most-frequent-stars-container", 1, "lottery-balls-container"], ["id", "star-wrapper-2", 1, "ball-wrapper"], [3, "number", "type", "size", "staticRendering"], ["id", "star-wrapper-3", 1, "ball-wrapper"], ["id", "star-wrapper-8", 1, "ball-wrapper"], ["id", "least-frequent-numbers-container", 1, "lottery-balls-container"], ["id", "least-wrapper-33", 1, "ball-wrapper"], [3, "number", "size", "priority"], ["id", "least-wrapper-26", 1, "ball-wrapper"], ["id", "least-wrapper-48", 1, "ball-wrapper"], ["id", "least-wrapper-10", 1, "ball-wrapper"], ["id", "least-wrapper-2", 1, "ball-wrapper"], [1, "view-more"], ["href", "#", 1, "view-more-link"], [1, "last-results"], [1, "result-card"], [1, "result-date"], [1, "result-numbers"], ["id", "last-results-container", 1, "lottery-balls-container"], ["id", "result-wrapper-12", 1, "ball-wrapper"], ["id", "result-wrapper-20", 1, "ball-wrapper"], ["id", "result-wrapper-25", 1, "ball-wrapper"], ["id", "result-wrapper-31", 1, "ball-wrapper"], ["id", "result-wrapper-48", 1, "ball-wrapper"], [1, "lottery-balls-separator"], ["id", "result-star-wrapper-4", 1, "ball-wrapper"], [3, "number", "type", "size", "priority"], ["id", "result-star-wrapper-12", 1, "ball-wrapper"], [1, "faq-section"], [1, "faq-container"], [1, "faq-item"], [1, "faq-question"], [1, "faq-toggle"], [1, "faq-answer"], [1, "disclaimer"], [1, "option-price", 2, "display", "none"], [1, "login-required"], ["routerLink", "/auth/login"], ["routerLink", "/planes"], [1, "option-price"], [1, "option-price", "active"], [1, "generate-btn", "premium-btn", 3, "click"], [1, "generate-btn", "premium-btn", 3, "disabled"]],
      template: function EuromillonComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "a", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "i", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "span", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, ">");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "a", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "Inicio");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "span", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, ">");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "span", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "Euromillones");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "div", 7)(13, "div", 8)(14, "div", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](15, "img", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "div", 11)(17, "h1", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, "Euromillones");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "div", 13)(20, "span", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21, "Bote actual:");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "span", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23, "17 MILLONES \u20AC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "div", 16)(25, "span", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](26, "Pr\u00F3ximo sorteo:");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "span", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](28, "Martes, 9 de abril");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](29, "div", 19)(30, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](31, "Predicciones para Euromillones con IA");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](33, " Nuestro sistema de inteligencia artificial analiza los resultados hist\u00F3ricos de Euromillones para generar combinaciones con mayor probabilidad estad\u00EDstica de acierto. Utilizamos algoritmos avanzados de machine learning que identifican patrones y tendencias en los sorteos anteriores. ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](34, "p")(35, "strong");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](36, "Euromillones");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](37, " es una loter\u00EDa transnacional que se juega en varios pa\u00EDses europeos. Para ganar el premio mayor, debes acertar 5 n\u00FAmeros (de 1 a 50) y 2 estrellas (de 1 a 12). ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](38, "div", 20)(39, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](40, "Genera tus predicciones");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](41, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](42, "Selecciona una de nuestras opciones para obtener combinaciones generadas por IA:");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](43, "div", 21)(44, "div", 22)(45, "div", 23)(46, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](47, "Predicci\u00F3n B\u00E1sica");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](48, EuromillonComponent_span_48_Template, 2, 0, "span", 24);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](49, "span", 25);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](50, "ACTIVADO");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](51, "div", 26)(52, "ul")(53, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](54, "3 combinaciones para cada 1 de los 7 juegos");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](55, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](56, "An\u00E1lisis b\u00E1sico");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](57, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](58, "Estrellas optimizadas");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](59, "button", 27);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function EuromillonComponent_Template_button_click_59_listener() {
            return ctx.generateBasicPrediction();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](60, "Generar");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](61, EuromillonComponent_p_61_Template, 5, 0, "p", 28)(62, EuromillonComponent_p_62_Template, 5, 0, "p", 28);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](63, "div", 29)(64, "div", 23)(65, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](66, "Plan Mensual");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](67, EuromillonComponent_span_67_Template, 2, 0, "span", 30)(68, EuromillonComponent_span_68_Template, 2, 0, "span", 31);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](69, "div", 26)(70, "ul")(71, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](72, "Combinaciones optimizadas ilimitadas durante el mes de suscripci\u00F3n");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](73, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](74, "An\u00E1lisis avanzado de patrones");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](75, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](76, "Estrellas optimizadas");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](77, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](78, "Estad\u00EDsticas detalladas");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](79, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](80, "Hist\u00F3rico de resultados");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](81, EuromillonComponent_button_81_Template, 2, 0, "button", 32)(82, EuromillonComponent_button_82_Template, 2, 1, "button", 33)(83, EuromillonComponent_p_83_Template, 5, 0, "p", 28);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](84, "div", 34)(85, "div", 23)(86, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](87, "Plan Pro");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](88, EuromillonComponent_span_88_Template, 2, 0, "span", 30)(89, EuromillonComponent_span_89_Template, 2, 0, "span", 31);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](90, "div", 26)(91, "ul")(92, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](93, "Combinaciones optimizadas ilimitadas durante los 12 meses de la suscripci\u00F3n");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](94, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](95, "An\u00E1lisis avanzado de patrones");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](96, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](97, "Estrellas optimizadas");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](98, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](99, "Estad\u00EDsticas detalladas");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](100, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](101, "Hist\u00F3rico de resultados");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](102, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](103, "Acceso a todas las loter\u00EDas");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](104, EuromillonComponent_button_104_Template, 2, 0, "button", 32)(105, EuromillonComponent_button_105_Template, 2, 1, "button", 33)(106, EuromillonComponent_p_106_Template, 5, 0, "p", 28);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](107, "div", 35)(108, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](109, "C\u00F3mo funciona");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](110, "div", 36)(111, "div", 37)(112, "div", 38);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](113, "1");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](114, "div", 39)(115, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](116, "Reg\u00EDstrate");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](117, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](118, "Crea una cuenta gratuita para acceder a nuestras predicciones b\u00E1sicas o suscr\u00EDbete a un plan premium.");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](119, "div", 37)(120, "div", 38);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](121, "2");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](122, "div", 39)(123, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](124, "Genera predicciones");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](125, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](126, "Utiliza nuestra IA para generar combinaciones optimizadas para Euromillones.");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](127, "div", 37)(128, "div", 38);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](129, "3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](130, "div", 39)(131, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](132, "Juega tus n\u00FAmeros");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](133, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](134, "Utiliza las combinaciones generadas para participar en los sorteos oficiales de Euromillones.");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](135, "div", 40)(136, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](137, "Estad\u00EDsticas de Euromillones");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](138, "div", 41)(139, "div", 42)(140, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](141, "N\u00FAmeros m\u00E1s frecuentes");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](142, "div", 43)(143, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](144, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](145, "div", 46);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](146, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](147, "div", 47);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](148, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](149, "div", 48);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](150, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](151, "div", 49);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](152, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](153, "div", 42)(154, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](155, "Estrellas m\u00E1s frecuentes");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](156, "div", 50)(157, "div", 51);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](158, "app-euromillones-ball", 52);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](159, "div", 53);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](160, "app-euromillones-ball", 52);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](161, "div", 54);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](162, "app-euromillones-ball", 52);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](163, "div", 42)(164, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](165, "N\u00FAmeros menos frecuentes");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](166, "div", 55)(167, "div", 56);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](168, "app-euromillones-ball", 57);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](169, "div", 58);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](170, "app-euromillones-ball", 57);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](171, "div", 59);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](172, "app-euromillones-ball", 57);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](173, "div", 60);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](174, "app-euromillones-ball", 57);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](175, "div", 61);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](176, "app-euromillones-ball", 57);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](177, "div", 62)(178, "a", 63);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](179, "Ver estad\u00EDsticas completas");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](180, "div", 64)(181, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](182, "\u00DAltimos resultados");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](183, "div", 65)(184, "div", 66);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](185, "Viernes, 5 de abril de 2024");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](186, "div", 67)(187, "div", 68)(188, "div", 69);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](189, "app-euromillones-ball", 57);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](190, "div", 70);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](191, "app-euromillones-ball", 57);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](192, "div", 71);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](193, "app-euromillones-ball", 57);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](194, "div", 72);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](195, "app-euromillones-ball", 57);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](196, "div", 73);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](197, "app-euromillones-ball", 57);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](198, "span", 74);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](199, "+");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](200, "div", 75);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](201, "app-euromillones-ball", 76);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](202, "div", 77);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](203, "app-euromillones-ball", 76);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](204, "div", 62)(205, "a", 63);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](206, "Ver resultados anteriores");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](207, "div", 78)(208, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](209, "Preguntas frecuentes");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](210, "div", 79)(211, "div", 80)(212, "div", 81)(213, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](214, "\u00BFC\u00F3mo se generan las predicciones?");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](215, "span", 82);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](216, "+");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](217, "div", 83)(218, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](219, "Nuestras predicciones se generan utilizando algoritmos de inteligencia artificial que analizan los resultados hist\u00F3ricos, frecuencias, patrones y tendencias estad\u00EDsticas de los sorteos de Euromillones.");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](220, "div", 80)(221, "div", 81)(222, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](223, "\u00BFGarantizan que voy a ganar?");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](224, "span", 82);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](225, "+");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](226, "div", 83)(227, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](228, "No podemos garantizar premios ya que los sorteos de loter\u00EDa son juegos de azar. Nuestro sistema mejora las probabilidades estad\u00EDsticas, pero el resultado final siempre ser\u00E1 aleatorio.");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](229, "div", 80)(230, "div", 81)(231, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](232, "\u00BFCu\u00E1ntas combinaciones puedo generar?");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](233, "span", 82);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](234, "+");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](235, "div", 83)(236, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](237, "Con la cuenta gratuita puedes generar 1 combinaci\u00F3n b\u00E1sica por sorteo. Los planes premium permiten generar entre 5 y 20 combinaciones optimizadas por sorteo, dependiendo del plan elegido.");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](238, "div", 84)(239, "p")(240, "strong");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](241, "Aviso importante:");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](242, " LOTO IA no est\u00E1 afiliado con los operadores oficiales de Euromillones. Nuestro servicio proporciona predicciones basadas en an\u00E1lisis estad\u00EDstico e inteligencia artificial, pero no garantiza resultados. Juega con responsabilidad. ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](48);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.hasBasicPlan);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](11);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", !ctx.isLoggedIn || !ctx.hasBasicPlan);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.isLoggedIn);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isLoggedIn && !ctx.hasBasicPlan && false);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("active", ctx.hasMonthlyPlan);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.hasMonthlyPlan);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.hasMonthlyPlan);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](13);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.hasMonthlyPlan);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.hasMonthlyPlan);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.isLoggedIn);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("active", ctx.hasProPlan);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.hasProPlan);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.hasProPlan);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](15);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.hasProPlan);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.hasProPlan);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.isLoggedIn);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](38);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 17)("size", 80)("staticRendering", true);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 23)("size", 80)("staticRendering", true);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 44)("size", 80)("staticRendering", true);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 19)("size", 80)("staticRendering", true);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 4)("size", 80)("staticRendering", true);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 2)("type", "star")("size", 80)("staticRendering", true);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 3)("type", "star")("size", 80)("staticRendering", true);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 8)("type", "star")("size", 80)("staticRendering", true);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 33)("size", 70)("priority", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 26)("size", 70)("priority", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 48)("size", 70)("priority", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 10)("size", 70)("priority", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 2)("size", 70)("priority", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](13);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 12)("size", 70)("priority", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 20)("size", 70)("priority", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 25)("size", 70)("priority", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 31)("size", 70)("priority", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 48)("size", 70)("priority", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 4)("type", "star")("size", 70)("priority", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 12)("type", "star")("size", 70)("priority", 2);
        }
      },
      dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _components_euromillones_ball_euromillones_ball_component__WEBPACK_IMPORTED_MODULE_0__.EuromillonesBallComponent],
      styles: [".page-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n.breadcrumb[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 20px;\n  font-size: 14px;\n}\n\n.breadcrumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  text-decoration: none;\n}\n\n.breadcrumb[_ngcontent-%COMP%]   .separator[_ngcontent-%COMP%] {\n  margin: 0 8px;\n  color: #0a7abf;\n}\n\n.breadcrumb[_ngcontent-%COMP%]   .current[_ngcontent-%COMP%] {\n  color: #0a7abf;\n}\n\n.content-container[_ngcontent-%COMP%] {\n  background-color: #fff;\n  border-radius: 5px;\n  padding: 30px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n\n\n\n.lottery-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 30px;\n  padding-bottom: 20px;\n  border-bottom: 1px solid #eee;\n}\n\n.lottery-logo[_ngcontent-%COMP%] {\n  margin-right: 30px;\n}\n\n.lottery-image[_ngcontent-%COMP%] {\n  width: 120px;\n  height: auto;\n}\n\n.lottery-title[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 32px;\n  margin-bottom: 10px;\n}\n\n.jackpot-info[_ngcontent-%COMP%] {\n  margin-bottom: 5px;\n}\n\n.jackpot-label[_ngcontent-%COMP%] {\n  font-weight: bold;\n  margin-right: 10px;\n}\n\n.jackpot-amount[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: bold;\n  color: #e63946;\n}\n\n.next-draw-label[_ngcontent-%COMP%] {\n  font-weight: bold;\n  margin-right: 10px;\n}\n\n.next-draw-date[_ngcontent-%COMP%] {\n  font-weight: bold;\n}\n\n\n\n.lottery-description[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n\n.lottery-description[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 24px;\n  margin-bottom: 15px;\n}\n\n.lottery-description[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  line-height: 1.6;\n  margin-bottom: 15px;\n}\n\n\n\n.prediction-options[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n\n.prediction-options[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 24px;\n  margin-bottom: 15px;\n}\n\n.options-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 30px;\n  margin-top: 20px;\n}\n\n.option-card[_ngcontent-%COMP%] {\n  flex: 1;\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  padding: 20px;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n\n.option-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);\n}\n\n.option-card.premium[_ngcontent-%COMP%] {\n  border-color: #ffd700;\n  background-color: #fffdf0;\n}\n\n.option-card.premium.pro[_ngcontent-%COMP%] {\n  border-color: #0a7abf;\n  background-color: #f0f8ff;\n}\n\n.option-card.active[_ngcontent-%COMP%] {\n  border-color: #28a745;\n  background-color: rgba(40, 167, 69, 0.05);\n}\n\n.option-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 15px;\n  padding-bottom: 10px;\n  border-bottom: 1px solid #eee;\n}\n\n.option-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin: 0;\n}\n\n.option-price[_ngcontent-%COMP%] {\n  font-weight: bold;\n  color: #e63946;\n}\n\n.option-price.active[_ngcontent-%COMP%] {\n  background-color: #0a7abf !important;\n  color: white !important;\n  padding: 5px 10px;\n  border-radius: 4px;\n  font-weight: bold;\n  display: inline-block !important;\n}\n\n.option-features[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style-type: none;\n  padding: 0;\n  margin-bottom: 20px;\n}\n\n.option-features[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 8px 0;\n  position: relative;\n  padding-left: 25px;\n}\n\n.option-features[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:before {\n  content: '\u2713';\n  position: absolute;\n  left: 0;\n  color: #0a7abf;\n  font-weight: bold;\n}\n\n.generate-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px;\n  background-color: #0a7abf;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  font-size: 16px;\n  font-weight: bold;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n}\n\n.generate-btn[_ngcontent-%COMP%]:hover {\n  background-color: #086494;\n}\n\n.generate-btn[_ngcontent-%COMP%]:disabled {\n  background-color: #cccccc;\n  cursor: not-allowed;\n}\n\n.premium-btn[_ngcontent-%COMP%] {\n  background-color: #ffd700;\n  color: #333;\n}\n\n.premium-btn[_ngcontent-%COMP%]:hover {\n  background-color: #e6c200;\n}\n\n.login-required[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin-top: 10px;\n  text-align: center;\n  color: #666;\n}\n\n.login-required[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  text-decoration: none;\n}\n\n\n\n.how-it-works[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n\n.how-it-works[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 24px;\n  margin-bottom: 20px;\n}\n\n.steps-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n}\n\n.step[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: flex-start;\n}\n\n.step-number[_ngcontent-%COMP%] {\n  background-color: #0a7abf;\n  color: white;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: bold;\n  margin-right: 15px;\n  flex-shrink: 0;\n}\n\n.step-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 0;\n  margin-bottom: 10px;\n  color: #333;\n}\n\n.step-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #666;\n  line-height: 1.5;\n}\n\n\n\n.statistics[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n\n.statistics[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 24px;\n  margin-bottom: 20px;\n}\n\n.stats-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  margin-bottom: 20px;\n  flex-wrap: wrap; \n\n}\n\n.stats-card[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 250px; \n\n  background-color: #f9f9f9;\n  border-radius: 8px;\n  padding: 20px;\n  text-align: center;\n  position: relative;\n  margin-bottom: 15px; \n\n}\n\n\n\n.stats-card[_ngcontent-%COMP%]   .lottery-balls-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n  gap: 15px; \n\n  margin-top: 15px;\n  padding: 15px;\n  min-height: 100px; \n\n}\n\n\n\n.ball-wrapper[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 80px;\n  height: 80px;\n  position: relative;\n  margin: 5px;\n}\n\n\n\n.static-ball-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.static-euromillones-ball[_ngcontent-%COMP%] {\n  width: 70px;\n  height: 70px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #ff3333, #cc0000);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);\n  position: relative;\n  animation: _ngcontent-%COMP%_pulse 2s infinite;\n}\n\n.static-euromillones-star[_ngcontent-%COMP%] {\n  width: 70px;\n  height: 70px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #ffcc00, #ff9900);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);\n  position: relative;\n  animation: _ngcontent-%COMP%_pulse 2s infinite;\n  clip-path: polygon(\n    50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%,\n    50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%\n  );\n}\n\n.static-ball-number[_ngcontent-%COMP%] {\n  color: white;\n  font-size: 28px;\n  font-weight: bold;\n  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);\n  position: relative;\n  z-index: 2;\n}\n\n@keyframes _ngcontent-%COMP%_pulse {\n  0% {\n    transform: scale(1);\n  }\n  50% {\n    transform: scale(1.05);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n\n\n\n.stats-card[_ngcontent-%COMP%]   app-lottery-ball-3d-new[_ngcontent-%COMP%] {\n  display: block;\n  width: 80px; \n\n  height: 80px; \n\n  margin: 0 auto; \n\n  position: relative; \n\n  z-index: 1; \n\n}\n\n\n\n.result-numbers[_ngcontent-%COMP%]   .lottery-balls-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  gap: 10px;\n  padding: 10px;\n}\n\n\n\n.result-numbers[_ngcontent-%COMP%]   app-lottery-ball-3d-new[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 80px;\n  height: 80px;\n}\n\n.lottery-balls-separator[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 24px;\n  font-weight: bold;\n  margin: 0 5px;\n  color: #333;\n}\n\n.stats-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 0;\n  margin-bottom: 15px;\n  color: #333;\n  font-size: 18px;\n}\n\n\n\n\n\n.number-balls[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n\n.ball[_ngcontent-%COMP%] {\n  \n\n}\n\n.star-ball[_ngcontent-%COMP%] {\n  \n\n}\n\n.view-more[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 20px;\n}\n\n.view-more-link[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  text-decoration: none;\n  font-weight: bold;\n}\n\n.view-more-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n\n\n\n.last-results[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n\n.last-results[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 24px;\n  margin-bottom: 20px;\n}\n\n.result-card[_ngcontent-%COMP%] {\n  background-color: #f9f9f9;\n  border-radius: 8px;\n  padding: 20px;\n  margin-bottom: 20px;\n}\n\n.result-date[_ngcontent-%COMP%] {\n  font-weight: bold;\n  margin-bottom: 15px;\n  color: #333;\n}\n\n.result-numbers[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 15px;\n}\n\n\n\n.faq-section[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n\n.faq-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 24px;\n  margin-bottom: 20px;\n}\n\n.faq-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n}\n\n.faq-item[_ngcontent-%COMP%] {\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  overflow: hidden;\n}\n\n.faq-question[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 15px 20px;\n  background-color: #f5f5f5;\n  cursor: pointer;\n}\n\n.faq-question[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n  color: #333;\n}\n\n.faq-toggle[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: bold;\n  color: #0a7abf;\n}\n\n.faq-answer[_ngcontent-%COMP%] {\n  padding: 0 20px 15px;\n  display: none;\n}\n\n.faq-answer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  line-height: 1.6;\n  color: #666;\n}\n\n\n\n.faq-item.active[_ngcontent-%COMP%]   .faq-answer[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.faq-item.active[_ngcontent-%COMP%]   .faq-toggle[_ngcontent-%COMP%] {\n  transform: rotate(45deg);\n}\n\n\n\n.disclaimer[_ngcontent-%COMP%] {\n  background-color: #f9f9f9;\n  border-radius: 8px;\n  padding: 20px;\n  margin-top: 40px;\n}\n\n.disclaimer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n  color: #666;\n  line-height: 1.6;\n}\n\n\n\n@media (max-width: 768px) {\n  .lottery-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .lottery-logo[_ngcontent-%COMP%] {\n    margin-right: 0;\n    margin-bottom: 20px;\n  }\n\n  .options-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .steps-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .stats-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .ball[_ngcontent-%COMP%], .star-ball[_ngcontent-%COMP%] {\n    width: 35px;\n    height: 35px;\n    font-size: 14px;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvZXVyb21pbGxvbi9ldXJvbWlsbG9uLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBaUI7RUFDakIsY0FBYztFQUNkLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2Isd0NBQXdDO0FBQzFDOztBQUVBLDBCQUEwQjtBQUMxQjtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLG9CQUFvQjtFQUNwQiw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osWUFBWTtBQUNkOztBQUVBO0VBQ0UsY0FBYztFQUNkLGVBQWU7RUFDZixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQSwrQkFBK0I7QUFDL0I7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsZUFBZTtFQUNmLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixtQkFBbUI7QUFDckI7O0FBRUEsOEJBQThCO0FBQzlCO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsY0FBYztFQUNkLGVBQWU7RUFDZixt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O0FBRUE7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxvQkFBb0I7RUFDcEIsYUFBYTtBQUNmOztBQUVBO0VBQ0UsU0FBUztFQUNULGdCQUFnQjtFQUNoQixXQUFXO0FBQ2I7O0FBRUEseUVBQXlFO0FBQ3pFO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLHdCQUF3QjtBQUMxQjs7QUFFQSxzQkFBc0I7QUFDdEI7RUFDRSx5QkFBeUI7RUFDekIsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsZUFBZTtFQUNmLFdBQVc7RUFDWCxnQkFBZ0I7QUFDbEI7O0FBRUEsc0JBQXNCO0FBQ3RCO0VBQ0U7SUFDRSxzQkFBc0I7SUFDdEIsdUJBQXVCO0VBQ3pCOztFQUVBO0lBQ0UsZUFBZTtJQUNmLG1CQUFtQjtFQUNyQjs7RUFFQTtJQUNFLHNCQUFzQjtFQUN4Qjs7RUFFQTtJQUNFLHNCQUFzQjtFQUN4Qjs7RUFFQTtJQUNFLHNCQUFzQjtFQUN4Qjs7RUFFQTtJQUNFLFdBQVc7SUFDWCxZQUFZO0lBQ1osZUFBZTtFQUNqQjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLnBhZ2UtY29udGFpbmVyIHtcclxuICBtYXgtd2lkdGg6IDEyMDBweDtcclxuICBtYXJnaW46IDAgYXV0bztcclxuICBwYWRkaW5nOiAyMHB4O1xyXG59XHJcblxyXG4uYnJlYWRjcnVtYiB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG59XHJcblxyXG4uYnJlYWRjcnVtYiBhIHtcclxuICBjb2xvcjogIzBhN2FiZjtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbn1cclxuXHJcbi5icmVhZGNydW1iIC5zZXBhcmF0b3Ige1xyXG4gIG1hcmdpbjogMCA4cHg7XHJcbiAgY29sb3I6ICMwYTdhYmY7XHJcbn1cclxuXHJcbi5icmVhZGNydW1iIC5jdXJyZW50IHtcclxuICBjb2xvcjogIzBhN2FiZjtcclxufVxyXG5cclxuLmNvbnRlbnQtY29udGFpbmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICBwYWRkaW5nOiAzMHB4O1xyXG4gIGJveC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbn1cclxuXHJcbi8qIExvdHRlcnkgSGVhZGVyIFN0eWxlcyAqL1xyXG4ubG90dGVyeS1oZWFkZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xyXG4gIHBhZGRpbmctYm90dG9tOiAyMHB4O1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWVlO1xyXG59XHJcblxyXG4ubG90dGVyeS1sb2dvIHtcclxuICBtYXJnaW4tcmlnaHQ6IDMwcHg7XHJcbn1cclxuXHJcbi5sb3R0ZXJ5LWltYWdlIHtcclxuICB3aWR0aDogMTIwcHg7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG59XHJcblxyXG4ubG90dGVyeS10aXRsZSB7XHJcbiAgY29sb3I6ICMwYTdhYmY7XHJcbiAgZm9udC1zaXplOiAzMnB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbn1cclxuXHJcbi5qYWNrcG90LWluZm8ge1xyXG4gIG1hcmdpbi1ib3R0b206IDVweDtcclxufVxyXG5cclxuLmphY2twb3QtbGFiZWwge1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIG1hcmdpbi1yaWdodDogMTBweDtcclxufVxyXG5cclxuLmphY2twb3QtYW1vdW50IHtcclxuICBmb250LXNpemU6IDI0cHg7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgY29sb3I6ICNlNjM5NDY7XHJcbn1cclxuXHJcbi5uZXh0LWRyYXctbGFiZWwge1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIG1hcmdpbi1yaWdodDogMTBweDtcclxufVxyXG5cclxuLm5leHQtZHJhdy1kYXRlIHtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG5cclxuLyogTG90dGVyeSBEZXNjcmlwdGlvbiBTdHlsZXMgKi9cclxuLmxvdHRlcnktZGVzY3JpcHRpb24ge1xyXG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XHJcbn1cclxuXHJcbi5sb3R0ZXJ5LWRlc2NyaXB0aW9uIGgyIHtcclxuICBjb2xvcjogIzBhN2FiZjtcclxuICBmb250LXNpemU6IDI0cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcclxufVxyXG5cclxuLmxvdHRlcnktZGVzY3JpcHRpb24gcCB7XHJcbiAgbGluZS1oZWlnaHQ6IDEuNjtcclxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xyXG59XHJcblxyXG4vKiBQcmVkaWN0aW9uIE9wdGlvbnMgU3R5bGVzICovXHJcbi5wcmVkaWN0aW9uLW9wdGlvbnMge1xyXG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XHJcbn1cclxuXHJcbi5wcmVkaWN0aW9uLW9wdGlvbnMgaDIge1xyXG4gIGNvbG9yOiAjMGE3YWJmO1xyXG4gIGZvbnQtc2l6ZTogMjRweDtcclxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xyXG59XHJcblxyXG4ub3B0aW9ucy1jb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZ2FwOiAzMHB4O1xyXG4gIG1hcmdpbi10b3A6IDIwcHg7XHJcbn1cclxuXHJcbi5vcHRpb24tY2FyZCB7XHJcbiAgZmxleDogMTtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBwYWRkaW5nOiAyMHB4O1xyXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UsIGJveC1zaGFkb3cgMC4zcyBlYXNlO1xyXG59XHJcblxyXG4ub3B0aW9uLWNhcmQ6aG92ZXIge1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNXB4KTtcclxuICBib3gtc2hhZG93OiAwIDEwcHggMjBweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbn1cclxuXHJcbi5vcHRpb24tY2FyZC5wcmVtaXVtIHtcclxuICBib3JkZXItY29sb3I6ICNmZmQ3MDA7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmRmMDtcclxufVxyXG5cclxuLm9wdGlvbi1jYXJkLnByZW1pdW0ucHJvIHtcclxuICBib3JkZXItY29sb3I6ICMwYTdhYmY7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YwZjhmZjtcclxufVxyXG5cclxuLm9wdGlvbi1jYXJkLmFjdGl2ZSB7XHJcbiAgYm9yZGVyLWNvbG9yOiAjMjhhNzQ1O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNDAsIDE2NywgNjksIDAuMDUpO1xyXG59XHJcblxyXG4ub3B0aW9uLWhlYWRlciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xyXG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWVlO1xyXG59XHJcblxyXG4ub3B0aW9uLWhlYWRlciBoMyB7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG4gIG1hcmdpbjogMDtcclxufVxyXG5cclxuLm9wdGlvbi1wcmljZSB7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgY29sb3I6ICNlNjM5NDY7XHJcbn1cclxuXHJcbi5vcHRpb24tcHJpY2UuYWN0aXZlIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGE3YWJmICFpbXBvcnRhbnQ7XHJcbiAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XHJcbiAgcGFkZGluZzogNXB4IDEwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jayAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4ub3B0aW9uLWZlYXR1cmVzIHVsIHtcclxuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XHJcbiAgcGFkZGluZzogMDtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG59XHJcblxyXG4ub3B0aW9uLWZlYXR1cmVzIGxpIHtcclxuICBwYWRkaW5nOiA4cHggMDtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgcGFkZGluZy1sZWZ0OiAyNXB4O1xyXG59XHJcblxyXG4ub3B0aW9uLWZlYXR1cmVzIGxpOmJlZm9yZSB7XHJcbiAgY29udGVudDogJ8OiwpzCkyc7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGxlZnQ6IDA7XHJcbiAgY29sb3I6ICMwYTdhYmY7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbi5nZW5lcmF0ZS1idG4ge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIHBhZGRpbmc6IDEycHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBhN2FiZjtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcyBlYXNlO1xyXG59XHJcblxyXG4uZ2VuZXJhdGUtYnRuOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDg2NDk0O1xyXG59XHJcblxyXG4uZ2VuZXJhdGUtYnRuOmRpc2FibGVkIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjY2NjO1xyXG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XHJcbn1cclxuXHJcbi5wcmVtaXVtLWJ0biB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZDcwMDtcclxuICBjb2xvcjogIzMzMztcclxufVxyXG5cclxuLnByZW1pdW0tYnRuOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTZjMjAwO1xyXG59XHJcblxyXG4ubG9naW4tcmVxdWlyZWQge1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBjb2xvcjogIzY2NjtcclxufVxyXG5cclxuLmxvZ2luLXJlcXVpcmVkIGEge1xyXG4gIGNvbG9yOiAjMGE3YWJmO1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxufVxyXG5cclxuLyogSG93IEl0IFdvcmtzIFN0eWxlcyAqL1xyXG4uaG93LWl0LXdvcmtzIHtcclxuICBtYXJnaW4tYm90dG9tOiA0MHB4O1xyXG59XHJcblxyXG4uaG93LWl0LXdvcmtzIGgyIHtcclxuICBjb2xvcjogIzBhN2FiZjtcclxuICBmb250LXNpemU6IDI0cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxufVxyXG5cclxuLnN0ZXBzLWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBnYXA6IDIwcHg7XHJcbn1cclxuXHJcbi5zdGVwIHtcclxuICBmbGV4OiAxO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbn1cclxuXHJcbi5zdGVwLW51bWJlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBhN2FiZjtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgd2lkdGg6IDMwcHg7XHJcbiAgaGVpZ2h0OiAzMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xyXG4gIGZsZXgtc2hyaW5rOiAwO1xyXG59XHJcblxyXG4uc3RlcC1jb250ZW50IGgzIHtcclxuICBtYXJnaW4tdG9wOiAwO1xyXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgY29sb3I6ICMzMzM7XHJcbn1cclxuXHJcbi5zdGVwLWNvbnRlbnQgcCB7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGNvbG9yOiAjNjY2O1xyXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XHJcbn1cclxuXHJcbi8qIFN0YXRpc3RpY3MgU3R5bGVzICovXHJcbi5zdGF0aXN0aWNzIHtcclxuICBtYXJnaW4tYm90dG9tOiA0MHB4O1xyXG59XHJcblxyXG4uc3RhdGlzdGljcyBoMiB7XHJcbiAgY29sb3I6ICMwYTdhYmY7XHJcbiAgZm9udC1zaXplOiAyNHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbn1cclxuXHJcbi5zdGF0cy1jb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZ2FwOiAyMHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgZmxleC13cmFwOiB3cmFwOyAvKiBQZXJtaXRpciBxdWUgbG9zIGVsZW1lbnRvcyBzZSBhanVzdGVuIGVuIHBhbnRhbGxhcyBwZXF1ZcODwrFhcyAqL1xyXG59XHJcblxyXG4uc3RhdHMtY2FyZCB7XHJcbiAgZmxleDogMTtcclxuICBtaW4td2lkdGg6IDI1MHB4OyAvKiBBbmNobyBtw4PCrW5pbW8gcGFyYSBldml0YXIgcXVlIHNlIGNvbXByaW1hbiBkZW1hc2lhZG8gKi9cclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBwYWRkaW5nOiAyMHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTVweDsgLyogRXNwYWNpbyBlbnRyZSB0YXJqZXRhcyBjdWFuZG8gc2UgYXBpbGFuICovXHJcbn1cclxuXHJcbi8qIEVzdGlsb3MgcGFyYSBsb3MgY8ODwq1yY3Vsb3MgZG9uZGUgdmFuIGxhcyBib2xhcyAtIENvcnJlZ2lkbyAqL1xyXG4uc3RhdHMtY2FyZCAubG90dGVyeS1iYWxscy1jb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC13cmFwOiB3cmFwO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiAxNXB4OyAvKiBFc3BhY2lvIGVudHJlIGJvbGFzICovXHJcbiAgbWFyZ2luLXRvcDogMTVweDtcclxuICBwYWRkaW5nOiAxNXB4O1xyXG4gIG1pbi1oZWlnaHQ6IDEwMHB4OyAvKiBBbHR1cmEgbcODwq1uaW1hIHBhcmEgYXNlZ3VyYXIgZXNwYWNpbyAqL1xyXG59XHJcblxyXG4vKiBXcmFwcGVyIHBhcmEgY2FkYSBib2xhIGluZGl2aWR1YWwgKi9cclxuLmJhbGwtd3JhcHBlciB7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIHdpZHRoOiA4MHB4O1xyXG4gIGhlaWdodDogODBweDtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgbWFyZ2luOiA1cHg7XHJcbn1cclxuXHJcbi8qIEVzdGlsb3MgcGFyYSBib2xhcyBlc3TDg8KhdGljYXMgZGUgRXVyb21pbGxvbmVzICovXHJcbi5zdGF0aWMtYmFsbC13cmFwcGVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5zdGF0aWMtZXVyb21pbGxvbmVzLWJhbGwge1xyXG4gIHdpZHRoOiA3MHB4O1xyXG4gIGhlaWdodDogNzBweDtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2ZmMzMzMywgI2NjMDAwMCk7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGJveC1zaGFkb3c6IDAgNHB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMyk7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGFuaW1hdGlvbjogcHVsc2UgMnMgaW5maW5pdGU7XHJcbn1cclxuXHJcbi5zdGF0aWMtZXVyb21pbGxvbmVzLXN0YXIge1xyXG4gIHdpZHRoOiA3MHB4O1xyXG4gIGhlaWdodDogNzBweDtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2ZmY2MwMCwgI2ZmOTkwMCk7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGJveC1zaGFkb3c6IDAgNHB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMyk7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGFuaW1hdGlvbjogcHVsc2UgMnMgaW5maW5pdGU7XHJcbiAgY2xpcC1wYXRoOiBwb2x5Z29uKFxyXG4gICAgNTAlIDAlLCA2MSUgMzUlLCA5OCUgMzUlLCA2OCUgNTclLCA3OSUgOTElLFxyXG4gICAgNTAlIDcwJSwgMjElIDkxJSwgMzIlIDU3JSwgMiUgMzUlLCAzOSUgMzUlXHJcbiAgKTtcclxufVxyXG5cclxuLnN0YXRpYy1iYWxsLW51bWJlciB7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIGZvbnQtc2l6ZTogMjhweDtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICB0ZXh0LXNoYWRvdzogMXB4IDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjUpO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB6LWluZGV4OiAyO1xyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIHB1bHNlIHtcclxuICAwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xyXG4gIH1cclxuICA1MCUge1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjA1KTtcclxuICB9XHJcbiAgMTAwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xyXG4gIH1cclxufVxyXG5cclxuLyogQXNlZ3VyYXJzZSBkZSBxdWUgbGFzIGJvbGFzIGVzdMODwqluIGNvcnJlY3RhbWVudGUgcG9zaWNpb25hZGFzIC0gQ29ycmVnaWRvICovXHJcbi5zdGF0cy1jYXJkIGFwcC1sb3R0ZXJ5LWJhbGwtM2QtbmV3IHtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICB3aWR0aDogODBweDsgLyogQW5jaG8gZmlqbyBwYXJhIGxhcyBib2xhcyAqL1xyXG4gIGhlaWdodDogODBweDsgLyogQWx0byBmaWpvIHBhcmEgbGFzIGJvbGFzICovXHJcbiAgbWFyZ2luOiAwIGF1dG87IC8qIENlbnRyYXIgaG9yaXpvbnRhbG1lbnRlICovXHJcbiAgcG9zaXRpb246IHJlbGF0aXZlOyAvKiBBc2VndXJhciBwb3NpY2lvbmFtaWVudG8gY29ycmVjdG8gKi9cclxuICB6LWluZGV4OiAxOyAvKiBBc2VndXJhciBxdWUgZXN0w4PCqSBwb3IgZW5jaW1hIGRlIG90cm9zIGVsZW1lbnRvcyAqL1xyXG59XHJcblxyXG4vKiBFc3RpbG9zIHBhcmEgbGEgc2VjY2nDg8KzbiBkZSByZXN1bHRhZG9zIC0gU2ltcGxpZmljYWRvICovXHJcbi5yZXN1bHQtbnVtYmVycyAubG90dGVyeS1iYWxscy1jb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC13cmFwOiB3cmFwO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGdhcDogMTBweDtcclxuICBwYWRkaW5nOiAxMHB4O1xyXG59XHJcblxyXG4vKiBBc2VndXJhciBxdWUgbGFzIGJvbGFzIGVuIGxvcyByZXN1bHRhZG9zIHRhbWJpw4PCqW4gdGVuZ2FuIHRhbWHDg8KxbyBmaWpvIC0gU2ltcGxpZmljYWRvICovXHJcbi5yZXN1bHQtbnVtYmVycyBhcHAtbG90dGVyeS1iYWxsLTNkLW5ldyB7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIHdpZHRoOiA4MHB4O1xyXG4gIGhlaWdodDogODBweDtcclxufVxyXG5cclxuLmxvdHRlcnktYmFsbHMtc2VwYXJhdG9yIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgZm9udC1zaXplOiAyNHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIG1hcmdpbjogMCA1cHg7XHJcbiAgY29sb3I6ICMzMzM7XHJcbn1cclxuXHJcbi5zdGF0cy1jYXJkIGgzIHtcclxuICBtYXJnaW4tdG9wOiAwO1xyXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbiAgY29sb3I6ICMzMzM7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG59XHJcblxyXG4vKiBFc3RvcyBlc3RpbG9zIGhhbiBzaWRvIHJlZW1wbGF6YWRvcyBwb3IgbG90dGVyeS1iYWxscy5jc3MgKi9cclxuLyogTWFudGVuZW1vcyBsYXMgY2xhc2VzIHZhY8ODwq1hcyBwYXJhIGNvbXBhdGliaWxpZGFkIGNvbiBjw4PCs2RpZ28gZXhpc3RlbnRlICovXHJcbi5udW1iZXItYmFsbHMge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgZ2FwOiAxMHB4O1xyXG4gIGZsZXgtd3JhcDogd3JhcDtcclxufVxyXG5cclxuLmJhbGwge1xyXG4gIC8qIEVzdGlsb3MgZWxpbWluYWRvcyBwYXJhIGV2aXRhciBjb25mbGljdG9zIGNvbiBsb3R0ZXJ5LWJhbGxzLmNzcyAqL1xyXG59XHJcblxyXG4uc3Rhci1iYWxsIHtcclxuICAvKiBFc3RpbG9zIGVsaW1pbmFkb3MgcGFyYSBldml0YXIgY29uZmxpY3RvcyBjb24gbG90dGVyeS1iYWxscy5jc3MgKi9cclxufVxyXG5cclxuLnZpZXctbW9yZSB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIG1hcmdpbi10b3A6IDIwcHg7XHJcbn1cclxuXHJcbi52aWV3LW1vcmUtbGluayB7XHJcbiAgY29sb3I6ICMwYTdhYmY7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG4udmlldy1tb3JlLWxpbms6aG92ZXIge1xyXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xyXG59XHJcblxyXG4vKiBMYXN0IFJlc3VsdHMgU3R5bGVzICovXHJcbi5sYXN0LXJlc3VsdHMge1xyXG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XHJcbn1cclxuXHJcbi5sYXN0LXJlc3VsdHMgaDIge1xyXG4gIGNvbG9yOiAjMGE3YWJmO1xyXG4gIGZvbnQtc2l6ZTogMjRweDtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG59XHJcblxyXG4ucmVzdWx0LWNhcmQge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7XHJcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gIHBhZGRpbmc6IDIwcHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxufVxyXG5cclxuLnJlc3VsdC1kYXRlIHtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xyXG4gIGNvbG9yOiAjMzMzO1xyXG59XHJcblxyXG4ucmVzdWx0LW51bWJlcnMge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogMTVweDtcclxufVxyXG5cclxuLyogRkFRIFN0eWxlcyAqL1xyXG4uZmFxLXNlY3Rpb24ge1xyXG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XHJcbn1cclxuXHJcbi5mYXEtc2VjdGlvbiBoMiB7XHJcbiAgY29sb3I6ICMwYTdhYmY7XHJcbiAgZm9udC1zaXplOiAyNHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbn1cclxuXHJcbi5mYXEtY29udGFpbmVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgZ2FwOiAxNXB4O1xyXG59XHJcblxyXG4uZmFxLWl0ZW0ge1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XHJcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbi5mYXEtcXVlc3Rpb24ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgcGFkZGluZzogMTVweCAyMHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4uZmFxLXF1ZXN0aW9uIGgzIHtcclxuICBtYXJnaW46IDA7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG4gIGNvbG9yOiAjMzMzO1xyXG59XHJcblxyXG4uZmFxLXRvZ2dsZSB7XHJcbiAgZm9udC1zaXplOiAyMHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGNvbG9yOiAjMGE3YWJmO1xyXG59XHJcblxyXG4uZmFxLWFuc3dlciB7XHJcbiAgcGFkZGluZzogMCAyMHB4IDE1cHg7XHJcbiAgZGlzcGxheTogbm9uZTtcclxufVxyXG5cclxuLmZhcS1hbnN3ZXIgcCB7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGxpbmUtaGVpZ2h0OiAxLjY7XHJcbiAgY29sb3I6ICM2NjY7XHJcbn1cclxuXHJcbi8qIFNob3cgYW5zd2VyIHdoZW4gcXVlc3Rpb24gaXMgY2xpY2tlZCAodG8gYmUgaGFuZGxlZCB3aXRoIEphdmFTY3JpcHQpICovXHJcbi5mYXEtaXRlbS5hY3RpdmUgLmZhcS1hbnN3ZXIge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG4uZmFxLWl0ZW0uYWN0aXZlIC5mYXEtdG9nZ2xlIHtcclxuICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XHJcbn1cclxuXHJcbi8qIERpc2NsYWltZXIgU3R5bGVzICovXHJcbi5kaXNjbGFpbWVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBwYWRkaW5nOiAyMHB4O1xyXG4gIG1hcmdpbi10b3A6IDQwcHg7XHJcbn1cclxuXHJcbi5kaXNjbGFpbWVyIHAge1xyXG4gIG1hcmdpbjogMDtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgY29sb3I6ICM2NjY7XHJcbiAgbGluZS1oZWlnaHQ6IDEuNjtcclxufVxyXG5cclxuLyogUmVzcG9uc2l2ZSBTdHlsZXMgKi9cclxuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgLmxvdHRlcnktaGVhZGVyIHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuICB9XHJcblxyXG4gIC5sb3R0ZXJ5LWxvZ28ge1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAwO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxuICB9XHJcblxyXG4gIC5vcHRpb25zLWNvbnRhaW5lciB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIH1cclxuXHJcbiAgLnN0ZXBzLWNvbnRhaW5lciB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIH1cclxuXHJcbiAgLnN0YXRzLWNvbnRhaW5lciB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIH1cclxuXHJcbiAgLmJhbGwsIC5zdGFyLWJhbGwge1xyXG4gICAgd2lkdGg6IDM1cHg7XHJcbiAgICBoZWlnaHQ6IDM1cHg7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=src_app_pages_euromillon_euromillon_component_ts.js.map