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
exports.EuromillonPrediccionComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const router_1 = require("@angular/router");
const euromillones_ball_component_1 = require("../../components/euromillones-ball/euromillones-ball.component");
let EuromillonPrediccionComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-euromillon-prediccion',
            standalone: true,
            imports: [common_1.CommonModule, router_1.RouterLink, euromillones_ball_component_1.EuromillonesBallComponent],
            templateUrl: './euromillon-prediccion.component.html',
            styleUrl: './euromillon-prediccion.component.css'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var EuromillonPrediccionComponent = _classThis = class {
        constructor(router, route, authService, subscriptionService, predictionService, http) {
            this.router = router;
            this.route = route;
            this.authService = authService;
            this.subscriptionService = subscriptionService;
            this.predictionService = predictionService;
            this.http = http;
            // Variables para el usuario y suscripciones
            this.isLoggedIn = false;
            this.hasBasicPlan = false;
            this.hasMonthlyPlan = false;
            this.hasProPlan = false;
            this.subscriptions = [];
            // Variables para las predicciones
            this.isGeneratingPrediction = false;
            this.predictionResults = [];
            this.predictionError = null;
            this.maxPredictions = 3; // Número máximo de predicciones para el plan básico
            // Información del sorteo
            this.proximoSorteo = '';
            this.boteActual = '';
            this.loading = true;
            // Análisis de frecuencia
            this.numberFrequency = new Map();
        }
        ngOnInit() {
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
                });
                this.subscriptions.push(proSub);
                // Verificar si hay predicciones guardadas
                this.loadSavedPredictions();
                // Si no hay predicciones guardadas, generar automáticamente
                if (this.predictionResults.length === 0) {
                    this.generatePredictions();
                }
            }
            else {
                // El usuario no está autenticado, redirigir a la página de login
                this.router.navigate(['/auth/login'], {
                    queryParams: { returnUrl: this.router.url }
                });
            }
        }
        ngOnDestroy() {
            // Cancelar todas las suscripciones para evitar memory leaks
            this.subscriptions.forEach(sub => sub.unsubscribe());
        }
        /**
         * Carga información sobre el próximo sorteo y bote actual
         */
        loadLotteryInfo() {
            // Obtener la fecha del próximo sorteo (martes y viernes)
            const hoy = new Date();
            const diaSemana = hoy.getDay(); // 0 (domingo) a 6 (sábado)
            // Calcular días hasta el próximo sorteo (martes = 2, viernes = 5)
            let diasHastaProximo = 0;
            if (diaSemana <= 2) { // Domingo, lunes o martes
                diasHastaProximo = 2 - diaSemana;
            }
            else if (diaSemana <= 5) { // Miércoles, jueves o viernes
                diasHastaProximo = 5 - diaSemana;
            }
            else { // Sábado
                diasHastaProximo = 3; // Martes (2 días + 1)
            }
            // Si es día de sorteo y ya pasó la hora, ir al siguiente
            if (diasHastaProximo === 0 && hoy.getHours() >= 21) {
                if (diaSemana === 2) { // Martes
                    diasHastaProximo = 3; // Próximo viernes
                }
                else { // Viernes
                    diasHastaProximo = 4; // Próximo martes
                }
            }
            // Establecer la fecha del próximo sorteo
            const proximoSorteoDate = new Date(hoy);
            proximoSorteoDate.setDate(hoy.getDate() + diasHastaProximo);
            // Formatear la fecha
            const opciones = {
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
        async cargarBoteActual() {
            try {
                const timestamp = new Date().getTime();
                const headers = {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                };
                const response = await this.http.get(`assets/botes.json?t=${timestamp}`, { headers }).toPromise();
                if (response && response['euromillones']) {
                    // Aplicar la misma lógica de limpieza que el header
                    let boteValue = response['euromillones'];
                    // Eliminar texto adicional y dejar solo el número
                    boteValue = boteValue.replace('MILLONES', '').replace('€', '').replace('€', '').trim();
                    // Asignar el valor limpio
                    this.boteActual = boteValue;
                }
                else {
                    this.boteActual = 'No disponible';
                }
            }
            catch (error) {
                console.error('Error cargando bote:', error);
                this.boteActual = 'No disponible';
            }
            finally {
                this.loading = false;
            }
        }
        /**
         * Genera predicciones para Euromillón
         */
        generatePredictions() {
            // Verificar si el usuario tiene un plan activo
            if (!this.hasBasicPlan && !this.hasMonthlyPlan && !this.hasProPlan) {
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
                }
                catch (e) {
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
                        }
                        catch (e) {
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
                    }
                    catch (e) {
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
        generateMultiplePredictions() {
            // Número de predicciones a generar según el plan
            let numPredictions = 3; // Plan básico
            if (this.hasProPlan) {
                numPredictions = 5; // Plan pro
            }
            else if (this.hasMonthlyPlan) {
                numPredictions = 5; // Plan mensual
            }
            console.log(`Generando ${numPredictions} predicciones...`);
            // Generar predicciones secuencialmente
            this.generatePredictionSequence(0, numPredictions);
        }
        /**
         * Genera predicciones de forma secuencial para evitar sobrecarga
         */
        generatePredictionSequence(current, total) {
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
                next: (response) => {
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
                    }
                    else {
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
        updateNumberFrequency() {
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
        getMostFrequentNumbers() {
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
        savePredictions() {
            try {
                localStorage.setItem('euromillon_predictions', JSON.stringify({
                    timestamp: new Date().toISOString(),
                    predictions: this.predictionResults
                }));
            }
            catch (e) {
                console.warn('No se pudo guardar las predicciones en localStorage:', e);
            }
        }
        /**
         * Carga predicciones guardadas previamente
         */
        loadSavedPredictions() {
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
                            this.predictionResults = savedData.predictions.map((pred) => ({
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
                        }
                        else {
                            console.warn('El formato de las predicciones guardadas no es válido');
                            this.predictionResults = [];
                        }
                    }
                    else {
                        console.log('Las predicciones guardadas son demasiado antiguas (', Math.round(hoursDiff), 'horas)');
                        localStorage.removeItem('euromillon_predictions');
                    }
                }
            }
            catch (e) {
                console.warn('Error al cargar predicciones guardadas:', e);
                try {
                    localStorage.removeItem('euromillon_predictions');
                }
                catch (e) {
                    // Ignorar errores al limpiar
                }
            }
        }
    };
    __setFunctionName(_classThis, "EuromillonPrediccionComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EuromillonPrediccionComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EuromillonPrediccionComponent = _classThis;
})();
exports.EuromillonPrediccionComponent = EuromillonPrediccionComponent;
