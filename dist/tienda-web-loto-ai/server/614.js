"use strict";
exports.id = 614;
exports.ids = [614];
exports.modules = {

/***/ 28614:
/*!****************************************************************************************!*\
  !*** ./src/app/pages/confirmacion-plan-mensual/confirmacion-plan-mensual.component.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConfirmacionPlanMensualComponent: () => (/* binding */ ConfirmacionPlanMensualComponent)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 61504);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 94556);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37100);




let ConfirmacionPlanMensualComponent = /*#__PURE__*/(() => {
  class ConfirmacionPlanMensualComponent {
    constructor() {
      this.currentDate = new Date();
      this.lastFourDigits = '4321'; // Simulación de los últimos 4 dígitos de la tarjeta
      // Calcular la fecha de la próxima facturación (un mes después de la fecha actual)
      this.nextBillingDate = new Date(this.currentDate);
      this.nextBillingDate.setMonth(this.nextBillingDate.getMonth() + 1);
    }
    ngOnInit() {
      // Aquí se podría cargar información adicional del usuario o del plan
    }
    downloadInvoice() {
      // Lógica para descargar la factura
      console.log('Descargando factura...');
    }
    cancelSubscription() {
      // Lógica para cancelar la suscripción
      console.log('Cancelando suscripción...');
      // Aquí se implementaría la lógica para mostrar un modal de confirmación
    }
    static {
      this.ɵfac = function ConfirmacionPlanMensualComponent_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || ConfirmacionPlanMensualComponent)();
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: ConfirmacionPlanMensualComponent,
        selectors: [["app-confirmacion-plan-mensual"]],
        standalone: true,
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
        decls: 153,
        vars: 9,
        consts: [[1, "page-container"], [1, "breadcrumb"], ["routerLink", "/home"], [1, "fas", "fa-home"], [1, "separator"], ["routerLink", "/planes", 1, "link"], [1, "current"], [1, "content-container"], [1, "confirmation-header"], [1, "confirmation-icon"], [1, "fas", "fa-check-circle"], [1, "confirmation-title"], [1, "confirmation-subtitle"], [1, "order-summary"], [1, "summary-card"], [1, "summary-row"], [1, "summary-label"], [1, "summary-value"], [1, "summary-value", "status-active"], [1, "payment-details"], [1, "payment-card"], [1, "payment-row"], [1, "payment-label"], [1, "payment-value"], [1, "payment-row", "total"], [1, "payment-note"], [1, "features-included"], [1, "features-list"], [1, "fas", "fa-check"], [1, "next-steps"], [1, "steps-container"], [1, "step-card"], [1, "step-icon"], [1, "fas", "fa-dice"], ["routerLink", "/euromillon", 1, "step-btn"], [1, "fas", "fa-user-cog"], ["routerLink", "/profile", 1, "step-btn"], [1, "fas", "fa-receipt"], [1, "step-btn", "invoice-btn"], [1, "subscription-management"], [1, "management-buttons"], ["routerLink", "/profile/subscription", 1, "management-btn"], [1, "management-btn", "cancel-btn"], [1, "support-section"], ["routerLink", "/contacto", 1, "support-btn"]],
        template: function ConfirmacionPlanMensualComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "a", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "i", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, ">");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "a", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Planes y Suscripciones");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "span", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, ">");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "span", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Confirmaci\u00F3n Plan Mensual");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 7)(13, "div", 8)(14, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "i", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "h1", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "\u00A1Plan Mensual activado con \u00E9xito!");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "p", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Gracias por elegir LOTO IA. Tu cuenta ha sido actualizada al Plan Mensual.");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 13)(21, "h2");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Resumen del pedido");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 14)(24, "div", 15)(25, "span", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "Plan:");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "span", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Plan Mensual");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 15)(30, "span", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Precio:");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "span", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "10,22\u20AC (IVA incluido)");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 15)(35, "span", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "Fecha de activaci\u00F3n:");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "span", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](39, "date");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 15)(41, "span", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "Pr\u00F3xima facturaci\u00F3n:");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "span", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](45, "date");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 15)(47, "span", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, "M\u00E9todo de pago:");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "span", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 15)(52, "span", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, "Estado:");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "span", 18);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](55, "Activo");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div", 19)(57, "h2");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](58, "Detalles del pago");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "div", 20)(60, "div", 21)(61, "span", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](62, "Subtotal:");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "span", 23);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](64, "8,45\u20AC");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "div", 21)(66, "span", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "IVA (21%):");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "span", 23);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](69, "1,77\u20AC");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "div", 24)(71, "span", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](72, "Total:");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "span", 23);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](74, "10,22\u20AC");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "p", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](76, "Se te cobrar\u00E1 autom\u00E1ticamente 10,22\u20AC cada mes hasta que canceles tu suscripci\u00F3n.");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "div", 26)(78, "h2");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](79, "Caracter\u00EDsticas incluidas");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "ul", 27)(81, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](82, "i", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](84, "Hasta 4 combinaciones ganadoras para cada uno de los 7 sorteos");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](85, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](86, "i", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](88, "Predicciones para primeros premios y premios secundarios");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](89, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](90, "i", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](91, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](92, "V\u00E1lido para todos los sorteos del mes en curso desde la fecha de inscripci\u00F3n");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](93, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](94, "i", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](95, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](96, "Acceso a todas nuestras IAs especializadas");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](97, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](98, "i", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](99, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](100, "Notificaciones de sorteos");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](101, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](102, "i", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](103, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](104, "An\u00E1lisis estad\u00EDsticos avanzados");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](105, "div", 29)(106, "h2");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](107, "\u00BFQu\u00E9 hacer ahora?");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](108, "div", 30)(109, "div", 31)(110, "div", 32);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](111, "i", 33);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](112, "h3");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](113, "Generar predicciones");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](114, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](115, "Comienza a generar predicciones para tus loter\u00EDas favoritas.");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](116, "button", 34);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](117, "Generar ahora");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](118, "div", 31)(119, "div", 32);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](120, "i", 35);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](121, "h3");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](122, "Configurar preferencias");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](123, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](124, "Personaliza tus preferencias de loter\u00EDa y notificaciones.");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](125, "button", 36);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](126, "Ir a mi perfil");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](127, "div", 31)(128, "div", 32);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](129, "i", 37);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](130, "h3");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](131, "Ver factura");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](132, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](133, "Descarga la factura de tu suscripci\u00F3n para tus registros.");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](134, "button", 38);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](135, "Descargar factura");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](136, "div", 39)(137, "h2");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](138, "Gesti\u00F3n de suscripci\u00F3n");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](139, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](140, "Puedes gestionar tu suscripci\u00F3n en cualquier momento desde tu perfil. Recuerda que puedes cancelar cuando quieras sin compromiso.");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](141, "div", 40)(142, "button", 41);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](143, "Gestionar suscripci\u00F3n");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](144, "button", 42);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](145, "Cancelar suscripci\u00F3n");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](146, "div", 43)(147, "h2");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](148, "\u00BFNecesitas ayuda?");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](149, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](150, "Si tienes alguna pregunta o necesitas asistencia, no dudes en contactar con nuestro equipo de soporte.");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](151, "button", 44);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](152, "Contactar soporte");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
          }
          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](38);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](39, 3, ctx.currentDate, "dd/MM/yyyy"));
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](45, 6, ctx.nextBillingDate, "dd/MM/yyyy"));
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Tarjeta terminada en ", ctx.lastFourDigits, "");
          }
        },
        dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterLink, _angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_2__.DatePipe],
        styles: [".page-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n.breadcrumb[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 20px;\n  font-size: 14px;\n}\n\n.breadcrumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  text-decoration: none;\n}\n\n.breadcrumb[_ngcontent-%COMP%]   .separator[_ngcontent-%COMP%] {\n  margin: 0 8px;\n  color: #0a7abf;\n}\n\n.breadcrumb[_ngcontent-%COMP%]   .current[_ngcontent-%COMP%] {\n  color: #0a7abf;\n}\n\n.content-container[_ngcontent-%COMP%] {\n  background-color: #fff;\n  border-radius: 5px;\n  padding: 30px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n\n\n\n.confirmation-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 40px;\n}\n\n.confirmation-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  color: #4caf50;\n  margin-bottom: 20px;\n}\n\n.confirmation-title[_ngcontent-%COMP%] {\n  color: #333;\n  font-size: 28px;\n  margin-bottom: 10px;\n}\n\n.confirmation-subtitle[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 16px;\n}\n\n\n\n.order-summary[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n\n.order-summary[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 22px;\n  margin-bottom: 15px;\n}\n\n.summary-card[_ngcontent-%COMP%] {\n  background-color: #f9f9f9;\n  border-radius: 8px;\n  padding: 20px;\n}\n\n.summary-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 10px 0;\n  border-bottom: 1px solid #eee;\n}\n\n.summary-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n\n.summary-label[_ngcontent-%COMP%] {\n  font-weight: bold;\n  color: #666;\n}\n\n.summary-value[_ngcontent-%COMP%] {\n  color: #333;\n}\n\n.status-active[_ngcontent-%COMP%] {\n  color: #4caf50;\n  font-weight: bold;\n}\n\n\n\n.payment-details[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n\n.payment-details[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 22px;\n  margin-bottom: 15px;\n}\n\n.payment-card[_ngcontent-%COMP%] {\n  background-color: #f9f9f9;\n  border-radius: 8px;\n  padding: 20px;\n  margin-bottom: 15px;\n}\n\n.payment-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 10px 0;\n  border-bottom: 1px solid #eee;\n}\n\n.payment-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n\n.payment-row.total[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 18px;\n  margin-top: 10px;\n  border-top: 2px solid #ddd;\n  padding-top: 15px;\n}\n\n.payment-label[_ngcontent-%COMP%] {\n  color: #666;\n}\n\n.payment-value[_ngcontent-%COMP%] {\n  color: #333;\n}\n\n.payment-note[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #666;\n  font-style: italic;\n}\n\n\n\n.features-included[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n\n.features-included[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 22px;\n  margin-bottom: 15px;\n}\n\n.features-list[_ngcontent-%COMP%] {\n  list-style-type: none;\n  padding: 0;\n}\n\n.features-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 10px 0;\n  border-bottom: 1px solid #eee;\n}\n\n.features-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n\n.features-list[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #4caf50;\n  margin-right: 15px;\n  font-size: 18px;\n}\n\n\n\n.next-steps[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n\n.next-steps[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 22px;\n  margin-bottom: 15px;\n  text-align: center;\n}\n\n.steps-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  justify-content: center;\n}\n\n.step-card[_ngcontent-%COMP%] {\n  flex: 1;\n  background-color: #f9f9f9;\n  border-radius: 8px;\n  padding: 20px;\n  text-align: center;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n\n.step-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);\n}\n\n.step-icon[_ngcontent-%COMP%] {\n  font-size: 36px;\n  color: #0a7abf;\n  margin-bottom: 15px;\n}\n\n.step-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #333;\n  font-size: 18px;\n  margin-bottom: 10px;\n}\n\n.step-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #666;\n  margin-bottom: 15px;\n  min-height: 40px;\n}\n\n.step-btn[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  background-color: #0a7abf;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  font-size: 14px;\n  font-weight: bold;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n}\n\n.step-btn[_ngcontent-%COMP%]:hover {\n  background-color: #086494;\n}\n\n.invoice-btn[_ngcontent-%COMP%] {\n  background-color: #4caf50;\n}\n\n.invoice-btn[_ngcontent-%COMP%]:hover {\n  background-color: #3d8b40;\n}\n\n\n\n.subscription-management[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n  background-color: #f5f5f5;\n  border-radius: 8px;\n  padding: 20px;\n  text-align: center;\n}\n\n.subscription-management[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 22px;\n  margin-bottom: 15px;\n}\n\n.subscription-management[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #666;\n  margin-bottom: 20px;\n  max-width: 600px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.management-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 20px;\n}\n\n.management-btn[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  background-color: #0a7abf;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  font-size: 14px;\n  font-weight: bold;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n}\n\n.management-btn[_ngcontent-%COMP%]:hover {\n  background-color: #086494;\n}\n\n.cancel-btn[_ngcontent-%COMP%] {\n  background-color: #f44336;\n}\n\n.cancel-btn[_ngcontent-%COMP%]:hover {\n  background-color: #d32f2f;\n}\n\n\n\n.support-section[_ngcontent-%COMP%] {\n  text-align: center;\n  background-color: #f5f5f5;\n  padding: 30px;\n  border-radius: 8px;\n}\n\n.support-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 22px;\n  margin-bottom: 15px;\n}\n\n.support-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #666;\n  margin-bottom: 20px;\n  max-width: 600px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.support-btn[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  background-color: #0a7abf;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  font-size: 14px;\n  font-weight: bold;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n}\n\n.support-btn[_ngcontent-%COMP%]:hover {\n  background-color: #086494;\n}\n\n\n\n@media (max-width: 768px) {\n  .steps-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .step-card[_ngcontent-%COMP%] {\n    margin-bottom: 20px;\n  }\n\n  .step-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    min-height: auto;\n  }\n\n  .management-buttons[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 10px;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvY29uZmlybWFjaW9uLXBsYW4tbWVuc3VhbC9jb25maXJtYWNpb24tcGxhbi1tZW5zdWFsLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBaUI7RUFDakIsY0FBYztFQUNkLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2Isd0NBQXdDO0FBQzFDOztBQUVBLCtCQUErQjtBQUMvQjtFQUNFLGtCQUFrQjtFQUNsQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsY0FBYztFQUNkLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxlQUFlO0VBQ2YsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGVBQWU7QUFDakI7O0FBRUEseUJBQXlCO0FBQ3pCO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsY0FBYztFQUNkLGVBQWU7RUFDZixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsa0JBQWtCO0VBQ2xCLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsZUFBZTtFQUNmLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsaUJBQWlCO0FBQ25COztBQUVBLDJCQUEyQjtBQUMzQjtFQUNFLG1CQUFtQjtBQUNyQjs7QUFF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QUFrQjtFQUNsQix5QkFBeUI7RUFDekIsWUFBWTtFQUNaLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2Ysc0NBQXNDO0FBQ3hDOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBLHNCQUFzQjtBQUN0QjtFQUNFO0lBQ0Usc0JBQXNCO0VBQ3hCOztFQUVBO0lBQ0UsbUJBQW1CO0VBQ3JCOztFQUVBO0lBQ0UsZ0JBQWdCO0VBQ2xCOztFQUVBO0lBQ0Usc0JBQXNCO0lBQ3RCLFNBQVM7RUFDWDtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLnBhZ2UtY29udGFpbmVyIHtcclxuICBtYXgtd2lkdGg6IDEyMDBweDtcclxuICBtYXJnaW46IDAgYXV0bztcclxuICBwYWRkaW5nOiAyMHB4O1xyXG59XHJcblxyXG4uYnJlYWRjcnVtYiB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG59XHJcblxyXG4uYnJlYWRjcnVtYiBhIHtcclxuICBjb2xvcjogIzBhN2FiZjtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbn1cclxuXHJcbi5icmVhZGNydW1iIC5zZXBhcmF0b3Ige1xyXG4gIG1hcmdpbjogMCA4cHg7XHJcbiAgY29sb3I6ICMwYTdhYmY7XHJcbn1cclxuXHJcbi5icmVhZGNydW1iIC5jdXJyZW50IHtcclxuICBjb2xvcjogIzBhN2FiZjtcclxufVxyXG5cclxuLmNvbnRlbnQtY29udGFpbmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICBwYWRkaW5nOiAzMHB4O1xyXG4gIGJveC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbn1cclxuXHJcbi8qIENvbmZpcm1hdGlvbiBIZWFkZXIgU3R5bGVzICovXHJcbi5jb25maXJtYXRpb24taGVhZGVyIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgbWFyZ2luLWJvdHRvbTogNDBweDtcclxufVxyXG5cclxuLmNvbmZpcm1hdGlvbi1pY29uIHtcclxuICBmb250LXNpemU6IDY0cHg7XHJcbiAgY29sb3I6ICM0Y2FmNTA7XHJcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxufVxyXG5cclxuLmNvbmZpcm1hdGlvbi10aXRsZSB7XHJcbiAgY29sb3I6ICMzMzM7XHJcbiAgZm9udC1zaXplOiAyOHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbn1cclxuXHJcbi5jb25maXJtYXRpb24tc3VidGl0bGUge1xyXG4gIGNvbG9yOiAjNjY2O1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxufVxyXG5cclxuLyogT3JkZXIgU3VtbWFyeSBTdHlsZXMgKi9cclxuLm9yZGVyLXN1bW1hcnkge1xyXG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XHJcbn1cclxuXHJcbi5vcmRlci1zdW1tYXJ5IGgyIHtcclxuICBjb2xvcjogIzBhN2FiZjtcclxuICBmb250LXNpemU6IDIycHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcclxufVxyXG5cclxuLnN1bW1hcnktY2FyZCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgcGFkZGluZzogMjBweDtcclxufVxyXG5cclxuLnN1bW1hcnktcm93IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBwYWRkaW5nOiAxMHB4IDA7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlZWU7XHJcbn1cclxuXHJcbi5zdW1tYXJ5LXJvdzpsYXN0LWNoaWxkIHtcclxuICBib3JkZXItYm90dG9tOiBub25lO1xyXG59XHJcblxyXG4uc3VtbWFyeS1sYWJlbCB7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgY29sb3I6ICM2NjY7XHJcbn1cclxuXHJcbi5zdW1tYXJ5LXZhbHVlIHtcclxuICBjb2xvcjogIzMzMztcclxufVxyXG5cclxuLnN0YXR1cy1hY3RpdmUge1xyXG4gIGNvbG9yOiAjNGNhZjUwO1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG4vKiBQYXltZW50IERldGFpbHMgU3R5bGVzICovXHJcbi5wYXltZW50LWRldGFpbHMge1xyXG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XHJcbn1cclxuXHJcbi5wYXltZW50LWRldGFpbHMgaDIge1xyXG4gIGNvbG9yOiAjMGE3YWJmO1xyXG4gIGZvbnQtc2l6ZTogMjJweDtcclxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xyXG59XHJcblxyXG4ucGF5bWVudC1jYXJkIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBwYWRkaW5nOiAyMHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbn1cclxuXHJcbi5wYXltZW50LXJvdyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgcGFkZGluZzogMTBweCAwO1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWVlO1xyXG59XHJcblxyXG4ucGF5bWVudC1yb3c6bGFzdC1jaGlsZCB7XHJcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTtcclxufVxyXG5cclxuLnBheW1lbnQtcm93LnRvdGFsIHtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiAgbWFyZ2luLXRvcDogMTBweDtcclxuICBib3JkZXItdG9wOiAycHggc29saWQgI2RkZDtcclxuICBwYWRkaW5nLXRvcDogMTVweDtcclxufVxyXG5cclxuLnBheW1lbnQtbGFiZWwge1xyXG4gIGNvbG9yOiAjNjY2O1xyXG59XHJcblxyXG4ucGF5bWVudC12YWx1ZSB7XHJcbiAgY29sb3I6ICMzMzM7XHJcbn1cclxuXHJcbi5wYXltZW50LW5vdGUge1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBjb2xvcjogIzY2NjtcclxuICBmb250LXN0eWxlOiBpdGFsaWM7XHJcbn1cclxuXHJcbi8qIEZlYXR1cmVzIEluY2x1ZGVkIFN0eWxlcyAqL1xyXG4uZmVhdHVyZXMtaW5jbHVkZWQge1xyXG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XHJcbn1cclxuXHJcbi5mZWF0dXJlcy1pbmNsdWRlZCBoMiB7XHJcbiAgY29sb3I6ICMwYTdhYmY7XHJcbiAgZm9udC1zaXplOiAyMnB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbn1cclxuXHJcbi5mZWF0dXJlcy1saXN0IHtcclxuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XHJcbiAgcGFkZGluZzogMDtcclxufVxyXG5cclxuLmZlYXR1cmVzLWxpc3QgbGkge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBwYWRkaW5nOiAxMHB4IDA7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlZWU7XHJcbn1cclxuXHJcbi5mZWF0dXJlcy1saXN0IGxpOmxhc3QtY2hpbGQge1xyXG4gIGJvcmRlci1ib3R0b206IG5vbmU7XHJcbn1cclxuXHJcbi5mZWF0dXJlcy1saXN0IGkge1xyXG4gIGNvbG9yOiAjNGNhZjUwO1xyXG4gIG1hcmdpbi1yaWdodDogMTVweDtcclxuICBmb250LXNpemU6IDE4cHg7XHJcbn1cclxuXHJcbi8qIE5leHQgU3RlcHMgU3R5bGVzICovXHJcbi5uZXh0LXN0ZXBzIHtcclxuICBtYXJnaW4tYm90dG9tOiA0MHB4O1xyXG59XHJcblxyXG4ubmV4dC1zdGVwcyBoMiB7XHJcbiAgY29sb3I6ICMwYTdhYmY7XHJcbiAgZm9udC1zaXplOiAyMnB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uc3RlcHMtY29udGFpbmVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGdhcDogMjBweDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuLnN0ZXAtY2FyZCB7XHJcbiAgZmxleDogMTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBwYWRkaW5nOiAyMHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLCBib3gtc2hhZG93IDAuM3MgZWFzZTtcclxufVxyXG5cclxuLnN0ZXAtY2FyZDpob3ZlciB7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01cHgpO1xyXG4gIGJveC1zaGFkb3c6IDAgMTBweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxufVxyXG5cclxuLnN0ZXAtaWNvbiB7XHJcbiAgZm9udC1zaXplOiAzNnB4O1xyXG4gIGNvbG9yOiAjMGE3YWJmO1xyXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbn1cclxuXHJcbi5zdGVwLWNhcmQgaDMge1xyXG4gIGNvbG9yOiAjMzMzO1xyXG4gIGZvbnQtc2l6ZTogMThweDtcclxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4uc3RlcC1jYXJkIHAge1xyXG4gIGNvbG9yOiAjNjY2O1xyXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbiAgbWluLWhlaWdodDogNDBweDtcclxufVxyXG5cclxuLnN0ZXAtYnRuIHtcclxuICBwYWRkaW5nOiAxMHB4IDIwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBhN2FiZjtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcyBlYXNlO1xyXG59XHJcblxyXG4uc3RlcC1idG46aG92ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwODY0OTQ7XHJcbn1cclxuXHJcbi5pbnZvaWNlLWJ0biB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRjYWY1MDtcclxufVxyXG5cclxuLmludm9pY2UtYnRuOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2Q4YjQwO1xyXG59XHJcblxyXG4vKiBTdWJzY3JpcHRpb24gTWFuYWdlbWVudCBTdHlsZXMgKi9cclxuLnN1YnNjcmlwdGlvbi1tYW5hZ2VtZW50IHtcclxuICBtYXJnaW4tYm90dG9tOiA0MHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XHJcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gIHBhZGRpbmc6IDIwcHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uc3Vic2NyaXB0aW9uLW1hbmFnZW1lbnQgaDIge1xyXG4gIGNvbG9yOiAjMGE3YWJmO1xyXG4gIGZvbnQtc2l6ZTogMjJweDtcclxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xyXG59XHJcblxyXG4uc3Vic2NyaXB0aW9uLW1hbmFnZW1lbnQgcCB7XHJcbiAgY29sb3I6ICM2NjY7XHJcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxuICBtYXgtd2lkdGg6IDYwMHB4O1xyXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xyXG4gIG1hcmdpbi1yaWdodDogYXV0bztcclxufVxyXG5cclxuLm1hbmFnZW1lbnQtYnV0dG9ucyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBnYXA6IDIwcHg7XHJcbn1cclxuXHJcbi5tYW5hZ2VtZW50LWJ0biB7XHJcbiAgcGFkZGluZzogMTBweCAyMHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwYTdhYmY7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3MgZWFzZTtcclxufVxyXG5cclxuLm1hbmFnZW1lbnQtYnRuOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDg2NDk0O1xyXG59XHJcblxyXG4uY2FuY2VsLWJ0biB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y0NDMzNjtcclxufVxyXG5cclxuLmNhbmNlbC1idG46aG92ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNkMzJmMmY7XHJcbn1cclxuXHJcbi8qIFN1cHBvcnQgU2VjdGlvbiBTdHlsZXMgKi9cclxuLnN1cHBvcnQtc2VjdGlvbiB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XHJcbiAgcGFkZGluZzogMzBweDtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbn1cclxuXHJcbi5zdXBwb3J0LXNlY3Rpb24gaDIge1xyXG4gIGNvbG9yOiAjMGE3YWJmO1xyXG4gIGZvbnQtc2l6ZTogMjJweDtcclxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xyXG59XHJcblxyXG4uc3VwcG9ydC1zZWN0aW9uIHAge1xyXG4gIGNvbG9yOiAjNjY2O1xyXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgbWF4LXdpZHRoOiA2MDBweDtcclxuICBtYXJnaW4tbGVmdDogYXV0bztcclxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XHJcbn1cclxuXHJcbi5zdXBwb3J0LWJ0biB7XHJcbiAgcGFkZGluZzogMTBweCAyMHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwYTdhYmY7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3MgZWFzZTtcclxufVxyXG5cclxuLnN1cHBvcnQtYnRuOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDg2NDk0O1xyXG59XHJcblxyXG4vKiBSZXNwb25zaXZlIFN0eWxlcyAqL1xyXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAuc3RlcHMtY29udGFpbmVyIHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgfVxyXG5cclxuICAuc3RlcC1jYXJkIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgfVxyXG5cclxuICAuc3RlcC1jYXJkIHAge1xyXG4gICAgbWluLWhlaWdodDogYXV0bztcclxuICB9XHJcblxyXG4gIC5tYW5hZ2VtZW50LWJ1dHRvbnMge1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGdhcDogMTBweDtcclxuICB9XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
      });
    }
  }
  return ConfirmacionPlanMensualComponent;
})();

/***/ })

};
;
//# sourceMappingURL=614.js.map