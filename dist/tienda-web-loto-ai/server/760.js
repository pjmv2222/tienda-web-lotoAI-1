"use strict";
exports.id = 760;
exports.ids = [760];
exports.modules = {

/***/ 78760:
/*!*****************************************************!*\
  !*** ./src/app/auth/register/register.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RegisterComponent: () => (/* binding */ RegisterComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94556);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 46584);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 61504);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37100);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/auth.service */ 28617);








const _c0 = a0 => ({
  "is-invalid": a0
});
function RegisterComponent_div_9_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "El nombre es requerido");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function RegisterComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, RegisterComponent_div_9_div_1_Template, 2, 0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.f["nombre"].errors["required"]);
  }
}
function RegisterComponent_div_14_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "El apellido es requerido");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function RegisterComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, RegisterComponent_div_14_div_1_Template, 2, 0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.f["apellido"].errors["required"]);
  }
}
function RegisterComponent_div_19_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "El correo electr\u00F3nico es requerido");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function RegisterComponent_div_19_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Ingrese un correo electr\u00F3nico v\u00E1lido");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function RegisterComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, RegisterComponent_div_19_div_1_Template, 2, 0, "div", 25)(2, RegisterComponent_div_19_div_2_Template, 2, 0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.f["email"].errors["required"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.f["email"].errors["email"]);
  }
}
function RegisterComponent_div_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 26)(1, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "small", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("width", ctx_r0.passwordStrength, "%")("background-color", ctx_r0.passwordStrength <= 25 ? "#dc3545" : ctx_r0.passwordStrength <= 50 ? "#ffc107" : ctx_r0.passwordStrength <= 75 ? "#17a2b8" : "#28a745");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" Fortaleza: ", ctx_r0.passwordStrength <= 25 ? "Muy d\u00E9bil" : ctx_r0.passwordStrength <= 50 ? "D\u00E9bil" : ctx_r0.passwordStrength <= 75 ? "Media" : "Fuerte", " ");
  }
}
function RegisterComponent_div_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r0.getPasswordErrorMessage(), " ");
  }
}
function RegisterComponent_div_36_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "La confirmaci\u00F3n de contrase\u00F1a es requerida");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function RegisterComponent_div_36_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Las contrase\u00F1as no coinciden");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function RegisterComponent_div_36_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, RegisterComponent_div_36_div_1_Template, 2, 0, "div", 25)(2, RegisterComponent_div_36_div_2_Template, 2, 0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.f["confirmPassword"].errors["required"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.f["confirmPassword"].errors["passwordMismatch"]);
  }
}
function RegisterComponent_span_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "span", 30);
  }
}
function RegisterComponent_div_43_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.errorMessage);
  }
}
let RegisterComponent = /*#__PURE__*/(() => {
  class RegisterComponent {
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
        nombre: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.minLength(2)]],
        apellido: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.minLength(2)]],
        email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.email]],
        telefono: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.pattern('^[0-9]{9,12}$')]],
        password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.minLength(6), this.createPasswordStrengthValidator()]],
        confirmPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required]]
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
      return control => {
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
          if (!errors.hasMinLength) messages.push('al menos 6 caracteres');
          if (!errors.hasUpperCase) messages.push('una letra mayúscula');
          if (!errors.hasLowerCase) messages.push('una letra minúscula');
          if (!errors.hasNumeric) messages.push('un número');
          return `La contraseña debe contener ${messages.join(', ')}`;
        }
      }
      return '';
    }
    // Método para alternar la visibilidad de las contraseñas
    togglePasswordVisibility(field) {
      if (field === 'password') {
        this.showPassword = !this.showPassword;
      } else {
        this.showConfirmPassword = !this.showConfirmPassword;
      }
    }
    // Validador personalizado para confirmar contraseña
    passwordMatchValidator(control) {
      if (!control || !(control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroup)) return null;
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
      if (!password || !confirmPassword) return null;
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({
          passwordMismatch: true
        });
        return {
          passwordMismatch: true
        };
      } else {
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
      console.log('Enviando datos de registro:', {
        ...registrationData,
        password: '[PROTECTED]'
      });
      this.authService.register(registrationData).subscribe({
        next: response => {
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
      if (password.length >= 6) strength += 25;
      if (/[A-Z]/.test(password)) strength += 25;
      if (/[a-z]/.test(password)) strength += 25;
      if (/[0-9]/.test(password)) strength += 25;
      return strength;
    }
    static {
      this.ɵfac = function RegisterComponent_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || RegisterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router));
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: RegisterComponent,
        selectors: [["app-register"]],
        standalone: true,
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
        decls: 44,
        vars: 29,
        consts: [[1, "register-container"], [1, "register-card"], [3, "ngSubmit", "formGroup"], [1, "form-group"], ["for", "nombre"], ["type", "text", "id", "nombre", "formControlName", "nombre", 1, "form-control", 3, "ngClass"], ["class", "invalid-feedback", 4, "ngIf"], ["for", "apellido"], ["type", "text", "id", "apellido", "formControlName", "apellido", 1, "form-control", 3, "ngClass"], ["for", "email"], ["type", "email", "id", "email", "formControlName", "email", 1, "form-control", 3, "ngClass"], ["for", "password"], [1, "input-group"], ["id", "password", "formControlName", "password", 1, "form-control", 3, "type", "ngClass"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click"], [1, "fas", 3, "ngClass"], ["class", "password-strength-bar", 4, "ngIf"], ["for", "confirmPassword"], ["id", "confirmPassword", "formControlName", "confirmPassword", 1, "form-control", 3, "type", "ngClass"], [1, "form-actions"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["class", "spinner-border spinner-border-sm mr-1", 4, "ngIf"], ["routerLink", "/auth/login", 1, "btn", "btn-link"], ["class", "alert alert-danger mt-3", 4, "ngIf"], [1, "invalid-feedback"], [4, "ngIf"], [1, "password-strength-bar"], [1, "progress"], [1, "progress-bar"], [1, "text-muted"], [1, "spinner-border", "spinner-border-sm", "mr-1"], [1, "alert", "alert-danger", "mt-3"]],
        template: function RegisterComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h2");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Crear Cuenta");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "form", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function RegisterComponent_Template_form_ngSubmit_4_listener() {
              return ctx.onSubmit();
            });
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 3)(6, "label", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Nombre *");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "input", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, RegisterComponent_div_9_Template, 2, 1, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 3)(11, "label", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "Apellido *");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](13, "input", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](14, RegisterComponent_div_14_Template, 2, 1, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 3)(16, "label", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Correo electr\u00F3nico *");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](18, "input", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](19, RegisterComponent_div_19_Template, 3, 2, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "div", 3)(21, "label", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, "Contrase\u00F1a *");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "div", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](24, "input", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "button", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function RegisterComponent_Template_button_click_25_listener() {
              return ctx.togglePasswordVisibility("password");
            });
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](26, "i", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](27, RegisterComponent_div_27_Template, 5, 5, "div", 16)(28, RegisterComponent_div_28_Template, 2, 1, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "div", 3)(30, "label", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](31, "Confirmar Contrase\u00F1a *");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "div", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](33, "input", 18);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](34, "button", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function RegisterComponent_Template_button_click_34_listener() {
              return ctx.togglePasswordVisibility("confirm");
            });
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](35, "i", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](36, RegisterComponent_div_36_Template, 3, 2, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "div", 19)(38, "button", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](39, RegisterComponent_span_39_Template, 1, 0, "span", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](40, " Registrarse ");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](41, "a", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](42, "Cancelar");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](43, RegisterComponent_div_43_Template, 2, 1, "div", 23);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
          }
          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.registerForm);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](19, _c0, ctx.submitted && ctx.f["nombre"].errors));
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.submitted && ctx.f["nombre"].errors);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](21, _c0, ctx.submitted && ctx.f["apellido"].errors));
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.submitted && ctx.f["apellido"].errors);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](23, _c0, ctx.submitted && ctx.f["email"].errors));
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.submitted && ctx.f["email"].errors);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("type", ctx.showPassword ? "text" : "password")("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](25, _c0, ctx.submitted && ctx.f["password"].errors));
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", ctx.showPassword ? "fa-eye-slash" : "fa-eye");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.f["password"].value);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.submitted && ctx.f["password"].errors);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("type", ctx.showConfirmPassword ? "text" : "password")("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](27, _c0, ctx.submitted && ctx.f["confirmPassword"].errors));
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", ctx.showConfirmPassword ? "fa-eye-slash" : "fa-eye");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.submitted && ctx.f["confirmPassword"].errors);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.loading);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.loading);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.errorMessage);
          }
        },
        dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLink],
        styles: [".register-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  padding: 20px;\n  background-color: #f8f9fa;\n}\n\n.register-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 2rem;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  width: 100%;\n  max-width: 400px;\n}\n\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n  position: relative;\n  width: 100%;\n}\n\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.5rem;\n  color: #495057;\n  font-weight: 500;\n}\n\n.input-group[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n  width: 100%;\n  position: relative;\n}\n\n.input-group[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%] {\n  border-radius: 4px;\n  width: 100%;\n  padding-right: 40px;\n  height: 38px; \n\n}\n\n.input-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0;\n  top: 0;\n  height: 38px; \n\n  width: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  border-left: 1px solid #ced4da;\n  padding: 0;\n  z-index: 3;\n}\n\n.input-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:hover {\n  background-color: rgba(0, 0, 0, 0.05);\n}\n\n.input-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:focus {\n  box-shadow: none;\n  outline: none;\n}\n\n.input-group[_ngcontent-%COMP%]   .fas[_ngcontent-%COMP%] {\n  color: #6c757d;\n  font-size: 14px;\n}\n\n.form-control[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 38px; \n\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  color: #495057;\n  background-color: #fff;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  box-sizing: border-box; \n\n}\n\n.form-control[_ngcontent-%COMP%]:focus {\n  border-color: #80bdff;\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n\n.invalid-feedback[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 80%;\n  color: #dc3545;\n}\n\n.is-invalid[_ngcontent-%COMP%] {\n  border-color: #dc3545;\n}\n\n.is-invalid[_ngcontent-%COMP%]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  color: #fff;\n  background-color: #007bff;\n  border-color: #007bff;\n  width: 100%;\n  height: 38px; \n\n  padding: 0;\n  margin-bottom: 1rem;\n  font-size: 1rem;\n  border-radius: 0.25rem;\n}\n\n.btn-link[_ngcontent-%COMP%] {\n  color: #007bff;\n  text-decoration: none;\n  width: 100%;\n  text-align: center;\n  display: block;\n  padding: 0.375rem 0;\n}\n\n.form-actions[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n  width: 100%;\n}\n\n.alert[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 1rem;\n  border: 1px solid transparent;\n  border-radius: 0.25rem;\n  width: 100%;\n}\n\n.alert-danger[_ngcontent-%COMP%] {\n  color: #721c24;\n  background-color: #f8d7da;\n  border-color: #f5c6cb;\n}\n\nh2[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 2rem;\n  color: #333;\n  width: 100%;\n}\n\n.password-strength-bar[_ngcontent-%COMP%] {\n  margin-top: 10px;\n}\n\n.progress[_ngcontent-%COMP%] {\n  height: 5px;\n  margin-bottom: 5px;\n  background-color: #e9ecef;\n  border-radius: 3px;\n}\n\n.progress-bar[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: 3px;\n  transition: width 0.3s ease;\n}\n\n.text-muted[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXV0aC9yZWdpc3Rlci9yZWdpc3Rlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLGFBQWE7RUFDYix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsYUFBYTtFQUNiLGtCQUFrQjtFQUNsQix3Q0FBd0M7RUFDeEMsV0FBVztFQUNYLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixrQkFBa0I7RUFDbEIsV0FBVztBQUNiOztBQUVBO0VBQ0UsY0FBYztFQUNkLHFCQUFxQjtFQUNyQixjQUFjO0VBQ2QsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG9CQUFvQjtFQUNwQixXQUFXO0VBQ1gsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxtQkFBbUI7RUFDbkIsWUFBWSxFQUFFLHNDQUFzQztBQUN0RDs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsTUFBTTtFQUNOLFlBQVksRUFBRSw4QkFBOEI7RUFDNUMsV0FBVztFQUNYLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osOEJBQThCO0VBQzlCLFVBQVU7RUFDVixVQUFVO0FBQ1o7O0FBRUE7RUFDRSxxQ0FBcUM7QUFDdkM7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsYUFBYTtBQUNmOztBQUVBO0VBQ0UsY0FBYztFQUNkLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsV0FBVztFQUNYLFlBQVksRUFBRSxzQ0FBc0M7RUFDcEQseUJBQXlCO0VBQ3pCLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsY0FBYztFQUNkLHNCQUFzQjtFQUN0Qix5QkFBeUI7RUFDekIsc0JBQXNCO0VBQ3RCLHdFQUF3RTtFQUN4RSxzQkFBc0IsRUFBRSxvREFBb0Q7QUFDOUU7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsVUFBVTtFQUNWLGdEQUFnRDtBQUNsRDs7QUFFQTtFQUNFLGNBQWM7RUFDZCxXQUFXO0VBQ1gsbUJBQW1CO0VBQ25CLGNBQWM7RUFDZCxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLGdEQUFnRDtBQUNsRDs7QUFFQTtFQUNFLFdBQVc7RUFDWCx5QkFBeUI7RUFDekIscUJBQXFCO0VBQ3JCLFdBQVc7RUFDWCxZQUFZLEVBQUUsZ0NBQWdDO0VBQzlDLFVBQVU7RUFDVixtQkFBbUI7RUFDbkIsZUFBZTtFQUNmLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxxQkFBcUI7RUFDckIsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixjQUFjO0VBQ2QsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFdBQVc7QUFDYjs7QUFFQTtFQUNFLHdCQUF3QjtFQUN4QixtQkFBbUI7RUFDbkIsNkJBQTZCO0VBQzdCLHNCQUFzQjtFQUN0QixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxjQUFjO0VBQ2QseUJBQXlCO0VBQ3pCLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIsV0FBVztFQUNYLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIseUJBQXlCO0VBQ3pCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQiIsInNvdXJjZXNDb250ZW50IjpbIi5yZWdpc3Rlci1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWluLWhlaWdodDogMTAwdmg7XG4gIHBhZGRpbmc6IDIwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmOGY5ZmE7XG59XG5cbi5yZWdpc3Rlci1jYXJkIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIHBhZGRpbmc6IDJyZW07XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC13aWR0aDogNDAwcHg7XG59XG5cbi5mb3JtLWdyb3VwIHtcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uZm9ybS1ncm91cCBsYWJlbCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG4gIGNvbG9yOiAjNDk1MDU3O1xuICBmb250LXdlaWdodDogNTAwO1xufVxuXG4uaW5wdXQtZ3JvdXAge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgd2lkdGg6IDEwMCU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmlucHV0LWdyb3VwIC5mb3JtLWNvbnRyb2wge1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nLXJpZ2h0OiA0MHB4O1xuICBoZWlnaHQ6IDM4cHg7IC8qIEFsdHVyYSBmaWphIHBhcmEgdG9kb3MgbG9zIGlucHV0cyAqL1xufVxuXG4uaW5wdXQtZ3JvdXAgLmJ0biB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDA7XG4gIHRvcDogMDtcbiAgaGVpZ2h0OiAzOHB4OyAvKiBNaXNtYSBhbHR1cmEgcXVlIGVsIGlucHV0ICovXG4gIHdpZHRoOiA0MHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjY2VkNGRhO1xuICBwYWRkaW5nOiAwO1xuICB6LWluZGV4OiAzO1xufVxuXG4uaW5wdXQtZ3JvdXAgLmJ0bjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4wNSk7XG59XG5cbi5pbnB1dC1ncm91cCAuYnRuOmZvY3VzIHtcbiAgYm94LXNoYWRvdzogbm9uZTtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuLmlucHV0LWdyb3VwIC5mYXMge1xuICBjb2xvcjogIzZjNzU3ZDtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4uZm9ybS1jb250cm9sIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDM4cHg7IC8qIEFsdHVyYSBmaWphIHBhcmEgdG9kb3MgbG9zIGlucHV0cyAqL1xuICBwYWRkaW5nOiAwLjM3NXJlbSAwLjc1cmVtO1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG4gIGNvbG9yOiAjNDk1MDU3O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2VkNGRhO1xuICBib3JkZXItcmFkaXVzOiAwLjI1cmVtO1xuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIGJveC1zaGFkb3cgMC4xNXMgZWFzZS1pbi1vdXQ7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIEFzZWd1cmEgcXVlIGVsIHBhZGRpbmcgbm8gYWZlY3RlIGVsIGFuY2hvIHRvdGFsICovXG59XG5cbi5mb3JtLWNvbnRyb2w6Zm9jdXMge1xuICBib3JkZXItY29sb3I6ICM4MGJkZmY7XG4gIG91dGxpbmU6IDA7XG4gIGJveC1zaGFkb3c6IDAgMCAwIDAuMnJlbSByZ2JhKDAsIDEyMywgMjU1LCAwLjI1KTtcbn1cblxuLmludmFsaWQtZmVlZGJhY2sge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi10b3A6IDAuMjVyZW07XG4gIGZvbnQtc2l6ZTogODAlO1xuICBjb2xvcjogI2RjMzU0NTtcbn1cblxuLmlzLWludmFsaWQge1xuICBib3JkZXItY29sb3I6ICNkYzM1NDU7XG59XG5cbi5pcy1pbnZhbGlkOmZvY3VzIHtcbiAgYm9yZGVyLWNvbG9yOiAjZGMzNTQ1O1xuICBib3gtc2hhZG93OiAwIDAgMCAwLjJyZW0gcmdiYSgyMjAsIDUzLCA2OSwgMC4yNSk7XG59XG5cbi5idG4tcHJpbWFyeSB7XG4gIGNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA3YmZmO1xuICBib3JkZXItY29sb3I6ICMwMDdiZmY7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDM4cHg7IC8qIE1pc21hIGFsdHVyYSBxdWUgbG9zIGlucHV0cyAqL1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICBmb250LXNpemU6IDFyZW07XG4gIGJvcmRlci1yYWRpdXM6IDAuMjVyZW07XG59XG5cbi5idG4tbGluayB7XG4gIGNvbG9yOiAjMDA3YmZmO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIHdpZHRoOiAxMDAlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwYWRkaW5nOiAwLjM3NXJlbSAwO1xufVxuXG4uZm9ybS1hY3Rpb25zIHtcbiAgbWFyZ2luLXRvcDogMS41cmVtO1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmFsZXJ0IHtcbiAgcGFkZGluZzogMC43NXJlbSAxLjI1cmVtO1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXJhZGl1czogMC4yNXJlbTtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5hbGVydC1kYW5nZXIge1xuICBjb2xvcjogIzcyMWMyNDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZDdkYTtcbiAgYm9yZGVyLWNvbG9yOiAjZjVjNmNiO1xufVxuXG5oMiB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcbiAgY29sb3I6ICMzMzM7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4ucGFzc3dvcmQtc3RyZW5ndGgtYmFyIHtcbiAgbWFyZ2luLXRvcDogMTBweDtcbn1cblxuLnByb2dyZXNzIHtcbiAgaGVpZ2h0OiA1cHg7XG4gIG1hcmdpbi1ib3R0b206IDVweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U5ZWNlZjtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xufVxuXG4ucHJvZ3Jlc3MtYmFyIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIHRyYW5zaXRpb246IHdpZHRoIDAuM3MgZWFzZTtcbn1cblxuLnRleHQtbXV0ZWQge1xuICBmb250LXNpemU6IDEycHg7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
      });
    }
  }
  return RegisterComponent;
})();

/***/ })

};
;
//# sourceMappingURL=760.js.map