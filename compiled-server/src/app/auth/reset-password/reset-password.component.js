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
exports.ResetPasswordComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const router_1 = require("@angular/router");
let ResetPasswordComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-reset-password',
            standalone: true,
            imports: [common_1.CommonModule, forms_1.ReactiveFormsModule, router_1.RouterModule],
            templateUrl: './reset-password.component.html',
            styleUrl: './reset-password.component.css'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ResetPasswordComponent = _classThis = class {
        constructor(formBuilder, route, router, authService) {
            this.formBuilder = formBuilder;
            this.route = route;
            this.router = router;
            this.authService = authService;
            this.loading = false;
            this.submitted = false;
            this.token = '';
            this.error = '';
            this.success = '';
            // Añadir las propiedades faltantes
            this.successMessage = '';
            this.errorMessage = '';
            this.showPassword = false;
            this.showConfirmPassword = false;
            this.resetForm = this.formBuilder.group({
                password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6)]],
                confirmPassword: ['', forms_1.Validators.required]
            }, {
                validator: this.passwordMatchValidator
            });
        }
        ngOnInit() {
            // Get token from route parameters
            this.token = this.route.snapshot.params['token'];
            if (!this.token) {
                this.error = 'Token inválido o expirado';
                this.router.navigate(['/auth/login']);
            }
        }
        // Custom validator to check if passwords match
        passwordMatchValidator(formGroup) {
            const password = formGroup.get('password')?.value;
            const confirmPassword = formGroup.get('confirmPassword')?.value;
            if (password !== confirmPassword) {
                formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
            }
            else {
                const confirmPasswordControl = formGroup.get('confirmPassword');
                if (confirmPasswordControl?.errors) {
                    const errors = { ...confirmPasswordControl.errors };
                    delete errors['passwordMismatch'];
                    confirmPasswordControl.setErrors(Object.keys(errors).length ? errors : null);
                }
            }
            return null;
        }
        // Getter for easy access to form fields
        get f() { return this.resetForm.controls; }
        // Añadir los métodos faltantes
        togglePasswordVisibility(field) {
            if (field === 'password') {
                this.showPassword = !this.showPassword;
            }
            else {
                this.showConfirmPassword = !this.showConfirmPassword;
            }
        }
        getPasswordErrors() {
            const control = this.resetForm.get('password');
            if (control?.errors) {
                if (control.errors['required']) {
                    return 'La contraseña es requerida';
                }
                if (control.errors['minlength']) {
                    return 'La contraseña debe tener al menos 6 caracteres';
                }
            }
            return '';
        }
        onSubmit() {
            this.submitted = true;
            if (this.resetForm.invalid) {
                return;
            }
            this.loading = true;
            const resetData = {
                token: this.token,
                password: this.f['password'].value,
                confirmPassword: this.f['confirmPassword'].value
            };
            this.authService.resetPassword(resetData)
                .subscribe({
                next: () => {
                    this.successMessage = 'Tu contraseña ha sido actualizada correctamente';
                    setTimeout(() => {
                        this.router.navigate(['/auth/login']);
                    }, 3000);
                },
                error: error => {
                    this.errorMessage = error?.error?.message || 'Error al restablecer la contraseña';
                    this.loading = false;
                }
            });
        }
    };
    __setFunctionName(_classThis, "ResetPasswordComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ResetPasswordComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ResetPasswordComponent = _classThis;
})();
exports.ResetPasswordComponent = ResetPasswordComponent;
