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
exports.CookieService = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const rxjs_1 = require("rxjs");
let CookieService = (() => {
    let _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CookieService = _classThis = class {
        constructor(platformId) {
            this.platformId = platformId;
            this.consentKey = 'cookie_consent';
            this.consentShownKey = 'cookie_consent_shown';
            this.defaultConsent = {
                necessary: true,
                functional: false,
                analytics: false,
                marketing: false,
                preferences: false
            };
            this.consentSubject = new rxjs_1.BehaviorSubject(this.defaultConsent);
            this.consent$ = this.consentSubject.asObservable();
            if ((0, common_1.isPlatformBrowser)(this.platformId)) {
                // Cargar el consentimiento guardado
                const savedConsent = this.getCookie(this.consentKey);
                if (savedConsent) {
                    try {
                        const parsedConsent = JSON.parse(savedConsent);
                        this.consentSubject.next({
                            ...this.defaultConsent,
                            ...parsedConsent
                        });
                    }
                    catch (e) {
                        console.error('Error al parsear el consentimiento de cookies:', e);
                    }
                }
            }
        }
        /**
         * Establece una cookie
         */
        setCookie(name, value, options = {}) {
            if (!(0, common_1.isPlatformBrowser)(this.platformId))
                return;
            let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
            if (options.expires) {
                const expireDate = options.expires instanceof Date
                    ? options.expires
                    : new Date(Date.now() + options.expires * 24 * 60 * 60 * 1000);
                cookieString += `; expires=${expireDate.toUTCString()}`;
            }
            if (options.path)
                cookieString += `; path=${options.path}`;
            if (options.domain)
                cookieString += `; domain=${options.domain}`;
            if (options.secure)
                cookieString += '; secure';
            if (options.sameSite)
                cookieString += `; samesite=${options.sameSite}`;
            document.cookie = cookieString;
        }
        /**
         * Obtiene el valor de una cookie
         */
        getCookie(name) {
            if (!(0, common_1.isPlatformBrowser)(this.platformId))
                return null;
            const matches = document.cookie.match(new RegExp(`(?:^|; )${encodeURIComponent(name)}=([^;]*)`));
            return matches ? decodeURIComponent(matches[1]) : null;
        }
        /**
         * Elimina una cookie
         */
        deleteCookie(name, options = {}) {
            if (!(0, common_1.isPlatformBrowser)(this.platformId))
                return;
            this.setCookie(name, '', {
                ...options,
                expires: new Date(0)
            });
        }
        /**
         * Guarda el consentimiento de cookies
         */
        saveConsent(consent) {
            if (!(0, common_1.isPlatformBrowser)(this.platformId))
                return;
            const newConsent = {
                ...this.consentSubject.value,
                ...consent,
                necessary: true // Siempre true
            };
            this.consentSubject.next(newConsent);
            // Guardar en una cookie para persistencia
            this.setCookie(this.consentKey, JSON.stringify(newConsent), {
                expires: 365, // 1 año
                path: '/',
                sameSite: 'Lax'
            });
            // Marcar que se ha mostrado el banner
            this.setCookie(this.consentShownKey, 'true', {
                expires: 365,
                path: '/',
                sameSite: 'Lax'
            });
        }
        /**
         * Acepta todas las cookies
         */
        acceptAll() {
            this.saveConsent({
                necessary: true,
                functional: true,
                analytics: true,
                marketing: true,
                preferences: true
            });
        }
        /**
         * Rechaza todas las cookies excepto las necesarias
         */
        rejectAll() {
            this.saveConsent({
                necessary: true,
                functional: false,
                analytics: false,
                marketing: false,
                preferences: false
            });
        }
        /**
         * Verifica si se debe mostrar el banner de cookies
         */
        shouldShowCookieBanner() {
            if (!(0, common_1.isPlatformBrowser)(this.platformId))
                return false;
            return this.getCookie(this.consentShownKey) !== 'true';
        }
        /**
         * Verifica si una categoría de cookies está permitida
         */
        isCategoryAllowed(category) {
            return category === 'necessary' || this.consentSubject.value[category];
        }
        /**
         * Establece una cookie solo si la categoría está permitida
         */
        setConditionalCookie(name, value, category, options = {}) {
            if (this.isCategoryAllowed(category)) {
                this.setCookie(name, value, options);
                return true;
            }
            return false;
        }
    };
    __setFunctionName(_classThis, "CookieService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CookieService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CookieService = _classThis;
})();
exports.CookieService = CookieService;
