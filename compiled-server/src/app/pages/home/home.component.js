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
exports.HomeComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const router_1 = require("@angular/router");
const carousel_1 = require("ngx-bootstrap/carousel");
const environment_1 = require("../../../environments/environment");
let HomeComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-home',
            standalone: true,
            imports: [common_1.CommonModule, router_1.RouterModule, carousel_1.CarouselModule],
            templateUrl: './home.component.html',
            styleUrl: './home.component.css'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HomeComponent = _classThis = class {
        constructor(authService, subscriptionService, http, platformId, router) {
            this.authService = authService;
            this.subscriptionService = subscriptionService;
            this.http = http;
            this.platformId = platformId;
            this.router = router;
            this.currentUser = null;
            this.hasSubscriptions = false;
            this.authSubscription = null;
            this.environment = environment_1.environment; // Exponer environment para usar en la plantilla
            // Imágenes para el slider con títulos descriptivos
            this.sliderImages = [
                { src: 'assets/img/slider/descarga.jfif', alt: 'Inteligencia Artificial para Loterías' },
                { src: 'assets/img/slider/descarga (1).jfif', alt: 'Predicciones basadas en datos' },
                { src: 'assets/img/slider/descarga (2).jfif', alt: 'Algoritmos avanzados de análisis' },
                { src: 'assets/img/slider/descarga (3).jfif', alt: 'Combinaciones optimizadas' },
                { src: 'assets/img/slider/descarga (4).jfif', alt: 'Estadísticas en tiempo real' },
                { src: 'assets/img/slider/descarga (5).jfif', alt: 'Tecnología de vanguardia' },
                { src: 'assets/img/slider/descarga (6).jfif', alt: 'Análisis predictivo' },
                { src: 'assets/img/slider/descarga (7).jfif', alt: 'Resultados personalizados' }
            ];
            // Grupos de imágenes para mostrar 4 por slide
            this.imageGroups = [];
            // Configuración del slider mejorada
            this.noWrapSlides = false; // Permite que el carrusel vuelva al principio
            this.showIndicators = true; // Muestra los indicadores de posición
            this.interval = 5000; // Intervalo de cambio de grupo de imágenes (5 segundos)
            this.isBrowser = (0, common_1.isPlatformBrowser)(this.platformId);
        }
        /**
         * Método para verificar el estado de la suscripción del usuario
         * Se usa para depuración
         */
        checkSubscriptionStatus() {
            if (!this.currentUser) {
                console.error('No hay usuario autenticado');
                return;
            }
            console.log('Verificando estado de suscripción para el usuario:', this.currentUser.id);
            // Verificar suscripción activa usando el servicio
            this.subscriptionService.hasActiveSubscription().subscribe({
                next: (hasActive) => {
                    console.log('¿Tiene suscripción activa?', hasActive);
                    // Verificar planes específicos
                    this.subscriptionService.hasActivePlan('basic').subscribe(hasBasic => {
                        console.log('¿Tiene plan básico activo?', hasBasic);
                    });
                    this.subscriptionService.hasActivePlan('monthly').subscribe(hasMonthly => {
                        console.log('¿Tiene plan mensual activo?', hasMonthly);
                    });
                    this.subscriptionService.hasActivePlan('pro').subscribe(hasPro => {
                        console.log('¿Tiene plan pro activo?', hasPro);
                    });
                },
                error: (error) => {
                    console.error('Error al verificar suscripción:', error);
                }
            });
            // Obtener todas las suscripciones del usuario
            this.subscriptionService.getUserSubscriptions().subscribe({
                next: (subscriptions) => {
                    console.log('Suscripciones del usuario desde el servicio:', subscriptions);
                },
                error: (error) => {
                    console.error('Error al obtener suscripciones:', error);
                }
            });
        }
        ngOnInit() {
            // Agrupar imágenes en grupos de 4 para el carrusel
            this.createImageGroups();
            // Verificar si el servicio de autenticación está disponible
            if (this.authService && this.authService.currentUser) {
                // Suscribirse al usuario actual
                this.authSubscription = this.authService.currentUser.subscribe({
                    next: (user) => {
                        this.currentUser = user;
                        // Verificar si el usuario existe y tiene suscripciones de forma segura
                        this.hasSubscriptions = !!this.currentUser?.subscriptions?.length;
                        if (this.currentUser?.subscriptions) {
                            console.log('Suscripciones del usuario:', this.currentUser.subscriptions);
                        }
                        else {
                            console.log('El usuario no tiene suscripciones activas');
                        }
                    },
                    error: (error) => {
                        console.error('Error al obtener el usuario actual:', error);
                    }
                });
            }
            else {
                console.warn('El servicio de autenticación no está disponible');
            }
        }
        ngOnDestroy() {
            // Cancelar la suscripción para evitar memory leaks
            if (this.authSubscription) {
                this.authSubscription.unsubscribe();
            }
        }
        /**
         * Agrupa las imágenes en grupos de 4 para mostrarlas en el carrusel
         */
        createImageGroups() {
            const imagesPerGroup = 4; // Número de imágenes por grupo
            this.imageGroups = [];
            // Crear grupos de 4 imágenes
            for (let i = 0; i < this.sliderImages.length; i += imagesPerGroup) {
                const group = this.sliderImages.slice(i, i + imagesPerGroup);
                // Si el grupo tiene menos de 4 imágenes, completar con las primeras imágenes
                if (group.length < imagesPerGroup) {
                    const remaining = imagesPerGroup - group.length;
                    const additionalImages = this.sliderImages.slice(0, remaining);
                    this.imageGroups.push([...group, ...additionalImages]);
                }
                else {
                    this.imageGroups.push(group);
                }
            }
        }
        navigateToPlans(planType) {
            // Navegar a la página de planes con el plan específico
            this.router.navigate(['/planes'], { queryParams: { plan: planType } });
        }
    };
    __setFunctionName(_classThis, "HomeComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HomeComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HomeComponent = _classThis;
})();
exports.HomeComponent = HomeComponent;
