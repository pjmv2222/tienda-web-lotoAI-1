"use strict";
exports.id = 942;
exports.ids = [942];
exports.modules = {

/***/ 54942:
/*!**********************************************!*\
  !*** ./src/app/pages/home/home.component.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomeComponent: () => (/* binding */ HomeComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37100);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 94556);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 61504);
/* harmony import */ var ngx_bootstrap_carousel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-bootstrap/carousel */ 54635);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/auth.service */ 28617);









function HomeComponent_section_0_slide_3_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "img", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const slide_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("src", slide_r1.src, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"])("alt", slide_r1.alt);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](slide_r1.alt);
  }
}
function HomeComponent_section_0_slide_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "slide")(1, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, HomeComponent_section_0_slide_3_div_2_Template, 4, 3, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const group_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", group_r2);
  }
}
function HomeComponent_section_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "section", 35)(1, "div", 36)(2, "carousel", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, HomeComponent_section_0_slide_3_Template, 3, 1, "slide", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("noPause", false)("noWrap", ctx_r2.noWrapSlides)("showIndicators", ctx_r2.showIndicators)("interval", ctx_r2.interval);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r2.imageGroups);
  }
}
function HomeComponent_section_1_img_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "img", 42);
  }
  if (rf & 2) {
    const slide_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("src", slide_r4.src, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"])("alt", slide_r4.alt);
  }
}
function HomeComponent_section_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "section", 35)(1, "div", 36)(2, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, HomeComponent_section_1_img_3_Template, 1, 2, "img", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r2.sliderImages.slice(0, 4));
  }
}
function HomeComponent_div_169_div_3_li_4_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const sub_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"](" ", sub_r5.tipo, " - V\u00E1lida hasta: ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](2, 2, sub_r5.fechaFin, "dd/MM/yyyy"), " ");
  }
}
function HomeComponent_div_169_div_3_li_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, HomeComponent_div_169_div_3_li_4_span_1_Template, 3, 5, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const sub_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", sub_r5.activa);
  }
}
function HomeComponent_div_169_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div")(1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Tus suscripciones activas:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, HomeComponent_div_169_div_3_li_4_Template, 2, 1, "li", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r2.currentUser.subscriptions);
  }
}
function HomeComponent_div_169_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div")(1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "No tienes suscripciones activas.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Adquirir una suscripci\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
function HomeComponent_div_169_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 46)(1, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, HomeComponent_div_169_div_3_Template, 5, 1, "div", 47)(4, HomeComponent_div_169_div_4_Template, 5, 0, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("Estimado ", ctx_r2.currentUser.nombre, " ", ctx_r2.currentUser.apellido, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r2.hasSubscriptions && (ctx_r2.currentUser.subscriptions == null ? null : ctx_r2.currentUser.subscriptions.length));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r2.hasSubscriptions || !(ctx_r2.currentUser.subscriptions == null ? null : ctx_r2.currentUser.subscriptions.length));
  }
}
function HomeComponent_div_170_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 49)(1, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "\u00BFYa est\u00E1s listo para empezar?");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Inicia sesi\u00F3n para ver tus pron\u00F3sticos personalizados o reg\u00EDstrate para comenzar a utilizar nuestro servicio.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 50)(6, "button", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Iniciar sesi\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "button", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Registrarse");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
}
let HomeComponent = /*#__PURE__*/(() => {
  class HomeComponent {
    constructor(authService, platformId) {
      this.authService = authService;
      this.platformId = platformId;
      this.currentUser = null;
      this.hasSubscriptions = false;
      this.authSubscription = null;
      // Imágenes para el slider con títulos descriptivos
      this.sliderImages = [{
        src: 'assets/img/slider/descarga.jfif',
        alt: 'Inteligencia Artificial para Loterías'
      }, {
        src: 'assets/img/slider/descarga (1).jfif',
        alt: 'Predicciones basadas en datos'
      }, {
        src: 'assets/img/slider/descarga (2).jfif',
        alt: 'Algoritmos avanzados de análisis'
      }, {
        src: 'assets/img/slider/descarga (3).jfif',
        alt: 'Combinaciones optimizadas'
      }, {
        src: 'assets/img/slider/descarga (4).jfif',
        alt: 'Estadísticas en tiempo real'
      }, {
        src: 'assets/img/slider/descarga (5).jfif',
        alt: 'Tecnología de vanguardia'
      }, {
        src: 'assets/img/slider/descarga (6).jfif',
        alt: 'Análisis predictivo'
      }, {
        src: 'assets/img/slider/descarga (7).jfif',
        alt: 'Resultados personalizados'
      }];
      // Grupos de imágenes para mostrar 4 por slide
      this.imageGroups = [];
      // Configuración del slider mejorada
      this.noWrapSlides = false; // Permite que el carrusel vuelva al principio
      this.showIndicators = true; // Muestra los indicadores de posición
      this.interval = 5000; // Intervalo de cambio de grupo de imágenes (5 segundos)
      this.isBrowser = (0,_angular_common__WEBPACK_IMPORTED_MODULE_2__.isPlatformBrowser)(this.platformId);
    }
    ngOnInit() {
      // Agrupar imágenes en grupos de 4 para el carrusel
      this.createImageGroups();
      // Verificar si el servicio de autenticación está disponible
      if (this.authService && this.authService.currentUser) {
        // Suscribirse al usuario actual
        this.authSubscription = this.authService.currentUser.subscribe({
          next: user => {
            this.currentUser = user;
            // Verificar si el usuario existe y tiene suscripciones de forma segura
            this.hasSubscriptions = !!this.currentUser?.subscriptions?.length;
            if (this.currentUser?.subscriptions) {
              console.log('Suscripciones del usuario:', this.currentUser.subscriptions);
            } else {
              console.log('El usuario no tiene suscripciones activas');
            }
          },
          error: error => {
            console.error('Error al obtener el usuario actual:', error);
          }
        });
      } else {
        console.warn('El servicio de autenticación no está disponible');
      }
    }
    ngOnDestroy() {
      // Cancelar la suscripción para evitar memory leaks
      if (this.authSubscription) {
        this.authSubscription.unsubscribe();
      }
    }
    /**
     * Agrupa las imágenes en grupos de 4 para mostrarlas en el carrusel
     */
    createImageGroups() {
      const imagesPerGroup = 4; // Número de imágenes por grupo
      this.imageGroups = [];
      // Crear grupos de 4 imágenes
      for (let i = 0; i < this.sliderImages.length; i += imagesPerGroup) {
        const group = this.sliderImages.slice(i, i + imagesPerGroup);
        // Si el grupo tiene menos de 4 imágenes, completar con las primeras imágenes
        if (group.length < imagesPerGroup) {
          const remaining = imagesPerGroup - group.length;
          const additionalImages = this.sliderImages.slice(0, remaining);
          this.imageGroups.push([...group, ...additionalImages]);
        } else {
          this.imageGroups.push(group);
        }
      }
    }
    static {
      this.ɵfac = function HomeComponent_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || HomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.PLATFORM_ID));
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: HomeComponent,
        selectors: [["app-home"]],
        standalone: true,
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
        decls: 171,
        vars: 4,
        consts: [["class", "slider-section", 4, "ngIf"], [1, "home-container"], [1, "hero-section"], [1, "hero-content"], ["routerLink", "/planes", 1, "cta-button"], [1, "section"], [1, "section-title"], [1, "section-content"], [1, "section", 2, "background-color", "#f9f9f9"], [1, "ai-team-container"], [1, "ai-card", "ai-euromillones"], [1, "ai-card-header"], [1, "ai-name"], [1, "ai-specialty"], [1, "ai-card-body"], [1, "ai-description"], [1, "ai-card", "ai-primitiva"], [1, "ai-card", "ai-bonoloto"], [1, "ai-card", "ai-gordo"], [1, "ai-card", "ai-eurodreams"], [1, "ai-card", "ai-lototurf"], [1, "ai-card", "ai-loteria-nacional"], [1, "plans-container"], [1, "plan-card"], [1, "plan-header"], [1, "plan-name"], [1, "plan-price"], [1, "plan-period"], [1, "plan-features"], [1, "plan-cta"], ["routerLink", "/pasarela-pago/basic", 1, "cta-button"], ["routerLink", "/pasarela-pago/monthly", 1, "cta-button"], ["routerLink", "/pasarela-pago/pro", 1, "cta-button"], ["class", "user-section", 4, "ngIf"], ["class", "user-section", "style", "text-align: center;", 4, "ngIf"], [1, "slider-section"], [1, "carousel-container"], [3, "noPause", "noWrap", "showIndicators", "interval"], [4, "ngFor", "ngForOf"], [1, "multi-image-container"], ["class", "image-item", 4, "ngFor", "ngForOf"], [1, "image-item"], [1, "slider-image", 3, "src", "alt"], [1, "image-title"], [1, "static-image"], ["class", "slider-image", 3, "src", "alt", 4, "ngFor", "ngForOf"], [1, "user-section"], [4, "ngIf"], ["routerLink", "/planes", 1, "btn-primary"], [1, "user-section", 2, "text-align", "center"], [2, "margin-top", "2rem"], ["routerLink", "/auth/login", 1, "btn-primary"], ["routerLink", "/auth/register", 1, "btn-secondary"]],
        template: function HomeComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, HomeComponent_section_0_Template, 4, 5, "section", 0)(1, HomeComponent_section_1_Template, 4, 1, "section", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 1)(3, "section", 2)(4, "div", 3)(5, "h1");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "La Revoluci\u00F3n de los Pron\u00F3sticos con Inteligencia Artificial");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "\u00BFCansado de elegir n\u00FAmeros al azar? Bienvenido a LOTO IA.COM, la plataforma donde la Inteligencia Artificial de vanguardia trabaja para ti. Analizamos d\u00E9cadas de resultados hist\u00F3ricos de Loter\u00EDas y Apuestas del Estado para descubrir patrones ocultos y frecuencias significativas.");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "button", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Descubre Nuestros Planes de Suscripci\u00F3n");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "section", 5)(12, "h2", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "C\u00F3mo Loto-IA Revoluciona tu Juego");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 7)(15, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "En LOTO IA.COM, hemos desarrollado 7 Inteligencias Artificiales \u00FAnicas, cada una entrenada exhaustivamente con algoritmos avanzados y datos hist\u00F3ricos espec\u00EDficos de los principales sorteos espa\u00F1oles. Nuestro sistema no se basa en la suerte, sino en el an\u00E1lisis profundo.");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Al suscribirte, desbloqueas el acceso a pron\u00F3sticos generados por estas IAs. Simplemente elige tu plan, solicita tus combinaciones y recibe pron\u00F3sticos calculados para maximizar tus probabilidades, basados en la tecnolog\u00EDa m\u00E1s puntera. Olv\u00EDdate de las corazonadas, apuesta por la inteligencia.");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "section", 8)(20, "h2", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, "El Proceso Inteligente Detr\u00E1s de tus Pron\u00F3sticos");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "div", 7)(23, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](24, "Nuestro poder reside en nuestro equipo de Inteligencia Artificial: \"Da Vinci\", \"Prognosis\", \"\u00C1strid\", \"Sin\u00E1ptica\", \"N\u00F3vax\", \"Axioma\" y \"Fortunata\". Cada una de estas IAs ha sido meticulosamente entrenada y especializada en los patrones, estad\u00EDsticas y frecuencias de los 7 sorteos de loter\u00EDa espa\u00F1ola m\u00E1s importantes, utilizando datos hist\u00F3ricos que abarcan d\u00E9cadas.");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26, "Su misi\u00F3n es identificar tendencias invisibles para el ojo humano y convertirlas en pron\u00F3sticos con mayor probabilidad estad\u00EDstica de \u00E9xito. Son la inteligencia detr\u00E1s de tus futuras jugadas.");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "h3", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](28, "Conoce a Nuestro Equipo de Expertos en IA");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "div", 9)(30, "div", 10)(31, "div", 11)(32, "h4", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](33, "Da Vinci");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](34, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](35, "Especialista en Euromillones");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](36, "div", 14)(37, "p", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](38, "Analiza patrones complejos y relaciones num\u00E9ricas para predecir combinaciones con mayor probabilidad estad\u00EDstica.");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](39, "div", 16)(40, "div", 11)(41, "h4", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](42, "Prognosis");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](43, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](44, "Especialista en Primitiva");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](45, "div", 14)(46, "p", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](47, "Utiliza modelos predictivos avanzados para identificar tendencias en los resultados hist\u00F3ricos.");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](48, "div", 17)(49, "div", 11)(50, "h4", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](51, "\u00C1strid");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](52, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](53, "Especialista en Bonoloto");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](54, "div", 14)(55, "p", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](56, "Especializada en an\u00E1lisis de frecuencias y distribuciones probabil\u00EDsticas para optimizar combinaciones.");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](57, "div", 18)(58, "div", 11)(59, "h4", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](60, "Sin\u00E1ptica");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](61, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](62, "Especialista en Gordo de la Primitiva");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](63, "div", 14)(64, "p", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](65, "Utiliza redes neuronales para detectar patrones ocultos en d\u00E9cadas de resultados hist\u00F3ricos.");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](66, "div", 19)(67, "div", 11)(68, "h4", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](69, "N\u00F3vax");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](70, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](71, "Especialista en EuroDreams");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](72, "div", 14)(73, "p", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](74, "Implementa algoritmos de aprendizaje profundo para analizar tendencias internacionales y patrones emergentes.");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](75, "div", 20)(76, "div", 11)(77, "h4", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](78, "Axioma");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](79, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](80, "Especialista en Lototurf");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](81, "div", 14)(82, "p", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](83, "Combina an\u00E1lisis estad\u00EDstico con modelos predictivos especializados en sorteos h\u00EDpicos y deportivos.");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](84, "div", 21)(85, "div", 11)(86, "h4", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](87, "Fortunata");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](88, "p", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](89, "Especialista en Loter\u00EDa Nacional");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](90, "div", 14)(91, "p", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](92, "Analiza hist\u00F3ricamente los n\u00FAmeros premiados y terminaciones m\u00E1s frecuentes en la Loter\u00EDa Nacional.");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](93, "section", 5)(94, "h2", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](95, "Desbloquea el Poder de la Inteligencia en tus Apuestas");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](96, "div", 7)(97, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](98, "\u00BFListo para dejar atr\u00E1s la incertidumbre y jugar con la ventaja que te ofrece la inteligencia artificial? En LOTO IA.COM, te proporcionamos las herramientas para tomar decisiones m\u00E1s informadas en tus sorteos favoritos. Explora nuestros diferentes planes de suscripci\u00F3n y elige el que mejor se adapte a tus necesidades.");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](99, "div", 22)(100, "div", 23)(101, "div", 24)(102, "h3", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](103, "Plan B\u00E1sico");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](104, "div", 26);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](105, "1.22\u20AC");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](106, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](107, "Pago \u00FAnico");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](108, "div", 28)(109, "ul")(110, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](111, "1 combinaci\u00F3n para 1 sorteo");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](112, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](113, "Acceso a 1 IA especializada");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](114, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](115, "Validez de 7 d\u00EDas");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](116, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](117, "Soporte por email");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](118, "div", 29)(119, "button", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](120, "Suscribirse");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](121, "div", 23)(122, "div", 24)(123, "h3", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](124, "Plan Mensual");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](125, "div", 26);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](126, "10.22\u20AC");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](127, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](128, "Mensual");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](129, "div", 28)(130, "ul")(131, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](132, "5 combinaciones para 3 sorteos");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](133, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](134, "Acceso a 3 IAs especializadas");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](135, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](136, "Validez de 30 d\u00EDas");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](137, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](138, "Soporte prioritario");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](139, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](140, "An\u00E1lisis de tendencias");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](141, "div", 29)(142, "button", 31);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](143, "Suscribirse");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](144, "div", 23)(145, "div", 24)(146, "h3", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](147, "Plan Pro");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](148, "div", 26);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](149, "122\u20AC");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](150, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](151, "Anual");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](152, "div", 28)(153, "ul")(154, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](155, "Combinaciones ilimitadas");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](156, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](157, "Acceso a todas las IAs");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](158, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](159, "Validez de 365 d\u00EDas");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](160, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](161, "Soporte VIP 24/7");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](162, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](163, "An\u00E1lisis avanzado de tendencias");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](164, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](165, "Estrategias personalizadas");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](166, "div", 29)(167, "button", 32);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](168, "Suscribirse");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](169, HomeComponent_div_169_Template, 5, 4, "div", 33)(170, HomeComponent_div_170_Template, 10, 0, "div", 34);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isBrowser);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.isBrowser);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](168);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.currentUser);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.currentUser);
          }
        },
        dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.DatePipe, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLink, ngx_bootstrap_carousel__WEBPACK_IMPORTED_MODULE_4__.CarouselModule, ngx_bootstrap_carousel__WEBPACK_IMPORTED_MODULE_4__.SlideComponent, ngx_bootstrap_carousel__WEBPACK_IMPORTED_MODULE_4__.CarouselComponent],
        styles: [".home-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0;\n  background: white;\n}\n\nh1[_ngcontent-%COMP%] {\n  color: #333;\n  margin-bottom: 2rem;\n  text-align: center;\n}\n\nh2[_ngcontent-%COMP%] {\n  color: #444;\n  margin: 1.5rem 0 1rem;\n}\n\np[_ngcontent-%COMP%] {\n  color: #666;\n  line-height: 1.6;\n  margin-bottom: 1rem;\n}\n\nul[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 1rem 0;\n}\n\nli[_ngcontent-%COMP%] {\n  padding: 0.75rem;\n  border-bottom: 1px solid #eee;\n  color: #555;\n}\n\nli[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  background-color: #007bff;\n  color: white;\n  border: none;\n  padding: 0.75rem 1.5rem;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 1rem;\n  transition: background-color 0.3s;\n}\n\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background-color: #0056b3;\n}\n\n.btn-secondary[_ngcontent-%COMP%] {\n  background-color: #6c757d;\n  color: white;\n  border: none;\n  padding: 0.75rem 1.5rem;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 1rem;\n  margin-left: 1rem;\n  transition: background-color 0.3s;\n}\n\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background-color: #5a6268;\n}\n\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n\n\n\n.hero-section[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #1a2a6c, #2a4858);\n  color: white;\n  padding: 4rem 2rem;\n  text-align: center;\n  border-radius: 0 0 10px 10px;\n  margin-bottom: 3rem;\n  position: relative;\n  overflow: hidden;\n}\n\n.hero-section[_ngcontent-%COMP%]::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-image: url('/assets/img/hero-pattern.png');\n  background-size: cover;\n  opacity: 0.1;\n  z-index: 0;\n}\n\n.hero-content[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: 800px;\n  margin: 0 auto;\n}\n\n.hero-section[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  margin-bottom: 1.5rem;\n  color: white;\n}\n\n.hero-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  line-height: 1.8;\n  margin-bottom: 2rem;\n  color: rgba(255, 255, 255, 0.9);\n}\n\n.cta-button[_ngcontent-%COMP%] {\n  background-color: #00c6ff;\n  color: white;\n  border: none;\n  padding: 1rem 2rem;\n  border-radius: 50px;\n  font-size: 1.1rem;\n  font-weight: bold;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  box-shadow: 0 4px 15px rgba(0, 198, 255, 0.3);\n  text-transform: uppercase;\n  letter-spacing: 1px;\n}\n\n.cta-button[_ngcontent-%COMP%]:hover {\n  background-color: #00a8e0;\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(0, 198, 255, 0.4);\n}\n\n.section[_ngcontent-%COMP%] {\n  padding: 4rem 2rem;\n  margin-bottom: 3rem;\n}\n\n.section-title[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  color: #333;\n  margin-bottom: 2rem;\n  text-align: center;\n  position: relative;\n}\n\n.section-title[_ngcontent-%COMP%]::after {\n  content: '';\n  display: block;\n  width: 80px;\n  height: 4px;\n  background: linear-gradient(90deg, #00c6ff, #0072ff);\n  margin: 1rem auto 0;\n  border-radius: 2px;\n}\n\n.section-content[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 0 auto;\n  line-height: 1.8;\n}\n\n.process-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-around;\n  margin-top: 3rem;\n}\n\n.process-item[_ngcontent-%COMP%] {\n  flex: 0 0 calc(33.333% - 2rem);\n  margin: 1rem;\n  padding: 2rem;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);\n  text-align: center;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n\n.process-item[_ngcontent-%COMP%]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);\n}\n\n.process-icon[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  margin-bottom: 1.5rem;\n  color: #00c6ff;\n}\n\n.process-title[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n  margin-bottom: 1rem;\n  color: #333;\n}\n\n.ai-team-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  gap: 2rem;\n  margin-top: 3rem;\n}\n\n.ai-card[_ngcontent-%COMP%] {\n  flex: 0 0 calc(33.33% - 2rem);\n  background: white;\n  border-radius: 10px;\n  overflow: hidden;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  margin-bottom: 2rem;\n}\n\n.ai-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);\n}\n\n.ai-card-header[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  color: white;\n  text-align: center;\n}\n\n\n\n.ai-euromillones[_ngcontent-%COMP%]   .ai-card-header[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #0a4b9f, #003380);\n}\n\n.ai-primitiva[_ngcontent-%COMP%]   .ai-card-header[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #00a651, #007e3e);\n}\n\n.ai-bonoloto[_ngcontent-%COMP%]   .ai-card-header[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #e30613, #b30000);\n}\n\n.ai-gordo[_ngcontent-%COMP%]   .ai-card-header[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #f39200, #d17a00);\n}\n\n.ai-eurodreams[_ngcontent-%COMP%]   .ai-card-header[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #662d91, #4b1d6a);\n}\n\n.ai-lototurf[_ngcontent-%COMP%]   .ai-card-header[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #009640, #006e2e);\n}\n\n.ai-loteria-nacional[_ngcontent-%COMP%]   .ai-card-header[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #c6a023, #9e7e1c);\n}\n\n.ai-card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n\n.ai-name[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n  margin: 0;\n  font-weight: bold;\n}\n\n.ai-specialty[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  opacity: 0.8;\n  margin-top: 0.5rem;\n}\n\n.ai-description[_ngcontent-%COMP%] {\n  color: #666;\n  line-height: 1.6;\n}\n\n.plans-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  gap: 2rem;\n  margin-top: 3rem;\n}\n\n.plan-card[_ngcontent-%COMP%] {\n  flex: 0 0 calc(33.333% - 2rem);\n  background: white;\n  border-radius: 10px;\n  overflow: hidden;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  border: 1px solid #eee;\n}\n\n.plan-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);\n}\n\n.plan-header[_ngcontent-%COMP%] {\n  padding: 2rem;\n  text-align: center;\n}\n\n.plan-name[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  margin: 0;\n  color: #333;\n}\n\n.plan-price[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: bold;\n  margin: 1rem 0;\n  color: #00c6ff;\n}\n\n.plan-period[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #888;\n}\n\n.plan-features[_ngcontent-%COMP%] {\n  padding: 0 2rem 2rem;\n}\n\n.plan-features[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  padding: 0;\n  list-style: none;\n}\n\n.plan-features[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 0.75rem 0;\n  border-bottom: 1px solid #f0f0f0;\n  color: #666;\n}\n\n.plan-features[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n\n.plan-features[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]::before {\n  content: '\u2713';\n  color: #00c6ff;\n  margin-right: 0.5rem;\n  font-weight: bold;\n}\n\n.plan-cta[_ngcontent-%COMP%] {\n  padding: 0 2rem 2rem;\n  text-align: center;\n}\n\n.user-section[_ngcontent-%COMP%] {\n  background: #f9f9f9;\n  border-radius: 8px;\n  padding: 2rem;\n  margin: 2rem auto;\n  max-width: 800px;\n  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n}\n\n\n\n.slider-section[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0;\n  width: 100%;\n  position: relative;\n  z-index: 1;\n  margin-bottom: 30px; \n\n}\n\n.carousel-container[_ngcontent-%COMP%] {\n  overflow: hidden;\n  width: 100%;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n  background-color: #f8f9fa;\n  padding: 30px 0;\n}\n\n\n\n.multi-image-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 20px;\n  padding: 0 40px;\n  height: 350px; \n\n}\n\n.image-item[_ngcontent-%COMP%] {\n  flex: 1;\n  max-width: calc(25% - 20px); \n\n  height: 100%;\n  position: relative;\n  border-radius: 10px;\n  overflow: hidden;\n  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n\n.image-item[_ngcontent-%COMP%]:hover {\n  transform: translateY(-8px);\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);\n}\n\n.slider-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%; \n\n  object-fit: cover;\n  display: block;\n  border-radius: 10px;\n}\n\n\n\n.static-image[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0 40px;\n  display: flex;\n  justify-content: center;\n  gap: 20px;\n  height: 350px; \n\n}\n\n.static-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: calc(25% - 20px); \n\n  height: 100%;\n  object-fit: cover;\n  border-radius: 10px;\n  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);\n}\n\n\n\n[_nghost-%COMP%]     .carousel-caption {\n  background-color: rgba(0, 0, 0, 0.5);\n  border-radius: 10px;\n  padding: 10px;\n  bottom: 10px;\n  left: 10%;\n  right: 10%;\n}\n\n[_nghost-%COMP%]     .carousel-indicators {\n  bottom: -30px;\n}\n\n[_nghost-%COMP%]     .carousel-control-prev, \n[_nghost-%COMP%]     .carousel-control-next {\n  width: 5%;\n  opacity: 0.8;\n}\n\n[_nghost-%COMP%]     .carousel-control-prev:hover, \n[_nghost-%COMP%]     .carousel-control-next:hover {\n  opacity: 1;\n}\n\n\n\n.image-title[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.7);\n  color: white;\n  padding: 12px;\n  font-size: 14px;\n  font-weight: 500;\n  text-align: center;\n  border-bottom-left-radius: 10px;\n  border-bottom-right-radius: 10px;\n  transition: background-color 0.3s ease;\n}\n\n.image-item[_ngcontent-%COMP%]:hover   .image-title[_ngcontent-%COMP%] {\n  background-color: rgba(0, 0, 0, 0.85);\n}\n\n\n\n.hero-section[_ngcontent-%COMP%] {\n  margin-top: 50px; \n\n}\n\n\n\n[_nghost-%COMP%]     .carousel-indicators {\n  bottom: -40px;\n}\n\n\n\n.slider-section[_ngcontent-%COMP%] {\n  margin-bottom: 50px; \n\n}\n\n\n\n[_nghost-%COMP%]     .carousel-control-prev-icon, \n[_nghost-%COMP%]     .carousel-control-next-icon {\n  background-color: rgba(0, 0, 0, 0.5);\n  border-radius: 50%;\n  padding: 10px;\n}\n\n[_nghost-%COMP%]     .carousel-indicators li {\n  background-color: rgba(0, 0, 0, 0.5);\n  height: 10px;\n  width: 10px;\n  border-radius: 50%;\n  margin: 0 5px;\n}\n\n[_nghost-%COMP%]     .carousel-indicators .active {\n  background-color: #00c6ff;\n}\n\n[_nghost-%COMP%]     .carousel {\n  display: block;\n  width: 100%;\n  overflow: hidden;\n}\n\n\n\n.user-section[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border-radius: 10px;\n  padding: 1.5rem;\n  margin: 2rem auto 4rem;\n  max-width: 800px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);\n  text-align: center;\n  border-left: 4px solid #0072ff;\n}\n\n.user-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.4rem;\n  color: #333;\n  margin-bottom: 1rem;\n}\n\n.user-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  color: #555;\n  margin: 1rem 0;\n}\n\n.user-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #666;\n  margin-bottom: 1.5rem;\n}\n\n.user-section[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 1rem 0;\n  display: inline-block;\n  text-align: left;\n}\n\n.user-section[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 0.5rem 0;\n  border-bottom: 1px solid #eee;\n  color: #555;\n}\n\n.user-section[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n\n.user-section[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n  background-color: #0072ff;\n  margin-top: 0.5rem;\n}\n\n\n\n@media (max-width: 1200px) {\n  .ai-card[_ngcontent-%COMP%] {\n    flex: 0 0 calc(50% - 2rem);\n  }\n}\n\n@media (max-width: 992px) {\n  .process-item[_ngcontent-%COMP%], .plan-card[_ngcontent-%COMP%] {\n    flex: 0 0 calc(50% - 2rem);\n  }\n\n  .ai-card[_ngcontent-%COMP%] {\n    flex: 0 0 calc(50% - 2rem);\n  }\n\n  .slider-image[_ngcontent-%COMP%] {\n    height: 400px;\n  }\n\n  .user-section[_ngcontent-%COMP%] {\n    margin: 2rem 1rem 3rem;\n    padding: 1.2rem;\n  }\n}\n\n@media (max-width: 768px) {\n  .hero-section[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n\n  .hero-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n\n  .section-title[_ngcontent-%COMP%] {\n    font-size: 1.8rem;\n  }\n}\n\n@media (max-width: 576px) {\n  .home-container[_ngcontent-%COMP%] {\n    margin: 0;\n    padding: 0;\n  }\n\n  .hero-section[_ngcontent-%COMP%] {\n    padding: 3rem 1.5rem;\n  }\n\n  .section[_ngcontent-%COMP%] {\n    padding: 3rem 1.5rem;\n  }\n\n  .process-item[_ngcontent-%COMP%], .ai-card[_ngcontent-%COMP%], .plan-card[_ngcontent-%COMP%] {\n    flex: 0 0 100%;\n    margin: 1rem 0;\n  }\n\n  .ai-team-container[_ngcontent-%COMP%] {\n    gap: 1.5rem;\n  }\n\n  .ai-card[_ngcontent-%COMP%] {\n    margin-bottom: 1rem;\n  }\n\n  .btn-secondary[_ngcontent-%COMP%] {\n    margin-left: 0;\n    margin-top: 1rem;\n  }\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvaG9tZS9ob21lLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBaUI7RUFDakIsY0FBYztFQUNkLFVBQVU7RUFDVixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsbUJBQW1CO0VBQ25CLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixVQUFVO0VBQ1YsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQiw2QkFBNkI7RUFDN0IsV0FBVztBQUNiOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWixZQUFZO0VBQ1osdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsZUFBZTtFQUNmLGlDQUFpQztBQUNuQzs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixZQUFZO0VBQ1osWUFBWTtFQUNaLHVCQUF1QjtFQUN2QixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsaUNBQWlDO0FBQ25DOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLG1CQUFtQjtBQUNyQjs7QUFFQSxzQ0FBc0M7QUFDdEM7RUFDRSxxREFBcUQ7RUFDckQsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsNEJBQTRCO0VBQzVCLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixNQUFNO0VBQ04sT0FBTztFQUNQLFdBQVc7RUFDWCxZQUFZO0VBQ1oscURBQXFEO0VBQ3JELHNCQUFzQjtFQUN0QixZQUFZO0VBQ1osVUFBVTtBQUNaOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixnQkFBZ0I7RUFDaEIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixxQkFBcUI7RUFDckIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsK0JBQStCO0FBQ2pDOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWixZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsaUJBQWlCO0VBQ2pCLGVBQWU7RUFDZix5QkFBeUI7RUFDekIsNkNBQTZDO0VBQzdDLHlCQUF5QjtFQUN6QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsMkJBQTJCO0VBQzNCLDZDQUE2QztBQUMvQzs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsV0FBVztFQUNYLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGNBQWM7RUFDZCxXQUFXO0VBQ1gsV0FBVztFQUNYLG9EQUFvRDtFQUNwRCxtQkFBbUI7RUFDbkIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZUFBZTtFQUNmLDZCQUE2QjtFQUM3QixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSw4QkFBOEI7RUFDOUIsWUFBWTtFQUNaLGFBQWE7RUFDYixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLDBDQUEwQztFQUMxQyxrQkFBa0I7RUFDbEIscURBQXFEO0FBQ3ZEOztBQUVBO0VBQ0UsMkJBQTJCO0VBQzNCLHlDQUF5QztBQUMzQzs7QUFFQTtFQUNFLGVBQWU7RUFDZixxQkFBcUI7RUFDckIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixtQkFBbUI7RUFDbkIsV0FBVztBQUNiOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGVBQWU7RUFDZix1QkFBdUI7RUFDdkIsU0FBUztFQUNULGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLDZCQUE2QjtFQUM3QixpQkFBaUI7RUFDakIsbUJBQW1CO0VBQ25CLGdCQUFnQjtFQUNoQiwwQ0FBMEM7RUFDMUMscURBQXFEO0VBQ3JELG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLDJCQUEyQjtFQUMzQix5Q0FBeUM7QUFDM0M7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsWUFBWTtFQUNaLGtCQUFrQjtBQUNwQjs7QUFFQSwwRUFBMEU7QUFDMUU7RUFDRSxxREFBcUQ7QUFDdkQ7O0FBRUE7RUFDRSxxREFBcUQ7QUFDdkQ7O0FBRUE7RUFDRSxxREFBcUQ7QUFDdkQ7O0FBRUE7RUFDRSxxREFBcUQ7QUFDdkQ7O0FBRUE7RUFDRSxxREFBcUQ7QUFDdkQ7O0FBRUE7RUFDRSxxREFBcUQ7QUFDdkQ7O0FBRUE7RUFDRSxxREFBcUQ7QUFDdkQ7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLFNBQVM7RUFDVCxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsWUFBWTtFQUNaLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZUFBZTtFQUNmLHVCQUF1QjtFQUN2QixTQUFTO0VBQ1QsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsOEJBQThCO0VBQzlCLGlCQUFpQjtFQUNqQixtQkFBbUI7RUFDbkIsZ0JBQWdCO0VBQ2hCLDBDQUEwQztFQUMxQyxxREFBcUQ7RUFDckQsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsMkJBQTJCO0VBQzNCLHlDQUF5QztBQUMzQzs7QUFFQTtFQUNFLGFBQWE7RUFDYixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsU0FBUztFQUNULFdBQVc7QUFDYjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixpQkFBaUI7RUFDakIsY0FBYztFQUNkLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsV0FBVztBQUNiOztBQUVBO0VBQ0Usb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UsVUFBVTtFQUNWLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixnQ0FBZ0M7RUFDaEMsV0FBVztBQUNiOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGNBQWM7RUFDZCxvQkFBb0I7RUFDcEIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLGlCQUFpQjtFQUNqQixnQkFBZ0I7RUFDaEIscUNBQXFDO0FBQ3ZDOztBQUVBLG1FQUFtRTtBQUNuRTtFQUNFLFNBQVM7RUFDVCxVQUFVO0VBQ1YsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1YsbUJBQW1CLEVBQUUsZ0RBQWdEO0FBQ3ZFOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLFdBQVc7RUFDWCx5Q0FBeUM7RUFDekMseUJBQXlCO0VBQ3pCLGVBQWU7QUFDakI7O0FBRUEsdUNBQXVDO0FBQ3ZDO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsU0FBUztFQUNULGVBQWU7RUFDZixhQUFhLEVBQUUscUNBQXFDO0FBQ3REOztBQUVBO0VBQ0UsT0FBTztFQUNQLDJCQUEyQixFQUFFLG9CQUFvQjtFQUNqRCxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixnQkFBZ0I7RUFDaEIsMENBQTBDO0VBQzFDLHFEQUFxRDtBQUN2RDs7QUFFQTtFQUNFLDJCQUEyQjtFQUMzQiwwQ0FBMEM7QUFDNUM7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWSxFQUFFLHdDQUF3QztFQUN0RCxpQkFBaUI7RUFDakIsY0FBYztFQUNkLG1CQUFtQjtBQUNyQjs7QUFFQSxtRUFBbUU7QUFDbkU7RUFDRSxXQUFXO0VBQ1gsZUFBZTtFQUNmLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsU0FBUztFQUNULGFBQWEsRUFBRSxpQ0FBaUM7QUFDbEQ7O0FBRUE7RUFDRSx1QkFBdUIsRUFBRSxvQkFBb0I7RUFDN0MsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixtQkFBbUI7RUFDbkIsMENBQTBDO0FBQzVDOztBQUVBLHNDQUFzQztBQUN0QztFQUNFLG9DQUFvQztFQUNwQyxtQkFBbUI7RUFDbkIsYUFBYTtFQUNiLFlBQVk7RUFDWixTQUFTO0VBQ1QsVUFBVTtBQUNaOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBOztFQUVFLFNBQVM7RUFDVCxZQUFZO0FBQ2Q7O0FBRUE7O0VBRUUsVUFBVTtBQUNaOztBQUVBLDZDQUE2QztBQUM3QztFQUNFLGtCQUFrQjtFQUNsQixTQUFTO0VBQ1QsT0FBTztFQUNQLFFBQVE7RUFDUixvQ0FBb0M7RUFDcEMsWUFBWTtFQUNaLGFBQWE7RUFDYixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQiwrQkFBK0I7RUFDL0IsZ0NBQWdDO0VBQ2hDLHNDQUFzQztBQUN4Qzs7QUFFQTtFQUNFLHFDQUFxQztBQUN2Qzs7QUFFQSxnQ0FBZ0M7QUFDaEM7RUFDRSxnQkFBZ0IsRUFBRSwwREFBMEQ7QUFDOUU7O0FBRUEsNkNBQTZDO0FBQzdDO0VBQ0UsYUFBYTtBQUNmOztBQUVBLDJDQUEyQztBQUMzQztFQUNFLG1CQUFtQixFQUFFLGlDQUFpQztBQUN4RDs7QUFFQSw0Q0FBNEM7QUFDNUM7O0VBRUUsb0NBQW9DO0VBQ3BDLGtCQUFrQjtFQUNsQixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxvQ0FBb0M7RUFDcEMsWUFBWTtFQUNaLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsYUFBYTtBQUNmOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsY0FBYztFQUNkLFdBQVc7RUFDWCxnQkFBZ0I7QUFDbEI7O0FBRUEsdUNBQXVDO0FBQ3ZDO0VBQ0UseUJBQXlCO0VBQ3pCLG1CQUFtQjtFQUNuQixlQUFlO0VBQ2Ysc0JBQXNCO0VBQ3RCLGdCQUFnQjtFQUNoQiwwQ0FBMEM7RUFDMUMsa0JBQWtCO0VBQ2xCLDhCQUE4QjtBQUNoQzs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixXQUFXO0VBQ1gsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLFdBQVc7RUFDWCxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsV0FBVztFQUNYLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixVQUFVO0VBQ1YsY0FBYztFQUNkLHFCQUFxQjtFQUNyQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsNkJBQTZCO0VBQzdCLFdBQVc7QUFDYjs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixrQkFBa0I7QUFDcEI7O0FBRUEsc0JBQXNCO0FBQ3RCO0VBQ0U7SUFDRSwwQkFBMEI7RUFDNUI7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsMEJBQTBCO0VBQzVCOztFQUVBO0lBQ0UsMEJBQTBCO0VBQzVCOztFQUVBO0lBQ0UsYUFBYTtFQUNmOztFQUVBO0lBQ0Usc0JBQXNCO0lBQ3RCLGVBQWU7RUFDakI7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsZUFBZTtFQUNqQjs7RUFFQTtJQUNFLGVBQWU7RUFDakI7O0VBRUE7SUFDRSxpQkFBaUI7RUFDbkI7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsU0FBUztJQUNULFVBQVU7RUFDWjs7RUFFQTtJQUNFLG9CQUFvQjtFQUN0Qjs7RUFFQTtJQUNFLG9CQUFvQjtFQUN0Qjs7RUFFQTtJQUNFLGNBQWM7SUFDZCxjQUFjO0VBQ2hCOztFQUVBO0lBQ0UsV0FBVztFQUNiOztFQUVBO0lBQ0UsbUJBQW1CO0VBQ3JCOztFQUVBO0lBQ0UsY0FBYztJQUNkLGdCQUFnQjtFQUNsQjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLmhvbWUtY29udGFpbmVyIHtcclxuICBtYXgtd2lkdGg6IDEyMDBweDtcclxuICBtYXJnaW46IDAgYXV0bztcclxuICBwYWRkaW5nOiAwO1xyXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xyXG59XHJcblxyXG5oMSB7XHJcbiAgY29sb3I6ICMzMzM7XHJcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbmgyIHtcclxuICBjb2xvcjogIzQ0NDtcclxuICBtYXJnaW46IDEuNXJlbSAwIDFyZW07XHJcbn1cclxuXHJcbnAge1xyXG4gIGNvbG9yOiAjNjY2O1xyXG4gIGxpbmUtaGVpZ2h0OiAxLjY7XHJcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxufVxyXG5cclxudWwge1xyXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgcGFkZGluZzogMDtcclxuICBtYXJnaW46IDFyZW0gMDtcclxufVxyXG5cclxubGkge1xyXG4gIHBhZGRpbmc6IDAuNzVyZW07XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlZWU7XHJcbiAgY29sb3I6ICM1NTU7XHJcbn1cclxuXHJcbmxpOmxhc3QtY2hpbGQge1xyXG4gIGJvcmRlci1ib3R0b206IG5vbmU7XHJcbn1cclxuXHJcbi5idG4tcHJpbWFyeSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwN2JmZjtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIHBhZGRpbmc6IDAuNzVyZW0gMS41cmVtO1xyXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgZm9udC1zaXplOiAxcmVtO1xyXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcztcclxufVxyXG5cclxuLmJ0bi1wcmltYXJ5OmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA1NmIzO1xyXG59XHJcblxyXG4uYnRuLXNlY29uZGFyeSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzZjNzU3ZDtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIHBhZGRpbmc6IDAuNzVyZW0gMS41cmVtO1xyXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgZm9udC1zaXplOiAxcmVtO1xyXG4gIG1hcmdpbi1sZWZ0OiAxcmVtO1xyXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcztcclxufVxyXG5cclxuLmJ0bi1zZWNvbmRhcnk6aG92ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICM1YTYyNjg7XHJcbn1cclxuXHJcbmJ1dHRvbjpkaXNhYmxlZCB7XHJcbiAgb3BhY2l0eTogMC43O1xyXG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XHJcbn1cclxuXHJcbi8qIEVzdGlsb3MgcGFyYSBsYXMgbnVldmFzIHNlY2Npb25lcyAqL1xyXG4uaGVyby1zZWN0aW9uIHtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMWEyYTZjLCAjMmE0ODU4KTtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgcGFkZGluZzogNHJlbSAycmVtO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBib3JkZXItcmFkaXVzOiAwIDAgMTBweCAxMHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDNyZW07XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbi5oZXJvLXNlY3Rpb246OmJlZm9yZSB7XHJcbiAgY29udGVudDogJyc7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogMDtcclxuICBsZWZ0OiAwO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaW1nL2hlcm8tcGF0dGVybi5wbmcnKTtcclxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gIG9wYWNpdHk6IDAuMTtcclxuICB6LWluZGV4OiAwO1xyXG59XHJcblxyXG4uaGVyby1jb250ZW50IHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgei1pbmRleDogMTtcclxuICBtYXgtd2lkdGg6IDgwMHB4O1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG59XHJcblxyXG4uaGVyby1zZWN0aW9uIGgxIHtcclxuICBmb250LXNpemU6IDIuNXJlbTtcclxuICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XHJcbiAgY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4uaGVyby1zZWN0aW9uIHAge1xyXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xyXG4gIGxpbmUtaGVpZ2h0OiAxLjg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcclxuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjkpO1xyXG59XHJcblxyXG4uY3RhLWJ1dHRvbiB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwYzZmZjtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIHBhZGRpbmc6IDFyZW0gMnJlbTtcclxuICBib3JkZXItcmFkaXVzOiA1MHB4O1xyXG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xyXG4gIGJveC1zaGFkb3c6IDAgNHB4IDE1cHggcmdiYSgwLCAxOTgsIDI1NSwgMC4zKTtcclxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gIGxldHRlci1zcGFjaW5nOiAxcHg7XHJcbn1cclxuXHJcbi5jdGEtYnV0dG9uOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBhOGUwO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcclxuICBib3gtc2hhZG93OiAwIDZweCAyMHB4IHJnYmEoMCwgMTk4LCAyNTUsIDAuNCk7XHJcbn1cclxuXHJcbi5zZWN0aW9uIHtcclxuICBwYWRkaW5nOiA0cmVtIDJyZW07XHJcbiAgbWFyZ2luLWJvdHRvbTogM3JlbTtcclxufVxyXG5cclxuLnNlY3Rpb24tdGl0bGUge1xyXG4gIGZvbnQtc2l6ZTogMnJlbTtcclxuICBjb2xvcjogIzMzMztcclxuICBtYXJnaW4tYm90dG9tOiAycmVtO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuXHJcbi5zZWN0aW9uLXRpdGxlOjphZnRlciB7XHJcbiAgY29udGVudDogJyc7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgd2lkdGg6IDgwcHg7XHJcbiAgaGVpZ2h0OiA0cHg7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjMDBjNmZmLCAjMDA3MmZmKTtcclxuICBtYXJnaW46IDFyZW0gYXV0byAwO1xyXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcclxufVxyXG5cclxuLnNlY3Rpb24tY29udGVudCB7XHJcbiAgbWF4LXdpZHRoOiA4MDBweDtcclxuICBtYXJnaW46IDAgYXV0bztcclxuICBsaW5lLWhlaWdodDogMS44O1xyXG59XHJcblxyXG4ucHJvY2Vzcy1jb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC13cmFwOiB3cmFwO1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xyXG4gIG1hcmdpbi10b3A6IDNyZW07XHJcbn1cclxuXHJcbi5wcm9jZXNzLWl0ZW0ge1xyXG4gIGZsZXg6IDAgMCBjYWxjKDMzLjMzMyUgLSAycmVtKTtcclxuICBtYXJnaW46IDFyZW07XHJcbiAgcGFkZGluZzogMnJlbTtcclxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgYm94LXNoYWRvdzogMCA1cHggMTVweCByZ2JhKDAsIDAsIDAsIDAuMDUpO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLCBib3gtc2hhZG93IDAuM3MgZWFzZTtcclxufVxyXG5cclxuLnByb2Nlc3MtaXRlbTpob3ZlciB7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01cHgpO1xyXG4gIGJveC1zaGFkb3c6IDAgOHB4IDI1cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG59XHJcblxyXG4ucHJvY2Vzcy1pY29uIHtcclxuICBmb250LXNpemU6IDNyZW07XHJcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xyXG4gIGNvbG9yOiAjMDBjNmZmO1xyXG59XHJcblxyXG4ucHJvY2Vzcy10aXRsZSB7XHJcbiAgZm9udC1zaXplOiAxLjNyZW07XHJcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuICBjb2xvcjogIzMzMztcclxufVxyXG5cclxuLmFpLXRlYW0tY29udGFpbmVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtd3JhcDogd3JhcDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBnYXA6IDJyZW07XHJcbiAgbWFyZ2luLXRvcDogM3JlbTtcclxufVxyXG5cclxuLmFpLWNhcmQge1xyXG4gIGZsZXg6IDAgMCBjYWxjKDMzLjMzJSAtIDJyZW0pO1xyXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBib3gtc2hhZG93OiAwIDVweCAxNXB4IHJnYmEoMCwgMCwgMCwgMC4wNSk7XHJcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZSwgYm94LXNoYWRvdyAwLjNzIGVhc2U7XHJcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcclxufVxyXG5cclxuLmFpLWNhcmQ6aG92ZXIge1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNXB4KTtcclxuICBib3gtc2hhZG93OiAwIDhweCAyNXB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxufVxyXG5cclxuLmFpLWNhcmQtaGVhZGVyIHtcclxuICBwYWRkaW5nOiAxLjVyZW07XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLyogQ29sb3JlcyBlc3BlY8ODwq1maWNvcyBwYXJhIGNhZGEgSUEgYmFzYWRvcyBlbiBsb3MgY29sb3JlcyBkZSBsb3MganVlZ29zICovXHJcbi5haS1ldXJvbWlsbG9uZXMgLmFpLWNhcmQtaGVhZGVyIHtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMGE0YjlmLCAjMDAzMzgwKTtcclxufVxyXG5cclxuLmFpLXByaW1pdGl2YSAuYWktY2FyZC1oZWFkZXIge1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMwMGE2NTEsICMwMDdlM2UpO1xyXG59XHJcblxyXG4uYWktYm9ub2xvdG8gLmFpLWNhcmQtaGVhZGVyIHtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZTMwNjEzLCAjYjMwMDAwKTtcclxufVxyXG5cclxuLmFpLWdvcmRvIC5haS1jYXJkLWhlYWRlciB7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2YzOTIwMCwgI2QxN2EwMCk7XHJcbn1cclxuXHJcbi5haS1ldXJvZHJlYW1zIC5haS1jYXJkLWhlYWRlciB7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzY2MmQ5MSwgIzRiMWQ2YSk7XHJcbn1cclxuXHJcbi5haS1sb3RvdHVyZiAuYWktY2FyZC1oZWFkZXIge1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMwMDk2NDAsICMwMDZlMmUpO1xyXG59XHJcblxyXG4uYWktbG90ZXJpYS1uYWNpb25hbCAuYWktY2FyZC1oZWFkZXIge1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNjNmEwMjMsICM5ZTdlMWMpO1xyXG59XHJcblxyXG4uYWktY2FyZC1ib2R5IHtcclxuICBwYWRkaW5nOiAxLjVyZW07XHJcbn1cclxuXHJcbi5haS1uYW1lIHtcclxuICBmb250LXNpemU6IDEuM3JlbTtcclxuICBtYXJnaW46IDA7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbi5haS1zcGVjaWFsdHkge1xyXG4gIGZvbnQtc2l6ZTogMC45cmVtO1xyXG4gIG9wYWNpdHk6IDAuODtcclxuICBtYXJnaW4tdG9wOiAwLjVyZW07XHJcbn1cclxuXHJcbi5haS1kZXNjcmlwdGlvbiB7XHJcbiAgY29sb3I6ICM2NjY7XHJcbiAgbGluZS1oZWlnaHQ6IDEuNjtcclxufVxyXG5cclxuLnBsYW5zLWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgZ2FwOiAycmVtO1xyXG4gIG1hcmdpbi10b3A6IDNyZW07XHJcbn1cclxuXHJcbi5wbGFuLWNhcmQge1xyXG4gIGZsZXg6IDAgMCBjYWxjKDMzLjMzMyUgLSAycmVtKTtcclxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgYm94LXNoYWRvdzogMCA1cHggMTVweCByZ2JhKDAsIDAsIDAsIDAuMDUpO1xyXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UsIGJveC1zaGFkb3cgMC4zcyBlYXNlO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNlZWU7XHJcbn1cclxuXHJcbi5wbGFuLWNhcmQ6aG92ZXIge1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNXB4KTtcclxuICBib3gtc2hhZG93OiAwIDhweCAyNXB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxufVxyXG5cclxuLnBsYW4taGVhZGVyIHtcclxuICBwYWRkaW5nOiAycmVtO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLnBsYW4tbmFtZSB7XHJcbiAgZm9udC1zaXplOiAxLjVyZW07XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGNvbG9yOiAjMzMzO1xyXG59XHJcblxyXG4ucGxhbi1wcmljZSB7XHJcbiAgZm9udC1zaXplOiAyLjVyZW07XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgbWFyZ2luOiAxcmVtIDA7XHJcbiAgY29sb3I6ICMwMGM2ZmY7XHJcbn1cclxuXHJcbi5wbGFuLXBlcmlvZCB7XHJcbiAgZm9udC1zaXplOiAwLjlyZW07XHJcbiAgY29sb3I6ICM4ODg7XHJcbn1cclxuXHJcbi5wbGFuLWZlYXR1cmVzIHtcclxuICBwYWRkaW5nOiAwIDJyZW0gMnJlbTtcclxufVxyXG5cclxuLnBsYW4tZmVhdHVyZXMgdWwge1xyXG4gIHBhZGRpbmc6IDA7XHJcbiAgbGlzdC1zdHlsZTogbm9uZTtcclxufVxyXG5cclxuLnBsYW4tZmVhdHVyZXMgbGkge1xyXG4gIHBhZGRpbmc6IDAuNzVyZW0gMDtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2YwZjBmMDtcclxuICBjb2xvcjogIzY2NjtcclxufVxyXG5cclxuLnBsYW4tZmVhdHVyZXMgbGk6bGFzdC1jaGlsZCB7XHJcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTtcclxufVxyXG5cclxuLnBsYW4tZmVhdHVyZXMgbGk6OmJlZm9yZSB7XHJcbiAgY29udGVudDogJ8OiwpzCkyc7XHJcbiAgY29sb3I6ICMwMGM2ZmY7XHJcbiAgbWFyZ2luLXJpZ2h0OiAwLjVyZW07XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbi5wbGFuLWN0YSB7XHJcbiAgcGFkZGluZzogMCAycmVtIDJyZW07XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4udXNlci1zZWN0aW9uIHtcclxuICBiYWNrZ3JvdW5kOiAjZjlmOWY5O1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBwYWRkaW5nOiAycmVtO1xyXG4gIG1hcmdpbjogMnJlbSBhdXRvO1xyXG4gIG1heC13aWR0aDogODAwcHg7XHJcbiAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKTtcclxufVxyXG5cclxuLyogRXN0aWxvcyBwYXJhIGVsIHNsaWRlciBhIGFuY2hvIGNvbXBsZXRvIGNvbiBtw4PCumx0aXBsZXMgaW3Dg8KhZ2VuZXMgKi9cclxuLnNsaWRlci1zZWN0aW9uIHtcclxuICBtYXJnaW46IDA7XHJcbiAgcGFkZGluZzogMDtcclxuICB3aWR0aDogMTAwJTtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgei1pbmRleDogMTtcclxuICBtYXJnaW4tYm90dG9tOiAzMHB4OyAvKiBFc3BhY2lvIGVudHJlIGVsIGNhcnJ1c2VsIHkgbGEgc2VjY2nDg8KzbiBoZXJvICovXHJcbn1cclxuXHJcbi5jYXJvdXNlbC1jb250YWluZXIge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYm94LXNoYWRvdzogMCAycHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjlmYTtcclxuICBwYWRkaW5nOiAzMHB4IDA7XHJcbn1cclxuXHJcbi8qIENvbnRlbmVkb3IgcGFyYSBtw4PCumx0aXBsZXMgaW3Dg8KhZ2VuZXMgKi9cclxuLm11bHRpLWltYWdlLWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogMjBweDtcclxuICBwYWRkaW5nOiAwIDQwcHg7XHJcbiAgaGVpZ2h0OiAzNTBweDsgLyogQWx0dXJhIHNpbWlsYXIgYSBsYSBzZWNjacODwrNuIGhlcm8gKi9cclxufVxyXG5cclxuLmltYWdlLWl0ZW0ge1xyXG4gIGZsZXg6IDE7XHJcbiAgbWF4LXdpZHRoOiBjYWxjKDI1JSAtIDIwcHgpOyAvKiBQYXJhIDQgaW3Dg8KhZ2VuZXMgKi9cclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBib3gtc2hhZG93OiAwIDZweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XHJcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZSwgYm94LXNoYWRvdyAwLjNzIGVhc2U7XHJcbn1cclxuXHJcbi5pbWFnZS1pdGVtOmhvdmVyIHtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLThweCk7XHJcbiAgYm94LXNoYWRvdzogMCAxMHB4IDIwcHggcmdiYSgwLCAwLCAwLCAwLjIpO1xyXG59XHJcblxyXG4uc2xpZGVyLWltYWdlIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDEwMCU7IC8qIE9jdXBhIHRvZGEgbGEgYWx0dXJhIGRlbCBjb250ZW5lZG9yICovXHJcbiAgb2JqZWN0LWZpdDogY292ZXI7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcclxufVxyXG5cclxuLyogRXN0aWxvcyBwYXJhIGxhIGltYWdlbiBlc3TDg8KhdGljYSAoYWx0ZXJuYXRpdmEgcGFyYSBlbCBzZXJ2aWRvcikgKi9cclxuLnN0YXRpYy1pbWFnZSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgcGFkZGluZzogMCA0MHB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgZ2FwOiAyMHB4O1xyXG4gIGhlaWdodDogMzUwcHg7IC8qIE1pc21hIGFsdHVyYSBxdWUgZWwgY2FycnVzZWwgKi9cclxufVxyXG5cclxuLnN0YXRpYy1pbWFnZSBpbWcge1xyXG4gIHdpZHRoOiBjYWxjKDI1JSAtIDIwcHgpOyAvKiBQYXJhIDQgaW3Dg8KhZ2VuZXMgKi9cclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgb2JqZWN0LWZpdDogY292ZXI7XHJcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICBib3gtc2hhZG93OiAwIDZweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XHJcbn1cclxuXHJcbi8qIE1lam9yYXMgdmlzdWFsZXMgcGFyYSBlbCBjYXJydXNlbCAqL1xyXG46aG9zdCA6Om5nLWRlZXAgLmNhcm91c2VsLWNhcHRpb24ge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcclxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gIHBhZGRpbmc6IDEwcHg7XHJcbiAgYm90dG9tOiAxMHB4O1xyXG4gIGxlZnQ6IDEwJTtcclxuICByaWdodDogMTAlO1xyXG59XHJcblxyXG46aG9zdCA6Om5nLWRlZXAgLmNhcm91c2VsLWluZGljYXRvcnMge1xyXG4gIGJvdHRvbTogLTMwcHg7XHJcbn1cclxuXHJcbjpob3N0IDo6bmctZGVlcCAuY2Fyb3VzZWwtY29udHJvbC1wcmV2LFxyXG46aG9zdCA6Om5nLWRlZXAgLmNhcm91c2VsLWNvbnRyb2wtbmV4dCB7XHJcbiAgd2lkdGg6IDUlO1xyXG4gIG9wYWNpdHk6IDAuODtcclxufVxyXG5cclxuOmhvc3QgOjpuZy1kZWVwIC5jYXJvdXNlbC1jb250cm9sLXByZXY6aG92ZXIsXHJcbjpob3N0IDo6bmctZGVlcCAuY2Fyb3VzZWwtY29udHJvbC1uZXh0OmhvdmVyIHtcclxuICBvcGFjaXR5OiAxO1xyXG59XHJcblxyXG4vKiBFc3RpbG9zIHBhcmEgbG9zIHTDg8KtdHVsb3MgZGUgbGFzIGltw4PCoWdlbmVzICovXHJcbi5pbWFnZS10aXRsZSB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGJvdHRvbTogMDtcclxuICBsZWZ0OiAwO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC43KTtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgcGFkZGluZzogMTJweDtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTBweDtcclxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTBweDtcclxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3MgZWFzZTtcclxufVxyXG5cclxuLmltYWdlLWl0ZW06aG92ZXIgLmltYWdlLXRpdGxlIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuODUpO1xyXG59XHJcblxyXG4vKiBBanVzdGUgcGFyYSBsYSBzZWNjacODwrNuIGhlcm8gKi9cclxuLmhlcm8tc2VjdGlvbiB7XHJcbiAgbWFyZ2luLXRvcDogNTBweDsgLyogRXNwYWNpbyBhZGljaW9uYWwgZW50cmUgZWwgY2FycnVzZWwgeSBsYSBzZWNjacODwrNuIGhlcm8gKi9cclxufVxyXG5cclxuLyogQWp1c3RlIHBhcmEgbG9zIGluZGljYWRvcmVzIGRlbCBjYXJydXNlbCAqL1xyXG46aG9zdCA6Om5nLWRlZXAgLmNhcm91c2VsLWluZGljYXRvcnMge1xyXG4gIGJvdHRvbTogLTQwcHg7XHJcbn1cclxuXHJcbi8qIEFqdXN0ZSBwYXJhIGVsIGNvbnRlbmVkb3IgZGVsIGNhcnJ1c2VsICovXHJcbi5zbGlkZXItc2VjdGlvbiB7XHJcbiAgbWFyZ2luLWJvdHRvbTogNTBweDsgLyogQXVtZW50YXIgZWwgZXNwYWNpbyBpbmZlcmlvciAqL1xyXG59XHJcblxyXG4vKiBFc3RpbG9zIHBhcmEgbG9zIGNvbnRyb2xlcyBkZWwgY2Fyb3VzZWwgKi9cclxuOmhvc3QgOjpuZy1kZWVwIC5jYXJvdXNlbC1jb250cm9sLXByZXYtaWNvbixcclxuOmhvc3QgOjpuZy1kZWVwIC5jYXJvdXNlbC1jb250cm9sLW5leHQtaWNvbiB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBwYWRkaW5nOiAxMHB4O1xyXG59XHJcblxyXG46aG9zdCA6Om5nLWRlZXAgLmNhcm91c2VsLWluZGljYXRvcnMgbGkge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcclxuICBoZWlnaHQ6IDEwcHg7XHJcbiAgd2lkdGg6IDEwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIG1hcmdpbjogMCA1cHg7XHJcbn1cclxuXHJcbjpob3N0IDo6bmctZGVlcCAuY2Fyb3VzZWwtaW5kaWNhdG9ycyAuYWN0aXZlIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBjNmZmO1xyXG59XHJcblxyXG46aG9zdCA6Om5nLWRlZXAgLmNhcm91c2VsIHtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICB3aWR0aDogMTAwJTtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG59XHJcblxyXG4vKiBFc3RpbG9zIHBhcmEgbGEgc2VjY2nDg8KzbiBkZSB1c3VhcmlvICovXHJcbi51c2VyLXNlY3Rpb24ge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmOGY5ZmE7XHJcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICBwYWRkaW5nOiAxLjVyZW07XHJcbiAgbWFyZ2luOiAycmVtIGF1dG8gNHJlbTtcclxuICBtYXgtd2lkdGg6IDgwMHB4O1xyXG4gIGJveC1zaGFkb3c6IDAgMnB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjA1KTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCAjMDA3MmZmO1xyXG59XHJcblxyXG4udXNlci1zZWN0aW9uIGgyIHtcclxuICBmb250LXNpemU6IDEuNHJlbTtcclxuICBjb2xvcjogIzMzMztcclxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG59XHJcblxyXG4udXNlci1zZWN0aW9uIGgzIHtcclxuICBmb250LXNpemU6IDEuMnJlbTtcclxuICBjb2xvcjogIzU1NTtcclxuICBtYXJnaW46IDFyZW0gMDtcclxufVxyXG5cclxuLnVzZXItc2VjdGlvbiBwIHtcclxuICBjb2xvcjogIzY2NjtcclxuICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XHJcbn1cclxuXHJcbi51c2VyLXNlY3Rpb24gdWwge1xyXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgcGFkZGluZzogMDtcclxuICBtYXJnaW46IDFyZW0gMDtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgdGV4dC1hbGlnbjogbGVmdDtcclxufVxyXG5cclxuLnVzZXItc2VjdGlvbiBsaSB7XHJcbiAgcGFkZGluZzogMC41cmVtIDA7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlZWU7XHJcbiAgY29sb3I6ICM1NTU7XHJcbn1cclxuXHJcbi51c2VyLXNlY3Rpb24gbGk6bGFzdC1jaGlsZCB7XHJcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTtcclxufVxyXG5cclxuLnVzZXItc2VjdGlvbiAuYnRuLXByaW1hcnkge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDcyZmY7XHJcbiAgbWFyZ2luLXRvcDogMC41cmVtO1xyXG59XHJcblxyXG4vKiBSZXNwb25zaXZlIHN0eWxlcyAqL1xyXG5AbWVkaWEgKG1heC13aWR0aDogMTIwMHB4KSB7XHJcbiAgLmFpLWNhcmQge1xyXG4gICAgZmxleDogMCAwIGNhbGMoNTAlIC0gMnJlbSk7XHJcbiAgfVxyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogOTkycHgpIHtcclxuICAucHJvY2Vzcy1pdGVtLCAucGxhbi1jYXJkIHtcclxuICAgIGZsZXg6IDAgMCBjYWxjKDUwJSAtIDJyZW0pO1xyXG4gIH1cclxuXHJcbiAgLmFpLWNhcmQge1xyXG4gICAgZmxleDogMCAwIGNhbGMoNTAlIC0gMnJlbSk7XHJcbiAgfVxyXG5cclxuICAuc2xpZGVyLWltYWdlIHtcclxuICAgIGhlaWdodDogNDAwcHg7XHJcbiAgfVxyXG5cclxuICAudXNlci1zZWN0aW9uIHtcclxuICAgIG1hcmdpbjogMnJlbSAxcmVtIDNyZW07XHJcbiAgICBwYWRkaW5nOiAxLjJyZW07XHJcbiAgfVxyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAuaGVyby1zZWN0aW9uIGgxIHtcclxuICAgIGZvbnQtc2l6ZTogMnJlbTtcclxuICB9XHJcblxyXG4gIC5oZXJvLXNlY3Rpb24gcCB7XHJcbiAgICBmb250LXNpemU6IDFyZW07XHJcbiAgfVxyXG5cclxuICAuc2VjdGlvbi10aXRsZSB7XHJcbiAgICBmb250LXNpemU6IDEuOHJlbTtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSAobWF4LXdpZHRoOiA1NzZweCkge1xyXG4gIC5ob21lLWNvbnRhaW5lciB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gIH1cclxuXHJcbiAgLmhlcm8tc2VjdGlvbiB7XHJcbiAgICBwYWRkaW5nOiAzcmVtIDEuNXJlbTtcclxuICB9XHJcblxyXG4gIC5zZWN0aW9uIHtcclxuICAgIHBhZGRpbmc6IDNyZW0gMS41cmVtO1xyXG4gIH1cclxuXHJcbiAgLnByb2Nlc3MtaXRlbSwgLmFpLWNhcmQsIC5wbGFuLWNhcmQge1xyXG4gICAgZmxleDogMCAwIDEwMCU7XHJcbiAgICBtYXJnaW46IDFyZW0gMDtcclxuICB9XHJcblxyXG4gIC5haS10ZWFtLWNvbnRhaW5lciB7XHJcbiAgICBnYXA6IDEuNXJlbTtcclxuICB9XHJcblxyXG4gIC5haS1jYXJkIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbiAgfVxyXG5cclxuICAuYnRuLXNlY29uZGFyeSB7XHJcbiAgICBtYXJnaW4tbGVmdDogMDtcclxuICAgIG1hcmdpbi10b3A6IDFyZW07XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
      });
    }
  }
  return HomeComponent;
})();

/***/ })

};
;
//# sourceMappingURL=942.js.map