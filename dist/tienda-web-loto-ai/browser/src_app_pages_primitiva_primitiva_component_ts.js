"use strict";
(self["webpackChunktienda_web_loto_ai"] = self["webpackChunktienda_web_loto_ai"] || []).push([["src_app_pages_primitiva_primitiva_component_ts"],{

/***/ 3948:
/*!********************************************************!*\
  !*** ./src/app/pages/primitiva/primitiva.component.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PrimitivaComponent: () => (/* binding */ PrimitivaComponent)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _components_euromillones_ball_euromillones_ball_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/euromillones-ball/euromillones-ball.component */ 1913);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/auth.service */ 4796);
/* harmony import */ var _services_subscription_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/subscription.service */ 4227);








function PrimitivaComponent_span_48_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "GRATIS");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function PrimitivaComponent_p_61_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Necesitas ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "a", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "iniciar sesi\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, " para generar predicciones");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function PrimitivaComponent_p_62_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Necesitas ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "a", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "suscribir este plan");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, " para generar predicciones");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function PrimitivaComponent_span_67_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "10,22\u20AC");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function PrimitivaComponent_span_68_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "ACTIVADO");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function PrimitivaComponent_button_81_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function PrimitivaComponent_button_81_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.showSubscriptionOptions());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Suscribir");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function PrimitivaComponent_button_82_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Generar");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", true);
  }
}
function PrimitivaComponent_p_83_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Necesitas ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "a", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "iniciar sesi\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, " para generar predicciones premium");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function PrimitivaComponent_span_88_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "122\u20AC");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function PrimitivaComponent_span_89_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "ACTIVADO");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function PrimitivaComponent_button_104_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function PrimitivaComponent_button_104_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.showSubscriptionOptions());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Suscribir");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function PrimitivaComponent_button_105_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Generar");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", true);
  }
}
function PrimitivaComponent_p_106_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Necesitas ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "a", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "iniciar sesi\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, " para generar predicciones premium");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
class PrimitivaComponent {
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
    this.ɵfac = function PrimitivaComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || PrimitivaComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_subscription_service__WEBPACK_IMPORTED_MODULE_2__.SubscriptionService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: PrimitivaComponent,
      selectors: [["app-primitiva"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
      decls: 247,
      vars: 110,
      consts: [[1, "page-container"], [1, "breadcrumb"], ["routerLink", "/home"], [1, "fas", "fa-home"], [1, "separator"], ["routerLink", "/home", 1, "link"], [1, "current"], [1, "content-container"], [1, "lottery-header"], [1, "lottery-logo"], ["src", "assets/img/cabecera_PrimitivaAJ_topaz.png", "alt", "La Primitiva Logo", 1, "lottery-image"], [1, "lottery-info"], [1, "lottery-title"], [1, "jackpot-info"], [1, "jackpot-label"], [1, "jackpot-amount"], [1, "next-draw"], [1, "next-draw-label"], [1, "next-draw-date"], [1, "lottery-description"], [1, "prediction-options"], [1, "options-container"], [1, "option-card"], [1, "option-header"], ["class", "option-price", "style", "display: none;", 4, "ngIf"], [1, "option-price", "active", 2, "display", "inline-block"], [1, "option-features"], [1, "generate-btn", 3, "click", "disabled"], ["class", "login-required", 4, "ngIf"], [1, "option-card", "premium"], ["class", "option-price", 4, "ngIf"], ["class", "option-price active", 4, "ngIf"], ["class", "generate-btn premium-btn", 3, "click", 4, "ngIf"], ["class", "generate-btn premium-btn", 3, "disabled", 4, "ngIf"], [1, "option-card", "premium", "pro"], [1, "how-it-works"], [1, "steps-container"], [1, "step"], [1, "step-number"], [1, "step-content"], [1, "statistics"], [1, "stats-container"], [1, "stats-card"], ["id", "most-frequent-numbers-container", 1, "lottery-balls-container"], [1, "ball-wrapper"], [3, "number", "size", "staticRendering", "customColor"], ["id", "most-frequent-complementary-container", 1, "lottery-balls-container"], [3, "number", "type", "size", "priority", "customColor"], ["id", "least-frequent-numbers-container", 1, "lottery-balls-container"], [3, "number", "size", "priority", "customColor"], [1, "view-more"], ["href", "#", 1, "view-more-link"], [1, "last-results"], [1, "result-card"], [1, "result-date"], [1, "result-numbers"], ["id", "last-results-container", 1, "lottery-balls-container"], [1, "lottery-balls-separator"], [1, "faq-section"], [1, "faq-container"], [1, "faq-item"], [1, "faq-question"], [1, "faq-toggle"], [1, "faq-answer"], [1, "disclaimer"], [1, "option-price", 2, "display", "none"], [1, "login-required"], ["routerLink", "/auth/login"], ["routerLink", "/planes"], [1, "option-price"], [1, "option-price", "active"], [1, "generate-btn", "premium-btn", 3, "click"], [1, "generate-btn", "premium-btn", 3, "disabled"]],
      template: function PrimitivaComponent_Template(rf, ctx) {
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
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "La Primitiva");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "div", 7)(13, "div", 8)(14, "div", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](15, "img", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "div", 11)(17, "h1", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, "La Primitiva");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "div", 13)(20, "span", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21, "Bote actual:");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "span", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23, "12,4 MILLONES \u20AC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "div", 16)(25, "span", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](26, "Pr\u00F3ximo sorteo:");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "span", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](28, "Jueves, 11 de abril");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](29, "div", 19)(30, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](31, "Predicciones para La Primitiva con IA");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](33, " Nuestro sistema de inteligencia artificial analiza los resultados hist\u00F3ricos de La Primitiva para generar combinaciones con mayor probabilidad estad\u00EDstica de acierto. Utilizamos algoritmos avanzados de machine learning que identifican patrones y tendencias en los sorteos anteriores. ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](34, "p")(35, "strong");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](36, "La Primitiva");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](37, " es una de las loter\u00EDas m\u00E1s populares de Espa\u00F1a. Para ganar el premio mayor, debes acertar 6 n\u00FAmeros (de 1 a 49) y el n\u00FAmero complementario. ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](38, "div", 20)(39, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](40, "Genera tus predicciones");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](41, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](42, "Selecciona una de nuestras opciones para obtener combinaciones generadas por IA:");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](43, "div", 21)(44, "div", 22)(45, "div", 23)(46, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](47, "Predicci\u00F3n B\u00E1sica");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](48, PrimitivaComponent_span_48_Template, 2, 0, "span", 24);
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
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](58, "N\u00FAmero complementario optimizado");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](59, "button", 27);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function PrimitivaComponent_Template_button_click_59_listener() {
            return ctx.generateBasicPrediction();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](60, "Generar");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](61, PrimitivaComponent_p_61_Template, 5, 0, "p", 28)(62, PrimitivaComponent_p_62_Template, 5, 0, "p", 28);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](63, "div", 29)(64, "div", 23)(65, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](66, "Plan Mensual");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](67, PrimitivaComponent_span_67_Template, 2, 0, "span", 30)(68, PrimitivaComponent_span_68_Template, 2, 0, "span", 31);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](69, "div", 26)(70, "ul")(71, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](72, "Combinaciones optimizadas ilimitadas durante el mes de suscripci\u00F3n");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](73, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](74, "An\u00E1lisis avanzado de patrones");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](75, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](76, "N\u00FAmero complementario optimizado");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](77, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](78, "Estad\u00EDsticas detalladas");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](79, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](80, "Hist\u00F3rico de resultados");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](81, PrimitivaComponent_button_81_Template, 2, 0, "button", 32)(82, PrimitivaComponent_button_82_Template, 2, 1, "button", 33)(83, PrimitivaComponent_p_83_Template, 5, 0, "p", 28);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](84, "div", 34)(85, "div", 23)(86, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](87, "Plan Pro");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](88, PrimitivaComponent_span_88_Template, 2, 0, "span", 30)(89, PrimitivaComponent_span_89_Template, 2, 0, "span", 31);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](90, "div", 26)(91, "ul")(92, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](93, "Combinaciones optimizadas ilimitadas durante los 12 meses de la suscripci\u00F3n");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](94, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](95, "An\u00E1lisis avanzado de patrones");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](96, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](97, "N\u00FAmero complementario optimizado");
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
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](104, PrimitivaComponent_button_104_Template, 2, 0, "button", 32)(105, PrimitivaComponent_button_105_Template, 2, 1, "button", 33)(106, PrimitivaComponent_p_106_Template, 5, 0, "p", 28);
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
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](126, "Utiliza nuestra IA para generar combinaciones optimizadas para La Primitiva.");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](127, "div", 37)(128, "div", 38);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](129, "3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](130, "div", 39)(131, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](132, "Juega tus n\u00FAmeros");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](133, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](134, "Utiliza las combinaciones generadas para participar en los sorteos oficiales de La Primitiva.");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](135, "div", 40)(136, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](137, "Estad\u00EDsticas de La Primitiva");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](138, "div", 41)(139, "div", 42)(140, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](141, "N\u00FAmeros m\u00E1s frecuentes");
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
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](153, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](154, "app-euromillones-ball", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](155, "div", 42)(156, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](157, "Complementarios m\u00E1s frecuentes");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](158, "div", 46)(159, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](160, "app-euromillones-ball", 47);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](161, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](162, "app-euromillones-ball", 47);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](163, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](164, "app-euromillones-ball", 47);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](165, "div", 42)(166, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](167, "N\u00FAmeros menos frecuentes");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](168, "div", 48)(169, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](170, "app-euromillones-ball", 49);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](171, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](172, "app-euromillones-ball", 49);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](173, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](174, "app-euromillones-ball", 49);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](175, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](176, "app-euromillones-ball", 49);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](177, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](178, "app-euromillones-ball", 49);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](179, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](180, "app-euromillones-ball", 49);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](181, "div", 50)(182, "a", 51);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](183, "Ver estad\u00EDsticas completas");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](184, "div", 52)(185, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](186, "\u00DAltimos resultados");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](187, "div", 53)(188, "div", 54);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](189, "S\u00E1bado, 6 de abril de 2024");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](190, "div", 55)(191, "div", 56)(192, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](193, "app-euromillones-ball", 49);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](194, "div", 44);
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
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](204, "span", 57);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](205, "+");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](206, "div", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](207, "app-euromillones-ball", 47);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](208, "div", 50)(209, "a", 51);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](210, "Ver resultados anteriores");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](211, "div", 58)(212, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](213, "Preguntas frecuentes");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](214, "div", 59)(215, "div", 60)(216, "div", 61)(217, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](218, "\u00BFC\u00F3mo se generan las predicciones?");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](219, "span", 62);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](220, "+");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](221, "div", 63)(222, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](223, "Nuestras predicciones se generan utilizando algoritmos de inteligencia artificial que analizan los resultados hist\u00F3ricos, frecuencias, patrones y tendencias estad\u00EDsticas de los sorteos de La Primitiva.");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](224, "div", 60)(225, "div", 61)(226, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](227, "\u00BFGarantizan que voy a ganar?");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](228, "span", 62);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](229, "+");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](230, "div", 63)(231, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](232, "No podemos garantizar premios ya que los sorteos de loter\u00EDa son juegos de azar. Nuestro sistema mejora las probabilidades estad\u00EDsticas, pero el resultado final siempre ser\u00E1 aleatorio.");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](233, "div", 60)(234, "div", 61)(235, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](236, "\u00BFCu\u00E1ntas combinaciones puedo generar?");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](237, "span", 62);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](238, "+");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](239, "div", 63)(240, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](241, "Con la cuenta gratuita puedes generar 1 combinaci\u00F3n b\u00E1sica por sorteo. Los planes premium permiten generar entre 5 y 20 combinaciones optimizadas por sorteo, dependiendo del plan elegido.");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](242, "div", 64)(243, "p")(244, "strong");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](245, "Aviso importante:");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](246, " LOTO IA no est\u00E1 afiliado con los operadores oficiales de La Primitiva. Nuestro servicio proporciona predicciones basadas en an\u00E1lisis estad\u00EDstico e inteligencia artificial, pero no garantiza resultados. Juega con responsabilidad. ");
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
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 3)("size", 80)("staticRendering", true)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 12)("size", 80)("staticRendering", true)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 23)("size", 80)("staticRendering", true)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 27)("size", 80)("staticRendering", true)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 38)("size", 80)("staticRendering", true)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 43)("size", 80)("staticRendering", true)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 8)("type", "star")("size", 80)("priority", 1)("customColor", "#FF9800");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 21)("type", "star")("size", 80)("priority", 1)("customColor", "#FF9800");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 35)("type", "star")("size", 80)("priority", 1)("customColor", "#FF9800");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 15)("size", 80)("priority", 0)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 20)("size", 80)("priority", 0)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 29)("size", 80)("priority", 0)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 34)("size", 80)("priority", 0)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 41)("size", 80)("priority", 0)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 47)("size", 80)("priority", 0)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](13);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 2)("size", 80)("priority", 2)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 14)("size", 80)("priority", 2)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 22)("size", 80)("priority", 2)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 31)("size", 80)("priority", 2)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 37)("size", 80)("priority", 2)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 45)("size", 80)("priority", 2)("customColor", "#0066CC");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("number", 18)("type", "star")("size", 80)("priority", 2)("customColor", "#FF9800");
        }
      },
      dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _components_euromillones_ball_euromillones_ball_component__WEBPACK_IMPORTED_MODULE_0__.EuromillonesBallComponent],
      styles: [".page-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n.breadcrumb[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 20px;\n  font-size: 14px;\n}\n\n.breadcrumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  text-decoration: none;\n}\n\n.breadcrumb[_ngcontent-%COMP%]   .separator[_ngcontent-%COMP%] {\n  margin: 0 8px;\n  color: #0a7abf;\n}\n\n.breadcrumb[_ngcontent-%COMP%]   .current[_ngcontent-%COMP%] {\n  color: #0a7abf;\n}\n\n.content-container[_ngcontent-%COMP%] {\n  background-color: #fff;\n  border-radius: 5px;\n  padding: 30px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n\n\n\n.lottery-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 30px;\n  padding-bottom: 20px;\n  border-bottom: 1px solid #eee;\n}\n\n.lottery-logo[_ngcontent-%COMP%] {\n  margin-right: 30px;\n}\n\n.lottery-image[_ngcontent-%COMP%] {\n  width: 120px;\n  height: auto;\n}\n\n.lottery-title[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 32px;\n  margin-bottom: 10px;\n}\n\n.jackpot-info[_ngcontent-%COMP%] {\n  margin-bottom: 5px;\n}\n\n.jackpot-label[_ngcontent-%COMP%] {\n  font-weight: bold;\n  margin-right: 10px;\n}\n\n.jackpot-amount[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: bold;\n  color: #e63946;\n}\n\n.next-draw-label[_ngcontent-%COMP%] {\n  font-weight: bold;\n  margin-right: 10px;\n}\n\n.next-draw-date[_ngcontent-%COMP%] {\n  font-weight: bold;\n}\n\n\n\n.lottery-description[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n\n.lottery-description[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 24px;\n  margin-bottom: 15px;\n}\n\n.lottery-description[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  line-height: 1.6;\n  margin-bottom: 15px;\n}\n\n\n\n.prediction-options[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n\n.prediction-options[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 24px;\n  margin-bottom: 15px;\n}\n\n.options-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 30px;\n  margin-top: 20px;\n}\n\n.option-card[_ngcontent-%COMP%] {\n  flex: 1;\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  padding: 20px;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n\n.option-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);\n}\n\n.option-card.premium[_ngcontent-%COMP%] {\n  border-color: #ffd700;\n  background-color: #fffdf0;\n}\n\n.option-card.premium.pro[_ngcontent-%COMP%] {\n  border-color: #0a7abf;\n  background-color: #f0f8ff;\n}\n\n.option-card.active[_ngcontent-%COMP%] {\n  border-color: #28a745;\n  background-color: rgba(40, 167, 69, 0.05);\n}\n\n.option-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 15px;\n  padding-bottom: 10px;\n  border-bottom: 1px solid #eee;\n}\n\n.option-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin: 0;\n}\n\n.option-price[_ngcontent-%COMP%] {\n  font-weight: bold;\n  color: #e63946;\n}\n\n.option-price.active[_ngcontent-%COMP%] {\n  background-color: #0a7abf !important;\n  color: white !important;\n  padding: 5px 10px;\n  border-radius: 4px;\n  font-weight: bold;\n  display: inline-block !important;\n}\n\n.option-features[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style-type: none;\n  padding: 0;\n  margin-bottom: 20px;\n}\n\n.option-features[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 8px 0;\n  position: relative;\n  padding-left: 25px;\n}\n\n.option-features[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:before {\n  content: '\u2713';\n  position: absolute;\n  left: 0;\n  color: #0a7abf;\n  font-weight: bold;\n}\n\n.generate-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px;\n  background-color: #0a7abf;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  font-size: 16px;\n  font-weight: bold;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n}\n\n.generate-btn[_ngcontent-%COMP%]:hover {\n  background-color: #086494;\n}\n\n.generate-btn[_ngcontent-%COMP%]:disabled {\n  background-color: #cccccc;\n  cursor: not-allowed;\n}\n\n.premium-btn[_ngcontent-%COMP%] {\n  background-color: #ffd700;\n  color: #333;\n}\n\n.premium-btn[_ngcontent-%COMP%]:hover {\n  background-color: #e6c200;\n}\n\n.login-required[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin-top: 10px;\n  text-align: center;\n  color: #666;\n}\n\n.login-required[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  text-decoration: none;\n}\n\n\n\n.how-it-works[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n\n.how-it-works[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 24px;\n  margin-bottom: 20px;\n}\n\n.steps-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n}\n\n.step[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: flex-start;\n}\n\n.step-number[_ngcontent-%COMP%] {\n  background-color: #0a7abf;\n  color: white;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: bold;\n  margin-right: 15px;\n  flex-shrink: 0;\n}\n\n.step-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 0;\n  margin-bottom: 10px;\n  color: #333;\n}\n\n.step-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #666;\n  line-height: 1.5;\n}\n\n\n\n.statistics[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n\n.statistics[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 24px;\n  margin-bottom: 20px;\n}\n\n.stats-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  margin-bottom: 20px;\n}\n\n.stats-card[_ngcontent-%COMP%] {\n  flex: 1;\n  background-color: #f9f9f9;\n  border-radius: 8px;\n  padding: 20px;\n  text-align: center;\n}\n\n.stats-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 0;\n  margin-bottom: 15px;\n  color: #333;\n  font-size: 18px;\n}\n\n\n\n.lottery-balls-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n  margin: 15px 0;\n}\n\n.ball-wrapper[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin: 5px;\n}\n\n.lottery-balls-separator[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: bold;\n  margin: 0 10px;\n  color: #333;\n}\n\n\n\n.number-balls[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n\n.ball[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background-color: #0a7abf;\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: bold;\n}\n\n.complementary-ball[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background-color: #ff9800;\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: bold;\n}\n\n.view-more[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 20px;\n}\n\n.view-more-link[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  text-decoration: none;\n  font-weight: bold;\n}\n\n.view-more-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n\n\n\n.last-results[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n\n.last-results[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 24px;\n  margin-bottom: 20px;\n}\n\n.result-card[_ngcontent-%COMP%] {\n  background-color: #f9f9f9;\n  border-radius: 8px;\n  padding: 20px;\n  margin-bottom: 20px;\n}\n\n.result-date[_ngcontent-%COMP%] {\n  font-weight: bold;\n  margin-bottom: 15px;\n  color: #333;\n}\n\n.result-numbers[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 15px;\n}\n\n\n\n.faq-section[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n\n.faq-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 24px;\n  margin-bottom: 20px;\n}\n\n.faq-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n}\n\n.faq-item[_ngcontent-%COMP%] {\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  overflow: hidden;\n}\n\n.faq-question[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 15px 20px;\n  background-color: #f5f5f5;\n  cursor: pointer;\n}\n\n.faq-question[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n  color: #333;\n}\n\n.faq-toggle[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: bold;\n  color: #0a7abf;\n}\n\n.faq-answer[_ngcontent-%COMP%] {\n  padding: 0 20px 15px;\n  display: none;\n}\n\n.faq-answer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  line-height: 1.6;\n  color: #666;\n}\n\n\n\n.faq-item.active[_ngcontent-%COMP%]   .faq-answer[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.faq-item.active[_ngcontent-%COMP%]   .faq-toggle[_ngcontent-%COMP%] {\n  transform: rotate(45deg);\n}\n\n\n\n.disclaimer[_ngcontent-%COMP%] {\n  background-color: #f9f9f9;\n  border-radius: 8px;\n  padding: 20px;\n  margin-top: 40px;\n}\n\n.disclaimer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n  color: #666;\n  line-height: 1.6;\n}\n\n\n\n@media (max-width: 768px) {\n  .lottery-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .lottery-logo[_ngcontent-%COMP%] {\n    margin-right: 0;\n    margin-bottom: 20px;\n  }\n\n  .options-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .steps-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .stats-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .ball[_ngcontent-%COMP%], .complementary-ball[_ngcontent-%COMP%] {\n    width: 35px;\n    height: 35px;\n    font-size: 14px;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvcHJpbWl0aXZhL3ByaW1pdGl2YS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaUJBQWlCO0VBQ2pCLGNBQWM7RUFDZCxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsY0FBYztFQUNkLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLHdDQUF3QztBQUMxQzs7QUFFQSwwQkFBMEI7QUFDMUI7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQixvQkFBb0I7RUFDcEIsNkJBQTZCO0FBQy9COztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGNBQWM7RUFDZCxlQUFlO0VBQ2YsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUEsK0JBQStCO0FBQy9CO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsY0FBYztFQUNkLGVBQWU7RUFDZixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsbUJBQW1CO0FBQ3JCOztBQUVBLDhCQUE4QjtBQUM5QjtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxlQUFlO0VBQ2YsbUJB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QUNsQix5QkFBeUI7RUFDekIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFNBQVM7RUFDVCxlQUFlO0VBQ2YsV0FBVztBQUNiOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLGFBQWE7QUFDZjs7QUFFQTtFQUNFLFNBQVM7RUFDVCxnQkFBZ0I7RUFDaEIsV0FBVztBQUNiOztBQUVBLHlFQUF5RTtBQUN6RTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSx3QkFBd0I7QUFDMUI7O0FBRUEsc0JBQXNCO0FBQ3RCO0VBQ0UseUJBQXlCO0VBQ3pCLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsU0FBUztFQUNULGVBQWU7RUFDZixXQUFXO0VBQ1gsZ0JBQWdCO0FBQ2xCOztBQUVBLHNCQUFzQjtBQUN0QjtFQUNFO0lBQ0Usc0JBQXNCO0lBQ3RCLHVCQUF1QjtFQUN6Qjs7RUFFQTtJQUNFLGVBQWU7SUFDZixtQkFBbUI7RUFDckI7O0VBRUE7SUFDRSxzQkFBc0I7RUFDeEI7O0VBRUE7SUFDRSxzQkFBc0I7RUFDeEI7O0VBRUE7SUFDRSxzQkFBc0I7RUFDeEI7O0VBRUE7SUFDRSxXQUFXO0lBQ1gsWUFBWTtJQUNaLGVBQWU7RUFDakI7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5wYWdlLWNvbnRhaW5lciB7XHJcbiAgbWF4LXdpZHRoOiAxMjAwcHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgcGFkZGluZzogMjBweDtcclxufVxyXG5cclxuLmJyZWFkY3J1bWIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxufVxyXG5cclxuLmJyZWFkY3J1bWIgYSB7XHJcbiAgY29sb3I6ICMwYTdhYmY7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG59XHJcblxyXG4uYnJlYWRjcnVtYiAuc2VwYXJhdG9yIHtcclxuICBtYXJnaW46IDAgOHB4O1xyXG4gIGNvbG9yOiAjMGE3YWJmO1xyXG59XHJcblxyXG4uYnJlYWRjcnVtYiAuY3VycmVudCB7XHJcbiAgY29sb3I6ICMwYTdhYmY7XHJcbn1cclxuXHJcbi5jb250ZW50LWNvbnRhaW5lciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgcGFkZGluZzogMzBweDtcclxuICBib3gtc2hhZG93OiAwIDJweCA0cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG59XHJcblxyXG4vKiBMb3R0ZXJ5IEhlYWRlciBTdHlsZXMgKi9cclxuLmxvdHRlcnktaGVhZGVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcclxuICBwYWRkaW5nLWJvdHRvbTogMjBweDtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VlZTtcclxufVxyXG5cclxuLmxvdHRlcnktbG9nbyB7XHJcbiAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xyXG59XHJcblxyXG4ubG90dGVyeS1pbWFnZSB7XHJcbiAgd2lkdGg6IDEyMHB4O1xyXG4gIGhlaWdodDogYXV0bztcclxufVxyXG5cclxuLmxvdHRlcnktdGl0bGUge1xyXG4gIGNvbG9yOiAjMGE3YWJmO1xyXG4gIGZvbnQtc2l6ZTogMzJweDtcclxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4uamFja3BvdC1pbmZvIHtcclxuICBtYXJnaW4tYm90dG9tOiA1cHg7XHJcbn1cclxuXHJcbi5qYWNrcG90LWxhYmVsIHtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbn1cclxuXHJcbi5qYWNrcG90LWFtb3VudCB7XHJcbiAgZm9udC1zaXplOiAyNHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGNvbG9yOiAjZTYzOTQ2O1xyXG59XHJcblxyXG4ubmV4dC1kcmF3LWxhYmVsIHtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbn1cclxuXHJcbi5uZXh0LWRyYXctZGF0ZSB7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbi8qIExvdHRlcnkgRGVzY3JpcHRpb24gU3R5bGVzICovXHJcbi5sb3R0ZXJ5LWRlc2NyaXB0aW9uIHtcclxuICBtYXJnaW4tYm90dG9tOiA0MHB4O1xyXG59XHJcblxyXG4ubG90dGVyeS1kZXNjcmlwdGlvbiBoMiB7XHJcbiAgY29sb3I6ICMwYTdhYmY7XHJcbiAgZm9udC1zaXplOiAyNHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbn1cclxuXHJcbi5sb3R0ZXJ5LWRlc2NyaXB0aW9uIHAge1xyXG4gIGxpbmUtaGVpZ2h0OiAxLjY7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcclxufVxyXG5cclxuLyogUHJlZGljdGlvbiBPcHRpb25zIFN0eWxlcyAqL1xyXG4ucHJlZGljdGlvbi1vcHRpb25zIHtcclxuICBtYXJnaW4tYm90dG9tOiA0MHB4O1xyXG59XHJcblxyXG4ucHJlZGljdGlvbi1vcHRpb25zIGgyIHtcclxuICBjb2xvcjogIzBhN2FiZjtcclxuICBmb250LXNpemU6IDI0cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcclxufVxyXG5cclxuLm9wdGlvbnMtY29udGFpbmVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGdhcDogMzBweDtcclxuICBtYXJnaW4tdG9wOiAyMHB4O1xyXG59XHJcblxyXG4ub3B0aW9uLWNhcmQge1xyXG4gIGZsZXg6IDE7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgcGFkZGluZzogMjBweDtcclxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLCBib3gtc2hhZG93IDAuM3MgZWFzZTtcclxufVxyXG5cclxuLm9wdGlvbi1jYXJkOmhvdmVyIHtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTVweCk7XHJcbiAgYm94LXNoYWRvdzogMCAxMHB4IDIwcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG59XHJcblxyXG4ub3B0aW9uLWNhcmQucHJlbWl1bSB7XHJcbiAgYm9yZGVyLWNvbG9yOiAjZmZkNzAwO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZkZjA7XHJcbn1cclxuXHJcbi5vcHRpb24tY2FyZC5wcmVtaXVtLnBybyB7XHJcbiAgYm9yZGVyLWNvbG9yOiAjMGE3YWJmO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmMGY4ZmY7XHJcbn1cclxuXHJcbi5vcHRpb24tY2FyZC5hY3RpdmUge1xyXG4gIGJvcmRlci1jb2xvcjogIzI4YTc0NTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDQwLCAxNjcsIDY5LCAwLjA1KTtcclxufVxyXG5cclxuLm9wdGlvbi1oZWFkZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcclxuICBwYWRkaW5nLWJvdHRvbTogMTBweDtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VlZTtcclxufVxyXG5cclxuLm9wdGlvbi1oZWFkZXIgaDMge1xyXG4gIGZvbnQtc2l6ZTogMThweDtcclxuICBtYXJnaW46IDA7XHJcbn1cclxuXHJcbi5vcHRpb24tcHJpY2Uge1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGNvbG9yOiAjZTYzOTQ2O1xyXG59XHJcblxyXG4ub3B0aW9uLXByaWNlLmFjdGl2ZSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBhN2FiZiAhaW1wb3J0YW50O1xyXG4gIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xyXG4gIHBhZGRpbmc6IDVweCAxMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2sgIWltcG9ydGFudDtcclxufVxyXG5cclxuLm9wdGlvbi1mZWF0dXJlcyB1bCB7XHJcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xyXG4gIHBhZGRpbmc6IDA7XHJcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxufVxyXG5cclxuLm9wdGlvbi1mZWF0dXJlcyBsaSB7XHJcbiAgcGFkZGluZzogOHB4IDA7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHBhZGRpbmctbGVmdDogMjVweDtcclxufVxyXG5cclxuLm9wdGlvbi1mZWF0dXJlcyBsaTpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6ICfDosKcwpMnO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBsZWZ0OiAwO1xyXG4gIGNvbG9yOiAjMGE3YWJmO1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG4uZ2VuZXJhdGUtYnRuIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBwYWRkaW5nOiAxMnB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwYTdhYmY7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3MgZWFzZTtcclxufVxyXG5cclxuLmdlbmVyYXRlLWJ0bjpob3ZlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzA4NjQ5NDtcclxufVxyXG5cclxuLmdlbmVyYXRlLWJ0bjpkaXNhYmxlZCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NjY2NjYztcclxuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xyXG59XHJcblxyXG4ucHJlbWl1bS1idG4ge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmQ3MDA7XHJcbiAgY29sb3I6ICMzMzM7XHJcbn1cclxuXHJcbi5wcmVtaXVtLWJ0bjpob3ZlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U2YzIwMDtcclxufVxyXG5cclxuLmxvZ2luLXJlcXVpcmVkIHtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgbWFyZ2luLXRvcDogMTBweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgY29sb3I6ICM2NjY7XHJcbn1cclxuXHJcbi5sb2dpbi1yZXF1aXJlZCBhIHtcclxuICBjb2xvcjogIzBhN2FiZjtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbn1cclxuXHJcbi8qIEhvdyBJdCBXb3JrcyBTdHlsZXMgKi9cclxuLmhvdy1pdC13b3JrcyB7XHJcbiAgbWFyZ2luLWJvdHRvbTogNDBweDtcclxufVxyXG5cclxuLmhvdy1pdC13b3JrcyBoMiB7XHJcbiAgY29sb3I6ICMwYTdhYmY7XHJcbiAgZm9udC1zaXplOiAyNHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbn1cclxuXHJcbi5zdGVwcy1jb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZ2FwOiAyMHB4O1xyXG59XHJcblxyXG4uc3RlcCB7XHJcbiAgZmxleDogMTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG59XHJcblxyXG4uc3RlcC1udW1iZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwYTdhYmY7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIHdpZHRoOiAzMHB4O1xyXG4gIGhlaWdodDogMzBweDtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIG1hcmdpbi1yaWdodDogMTVweDtcclxuICBmbGV4LXNocmluazogMDtcclxufVxyXG5cclxuLnN0ZXAtY29udGVudCBoMyB7XHJcbiAgbWFyZ2luLXRvcDogMDtcclxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gIGNvbG9yOiAjMzMzO1xyXG59XHJcblxyXG4uc3RlcC1jb250ZW50IHAge1xyXG4gIG1hcmdpbjogMDtcclxuICBjb2xvcjogIzY2NjtcclxuICBsaW5lLWhlaWdodDogMS41O1xyXG59XHJcblxyXG4vKiBTdGF0aXN0aWNzIFN0eWxlcyAqL1xyXG4uc3RhdGlzdGljcyB7XHJcbiAgbWFyZ2luLWJvdHRvbTogNDBweDtcclxufVxyXG5cclxuLnN0YXRpc3RpY3MgaDIge1xyXG4gIGNvbG9yOiAjMGE3YWJmO1xyXG4gIGZvbnQtc2l6ZTogMjRweDtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG59XHJcblxyXG4uc3RhdHMtY29udGFpbmVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGdhcDogMjBweDtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG59XHJcblxyXG4uc3RhdHMtY2FyZCB7XHJcbiAgZmxleDogMTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBwYWRkaW5nOiAyMHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLnN0YXRzLWNhcmQgaDMge1xyXG4gIG1hcmdpbi10b3A6IDA7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcclxuICBjb2xvcjogIzMzMztcclxuICBmb250LXNpemU6IDE4cHg7XHJcbn1cclxuXHJcbi8qIEVzdGlsb3MgcGFyYSBsb3MgY29udGVuZWRvcmVzIGRlIGJvbGFzIGRlIGxvdGVyw4PCrWEgKi9cclxuLmxvdHRlcnktYmFsbHMtY29udGFpbmVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiAxMHB4O1xyXG4gIGZsZXgtd3JhcDogd3JhcDtcclxuICBtYXJnaW46IDE1cHggMDtcclxufVxyXG5cclxuLmJhbGwtd3JhcHBlciB7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIG1hcmdpbjogNXB4O1xyXG59XHJcblxyXG4ubG90dGVyeS1iYWxscy1zZXBhcmF0b3Ige1xyXG4gIGZvbnQtc2l6ZTogMjRweDtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBtYXJnaW46IDAgMTBweDtcclxuICBjb2xvcjogIzMzMztcclxufVxyXG5cclxuLyogTWFudGVuZXIgbG9zIGVzdGlsb3MgYW50aWd1b3MgcGFyYSBjb21wYXRpYmlsaWRhZCAqL1xyXG4ubnVtYmVyLWJhbGxzIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGdhcDogMTBweDtcclxuICBmbGV4LXdyYXA6IHdyYXA7XHJcbn1cclxuXHJcbi5iYWxsIHtcclxuICB3aWR0aDogNDBweDtcclxuICBoZWlnaHQ6IDQwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwYTdhYmY7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG5cclxuLmNvbXBsZW1lbnRhcnktYmFsbCB7XHJcbiAgd2lkdGg6IDQwcHg7XHJcbiAgaGVpZ2h0OiA0MHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY5ODAwO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbi52aWV3LW1vcmUge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBtYXJnaW4tdG9wOiAyMHB4O1xyXG59XHJcblxyXG4udmlldy1tb3JlLWxpbmsge1xyXG4gIGNvbG9yOiAjMGE3YWJmO1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG5cclxuLnZpZXctbW9yZS1saW5rOmhvdmVyIHtcclxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcclxufVxyXG5cclxuLyogTGFzdCBSZXN1bHRzIFN0eWxlcyAqL1xyXG4ubGFzdC1yZXN1bHRzIHtcclxuICBtYXJnaW4tYm90dG9tOiA0MHB4O1xyXG59XHJcblxyXG4ubGFzdC1yZXN1bHRzIGgyIHtcclxuICBjb2xvcjogIzBhN2FiZjtcclxuICBmb250LXNpemU6IDI0cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxufVxyXG5cclxuLnJlc3VsdC1jYXJkIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBwYWRkaW5nOiAyMHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbn1cclxuXHJcbi5yZXN1bHQtZGF0ZSB7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcclxuICBjb2xvcjogIzMzMztcclxufVxyXG5cclxuLnJlc3VsdC1udW1iZXJzIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDE1cHg7XHJcbn1cclxuXHJcbi8qIEZBUSBTdHlsZXMgKi9cclxuLmZhcS1zZWN0aW9uIHtcclxuICBtYXJnaW4tYm90dG9tOiA0MHB4O1xyXG59XHJcblxyXG4uZmFxLXNlY3Rpb24gaDIge1xyXG4gIGNvbG9yOiAjMGE3YWJmO1xyXG4gIGZvbnQtc2l6ZTogMjRweDtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG59XHJcblxyXG4uZmFxLWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGdhcDogMTVweDtcclxufVxyXG5cclxuLmZhcS1pdGVtIHtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG59XHJcblxyXG4uZmFxLXF1ZXN0aW9uIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHBhZGRpbmc6IDE1cHggMjBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmZhcS1xdWVzdGlvbiBoMyB7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxuICBjb2xvcjogIzMzMztcclxufVxyXG5cclxuLmZhcS10b2dnbGUge1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBjb2xvcjogIzBhN2FiZjtcclxufVxyXG5cclxuLmZhcS1hbnN3ZXIge1xyXG4gIHBhZGRpbmc6IDAgMjBweCAxNXB4O1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuXHJcbi5mYXEtYW5zd2VyIHAge1xyXG4gIG1hcmdpbjogMDtcclxuICBsaW5lLWhlaWdodDogMS42O1xyXG4gIGNvbG9yOiAjNjY2O1xyXG59XHJcblxyXG4vKiBTaG93IGFuc3dlciB3aGVuIHF1ZXN0aW9uIGlzIGNsaWNrZWQgKHRvIGJlIGhhbmRsZWQgd2l0aCBKYXZhU2NyaXB0KSAqL1xyXG4uZmFxLWl0ZW0uYWN0aXZlIC5mYXEtYW5zd2VyIHtcclxuICBkaXNwbGF5OiBibG9jaztcclxufVxyXG5cclxuLmZhcS1pdGVtLmFjdGl2ZSAuZmFxLXRvZ2dsZSB7XHJcbiAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xyXG59XHJcblxyXG4vKiBEaXNjbGFpbWVyIFN0eWxlcyAqL1xyXG4uZGlzY2xhaW1lciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgcGFkZGluZzogMjBweDtcclxuICBtYXJnaW4tdG9wOiA0MHB4O1xyXG59XHJcblxyXG4uZGlzY2xhaW1lciBwIHtcclxuICBtYXJnaW46IDA7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGNvbG9yOiAjNjY2O1xyXG4gIGxpbmUtaGVpZ2h0OiAxLjY7XHJcbn1cclxuXHJcbi8qIFJlc3BvbnNpdmUgU3R5bGVzICovXHJcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gIC5sb3R0ZXJ5LWhlYWRlciB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgfVxyXG5cclxuICAubG90dGVyeS1sb2dvIHtcclxuICAgIG1hcmdpbi1yaWdodDogMDtcclxuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgfVxyXG5cclxuICAub3B0aW9ucy1jb250YWluZXIge1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICB9XHJcblxyXG4gIC5zdGVwcy1jb250YWluZXIge1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICB9XHJcblxyXG4gIC5zdGF0cy1jb250YWluZXIge1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICB9XHJcblxyXG4gIC5iYWxsLCAuY29tcGxlbWVudGFyeS1iYWxsIHtcclxuICAgIHdpZHRoOiAzNXB4O1xyXG4gICAgaGVpZ2h0OiAzNXB4O1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=src_app_pages_primitiva_primitiva_component_ts.js.map