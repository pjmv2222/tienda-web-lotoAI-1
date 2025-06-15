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
exports.VerifyEmailComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
let VerifyEmailComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-verify-email',
            standalone: true,
            imports: [common_1.CommonModule],
            template: `
    <div class="verify-email-container">
      <div *ngIf="loading" class="loading-message">
        <p>Verificando tu email...</p>
        <div class="spinner"></div>
      </div>

      <div *ngIf="!loading && !success && error" class="error-message">
        <h2>Error de Verificación</h2>
        <p>{{ error }}</p>
        <button (click)="retryVerification()" class="retry-button">
          Intentar de nuevo
        </button>
        <button (click)="goToLogin()" class="login-button">
          Ir al inicio de sesión
        </button>
      </div>
    </div>
  `,
            styles: [`
    .verify-email-container {
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      text-align: center;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .loading-message, .error-message {
      padding: 20px;
    }

    .spinner {
      width: 40px;
      height: 40px;
      margin: 20px auto;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .error-message {
      color: #e74c3c;
    }

    button {
      margin: 10px;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s;
    }

    .retry-button {
      background-color: #3498db;
      color: white;
    }

    .login-button {
      background-color: #2ecc71;
      color: white;
    }

    button:hover {
      opacity: 0.9;
    }
  `]
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var VerifyEmailComponent = _classThis = class {
        constructor(route, router, authService) {
            this.route = route;
            this.router = router;
            this.authService = authService;
            this.loading = true;
            this.success = false;
            this.error = null;
            this.token = null;
        }
        ngOnInit() {
            this.token = this.route.snapshot.paramMap.get('token');
            console.log('Token recibido en el componente:', this.token);
            if (!this.token) {
                this.loading = false;
                this.error = 'No se proporcionó un token de verificación';
                return;
            }
            this.verifyEmail();
        }
        verifyEmail() {
            if (!this.token)
                return;
            this.loading = true;
            this.error = null;
            this.authService.verifyEmail(this.token).subscribe({
                next: (response) => {
                    console.log('Respuesta de verificación:', response);
                    // Iniciar sesión automáticamente con el token recibido
                    if (response && response.token && response.user) {
                        // Guardar el usuario y token en el servicio de autenticación
                        this.authService.storeAuthenticatedUser(response.user, response.token);
                        console.log('Usuario autenticado automáticamente después de verificación');
                    }
                    else {
                        console.warn('No se recibió token o usuario en la respuesta de verificación');
                    }
                    // Redirigir a la página de bienvenida
                    this.router.navigate(['/bienvenido']);
                },
                error: (error) => {
                    console.error('Error en la verificación:', error);
                    this.loading = false;
                    this.success = false;
                    this.error = error.error?.message || 'Error al verificar el email';
                }
            });
        }
        retryVerification() {
            this.verifyEmail();
        }
        goToLogin() {
            this.router.navigate(['/login']);
        }
    };
    __setFunctionName(_classThis, "VerifyEmailComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VerifyEmailComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VerifyEmailComponent = _classThis;
})();
exports.VerifyEmailComponent = VerifyEmailComponent;
