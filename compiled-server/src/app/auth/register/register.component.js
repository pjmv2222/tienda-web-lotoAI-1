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
exports.RegisterComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const router_1 = require("@angular/router");
const common_2 = require("@angular/common");
let RegisterComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-register',
            standalone: true,
            imports: [common_1.CommonModule, forms_1.ReactiveFormsModule, common_2.NgOptimizedImage, router_1.RouterModule],
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RegisterComponent = _classThis = class {
        constructor(fb, authService, router) {
            this.fb = fb;
            this.authService = authService;
            this.router = router;
            this.errorMessage = '';
            this.loading = false;
            this.submitted = false;
            this.showPassword = false;
            this.showConfirmPassword = false;
            this.passwordStrength = 0;
        }
        ngOnInit() {
            console.log('Inicializando componente de registro');
            // Si el usuario ya está autenticado, redirigir al inicio
            if (this.authService.currentUserValue) {
                console.log('Usuario ya autenticado, redirigiendo...');
                this.router.navigate(['/']);
                return;
            }
            // Inicializar el formulario
            this.registerForm = this.fb.group({
                nombre: ['', [forms_1.Validators.required, forms_1.Validators.minLength(2)]],
                apellido: ['', [forms_1.Validators.required, forms_1.Validators.minLength(2)]],
                email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
                telefono: ['', [forms_1.Validators.pattern('^[0-9]{9,12}$')]],
                password: ['', [
                        forms_1.Validators.required,
                        forms_1.Validators.minLength(6),
                        this.createPasswordStrengthValidator()
                    ]],
                confirmPassword: ['', [forms_1.Validators.required]]
            });
            // Añadir validador de coincidencia de contraseñas
            this.registerForm.setValidators(this.passwordMatchValidator);
            this.registerForm.updateValueAndValidity();
            // Suscribirse a cambios en el formulario para debugging
            this.registerForm.statusChanges.subscribe(status => {
                console.log('Estado del formulario:', status);
                if (status === 'INVALID') {
                    console.log('Errores del formulario:', this.registerForm.errors);
                }
            });
            // Suscribirse a cambios en el campo de contraseña
            this.registerForm.get('password')?.valueChanges.subscribe(value => {
                this.passwordStrength = this.calculatePasswordStrength(value || '');
            });
        }
        // Validador personalizado para la fortaleza de la contraseña
        createPasswordStrengthValidator() {
            return (control) => {
                const value = control.value;
                if (!value) {
                    return null;
                }
                const hasUpperCase = /[A-Z]/.test(value);
                const hasLowerCase = /[a-z]/.test(value);
                const hasNumeric = /[0-9]/.test(value);
                const hasMinLength = value.length >= 6;
                const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasMinLength;
                if (!passwordValid) {
                    return {
                        passwordStrength: {
                            hasUpperCase,
                            hasLowerCase,
                            hasNumeric,
                            hasMinLength
                        }
                    };
                }
                return null;
            };
        }
        // Método para obtener mensajes de error de la contraseña
        getPasswordErrorMessage() {
            const control = this.registerForm.get('password');
            if (control?.errors) {
                if (control.errors['required']) {
                    return 'La contraseña es requerida';
                }
                if (control.errors['passwordStrength']) {
                    const errors = control.errors['passwordStrength'];
                    const messages = [];
                    if (!errors.hasMinLength)
                        messages.push('al menos 6 caracteres');
                    if (!errors.hasUpperCase)
                        messages.push('una letra mayúscula');
                    if (!errors.hasLowerCase)
                        messages.push('una letra minúscula');
                    if (!errors.hasNumeric)
                        messages.push('un número');
                    return `La contraseña debe contener ${messages.join(', ')}`;
                }
            }
            return '';
        }
        // Método para alternar la visibilidad de las contraseñas
        togglePasswordVisibility(field) {
            if (field === 'password') {
                this.showPassword = !this.showPassword;
            }
            else {
                this.showConfirmPassword = !this.showConfirmPassword;
            }
        }
        // Validador personalizado para confirmar contraseña
        passwordMatchValidator(control) {
            if (!control || !(control instanceof forms_1.FormGroup))
                return null;
            const password = control.get('password');
            const confirmPassword = control.get('confirmPassword');
            if (!password || !confirmPassword)
                return null;
            if (password.value !== confirmPassword.value) {
                confirmPassword.setErrors({ passwordMismatch: true });
                return { passwordMismatch: true };
            }
            else {
                confirmPassword.setErrors(null);
                return null;
            }
        }
        // Getter para acceder fácilmente a los campos del formulario
        get f() {
            return this.registerForm?.controls || {};
        }
        onSubmit() {
            console.log('Iniciando proceso de registro...');
            this.submitted = true;
            if (this.registerForm.invalid) {
                console.log('Formulario inválido:', this.registerForm.errors);
                Object.keys(this.registerForm.controls).forEach(key => {
                    const control = this.registerForm.get(key);
                    if (control?.errors) {
                        console.log(`Errores en ${key}:`, control.errors);
                    }
                });
                return;
            }
            console.log('Formulario válido, preparando datos para registro...');
            this.loading = true;
            const registrationData = {
                nombre: this.f['nombre'].value,
                apellido: this.f['apellido'].value,
                email: this.f['email'].value,
                password: this.f['password'].value,
                telefono: this.f['telefono'].value
            };
            console.log('Enviando datos de registro:', { ...registrationData, password: '[PROTECTED]' });
            this.authService.register(registrationData).subscribe({
                next: (response) => {
                    console.log('Registro exitoso:', response);
                    // Redirigir al usuario a la página de login con mensaje de verificación pendiente
                    this.router.navigate(['/auth/login'], {
                        queryParams: {
                            registered: true,
                            email: registrationData.email
                        }
                    });
                },
                error: error => {
                    console.error('Error en el registro:', error);
                    this.errorMessage = error.error?.message || 'Error al registrar usuario';
                    this.loading = false;
                }
            });
        }
        // Método para calcular la fortaleza de la contraseña
        calculatePasswordStrength(password) {
            let strength = 0;
            if (password.length >= 6)
                strength += 25;
            if (/[A-Z]/.test(password))
                strength += 25;
            if (/[a-z]/.test(password))
                strength += 25;
            if (/[0-9]/.test(password))
                strength += 25;
            return strength;
        }
    };
    __setFunctionName(_classThis, "RegisterComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RegisterComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RegisterComponent = _classThis;
})();
exports.RegisterComponent = RegisterComponent;
