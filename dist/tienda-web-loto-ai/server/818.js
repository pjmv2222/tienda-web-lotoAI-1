"use strict";
exports.id = 818;
exports.ids = [818];
exports.modules = {

/***/ 15818:
/*!**************************************************!*\
  !*** ./src/app/pages/planes/planes.component.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanesComponent: () => (/* binding */ PlanesComponent)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 61504);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 94556);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37100);





const _c0 = () => [1, 2, 3, 4, 5];
function PlanesComponent_div_19_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "M\u00C1S POPULAR");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function PlanesComponent_div_19_li_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "i", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const feature_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", feature_r2, " ");
  }
}
function PlanesComponent_div_19_p_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const plan_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](plan_r3.note);
  }
}
function PlanesComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 29)(1, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, PlanesComponent_div_19_div_2_Template, 2, 0, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h2", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 33)(6, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "p", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 37)(13, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Caracter\u00EDsticas:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, PlanesComponent_div_19_li_16_Template, 3, 1, "li", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 39)(18, "button", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PlanesComponent_div_19_Template_button_click_18_listener() {
      const plan_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r3.selectPlan(plan_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, PlanesComponent_div_19_p_20_Template, 2, 1, "p", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const plan_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("popular", plan_r3.popular);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", plan_r3.popular);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](plan_r3.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", plan_r3.price, "\u20AC");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](plan_r3.period);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](plan_r3.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", plan_r3.features);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("primary-btn", plan_r3.popular);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", plan_r3.buttonText, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", plan_r3.note);
  }
}
function PlanesComponent_div_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 44)(1, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 46)(4, "h3", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "h4", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "p", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ai_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("fas ", ai_r5.icon, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ai_r5.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Especializada en ", ai_r5.lottery, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ai_r5.description);
  }
}
function PlanesComponent_div_113_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 50)(1, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PlanesComponent_div_113_Template_div_click_1_listener() {
      const i_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6).index;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r3.toggleFaq(i_r7));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "+");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 53)(7, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const faq_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("active", faq_r8.active);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](faq_r8.question);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](faq_r8.answer);
  }
}
function PlanesComponent_div_118_i_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "i", 62);
  }
}
function PlanesComponent_div_118_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 54)(1, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, PlanesComponent_div_118_i_2_Template, 1, 0, "i", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 58)(6, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "img", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 61)(9, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const testimonial_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](6, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\"", testimonial_r9.text, "\"");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("alt", testimonial_r9.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", testimonial_r9.avatar, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](testimonial_r9.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](testimonial_r9.plan);
  }
}
let PlanesComponent = /*#__PURE__*/(() => {
  class PlanesComponent {
    constructor(el, router) {
      this.el = el;
      this.router = router;
      this.planes = [{
        id: 'basic',
        name: 'Plan Básico',
        price: 1.22,
        period: 'IVA incluido',
        description: 'Ideal para usuarios que quieren probar nuestro servicio.',
        features: ['1 combinación ganadora para cada uno de los 7 sorteos', 'Predicciones para primeros premios y premios secundarios', 'Válido únicamente para el sorteo inmediato a la fecha de inscripción', 'Acceso a todas nuestras IAs especializadas'],
        buttonText: 'Comenzar ahora',
        note: 'Pago único'
      }, {
        id: 'monthly',
        name: 'Plan Mensual',
        price: 10.22,
        period: 'IVA incluido',
        description: 'Para jugadores habituales que buscan mejorar sus probabilidades.',
        features: ['Hasta 4 combinaciones ganadoras para cada uno de los 7 sorteos', 'Predicciones para primeros premios y premios secundarios', 'Válido para todos los sorteos del mes en curso desde la fecha de inscripción', 'Acceso a todas nuestras IAs especializadas', 'Notificaciones de sorteos'],
        buttonText: 'Suscribirse',
        popular: true
      }, {
        id: 'pro',
        name: 'Plan Pro',
        price: 122,
        period: 'IVA incluido',
        description: 'La mejor opción para jugadores serios que quieren maximizar sus posibilidades.',
        features: ['Combinaciones ganadoras ilimitadas para cada uno de los 7 sorteos', 'Predicciones para primeros premios y premios secundarios', 'Válido durante 365 días desde la fecha de inscripción', 'Acceso prioritario a todas nuestras IAs especializadas', 'Notificaciones personalizadas de sorteos', 'Soporte prioritario 24/7', 'Análisis estadísticos avanzados'],
        buttonText: 'Obtener Pro'
      }];
      this.aiSystems = [{
        name: 'Da Vinci',
        lottery: 'Euromillones',
        description: 'IA especializada en analizar patrones históricos y tendencias estadísticas de Euromillones para generar combinaciones con mayor probabilidad de acierto.',
        icon: 'fa-brain'
      }, {
        name: 'Prognosis',
        lottery: 'La Primitiva',
        description: 'IA entrenada con décadas de resultados de La Primitiva, capaz de identificar secuencias y patrones ocultos para maximizar tus posibilidades.',
        icon: 'fa-chart-line'
      }, {
        name: 'Ástrid',
        lottery: 'El Gordo de la Primitiva',
        description: 'IA especializada en El Gordo de la Primitiva que utiliza algoritmos de aprendizaje profundo para predecir combinaciones con mayor probabilidad estadística.',
        icon: 'fa-robot'
      }, {
        name: 'Sináptica',
        lottery: 'EuroDreams',
        description: 'IA diseñada específicamente para EuroDreams, con capacidad para analizar millones de combinaciones y seleccionar las más prometedoras.',
        icon: 'fa-network-wired'
      }, {
        name: 'Nóvax',
        lottery: 'Lotería Nacional',
        description: 'IA especializada en Lotería Nacional que analiza tendencias históricas de números premiados para identificar patrones y generar predicciones.',
        icon: 'fa-microchip'
      }, {
        name: 'Axioma',
        lottery: 'Lototurf',
        description: 'IA entrenada exclusivamente con datos de Lototurf, capaz de generar combinaciones optimizadas basándose en análisis estadísticos avanzados.',
        icon: 'fa-cogs'
      }, {
        name: 'Fortunata',
        lottery: 'Bonoloto',
        description: 'IA especializada en Bonoloto que utiliza algoritmos de machine learning para identificar patrones y generar combinaciones con mayor probabilidad de premio.',
        icon: 'fa-lightbulb'
      }];
      this.faqs = [{
        question: '¿Cómo funciona la suscripción?',
        answer: 'Nuestras suscripciones se renuevan automáticamente cada mes. Puedes cancelar en cualquier momento desde tu perfil de usuario sin compromiso ni penalización.',
        active: false
      }, {
        question: '¿Puedo cambiar de plan?',
        answer: 'Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se aplicarán inmediatamente y se ajustará el cobro prorrateado.',
        active: false
      }, {
        question: '¿Qué métodos de pago aceptan?',
        answer: 'Aceptamos tarjetas de crédito/débito (Visa, Mastercard, American Express), PayPal y transferencia bancaria.',
        active: false
      }, {
        question: '¿Ofrecen garantía de devolución?',
        answer: 'Sí, ofrecemos una garantía de devolución de 14 días. Si no estás satisfecho con nuestro servicio, puedes solicitar un reembolso completo dentro de los primeros 14 días de tu suscripción.',
        active: false
      }, {
        question: '¿Garantizan que voy a ganar?',
        answer: 'No podemos garantizar premios ya que los sorteos de lotería son juegos de azar. Nuestro sistema mejora las probabilidades estadísticas, pero el resultado final siempre será aleatorio.',
        active: false
      }];
      this.testimonials = [{
        name: 'Carlos G.',
        plan: 'Plan Mensual',
        text: 'Llevo 3 meses usando el plan mensual y ya he recuperado la inversión con varios premios menores. Las predicciones son muy acertadas.',
        avatar: 'assets/img/avatar1.jpg'
      }, {
        name: 'María L.',
        plan: 'Plan Pro',
        text: 'El plan Pro vale cada céntimo. He conseguido un premio importante en Euromillones siguiendo las combinaciones que me recomendó la IA.',
        avatar: 'assets/img/avatar2.jpg'
      }, {
        name: 'Javier R.',
        plan: 'Plan Mensual',
        text: 'Me encanta la interfaz y lo fácil que es generar predicciones. He notado que los números que me sugiere suelen salir con más frecuencia.',
        avatar: 'assets/img/avatar3.jpg'
      }];
    }
    ngOnInit() {
      // Inicialización del componente
    }
    selectPlan(plan) {
      console.log(`Plan seleccionado: ${plan.name}`);
      // Si el plan es gratuito, redirigir directamente a la confirmación
      if (plan.id === 'basic') {
        // Para el plan básico, aunque tiene un precio de 1.22€, podemos decidir si queremos
        // que pase por la pasarela de pago o no. En este caso, lo enviamos a la pasarela.
        this.router.navigate(['/pasarela-pago', plan.id]);
      } else {
        // Para planes de pago, redirigir a la pasarela de pago
        this.router.navigate(['/pasarela-pago', plan.id]);
      }
    }
    toggleFaq(index) {
      this.faqs[index].active = !this.faqs[index].active;
    }
    scrollToPlans() {
      const plansElement = this.el.nativeElement.querySelector('.plans-container');
      if (plansElement) {
        plansElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
    static {
      this.ɵfac = function PlanesComponent_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || PlanesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router));
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: PlanesComponent,
        selectors: [["app-planes"]],
        standalone: true,
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
        decls: 126,
        vars: 4,
        consts: [[1, "page-container"], [1, "breadcrumb"], ["routerLink", "/home"], [1, "fas", "fa-home"], [1, "separator"], ["routerLink", "/home", 1, "link"], [1, "current"], [1, "content-container"], [1, "header"], [1, "title"], [1, "subtitle"], [1, "plans-container"], ["class", "plan-card", 3, "popular", 4, "ngFor", "ngForOf"], [1, "ai-systems"], [1, "ai-intro"], [1, "ai-container"], ["class", "ai-card", 4, "ngFor", "ngForOf"], [1, "comparison-table"], [1, "table-container"], [1, "fas", "fa-check"], [1, "fas", "fa-times"], [1, "faq-section"], [1, "faq-container"], ["class", "faq-item", 3, "active", 4, "ngFor", "ngForOf"], [1, "testimonials"], [1, "testimonials-container"], ["class", "testimonial-card", 4, "ngFor", "ngForOf"], [1, "cta-section"], [1, "cta-btn", 3, "click"], [1, "plan-card"], [1, "plan-header"], ["class", "plan-badge", 4, "ngIf"], [1, "plan-title"], [1, "plan-price"], [1, "price"], [1, "period"], [1, "plan-description"], [1, "plan-features"], [4, "ngFor", "ngForOf"], [1, "plan-footer"], [1, "subscribe-btn", 3, "click"], ["class", "plan-note", 4, "ngIf"], [1, "plan-badge"], [1, "plan-note"], [1, "ai-card"], [1, "ai-icon"], [1, "ai-content"], [1, "ai-name"], [1, "ai-lottery"], [1, "ai-description"], [1, "faq-item"], [1, "faq-question", 3, "click"], [1, "faq-toggle"], [1, "faq-answer"], [1, "testimonial-card"], [1, "testimonial-rating"], ["class", "fas fa-star", 4, "ngFor", "ngForOf"], [1, "testimonial-text"], [1, "testimonial-author"], [1, "testimonial-avatar"], [3, "src", "alt"], [1, "testimonial-info"], [1, "fas", "fa-star"]],
        template: function PlanesComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "a", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "i", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, ">");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "a", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Inicio");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "span", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, ">");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "span", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Planes y Suscripciones");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 7)(13, "div", 8)(14, "h1", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Planes y Suscripciones");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "p", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Elige el plan que mejor se adapte a tus necesidades");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, PlanesComponent_div_19_Template, 21, 12, "div", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 13)(21, "h2");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Nuestras Inteligencias Artificiales Especializadas");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "p", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "Cada una de nuestras IAs ha sido entrenada y especializada en un sorteo espec\u00EDfico para ofrecerte las mejores predicciones posibles.");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](26, PlanesComponent_div_26_Template, 10, 6, "div", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 17)(28, "h2");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "Comparativa de planes");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 18)(31, "table")(32, "thead")(33, "tr")(34, "th");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "Caracter\u00EDstica");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "th");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "Plan B\u00E1sico");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "th");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "Plan Mensual");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "th");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "Plan Pro");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "tbody")(43, "tr")(44, "td");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "Combinaciones por sorteo");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "td");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "1");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "td");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, "Hasta 4");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "td");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51, "Ilimitadas");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "tr")(53, "td");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, "Validez");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "td");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](56, "Pr\u00F3ximo sorteo");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "td");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](58, "Mes en curso");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "td");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](60, "365 d\u00EDas");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "tr")(62, "td");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63, "Acceso a IAs especializadas");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "td");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](65, "i", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "td");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](67, "i", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "td");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](69, "i", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](70, " Prioritario");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "tr")(72, "td");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](73, "Predicciones para premios secundarios");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "td");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](75, "i", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "td");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](77, "i", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "td");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](79, "i", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "tr")(81, "td");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](82, "Notificaciones de sorteos");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "td");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](84, "i", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](85, "td");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](86, "i", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "td");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](88, "i", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](89, " Personalizadas");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "tr")(91, "td");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](92, "An\u00E1lisis estad\u00EDsticos avanzados");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](93, "td");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](94, "i", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](95, "td");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](96, "i", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](97, "td");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](98, "i", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](99, " Premium");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](100, "tr")(101, "td");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](102, "Soporte prioritario 24/7");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](103, "td");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](104, "i", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](105, "td");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](106, "i", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](107, "td");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](108, "i", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](109, "div", 21)(110, "h2");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](111, "Preguntas frecuentes");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](112, "div", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](113, PlanesComponent_div_113_Template, 9, 4, "div", 23);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](114, "div", 24)(115, "h2");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](116, "Lo que dicen nuestros usuarios");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](117, "div", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](118, PlanesComponent_div_118_Template, 13, 7, "div", 26);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](119, "div", 27)(120, "h2");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](121, "Comienza a generar predicciones optimizadas hoy mismo");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](122, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](123, "Elige el plan que mejor se adapte a tus necesidades y aumenta tus probabilidades de ganar.");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](124, "button", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PlanesComponent_Template_button_click_124_listener() {
              return ctx.scrollToPlans();
            });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](125, "Ver planes");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
          }
          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](19);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.planes);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.aiSystems);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](87);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.faqs);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.testimonials);
          }
        },
        dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterLink, _angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf],
        styles: [".page-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n.breadcrumb[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 20px;\n  font-size: 14px;\n}\n\n.breadcrumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  text-decoration: none;\n}\n\n.breadcrumb[_ngcontent-%COMP%]   .separator[_ngcontent-%COMP%] {\n  margin: 0 8px;\n  color: #0a7abf;\n}\n\n.breadcrumb[_ngcontent-%COMP%]   .current[_ngcontent-%COMP%] {\n  color: #0a7abf;\n}\n\n.content-container[_ngcontent-%COMP%] {\n  background-color: #fff;\n  border-radius: 5px;\n  padding: 30px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n\n\n\n.header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 40px;\n}\n\n.title[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 32px;\n  margin-bottom: 10px;\n}\n\n.subtitle[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 18px;\n  max-width: 600px;\n  margin: 0 auto;\n}\n\n\n\n.plans-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 30px;\n  margin-bottom: 60px;\n}\n\n.plan-card[_ngcontent-%COMP%] {\n  flex: 1;\n  max-width: 350px;\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  overflow: hidden;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  position: relative;\n}\n\n.plan-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-10px);\n  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);\n}\n\n.plan-card[_ngcontent-%COMP%]:nth-child(1) {\n  border-color: #0a7abf;\n  box-shadow: 0 10px 20px rgba(10, 122, 191, 0.2);\n}\n\n.plan-card[_ngcontent-%COMP%]:nth-child(2) {\n  border-color: #00BCD4;\n  box-shadow: 0 10px 20px rgba(0, 188, 212, 0.2);\n  background-color: #00BCD4;\n  color: #333;\n}\n\n.plan-card[_ngcontent-%COMP%]:nth-child(2)   .plan-title[_ngcontent-%COMP%], \n.plan-card[_ngcontent-%COMP%]:nth-child(2)   .price[_ngcontent-%COMP%], \n.plan-card[_ngcontent-%COMP%]:nth-child(2)   .period[_ngcontent-%COMP%], \n.plan-card[_ngcontent-%COMP%]:nth-child(2)   .plan-description[_ngcontent-%COMP%], \n.plan-card[_ngcontent-%COMP%]:nth-child(2)   .plan-features[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #333;\n}\n\n.plan-card[_ngcontent-%COMP%]:nth-child(2)   .plan-features[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  border-bottom-color: rgba(0, 0, 0, 0.1);\n  color: #333;\n}\n\n.plan-card[_ngcontent-%COMP%]:nth-child(2)   .plan-features[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #333;\n}\n\n.plan-card[_ngcontent-%COMP%]:nth-child(3) {\n  border-color: #FFE900;\n  box-shadow: 0 10px 20px rgba(255, 233, 0, 0.2);\n  background-color: #FFE900;\n}\n\n.plan-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  background-color: #0a7abf;\n  color: white;\n  font-size: 12px;\n  font-weight: bold;\n  padding: 5px 10px;\n  border-bottom-left-radius: 8px;\n}\n\n.plan-header[_ngcontent-%COMP%] {\n  padding: 30px 20px;\n  text-align: center;\n  background-color: #f9f9f9;\n  border-bottom: 1px solid #eee;\n}\n\n.plan-title[_ngcontent-%COMP%] {\n  font-size: 24px;\n  margin-bottom: 15px;\n  color: #333;\n}\n\n.plan-price[_ngcontent-%COMP%] {\n  margin-bottom: 15px;\n}\n\n.price[_ngcontent-%COMP%] {\n  font-size: 36px;\n  font-weight: bold;\n  color: #0a7abf;\n}\n\n.period[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #666;\n}\n\n.plan-description[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 14px;\n  line-height: 1.5;\n}\n\n.plan-features[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n\n.plan-features[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin-bottom: 15px;\n  color: #333;\n}\n\n.plan-features[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style-type: none;\n  padding: 0;\n  margin: 0;\n}\n\n.plan-features[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 8px 0;\n  border-bottom: 1px solid #eee;\n  display: flex;\n  align-items: center;\n}\n\n.plan-features[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n\n.plan-features[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  margin-right: 10px;\n}\n\n.plan-footer[_ngcontent-%COMP%] {\n  padding: 20px;\n  text-align: center;\n  background-color: #f9f9f9;\n  border-top: 1px solid #eee;\n}\n\n.subscribe-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px;\n  background-color: #0a7abf;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  font-size: 16px;\n  font-weight: bold;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n}\n\n.subscribe-btn[_ngcontent-%COMP%]:hover {\n  background-color: #086494;\n}\n\n.plan-card[_ngcontent-%COMP%]:nth-child(1)   .subscribe-btn[_ngcontent-%COMP%] {\n  background-color: #0a7abf;\n  color: white;\n}\n\n.plan-card[_ngcontent-%COMP%]:nth-child(1)   .subscribe-btn[_ngcontent-%COMP%]:hover {\n  background-color: #086494;\n}\n\n.plan-card[_ngcontent-%COMP%]:nth-child(2)   .subscribe-btn[_ngcontent-%COMP%] {\n  background-color: #333;\n  color: white;\n}\n\n.plan-card[_ngcontent-%COMP%]:nth-child(2)   .subscribe-btn[_ngcontent-%COMP%]:hover {\n  background-color: #444;\n}\n\n.plan-card[_ngcontent-%COMP%]:nth-child(3)   .subscribe-btn[_ngcontent-%COMP%] {\n  background-color: #333;\n  color: #FFE900;\n}\n\n.plan-card[_ngcontent-%COMP%]:nth-child(3)   .subscribe-btn[_ngcontent-%COMP%]:hover {\n  background-color: #444;\n}\n\n.plan-note[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  font-size: 12px;\n  color: #666;\n}\n\n\n\n.ai-systems[_ngcontent-%COMP%] {\n  margin-bottom: 60px;\n  padding: 30px;\n  background-color: #f9f9f9;\n  border-radius: 8px;\n}\n\n.ai-systems[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #0a7abf;\n  font-size: 24px;\n  margin-bottom: 15px;\n}\n\n.ai-intro[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #666;\n  max-width: 800px;\n  margin: 0 auto 30px;\n}\n\n.ai-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 20px;\n  justify-content: center;\n}\n\n.ai-card[_ngcontent-%COMP%] {\n  flex: 0 0 calc(33.333% - 20px);\n  background-color: #fff;\n  border-radius: 8px;\n  padding: 20px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  display: flex;\n  align-items: flex-start;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n\n.ai-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);\n}\n\n.ai-icon[_ngcontent-%COMP%] {\n  font-size: 36px;\n  color: #0a7abf;\n  margin-right: 15px;\n  flex-shrink: 0;\n}\n\n.ai-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.ai-name[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 18px;\n  margin: 0 0 5px 0;\n}\n\n.ai-lottery[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 14px;\n  margin: 0 0 10px 0;\n  font-weight: normal;\n}\n\n.ai-description[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 14px;\n  line-height: 1.5;\n  margin: 0;\n}\n\n\n\n.comparison-table[_ngcontent-%COMP%] {\n  margin-bottom: 60px;\n}\n\n.comparison-table[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #0a7abf;\n  font-size: 24px;\n  margin-bottom: 20px;\n}\n\n.table-container[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n\nth[_ngcontent-%COMP%], td[_ngcontent-%COMP%] {\n  padding: 15px;\n  text-align: center;\n  border-bottom: 1px solid #eee;\n}\n\nth[_ngcontent-%COMP%] {\n  background-color: #f5f5f5;\n  color: #333;\n  font-weight: bold;\n}\n\nth[_ngcontent-%COMP%]:first-child, td[_ngcontent-%COMP%]:first-child {\n  text-align: left;\n}\n\ntr[_ngcontent-%COMP%]:hover {\n  background-color: #f9f9f9;\n}\n\n.fa-check[_ngcontent-%COMP%] {\n  color: #4caf50;\n}\n\n.fa-times[_ngcontent-%COMP%] {\n  color: #f44336;\n}\n\n\n\n.faq-section[_ngcontent-%COMP%] {\n  margin-bottom: 60px;\n}\n\n.faq-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #0a7abf;\n  font-size: 24px;\n  margin-bottom: 20px;\n}\n\n.faq-container[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 0 auto;\n}\n\n.faq-item[_ngcontent-%COMP%] {\n  margin-bottom: 15px;\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  overflow: hidden;\n}\n\n.faq-question[_ngcontent-%COMP%] {\n  padding: 15px 20px;\n  background-color: #f5f5f5;\n  cursor: pointer;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.faq-question[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n  color: #333;\n}\n\n.faq-toggle[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: bold;\n  color: #0a7abf;\n  transition: transform 0.3s ease;\n}\n\n.faq-item.active[_ngcontent-%COMP%]   .faq-toggle[_ngcontent-%COMP%] {\n  transform: rotate(45deg);\n}\n\n.faq-answer[_ngcontent-%COMP%] {\n  padding: 0 20px;\n  max-height: 0;\n  overflow: hidden;\n  transition: max-height 0.3s ease, padding 0.3s ease;\n}\n\n.faq-item.active[_ngcontent-%COMP%]   .faq-answer[_ngcontent-%COMP%] {\n  padding: 15px 20px;\n  max-height: 1000px;\n}\n\n.faq-answer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #666;\n  line-height: 1.6;\n}\n\n\n\n.testimonials[_ngcontent-%COMP%] {\n  margin-bottom: 60px;\n}\n\n.testimonials[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #0a7abf;\n  font-size: 24px;\n  margin-bottom: 20px;\n}\n\n.testimonials-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 30px;\n  overflow-x: auto;\n  padding-bottom: 20px;\n}\n\n.testimonial-card[_ngcontent-%COMP%] {\n  flex: 0 0 350px;\n  background-color: #f9f9f9;\n  border-radius: 8px;\n  padding: 20px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n\n.testimonial-rating[_ngcontent-%COMP%] {\n  color: #ffd700;\n  margin-bottom: 15px;\n}\n\n.testimonial-text[_ngcontent-%COMP%] {\n  font-style: italic;\n  color: #666;\n  margin-bottom: 15px;\n  line-height: 1.6;\n}\n\n.testimonial-author[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n\n.testimonial-avatar[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n  overflow: hidden;\n  margin-right: 15px;\n}\n\n.testimonial-avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n.testimonial-info[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 5px 0;\n  color: #333;\n}\n\n.testimonial-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #666;\n  font-size: 14px;\n}\n\n\n\n.cta-section[_ngcontent-%COMP%] {\n  text-align: center;\n  background-color: #f5f5f5;\n  padding: 40px;\n  border-radius: 8px;\n  margin-top: 60px;\n}\n\n.cta-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 24px;\n  margin-bottom: 15px;\n}\n\n.cta-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #666;\n  margin-bottom: 20px;\n  max-width: 600px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.cta-btn[_ngcontent-%COMP%] {\n  padding: 12px 30px;\n  background-color: #0a7abf;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  font-size: 16px;\n  font-weight: bold;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n}\n\n.cta-btn[_ngcontent-%COMP%]:hover {\n  background-color: #086494;\n}\n\n\n\n@media (max-width: 992px) {\n  .plans-container[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n\n  .plan-card[_ngcontent-%COMP%] {\n    flex: 0 0 calc(50% - 15px);\n    max-width: calc(50% - 15px);\n  }\n\n  .ai-card[_ngcontent-%COMP%] {\n    flex: 0 0 calc(50% - 15px);\n  }\n}\n\n@media (max-width: 768px) {\n  .plans-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: center;\n  }\n\n  .plan-card[_ngcontent-%COMP%] {\n    flex: 0 0 100%;\n    max-width: 100%;\n    margin-bottom: 30px;\n  }\n\n  .ai-card[_ngcontent-%COMP%] {\n    flex: 0 0 100%;\n    margin-bottom: 15px;\n  }\n\n  .testimonials-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .testimonial-card[_ngcontent-%COMP%] {\n    flex: 0 0 100%;\n    margin-bottom: 20px;\n  }\n\n  th[_ngcontent-%COMP%], td[_ngcontent-%COMP%] {\n    padding: 10px;\n    font-size: 14px;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvcGxhbmVzL3BsYW5lcy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaUJBQWlCO0VBQ2pCLGNBQWM7RUFDZCxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsY0FBYztFQUNkLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLHdDQUF3QztBQUMxQzs7QUFFQSxrQkFBa0I7QUFDbEI7RUFDRSxrQkFBa0I7RUFDbEIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsY0FBYztFQUNkLGVBQWU7RUFDZixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixjQUFjO0FBQ2hCOztBQUVBLDJCQUEyQjtBQUMzQjtFQUNFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsU0FBUztFQUNULG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLE9BQU87RUFDUCxnQkFBZ0I7RUFDaEIsc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIscURBQXFEO0VBQ3JELGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLDRCQUE0QjtFQUM1QiwwQ0FBMEM7QUFDNUM7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsK0NBQStDO0FBQ2pEOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLDhDQUE4QztFQUM5Qyx5QkFBeUI7RUFDekIsV0FBVztBQUNiOztBQUVBOzs7OztFQUtFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLHVDQUF1QztFQUN2QyxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxxQkFB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QUNmLG1CQUFtQjtFQUNyQjs7RUFFQTtJQUNFLGNBQWM7SUFDZCxtQkFBbUI7RUFDckI7O0VBRUE7SUFDRSxzQkFBc0I7RUFDeEI7O0VBRUE7SUFDRSxjQUFjO0lBQ2QsbUJBQW1CO0VBQ3JCOztFQUVBO0lBQ0UsYUFBYTtJQUNiLGVBQWU7RUFDakI7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5wYWdlLWNvbnRhaW5lciB7XHJcbiAgbWF4LXdpZHRoOiAxMjAwcHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgcGFkZGluZzogMjBweDtcclxufVxyXG5cclxuLmJyZWFkY3J1bWIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxufVxyXG5cclxuLmJyZWFkY3J1bWIgYSB7XHJcbiAgY29sb3I6ICMwYTdhYmY7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG59XHJcblxyXG4uYnJlYWRjcnVtYiAuc2VwYXJhdG9yIHtcclxuICBtYXJnaW46IDAgOHB4O1xyXG4gIGNvbG9yOiAjMGE3YWJmO1xyXG59XHJcblxyXG4uYnJlYWRjcnVtYiAuY3VycmVudCB7XHJcbiAgY29sb3I6ICMwYTdhYmY7XHJcbn1cclxuXHJcbi5jb250ZW50LWNvbnRhaW5lciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgcGFkZGluZzogMzBweDtcclxuICBib3gtc2hhZG93OiAwIDJweCA0cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG59XHJcblxyXG4vKiBIZWFkZXIgU3R5bGVzICovXHJcbi5oZWFkZXIge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiA0MHB4O1xyXG59XHJcblxyXG4udGl0bGUge1xyXG4gIGNvbG9yOiAjMGE3YWJmO1xyXG4gIGZvbnQtc2l6ZTogMzJweDtcclxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4uc3VidGl0bGUge1xyXG4gIGNvbG9yOiAjNjY2O1xyXG4gIGZvbnQtc2l6ZTogMThweDtcclxuICBtYXgtd2lkdGg6IDYwMHB4O1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG59XHJcblxyXG4vKiBQbGFucyBDb250YWluZXIgU3R5bGVzICovXHJcbi5wbGFucy1jb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgZ2FwOiAzMHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDYwcHg7XHJcbn1cclxuXHJcbi5wbGFuLWNhcmQge1xyXG4gIGZsZXg6IDE7XHJcbiAgbWF4LXdpZHRoOiAzNTBweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UsIGJveC1zaGFkb3cgMC4zcyBlYXNlO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG5cclxuLnBsYW4tY2FyZDpob3ZlciB7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMHB4KTtcclxuICBib3gtc2hhZG93OiAwIDE1cHggMzBweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbn1cclxuXHJcbi5wbGFuLWNhcmQ6bnRoLWNoaWxkKDEpIHtcclxuICBib3JkZXItY29sb3I6ICMwYTdhYmY7XHJcbiAgYm94LXNoYWRvdzogMCAxMHB4IDIwcHggcmdiYSgxMCwgMTIyLCAxOTEsIDAuMik7XHJcbn1cclxuXHJcbi5wbGFuLWNhcmQ6bnRoLWNoaWxkKDIpIHtcclxuICBib3JkZXItY29sb3I6ICMwMEJDRDQ7XHJcbiAgYm94LXNoYWRvdzogMCAxMHB4IDIwcHggcmdiYSgwLCAxODgsIDIxMiwgMC4yKTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBCQ0Q0O1xyXG4gIGNvbG9yOiAjMzMzO1xyXG59XHJcblxyXG4ucGxhbi1jYXJkOm50aC1jaGlsZCgyKSAucGxhbi10aXRsZSxcclxuLnBsYW4tY2FyZDpudGgtY2hpbGQoMikgLnByaWNlLFxyXG4ucGxhbi1jYXJkOm50aC1jaGlsZCgyKSAucGVyaW9kLFxyXG4ucGxhbi1jYXJkOm50aC1jaGlsZCgyKSAucGxhbi1kZXNjcmlwdGlvbixcclxuLnBsYW4tY2FyZDpudGgtY2hpbGQoMikgLnBsYW4tZmVhdHVyZXMgaDMge1xyXG4gIGNvbG9yOiAjMzMzO1xyXG59XHJcblxyXG4ucGxhbi1jYXJkOm50aC1jaGlsZCgyKSAucGxhbi1mZWF0dXJlcyBsaSB7XHJcbiAgYm9yZGVyLWJvdHRvbS1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gIGNvbG9yOiAjMzMzO1xyXG59XHJcblxyXG4ucGxhbi1jYXJkOm50aC1jaGlsZCgyKSAucGxhbi1mZWF0dXJlcyBpIHtcclxuICBjb2xvcjogIzMzMztcclxufVxyXG5cclxuLnBsYW4tY2FyZDpudGgtY2hpbGQoMykge1xyXG4gIGJvcmRlci1jb2xvcjogI0ZGRTkwMDtcclxuICBib3gtc2hhZG93OiAwIDEwcHggMjBweCByZ2JhKDI1NSwgMjMzLCAwLCAwLjIpO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNGRkU5MDA7XHJcbn1cclxuXHJcbi5wbGFuLWJhZGdlIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwYTdhYmY7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBwYWRkaW5nOiA1cHggMTBweDtcclxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiA4cHg7XHJcbn1cclxuXHJcbi5wbGFuLWhlYWRlciB7XHJcbiAgcGFkZGluZzogMzBweCAyMHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWVlO1xyXG59XHJcblxyXG4ucGxhbi10aXRsZSB7XHJcbiAgZm9udC1zaXplOiAyNHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbiAgY29sb3I6ICMzMzM7XHJcbn1cclxuXHJcbi5wbGFuLXByaWNlIHtcclxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xyXG59XHJcblxyXG4ucHJpY2Uge1xyXG4gIGZvbnQtc2l6ZTogMzZweDtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBjb2xvcjogIzBhN2FiZjtcclxufVxyXG5cclxuLnBlcmlvZCB7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGNvbG9yOiAjNjY2O1xyXG59XHJcblxyXG4ucGxhbi1kZXNjcmlwdGlvbiB7XHJcbiAgY29sb3I6ICM2NjY7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XHJcbn1cclxuXHJcbi5wbGFuLWZlYXR1cmVzIHtcclxuICBwYWRkaW5nOiAyMHB4O1xyXG59XHJcblxyXG4ucGxhbi1mZWF0dXJlcyBoMyB7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbiAgY29sb3I6ICMzMzM7XHJcbn1cclxuXHJcbi5wbGFuLWZlYXR1cmVzIHVsIHtcclxuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XHJcbiAgcGFkZGluZzogMDtcclxuICBtYXJnaW46IDA7XHJcbn1cclxuXHJcbi5wbGFuLWZlYXR1cmVzIGxpIHtcclxuICBwYWRkaW5nOiA4cHggMDtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VlZTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5wbGFuLWZlYXR1cmVzIGxpOmxhc3QtY2hpbGQge1xyXG4gIGJvcmRlci1ib3R0b206IG5vbmU7XHJcbn1cclxuXHJcbi5wbGFuLWZlYXR1cmVzIGkge1xyXG4gIGNvbG9yOiAjMGE3YWJmO1xyXG4gIG1hcmdpbi1yaWdodDogMTBweDtcclxufVxyXG5cclxuLnBsYW4tZm9vdGVyIHtcclxuICBwYWRkaW5nOiAyMHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xyXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZWVlO1xyXG59XHJcblxyXG4uc3Vic2NyaWJlLWJ0biB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgcGFkZGluZzogMTJweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGE3YWJmO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjNzIGVhc2U7XHJcbn1cclxuXHJcbi5zdWJzY3JpYmUtYnRuOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDg2NDk0O1xyXG59XHJcblxyXG4ucGxhbi1jYXJkOm50aC1jaGlsZCgxKSAuc3Vic2NyaWJlLWJ0biB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBhN2FiZjtcclxuICBjb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbi5wbGFuLWNhcmQ6bnRoLWNoaWxkKDEpIC5zdWJzY3JpYmUtYnRuOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDg2NDk0O1xyXG59XHJcblxyXG4ucGxhbi1jYXJkOm50aC1jaGlsZCgyKSAuc3Vic2NyaWJlLWJ0biB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzMzMztcclxuICBjb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbi5wbGFuLWNhcmQ6bnRoLWNoaWxkKDIpIC5zdWJzY3JpYmUtYnRuOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDQ0O1xyXG59XHJcblxyXG4ucGxhbi1jYXJkOm50aC1jaGlsZCgzKSAuc3Vic2NyaWJlLWJ0biB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzMzMztcclxuICBjb2xvcjogI0ZGRTkwMDtcclxufVxyXG5cclxuLnBsYW4tY2FyZDpudGgtY2hpbGQoMykgLnN1YnNjcmliZS1idG46aG92ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICM0NDQ7XHJcbn1cclxuXHJcbi5wbGFuLW5vdGUge1xyXG4gIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIGNvbG9yOiAjNjY2O1xyXG59XHJcblxyXG4vKiBBSSBTeXN0ZW1zIFN0eWxlcyAqL1xyXG4uYWktc3lzdGVtcyB7XHJcbiAgbWFyZ2luLWJvdHRvbTogNjBweDtcclxuICBwYWRkaW5nOiAzMHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7XHJcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG59XHJcblxyXG4uYWktc3lzdGVtcyBoMiB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGNvbG9yOiAjMGE3YWJmO1xyXG4gIGZvbnQtc2l6ZTogMjRweDtcclxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xyXG59XHJcblxyXG4uYWktaW50cm8ge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBjb2xvcjogIzY2NjtcclxuICBtYXgtd2lkdGg6IDgwMHB4O1xyXG4gIG1hcmdpbjogMCBhdXRvIDMwcHg7XHJcbn1cclxuXHJcbi5haS1jb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC13cmFwOiB3cmFwO1xyXG4gIGdhcDogMjBweDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuLmFpLWNhcmQge1xyXG4gIGZsZXg6IDAgMCBjYWxjKDMzLjMzMyUgLSAyMHB4KTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBwYWRkaW5nOiAyMHB4O1xyXG4gIGJveC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLCBib3gtc2hhZG93IDAuM3MgZWFzZTtcclxufVxyXG5cclxuLmFpLWNhcmQ6aG92ZXIge1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNXB4KTtcclxuICBib3gtc2hhZG93OiAwIDEwcHggMjBweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbn1cclxuXHJcbi5haS1pY29uIHtcclxuICBmb250LXNpemU6IDM2cHg7XHJcbiAgY29sb3I6ICMwYTdhYmY7XHJcbiAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xyXG4gIGZsZXgtc2hyaW5rOiAwO1xyXG59XHJcblxyXG4uYWktY29udGVudCB7XHJcbiAgZmxleDogMTtcclxufVxyXG5cclxuLmFpLW5hbWUge1xyXG4gIGNvbG9yOiAjMGE3YWJmO1xyXG4gIGZvbnQtc2l6ZTogMThweDtcclxuICBtYXJnaW46IDAgMCA1cHggMDtcclxufVxyXG5cclxuLmFpLWxvdHRlcnkge1xyXG4gIGNvbG9yOiAjNjY2O1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBtYXJnaW46IDAgMCAxMHB4IDA7XHJcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxufVxyXG5cclxuLmFpLWRlc2NyaXB0aW9uIHtcclxuICBjb2xvcjogIzY2NjtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgbGluZS1oZWlnaHQ6IDEuNTtcclxuICBtYXJnaW46IDA7XHJcbn1cclxuXHJcbi8qIENvbXBhcmlzb24gVGFibGUgU3R5bGVzICovXHJcbi5jb21wYXJpc29uLXRhYmxlIHtcclxuICBtYXJnaW4tYm90dG9tOiA2MHB4O1xyXG59XHJcblxyXG4uY29tcGFyaXNvbi10YWJsZSBoMiB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGNvbG9yOiAjMGE3YWJmO1xyXG4gIGZvbnQtc2l6ZTogMjRweDtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG59XHJcblxyXG4udGFibGUtY29udGFpbmVyIHtcclxuICBvdmVyZmxvdy14OiBhdXRvO1xyXG59XHJcblxyXG50YWJsZSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcclxufVxyXG5cclxudGgsIHRkIHtcclxuICBwYWRkaW5nOiAxNXB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VlZTtcclxufVxyXG5cclxudGgge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XHJcbiAgY29sb3I6ICMzMzM7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbnRoOmZpcnN0LWNoaWxkLCB0ZDpmaXJzdC1jaGlsZCB7XHJcbiAgdGV4dC1hbGlnbjogbGVmdDtcclxufVxyXG5cclxudHI6aG92ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7XHJcbn1cclxuXHJcbi5mYS1jaGVjayB7XHJcbiAgY29sb3I6ICM0Y2FmNTA7XHJcbn1cclxuXHJcbi5mYS10aW1lcyB7XHJcbiAgY29sb3I6ICNmNDQzMzY7XHJcbn1cclxuXHJcbi8qIEZBUSBTdHlsZXMgKi9cclxuLmZhcS1zZWN0aW9uIHtcclxuICBtYXJnaW4tYm90dG9tOiA2MHB4O1xyXG59XHJcblxyXG4uZmFxLXNlY3Rpb24gaDIge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBjb2xvcjogIzBhN2FiZjtcclxuICBmb250LXNpemU6IDI0cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxufVxyXG5cclxuLmZhcS1jb250YWluZXIge1xyXG4gIG1heC13aWR0aDogODAwcHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbn1cclxuXHJcbi5mYXEtaXRlbSB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG59XHJcblxyXG4uZmFxLXF1ZXN0aW9uIHtcclxuICBwYWRkaW5nOiAxNXB4IDIwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuLmZhcS1xdWVzdGlvbiBoMyB7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxuICBjb2xvcjogIzMzMztcclxufVxyXG5cclxuLmZhcS10b2dnbGUge1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBjb2xvcjogIzBhN2FiZjtcclxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xyXG59XHJcblxyXG4uZmFxLWl0ZW0uYWN0aXZlIC5mYXEtdG9nZ2xlIHtcclxuICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XHJcbn1cclxuXHJcbi5mYXEtYW5zd2VyIHtcclxuICBwYWRkaW5nOiAwIDIwcHg7XHJcbiAgbWF4LWhlaWdodDogMDtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIHRyYW5zaXRpb246IG1heC1oZWlnaHQgMC4zcyBlYXNlLCBwYWRkaW5nIDAuM3MgZWFzZTtcclxufVxyXG5cclxuLmZhcS1pdGVtLmFjdGl2ZSAuZmFxLWFuc3dlciB7XHJcbiAgcGFkZGluZzogMTVweCAyMHB4O1xyXG4gIG1heC1oZWlnaHQ6IDEwMDBweDtcclxufVxyXG5cclxuLmZhcS1hbnN3ZXIgcCB7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGNvbG9yOiAjNjY2O1xyXG4gIGxpbmUtaGVpZ2h0OiAxLjY7XHJcbn1cclxuXHJcbi8qIFRlc3RpbW9uaWFscyBTdHlsZXMgKi9cclxuLnRlc3RpbW9uaWFscyB7XHJcbiAgbWFyZ2luLWJvdHRvbTogNjBweDtcclxufVxyXG5cclxuLnRlc3RpbW9uaWFscyBoMiB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGNvbG9yOiAjMGE3YWJmO1xyXG4gIGZvbnQtc2l6ZTogMjRweDtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG59XHJcblxyXG4udGVzdGltb25pYWxzLWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBnYXA6IDMwcHg7XHJcbiAgb3ZlcmZsb3cteDogYXV0bztcclxuICBwYWRkaW5nLWJvdHRvbTogMjBweDtcclxufVxyXG5cclxuLnRlc3RpbW9uaWFsLWNhcmQge1xyXG4gIGZsZXg6IDAgMCAzNTBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBwYWRkaW5nOiAyMHB4O1xyXG4gIGJveC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbn1cclxuXHJcbi50ZXN0aW1vbmlhbC1yYXRpbmcge1xyXG4gIGNvbG9yOiAjZmZkNzAwO1xyXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbn1cclxuXHJcbi50ZXN0aW1vbmlhbC10ZXh0IHtcclxuICBmb250LXN0eWxlOiBpdGFsaWM7XHJcbiAgY29sb3I6ICM2NjY7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcclxuICBsaW5lLWhlaWdodDogMS42O1xyXG59XHJcblxyXG4udGVzdGltb25pYWwtYXV0aG9yIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi50ZXN0aW1vbmlhbC1hdmF0YXIge1xyXG4gIHdpZHRoOiA1MHB4O1xyXG4gIGhlaWdodDogNTBweDtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XHJcbn1cclxuXHJcbi50ZXN0aW1vbmlhbC1hdmF0YXIgaW1nIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgb2JqZWN0LWZpdDogY292ZXI7XHJcbn1cclxuXHJcbi50ZXN0aW1vbmlhbC1pbmZvIGg0IHtcclxuICBtYXJnaW46IDAgMCA1cHggMDtcclxuICBjb2xvcjogIzMzMztcclxufVxyXG5cclxuLnRlc3RpbW9uaWFsLWluZm8gcCB7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGNvbG9yOiAjNjY2O1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxufVxyXG5cclxuLyogQ1RBIFNlY3Rpb24gU3R5bGVzICovXHJcbi5jdGEtc2VjdGlvbiB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XHJcbiAgcGFkZGluZzogNDBweDtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgbWFyZ2luLXRvcDogNjBweDtcclxufVxyXG5cclxuLmN0YS1zZWN0aW9uIGgyIHtcclxuICBjb2xvcjogIzBhN2FiZjtcclxuICBmb250LXNpemU6IDI0cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcclxufVxyXG5cclxuLmN0YS1zZWN0aW9uIHAge1xyXG4gIGNvbG9yOiAjNjY2O1xyXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgbWF4LXdpZHRoOiA2MDBweDtcclxuICBtYXJnaW4tbGVmdDogYXV0bztcclxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XHJcbn1cclxuXHJcbi5jdGEtYnRuIHtcclxuICBwYWRkaW5nOiAxMnB4IDMwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBhN2FiZjtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcyBlYXNlO1xyXG59XHJcblxyXG4uY3RhLWJ0bjpob3ZlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzA4NjQ5NDtcclxufVxyXG5cclxuLyogUmVzcG9uc2l2ZSBTdHlsZXMgKi9cclxuQG1lZGlhIChtYXgtd2lkdGg6IDk5MnB4KSB7XHJcbiAgLnBsYW5zLWNvbnRhaW5lciB7XHJcbiAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgfVxyXG5cclxuICAucGxhbi1jYXJkIHtcclxuICAgIGZsZXg6IDAgMCBjYWxjKDUwJSAtIDE1cHgpO1xyXG4gICAgbWF4LXdpZHRoOiBjYWxjKDUwJSAtIDE1cHgpO1xyXG4gIH1cclxuXHJcbiAgLmFpLWNhcmQge1xyXG4gICAgZmxleDogMCAwIGNhbGMoNTAlIC0gMTVweCk7XHJcbiAgfVxyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAucGxhbnMtY29udGFpbmVyIHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIH1cclxuXHJcbiAgLnBsYW4tY2FyZCB7XHJcbiAgICBmbGV4OiAwIDAgMTAwJTtcclxuICAgIG1heC13aWR0aDogMTAwJTtcclxuICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XHJcbiAgfVxyXG5cclxuICAuYWktY2FyZCB7XHJcbiAgICBmbGV4OiAwIDAgMTAwJTtcclxuICAgIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbiAgfVxyXG5cclxuICAudGVzdGltb25pYWxzLWNvbnRhaW5lciB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIH1cclxuXHJcbiAgLnRlc3RpbW9uaWFsLWNhcmQge1xyXG4gICAgZmxleDogMCAwIDEwMCU7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gIH1cclxuXHJcbiAgdGgsIHRkIHtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
      });
    }
  }
  return PlanesComponent;
})();

/***/ })

};
;
//# sourceMappingURL=818.js.map