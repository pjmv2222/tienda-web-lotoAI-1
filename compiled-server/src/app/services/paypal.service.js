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
exports.PaypalService = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const environment_1 = require("../../environments/environment");
let PaypalService = (() => {
    let _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PaypalService = _classThis = class {
        constructor(http) {
            this.http = http;
        }
        /**
         * Crea una orden de pago en PayPal
         */
        createOrder(planId) {
            return this.http.post(`${environment_1.environment.apiUrl}/payments/create-paypal-order`, {
                planId
            }).pipe((0, operators_1.catchError)(error => {
                console.error('Error al crear la orden de PayPal:', error);
                return (0, rxjs_1.throwError)(() => new Error('No se pudo crear la orden de PayPal'));
            }));
        }
        /**
         * Procesa un pago con PayPal
         */
        processPayment(planId, paypalOrderId, userId) {
            return this.http.post(`${environment_1.environment.apiUrl}/payments/process-paypal`, {
                planId,
                paypalOrderId,
                userId
            }).pipe((0, operators_1.catchError)(error => {
                console.error('Error al procesar el pago con PayPal:', error);
                return (0, rxjs_1.throwError)(() => new Error('Error al procesar el pago con PayPal'));
            }));
        }
        /**
         * Inicializa el botón de PayPal
         */
        initPayPalButton(containerId, planId, onSuccess) {
            // Asegurarse de que el script de PayPal esté cargado
            if (typeof paypal === 'undefined') {
                this.loadPayPalScript().then(() => {
                    this.renderButton(containerId, planId, onSuccess);
                });
            }
            else {
                this.renderButton(containerId, planId, onSuccess);
            }
        }
        /**
         * Renderiza el botón de PayPal
         */
        renderButton(containerId, planId, onSuccess) {
            // Obtener el precio del plan
            const amount = this.getPlanPrice(planId);
            paypal.Buttons({
                style: {
                    color: 'blue',
                    shape: 'rect',
                    label: 'pay',
                    height: 40
                },
                createOrder: (data, actions) => {
                    return new Promise((resolve, reject) => {
                        this.createOrder(planId).subscribe({
                            next: (response) => {
                                resolve(response.orderId);
                            },
                            error: (error) => {
                                console.error('Error al crear la orden:', error);
                                reject(error);
                            }
                        });
                    });
                },
                onApprove: (data, actions) => {
                    // Llamar a la función de éxito con el ID de la orden
                    onSuccess(data.orderID);
                },
                onError: (err) => {
                    console.error('Error en el botón de PayPal:', err);
                }
            }).render(`#${containerId}`);
        }
        /**
         * Carga el script de PayPal
         */
        loadPayPalScript() {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = `https://www.paypal.com/sdk/js?client-id=${environment_1.environment.paypal.clientId}&currency=${environment_1.environment.paypal.currency}`;
                script.onload = () => resolve();
                script.onerror = (error) => reject(error);
                document.body.appendChild(script);
            });
        }
        /**
         * Obtiene el precio del plan
         */
        getPlanPrice(planId) {
            switch (planId) {
                case 'basic':
                    return 1.22;
                case 'monthly':
                    return 10.22;
                case 'pro':
                    return 122;
                default:
                    return 1.22;
            }
        }
    };
    __setFunctionName(_classThis, "PaypalService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PaypalService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PaypalService = _classThis;
})();
exports.PaypalService = PaypalService;
