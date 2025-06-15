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
exports.SubscriptionService = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const rxjs_1 = require("rxjs");
const environment_1 = require("../../environments/environment");
let SubscriptionService = (() => {
    let _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SubscriptionService = _classThis = class {
        constructor(http, authService) {
            this.http = http;
            this.authService = authService;
            this.apiUrl = environment_1.environment.apiUrl;
        }
        /**
         * Verifica si el usuario actual tiene una suscripción activa
         * o un pago reciente (menos de 24 horas)
         */
        hasActiveSubscription() {
            const currentUser = this.authService.currentUserValue;
            if (!currentUser) {
                return (0, rxjs_1.of)(false);
            }
            // Primero verificamos si hay una suscripción activa
            return this.http.get(`${this.apiUrl}/subscriptions/check/${currentUser.id}`, {
                headers: this.getAuthHeaders()
            }).pipe((0, rxjs_1.switchMap)(response => {
                // Si hay una suscripción activa, devolvemos true
                if (response.hasActiveSubscription) {
                    return (0, rxjs_1.of)(true);
                }
                // Si no hay suscripción activa, verificamos pagos recientes
                return this.hasRecentPayment();
            }), (0, rxjs_1.catchError)(error => {
                console.error('Error al verificar suscripción:', error);
                // Si hay un error al verificar la suscripción, verificamos pagos recientes
                return this.hasRecentPayment();
            }));
        }
        /**
         * Verifica si el usuario tiene un pago reciente (menos de 24 horas)
         * Esta es una solución temporal para usuarios que han pagado pero
         * cuya suscripción no se ha registrado correctamente
         */
        hasRecentPayment() {
            const currentUser = this.authService.currentUserValue;
            if (!currentUser) {
                return (0, rxjs_1.of)(false);
            }
            // Verificar en localStorage si hay un registro de pago reciente
            try {
                const paymentData = localStorage.getItem('recent_payment');
                if (paymentData) {
                    const payment = JSON.parse(paymentData);
                    const paymentTime = new Date(payment.timestamp).getTime();
                    const currentTime = new Date().getTime();
                    const hoursDiff = (currentTime - paymentTime) / (1000 * 60 * 60);
                    // Si el pago es de menos de 24 horas, consideramos que tiene una suscripción activa
                    if (hoursDiff < 24) {
                        console.log('Se encontró un pago reciente en localStorage');
                        return (0, rxjs_1.of)(true);
                    }
                }
            }
            catch (e) {
                console.warn('Error al verificar pago reciente en localStorage:', e);
            }
            // Si no hay registro en localStorage, verificamos en el servidor
            return this.http.get(`${this.apiUrl}/payments/recent/${currentUser.id}`, {
                headers: this.getAuthHeaders()
            }).pipe((0, rxjs_1.map)(response => {
                const hasRecentPayment = response.hasRecentPayment || false;
                // Si hay un pago reciente, lo guardamos en localStorage
                if (hasRecentPayment) {
                    try {
                        localStorage.setItem('recent_payment', JSON.stringify({
                            timestamp: new Date().toISOString(),
                            userId: currentUser.id
                        }));
                    }
                    catch (e) {
                        console.warn('Error al guardar pago reciente en localStorage:', e);
                    }
                }
                return hasRecentPayment;
            }), (0, rxjs_1.catchError)(error => {
                console.error('Error al verificar pagos recientes:', error);
                return (0, rxjs_1.of)(false);
            }));
        }
        /**
         * Verifica si el usuario tiene una suscripción activa de un plan específico
         */
        hasActivePlan(planId) {
            const currentUser = this.authService.currentUserValue;
            if (!currentUser || !currentUser.subscriptions || currentUser.subscriptions.length === 0) {
                return (0, rxjs_1.of)(false);
            }
            // Verificar en las suscripciones del usuario
            const hasActivePlan = currentUser.subscriptions.some(sub => sub.activa && sub.tipo === planId);
            return (0, rxjs_1.of)(hasActivePlan);
        }
        /**
         * Obtiene todas las suscripciones del usuario actual
         */
        getUserSubscriptions() {
            const currentUser = this.authService.currentUserValue;
            if (!currentUser) {
                return (0, rxjs_1.of)([]);
            }
            return this.http.get(`${this.apiUrl}/subscriptions/user/${currentUser.id}`, {
                headers: this.getAuthHeaders()
            }).pipe((0, rxjs_1.map)(response => response.subscriptions || []), (0, rxjs_1.catchError)(error => {
                console.error('Error al obtener suscripciones:', error);
                return (0, rxjs_1.of)([]);
            }));
        }
        /**
         * Obtiene los headers de autenticación
         */
        getAuthHeaders() {
            const token = this.authService.currentUserValue?.token;
            return new http_1.HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            });
        }
    };
    __setFunctionName(_classThis, "SubscriptionService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SubscriptionService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SubscriptionService = _classThis;
})();
exports.SubscriptionService = SubscriptionService;
