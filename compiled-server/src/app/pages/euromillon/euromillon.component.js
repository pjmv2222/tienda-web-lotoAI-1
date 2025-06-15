"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EuromillonComponent = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const common_1 = require("@angular/common");
const euromillones_ball_component_1 = require("../../components/euromillones-ball/euromillones-ball.component");
const lottery_base_component_1 = require("../../shared/lottery-base.component");
let EuromillonComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-euromillon',
            standalone: true,
            imports: [router_1.RouterLink, common_1.CommonModule, euromillones_ball_component_1.EuromillonesBallComponent],
            templateUrl: './euromillon.component.html',
            styleUrl: './euromillon.component.css'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = lottery_base_component_1.LotteryBaseComponent;
    var EuromillonComponent = _classThis = class extends _classSuper {
        constructor(router, authService, subscriptionService, predictionService, http) {
            super(http, predictionService);
            this.router = router;
            this.authService = authService;
            this.subscriptionService = subscriptionService;
            this.gameId = 'euromillones';
            this.isLoggedIn = false;
            this.hasBasicPlan = false;
            this.hasMonthlyPlan = false;
            this.hasProPlan = false;
            this.mutationObserver = null;
            this.subscriptions = [];
            // Variables para las predicciones
            this.isGeneratingPrediction = false;
            this.predictionResult = null;
            this.predictionError = null;
        }
        ngOnInit() {
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
                // Verificar si hay una predicción guardada en localStorage
                this.loadSavedPrediction();
            }
            else {
                // El usuario no está autenticado, no tiene ningún plan
                this.hasBasicPlan = false;
                this.hasMonthlyPlan = false;
                this.hasProPlan = false;
                console.log('Usuario no autenticado, no tiene planes activos');
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
            this.mutationObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        if (mutation.removedNodes.length > 0) {
                            console.warn(`[DIAGNÓSTICO] EuromillonComponent: Se eliminaron ${mutation.removedNodes.length} nodos del contenedor`);
                            Array.from(mutation.removedNodes).forEach((node) => {
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
                    }
                    else {
                        console.warn(`[DIAGNÓSTICO] EuromillonComponent: Bola ${index} (${ballId}) NO tiene canvas`);
                    }
                });
            }
            else {
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
                    }
                    else {
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
                    }
                    else if (fallback) {
                        console.log(`[DIAGNÓSTICO] EuromillonComponent: Bola menos frecuente ${index} usa imagen de respaldo`);
                    }
                    else {
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
                    }
                    else if (img) {
                        console.log(`[DIAGNÓSTICO] EuromillonComponent: Bola de resultado ${index} (${ballId}) tiene imagen estática`);
                    }
                    else {
                        console.warn(`[DIAGNÓSTICO] EuromillonComponent: Bola de resultado ${index} (${ballId}) NO tiene representación visual`);
                    }
                });
            }
            else {
                console.warn('[DIAGNÓSTICO] EuromillonComponent: No se encontró el contenedor de últimos resultados');
            }
        }
        generateBasicPrediction() {
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
            console.log('Generando predicción básica para Euromillón...');
            // Verificar nuevamente el estado de la suscripción antes de generar la predicción
            this.subscriptionService.hasActiveSubscription().subscribe({
                next: (hasActive) => {
                    console.log('Verificación de suscripción activa antes de generar predicción:', hasActive);
                    if (!hasActive) {
                        console.warn('La verificación de suscripción indica que el usuario no tiene una suscripción activa');
                        this.isGeneratingPrediction = false;
                        this.predictionError = 'No se detectó una suscripción activa. Por favor, actualiza la página o contacta con soporte.';
                        return;
                    }
                    // Proceder con la generación de la predicción
                    this.callPredictionService();
                },
                error: (error) => {
                    console.error('Error al verificar suscripción antes de generar predicción:', error);
                    this.isGeneratingPrediction = false;
                    this.predictionError = 'Error al verificar tu suscripción. Por favor, inténtalo de nuevo.';
                }
            });
        }
        /**
         * Método auxiliar para llamar al servicio de predicciones
         * Se separa para mejorar la legibilidad y mantenibilidad
         */
        callPredictionService() {
            if (!this.predictionService) {
                console.error('El servicio de predicciones no está disponible');
                this.isGeneratingPrediction = false;
                this.predictionError = 'El servicio de predicciones no está disponible';
                return;
            }
            // Llamar al servicio de predicciones
            this.predictionService.generatePrediction('euromillon').subscribe({
                next: (response) => {
                    console.log('Predicción generada:', response);
                    this.isGeneratingPrediction = false;
                    if (response.success) {
                        this.predictionResult = response.prediction;
                        // Guardar la predicción en el almacenamiento local para recuperarla si se recarga la página
                        try {
                            localStorage.setItem('euromillon_last_prediction', JSON.stringify({
                                timestamp: new Date().toISOString(),
                                prediction: this.predictionResult
                            }));
                        }
                        catch (e) {
                            console.warn('No se pudo guardar la predicción en localStorage:', e);
                        }
                    }
                    else {
                        this.predictionError = response.error || 'Error al generar la predicción';
                    }
                },
                error: (error) => {
                    console.error('Error al generar la predicción:', error);
                    this.isGeneratingPrediction = false;
                    // Proporcionar un mensaje de error más descriptivo según el tipo de error
                    if (error.status === 401) {
                        this.predictionError = 'No tienes autorización para acceder a este servicio. Por favor, verifica tu suscripción.';
                    }
                    else if (error.status === 403) {
                        this.predictionError = 'Tu suscripción no permite acceder a este servicio.';
                    }
                    else if (error.status === 0) {
                        this.predictionError = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
                    }
                    else {
                        this.predictionError = 'Error al comunicarse con el servidor de predicciones. Por favor, inténtalo de nuevo más tarde.';
                    }
                }
            });
        }
        showSubscriptionOptions() {
            // Lógica para mostrar las opciones de suscripción
            console.log('Mostrando opciones de suscripción...');
            // Navegar a la página de planes de suscripción
            this.router.navigate(['/planes']);
        }
        /**
         * Carga una predicción guardada previamente en localStorage
         */
        loadSavedPrediction() {
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
                    }
                    else {
                        console.log('La predicción guardada es demasiado antigua (', Math.round(hoursDiff), 'horas)');
                        localStorage.removeItem('euromillon_last_prediction');
                    }
                }
            }
            catch (e) {
                console.warn('Error al cargar la predicción guardada:', e);
                // Limpiar el localStorage en caso de error
                try {
                    localStorage.removeItem('euromillon_last_prediction');
                }
                catch (e) {
                    // Ignorar errores al limpiar
                }
            }
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
                }
                else if (typeof contextManager.cleanupLowPriorityContexts === 'function') {
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
                if (!container)
                    return;
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
                                    }
                                    catch (e) {
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
    };
    __setFunctionName(_classThis, "EuromillonComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EuromillonComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EuromillonComponent = _classThis;
})();
exports.EuromillonComponent = EuromillonComponent;
