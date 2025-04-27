"use strict";
(self["webpackChunktienda_web_loto_ai"] = self["webpackChunktienda_web_loto_ai"] || []).push([["src_app_pages_pasarela-pago_pasarela-pago_component_ts"],{

/***/ 5423:
/*!****************************************************************!*\
  !*** ./src/app/pages/pasarela-pago/pasarela-pago.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PasarelaPagoComponent: () => (/* binding */ PasarelaPagoComponent)
/* harmony export */ });
/* harmony import */ var C_Users_Pedro_Desktop_Proyec_web_loto_ia_tienda_web_lotoAI_1_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_stripe_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/stripe.service */ 3015);
/* harmony import */ var _services_paypal_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/paypal.service */ 7057);













const _c0 = ["paypalButtonContainer"];
function PasarelaPagoComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function PasarelaPagoComponent_div_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "div", 43);
  }
}
function PasarelaPagoComponent_div_52_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "div", 43);
  }
}
function PasarelaPagoComponent_div_59_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "div", 43);
  }
}
function PasarelaPagoComponent_div_64_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r1.cardError);
  }
}
function PasarelaPagoComponent_div_64_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 44)(1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "Detalles de la tarjeta");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 45)(4, "label", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "N\u00FAmero de tarjeta");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, PasarelaPagoComponent_div_64_div_7_Template, 2, 1, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 45)(9, "label", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, "Nombre en la tarjeta");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "input", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function PasarelaPagoComponent_div_64_Template_input_ngModelChange_11_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx_r1.cardName, $event) || (ctx_r1.cardName = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.cardError);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.cardName);
  }
}
function PasarelaPagoComponent_div_65_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r1.cardError);
  }
}
function PasarelaPagoComponent_div_65_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 52)(1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "Completa tu pago de forma segura con PayPal:");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "img", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 54)(6, "button", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function PasarelaPagoComponent_div_65_Template_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.redirectToPayPal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](7, "img", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, "Pagar con PayPal");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "p", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11, "Ser\u00E1s redirigido a PayPal para completar tu pago de forma segura.");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](12, PasarelaPagoComponent_div_65_div_12_Template, 2, 1, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.cardError);
  }
}
function PasarelaPagoComponent_div_66_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 60)(1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "Datos bancarios para la transferencia");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "Realiza una transferencia con los siguientes datos:");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "ul")(6, "li")(7, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8, "Beneficiario:");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, " LotoAI Predicciones S.L.");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "li")(11, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12, "IBAN:");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13, " ES12 3456 7890 1234 5678 9012");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "li")(15, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](16, "Concepto:");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "li")(19, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](20, "Importe:");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "p", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](23, "Una vez realizada la transferencia, tu plan se activar\u00E1 en un plazo m\u00E1ximo de 24 horas laborables tras verificar el pago.");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx_r1.referenceNumber, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx_r1.planInfo == null ? null : ctx_r1.planInfo.price, "\u20AC");
  }
}
function PasarelaPagoComponent_li_80_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "i", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const feature_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](feature_r4);
  }
}
class PasarelaPagoComponent {
  constructor(route, router, stripeService, paypalService, http) {
    this.route = route;
    this.router = router;
    this.stripeService = stripeService;
    this.paypalService = paypalService;
    this.http = http;
    this.planId = '';
    this.planInfo = null;
    this.currentDate = new Date();
    this.selectedPaymentMethod = 'card';
    // Campos para tarjeta
    this.cardName = '';
    this.cardError = '';
    this.isLoading = false;
    // Elementos de Stripe
    this.elements = null;
    this.cardElement = null;
    this.paymentIntentId = '';
    this.clientSecret = '';
    this.subscription = null;
    // Número de referencia para transferencia
    this.referenceNumber = 'REF-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    // Planes disponibles
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
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.planId = params['plan'];
      this.loadPlanInfo();
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  loadPlanInfo() {
    const plan = this.planes.find(p => p.id === this.planId);
    if (plan) {
      this.planInfo = plan;
      if (this.selectedPaymentMethod === 'card') {
        this.initStripe();
      }
    } else {
      // Si no se encuentra el plan, redirigir a la página de planes
      this.router.navigate(['/planes']);
    }
  }
  ngAfterViewInit() {
    // Inicializar PayPal si es el método seleccionado
    if (this.selectedPaymentMethod === 'paypal' && this.planInfo) {
      this.initPayPal();
    }
  }
  initStripe() {
    var _this = this;
    return (0,C_Users_Pedro_Desktop_Proyec_web_loto_ia_tienda_web_lotoAI_1_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this.selectedPaymentMethod === 'card') {
        try {
          console.log('Inicializando Stripe...');
          _this.elements = yield _this.stripeService.createElements();
          if (_this.elements) {
            console.log('Elementos de Stripe creados correctamente');
            _this.cardElement = _this.elements.create('card', {
              style: {
                base: {
                  fontSize: '16px',
                  color: '#32325d',
                  fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                  '::placeholder': {
                    color: '#aab7c4'
                  }
                },
                invalid: {
                  color: '#e74c3c',
                  iconColor: '#e74c3c'
                }
              }
            });
            console.log('Elemento de tarjeta creado:', _this.cardElement);
            // Asegurarse de que el elemento DOM existe antes de montar
            setTimeout(() => {
              const cardElementContainer = document.getElementById('card-element');
              if (!cardElementContainer) {
                console.error('No se encontró el contenedor #card-element en el DOM');
                _this.cardError = 'Error al inicializar el formulario de pago';
                return;
              }
              if (_this.cardElement) {
                console.log('Montando elemento de tarjeta en el DOM');
                _this.cardElement.mount('#card-element');
                _this.cardElement.on('change', event => {
                  console.log('Evento de cambio en la tarjeta:', event);
                  _this.cardError = event.error ? event.error.message : '';
                });
                console.log('Elemento de tarjeta montado correctamente');
              } else {
                console.error('El elemento de tarjeta es nulo');
                _this.cardError = 'Error al crear el elemento de tarjeta';
              }
            }, 300); // Aumentamos el tiempo para asegurar que el DOM está listo
          } else {
            console.error('No se pudieron crear los elementos de Stripe');
            _this.cardError = 'Error al inicializar el formulario de pago';
          }
        } catch (error) {
          console.error('Error al inicializar Stripe:', error);
          _this.cardError = 'Error al conectar con el procesador de pagos';
        }
      }
    })();
  }
  selectPaymentMethod(method) {
    console.log('Método de pago seleccionado:', method);
    this.selectedPaymentMethod = method;
    this.cardError = ''; // Limpiar errores anteriores
    if (method === 'card') {
      // Dar tiempo al DOM para actualizarse antes de inicializar Stripe
      setTimeout(() => {
        this.initStripe();
      }, 100);
    } else if (method === 'paypal') {
      // Dar tiempo al DOM para actualizarse antes de inicializar PayPal
      setTimeout(() => {
        this.initPayPal();
      }, 100);
    }
  }
  processPay() {
    if (!this.planInfo) {
      this.cardError = 'No se ha seleccionado ningún plan';
      return;
    }
    this.isLoading = true;
    switch (this.selectedPaymentMethod) {
      case 'card':
        this.processCardPayment();
        break;
      case 'paypal':
        this.processPayPalPayment();
        break;
      case 'transfer':
        this.processTransferPayment();
        break;
      default:
        this.isLoading = false;
        this.cardError = 'Método de pago no válido';
    }
  }
  processCardPayment() {
    if (!this.planInfo) return;
    if (!this.cardElement) {
      this.cardError = 'Error: El elemento de tarjeta no está inicializado';
      this.isLoading = false;
      return;
    }
    // Obtener el ID del usuario si está autenticado
    const userId = this.getUserId();
    // Primero crear un PaymentIntent
    this.stripeService.createPaymentIntent(this.planInfo.price * 100, this.planId, userId).subscribe({
      next: paymentIntent => {
        this.paymentIntentId = paymentIntent.id;
        this.clientSecret = paymentIntent.clientSecret;
        // Luego confirmar el pago con los datos de la tarjeta
        if (this.cardElement) {
          this.stripeService.confirmCardPayment(this.clientSecret, this.cardElement).subscribe({
            next: result => {
              this.isLoading = false;
              if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
                // Notificar al servidor que el pago fue exitoso
                // Usamos el ID del PaymentIntent que ya fue confirmado
                this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.apiUrl}/payments/confirm-payment`, {
                  paymentIntentId: result.paymentIntent.id,
                  userId,
                  planId: this.planId
                }).subscribe({
                  next: finalResult => {
                    if (finalResult.success) {
                      this.navigateToConfirmation();
                    } else {
                      this.cardError = 'Error al finalizar el proceso de pago';
                    }
                  },
                  error: error => {
                    this.cardError = 'Error al finalizar el proceso: ' + (error.message || 'Intente nuevamente');
                  }
                });
              } else if (result.error) {
                this.cardError = result.error.message || 'Error al procesar el pago';
              }
            },
            error: error => {
              this.isLoading = false;
              this.cardError = 'Error al confirmar el pago: ' + (error.message || 'Intente nuevamente');
            }
          });
        } else {
          this.isLoading = false;
          this.cardError = 'Error: El elemento de tarjeta no está disponible';
        }
      },
      error: error => {
        this.isLoading = false;
        this.cardError = 'Error al iniciar el pago: ' + (error.message || 'Intente nuevamente');
      }
    });
  }
  /**
   * Inicializa el botón de PayPal
   * Este método se mantiene para compatibilidad con el código existente
   * pero ya no se usa con la nueva implementación
   */
  initPayPal() {
    // Ya no necesitamos inicializar PayPal con el SDK
    // Ahora usamos un botón personalizado que redirecciona directamente a PayPal
    if (!this.planInfo) return;
    // Limpiar cualquier mensaje de error anterior
    this.cardError = '';
  }
  /**
   * Maneja el éxito del pago con PayPal
   * Este método se mantiene para compatibilidad con el código existente
   * pero ya no se usa directamente con la nueva implementación
   */
  onPayPalPaymentSuccess(orderId) {
    if (!this.planInfo) return;
    this.isLoading = true;
    console.log('Pago con PayPal exitoso, ID de orden:', orderId);
    // En un entorno de producción, aquí se comunicaría con el backend
    // para registrar el pago y activar la suscripción
    // Simulamos un procesamiento exitoso
    setTimeout(() => {
      this.isLoading = false;
      this.navigateToConfirmation();
    }, 1500);
  }
  /**
   * Procesa un pago con PayPal
   */
  processPayPalPayment() {
    if (!this.planInfo) return;
    this.isLoading = false;
    // Mostrar un mensaje al usuario para que haga clic en el botón de PayPal
    this.cardError = 'Por favor, haz clic en el botón de PayPal para completar tu pago.';
  }
  /**
   * Redirecciona al usuario a PayPal para completar el pago
   */
  redirectToPayPal() {
    if (!this.planInfo) {
      this.cardError = 'Error: No se pudo cargar la información del plan';
      return;
    }
    this.isLoading = true;
    this.cardError = 'Redirigiendo a PayPal...';
    // Construir la URL de PayPal para pago directo - versión más simple
    const amount = this.planInfo.price;
    const planName = encodeURIComponent(this.planInfo.name);
    // Usar la URL de PayPal.me que es más sencilla y directa
    // Esta URL redirecciona al usuario a PayPal para completar el pago
    const paypalUrl = `https://www.paypal.com/paypalme/lotoIA/${amount}EUR`;
    console.log('Redirigiendo a PayPal con URL:', paypalUrl);
    // Redireccionar a PayPal
    setTimeout(() => {
      window.location.href = paypalUrl;
    }, 1000);
  }
  processTransferPayment() {
    if (!this.planInfo) return;
    // Obtener el ID del usuario si está autenticado
    const userId = this.getUserId();
    // Procesar el pago por transferencia
    this.subscription = this.stripeService.processTransferPayment(this.planId, this.referenceNumber, userId).subscribe({
      next: result => {
        this.isLoading = false;
        if (result.success) {
          this.navigateToConfirmation();
        } else {
          this.cardError = 'Error al registrar la transferencia';
        }
      },
      error: error => {
        this.isLoading = false;
        this.cardError = 'Error al registrar la transferencia: ' + (error.message || 'Intente nuevamente');
      }
    });
  }
  // Método para obtener el ID del usuario actual
  getUserId() {
    // Aquí deberías implementar la lógica para obtener el ID del usuario autenticado
    // Por ejemplo, desde un servicio de autenticación
    return undefined; // Por ahora devolvemos undefined
  }
  navigateToConfirmation() {
    // Redirigir a la página de confirmación correspondiente
    switch (this.planId) {
      case 'basic':
        this.router.navigate(['/confirmacion-plan-basico']);
        break;
      case 'monthly':
        this.router.navigate(['/confirmacion-plan-mensual']);
        break;
      case 'pro':
        this.router.navigate(['/confirmacion-plan-pro']);
        break;
      default:
        console.error('Plan no reconocido');
    }
  }
  static {
    this.ɵfac = function PasarelaPagoComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || PasarelaPagoComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_stripe_service__WEBPACK_IMPORTED_MODULE_2__.StripeService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_paypal_service__WEBPACK_IMPORTED_MODULE_3__.PaypalService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
      type: PasarelaPagoComponent,
      selectors: [["app-pasarela-pago"]],
      viewQuery: function PasarelaPagoComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_c0, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.paypalButtonContainer = _t.first);
        }
      },
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵStandaloneFeature"]],
      decls: 89,
      vars: 22,
      consts: [[1, "pasarela-container"], ["class", "loading-overlay", 4, "ngIf"], [1, "breadcrumb"], ["routerLink", "/"], ["routerLink", "/planes"], [1, "pasarela-content"], [1, "pasarela-header"], [1, "subtitle"], [1, "pasarela-grid"], [1, "payment-details"], [1, "order-summary"], [1, "summary-card"], [1, "summary-row"], [1, "summary-label"], [1, "summary-value"], [1, "payment-methods"], [1, "payment-options"], [1, "payment-option", 3, "click"], [1, "option-radio"], ["class", "radio-inner", 4, "ngIf"], [1, "option-icon"], [1, "fas", "fa-credit-card"], [1, "option-label"], [1, "fab", "fa-paypal"], [1, "fas", "fa-university"], ["class", "card-details", 4, "ngIf"], ["class", "paypal-details", 4, "ngIf"], ["class", "transfer-details", 4, "ngIf"], [1, "payment-actions"], ["routerLink", "/planes", 1, "back-btn"], [1, "pay-btn", 3, "click"], [1, "plan-features"], [1, "plan-description"], [1, "features-list"], [4, "ngFor", "ngForOf"], [1, "secure-payment"], [1, "fas", "fa-lock"], [1, "payment-logos"], ["src", "assets/img/visa.png", "alt", "Visa"], ["src", "assets/img/mastercard.png", "alt", "Mastercard"], ["src", "assets/img/paypal.png", "alt", "PayPal"], [1, "loading-overlay"], [1, "loading-spinner"], [1, "radio-inner"], [1, "card-details"], [1, "form-group"], ["for", "cardNumber"], ["id", "card-element", 1, "stripe-element"], ["id", "card-errors", "class", "error-message", 4, "ngIf"], ["for", "cardName"], ["type", "text", "id", "cardName", "placeholder", "NOMBRE APELLIDOS", 3, "ngModelChange", "ngModel"], ["id", "card-errors", 1, "error-message"], [1, "paypal-details"], [1, "paypal-logo"], [1, "paypal-custom-button"], [1, "paypal-direct-button", 3, "click"], ["src", "assets/img/paypal.png", "alt", "PayPal", 1, "paypal-button-img"], [1, "paypal-info"], ["class", "error-message", 4, "ngIf"], [1, "error-message"], [1, "transfer-details"], [1, "note"], [1, "fas", "fa-check"]],
      template: function PasarelaPagoComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, PasarelaPagoComponent_div_1_Template, 2, 0, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 2)(3, "a", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "Inicio");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, " > ");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "a", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, "Planes");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8, " > ");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, "Pasarela de Pago");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "div", 5)(12, "div", 6)(13, "h1");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](14, "Completar tu compra");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "p", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](16, "Est\u00E1s a un paso de mejorar tus probabilidades de ganar");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "div", 8)(18, "div", 9)(19, "div", 10)(20, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](21, "Resumen del pedido");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "div", 11)(23, "div", 12)(24, "span", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](25, "Plan:");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](26, "span", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](27);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](28, "div", 12)(29, "span", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](30, "Precio:");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](31, "span", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](32);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](33, "div", 12)(34, "span", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](35, "Fecha:");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](36, "span", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](37);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](38, "date");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](39, "div", 15)(40, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](41, "M\u00E9todo de pago");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](42, "div", 16)(43, "div", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function PasarelaPagoComponent_Template_div_click_43_listener() {
            return ctx.selectPaymentMethod("card");
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](44, "div", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](45, PasarelaPagoComponent_div_45_Template, 1, 0, "div", 19);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](46, "div", 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](47, "i", 21);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](48, "div", 22);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](49, "Tarjeta de cr\u00E9dito/d\u00E9bito");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](50, "div", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function PasarelaPagoComponent_Template_div_click_50_listener() {
            return ctx.selectPaymentMethod("paypal");
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](51, "div", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](52, PasarelaPagoComponent_div_52_Template, 1, 0, "div", 19);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](53, "div", 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](54, "i", 23);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](55, "div", 22);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](56, "PayPal");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](57, "div", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function PasarelaPagoComponent_Template_div_click_57_listener() {
            return ctx.selectPaymentMethod("transfer");
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](58, "div", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](59, PasarelaPagoComponent_div_59_Template, 1, 0, "div", 19);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](60, "div", 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](61, "i", 24);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](62, "div", 22);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](63, "Transferencia bancaria");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](64, PasarelaPagoComponent_div_64_Template, 12, 2, "div", 25)(65, PasarelaPagoComponent_div_65_Template, 13, 1, "div", 26)(66, PasarelaPagoComponent_div_66_Template, 24, 2, "div", 27);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](67, "div", 28)(68, "button", 29);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](69, "Volver");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](70, "button", 30);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function PasarelaPagoComponent_Template_button_click_70_listener() {
            return ctx.processPay();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](71, "Pagar ahora");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](72, "div", 31)(73, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](74);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](75, "p", 32);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](76);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](77, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](78, "Caracter\u00EDsticas incluidas:");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](79, "ul", 33);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](80, PasarelaPagoComponent_li_80_Template, 4, 1, "li", 34);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](81, "div", 35);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](82, "i", 36);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](83, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](84, "Pago 100% seguro");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](85, "div", 37);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](86, "img", 38)(87, "img", 39)(88, "img", 40);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.isLoading);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](26);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.planInfo == null ? null : ctx.planInfo.name);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", ctx.planInfo == null ? null : ctx.planInfo.price, "\u20AC (IVA incluido)");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](38, 19, ctx.currentDate, "dd/MM/yyyy"));
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("selected", ctx.selectedPaymentMethod === "card");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.selectedPaymentMethod === "card");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("selected", ctx.selectedPaymentMethod === "paypal");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.selectedPaymentMethod === "paypal");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("selected", ctx.selectedPaymentMethod === "transfer");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.selectedPaymentMethod === "transfer");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.selectedPaymentMethod === "card");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.selectedPaymentMethod === "paypal");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.selectedPaymentMethod === "transfer");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.planInfo == null ? null : ctx.planInfo.name);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.planInfo == null ? null : ctx.planInfo.description);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.planInfo == null ? null : ctx.planInfo.features);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.DatePipe, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgModel, _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClientModule],
      styles: [".pasarela-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 30px 20px;\n  font-family: 'Roboto', sans-serif;\n}\n\n.breadcrumb[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n  font-size: 14px;\n  color: #666;\n}\n\n.breadcrumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  text-decoration: none;\n}\n\n.breadcrumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n\n.pasarela-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 40px;\n}\n\n.pasarela-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 32px;\n  color: #333;\n  margin-bottom: 10px;\n}\n\n.subtitle[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #666;\n}\n\n.pasarela-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 350px;\n  gap: 30px;\n}\n\n.payment-details[_ngcontent-%COMP%] {\n  background-color: #fff;\n  border-radius: 8px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n  padding: 30px;\n}\n\n.order-summary[_ngcontent-%COMP%] {\n  margin-bottom: 30px;\n}\n\n.order-summary[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.payment-methods[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #333;\n  margin-bottom: 15px;\n}\n\n.summary-card[_ngcontent-%COMP%] {\n  background-color: #f9f9f9;\n  border-radius: 8px;\n  padding: 20px;\n}\n\n.summary-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 10px;\n}\n\n.summary-row[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n\n.summary-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #666;\n}\n\n.summary-value[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #333;\n}\n\n.payment-options[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n  margin-bottom: 30px;\n}\n\n.payment-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 15px;\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n\n.payment-option[_ngcontent-%COMP%]:hover {\n  border-color: #0a7abf;\n}\n\n.payment-option.selected[_ngcontent-%COMP%] {\n  border-color: #0a7abf;\n  background-color: rgba(10, 122, 191, 0.05);\n}\n\n.option-radio[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  border: 2px solid #ddd;\n  border-radius: 50%;\n  margin-right: 15px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.payment-option.selected[_ngcontent-%COMP%]   .option-radio[_ngcontent-%COMP%] {\n  border-color: #0a7abf;\n}\n\n.radio-inner[_ngcontent-%COMP%] {\n  width: 10px;\n  height: 10px;\n  background-color: #0a7abf;\n  border-radius: 50%;\n}\n\n.option-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #666;\n  margin-right: 15px;\n}\n\n.option-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #333;\n}\n\n.card-details[_ngcontent-%COMP%], \n.paypal-details[_ngcontent-%COMP%], \n.transfer-details[_ngcontent-%COMP%] {\n  margin-bottom: 30px;\n}\n\n.card-details[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.transfer-details[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #333;\n  margin-bottom: 15px;\n}\n\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 15px;\n}\n\n.form-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 15px;\n}\n\n.form-row[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\nlabel[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  color: #666;\n  margin-bottom: 5px;\n}\n\ninput[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 16px;\n}\n\ninput[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #0a7abf;\n}\n\n.stripe-element[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  background-color: white;\n  height: 40px;\n}\n\n.error-message[_ngcontent-%COMP%] {\n  color: #e74c3c;\n  font-size: 14px;\n  margin-top: 5px;\n}\n\n.loading-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n}\n\n.loading-spinner[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  border: 5px solid #f3f3f3;\n  border-top: 5px solid #0a7abf;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n\n@keyframes _ngcontent-%COMP%_spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n\n.paypal-details[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-bottom: 15px;\n  color: #666;\n}\n\n.paypal-logo[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\n.paypal-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  max-width: 150px;\n}\n\n.paypal-custom-button[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: 20px auto;\n  max-width: 350px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.paypal-direct-button[_ngcontent-%COMP%] {\n  background-color: #0070ba;\n  color: white;\n  border: none;\n  border-radius: 25px;\n  padding: 12px 24px;\n  font-size: 16px;\n  font-weight: bold;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  max-width: 300px;\n  transition: background-color 0.3s ease;\n}\n\n.paypal-direct-button[_ngcontent-%COMP%]:hover {\n  background-color: #005ea6;\n}\n\n.paypal-button-img[_ngcontent-%COMP%] {\n  height: 24px;\n  margin-right: 10px;\n}\n\n.paypal-info[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  font-size: 14px;\n  color: #666;\n  text-align: center;\n}\n\n.transfer-details[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin-bottom: 15px;\n}\n\n.transfer-details[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n  color: #666;\n}\n\n.note[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #666;\n  font-style: italic;\n}\n\n.payment-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 15px;\n}\n\n.back-btn[_ngcontent-%COMP%], \n.pay-btn[_ngcontent-%COMP%] {\n  padding: 12px 20px;\n  border: none;\n  border-radius: 4px;\n  font-size: 16px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n}\n\n.back-btn[_ngcontent-%COMP%] {\n  background-color: #f2f2f2;\n  color: #666;\n}\n\n.back-btn[_ngcontent-%COMP%]:hover {\n  background-color: #e6e6e6;\n}\n\n.pay-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  background-color: #0a7abf;\n  color: white;\n}\n\n.pay-btn[_ngcontent-%COMP%]:hover {\n  background-color: #086494;\n}\n\n.plan-features[_ngcontent-%COMP%] {\n  background-color: #f9f9f9;\n  border-radius: 8px;\n  padding: 30px;\n  align-self: start;\n}\n\n.plan-features[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: #333;\n  margin-bottom: 10px;\n}\n\n.plan-description[_ngcontent-%COMP%] {\n  color: #666;\n  margin-bottom: 20px;\n}\n\n.plan-features[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #333;\n  margin-bottom: 15px;\n}\n\n.features-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin-bottom: 30px;\n}\n\n.features-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  margin-bottom: 10px;\n  color: #666;\n}\n\n.features-list[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  margin-right: 10px;\n  margin-top: 3px;\n}\n\n.secure-payment[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 15px;\n  color: #666;\n}\n\n.secure-payment[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  margin-right: 10px;\n}\n\n.payment-logos[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n}\n\n.payment-logos[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  height: 30px;\n  object-fit: contain;\n}\n\n\n\n@media (max-width: 992px) {\n  .pasarela-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .plan-features[_ngcontent-%COMP%] {\n    order: -1;\n    margin-bottom: 30px;\n  }\n}\n\n@media (max-width: 768px) {\n  .form-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0;\n  }\n\n  .payment-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .back-btn[_ngcontent-%COMP%] {\n    order: 2;\n  }\n\n  .pay-btn[_ngcontent-%COMP%] {\n    order: 1;\n    margin-bottom: 10px;\n  }\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvcGFzYXJlbGEtcGFnby9wYXNhcmVsYS1wYWdvLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBaUI7RUFDakIsY0FBYztFQUNkLGtCQUFrQjtFQUNsQixpQ0FBaUM7QUFDbkM7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsZUFBZTtFQUNmLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSwwQkFBMEI7QUFDNUI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLFdBQVc7RUFDWCxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsV0FBVztBQUNiOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGdDQUFnQztFQUNoQyxTQUFTO0FBQ1g7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsa0JBQWtCO0VBQ2xCLHlDQUF5QztFQUN6QyxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7O0VBRUUsZUFBZTtFQUNmLFdBQVc7RUFDWCxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsa0JBQWtCO0VBQ2xCLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLFNBQVM7RUFDVCxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsMENBQTBDO0FBQzVDOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixzQkFBc0I7RUFDdEIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1oseUJBQXlCO0VBQ3pCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixXQUFXO0VBQ1gsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLFdBQVc7QUFDYjs7QUFFQTs7O0VBR0UsbUJBQW1CO0FBQ3JCOztBQUVBOztFQUVFLGVBQWU7RUFDZixXQUFXO0VBQ1gsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFNBQVM7QUFDWDs7QUFFQTtFQUNFLE9BQU87QUFDVDs7QUFFQTtFQUNFLGNBQWM7RUFDZCxlQUFlO0VBQ2YsV0FBVztFQUNYLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQix1QkFBdUI7RUFDdkIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsY0FBYztFQUNkLGVBQWU7RUFDZixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLE1BQU07RUFDTixPQUFPO0VBQ1AsV0FBVztFQUNYLFlBQVk7RUFDWixvQ0FBb0M7RUFDcEMsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsYUFBYTtBQUNmOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWix5QkFBeUI7RUFDekIsNkJBQTZCO0VBQzdCLGtCQUFrQjtFQUNsQixrQ0FBa0M7QUFDcEM7O0FBRUE7RUFDRSxLQUFLLHVCQUF1QixFQUFFO0VBQzlCLE9BQU8seUJBQXlCLEVBQUU7QUFDcEM7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsV0FBVztBQUNiOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGlCQUFpQjtFQUNqQixnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsWUFBWTtFQUNaLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsZUFBZTtFQUNmLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLFdBQVc7RUFDWCxnQkFBZ0I7RUFDaEIsc0NBQXNDO0FBQ3hDOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsV0FBVztFQUNYLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixVQUFVO0VBQ1YsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGVBQWU7RUFDZixXQUFXO0VBQ1gsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFNBQVM7QUFDWDs7QUFFQTs7RUFFRSxrQkFBa0I7RUFDbEIsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixzQ0FBc0M7QUFDeEM7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsV0FBVztBQUNiOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsT0FBTztFQUNQLHlCQUF5QjtFQUN6QixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsV0FBVztFQUNYLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsV0FBVztFQUNYLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixVQUFVO0VBQ1YsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsV0FBVztBQUNiOztBQUVBO0VBQ0UsY0FBYztFQUNkLGtCQUFrQjtFQUNsQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIsV0FBVztBQUNiOztBQUVBO0VBQ0UsY0FBYztFQUNkLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixTQUFTO0VBQ1QsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLG1CQUFtQjtBQUNyQjs7QUFFQSxzQkFBc0I7QUFDdEI7RUFDRTtJQUNFLDBCQUEwQjtFQUM1Qjs7RUFFQTtJQUNFLFNBQVM7SUFDVCxtQkFBbUI7RUFDckI7QUFDRjs7QUFFQTtFQUNFO0lBQ0Usc0JBQXNCO0lBQ3RCLE1BQU07RUFDUjs7RUFFQTtJQUNFLHNCQUFzQjtFQUN4Qjs7RUFFQTtJQUNFLFFBQVE7RUFDVjs7RUFFQTtJQUNFLFFBQVE7SUFDUixtQkFBbUI7RUFDckI7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5wYXNhcmVsYS1jb250YWluZXIge1xyXG4gIG1heC13aWR0aDogMTIwMHB4O1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG4gIHBhZGRpbmc6IDMwcHggMjBweDtcclxuICBmb250LWZhbWlseTogJ1JvYm90bycsIHNhbnMtc2VyaWY7XHJcbn1cclxuXHJcbi5icmVhZGNydW1iIHtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBjb2xvcjogIzY2NjtcclxufVxyXG5cclxuLmJyZWFkY3J1bWIgYSB7XHJcbiAgY29sb3I6ICMwYTdhYmY7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG59XHJcblxyXG4uYnJlYWRjcnVtYiBhOmhvdmVyIHtcclxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcclxufVxyXG5cclxuLnBhc2FyZWxhLWhlYWRlciB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XHJcbn1cclxuXHJcbi5wYXNhcmVsYS1oZWFkZXIgaDEge1xyXG4gIGZvbnQtc2l6ZTogMzJweDtcclxuICBjb2xvcjogIzMzMztcclxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4uc3VidGl0bGUge1xyXG4gIGZvbnQtc2l6ZTogMThweDtcclxuICBjb2xvcjogIzY2NjtcclxufVxyXG5cclxuLnBhc2FyZWxhLWdyaWQge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMzUwcHg7XHJcbiAgZ2FwOiAzMHB4O1xyXG59XHJcblxyXG4ucGF5bWVudC1kZXRhaWxzIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBib3gtc2hhZG93OiAwIDJweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICBwYWRkaW5nOiAzMHB4O1xyXG59XHJcblxyXG4ub3JkZXItc3VtbWFyeSB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcclxufVxyXG5cclxuLm9yZGVyLXN1bW1hcnkgaDIsXHJcbi5wYXltZW50LW1ldGhvZHMgaDIge1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxuICBjb2xvcjogIzMzMztcclxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xyXG59XHJcblxyXG4uc3VtbWFyeS1jYXJkIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBwYWRkaW5nOiAyMHB4O1xyXG59XHJcblxyXG4uc3VtbWFyeS1yb3cge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbn1cclxuXHJcbi5zdW1tYXJ5LXJvdzpsYXN0LWNoaWxkIHtcclxuICBtYXJnaW4tYm90dG9tOiAwO1xyXG59XHJcblxyXG4uc3VtbWFyeS1sYWJlbCB7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBjb2xvcjogIzY2NjtcclxufVxyXG5cclxuLnN1bW1hcnktdmFsdWUge1xyXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgY29sb3I6ICMzMzM7XHJcbn1cclxuXHJcbi5wYXltZW50LW9wdGlvbnMge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBnYXA6IDE1cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcclxufVxyXG5cclxuLnBheW1lbnQtb3B0aW9uIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgcGFkZGluZzogMTVweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcclxufVxyXG5cclxuLnBheW1lbnQtb3B0aW9uOmhvdmVyIHtcclxuICBib3JkZXItY29sb3I6ICMwYTdhYmY7XHJcbn1cclxuXHJcbi5wYXltZW50LW9wdGlvbi5zZWxlY3RlZCB7XHJcbiAgYm9yZGVyLWNvbG9yOiAjMGE3YWJmO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTAsIDEyMiwgMTkxLCAwLjA1KTtcclxufVxyXG5cclxuLm9wdGlvbi1yYWRpbyB7XHJcbiAgd2lkdGg6IDIwcHg7XHJcbiAgaGVpZ2h0OiAyMHB4O1xyXG4gIGJvcmRlcjogMnB4IHNvbGlkICNkZGQ7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIG1hcmdpbi1yaWdodDogMTVweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbi5wYXltZW50LW9wdGlvbi5zZWxlY3RlZCAub3B0aW9uLXJhZGlvIHtcclxuICBib3JkZXItY29sb3I6ICMwYTdhYmY7XHJcbn1cclxuXHJcbi5yYWRpby1pbm5lciB7XHJcbiAgd2lkdGg6IDEwcHg7XHJcbiAgaGVpZ2h0OiAxMHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwYTdhYmY7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG59XHJcblxyXG4ub3B0aW9uLWljb24ge1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxuICBjb2xvcjogIzY2NjtcclxuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XHJcbn1cclxuXHJcbi5vcHRpb24tbGFiZWwge1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgY29sb3I6ICMzMzM7XHJcbn1cclxuXHJcbi5jYXJkLWRldGFpbHMsXHJcbi5wYXlwYWwtZGV0YWlscyxcclxuLnRyYW5zZmVyLWRldGFpbHMge1xyXG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XHJcbn1cclxuXHJcbi5jYXJkLWRldGFpbHMgaDMsXHJcbi50cmFuc2Zlci1kZXRhaWxzIGgzIHtcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiAgY29sb3I6ICMzMzM7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcclxufVxyXG5cclxuLmZvcm0tZ3JvdXAge1xyXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbn1cclxuXHJcbi5mb3JtLXJvdyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBnYXA6IDE1cHg7XHJcbn1cclxuXHJcbi5mb3JtLXJvdyAuZm9ybS1ncm91cCB7XHJcbiAgZmxleDogMTtcclxufVxyXG5cclxubGFiZWwge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBjb2xvcjogIzY2NjtcclxuICBtYXJnaW4tYm90dG9tOiA1cHg7XHJcbn1cclxuXHJcbmlucHV0IHtcclxuICB3aWR0aDogMTAwJTtcclxuICBwYWRkaW5nOiAxMnB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxufVxyXG5cclxuaW5wdXQ6Zm9jdXMge1xyXG4gIG91dGxpbmU6IG5vbmU7XHJcbiAgYm9yZGVyLWNvbG9yOiAjMGE3YWJmO1xyXG59XHJcblxyXG4uc3RyaXBlLWVsZW1lbnQge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIHBhZGRpbmc6IDEycHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcclxuICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgaGVpZ2h0OiA0MHB4O1xyXG59XHJcblxyXG4uZXJyb3ItbWVzc2FnZSB7XHJcbiAgY29sb3I6ICNlNzRjM2M7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIG1hcmdpbi10b3A6IDVweDtcclxufVxyXG5cclxuLmxvYWRpbmctb3ZlcmxheSB7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIHRvcDogMDtcclxuICBsZWZ0OiAwO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHotaW5kZXg6IDEwMDA7XHJcbn1cclxuXHJcbi5sb2FkaW5nLXNwaW5uZXIge1xyXG4gIHdpZHRoOiA1MHB4O1xyXG4gIGhlaWdodDogNTBweDtcclxuICBib3JkZXI6IDVweCBzb2xpZCAjZjNmM2YzO1xyXG4gIGJvcmRlci10b3A6IDVweCBzb2xpZCAjMGE3YWJmO1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBhbmltYXRpb246IHNwaW4gMXMgbGluZWFyIGluZmluaXRlO1xyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIHNwaW4ge1xyXG4gIDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cclxuICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfVxyXG59XHJcblxyXG4ucGF5cGFsLWRldGFpbHMgcCB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcclxuICBjb2xvcjogIzY2NjtcclxufVxyXG5cclxuLnBheXBhbC1sb2dvIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5wYXlwYWwtbG9nbyBpbWcge1xyXG4gIG1heC13aWR0aDogMTUwcHg7XHJcbn1cclxuXHJcbi5wYXlwYWwtY3VzdG9tLWJ1dHRvbiB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWFyZ2luOiAyMHB4IGF1dG87XHJcbiAgbWF4LXdpZHRoOiAzNTBweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuLnBheXBhbC1kaXJlY3QtYnV0dG9uIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA3MGJhO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgYm9yZGVyLXJhZGl1czogMjVweDtcclxuICBwYWRkaW5nOiAxMnB4IDI0cHg7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWF4LXdpZHRoOiAzMDBweDtcclxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3MgZWFzZTtcclxufVxyXG5cclxuLnBheXBhbC1kaXJlY3QtYnV0dG9uOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA1ZWE2O1xyXG59XHJcblxyXG4ucGF5cGFsLWJ1dHRvbi1pbWcge1xyXG4gIGhlaWdodDogMjRweDtcclxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbn1cclxuXHJcbi5wYXlwYWwtaW5mbyB7XHJcbiAgbWFyZ2luLXRvcDogMTBweDtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgY29sb3I6ICM2NjY7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4udHJhbnNmZXItZGV0YWlscyB1bCB7XHJcbiAgbGlzdC1zdHlsZTogbm9uZTtcclxuICBwYWRkaW5nOiAwO1xyXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbn1cclxuXHJcbi50cmFuc2Zlci1kZXRhaWxzIGxpIHtcclxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gIGNvbG9yOiAjNjY2O1xyXG59XHJcblxyXG4ubm90ZSB7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGNvbG9yOiAjNjY2O1xyXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcclxufVxyXG5cclxuLnBheW1lbnQtYWN0aW9ucyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBnYXA6IDE1cHg7XHJcbn1cclxuXHJcbi5iYWNrLWJ0bixcclxuLnBheS1idG4ge1xyXG4gIHBhZGRpbmc6IDEycHggMjBweDtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3MgZWFzZTtcclxufVxyXG5cclxuLmJhY2stYnRuIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJmMmYyO1xyXG4gIGNvbG9yOiAjNjY2O1xyXG59XHJcblxyXG4uYmFjay1idG46aG92ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNlNmU2ZTY7XHJcbn1cclxuXHJcbi5wYXktYnRuIHtcclxuICBmbGV4OiAxO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwYTdhYmY7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4ucGF5LWJ0bjpob3ZlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzA4NjQ5NDtcclxufVxyXG5cclxuLnBsYW4tZmVhdHVyZXMge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7XHJcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gIHBhZGRpbmc6IDMwcHg7XHJcbiAgYWxpZ24tc2VsZjogc3RhcnQ7XHJcbn1cclxuXHJcbi5wbGFuLWZlYXR1cmVzIGgyIHtcclxuICBmb250LXNpemU6IDI0cHg7XHJcbiAgY29sb3I6ICMzMzM7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxufVxyXG5cclxuLnBsYW4tZGVzY3JpcHRpb24ge1xyXG4gIGNvbG9yOiAjNjY2O1xyXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbn1cclxuXHJcbi5wbGFuLWZlYXR1cmVzIGgzIHtcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiAgY29sb3I6ICMzMzM7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcclxufVxyXG5cclxuLmZlYXR1cmVzLWxpc3Qge1xyXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgcGFkZGluZzogMDtcclxuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xyXG59XHJcblxyXG4uZmVhdHVyZXMtbGlzdCBsaSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gIGNvbG9yOiAjNjY2O1xyXG59XHJcblxyXG4uZmVhdHVyZXMtbGlzdCBpIHtcclxuICBjb2xvcjogIzBhN2FiZjtcclxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbiAgbWFyZ2luLXRvcDogM3B4O1xyXG59XHJcblxyXG4uc2VjdXJlLXBheW1lbnQge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xyXG4gIGNvbG9yOiAjNjY2O1xyXG59XHJcblxyXG4uc2VjdXJlLXBheW1lbnQgaSB7XHJcbiAgY29sb3I6ICMwYTdhYmY7XHJcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xyXG59XHJcblxyXG4ucGF5bWVudC1sb2dvcyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBnYXA6IDEwcHg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuLnBheW1lbnQtbG9nb3MgaW1nIHtcclxuICBoZWlnaHQ6IDMwcHg7XHJcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcclxufVxyXG5cclxuLyogUmVzcG9uc2l2ZSBzdHlsZXMgKi9cclxuQG1lZGlhIChtYXgtd2lkdGg6IDk5MnB4KSB7XHJcbiAgLnBhc2FyZWxhLWdyaWQge1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XHJcbiAgfVxyXG5cclxuICAucGxhbi1mZWF0dXJlcyB7XHJcbiAgICBvcmRlcjogLTE7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgLmZvcm0tcm93IHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBnYXA6IDA7XHJcbiAgfVxyXG5cclxuICAucGF5bWVudC1hY3Rpb25zIHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgfVxyXG5cclxuICAuYmFjay1idG4ge1xyXG4gICAgb3JkZXI6IDI7XHJcbiAgfVxyXG5cclxuICAucGF5LWJ0biB7XHJcbiAgICBvcmRlcjogMTtcclxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 7057:
/*!********************************************!*\
  !*** ./src/app/services/paypal.service.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PaypalService: () => (/* binding */ PaypalService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 7919);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 1318);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 6443);





