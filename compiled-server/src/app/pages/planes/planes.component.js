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
exports.PlanesComponent = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const common_1 = require("@angular/common");
let PlanesComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-planes',
            standalone: true,
            imports: [router_1.RouterLink, common_1.CommonModule],
            templateUrl: './planes.component.html',
            styleUrl: './planes.component.css'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PlanesComponent = _classThis = class {
        constructor(el, router) {
            this.el = el;
            this.router = router;
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
            this.aiSystems = [
                {
                    name: 'Da Vinci',
                    lottery: 'Euromillones',
                    description: 'IA especializada en analizar patrones históricos y tendencias estadísticas de Euromillones para generar combinaciones con mayor probabilidad de acierto.',
                    icon: 'fa-brain'
                },
                {
                    name: 'Prognosis',
                    lottery: 'La Primitiva',
                    description: 'IA entrenada con décadas de resultados de La Primitiva, capaz de identificar secuencias y patrones ocultos para maximizar tus posibilidades.',
                    icon: 'fa-chart-line'
                },
                {
                    name: 'Ástrid',
                    lottery: 'El Gordo de la Primitiva',
                    description: 'IA especializada en El Gordo de la Primitiva que utiliza algoritmos de aprendizaje profundo para predecir combinaciones con mayor probabilidad estadística.',
                    icon: 'fa-robot'
                },
                {
                    name: 'Sináptica',
                    lottery: 'EuroDreams',
                    description: 'IA diseñada específicamente para EuroDreams, con capacidad para analizar millones de combinaciones y seleccionar las más prometedoras.',
                    icon: 'fa-network-wired'
                },
                {
                    name: 'Nóvax',
                    lottery: 'Lotería Nacional',
                    description: 'IA especializada en Lotería Nacional que analiza tendencias históricas de números premiados para identificar patrones y generar predicciones.',
                    icon: 'fa-microchip'
                },
                {
                    name: 'Axioma',
                    lottery: 'Lototurf',
                    description: 'IA entrenada exclusivamente con datos de Lototurf, capaz de generar combinaciones optimizadas basándose en análisis estadísticos avanzados.',
                    icon: 'fa-cogs'
                },
                {
                    name: 'Fortunata',
                    lottery: 'Bonoloto',
                    description: 'IA especializada en Bonoloto que utiliza algoritmos de machine learning para identificar patrones y generar combinaciones con mayor probabilidad de premio.',
                    icon: 'fa-lightbulb'
                }
            ];
            this.faqs = [
                {
                    question: '¿Cómo funciona la suscripción?',
                    answer: 'Nuestras suscripciones se renuevan automáticamente cada mes. Puedes cancelar en cualquier momento desde tu perfil de usuario sin compromiso ni penalización.',
                    active: false
                },
                {
                    question: '¿Puedo cambiar de plan?',
                    answer: 'Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se aplicarán inmediatamente y se ajustará el cobro prorrateado.',
                    active: false
                },
                {
                    question: '¿Qué métodos de pago aceptan?',
                    answer: 'Aceptamos tarjetas de crédito/débito (Visa, Mastercard, American Express), PayPal y transferencia bancaria.',
                    active: false
                },
                {
                    question: '¿Ofrecen garantía de devolución?',
                    answer: 'Sí, ofrecemos una garantía de devolución de 14 días. Si no estás satisfecho con nuestro servicio, puedes solicitar un reembolso completo dentro de los primeros 14 días de tu suscripción.',
                    active: false
                },
                {
                    question: '¿Garantizan que voy a ganar?',
                    answer: 'No podemos garantizar premios ya que los sorteos de lotería son juegos de azar. Nuestro sistema mejora las probabilidades estadísticas, pero el resultado final siempre será aleatorio.',
                    active: false
                }
            ];
            this.testimonials = [
                {
                    name: 'Carlos G.',
                    plan: 'Plan Mensual',
                    text: 'Llevo 3 meses usando el plan mensual y ya he recuperado la inversión con varios premios menores. Las predicciones son muy acertadas.',
                    avatar: 'assets/img/avatar1.jpg'
                },
                {
                    name: 'María L.',
                    plan: 'Plan Pro',
                    text: 'El plan Pro vale cada céntimo. He conseguido un premio importante en Euromillones siguiendo las combinaciones que me recomendó la IA.',
                    avatar: 'assets/img/avatar2.jpg'
                },
                {
                    name: 'Javier R.',
                    plan: 'Plan Mensual',
                    text: 'Me encanta la interfaz y lo fácil que es generar predicciones. He notado que los números que me sugiere suelen salir con más frecuencia.',
                    avatar: 'assets/img/avatar3.jpg'
                }
            ];
        }
        ngOnInit() {
            // Inicialización del componente
        }
        selectPlan(plan) {
            console.log(`Plan seleccionado: ${plan.name}`);
            // Si el plan es gratuito, redirigir directamente a la confirmación
            if (plan.id === 'basic') {
                // Para el plan básico, aunque tiene un precio de 1.22€, podemos decidir si queremos
                // que pase por la pasarela de pago o no. En este caso, lo enviamos a la pasarela.
                this.router.navigate(['/pasarela-pago', plan.id]);
            }
            else {
                // Para planes de pago, redirigir a la pasarela de pago
                this.router.navigate(['/pasarela-pago', plan.id]);
            }
        }
        toggleFaq(index) {
            this.faqs[index].active = !this.faqs[index].active;
        }
        scrollToPlans() {
            const plansElement = this.el.nativeElement.querySelector('.plans-container');
            if (plansElement) {
                plansElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };
    __setFunctionName(_classThis, "PlanesComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PlanesComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PlanesComponent = _classThis;
})();
exports.PlanesComponent = PlanesComponent;
