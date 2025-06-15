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
exports.HeaderComponent = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const common_1 = require("@angular/common");
const http_2 = require("@angular/common/http");
const router_1 = require("@angular/router");
const forms_1 = require("@angular/forms");
const auth_service_1 = require("../../services/auth.service");
let HeaderComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-header',
            standalone: true,
            imports: [common_1.CommonModule, http_2.HttpClientModule, router_1.RouterLink, forms_1.FormsModule, forms_1.ReactiveFormsModule],
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css']
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HeaderComponent = _classThis = class {
        constructor() {
            this.http = (0, core_1.inject)(http_1.HttpClient);
            this.router = (0, core_1.inject)(router_1.Router);
            this.authService = (0, core_1.inject)(auth_service_1.AuthService);
            this.botes = {};
            this.loading = true;
            this.juegos = ['euromillones', 'primitiva', 'bonoloto', 'gordo', 'lototurf', 'eurodreams', 'loterianacional'];
            // Variables para el login
            this.username = '';
            this.password = '';
            this.loginError = '';
            this.isLoggingIn = false;
            this.showPassword = false;
            this.currentUser = null;
        }
        ngOnInit() {
            this.cargarBotes();
            this.authService.currentUser.subscribe(user => {
                this.currentUser = user;
            });
        }
        async cargarBotes() {
            try {
                const timestamp = new Date().getTime();
                const response = await this.http.get(`assets/botes.json?t=${timestamp}`).toPromise();
                if (response) {
                    Object.keys(response).forEach(key => {
                        if (response[key] && response[key] !== '0') {
                            // Limpiamos el texto para mostrar solo el número
                            let boteValue = response[key];
                            // Eliminar texto adicional y dejar solo el número
                            boteValue = boteValue.replace('MILLONES', '').replace('€', '').replace('€', '').trim();
                            // Asignar el valor limpio
                            this.botes[key] = boteValue;
                        }
                    });
                }
            }
            catch (error) {
                console.error('Error cargando botes:', error);
            }
            finally {
                this.loading = false;
            }
        }
        getImageUrl(juego) {
            const imageMap = {
                'euromillones': 'cabecera_EuromillonesAJ_topaz',
                'primitiva': 'cabecera_PrimitivaAJ_topaz',
                'bonoloto': 'cabecera_BonolotoAJ_topaz',
                'gordo': 'cabecera_ElGordoAJ_topaz',
                'lototurf': 'cabecera_LototurfAJ_topaz',
                'eurodreams': 'cabecera_EurodreamsAJ_topaz',
                'loterianacional': 'cabecera_LoteriaNacionalAJ_topaz'
            };
            const imageName = imageMap[juego.toLowerCase()] || juego;
            return `assets/img/${imageName}.png`;
        }
        getBoteDisplay(juego) {
            return this.botes[juego] || 'Cargando...';
        }
        // Método para iniciar sesión
        login() {
            console.log('Iniciando proceso de login...');
            // Validar campos
            if (!this.username || !this.password) {
                this.loginError = 'Por favor, complete todos los campos';
                return;
            }
            this.isLoggingIn = true;
            this.loginError = '';
            const credentials = {
                email: this.username,
                password: this.password
            };
            console.log('Enviando credenciales al servicio de autenticación...');
            this.authService.login(credentials).subscribe({
                next: (response) => {
                    console.log('Login exitoso:', response);
                    this.isLoggingIn = false;
                    this.username = '';
                    this.password = '';
                    this.router.navigate(['/profile']);
                },
                error: (error) => {
                    console.log('Error en login:', {
                        status: error.status,
                        message: error.error?.message || 'Error desconocido',
                        error: error
                    });
                    this.isLoggingIn = false;
                    if (error.status === 404) {
                        this.loginError = 'No existe una cuenta con este email. ¿Deseas registrarte?';
                    }
                    else if (error.status === 401) {
                        this.loginError = 'Contraseña incorrecta';
                    }
                    else {
                        this.loginError = 'Error al iniciar sesión. Por favor, inténtelo de nuevo.';
                    }
                }
            });
        }
        // Método para cerrar sesión
        logout() {
            this.authService.logout();
            this.router.navigate(['/']);
        }
        // Método para navegar a la página de recuperación de contraseña
        goToForgotPassword() {
            this.router.navigate(['/recuperar-password']);
        }
        // Método para navegar a la página de registro
        goToRegister() {
            this.router.navigate(['/registro']);
        }
        // Método para alternar la visibilidad de la contraseña
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        }
        // Método para obtener la ruta de cada juego
        getRouterLink(juego) {
            const routeMap = {
                'euromillones': '/euromillon',
                'primitiva': '/primitiva',
                'bonoloto': '/bonoloto',
                'gordo': '/gordo-primitiva',
                'lototurf': '/lototurf',
                'eurodreams': '/eurodreams',
                'loterianacional': '/loteria-nacional'
            };
            return routeMap[juego.toLowerCase()] || '/home';
        }
    };
    __setFunctionName(_classThis, "HeaderComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HeaderComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HeaderComponent = _classThis;
})();
exports.HeaderComponent = HeaderComponent;