class PaypalService {
  constructor(http) {
    this.http = http;
  }
  /**
   * Crea una orden de pago en PayPal
   */
  createOrder(planId) {
    return this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/payments/create-paypal-order`, {
      planId
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.catchError)(error => {
      console.error('Error al crear la orden de PayPal:', error);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.throwError)(() => new Error('No se pudo crear la orden de PayPal'));
    }));
  }
  /**
   * Procesa un pago con PayPal
   */
  processPayment(planId, paypalOrderId, userId) {
    return this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/payments/process-paypal`, {
      planId,
      paypalOrderId,
      userId
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.catchError)(error => {
      console.error('Error al procesar el pago con PayPal:', error);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.throwError)(() => new Error('Error al procesar el pago con PayPal'));
    }));
  }
  /**
   * Inicializa el botón de PayPal
   */
  initPayPalButton(containerId, planId, onSuccess) {
    // Asegurarse de que el script de PayPal esté cargado
    if (typeof paypal === 'undefined') {
      this.loadPayPalScript().then(() => {
        this.renderButton(containerId, planId, onSuccess);
      });
    } else {
      this.renderButton(containerId, planId, onSuccess);
    }
  }
  /**
   * Renderiza el botón de PayPal
   */
  renderButton(containerId, planId, onSuccess) {
    // Obtener el precio del plan
    const amount = this.getPlanPrice(planId);
    paypal.Buttons({
      style: {
        color: 'blue',
        shape: 'rect',
        label: 'pay',
        height: 40
      },
      createOrder: (data, actions) => {
        return new Promise((resolve, reject) => {
          this.createOrder(planId).subscribe({
            next: response => {
              resolve(response.orderId);
            },
            error: error => {
              console.error('Error al crear la orden:', error);
              reject(error);
            }
          });
        });
      },
      onApprove: (data, actions) => {
        // Llamar a la función de éxito con el ID de la orden
        onSuccess(data.orderID);
      },
      onError: err => {
        console.error('Error en el botón de PayPal:', err);
      }
    }).render(`#${containerId}`);
  }
  /**
   * Carga el script de PayPal
   */
  loadPayPalScript() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.paypal.clientId}&currency=${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.paypal.currency}`;
      script.onload = () => resolve();
      script.onerror = error => reject(error);
      document.body.appendChild(script);
    });
  }
  /**
   * Obtiene el precio del plan
   */
  getPlanPrice(planId) {
    switch (planId) {
      case 'basic':
        return 1.22;
      case 'monthly':
        return 10.22;
      case 'pro':
        return 122;
      default:
        return 1.22;
    }
  }
  static {
    this.ɵfac = function PaypalService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || PaypalService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
      token: PaypalService,
      factory: PaypalService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 3015:
/*!********************************************!*\
  !*** ./src/app/services/stripe.service.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StripeService: () => (/* binding */ StripeService)
/* harmony export */ });
/* harmony import */ var C_Users_Pedro_Desktop_Proyec_web_loto_ia_tienda_web_lotoAI_1_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _stripe_stripe_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @stripe/stripe-js */ 9194);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 7919);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 5429);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 3942);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 1318);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 6647);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ 6443);







class StripeService {
  constructor(http) {
    this.http = http;
    this.stripe = (0,_stripe_stripe_js__WEBPACK_IMPORTED_MODULE_1__.loadStripe)(_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.stripe.publishableKey);
  }
  /**
   * Crea un PaymentIntent en el servidor
   */
  createPaymentIntent(amount, planId, userId) {
    return this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.apiUrl}/payments/create-payment-intent`, {
      amount,
      planId,
      userId
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.catchError)(error => {
      console.error('Error al crear el PaymentIntent:', error);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.throwError)(() => new Error('No se pudo crear el PaymentIntent'));
    }));
  }
  /**
   * Confirma un pago con los datos de la tarjeta
   */
  confirmCardPayment(clientSecret, cardElement) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.from)(this.stripe).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.switchMap)(stripe => {
      if (!stripe) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.throwError)(() => new Error('Stripe no ha sido inicializado'));
      }
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.from)(stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            // Aquí puedes añadir detalles de facturación si los tienes
          }
        }
      }));
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.catchError)(error => {
      console.error('Error al confirmar el pago:', error);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.throwError)(() => new Error('Error al procesar el pago'));
    }));
  }
  /**
   * Crea elementos de Stripe para el formulario de pago
   */
  createElements() {
    var _this = this;
    return (0,C_Users_Pedro_Desktop_Proyec_web_loto_ia_tienda_web_lotoAI_1_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const stripe = yield _this.stripe;
      if (!stripe) {
        console.error('Stripe no ha sido inicializado');
        return null;
      }
      return stripe.elements();
    })();
  }
  /**
   * Procesa un pago con tarjeta
   */
  processCardPayment(planId, userId) {
    return this.createPaymentIntent(this.getPlanPrice(planId), planId, userId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.switchMap)(paymentIntent => {
      return this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.apiUrl}/payments/confirm-payment`, {
        paymentIntentId: paymentIntent.id,
        userId,
        planId
      });
    }));
  }
  /**
   * Procesa un pago con PayPal
   */
  processPayPalPayment(planId, paypalOrderId, userId) {
    return this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.apiUrl}/payments/process-paypal`, {
      planId,
      paypalOrderId,
      userId
    });
  }
  /**
   * Procesa un pago por transferencia
   */
  processTransferPayment(planId, referenceNumber, userId) {
    return this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.apiUrl}/payments/process-transfer`, {
      planId,
      referenceNumber,
      userId
    });
  }
  /**
   * Obtiene el precio de un plan en céntimos
   */
  getPlanPrice(planId) {
    switch (planId) {
      case 'basic':
        return 122;
      // 1.22€ en céntimos
      case 'monthly':
        return 1022;
      // 10.22€ en céntimos
      case 'pro':
        return 12200;
      // 122€ en céntimos
      default:
        return 122;
    }
  }
  /**
   * Simula un pago exitoso (para desarrollo)
   */
  simulateSuccessfulPayment(planId) {
    // En un entorno real, esto se conectaría con el backend
    return new rxjs__WEBPACK_IMPORTED_MODULE_7__.Observable(observer => {
      setTimeout(() => {
        observer.next({
          success: true,
          planId
        });
        observer.complete();
      }, 1500);
    });
  }
  static {
    this.ɵfac = function StripeService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || StripeService)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClient));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({
      token: StripeService,
      factory: StripeService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 8015:
/*!*******************************************************!*\
  !*** ./node_modules/@stripe/stripe-js/dist/index.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadStripe: () => (/* binding */ loadStripe)
/* harmony export */ });
var RELEASE_TRAIN = 'basil';
var runtimeVersionToUrlVersion = function runtimeVersionToUrlVersion(version) {
  return version === 3 ? 'v3' : version;
};
var ORIGIN = 'https://js.stripe.com';
var STRIPE_JS_URL = "".concat(ORIGIN, "/").concat(RELEASE_TRAIN, "/stripe.js");
var V3_URL_REGEX = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/;
var STRIPE_JS_URL_REGEX = /^https:\/\/js\.stripe\.com\/(v3|[a-z]+)\/stripe\.js(\?.*)?$/;
var EXISTING_SCRIPT_MESSAGE = 'loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used';
var isStripeJSURL = function isStripeJSURL(url) {
  return V3_URL_REGEX.test(url) || STRIPE_JS_URL_REGEX.test(url);
};
var findScript = function findScript() {
  var scripts = document.querySelectorAll("script[src^=\"".concat(ORIGIN, "\"]"));
  for (var i = 0; i < scripts.length; i++) {
    var script = scripts[i];
    if (!isStripeJSURL(script.src)) {
      continue;
    }
    return script;
  }
  return null;
};
var injectScript = function injectScript(params) {
  var queryString = params && !params.advancedFraudSignals ? '?advancedFraudSignals=false' : '';
  var script = document.createElement('script');
  script.src = "".concat(STRIPE_JS_URL).concat(queryString);
  var headOrBody = document.head || document.body;
  if (!headOrBody) {
    throw new Error('Expected document.body not to be null. Stripe.js requires a <body> element.');
  }
  headOrBody.appendChild(script);
  return script;
};
var registerWrapper = function registerWrapper(stripe, startTime) {
  if (!stripe || !stripe._registerWrapper) {
    return;
  }
  stripe._registerWrapper({
    name: 'stripe-js',
    version: "7.0.0",
    startTime: startTime
  });
};
var stripePromise$1 = null;
var onErrorListener = null;
var onLoadListener = null;
var onError = function onError(reject) {
  return function (cause) {
    reject(new Error('Failed to load Stripe.js', {
      cause: cause
    }));
  };
};
var onLoad = function onLoad(resolve, reject) {
  return function () {
    if (window.Stripe) {
      resolve(window.Stripe);
    } else {
      reject(new Error('Stripe.js not available'));
    }
  };
};
var loadScript = function loadScript(params) {
  // Ensure that we only attempt to load Stripe.js at most once
  if (stripePromise$1 !== null) {
    return stripePromise$1;
  }
  stripePromise$1 = new Promise(function (resolve, reject) {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      // Resolve to null when imported server side. This makes the module
      // safe to import in an isomorphic code base.
      resolve(null);
      return;
    }
    if (window.Stripe && params) {
      console.warn(EXISTING_SCRIPT_MESSAGE);
    }
    if (window.Stripe) {
      resolve(window.Stripe);
      return;
    }
    try {
      var script = findScript();
      if (script && params) {
        console.warn(EXISTING_SCRIPT_MESSAGE);
      } else if (!script) {
        script = injectScript(params);
      } else if (script && onLoadListener !== null && onErrorListener !== null) {
        var _script$parentNode;

        // remove event listeners
        script.removeEventListener('load', onLoadListener);
        script.removeEventListener('error', onErrorListener); // if script exists, but we are reloading due to an error,
        // reload script to trigger 'load' event

        (_script$parentNode = script.parentNode) === null || _script$parentNode === void 0 ? void 0 : _script$parentNode.removeChild(script);
        script = injectScript(params);
      }
      onLoadListener = onLoad(resolve, reject);
      onErrorListener = onError(reject);
      script.addEventListener('load', onLoadListener);
      script.addEventListener('error', onErrorListener);
    } catch (error) {
      reject(error);
      return;
    }
  }); // Resets stripePromise on error

  return stripePromise$1["catch"](function (error) {
    stripePromise$1 = null;
    return Promise.reject(error);
  });
};
var initStripe = function initStripe(maybeStripe, args, startTime) {
  if (maybeStripe === null) {
    return null;
  }
  var pk = args[0];
  var isTestKey = pk.match(/^pk_test/); // @ts-expect-error this is not publicly typed

  var version = runtimeVersionToUrlVersion(maybeStripe.version);
  var expectedVersion = RELEASE_TRAIN;
  if (isTestKey && version !== expectedVersion) {
    console.warn("Stripe.js@".concat(version, " was loaded on the page, but @stripe/stripe-js@").concat("7.0.0", " expected Stripe.js@").concat(expectedVersion, ". This may result in unexpected behavior. For more information, see https://docs.stripe.com/sdks/stripejs-versioning"));
  }
  var stripe = maybeStripe.apply(undefined, args);
  registerWrapper(stripe, startTime);
  return stripe;
}; // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

var stripePromise;
var loadCalled = false;
var getStripePromise = function getStripePromise() {
  if (stripePromise) {
    return stripePromise;
  }
  stripePromise = loadScript(null)["catch"](function (error) {
    // clear cache on error
    stripePromise = null;
    return Promise.reject(error);
  });
  return stripePromise;
}; // Execute our own script injection after a tick to give users time to do their
// own script injection.

Promise.resolve().then(function () {
  return getStripePromise();
})["catch"](function (error) {
  if (!loadCalled) {
    console.warn(error);
  }
});
var loadStripe = function loadStripe() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  loadCalled = true;
  var startTime = Date.now(); // if previous attempts are unsuccessful, will re-load script

  return getStripePromise().then(function (maybeStripe) {
    return initStripe(maybeStripe, args, startTime);
  });
};


/***/ }),

/***/ 9194:
/*!******************************************************!*\
  !*** ./node_modules/@stripe/stripe-js/lib/index.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadStripe: () => (/* reexport safe */ _dist_index_mjs__WEBPACK_IMPORTED_MODULE_0__.loadStripe)
/* harmony export */ });
/* harmony import */ var _dist_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dist/index.mjs */ 8015);


/***/ })

}]);
//# sourceMappingURL=src_app_pages_pasarela-pago_pasarela-pago_component_ts.js.map