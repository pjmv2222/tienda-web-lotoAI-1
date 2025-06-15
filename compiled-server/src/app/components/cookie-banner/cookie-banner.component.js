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
exports.CookieBannerComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const router_1 = require("@angular/router");
const forms_1 = require("@angular/forms");
let CookieBannerComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-cookie-banner',
            standalone: true,
            imports: [common_1.CommonModule, router_1.RouterLink, forms_1.FormsModule],
            templateUrl: './cookie-banner.component.html',
            styleUrls: ['./cookie-banner.component.css']
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CookieBannerComponent = _classThis = class {
        constructor(cookieService) {
            this.cookieService = cookieService;
            this.showBanner = false;
            this.showDetails = false;
            this.consent = {
                necessary: true,
                functional: false,
                analytics: false,
                marketing: false,
                preferences: false
            };
        }
        ngOnInit() {
            // Forzar la visualización del banner para pruebas
            this.showBanner = true;
            // También verificar con el servicio (comentado para pruebas)
            // this.showBanner = this.cookieService.shouldShowCookieBanner();
            console.log('CookieBannerComponent inicializado, showBanner:', this.showBanner);
            // Obtener el consentimiento actual
            this.cookieService.consent$.subscribe(consent => {
                this.consent = { ...consent };
                console.log('Consentimiento actual:', this.consent);
            });
        }
        acceptAll() {
            this.cookieService.acceptAll();
            this.showBanner = false;
        }
        rejectAll() {
            this.cookieService.rejectAll();
            this.showBanner = false;
        }
        savePreferences() {
            this.cookieService.saveConsent(this.consent);
            this.showBanner = false;
            this.showDetails = false;
        }
        toggleDetails() {
            this.showDetails = !this.showDetails;
        }
        closeBanner() {
            // Solo oculta el banner sin guardar preferencias
            this.showBanner = false;
        }
    };
    __setFunctionName(_classThis, "CookieBannerComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CookieBannerComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CookieBannerComponent = _classThis;
})();
exports.CookieBannerComponent = CookieBannerComponent;
