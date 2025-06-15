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
exports.AuthService = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const rxjs_1 = require("rxjs");
const common_1 = require("@angular/common");
const environment_1 = require("../../environments/environment");
let AuthService = (() => {
    let _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AuthService = _classThis = class {
        constructor(http, cookieService, platformId) {
            this.http = http;
            this.cookieService = cookieService;
            this.platformId = platformId;
            this.apiUrl = environment_1.environment.apiUrl;
            this.userStorageKey = 'currentUser';
            this.tokenCookieKey = 'auth_token';
            this.currentUserSubject = new rxjs_1.BehaviorSubject((0, common_1.isPlatformBrowser)(this.platformId) ? this.getUserFromStorage() : null);
            this.currentUser = this.currentUserSubject.asObservable();
        }
        getUserFromStorage() {
            try {
                // Intentar obtener el usuario del localStorage
                let userStr = localStorage.getItem(this.userStorageKey);
                let user = userStr ? JSON.parse(userStr) : null;
                // Si no hay usuario en localStorage, verificar si hay un token en las cookies
                if (!user) {
                    const token = this.cookieService.getCookie(this.tokenCookieKey);
                    if (token) {
                        // Si hay un token, intentar obtener el usuario
                        this.getCurrentUserFromToken(token).subscribe({
                            next: (userData) => {
                                if (userData) {
                                    user = { ...userData, token };
                                    this.setUserInStorage(user);
                                    this.currentUserSubject.next(user);
                                }
                            },
                            error: (error) => {
                                console.error('Error al obtener usuario desde token:', error);
                                this.cookieService.deleteCookie(this.tokenCookieKey);
                            }
                        });
                    }
                }
                return user;
            }
            catch (error) {
                console.error('Error al leer usuario del almacenamiento:', error);
                return null;
            }
        }
        getCurrentUserFromToken(token) {
            return this.http.get(`${this.apiUrl}/auth/profile`, {
                headers: new http_1.HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                })
            }).pipe((0, rxjs_1.map)(response => response.user));
        }
        get currentUserValue() {
            return this.currentUserSubject.value;
        }
        getAuthHeaders() {
            const token = this.currentUserValue?.token || this.cookieService.getCookie(this.tokenCookieKey);
            return new http_1.HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            });
        }
        checkEmailExists(email) {
            return this.http.post(`${this.apiUrl}/auth/check-email`, { email });
        }
        register(userData) {
            return this.http.post(`${this.apiUrl}/auth/register`, userData);
        }
        login(credentials) {
            const url = `${this.apiUrl}/auth/login`;
            console.log('Intentando login:', {
                url,
                email: credentials.email,
                headers: { 'Content-Type': 'application/json' }
            });
            return this.http.post(url, credentials, {
                headers: new http_1.HttpHeaders({
                    'Content-Type': 'application/json'
                })
            }).pipe((0, rxjs_1.tap)(response => {
                console.log('Respuesta del servidor:', response);
                if (response.success) {
                    const user = {
                        ...response.user,
                        token: response.token
                    };
                    // Guardar el token en una cookie segura
                    this.cookieService.setConditionalCookie(this.tokenCookieKey, response.token, 'necessary', {
                        expires: 7, // 7 días
                        path: '/',
                        secure: true,
                        sameSite: 'Strict'
                    });
                    // Guardar el usuario en localStorage (sin el token)
                    this.setUserInStorage(user);
                    this.currentUserSubject.next(user);
                }
            }), (0, rxjs_1.catchError)(error => {
                console.error('Error detallado en login:', {
                    status: error.status,
                    statusText: error.statusText,
                    url: error.url,
                    message: error.message,
                    error: error.error,
                    headers: error.headers
                });
                throw error;
            }));
        }
        logout() {
            if ((0, common_1.isPlatformBrowser)(this.platformId)) {
                localStorage.removeItem(this.userStorageKey);
                this.cookieService.deleteCookie(this.tokenCookieKey, { path: '/' });
            }
            this.currentUserSubject.next(null);
        }
        getCurrentUser() {
            return this.http.get(`${this.apiUrl}/auth/profile`, { headers: this.getAuthHeaders() })
                .pipe((0, rxjs_1.tap)(response => {
                if (response.success) {
                    const updatedUser = {
                        ...this.currentUserValue,
                        ...response.user
                    };
                    this.setUserInStorage(updatedUser);
                    this.currentUserSubject.next(updatedUser);
                }
            }), (0, rxjs_1.catchError)(error => {
                if (error.status === 401) {
                    this.logout();
                }
                throw error;
            }));
        }
        forgotPassword(email) {
            return this.http.post(`${this.apiUrl}/auth/forgot-password`, { email });
        }
        resetPassword(resetData) {
            return this.http.post(`${this.apiUrl}/auth/reset-password`, resetData);
        }
        verifyEmail(token) {
            console.log('Verificando email con token:', token);
            return this.http.get(`${this.apiUrl}/auth/verify/${token}`).pipe((0, rxjs_1.tap)(response => {
                console.log('Respuesta de verificación:', response);
            }), (0, rxjs_1.catchError)(error => {
                console.error('Error en verificación:', error);
                throw error;
            }));
        }
        update(userData) {
            const currentUser = this.currentUserValue;
            if (!currentUser) {
                throw new Error('No hay usuario autenticado');
            }
            return this.http.put(`${this.apiUrl}/auth/users/${currentUser.id}`, userData).pipe((0, rxjs_1.tap)(updatedUser => {
                const newUser = { ...currentUser, ...updatedUser };
                this.setUserInStorage(newUser);
                this.currentUserSubject.next(newUser);
            }));
        }
        delete() {
            const currentUser = this.currentUserValue;
            if (!currentUser) {
                throw new Error('No hay usuario autenticado');
            }
            return this.http.delete(`${this.apiUrl}/auth/users/${currentUser.id}`).pipe((0, rxjs_1.tap)(() => {
                this.logout();
            }));
        }
        updateProfile(userId, userData) {
            return this.http.put(`${this.apiUrl}/auth/profile`, userData, { headers: this.getAuthHeaders() }).pipe((0, rxjs_1.tap)(response => {
                if (response.success) {
                    const updatedUser = {
                        ...this.currentUserValue,
                        ...response.user
                    };
                    this.setUserInStorage(updatedUser);
                    this.currentUserSubject.next(updatedUser);
                }
            }));
        }
        deleteAccount(userId) {
            return this.http.delete(`${this.apiUrl}/auth/profile`, { headers: this.getAuthHeaders() }).pipe((0, rxjs_1.tap)(() => {
                this.logout();
                window.location.href = '/auth/login';
            }));
        }
        changePassword(passwordData) {
            return this.http.post(`${this.apiUrl}/auth/change-password`, passwordData, { headers: this.getAuthHeaders() });
        }
        setUserInStorage(user) {
            if ((0, common_1.isPlatformBrowser)(this.platformId)) {
                try {
                    if (user) {
                        // Guardar usuario sin el token en localStorage
                        const { token, ...userWithoutToken } = user;
                        localStorage.setItem(this.userStorageKey, JSON.stringify(userWithoutToken));
                    }
                    else {
                        localStorage.removeItem(this.userStorageKey);
                    }
                }
                catch (error) {
                    console.error('Error al guardar usuario en localStorage:', error);
                }
            }
        }
        /**
         * Almacena un usuario autenticado después de la verificación de email
         * @param user Datos del usuario
         * @param token Token de autenticación
         */
        storeAuthenticatedUser(user, token) {
            if (!user || !token) {
                console.error('No se puede almacenar usuario sin datos o token');
                return;
            }
            try {
                // Crear objeto de usuario completo
                const authenticatedUser = {
                    ...user,
                    token
                };
                // Guardar el token en una cookie segura
                this.cookieService.setConditionalCookie(this.tokenCookieKey, token, 'necessary', {
                    expires: 7, // 7 días
                    path: '/',
                    secure: true,
                    sameSite: 'Strict'
                });
                // Guardar el usuario en localStorage y actualizar el BehaviorSubject
                this.setUserInStorage(authenticatedUser);
                this.currentUserSubject.next(authenticatedUser);
                console.log('Usuario autenticado almacenado correctamente');
            }
            catch (error) {
                console.error('Error al almacenar usuario autenticado:', error);
            }
        }
    };
    __setFunctionName(_classThis, "AuthService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
})();
exports.AuthService = AuthService;
