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
exports.PasarelaPagoComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const router_1 = require("@angular/router");
const forms_1 = require("@angular/forms");
const http_1 = require("@angular/common/http");
const environment_1 = require("../../../environments/environment");
let PasarelaPagoComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-pasarela-pago',
            standalone: true,
            imports: [common_1.CommonModule, router_1.RouterLink, forms_1.FormsModule, common_1.DatePipe, http_1.HttpClientModule],
            templateUrl: './pasarela-pago.component.html',
            styleUrl: './pasarela-pago.component.css'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _paypalButtonContainer_decorators;
    let _paypalButtonContainer_initializers = [];
    let _paypalButtonContainer_extraInitializers = [];
    var PasarelaPagoComponent = _classThis = class {
        constructor(route, router, stripeService, paypalService, http, authService) {
            this.route = route;
            this.router = router;
            this.stripeService = stripeService;
            this.paypalService = paypalService;
            this.http = http;
            this.authService = authService;
            this.planId = '';
            this.planInfo = null;
            this.currentDate = new Date();
            this.selectedPaymentMethod = 'card';
            // Campos para tarjeta
            this.cardName = '';
            this.cardError = '';
            this.isLoading = false;
            // Elementos de Stripe
            this.elements = null;
            this.cardElement = null;
            this.paymentIntentId = '';
            this.clientSecret = '';
            this.subscription = null;
            // Número de referencia para transferencia
            this.referenceNumber = 'REF-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
            // Elementos de PayPal
            this.paypalButtonContainer = __runInitializers(this, _paypalButtonContainer_initializers, void 0);
            // Indica si hay una transacción de PayPal activa
            this.hasActivePayPalTransaction = (__runInitializers(this, _paypalButtonContainer_extraInitializers), false);
            // Planes disponibles
            this.planes = [
                {
                    id: 'basic',
                    name: 'Plan Básico',
                    price: 1.22,
                    period: 'IVA incluido',
                    description: 'Ideal para usuarios que quieren probar nuestro servicio.',
                    features: [
                        '3 combinaciones para cada 1 de los 7 juegos',
                        'Predicciones para primeros premios y premios secundarios',
                        'Válido únicamente para el sorteo inmediato a la fecha de inscripción',
                        'Acceso a todas nuestras IAs especializadas'
                    ],
                    buttonText: 'Comenzar ahora',
                    note: 'Pago único'
                },
                {
                    id: 'monthly',
                    name: 'Plan Mensual',
                    price: 10.22,
                    period: 'IVA incluido',
                    description: 'Para jugadores habituales que buscan mejorar sus probabilidades.',
                    features: [
                        'Hasta 4 combinaciones ganadoras para cada uno de los 7 sorteos',
                        'Predicciones para primeros premios y premios secundarios',
                        'Válido para todos los sorteos del mes en curso desde la fecha de inscripción',
                        'Acceso a todas nuestras IAs especializadas',
                        'Notificaciones de sorteos'
                    ],
                    buttonText: 'Suscribirse',
                    popular: true
                },
                {
                    id: 'pro',
                    name: 'Plan Pro',
                    price: 122,
                    period: 'IVA incluido',
                    description: 'La mejor opción para jugadores serios que quieren maximizar sus posibilidades.',
                    features: [
                        'Combinaciones ganadoras ilimitadas para cada uno de los 7 sorteos',
                        'Predicciones para primeros premios y premios secundarios',
                        'Válido durante 365 días desde la fecha de inscripción',
                        'Acceso prioritario a todas nuestras IAs especializadas',
                        'Notificaciones personalizadas de sorteos',
                        'Soporte prioritario 24/7',
                        'Análisis estadísticos avanzados'
                    ],
                    buttonText: 'Obtener Pro'
                }
            ];
        }
        ngOnInit() {
            this.route.params.subscribe(params => {
                this.planId = params['plan'];
                this.loadPlanInfo();
            });
            // Verificar si hay una transacción de PayPal activa
            this.checkActivePayPalTransaction();
        }
        /**
         * Verifica si hay una transacción de PayPal activa en localStorage
         */
        checkActivePayPalTransaction() {
            const transactionData = localStorage.getItem('paypal_transaction');
            if (transactionData) {
                try {
                    const transaction = JSON.parse(transactionData);
                    // Verificar si la transacción no ha expirado (24 horas)
                    const now = Date.now();
                    const transactionTime = transaction.timestamp || 0;
                    const hoursSinceTransaction = (now - transactionTime) / (1000 * 60 * 60);
                    if (hoursSinceTransaction < 24) {
                        this.hasActivePayPalTransaction = true;
                        // Si hay una transacción activa, seleccionar automáticamente PayPal como método de pago
                        if (transaction.planId === this.planId) {
                            this.selectedPaymentMethod = 'paypal';
                        }
                    }
                    else {
                        // La transacción ha expirado, eliminarla
                        localStorage.removeItem('paypal_transaction');
                        this.hasActivePayPalTransaction = false;
                    }
                }
                catch (e) {
                    console.error('Error al procesar la transacción de PayPal:', e);
                    localStorage.removeItem('paypal_transaction');
                    this.hasActivePayPalTransaction = false;
                }
            }
            else {
                this.hasActivePayPalTransaction = false;
            }
        }
        ngOnDestroy() {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        }
        loadPlanInfo() {
            const plan = this.planes.find(p => p.id === this.planId);
            if (plan) {
                this.planInfo = plan;
                if (this.selectedPaymentMethod === 'card') {
                    this.initStripe();
                }
            }
            else {
                // Si no se encuentra el plan, redirigir a la página de planes
                this.router.navigate(['/planes']);
            }
        }
        ngAfterViewInit() {
            // Inicializar PayPal si es el método seleccionado
            if (this.selectedPaymentMethod === 'paypal' && this.planInfo) {
                this.initPayPal();
            }
        }
        async initStripe() {
            if (this.selectedPaymentMethod === 'card') {
                try {
                    console.log('Inicializando Stripe...');
                    this.elements = await this.stripeService.createElements();
                    if (this.elements) {
                        console.log('Elementos de Stripe creados correctamente');
                        this.cardElement = this.elements.create('card', {
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#32325d',
                                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                                    '::placeholder': {
                                        color: '#aab7c4'
                                    }
                                },
                                invalid: {
                                    color: '#e74c3c',
                                    iconColor: '#e74c3c'
                                }
                            }
                        });
                        console.log('Elemento de tarjeta creado:', this.cardElement);
                        // Asegurarse de que el elemento DOM existe antes de montar
                        setTimeout(() => {
                            const cardElementContainer = document.getElementById('card-element');
                            if (!cardElementContainer) {
                                console.error('No se encontró el contenedor #card-element en el DOM');
                                this.cardError = 'Error al inicializar el formulario de pago';
                                return;
                            }
                            if (this.cardElement) {
                                console.log('Montando elemento de tarjeta en el DOM');
                                this.cardElement.mount('#card-element');
                                this.cardElement.on('change', (event) => {
                                    console.log('Evento de cambio en la tarjeta:', event);
                                    this.cardError = event.error ? event.error.message : '';
                                });
                                console.log('Elemento de tarjeta montado correctamente');
                            }
                            else {
                                console.error('El elemento de tarjeta es nulo');
                                this.cardError = 'Error al crear el elemento de tarjeta';
                            }
                        }, 300); // Aumentamos el tiempo para asegurar que el DOM está listo
                    }
                    else {
                        console.error('No se pudieron crear los elementos de Stripe');
                        this.cardError = 'Error al inicializar el formulario de pago';
                    }
                }
                catch (error) {
                    console.error('Error al inicializar Stripe:', error);
                    this.cardError = 'Error al conectar con el procesador de pagos';
                }
            }
        }
        selectPaymentMethod(method) {
            console.log('Método de pago seleccionado:', method);
            this.selectedPaymentMethod = method;
            this.cardError = ''; // Limpiar errores anteriores
            if (method === 'card') {
                // Dar tiempo al DOM para actualizarse antes de inicializar Stripe
                setTimeout(() => {
                    this.initStripe();
                }, 100);
            }
            else if (method === 'paypal') {
                // Dar tiempo al DOM para actualizarse antes de inicializar PayPal
                setTimeout(() => {
                    this.initPayPal();
                }, 100);
            }
        }
        processPay() {
            if (!this.planInfo) {
                this.cardError = 'No se ha seleccionado ningún plan';
                return;
            }
            this.isLoading = true;
            switch (this.selectedPaymentMethod) {
                case 'card':
                    this.processCardPayment();
                    break;
                case 'paypal':
                    this.processPayPalPayment();
                    break;
                case 'transfer':
                    this.processTransferPayment();
                    break;
                default:
                    this.isLoading = false;
                    this.cardError = 'Método de pago no válido';
            }
        }
        processCardPayment() {
            if (!this.planInfo)
                return;
            if (!this.cardElement) {
                this.cardError = 'Error: El elemento de tarjeta no está inicializado';
                this.isLoading = false;
                return;
            }
            // Obtener el ID del usuario si está autenticado
            const userId = this.getUserId();
            // Primero crear un PaymentIntent
            this.stripeService.createPaymentIntent(this.planInfo.price * 100, this.planId, userId)
                .subscribe({
                next: (paymentIntent) => {
                    this.paymentIntentId = paymentIntent.id;
                    this.clientSecret = paymentIntent.clientSecret;
                    // Luego confirmar el pago con los datos de la tarjeta
                    if (this.cardElement) {
                        this.stripeService.confirmCardPayment(this.clientSecret, this.cardElement)
                            .subscribe({
                            next: (result) => {
                                this.isLoading = false;
                                if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
                                    // Notificar al servidor que el pago fue exitoso
                                    // Usamos el ID del PaymentIntent que ya fue confirmado
                                    this.http.post(`${environment_1.environment.apiUrl}/payments/confirm-payment`, {
                                        paymentIntentId: result.paymentIntent.id,
                                        userId,
                                        planId: this.planId
                                    }).subscribe({
                                        next: (finalResult) => {
                                            if (finalResult.success) {
                                                // Guardar información del pago reciente en localStorage
                                                try {
                                                    localStorage.setItem('recent_payment', JSON.stringify({
                                                        timestamp: new Date().toISOString(),
                                                        userId: userId || 'guest',
                                                        paymentIntentId: result.paymentIntent.id,
                                                        planId: this.planId
                                                    }));
                                                    console.log('Información de pago reciente guardada en localStorage');
                                                }
                                                catch (e) {
                                                    console.warn('Error al guardar información de pago en localStorage:', e);
                                                }
                                                this.navigateToConfirmation();
                                            }
                                            else {
                                                this.cardError = 'Error al finalizar el proceso de pago';
                                            }
                                        },
                                        error: (error) => {
                                            this.cardError = 'Error al finalizar el proceso: ' + (error.message || 'Intente nuevamente');
                                        }
                                    });
                                }
                                else if (result.error) {
                                    this.cardError = result.error.message || 'Error al procesar el pago';
                                }
                            },
                            error: (error) => {
                                this.isLoading = false;
                                this.cardError = 'Error al confirmar el pago: ' + (error.message || 'Intente nuevamente');
                            }
                        });
                    }
                    else {
                        this.isLoading = false;
                        this.cardError = 'Error: El elemento de tarjeta no está disponible';
                    }
                },
                error: (error) => {
                    this.isLoading = false;
                    this.cardError = 'Error al iniciar el pago: ' + (error.message || 'Intente nuevamente');
                }
            });
        }
        /**
         * Inicializa el botón de PayPal
         * Este método se mantiene para compatibilidad con el código existente
         * pero ya no se usa con la nueva implementación
         */
        initPayPal() {
            // Ya no necesitamos inicializar PayPal con el SDK
            // Ahora usamos un botón personalizado que redirecciona directamente a PayPal
            if (!this.planInfo)
                return;
            // Limpiar cualquier mensaje de error anterior
            this.cardError = '';
        }
        /**
         * Maneja el éxito del pago con PayPal
         * Este método se mantiene para compatibilidad con el código existente
         * pero ya no se usa directamente con la nueva implementación
         */
        onPayPalPaymentSuccess(orderId) {
            if (!this.planInfo)
                return;
            this.isLoading = true;
            console.log('Pago con PayPal exitoso, ID de orden:', orderId);
            // En un entorno de producción, aquí se comunicaría con el backend
            // para registrar el pago y activar la suscripción
            // Simulamos un procesamiento exitoso
            setTimeout(() => {
                this.isLoading = false;
                this.navigateToConfirmation();
            }, 1500);
        }
        /**
         * Procesa un pago con PayPal
         */
        processPayPalPayment() {
            if (!this.planInfo)
                return;
            this.isLoading = false;
            // Mostrar un mensaje al usuario para que haga clic en el botón de PayPal
            this.cardError = 'Por favor, haz clic en el botón de PayPal para completar tu pago.';
        }
        /**
         * Redirecciona al usuario a PayPal para completar el pago
         */
        redirectToPayPal() {
            if (!this.planInfo) {
                this.cardError = 'Error: No se pudo cargar la información del plan';
                return;
            }
            this.isLoading = true;
            this.cardError = 'Abriendo PayPal en una nueva ventana...';
            // Construir la URL de PayPal para pago directo - versión más simple
            const amount = this.planInfo.price;
            const planName = encodeURIComponent(this.planInfo.name);
            // Generar un ID de transacción único para seguimiento
            const transactionId = 'txn_' + Date.now() + '_' + Math.floor(Math.random() * 1000000);
            // Guardar información de la transacción en localStorage para recuperarla después
            localStorage.setItem('paypal_transaction', JSON.stringify({
                transactionId: transactionId,
                planId: this.planId,
                amount: amount,
                timestamp: Date.now()
            }));
            // Actualizar el estado de la transacción activa
            this.hasActivePayPalTransaction = true;
            // Usar la URL de PayPal.me que es más sencilla y directa
            // Esta URL redirecciona al usuario a PayPal para completar el pago
            const paypalUrl = `https://www.paypal.com/paypalme/lotoIA/${amount}EUR`;
            console.log('Abriendo PayPal con URL:', paypalUrl);
            // Abrir PayPal en una nueva ventana/pestaña
            const paypalWindow = window.open(paypalUrl, '_blank');
            // Si el navegador bloquea la ventana emergente, ofrecer un enlace alternativo
            if (!paypalWindow || paypalWindow.closed || typeof paypalWindow.closed === 'undefined') {
                this.isLoading = false;
                this.cardError = 'El navegador ha bloqueado la ventana emergente. Por favor, haz clic en el botón de nuevo para intentarlo o habilita las ventanas emergentes.';
            }
            else {
                // Iniciar un temporizador para verificar periódicamente si el usuario ha completado el pago
                this.startPaymentCheckTimer();
            }
        }
        /**
         * Inicia un temporizador para verificar si el usuario ha completado el pago en PayPal
         */
        startPaymentCheckTimer() {
            this.isLoading = false;
            this.cardError = 'Esperando confirmación de pago. Por favor, completa el pago en la ventana de PayPal y luego haz clic en "He completado el pago" cuando termines.';
        }
        /**
         * Verifica si el pago de PayPal ha sido completado
         */
        checkPayPalPaymentStatus() {
            this.isLoading = true;
            // Recuperar información de la transacción
            const transactionData = localStorage.getItem('paypal_transaction');
            if (!transactionData) {
                this.isLoading = false;
                this.cardError = 'No se encontró información de la transacción.';
                return;
            }
            const transaction = JSON.parse(transactionData);
            // Notificar al servidor sobre el pago
            this.http.post(`${environment_1.environment.apiUrl}/payments/verify-paypal-payment`, {
                transactionId: transaction.transactionId,
                planId: transaction.planId,
                amount: transaction.amount,
                userId: this.getUserId()
            }).subscribe({
                next: (result) => {
                    this.isLoading = false;
                    if (result.success) {
                        // Limpiar datos de la transacción
                        localStorage.removeItem('paypal_transaction');
                        // Guardar información del pago reciente en localStorage
                        try {
                            localStorage.setItem('recent_payment', JSON.stringify({
                                timestamp: new Date().toISOString(),
                                userId: this.getUserId() || 'guest',
                                paymentMethod: 'paypal',
                                planId: transaction.planId
                            }));
                            console.log('Información de pago reciente con PayPal guardada en localStorage');
                        }
                        catch (e) {
                            console.warn('Error al guardar información de pago con PayPal en localStorage:', e);
                        }
                        // Navegar a la página de confirmación
                        this.navigateToConfirmation();
                    }
                    else {
                        this.cardError = 'No se pudo verificar el pago. Por favor, contacta con soporte si ya has realizado el pago.';
                    }
                },
                error: (error) => {
                    this.isLoading = false;
                    this.cardError = 'Error al verificar el pago: ' + (error.message || 'Intente nuevamente');
                }
            });
        }
        processTransferPayment() {
            if (!this.planInfo)
                return;
            // Obtener el ID del usuario si está autenticado
            const userId = this.getUserId();
            // Procesar el pago por transferencia
            this.subscription = this.stripeService.processTransferPayment(this.planId, this.referenceNumber, userId)
                .subscribe({
                next: (result) => {
                    this.isLoading = false;
                    if (result.success) {
                        // Guardar información del pago reciente en localStorage
                        try {
                            localStorage.setItem('recent_payment', JSON.stringify({
                                timestamp: new Date().toISOString(),
                                userId: userId || 'guest',
                                paymentMethod: 'transfer',
                                planId: this.planId,
                                referenceNumber: this.referenceNumber
                            }));
                            console.log('Información de pago reciente por transferencia guardada en localStorage');
                        }
                        catch (e) {
                            console.warn('Error al guardar información de pago por transferencia en localStorage:', e);
                        }
                        this.navigateToConfirmation();
                    }
                    else {
                        this.cardError = 'Error al registrar la transferencia';
                    }
                },
                error: (error) => {
                    this.isLoading = false;
                    this.cardError = 'Error al registrar la transferencia: ' + (error.message || 'Intente nuevamente');
                }
            });
        }
        // Método para obtener el ID del usuario actual
        getUserId() {
            // Obtener el usuario del servicio de autenticación
            const currentUser = this.authService.currentUserValue;
            return currentUser?.id;
        }
        navigateToConfirmation() {
            // Redirigir a la página de confirmación correspondiente
            switch (this.planId) {
                case 'basic':
                    this.router.navigate(['/confirmacion-plan-basico']);
                    break;
                case 'monthly':
                    this.router.navigate(['/confirmacion-plan-mensual']);
                    break;
                case 'pro':
                    this.router.navigate(['/confirmacion-plan-pro']);
                    break;
                default:
                    console.error('Plan no reconocido');
            }
        }
    };
    __setFunctionName(_classThis, "PasarelaPagoComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _paypalButtonContainer_decorators = [(0, core_1.ViewChild)('paypalButtonContainer')];
        __esDecorate(null, null, _paypalButtonContainer_decorators, { kind: "field", name: "paypalButtonContainer", static: false, private: false, access: { has: obj => "paypalButtonContainer" in obj, get: obj => obj.paypalButtonContainer, set: (obj, value) => { obj.paypalButtonContainer = value; } }, metadata: _metadata }, _paypalButtonContainer_initializers, _paypalButtonContainer_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PasarelaPagoComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PasarelaPagoComponent = _classThis;
})();
exports.PasarelaPagoComponent = PasarelaPagoComponent;
