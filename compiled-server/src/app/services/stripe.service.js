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
exports.StripeService = void 0;
const core_1 = require("@angular/core");
const stripe_js_1 = require("@stripe/stripe-js");
const environment_1 = require("../../environments/environment");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let StripeService = (() => {
    let _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var StripeService = _classThis = class {
        constructor(http) {
            this.http = http;
            this.stripe = (0, stripe_js_1.loadStripe)(environment_1.environment.stripe.publishableKey);
        }
        /**
         * Crea un PaymentIntent en el servidor
         */
        createPaymentIntent(amount, planId, userId) {
            // Usar environment.apiUrl para consistencia en todos los entornos
            return this.http.post(`${environment_1.environment.apiUrl}/payments/create-payment-intent`, {
                amount,
                planId,
                userId
            }).pipe((0, operators_1.catchError)(error => {
                console.error('Error al crear el PaymentIntent:', error);
                return (0, rxjs_1.throwError)(() => new Error('No se pudo crear el PaymentIntent'));
            }));
        }
        /**
         * Confirma un pago con los datos de la tarjeta
         */
        confirmCardPayment(clientSecret, cardElement) {
            return (0, rxjs_1.from)(this.stripe).pipe((0, operators_1.switchMap)(stripe => {
                if (!stripe) {
                    return (0, rxjs_1.throwError)(() => new Error('Stripe no ha sido inicializado'));
                }
                return (0, rxjs_1.from)(stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: cardElement,
                        billing_details: {
                        // Aquí puedes añadir detalles de facturación si los tienes
                        }
                    }
                }));
            }), (0, operators_1.catchError)(error => {
                console.error('Error al confirmar el pago:', error);
                return (0, rxjs_1.throwError)(() => new Error('Error al procesar el pago'));
            }));
        }
        /**
         * Crea elementos de Stripe para el formulario de pago
         */
        async createElements() {
            const stripe = await this.stripe;
            if (!stripe) {
                console.error('Stripe no ha sido inicializado');
                return null;
            }
            return stripe.elements();
        }
        /**
         * Procesa un pago con tarjeta
         */
        processCardPayment(planId, userId) {
            return this.createPaymentIntent(this.getPlanPrice(planId), planId, userId).pipe((0, operators_1.switchMap)(paymentIntent => {
                return this.http.post(`${environment_1.environment.apiUrl}/payments/confirm-payment`, {
                    paymentIntentId: paymentIntent.id,
                    userId,
                    planId
                });
            }));
        }
        /**
         * Procesa un pago con PayPal
         */
        processPayPalPayment(planId, paypalOrderId, userId) {
            return this.http.post(`${environment_1.environment.apiUrl}/payments/process-paypal`, {
                planId,
                paypalOrderId,
                userId
            });
        }
        /**
         * Procesa un pago por transferencia
         */
        processTransferPayment(planId, referenceNumber, userId) {
            return this.http.post(`${environment_1.environment.apiUrl}/payments/process-transfer`, {
                planId,
                referenceNumber,
                userId
            });
        }
        /**
         * Obtiene el precio de un plan en céntimos
         */
        getPlanPrice(planId) {
            switch (planId) {
                case 'basic':
                    return 122; // 1.22€ en céntimos
                case 'monthly':
                    return 1022; // 10.22€ en céntimos
                case 'pro':
                    return 12200; // 122€ en céntimos
                default:
                    return 122;
            }
        }
        /**
         * Simula un pago exitoso (para desarrollo)
         */
        simulateSuccessfulPayment(planId) {
            // En un entorno real, esto se conectaría con el backend
            return new rxjs_1.Observable(observer => {
                setTimeout(() => {
                    observer.next({ success: true, planId });
                    observer.complete();
                }, 1500);
            });
        }
    };
    __setFunctionName(_classThis, "StripeService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StripeService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StripeService = _classThis;
})();
exports.StripeService = StripeService;
