"use strict";
(self["webpackChunktienda_web_loto_ai"] = self["webpackChunktienda_web_loto_ai"] || []).push([["src_app_auth_verify-email_verify-email_component_ts"],{

/***/ 3457:
/*!*************************************************************!*\
  !*** ./src/app/auth/verify-email/verify-email.component.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VerifyEmailComponent: () => (/* binding */ VerifyEmailComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/auth.service */ 4796);





function VerifyEmailComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 4)(1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Verificando tu email...");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function VerifyEmailComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 6)(1, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "\u00A1Email Verificado!");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Tu cuenta ha sido verificada exitosamente.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Ser\u00E1s redirigido a la p\u00E1gina de bienvenida en ", ctx_r0.countdown, " segundos...");
  }
}
function VerifyEmailComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 7)(1, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Error de Verificaci\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function VerifyEmailComponent_div_3_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r2);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r0.retryVerification());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, " Intentar de nuevo ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function VerifyEmailComponent_div_3_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r2);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r0.goToLogin());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, " Ir al inicio de sesi\u00F3n ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.error);
  }
}
class VerifyEmailComponent {
  constructor(route, router, authService) {
    this.route = route;
    this.router = router;
    this.authService = authService;
    this.loading = true;
    this.success = false;
    this.error = null;
    this.countdown = 5;
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
    if (!this.token) return;
    this.loading = true;
    this.error = null;
    this.authService.verifyEmail(this.token).subscribe({
      next: response => {
        console.log('Respuesta de verificación:', response);
        this.loading = false;
        this.success = true;
        this.startCountdown();
      },
      error: error => {
        console.error('Error en la verificación:', error);
        this.loading = false;
        this.success = false;
        this.error = error.error?.message || 'Error al verificar el email';
      }
    });
  }
  startCountdown() {
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
        this.router.navigate(['/bienvenido']);
      }
    }, 1000);
  }
  retryVerification() {
    this.verifyEmail();
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
  static {
    this.ɵfac = function VerifyEmailComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || VerifyEmailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: VerifyEmailComponent,
      selectors: [["app-verify-email"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
      decls: 4,
      vars: 3,
      consts: [[1, "verify-email-container"], ["class", "loading-message", 4, "ngIf"], ["class", "success-message", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], [1, "loading-message"], [1, "spinner"], [1, "success-message"], [1, "error-message"], [1, "retry-button", 3, "click"], [1, "login-button", 3, "click"]],
      template: function VerifyEmailComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, VerifyEmailComponent_div_1_Template, 4, 0, "div", 1)(2, VerifyEmailComponent_div_2_Template, 7, 1, "div", 2)(3, VerifyEmailComponent_div_3_Template, 9, 1, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.loading);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.loading && ctx.success);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.loading && !ctx.success && ctx.error);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf],
      styles: [".verify-email-container[_ngcontent-%COMP%] {\n      max-width: 600px;\n      margin: 50px auto;\n      padding: 20px;\n      text-align: center;\n      background: white;\n      border-radius: 8px;\n      box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n    }\n\n    .loading-message[_ngcontent-%COMP%], .success-message[_ngcontent-%COMP%], .error-message[_ngcontent-%COMP%] {\n      padding: 20px;\n    }\n\n    .spinner[_ngcontent-%COMP%] {\n      width: 40px;\n      height: 40px;\n      margin: 20px auto;\n      border: 4px solid #f3f3f3;\n      border-top: 4px solid #3498db;\n      border-radius: 50%;\n      animation: _ngcontent-%COMP%_spin 1s linear infinite;\n    }\n\n    @keyframes _ngcontent-%COMP%_spin {\n      0% { transform: rotate(0deg); }\n      100% { transform: rotate(360deg); }\n    }\n\n    .success-message[_ngcontent-%COMP%] {\n      color: #2ecc71;\n    }\n\n    .error-message[_ngcontent-%COMP%] {\n      color: #e74c3c;\n    }\n\n    button[_ngcontent-%COMP%] {\n      margin: 10px;\n      padding: 10px 20px;\n      border: none;\n      border-radius: 4px;\n      cursor: pointer;\n      font-size: 16px;\n      transition: background-color 0.3s;\n    }\n\n    .retry-button[_ngcontent-%COMP%] {\n      background-color: #3498db;\n      color: white;\n    }\n\n    .login-button[_ngcontent-%COMP%] {\n      background-color: #2ecc71;\n      color: white;\n    }\n\n    button[_ngcontent-%COMP%]:hover {\n      opacity: 0.9;\n    }\n  \n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXV0aC92ZXJpZnktZW1haWwvdmVyaWZ5LWVtYWlsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0lBQ0k7TUFDRSxnQkFBZ0I7TUFDaEIsaUJBQWlCO01BQ2pCLGFBQWE7TUFDYixrQkFBa0I7TUFDbEIsaUJBQWlCO01BQ2pCLGtCQUFrQjtNQUNsQixxQ0FBcUM7SUFDdkM7O0lBRUE7TUFDRSxhQUFhO0lBQ2Y7O0lBRUE7TUFDRSxXQUFXO01BQ1gsWUFBWTtNQUNaLGlCQUFpQjtNQUNqQix5QkFBeUI7TUFDekIsNkJBQTZCO01BQzdCLGtCQUFrQjtNQUNsQixrQ0FBa0M7SUFDcEM7O0lBRUE7TUFDRSxLQUFLLHVCQUF1QixFQUFFO01BQzlCLE9BQU8seUJBQXlCLEVBQUU7SUFDcEM7O0lBRUE7TUFDRSxjQUFjO0lBQ2hCOztJQUVBO01BQ0UsY0FBYztJQUNoQjs7SUFFQTtNQUNFLFlBQVk7TUFDWixrQkFBa0I7TUFDbEIsWUFBWTtNQUNaLGtCQUFrQjtNQUNsQixlQUFlO01BQ2YsZUFBZTtNQUNmLGlDQUFpQztJQUNuQzs7SUFFQTtNQUNFLHlCQUF5QjtNQUN6QixZQUFZO0lBQ2Q7O0lBRUE7TUFDRSx5QkFBeUI7TUFDekIsWUFBWTtJQUNkOztJQUVBO01BQ0UsWUFBWTtJQUNkIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgLnZlcmlmeS1lbWFpbC1jb250YWluZXIge1xuICAgICAgbWF4LXdpZHRoOiA2MDBweDtcbiAgICAgIG1hcmdpbjogNTBweCBhdXRvO1xuICAgICAgcGFkZGluZzogMjBweDtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgICAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKTtcbiAgICB9XG5cbiAgICAubG9hZGluZy1tZXNzYWdlLCAuc3VjY2Vzcy1tZXNzYWdlLCAuZXJyb3ItbWVzc2FnZSB7XG4gICAgICBwYWRkaW5nOiAyMHB4O1xuICAgIH1cblxuICAgIC5zcGlubmVyIHtcbiAgICAgIHdpZHRoOiA0MHB4O1xuICAgICAgaGVpZ2h0OiA0MHB4O1xuICAgICAgbWFyZ2luOiAyMHB4IGF1dG87XG4gICAgICBib3JkZXI6IDRweCBzb2xpZCAjZjNmM2YzO1xuICAgICAgYm9yZGVyLXRvcDogNHB4IHNvbGlkICMzNDk4ZGI7XG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICBhbmltYXRpb246IHNwaW4gMXMgbGluZWFyIGluZmluaXRlO1xuICAgIH1cblxuICAgIEBrZXlmcmFtZXMgc3BpbiB7XG4gICAgICAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XG4gICAgICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfVxuICAgIH1cblxuICAgIC5zdWNjZXNzLW1lc3NhZ2Uge1xuICAgICAgY29sb3I6ICMyZWNjNzE7XG4gICAgfVxuXG4gICAgLmVycm9yLW1lc3NhZ2Uge1xuICAgICAgY29sb3I6ICNlNzRjM2M7XG4gICAgfVxuXG4gICAgYnV0dG9uIHtcbiAgICAgIG1hcmdpbjogMTBweDtcbiAgICAgIHBhZGRpbmc6IDEwcHggMjBweDtcbiAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcztcbiAgICB9XG5cbiAgICAucmV0cnktYnV0dG9uIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzNDk4ZGI7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgfVxuXG4gICAgLmxvZ2luLWJ1dHRvbiB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmVjYzcxO1xuICAgICAgY29sb3I6IHdoaXRlO1xuICAgIH1cblxuICAgIGJ1dHRvbjpob3ZlciB7XG4gICAgICBvcGFjaXR5OiAwLjk7XG4gICAgfVxuICAiXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=src_app_auth_verify-email_verify-email_component_ts.js.map