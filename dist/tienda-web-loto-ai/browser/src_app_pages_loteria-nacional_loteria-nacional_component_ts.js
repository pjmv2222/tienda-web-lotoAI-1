"use strict";
(self["webpackChunktienda_web_loto_ai"] = self["webpackChunktienda_web_loto_ai"] || []).push([["src_app_pages_loteria-nacional_loteria-nacional_component_ts"],{

/***/ 2877:
/*!**********************************************************************!*\
  !*** ./src/app/pages/loteria-nacional/loteria-nacional.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoteriaNacionalComponent: () => (/* binding */ LoteriaNacionalComponent)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _components_euromillones_ball_euromillones_ball_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/euromillones-ball/euromillones-ball.component */ 1913);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/auth.service */ 4796);
/* harmony import */ var _services_subscription_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/subscription.service */ 4227);








function LoteriaNacionalComponent_span_48_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "GRATIS");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function LoteriaNacionalComponent_p_61_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Necesitas ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "a", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "iniciar sesi\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, " para generar predicciones");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function LoteriaNacionalComponent_p_62_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Necesitas ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "a", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "suscribir este plan");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, " para generar predicciones");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function LoteriaNacionalComponent_span_67_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "10,22\u20AC");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function LoteriaNacionalComponent_span_68_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "ACTIVADO");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function LoteriaNacionalComponent_button_81_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function LoteriaNacionalComponent_button_81_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.showSubscriptionOptions());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Suscribir");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function LoteriaNacionalComponent_button_82_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Generar");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", true);
  }
}
function LoteriaNacionalComponent_p_83_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Necesitas ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "a", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "iniciar sesi\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, " para generar predicciones premium");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function LoteriaNacionalComponent_span_88_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "122\u20AC");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function LoteriaNacionalComponent_span_89_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "ACTIVADO");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function LoteriaNacionalComponent_button_104_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function LoteriaNacionalComponent_button_104_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.showSubscriptionOptions());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Suscribir");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function LoteriaNacionalComponent_button_105_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Generar");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", true);
  }
}
function LoteriaNacionalComponent_p_106_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Necesitas ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "a", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "iniciar sesi\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, " para generar predicciones premium");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
class LoteriaNacionalComponent {
  constructor(router, authService, subscriptionService) {
    this.router = router;
    this.authService = authService;
    this.subscriptionService = subscriptionService;
    this.isLoggedIn = false;
    this.hasBasicPlan = false;
    this.hasMonthlyPlan = false;
    this.hasProPlan = false;
    this.subscriptions = [];
  }
  ngOnInit() {
    // Verificar si el usuario está autenticado
    this.isLoggedIn = !!this.authService.currentUserValue;
    // Verificar si el usuario tiene suscripciones activas
    if (this.isLoggedIn) {
      // Verificar plan básico
      const basicSub = this.subscriptionService.hasActivePlan('basic').subscribe(hasBasic => {
        this.hasBasicPlan = hasBasic;
        console.log('Usuario tiene plan básico:', this.hasBasicPlan);
      });
      this.subscriptions.push(basicSub);
      // Verificar plan mensual
      const monthlySub = this.subscriptionService.hasActivePlan('monthly').subscribe(hasMonthly => {
        this.hasMonthlyPlan = hasMonthly;
        console.log('Usuario tiene plan mensual:', this.hasMonthlyPlan);
      });
      this.subscriptions.push(monthlySub);
      // Verificar plan pro
      const proSub = this.subscriptionService.hasActivePlan('pro').subscribe(hasPro => {
        this.hasProPlan = hasPro;
        console.log('Usuario tiene plan pro:', this.hasProPlan);
      });
      this.subscriptions.push(proSub);
    } else {
      // Para pruebas: simular que el usuario tiene un plan básico
      // Comentar o eliminar estas líneas en producción
      this.hasBasicPlan = true;
      console.log('Simulando que el usuario tiene plan básico (para pruebas)');
    }
  }
  generateBasicPrediction() {
    // Lógica para generar una predicción básica
    console.log('Generando predicción básica...');
    // Aquí se implementaría la lógica para llamar al servicio de predicciones
  }
  showSubscriptionOptions() {
    // Lógica para mostrar las opciones de suscripción
    console.log('Mostrando opciones de suscripción...');
    // Navegar a la página de planes de suscripción
    this.router.navigate(['/planes']);
  }
  ngOnDestroy() {
    // Cancelar todas las suscripciones para evitar memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  static {
    this.ɵfac = function LoteriaNacionalComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || LoteriaNacionalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_subscription_service__WEBPACK_IMPORTED_MODULE_2__.SubscriptionService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: LoteriaNacionalComponent,
      selectors: [["app-loteria-nacional"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
      decls: 267,
      vars: 138,
      consts: [[1, "page-container"], [1, "breadcrumb"], ["routerLink", "/home"], [1, "fas", "fa-home"], [1, "separator"], ["routerLink", "/home", 1, "link"], [1, "current"], [1, "content-container"], [1, "lottery-header"], [1, "lottery-logo"], ["src", "assets/img/cabecera_LoteriaNacionalAJ_topaz.png", "alt", "Loter\u00EDa Nacional Logo", 1, "lottery-image"], [1, "lottery-info"], [1, "lottery-title"], [1, "jackpot-info"], [1, "jackpot-label"], [1, "jackpot-amount"], [1, "next-draw"], [1, "next-draw-label"], [1, "next-draw-date"], [1, "lottery-description"], [1, "prediction-options"], [1, "options-container"], [1, "option-card"], [1, "option-header"], ["class", "option-price", "style", "display: none;", 4, "ngIf"], [1, "option-price", "active", 2, "display", "inline-block"], [1, "option-features"], [1, "generate-btn", 3, "click", "disabled"], ["class", "login-required", 4, "ngIf"], [1, "option-card", "premium"], ["class", "option-price", 4, "ngIf"], ["class", "option-price active", 4, "ngIf"], ["class", "generate-btn premium-btn", 3, "click", 4, "ngIf"], ["class", "generate-btn premium-btn", 3, "disabled", 4, "ngIf"], [1, "option-card", "premium", "pro"], [1, "how-it-works"], [1, "steps-container"], [1, "step"], [1, "step-number"], [1, "step-content"], [1, "statistics"], [1, "stats-container"], [1, "stats-card"], ["id", "most-frequent-terminations-container", 1, "lottery-balls-container"], [1, "ball-wrapper"], [3, "number", "size", "staticRendering", "customColor"], [1, "lottery-numbers-container"], [1, "lottery-number-row"], ["id", "least-frequent-terminations-container", 1, "lottery-balls-container"], [3, "number", "size", "priority", "customColor"], [1, "view-more"], ["href", "#", 1, "view-more-link"], [1, "last-results"], [1, "result-card"], [1, "result-date"], [1, "result-numbers"], [1, "lottery-number-large-container"], [1, "lottery-number-row", "large"], [1, "prize-info"], [1, "faq-section"], [1, "faq-container"], [1, "faq-item"], [1, "faq-question"], [1, "faq-toggle"], [1, "faq-answer"], [1, "disclaimer"], [1, "option-price", 2, "display", "none"], [1, "login-required"], ["routerLink", "/auth/login"], ["routerLink", "/planes"], [1, "option-price"], [1, "option-price", "active"], [1, "generate-btn", "premium-btn", 3, "click"], [1, "generate-btn", "premium-btn", 3, "disabled"]],
      template: function LoteriaNacionalComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "a", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "i", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "span", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, ">");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "a", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "Inicio");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "span", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, ">");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "span", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "Loter\u00EDa Nacional");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "div", 7)(13, "div", 8)(14, "div", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](15, "img", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "div", 11)(17, "h1", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, "Loter\u00EDa Nacional");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "div", 13)(20, "span", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21, "Premio principal:");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "span", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23, "300.000\u20AC Primer Premio");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "div", 16)(25, "span", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](26, "Pr\u00F3ximo sorteo:");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "span", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](28, "S\u00E1bado, 13 de abril");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](29, "div", 19)(30, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](31, "Predicciones para Loter\u00EDa Nacional con IA");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](33, " Nuestro sistema de inteligencia artificial analiza los resultados hist\u00F3ricos de la Loter\u00EDa Nacional para generar n\u00FAmeros con mayor probabilidad estad\u00EDstica de acierto. Utilizamos algoritmos avanzados de machine learning que identifican patrones y tendencias en los sorteos anteriores. ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](34, "p")(35, "strong");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](36, "Loter\u00EDa Nacional");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](37, " es una de las loter\u00EDas m\u00E1s tradicionales de Espa\u00F1a. A diferencia de otras loter\u00EDas, aqu\u00ED se juega con n\u00FAmeros de 5 cifras (del 00000 al 99999) y cada n\u00FAmero puede estar repetido en varios billetes o d\u00E9cimos. ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](38, "div", 20)(39, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](40, "Genera tus predicciones");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](41, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](42, "Selecciona una de nuestras opciones para obtener n\u00FAmeros generados por IA:");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](43, "div", 21)(44, "div", 22)(45, "div", 23)(46, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](47, "Predicci\u00F3n B\u00E1sica");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](48, LoteriaNacionalComponent_span_48_Template, 2, 0, "span", 24);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](49, "span", 25);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](50, "ACTIVADO");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](51, "div", 26)(52, "ul")(53, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](54, "3 combinaciones para cada 1 de los 7 juegos");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](55, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](56, "An\u00E1lisis b\u00E1sico");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](57, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](58, "Terminaciones optimizadas");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](59, "button", 27);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function LoteriaNacionalComponent_Template_button_click_59_listener() {
            return ctx.generateBasicPrediction();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](60, "Generar");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](61, LoteriaNacionalComponent_p_61_Template, 5, 0, "p", 28)(62, LoteriaNacionalComponent_p_62_Template, 5, 0, "p", 28);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](63, "div", 29)(64, "div", 23)(65, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](66, "Plan Mensual");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](67, LoteriaNacionalComponent_span_67_Template, 2, 0, "span", 30)(68, LoteriaNacionalComponent_span_68_Template, 2, 0, "span", 31);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](69, "div", 26)(70, "ul")(71, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](72, "Combinaciones optimizadas ilimitadas durante el mes de suscripci\u00F3n");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](73, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](74, "An\u00E1lisis avanzado de patrones");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](75, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](76, "Terminaciones optimizadas");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](77, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](78, "Estad\u00EDsticas detalladas");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](79, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](80, "Hist\u00F3rico de resultados");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](81, LoteriaNacionalComponent_button_81_Template, 2, 0, "button", 32)(82, LoteriaNacionalComponent_button_82_Template, 2, 1, "button", 33)(83, LoteriaNacionalComponent_p_83_Template, 5, 0, "p", 28);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](84, "div", 34)(85, "div", 23)(86, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](87, "Plan Pro");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](88, LoteriaNacionalComponent_span_88_Template, 2, 0, "span", 30)(89, LoteriaNacionalComponent_span_89_Template, 2, 0, "span", 31);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](90, "div", 26)(91, "ul")(92, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](93, "Combinaciones optimizadas ilimitadas durante los 12 meses de la suscripci\u00F3n");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](94, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](95, "An\u00E1lisis avanzado de patrones");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](96, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](97, "Terminaciones optimizadas");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](98, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](99, "Estad\u00EDsticas detalladas");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](100, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](101, "Hist\u00F3rico de resultados");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](102, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](103, "Acceso a todas las loter\u00EDas");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](104, LoteriaNacionalComponent_button_104_Template, 2, 0, "button", 32)(105, LoteriaNacionalComponent_button_105_Template, 2, 1, "button", 33)(106, LoteriaNacionalComponent_p_106_Template, 5, 0, "p", 28);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](107, "div", 35)(108, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](109, "C\u00F3mo funciona");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](110, "div", 36)(111, "div", 37)(112, "div", 38);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](113, "1");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](114, "div", 39)(115, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](116, "Reg\u00EDstrate");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](117, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](118, "Crea una cuenta gratuita para acceder a nuestras predicciones b\u00E1sicas o suscr\u00EDbete a un plan premium.");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](119, "div", 37)(120, "div", 38);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](121, "2");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](122, "div", 39)(123, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](124, "Genera predicciones");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](125, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](126, "Utiliza nuestra IA para generar n\u00FAmeros optimizados para la Loter\u00EDa Nacional.");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](127, "div", 37)(128, "div", 38);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](129, "3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](130, "div", 39)(131, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](132, "Compra tus n\u00FAmeros");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](133, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](134, "Utiliza los n\u00FAmeros generados para comprar tus d\u00E9cimos en los puntos de venta oficiales de Loter\u00EDa Nacional.");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](135, "div", 40)(136, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](137, "Estad\u00EDsticas de Loter\u00EDa Nacional");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](138, "div", 41)(139, "div", 42)(140, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](141, "Terminaciones m\u00E1s frecuentes");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](142, "div", 43)(143, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](144, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](145, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](146, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](147, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](148, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](149, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](150, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](151, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](152, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](153, "div", 42)(154, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](155, "N\u00FAmeros premiados recientemente");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](156, "div", 46)(157, "div", 47)(158, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](159, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](160, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](161, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](162, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](163, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](164, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](165, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](166, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](167, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](168, "div", 47)(169, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](170, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](171, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](172, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](173, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](174, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](175, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](176, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](177, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](178, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](179, "div", 47)(180, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](181, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](182, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](183, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](184, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](185, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](186, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](187, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](188, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](189, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](190, "div", 42)(191, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](192, "Terminaciones menos frecuentes");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](193, "div", 48)(194, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](195, "app-euromillones-ball", 49);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](196, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](197, "app-euromillones-ball", 49);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](198, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](199, "app-euromillones-ball", 49);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](200, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](201, "app-euromillones-ball", 49);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](202, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](203, "app-euromillones-ball", 49);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](204, "div", 50)(205, "a", 51);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](206, "Ver estad\u00EDsticas completas");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](207, "div", 52)(208, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](209, "\u00DAltimos resultados");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](210, "div", 53)(211, "div", 54);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](212, "S\u00E1bado, 6 de abril de 2024");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](213, "div", 55)(214, "div", 56)(215, "div", 57)(216, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](217, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](218, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](219, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](220, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](221, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](222, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](223, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](224, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](225, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](226, "div", 58);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](227, "Primer Premio");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](228, "div", 50)(229, "a", 51);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](230, "Ver resultados anteriores");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](231, "div", 59)(232, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](233, "Preguntas frecuentes");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](234, "div", 60)(235, "div", 61)(236, "div", 62)(237, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](238, "\u00BFC\u00F3mo se generan las predicciones?");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](239, "span", 63);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](240, "+");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](241, "div", 64)(242, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](243, "Nuestras predicciones se generan utilizando algoritmos de inteligencia artificial que analizan los resultados hist\u00F3ricos, frecuencias, patrones y tendencias estad\u00EDsticas de los sorteos de la Loter\u00EDa Nacional.");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](244, "div", 61)(245, "div", 62)(246, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](247, "\u00BFGarantizan que voy a ganar?");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](248, "span", 63);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](249, "+");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](250, "div", 64)(251, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](252, "No podemos garantizar premios ya que los sorteos de loter\u00EDa son juegos de azar. Nuestro sistema mejora las probabilidades estad\u00EDsticas, pero el resultado final siempre ser\u00E1 aleatorio.");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](253, "div", 61)(254, "div", 62)(255, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](256, "\u00BFCu\u00E1ntos n\u00FAmeros puedo generar?");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](257, "span", 63);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](258, "+");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](259, "div", 64)(260, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](261, "Con la cuenta gratuita puedes generar 1 n\u00FAmero b\u00E1sico por sorteo. Los planes premium permiten generar entre 5 y 20 n\u00FAmeros optimizados por sorteo, dependiendo del plan elegido.");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](262, "div", 65)(263, "p")(264, "strong");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](265, "Aviso importante:");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](266, " LOTO IA no est\u00E1 afiliado con los operadores oficiales de la Loter\u00EDa Nacional. Nuestro servicio proporciona predicciones basadas en an\u00E1lisis estad\u00EDstico e inteligencia artificial, pero no garantiza resultados. Juega con responsabilidad. ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](48);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.hasBasicPlan);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](11);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", !ctx.isLoggedIn || !ctx.hasBasicPlan);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.isLoggedIn);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isLoggedIn && !ctx.hasBasicPlan && false);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("active", ctx.hasMonthlyPlan);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.hasMonthlyPlan);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.hasMonthlyPlan);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](13);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.hasMonthlyPlan);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.hasMonthlyPlan);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.isLoggedIn);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("active", ctx.hasProPlan);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.hasProPlan);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.hasProPlan);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](15);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.hasProPlan);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.hasProPlan);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.isLoggedIn);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](38);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 7)("size", 80)("staticRendering", true)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 5)("size", 80)("staticRendering", true)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 3)("size", 80)("staticRendering", true)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 9)("size", 80)("staticRendering", true)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 1)("size", 80)("staticRendering", true)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 4)("size", 50)("staticRendering", true)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 5)("size", 50)("staticRendering", true)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 6)("size", 50)("staticRendering", true)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 7)("size", 50)("staticRendering", true)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 8)("size", 50)("staticRendering", true)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 2)("size", 50)("staticRendering", true)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 3)("size", 50)("staticRendering", true)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 4)("size", 50)("staticRendering", true)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 5)("size", 50)("staticRendering", true)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 6)("size", 50)("staticRendering", true)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 8)("size", 50)("staticRendering", true)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 7)("size", 50)("staticRendering", true)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 6)("size", 50)("staticRendering", true)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 5)("size", 50)("staticRendering", true)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 4)("size", 50)("staticRendering", true)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 2)("size", 80)("priority", 0)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 4)("size", 80)("priority", 0)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 6)("size", 80)("priority", 0)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 8)("size", 80)("priority", 0)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 0)("size", 80)("priority", 0)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](14);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 6)("size", 60)("staticRendering", true)("customColor", "#D32F2F");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 7)("size", 60)("staticRendering", true)("customColor", "#D32F2F");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 8)("size", 60)("staticRendering", true)("customColor", "#D32F2F");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 9)("size", 60)("staticRendering", true)("customColor", "#D32F2F");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 0)("size", 60)("staticRendering", true)("customColor", "#D32F2F");
        }
      },
      dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _components_euromillones_ball_euromillones_ball_component__WEBPACK_IMPORTED_MODULE_0__.EuromillonesBallComponent],
      styles: [".page-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n.breadcrumb[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 20px;\n  font-size: 14px;\n}\n\n.breadcrumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  text-decoration: none;\n}\n\n.breadcrumb[_ngcontent-%COMP%]   .separator[_ngcontent-%COMP%] {\n  margin: 0 8px;\n  color: #0a7abf;\n}\n\n.breadcrumb[_ngcontent-%COMP%]   .current[_ngcontent-%COMP%] {\n  color: #0a7abf;\n}\n\n.content-container[_ngcontent-%COMP%] {\n  background-color: #fff;\n  border-radius: 5px;\n  padding: 30px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n\n\n\n.lottery-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 30px;\n  padding-bottom: 20px;\n  border-bottom: 1px solid #eee;\n}\n\n.lottery-logo[_ngcontent-%COMP%] {\n  margin-right: 30px;\n}\n\n.lottery-image[_ngcontent-%COMP%] {\n  width: 120px;\n  height: auto;\n}\n\n.lottery-title[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 32px;\n  margin-bottom: 10px;\n}\n\n.jackpot-info[_ngcontent-%COMP%] {\n  margin-bottom: 5px;\n}\n\n.jackpot-label[_ngcontent-%COMP%] {\n  font-weight: bold;\n  margin-right: 10px;\n}\n\n.jackpot-amount[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: bold;\n  color: #e63946;\n}\n\n.next-draw-label[_ngcontent-%COMP%] {\n  font-weight: bold;\n  margin-right: 10px;\n}\n\n.next-draw-date[_ngcontent-%COMP%] {\n  font-weight: bold;\n}\n\n\n\n.lottery-description[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n\n.lottery-description[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 24px;\n  margin-bottom: 15px;\n}\n\n.lottery-description[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  line-height: 1.6;\n  margin-bottom: 15px;\n}\n\n\n\n.prediction-options[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n\n.prediction-options[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 24px;\n  margin-bottom: 15px;\n}\n\n.options-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 30px;\n  margin-top: 20px;\n}\n\n.option-card[_ngcontent-%COMP%] {\n  flex: 1;\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  padding: 20px;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n\n.option-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);\n}\n\n.option-card.premium[_ngcontent-%COMP%] {\n  border-color: #ffd700;\n  background-color: #fffdf0;\n}\n\n.option-card.premium.pro[_ngcontent-%COMP%] {\n  border-color: #0a7abf;\n  background-color: #f0f8ff;\n}\n\n.option-card.active[_ngcontent-%COMP%] {\n  border-color: #28a745;\n  background-color: rgba(40, 167, 69, 0.05);\n}\n\n.option-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 15px;\n  padding-bottom: 10px;\n  border-bottom: 1px solid #eee;\n}\n\n.option-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin: 0;\n}\n\n.option-price[_ngcontent-%COMP%] {\n  font-weight: bold;\n  color: #e63946;\n}\n\n.option-price.active[_ngcontent-%COMP%] {\n  background-color: #0a7abf !important;\n  color: white !important;\n  padding: 5px 10px;\n  border-radius: 4px;\n  font-weight: bold;\n  display: inline-block !important;\n}\n\n.option-features[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style-type: none;\n  padding: 0;\n  margin-bottom: 20px;\n}\n\n.option-features[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 8px 0;\n  position: relative;\n  padding-left: 25px;\n}\n\n.option-features[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:before {\n  content: '\u2713';\n  position: absolute;\n  left: 0;\n  color: #0a7abf;\n  font-weight: bold;\n}\n\n.generate-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px;\n  background-color: #0a7abf;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  font-size: 16px;\n  font-weight: bold;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n}\n\n.generate-btn[_ngcontent-%COMP%]:hover {\n  background-color: #086494;\n}\n\n.generate-btn[_ngcontent-%COMP%]:disabled {\n  background-color: #cccccc;\n  cursor: not-allowed;\n}\n\n.premium-btn[_ngcontent-%COMP%] {\n  background-color: #ffd700;\n  color: #333;\n}\n\n.premium-btn[_ngcontent-%COMP%]:hover {\n  background-color: #e6c200;\n}\n\n.login-required[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin-top: 10px;\n  text-align: center;\n  color: #666;\n}\n\n.login-required[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  text-decoration: none;\n}\n\n\n\n.how-it-works[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n\n.how-it-works[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 24px;\n  margin-bottom: 20px;\n}\n\n.steps-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n}\n\n.step[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: flex-start;\n}\n\n.step-number[_ngcontent-%COMP%] {\n  background-color: #0a7abf;\n  color: white;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: bold;\n  margin-right: 15px;\n  flex-shrink: 0;\n}\n\n.step-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 0;\n  margin-bottom: 10px;\n  color: #333;\n}\n\n.step-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #666;\n  line-height: 1.5;\n}\n\n\n\n.statistics[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n\n.statistics[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 24px;\n  margin-bottom: 20px;\n}\n\n.stats-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  margin-bottom: 20px;\n}\n\n.stats-card[_ngcontent-%COMP%] {\n  flex: 1;\n  background-color: #f9f9f9;\n  border-radius: 8px;\n  padding: 20px;\n  text-align: center;\n}\n\n.stats-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 0;\n  margin-bottom: 15px;\n  color: #333;\n  font-size: 18px;\n}\n\n\n\n.lottery-balls-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n  margin: 15px 0;\n}\n\n.ball-wrapper[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin: 5px;\n}\n\n.lottery-balls-separator[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: bold;\n  margin: 0 10px;\n  color: #333;\n}\n\n\n\n.number-balls[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n\n.termination[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background-color: #d32f2f;\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: bold;\n}\n\n\n\n.lottery-numbers-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n  align-items: center;\n}\n\n.lottery-number-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 5px;\n  margin: 5px 0;\n}\n\n.lottery-number-row.large[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\n\n.lottery-number-large-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-bottom: 10px;\n}\n\n\n\n.number-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  align-items: center;\n}\n\n.lottery-number[_ngcontent-%COMP%] {\n  background-color: #f5f5f5;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  padding: 8px 15px;\n  font-weight: bold;\n  font-size: 18px;\n  color: #333;\n}\n\n.lottery-number-large[_ngcontent-%COMP%] {\n  background-color: #d32f2f;\n  color: white;\n  border-radius: 4px;\n  padding: 15px 30px;\n  font-weight: bold;\n  font-size: 28px;\n  margin-bottom: 10px;\n}\n\n.prize-info[_ngcontent-%COMP%] {\n  font-weight: bold;\n  color: #333;\n}\n\n.view-more[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 20px;\n}\n\n.view-more-link[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  text-decoration: none;\n  font-weight: bold;\n}\n\n.view-more-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n\n\n\n.last-results[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n\n.last-results[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 24px;\n  margin-bottom: 20px;\n}\n\n.result-card[_ngcontent-%COMP%] {\n  background-color: #f9f9f9;\n  border-radius: 8px;\n  padding: 20px;\n  margin-bottom: 20px;\n}\n\n.result-date[_ngcontent-%COMP%] {\n  font-weight: bold;\n  margin-bottom: 15px;\n  color: #333;\n}\n\n.result-numbers[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 15px;\n}\n\n\n\n.faq-section[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n\n.faq-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 24px;\n  margin-bottom: 20px;\n}\n\n.faq-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n}\n\n.faq-item[_ngcontent-%COMP%] {\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  overflow: hidden;\n}\n\n.faq-question[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 15px 20px;\n  background-color: #f5f5f5;\n  cursor: pointer;\n}\n\n.faq-question[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n  color: #333;\n}\n\n.faq-toggle[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: bold;\n  color: #0a7abf;\n}\n\n.faq-answer[_ngcontent-%COMP%] {\n  padding: 0 20px 15px;\n  display: none;\n}\n\n.faq-answer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  line-height: 1.6;\n  color: #666;\n}\n\n\n\n.faq-item.active[_ngcontent-%COMP%]   .faq-answer[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.faq-item.active[_ngcontent-%COMP%]   .faq-toggle[_ngcontent-%COMP%] {\n  transform: rotate(45deg);\n}\n\n\n\n.disclaimer[_ngcontent-%COMP%] {\n  background-color: #f9f9f9;\n  border-radius: 8px;\n  padding: 20px;\n  margin-top: 40px;\n}\n\n.disclaimer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n  color: #666;\n  line-height: 1.6;\n}\n\n\n\n@media (max-width: 768px) {\n  .lottery-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .lottery-logo[_ngcontent-%COMP%] {\n    margin-right: 0;\n    margin-bottom: 20px;\n  }\n\n  .options-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .steps-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .stats-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .termination[_ngcontent-%COMP%] {\n    width: 35px;\n    height: 35px;\n    font-size: 14px;\n  }\n\n  .lottery-number-large[_ngcontent-%COMP%] {\n    font-size: 24px;\n    padding: 12px 24px;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvbG90ZXJpYS1uYWNpb25hbC9sb3RlcmlhLW5hY2lvbmFsLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBaUI7RUFDakIsY0FBYztFQUNkLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2Isd0NBQXdDO0FBQzFDOztBQUVBLDBCQUEwQjtBQUMxQjtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLG9CQUFvQjtFQUNwQiw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osWUFBWTtBQUNkOztBQUVBO0VBQ0UsY0FBYztFQUNkLGVBQWU7RUFDZixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQSwrQkFBK0I7QUFDL0I7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsZUFBZTtFQUNmLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixtQkFBbUI7QUFDckI7O0FBRUEsOEJBQThCO0FBQzlCO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsY0FBYztFQUNk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O0VBQ3hCOztFQUVBO0lBQ0Usc0JBQXNCO0VBQ3hCOztFQUVBO0lBQ0Usc0JBQXNCO0VBQ3hCOztFQUVBO0lBQ0UsV0FBVztJQUNYLFlBQVk7SUFDWixlQUFlO0VBQ2pCOztFQUVBO0lBQ0UsZUFBZTtJQUNmLGtCQUFrQjtFQUNwQjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLnBhZ2UtY29udGFpbmVyIHtcclxuICBtYXgtd2lkdGg6IDEyMDBweDtcclxuICBtYXJnaW46IDAgYXV0bztcclxuICBwYWRkaW5nOiAyMHB4O1xyXG59XHJcblxyXG4uYnJlYWRjcnVtYiB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG59XHJcblxyXG4uYnJlYWRjcnVtYiBhIHtcclxuICBjb2xvcjogIzBhN2FiZjtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbn1cclxuXHJcbi5icmVhZGNydW1iIC5zZXBhcmF0b3Ige1xyXG4gIG1hcmdpbjogMCA4cHg7XHJcbiAgY29sb3I6ICMwYTdhYmY7XHJcbn1cclxuXHJcbi5icmVhZGNydW1iIC5jdXJyZW50IHtcclxuICBjb2xvcjogIzBhN2FiZjtcclxufVxyXG5cclxuLmNvbnRlbnQtY29udGFpbmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICBwYWRkaW5nOiAzMHB4O1xyXG4gIGJveC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbn1cclxuXHJcbi8qIExvdHRlcnkgSGVhZGVyIFN0eWxlcyAqL1xyXG4ubG90dGVyeS1oZWFkZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xyXG4gIHBhZGRpbmctYm90dG9tOiAyMHB4O1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWVlO1xyXG59XHJcblxyXG4ubG90dGVyeS1sb2dvIHtcclxuICBtYXJnaW4tcmlnaHQ6IDMwcHg7XHJcbn1cclxuXHJcbi5sb3R0ZXJ5LWltYWdlIHtcclxuICB3aWR0aDogMTIwcHg7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG59XHJcblxyXG4ubG90dGVyeS10aXRsZSB7XHJcbiAgY29sb3I6ICMwYTdhYmY7XHJcbiAgZm9udC1zaXplOiAzMnB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbn1cclxuXHJcbi5qYWNrcG90LWluZm8ge1xyXG4gIG1hcmdpbi1ib3R0b206IDVweDtcclxufVxyXG5cclxuLmphY2twb3QtbGFiZWwge1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIG1hcmdpbi1yaWdodDogMTBweDtcclxufVxyXG5cclxuLmphY2twb3QtYW1vdW50IHtcclxuICBmb250LXNpemU6IDI0cHg7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgY29sb3I6ICNlNjM5NDY7XHJcbn1cclxuXHJcbi5uZXh0LWRyYXctbGFiZWwge1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIG1hcmdpbi1yaWdodDogMTBweDtcclxufVxyXG5cclxuLm5leHQtZHJhdy1kYXRlIHtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG5cclxuLyogTG90dGVyeSBEZXNjcmlwdGlvbiBTdHlsZXMgKi9cclxuLmxvdHRlcnktZGVzY3JpcHRpb24ge1xyXG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XHJcbn1cclxuXHJcbi5sb3R0ZXJ5LWRlc2NyaXB0aW9uIGgyIHtcclxuICBjb2xvcjogIzBhN2FiZjtcclxuICBmb250LXNpemU6IDI0cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcclxufVxyXG5cclxuLmxvdHRlcnktZGVzY3JpcHRpb24gcCB7XHJcbiAgbGluZS1oZWlnaHQ6IDEuNjtcclxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xyXG59XHJcblxyXG4vKiBQcmVkaWN0aW9uIE9wdGlvbnMgU3R5bGVzICovXHJcbi5wcmVkaWN0aW9uLW9wdGlvbnMge1xyXG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XHJcbn1cclxuXHJcbi5wcmVkaWN0aW9uLW9wdGlvbnMgaDIge1xyXG4gIGNvbG9yOiAjMGE3YWJmO1xyXG4gIGZvbnQtc2l6ZTogMjRweDtcclxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xyXG59XHJcblxyXG4ub3B0aW9ucy1jb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZ2FwOiAzMHB4O1xyXG4gIG1hcmdpbi10b3A6IDIwcHg7XHJcbn1cclxuXHJcbi5vcHRpb24tY2FyZCB7XHJcbiAgZmxleDogMTtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBwYWRkaW5nOiAyMHB4O1xyXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UsIGJveC1zaGFkb3cgMC4zcyBlYXNlO1xyXG59XHJcblxyXG4ub3B0aW9uLWNhcmQ6aG92ZXIge1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNXB4KTtcclxuICBib3gtc2hhZG93OiAwIDEwcHggMjBweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbn1cclxuXHJcbi5vcHRpb24tY2FyZC5wcmVtaXVtIHtcclxuICBib3JkZXItY29sb3I6ICNmZmQ3MDA7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmRmMDtcclxufVxyXG5cclxuLm9wdGlvbi1jYXJkLnByZW1pdW0ucHJvIHtcclxuICBib3JkZXItY29sb3I6ICMwYTdhYmY7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YwZjhmZjtcclxufVxyXG5cclxuLm9wdGlvbi1jYXJkLmFjdGl2ZSB7XHJcbiAgYm9yZGVyLWNvbG9yOiAjMjhhNzQ1O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNDAsIDE2NywgNjksIDAuMDUpO1xyXG59XHJcblxyXG4ub3B0aW9uLWhlYWRlciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xyXG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWVlO1xyXG59XHJcblxyXG4ub3B0aW9uLWhlYWRlciBoMyB7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG4gIG1hcmdpbjogMDtcclxufVxyXG5cclxuLm9wdGlvbi1wcmljZSB7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgY29sb3I6ICNlNjM5NDY7XHJcbn1cclxuXHJcbi5vcHRpb24tcHJpY2UuYWN0aXZlIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGE3YWJmICFpbXBvcnRhbnQ7XHJcbiAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XHJcbiAgcGFkZGluZzogNXB4IDEwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jayAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4ub3B0aW9uLWZlYXR1cmVzIHVsIHtcclxuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XHJcbiAgcGFkZGluZzogMDtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG59XHJcblxyXG4ub3B0aW9uLWZlYXR1cmVzIGxpIHtcclxuICBwYWRkaW5nOiA4cHggMDtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgcGFkZGluZy1sZWZ0OiAyNXB4O1xyXG59XHJcblxyXG4ub3B0aW9uLWZlYXR1cmVzIGxpOmJlZm9yZSB7XHJcbiAgY29udGVudDogJ8OiwpzCkyc7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGxlZnQ6IDA7XHJcbiAgY29sb3I6ICMwYTdhYmY7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbi5nZW5lcmF0ZS1idG4ge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIHBhZGRpbmc6IDEycHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBhN2FiZjtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcyBlYXNlO1xyXG59XHJcblxyXG4uZ2VuZXJhdGUtYnRuOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDg2NDk0O1xyXG59XHJcblxyXG4uZ2VuZXJhdGUtYnRuOmRpc2FibGVkIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjY2NjO1xyXG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XHJcbn1cclxuXHJcbi5wcmVtaXVtLWJ0biB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZDcwMDtcclxuICBjb2xvcjogIzMzMztcclxufVxyXG5cclxuLnByZW1pdW0tYnRuOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTZjMjAwO1xyXG59XHJcblxyXG4ubG9naW4tcmVxdWlyZWQge1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBjb2xvcjogIzY2NjtcclxufVxyXG5cclxuLmxvZ2luLXJlcXVpcmVkIGEge1xyXG4gIGNvbG9yOiAjMGE3YWJmO1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxufVxyXG5cclxuLyogSG93IEl0IFdvcmtzIFN0eWxlcyAqL1xyXG4uaG93LWl0LXdvcmtzIHtcclxuICBtYXJnaW4tYm90dG9tOiA0MHB4O1xyXG59XHJcblxyXG4uaG93LWl0LXdvcmtzIGgyIHtcclxuICBjb2xvcjogIzBhN2FiZjtcclxuICBmb250LXNpemU6IDI0cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxufVxyXG5cclxuLnN0ZXBzLWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBnYXA6IDIwcHg7XHJcbn1cclxuXHJcbi5zdGVwIHtcclxuICBmbGV4OiAxO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbn1cclxuXHJcbi5zdGVwLW51bWJlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBhN2FiZjtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgd2lkdGg6IDMwcHg7XHJcbiAgaGVpZ2h0OiAzMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xyXG4gIGZsZXgtc2hyaW5rOiAwO1xyXG59XHJcblxyXG4uc3RlcC1jb250ZW50IGgzIHtcclxuICBtYXJnaW4tdG9wOiAwO1xyXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgY29sb3I6ICMzMzM7XHJcbn1cclxuXHJcbi5zdGVwLWNvbnRlbnQgcCB7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGNvbG9yOiAjNjY2O1xyXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XHJcbn1cclxuXHJcbi8qIFN0YXRpc3RpY3MgU3R5bGVzICovXHJcbi5zdGF0aXN0aWNzIHtcclxuICBtYXJnaW4tYm90dG9tOiA0MHB4O1xyXG59XHJcblxyXG4uc3RhdGlzdGljcyBoMiB7XHJcbiAgY29sb3I6ICMwYTdhYmY7XHJcbiAgZm9udC1zaXplOiAyNHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbn1cclxuXHJcbi5zdGF0cy1jb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZ2FwOiAyMHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbn1cclxuXHJcbi5zdGF0cy1jYXJkIHtcclxuICBmbGV4OiAxO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7XHJcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gIHBhZGRpbmc6IDIwcHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uc3RhdHMtY2FyZCBoMyB7XHJcbiAgbWFyZ2luLXRvcDogMDtcclxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xyXG4gIGNvbG9yOiAjMzMzO1xyXG4gIGZvbnQtc2l6ZTogMThweDtcclxufVxyXG5cclxuLyogRXN0aWxvcyBwYXJhIGxvcyBjb250ZW5lZG9yZXMgZGUgYm9sYXMgZGUgbG90ZXLDg8KtYSAqL1xyXG4ubG90dGVyeS1iYWxscy1jb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDEwcHg7XHJcbiAgZmxleC13cmFwOiB3cmFwO1xyXG4gIG1hcmdpbjogMTVweCAwO1xyXG59XHJcblxyXG4uYmFsbC13cmFwcGVyIHtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgbWFyZ2luOiA1cHg7XHJcbn1cclxuXHJcbi5sb3R0ZXJ5LWJhbGxzLXNlcGFyYXRvciB7XHJcbiAgZm9udC1zaXplOiAyNHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIG1hcmdpbjogMCAxMHB4O1xyXG4gIGNvbG9yOiAjMzMzO1xyXG59XHJcblxyXG4vKiBNYW50ZW5lciBsb3MgZXN0aWxvcyBhbnRpZ3VvcyBwYXJhIGNvbXBhdGliaWxpZGFkICovXHJcbi5udW1iZXItYmFsbHMge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgZ2FwOiAxMHB4O1xyXG4gIGZsZXgtd3JhcDogd3JhcDtcclxufVxyXG5cclxuLnRlcm1pbmF0aW9uIHtcclxuICB3aWR0aDogNDBweDtcclxuICBoZWlnaHQ6IDQwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNkMzJmMmY7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG5cclxuLyogRXN0aWxvcyBwYXJhIGxvcyBjb250ZW5lZG9yZXMgZGUgbsODwrptZXJvcyBkZSBsb3RlcsODwq1hICovXHJcbi5sb3R0ZXJ5LW51bWJlcnMtY29udGFpbmVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgZ2FwOiAxNXB4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5sb3R0ZXJ5LW51bWJlci1yb3cge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDVweDtcclxuICBtYXJnaW46IDVweCAwO1xyXG59XHJcblxyXG4ubG90dGVyeS1udW1iZXItcm93LmxhcmdlIHtcclxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4ubG90dGVyeS1udW1iZXItbGFyZ2UtY29udGFpbmVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4vKiBNYW50ZW5lciBsb3MgZXN0aWxvcyBhbnRpZ3VvcyBwYXJhIGNvbXBhdGliaWxpZGFkICovXHJcbi5udW1iZXItbGlzdCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGdhcDogMTBweDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4ubG90dGVyeS1udW1iZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcclxuICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgcGFkZGluZzogOHB4IDE1cHg7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG4gIGNvbG9yOiAjMzMzO1xyXG59XHJcblxyXG4ubG90dGVyeS1udW1iZXItbGFyZ2Uge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNkMzJmMmY7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICBwYWRkaW5nOiAxNXB4IDMwcHg7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgZm9udC1zaXplOiAyOHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbn1cclxuXHJcbi5wcml6ZS1pbmZvIHtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBjb2xvcjogIzMzMztcclxufVxyXG5cclxuLnZpZXctbW9yZSB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIG1hcmdpbi10b3A6IDIwcHg7XHJcbn1cclxuXHJcbi52aWV3LW1vcmUtbGluayB7XHJcbiAgY29sb3I6ICMwYTdhYmY7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG4udmlldy1tb3JlLWxpbms6aG92ZXIge1xyXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xyXG59XHJcblxyXG4vKiBMYXN0IFJlc3VsdHMgU3R5bGVzICovXHJcbi5sYXN0LXJlc3VsdHMge1xyXG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XHJcbn1cclxuXHJcbi5sYXN0LXJlc3VsdHMgaDIge1xyXG4gIGNvbG9yOiAjMGE3YWJmO1xyXG4gIGZvbnQtc2l6ZTogMjRweDtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG59XHJcblxyXG4ucmVzdWx0LWNhcmQge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7XHJcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gIHBhZGRpbmc6IDIwcHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxufVxyXG5cclxuLnJlc3VsdC1kYXRlIHtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xyXG4gIGNvbG9yOiAjMzMzO1xyXG59XHJcblxyXG4ucmVzdWx0LW51bWJlcnMge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogMTVweDtcclxufVxyXG5cclxuLyogRkFRIFN0eWxlcyAqL1xyXG4uZmFxLXNlY3Rpb24ge1xyXG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XHJcbn1cclxuXHJcbi5mYXEtc2VjdGlvbiBoMiB7XHJcbiAgY29sb3I6ICMwYTdhYmY7XHJcbiAgZm9udC1zaXplOiAyNHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbn1cclxuXHJcbi5mYXEtY29udGFpbmVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgZ2FwOiAxNXB4O1xyXG59XHJcblxyXG4uZmFxLWl0ZW0ge1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XHJcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbi5mYXEtcXVlc3Rpb24ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgcGFkZGluZzogMTVweCAyMHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4uZmFxLXF1ZXN0aW9uIGgzIHtcclxuICBtYXJnaW46IDA7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG4gIGNvbG9yOiAjMzMzO1xyXG59XHJcblxyXG4uZmFxLXRvZ2dsZSB7XHJcbiAgZm9udC1zaXplOiAyMHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGNvbG9yOiAjMGE3YWJmO1xyXG59XHJcblxyXG4uZmFxLWFuc3dlciB7XHJcbiAgcGFkZGluZzogMCAyMHB4IDE1cHg7XHJcbiAgZGlzcGxheTogbm9uZTtcclxufVxyXG5cclxuLmZhcS1hbnN3ZXIgcCB7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGxpbmUtaGVpZ2h0OiAxLjY7XHJcbiAgY29sb3I6ICM2NjY7XHJcbn1cclxuXHJcbi8qIFNob3cgYW5zd2VyIHdoZW4gcXVlc3Rpb24gaXMgY2xpY2tlZCAodG8gYmUgaGFuZGxlZCB3aXRoIEphdmFTY3JpcHQpICovXHJcbi5mYXEtaXRlbS5hY3RpdmUgLmZhcS1hbnN3ZXIge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG4uZmFxLWl0ZW0uYWN0aXZlIC5mYXEtdG9nZ2xlIHtcclxuICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XHJcbn1cclxuXHJcbi8qIERpc2NsYWltZXIgU3R5bGVzICovXHJcbi5kaXNjbGFpbWVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBwYWRkaW5nOiAyMHB4O1xyXG4gIG1hcmdpbi10b3A6IDQwcHg7XHJcbn1cclxuXHJcbi5kaXNjbGFpbWVyIHAge1xyXG4gIG1hcmdpbjogMDtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgY29sb3I6ICM2NjY7XHJcbiAgbGluZS1oZWlnaHQ6IDEuNjtcclxufVxyXG5cclxuLyogUmVzcG9uc2l2ZSBTdHlsZXMgKi9cclxuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgLmxvdHRlcnktaGVhZGVyIHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuICB9XHJcblxyXG4gIC5sb3R0ZXJ5LWxvZ28ge1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAwO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxuICB9XHJcblxyXG4gIC5vcHRpb25zLWNvbnRhaW5lciB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIH1cclxuXHJcbiAgLnN0ZXBzLWNvbnRhaW5lciB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIH1cclxuXHJcbiAgLnN0YXRzLWNvbnRhaW5lciB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIH1cclxuXHJcbiAgLnRlcm1pbmF0aW9uIHtcclxuICAgIHdpZHRoOiAzNXB4O1xyXG4gICAgaGVpZ2h0OiAzNXB4O1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gIH1cclxuXHJcbiAgLmxvdHRlcnktbnVtYmVyLWxhcmdlIHtcclxuICAgIGZvbnQtc2l6ZTogMjRweDtcclxuICAgIHBhZGRpbmc6IDEycHggMjRweDtcclxuICB9XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=src_app_pages_loteria-nacional_loteria-nacional_component_ts.js.map