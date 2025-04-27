"use strict";
(self["webpackChunktienda_web_loto_ai"] = self["webpackChunktienda_web_loto_ai"] || []).push([["src_app_pages_profile_profile_component_ts"],{

/***/ 2683:
/*!****************************************************!*\
  !*** ./src/app/pages/profile/profile.component.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProfileComponent: () => (/* binding */ ProfileComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/auth.service */ 4796);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 5072);







function ProfileComponent_div_3_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div")(1, "p")(2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Nombre:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "p")(6, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Email:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "p")(10, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Tel\u00E9fono:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "p")(14, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Fecha de registro:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](17, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"](" ", ctx_r0.userProfile.nombre, " ", ctx_r0.userProfile.apellido, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r0.userProfile.email, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r0.userProfile.telefono || "No especificado", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](17, 5, ctx_r0.userProfile.fechaRegistro, "dd/MM/yyyy"), "");
  }
}
function ProfileComponent_div_3_form_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "form", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function ProfileComponent_div_3_form_2_Template_form_ngSubmit_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r2);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r0.onSubmitEdit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 8)(2, "label", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Nombre:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "input", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 8)(6, "label", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Apellido:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "input", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 8)(10, "label", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Tel\u00E9fono:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "input", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 15)(14, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Guardar");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ProfileComponent_div_3_form_2_Template_button_click_16_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r2);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r0.cancelEdit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Cancelar");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx_r0.editForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx_r0.editForm.valid || ctx_r0.loading);
  }
}
function ProfileComponent_div_3_form_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "form", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function ProfileComponent_div_3_form_3_Template_form_ngSubmit_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r0.onSubmitPassword());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 8)(2, "label", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Contrase\u00F1a actual:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "input", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 8)(6, "label", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Nueva contrase\u00F1a:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "input", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 8)(10, "label", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Confirmar contrase\u00F1a:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "input", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 15)(14, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Cambiar contrase\u00F1a");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ProfileComponent_div_3_form_3_Template_button_click_16_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r0.cancelPasswordChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Cancelar");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx_r0.passwordForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx_r0.passwordForm.valid || ctx_r0.loading);
  }
}
function ProfileComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, ProfileComponent_div_3_div_1_Template, 18, 8, "div", 4)(2, ProfileComponent_div_3_form_2_Template, 18, 2, "form", 5)(3, ProfileComponent_div_3_form_3_Template, 18, 2, "form", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r0.isEditing);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.isEditing);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.isChangingPassword);
  }
}
function ProfileComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 25)(1, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ProfileComponent_div_4_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r0.startEdit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Editar Perfil");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ProfileComponent_div_4_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r0.startPasswordChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Cambiar Contrase\u00F1a");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "button", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ProfileComponent_div_4_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r0.confirmDeleteAccount());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Eliminar Cuenta");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
class ProfileComponent {
  constructor(authService, router, fb) {
    this.authService = authService;
    this.router = router;
    this.fb = fb;
    this.userProfile = null;
    this.isEditing = false;
    this.isChangingPassword = false;
    this.loading = false;
    this.editForm = this.fb.group({
      nombre: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required],
      apellido: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required],
      telefono: ['']
    });
    this.passwordForm = this.fb.group({
      currentPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required],
      newPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.minLength(6)]],
      confirmPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }
  ngOnInit() {
    this.loadUserProfile();
  }
  loadUserProfile() {
    this.authService.getCurrentUser().subscribe({
      next: profile => {
        this.userProfile = profile;
        this.editForm.patchValue({
          nombre: profile.nombre,
          apellido: profile.apellido,
          telefono: profile.telefono
        });
      },
      error: error => {
        console.error('Error al cargar el perfil:', error);
        this.router.navigate(['/auth/login']);
      }
    });
  }
  startEdit() {
    this.isEditing = true;
    this.isChangingPassword = false;
  }
  cancelEdit() {
    this.isEditing = false;
    if (this.userProfile) {
      this.editForm.patchValue({
        nombre: this.userProfile.nombre,
        apellido: this.userProfile.apellido,
        telefono: this.userProfile.telefono
      });
    }
  }
  onSubmitEdit() {
    if (this.editForm.valid && this.userProfile) {
      this.loading = true;
      this.authService.updateProfile(this.userProfile.id, this.editForm.value).subscribe({
        next: updatedProfile => {
          this.userProfile = updatedProfile;
          this.isEditing = false;
          this.loading = false;
        },
        error: error => {
          console.error('Error al actualizar perfil:', error);
          this.loading = false;
        }
      });
    }
  }
  startPasswordChange() {
    this.isChangingPassword = true;
    this.isEditing = false;
  }
  cancelPasswordChange() {
    this.isChangingPassword = false;
    this.passwordForm.reset();
  }
  onSubmitPassword() {
    if (this.passwordForm.valid) {
      this.loading = true;
      const {
        currentPassword,
        newPassword
      } = this.passwordForm.value;
      this.authService.changePassword({
        currentPassword,
        newPassword
      }).subscribe({
        next: () => {
          this.isChangingPassword = false;
          this.loading = false;
          this.passwordForm.reset();
        },
        error: error => {
          console.error('Error al cambiar contraseña:', error);
          this.loading = false;
        }
      });
    }
  }
  confirmDeleteAccount() {
    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      this.loading = true;
      this.authService.deleteAccount(this.userProfile?.id || '').subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/auth/login']);
        },
        error: error => {
          console.error('Error al eliminar cuenta:', error);
          this.loading = false;
        }
      });
    }
  }
  passwordMatchValidator(group) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : {
      passwordMismatch: true
    };
  }
  static {
    this.ɵfac = function ProfileComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ProfileComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormBuilder));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: ProfileComponent,
      selectors: [["app-profile"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
      decls: 5,
      vars: 2,
      consts: [[1, "profile-container"], ["class", "user-info", 4, "ngIf"], ["class", "profile-actions", 4, "ngIf"], [1, "user-info"], [4, "ngIf"], ["class", "edit-form", 3, "formGroup", "ngSubmit", 4, "ngIf"], ["class", "password-form", 3, "formGroup", "ngSubmit", 4, "ngIf"], [1, "edit-form", 3, "ngSubmit", "formGroup"], [1, "form-group"], ["for", "nombre"], ["id", "nombre", "type", "text", "formControlName", "nombre"], ["for", "apellido"], ["id", "apellido", "type", "text", "formControlName", "apellido"], ["for", "telefono"], ["id", "telefono", "type", "tel", "formControlName", "telefono"], [1, "form-actions"], ["type", "submit", 3, "disabled"], ["type", "button", 3, "click"], [1, "password-form", 3, "ngSubmit", "formGroup"], ["for", "currentPassword"], ["id", "currentPassword", "type", "password", "formControlName", "currentPassword"], ["for", "newPassword"], ["id", "newPassword", "type", "password", "formControlName", "newPassword"], ["for", "confirmPassword"], ["id", "confirmPassword", "type", "password", "formControlName", "confirmPassword"], [1, "profile-actions"], [1, "btn-primary", 3, "click"], [1, "btn-danger", 3, "click"]],
      template: function ProfileComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Mi Perfil");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, ProfileComponent_div_3_Template, 4, 3, "div", 1)(4, ProfileComponent_div_4_Template, 7, 0, "div", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.userProfile);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.isEditing && !ctx.isChangingPassword);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.DatePipe, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName],
      styles: [".profile-container[_ngcontent-%COMP%] {\n      max-width: 800px;\n      margin: 2rem auto;\n      padding: 2rem;\n      background: white;\n      border-radius: 8px;\n      box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n    }\n\n    h2[_ngcontent-%COMP%] {\n      color: #333;\n      margin-bottom: 2rem;\n    }\n\n    .user-info[_ngcontent-%COMP%] {\n      margin-bottom: 2rem;\n    }\n\n    .user-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n      margin: 0.5rem 0;\n      font-size: 1.1rem;\n    }\n\n    .form-group[_ngcontent-%COMP%] {\n      margin-bottom: 1rem;\n    }\n\n    .form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n      display: block;\n      margin-bottom: 0.5rem;\n      color: #333;\n    }\n\n    .form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n      width: 100%;\n      padding: 0.5rem;\n      border: 1px solid #ddd;\n      border-radius: 4px;\n    }\n\n    .form-actions[_ngcontent-%COMP%] {\n      display: flex;\n      gap: 1rem;\n      margin-top: 1rem;\n    }\n\n    .profile-actions[_ngcontent-%COMP%] {\n      display: flex;\n      gap: 1rem;\n      flex-wrap: wrap;\n    }\n\n    button[_ngcontent-%COMP%] {\n      padding: 0.75rem 1.5rem;\n      border: none;\n      border-radius: 4px;\n      cursor: pointer;\n      font-size: 1rem;\n      transition: background-color 0.3s;\n    }\n\n    .btn-primary[_ngcontent-%COMP%] {\n      background-color: #007bff;\n      color: white;\n    }\n\n    .btn-primary[_ngcontent-%COMP%]:hover {\n      background-color: #0056b3;\n    }\n\n    .btn-danger[_ngcontent-%COMP%] {\n      background-color: #dc3545;\n      color: white;\n    }\n\n    .btn-danger[_ngcontent-%COMP%]:hover {\n      background-color: #c82333;\n    }\n\n    button[_ngcontent-%COMP%]:disabled {\n      background-color: #ccc;\n      cursor: not-allowed;\n    }\n  \n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvcHJvZmlsZS9wcm9maWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0lBQ0k7TUFDRSxnQkFBZ0I7TUFDaEIsaUJBQWlCO01BQ2pCLGFBQWE7TUFDYixpQkFBaUI7TUFDakIsa0JBQWtCO01BQ2xCLHFDQUFxQztJQUN2Qzs7SUFFQTtNQUNFLFdBQVc7TUFDWCxtQkFBbUI7SUFDckI7O0lBRUE7TUFDRSxtQkFBbUI7SUFDckI7O0lBRUE7TUFDRSxnQkFBZ0I7TUFDaEIsaUJBQWlCO0lBQ25COztJQUVBO01BQ0UsbUJBQW1CO0lBQ3JCOztJQUVBO01BQ0UsY0FBYztNQUNkLHFCQUFxQjtNQUNyQixXQUFXO0lBQ2I7O0lBRUE7TUFDRSxXQUFXO01BQ1gsZUFBZTtNQUNmLHNCQUFzQjtNQUN0QixrQkFBa0I7SUFDcEI7O0lBRUE7TUFDRSxhQUFhO01BQ2IsU0FBUztNQUNULGdCQUFnQjtJQUNsQjs7SUFFQTtNQUNFLGFBQWE7TUFDYixTQUFTO01BQ1QsZUFBZTtJQUNqQjs7SUFFQTtNQUNFLHVCQUF1QjtNQUN2QixZQUFZO01BQ1osa0JBQWtCO01BQ2xCLGVBQWU7TUFDZixlQUFlO01BQ2YsaUNBQWlDO0lBQ25DOztJQUVBO01BQ0UseUJBQXlCO01BQ3pCLFlBQVk7SUFDZDs7SUFFQTtNQUNFLHlCQUF5QjtJQUMzQjs7SUFFQTtNQUNFLHlCQUF5QjtNQUN6QixZQUFZO0lBQ2Q7O0lBRUE7TUFDRSx5QkFBeUI7SUFDM0I7O0lBRUE7TUFDRSxzQkFBc0I7TUFDdEIsbUJBQW1CO0lBQ3JCIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgLnByb2ZpbGUtY29udGFpbmVyIHtcbiAgICAgIG1heC13aWR0aDogODAwcHg7XG4gICAgICBtYXJnaW46IDJyZW0gYXV0bztcbiAgICAgIHBhZGRpbmc6IDJyZW07XG4gICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgIGJveC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSk7XG4gICAgfVxuXG4gICAgaDIge1xuICAgICAgY29sb3I6ICMzMzM7XG4gICAgICBtYXJnaW4tYm90dG9tOiAycmVtO1xuICAgIH1cblxuICAgIC51c2VyLWluZm8ge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMnJlbTtcbiAgICB9XG5cbiAgICAudXNlci1pbmZvIHAge1xuICAgICAgbWFyZ2luOiAwLjVyZW0gMDtcbiAgICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xuICAgIH1cblxuICAgIC5mb3JtLWdyb3VwIHtcbiAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG4gICAgfVxuXG4gICAgLmZvcm0tZ3JvdXAgbGFiZWwge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG4gICAgICBjb2xvcjogIzMzMztcbiAgICB9XG5cbiAgICAuZm9ybS1ncm91cCBpbnB1dCB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIHBhZGRpbmc6IDAuNXJlbTtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG4gICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgfVxuXG4gICAgLmZvcm0tYWN0aW9ucyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZ2FwOiAxcmVtO1xuICAgICAgbWFyZ2luLXRvcDogMXJlbTtcbiAgICB9XG5cbiAgICAucHJvZmlsZS1hY3Rpb25zIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBnYXA6IDFyZW07XG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgfVxuXG4gICAgYnV0dG9uIHtcbiAgICAgIHBhZGRpbmc6IDAuNzVyZW0gMS41cmVtO1xuICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjNzO1xuICAgIH1cblxuICAgIC5idG4tcHJpbWFyeSB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA3YmZmO1xuICAgICAgY29sb3I6IHdoaXRlO1xuICAgIH1cblxuICAgIC5idG4tcHJpbWFyeTpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA1NmIzO1xuICAgIH1cblxuICAgIC5idG4tZGFuZ2VyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNkYzM1NDU7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgfVxuXG4gICAgLmJ0bi1kYW5nZXI6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2M4MjMzMztcbiAgICB9XG5cbiAgICBidXR0b246ZGlzYWJsZWQge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2NjYztcbiAgICAgIGN1cnNvcjogbm90LWFsbG93ZWQ7XG4gICAgfVxuICAiXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=src_app_pages_profile_profile_component_ts.js.map