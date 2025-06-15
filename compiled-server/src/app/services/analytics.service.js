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
exports.AnalyticsService = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const router_1 = require("@angular/router");
const operators_1 = require("rxjs/operators");
let AnalyticsService = (() => {
    let _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AnalyticsService = _classThis = class {
        constructor(router, cookieService, platformId) {
            this.router = router;
            this.cookieService = cookieService;
            this.platformId = platformId;
            this.initialized = false;
        }
        /**
         * Inicializa el servicio de análisis si el usuario ha dado su consentimiento
         */
        initializeAnalytics(googleAnalyticsId) {
            if (!(0, common_1.isPlatformBrowser)(this.platformId) || this.initialized)
                return;
            // Verificar si el usuario ha aceptado las cookies analíticas
            this.cookieService.consent$.subscribe(consent => {
                if (consent.analytics) {
                    this.setupGoogleAnalytics(googleAnalyticsId);
                    this.trackPageViews();
                }
                else if (this.initialized) {
                    // Si el usuario revoca el consentimiento, desactivar el seguimiento
                    this.disableAnalytics();
                }
            });
        }
        /**
         * Configura Google Analytics
         */
        setupGoogleAnalytics(googleAnalyticsId) {
            if (this.initialized)
                return;
            // Crear el script de Google Analytics
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
            document.head.appendChild(script);
            // Inicializar dataLayer y gtag
            window.dataLayer = window.dataLayer || [];
            window.gtag = function () {
                window.dataLayer.push(arguments);
            };
            window.gtag('js', new Date());
            // Configurar para respetar la privacidad
            window.gtag('config', googleAnalyticsId, {
                'anonymize_ip': true,
                'cookie_flags': 'SameSite=None;Secure',
                'cookie_expires': 365 * 24 * 60 * 60 // 1 año en segundos
            });
            this.initialized = true;
        }
        /**
         * Configura el seguimiento de vistas de página
         */
        trackPageViews() {
            this.router.events.pipe((0, operators_1.filter)(event => event instanceof router_1.NavigationEnd)).subscribe((event) => {
                if (this.initialized && window.gtag) {
                    window.gtag('event', 'page_view', {
                        page_path: event.urlAfterRedirects
                    });
                }
            });
        }
        /**
         * Desactiva el seguimiento de análisis
         */
        disableAnalytics() {
            if (!(0, common_1.isPlatformBrowser)(this.platformId) || !this.initialized)
                return;
            // Eliminar cookies de Google Analytics
            this.cookieService.deleteCookie('_ga');
            this.cookieService.deleteCookie('_gid');
            this.cookieService.deleteCookie('_gat');
            // Otras cookies de GA que podrían existir
            const cookies = document.cookie.split(';');
            for (const cookie of cookies) {
                const name = cookie.split('=')[0].trim();
                if (name.startsWith('_ga') || name.startsWith('_gid') || name.startsWith('_gat')) {
                    this.cookieService.deleteCookie(name);
                }
            }
            this.initialized = false;
        }
        /**
         * Registra un evento personalizado
         */
        trackEvent(eventCategory, eventAction, eventLabel, eventValue) {
            if (!(0, common_1.isPlatformBrowser)(this.platformId) || !this.initialized || !window.gtag)
                return;
            window.gtag('event', eventAction, {
                'event_category': eventCategory,
                'event_label': eventLabel,
                'value': eventValue
            });
        }
    };
    __setFunctionName(_classThis, "AnalyticsService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AnalyticsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AnalyticsService = _classThis;
})();
exports.AnalyticsService = AnalyticsService;
