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
exports.BonolotoComponent = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const common_1 = require("@angular/common");
const euromillones_ball_component_1 = require("../../components/euromillones-ball/euromillones-ball.component");
const lottery_base_component_1 = require("../../shared/lottery-base.component");
let BonolotoComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-bonoloto',
            standalone: true,
            imports: [router_1.RouterLink, common_1.CommonModule, euromillones_ball_component_1.EuromillonesBallComponent],
            templateUrl: './bonoloto.component.html',
            styleUrl: './bonoloto.component.css'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = lottery_base_component_1.LotteryBaseComponent;
    var BonolotoComponent = _classThis = class extends _classSuper {
        constructor(router, authService, subscriptionService, http, predictionService) {
            super(http, predictionService);
            this.router = router;
            this.authService = authService;
            this.subscriptionService = subscriptionService;
            this.gameId = 'bonoloto';
            this.isLoggedIn = false;
            this.hasBasicPlan = false;
            this.hasMonthlyPlan = false;
            this.hasProPlan = false;
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
            }
            else {
                // El usuario no está autenticado, no tiene ningún plan
                this.hasBasicPlan = false;
                this.hasMonthlyPlan = false;
                this.hasProPlan = false;
                console.log('Usuario no autenticado, no tiene planes activos');
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
            console.log('Generando predicción básica para Bonoloto...');
            // Llamar al servicio de predicciones
            if (this.predictionService) {
                this.predictionService.generatePrediction('bonoloto').subscribe({
                    next: (response) => {
                        console.log('Predicción generada:', response);
                        this.isGeneratingPrediction = false;
                        if (response.success) {
                            this.predictionResult = response.prediction;
                        }
                        else {
                            this.predictionError = response.error || 'Error al generar la predicción';
                        }
                    },
                    error: (error) => {
                        console.error('Error al generar la predicción:', error);
                        this.isGeneratingPrediction = false;
                        this.predictionError = 'Error al comunicarse con el servidor de predicciones';
                    }
                });
            }
            else {
                console.error('El servicio de predicciones no está disponible');
                this.isGeneratingPrediction = false;
                this.predictionError = 'El servicio de predicciones no está disponible';
            }
        }
        showSubscriptionOptions() {
            // Lógica para mostrar las opciones de suscripción
            console.log('Mostrando opciones de suscripción...');
            // Navegar a la página de planes de suscripción
            this.router.navigate(['/planes']);
        }
        ngOnDestroy() {
            // Cancelar todas las suscripciones para evitar memory leaks
            this.subscriptions.forEach(sub => sub.unsubscribe());
        }
    };
    __setFunctionName(_classThis, "BonolotoComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BonolotoComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BonolotoComponent = _classThis;
})();
exports.BonolotoComponent = BonolotoComponent;
