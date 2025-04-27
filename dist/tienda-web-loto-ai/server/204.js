"use strict";
exports.id = 204;
exports.ids = [204];
exports.modules = {

/***/ 48204:
/*!**************************************************************************************!*\
  !*** ./src/app/pages/confirmacion-plan-basico/confirmacion-plan-basico.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConfirmacionPlanBasicoComponent: () => (/* binding */ ConfirmacionPlanBasicoComponent)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 61504);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 94556);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37100);




let ConfirmacionPlanBasicoComponent = /*#__PURE__*/(() => {
  class ConfirmacionPlanBasicoComponent {
    constructor() {
      this.currentDate = new Date();
    }
    ngOnInit() {
      // Aquí se podría cargar información adicional del usuario o del plan
    }
    static {
      this.ɵfac = function ConfirmacionPlanBasicoComponent_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || ConfirmacionPlanBasicoComponent)();
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: ConfirmacionPlanBasicoComponent,
        selectors: [["app-confirmacion-plan-basico"]],
        standalone: true,
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
        decls: 103,
        vars: 4,
        consts: [[1, "page-container"], [1, "breadcrumb"], ["routerLink", "/home"], [1, "fas", "fa-home"], [1, "separator"], ["routerLink", "/planes", 1, "link"], [1, "current"], [1, "content-container"], [1, "confirmation-header"], [1, "confirmation-icon"], [1, "fas", "fa-check-circle"], [1, "confirmation-title"], [1, "confirmation-subtitle"], [1, "plan-details"], [1, "details-card"], [1, "detail-row"], [1, "detail-label"], [1, "detail-value"], [1, "detail-value", "status-active"], [1, "features-included"], [1, "features-list"], [1, "fas", "fa-check"], [1, "next-steps"], [1, "steps-container"], [1, "step-card"], [1, "step-icon"], [1, "fas", "fa-dice"], ["routerLink", "/euromillon", 1, "step-btn"], [1, "fas", "fa-user-cog"], ["routerLink", "/profile", 1, "step-btn"], [1, "fas", "fa-crown"], ["routerLink", "/planes", 1, "step-btn", "upgrade-btn"], [1, "support-section"], ["routerLink", "/contacto", 1, "support-btn"]],
        template: function ConfirmacionPlanBasicoComponent_Template(rf, ctx) {
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
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Confirmaci\u00F3n Plan B\u00E1sico");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 7)(13, "div", 8)(14, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "i", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "h1", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "\u00A1Plan B\u00E1sico activado con \u00E9xito!");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "p", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Gracias por elegir LOTO IA. Tu cuenta ha sido actualizada al Plan B\u00E1sico.");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 13)(21, "h2");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Detalles del plan");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 14)(24, "div", 15)(25, "span", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "Plan:");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "span", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Plan B\u00E1sico");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 15)(30, "span", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Precio:");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "span", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "1,22\u20AC (IVA incluido)");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 15)(35, "span", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "Fecha de activaci\u00F3n:");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "span", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](39, "date");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 15)(41, "span", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "Estado:");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "span", 18);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, "Activo");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 19)(46, "h2");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "Caracter\u00EDsticas incluidas");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "ul", 20)(49, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](50, "i", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "1 combinaci\u00F3n ganadora para cada uno de los 7 sorteos");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](54, "i", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](56, "Predicciones para primeros premios y premios secundarios");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](58, "i", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](60, "V\u00E1lido \u00FAnicamente para el sorteo inmediato a la fecha de inscripci\u00F3n");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](62, "i", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](64, "Acceso a todas nuestras IAs especializadas");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "div", 22)(66, "h2");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "\u00BFQu\u00E9 hacer ahora?");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "div", 23)(69, "div", 24)(70, "div", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](71, "i", 26);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "h3");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](73, "Generar predicciones");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](75, "Comienza a generar predicciones para tu loter\u00EDa favorita.");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "button", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](77, "Generar ahora");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "div", 24)(79, "div", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](80, "i", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](81, "h3");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](82, "Configurar preferencias");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](84, "Personaliza tus preferencias de loter\u00EDa y notificaciones.");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](85, "button", 29);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](86, "Ir a mi perfil");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "div", 24)(88, "div", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](89, "i", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "h3");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](91, "Mejorar tu plan");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](92, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](93, "Actualiza a un plan premium para obtener m\u00E1s predicciones y funciones avanzadas.");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](94, "button", 31);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](95, "Ver planes premium");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "div", 32)(97, "h2");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](98, "\u00BFNecesitas ayuda?");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](99, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](100, "Si tienes alguna pregunta o necesitas asistencia, no dudes en contactar con nuestro equipo de soporte.");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](101, "button", 33);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](102, "Contactar soporte");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
          }
          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](38);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](39, 1, ctx.currentDate, "dd/MM/yyyy"));
          }
        },
        dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterLink, _angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_2__.DatePipe],
        styles: [".page-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n.breadcrumb[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 20px;\n  font-size: 14px;\n}\n\n.breadcrumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  text-decoration: none;\n}\n\n.breadcrumb[_ngcontent-%COMP%]   .separator[_ngcontent-%COMP%] {\n  margin: 0 8px;\n  color: #0a7abf;\n}\n\n.breadcrumb[_ngcontent-%COMP%]   .current[_ngcontent-%COMP%] {\n  color: #0a7abf;\n}\n\n.content-container[_ngcontent-%COMP%] {\n  background-color: #fff;\n  border-radius: 5px;\n  padding: 30px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n\n\n\n.confirmation-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 40px;\n}\n\n.confirmation-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  color: #4caf50;\n  margin-bottom: 20px;\n}\n\n.confirmation-title[_ngcontent-%COMP%] {\n  color: #333;\n  font-size: 28px;\n  margin-bottom: 10px;\n}\n\n.confirmation-subtitle[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 16px;\n}\n\n\n\n.plan-details[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n\n.plan-details[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 22px;\n  margin-bottom: 15px;\n}\n\n.details-card[_ngcontent-%COMP%] {\n  background-color: #f9f9f9;\n  border-radius: 8px;\n  padding: 20px;\n}\n\n.detail-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 10px 0;\n  border-bottom: 1px solid #eee;\n}\n\n.detail-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n\n.detail-label[_ngcontent-%COMP%] {\n  font-weight: bold;\n  color: #666;\n}\n\n.detail-value[_ngcontent-%COMP%] {\n  color: #333;\n}\n\n.status-active[_ngcontent-%COMP%] {\n  color: #4caf50;\n  font-weight: bold;\n}\n\n\n\n.features-included[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n\n.features-included[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 22px;\n  margin-bottom: 15px;\n}\n\n.features-list[_ngcontent-%COMP%] {\n  list-style-type: none;\n  padding: 0;\n}\n\n.features-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 10px 0;\n  border-bottom: 1px solid #eee;\n}\n\n.features-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n\n.features-list[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #4caf50;\n  margin-right: 15px;\n  font-size: 18px;\n}\n\n\n\n.next-steps[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n\n.next-steps[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 22px;\n  margin-bottom: 15px;\n  text-align: center;\n}\n\n.steps-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  justify-content: center;\n}\n\n.step-card[_ngcontent-%COMP%] {\n  flex: 1;\n  background-color: #f9f9f9;\n  border-radius: 8px;\n  padding: 20px;\n  text-align: center;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n\n.step-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);\n}\n\n.step-icon[_ngcontent-%COMP%] {\n  font-size: 36px;\n  color: #0a7abf;\n  margin-bottom: 15px;\n}\n\n.step-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #333;\n  font-size: 18px;\n  margin-bottom: 10px;\n}\n\n.step-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #666;\n  margin-bottom: 15px;\n  min-height: 40px;\n}\n\n.step-btn[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  background-color: #0a7abf;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  font-size: 14px;\n  font-weight: bold;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n}\n\n.step-btn[_ngcontent-%COMP%]:hover {\n  background-color: #086494;\n}\n\n.upgrade-btn[_ngcontent-%COMP%] {\n  background-color: #ffd700;\n  color: #333;\n}\n\n.upgrade-btn[_ngcontent-%COMP%]:hover {\n  background-color: #e6c200;\n}\n\n\n\n.support-section[_ngcontent-%COMP%] {\n  text-align: center;\n  background-color: #f5f5f5;\n  padding: 30px;\n  border-radius: 8px;\n}\n\n.support-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  font-size: 22px;\n  margin-bottom: 15px;\n}\n\n.support-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #666;\n  margin-bottom: 20px;\n  max-width: 600px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.support-btn[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  background-color: #0a7abf;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  font-size: 14px;\n  font-weight: bold;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n}\n\n.support-btn[_ngcontent-%COMP%]:hover {\n  background-color: #086494;\n}\n\n\n\n@media (max-width: 768px) {\n  .steps-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .step-card[_ngcontent-%COMP%] {\n    margin-bottom: 20px;\n  }\n\n  .step-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    min-height: auto;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvY29uZmlybWFjaW9uLXBsYW4tYmFzaWNvL2NvbmZpcm1hY2lvbi1wbGFuLWJhc2ljby5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaUJBQWlCO0VBQ2pCLGNBQWM7RUFDZCxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsY0FBYztFQUNkLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLHdDQUF3QztBQUMxQzs7QUFFQSwrQkFBK0I7QUFDL0I7RUFDRSxrQkFBa0I7RUFDbEIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGNBQWM7RUFDZCxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsZUFBZTtFQUNmLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxlQUFlO0FBQ2pCOztBQUVBLHdCQUF3QjtBQUN4QjtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxlQUFlO0VBQ2YsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGtCQUFrQjtFQUNsQixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLGVBQWU7RUFDZiw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsV0FBVztBQUNiOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsY0FBYztFQUNkLGlCQUFpQjtBQUNuQjs7QUFFQSw2QkFBNkI7QUFDN0I7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsZUFBZTtFQUNmLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixVQUFVO0FBQ1o7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLGVBQWU7RUFDZiw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxjQUFjO0VBQ2Qsa0JBQWtCO0VBQ2xCLGVBQWU7QUFDakI7O0FBRUEsc0JBQXNCO0FBQ3RCO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsY0FBYztFQUNkLGVBQWU7RUFDZixtQkFBbUI7RUFDbkIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFNBQVM7RUFDVCx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxPQUFPO0VBQ1AseUJBQXlCO0VBQ3pCLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLHFEQUFxRDtBQUN2RDs7QUFFQTtFQUNFLDJCQUEyQjtFQUMzQiwwQ0FBMEM7QUFDNUM7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsY0FBYztFQUNkLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxlQUFlO0VBQ2YsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsV0FBVztFQUNYLG1CQUFtQjtFQUNuQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWixZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsZUFBZTtFQUNmLHNDQUFzQztBQUN4Qzs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixXQUFXO0FBQ2I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUEsMkJBQTJCO0FBQzNCO0VBQ0Usa0JBQWtCO0VBQ2xCLHlCQUF5QjtFQUN6QixhQUFhO0VBQ2Isa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsY0FBYztFQUNkLGVBQWU7RUFDZixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsbUJBQW1CO0VBQ25CLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLHlCQUF5QjtFQUN6QixZQUFZO0VBQ1osWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLGVBQWU7RUFDZixzQ0FBc0M7QUFDeEM7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUEsc0JBQXNCO0FBQ3RCO0VBQ0U7SUFDRSxzQkFBc0I7RUFDeEI7O0VBRUE7SUFDRSxtQkFBbUI7RUFDckI7O0VBRUE7SUFDRSxnQkFBZ0I7RUFDbEI7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5wYWdlLWNvbnRhaW5lciB7XHJcbiAgbWF4LXdpZHRoOiAxMjAwcHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgcGFkZGluZzogMjBweDtcclxufVxyXG5cclxuLmJyZWFkY3J1bWIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxufVxyXG5cclxuLmJyZWFkY3J1bWIgYSB7XHJcbiAgY29sb3I6ICMwYTdhYmY7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG59XHJcblxyXG4uYnJlYWRjcnVtYiAuc2VwYXJhdG9yIHtcclxuICBtYXJnaW46IDAgOHB4O1xyXG4gIGNvbG9yOiAjMGE3YWJmO1xyXG59XHJcblxyXG4uYnJlYWRjcnVtYiAuY3VycmVudCB7XHJcbiAgY29sb3I6ICMwYTdhYmY7XHJcbn1cclxuXHJcbi5jb250ZW50LWNvbnRhaW5lciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgcGFkZGluZzogMzBweDtcclxuICBib3gtc2hhZG93OiAwIDJweCA0cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG59XHJcblxyXG4vKiBDb25maXJtYXRpb24gSGVhZGVyIFN0eWxlcyAqL1xyXG4uY29uZmlybWF0aW9uLWhlYWRlciB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XHJcbn1cclxuXHJcbi5jb25maXJtYXRpb24taWNvbiB7XHJcbiAgZm9udC1zaXplOiA2NHB4O1xyXG4gIGNvbG9yOiAjNGNhZjUwO1xyXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbn1cclxuXHJcbi5jb25maXJtYXRpb24tdGl0bGUge1xyXG4gIGNvbG9yOiAjMzMzO1xyXG4gIGZvbnQtc2l6ZTogMjhweDtcclxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4uY29uZmlybWF0aW9uLXN1YnRpdGxlIHtcclxuICBjb2xvcjogIzY2NjtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbn1cclxuXHJcbi8qIFBsYW4gRGV0YWlscyBTdHlsZXMgKi9cclxuLnBsYW4tZGV0YWlscyB7XHJcbiAgbWFyZ2luLWJvdHRvbTogNDBweDtcclxufVxyXG5cclxuLnBsYW4tZGV0YWlscyBoMiB7XHJcbiAgY29sb3I6ICMwYTdhYmY7XHJcbiAgZm9udC1zaXplOiAyMnB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbn1cclxuXHJcbi5kZXRhaWxzLWNhcmQge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7XHJcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gIHBhZGRpbmc6IDIwcHg7XHJcbn1cclxuXHJcbi5kZXRhaWwtcm93IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBwYWRkaW5nOiAxMHB4IDA7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlZWU7XHJcbn1cclxuXHJcbi5kZXRhaWwtcm93Omxhc3QtY2hpbGQge1xyXG4gIGJvcmRlci1ib3R0b206IG5vbmU7XHJcbn1cclxuXHJcbi5kZXRhaWwtbGFiZWwge1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGNvbG9yOiAjNjY2O1xyXG59XHJcblxyXG4uZGV0YWlsLXZhbHVlIHtcclxuICBjb2xvcjogIzMzMztcclxufVxyXG5cclxuLnN0YXR1cy1hY3RpdmUge1xyXG4gIGNvbG9yOiAjNGNhZjUwO1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG4vKiBGZWF0dXJlcyBJbmNsdWRlZCBTdHlsZXMgKi9cclxuLmZlYXR1cmVzLWluY2x1ZGVkIHtcclxuICBtYXJnaW4tYm90dG9tOiA0MHB4O1xyXG59XHJcblxyXG4uZmVhdHVyZXMtaW5jbHVkZWQgaDIge1xyXG4gIGNvbG9yOiAjMGE3YWJmO1xyXG4gIGZvbnQtc2l6ZTogMjJweDtcclxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xyXG59XHJcblxyXG4uZmVhdHVyZXMtbGlzdCB7XHJcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xyXG4gIHBhZGRpbmc6IDA7XHJcbn1cclxuXHJcbi5mZWF0dXJlcy1saXN0IGxpIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgcGFkZGluZzogMTBweCAwO1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWVlO1xyXG59XHJcblxyXG4uZmVhdHVyZXMtbGlzdCBsaTpsYXN0LWNoaWxkIHtcclxuICBib3JkZXItYm90dG9tOiBub25lO1xyXG59XHJcblxyXG4uZmVhdHVyZXMtbGlzdCBpIHtcclxuICBjb2xvcjogIzRjYWY1MDtcclxuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG59XHJcblxyXG4vKiBOZXh0IFN0ZXBzIFN0eWxlcyAqL1xyXG4ubmV4dC1zdGVwcyB7XHJcbiAgbWFyZ2luLWJvdHRvbTogNDBweDtcclxufVxyXG5cclxuLm5leHQtc3RlcHMgaDIge1xyXG4gIGNvbG9yOiAjMGE3YWJmO1xyXG4gIGZvbnQtc2l6ZTogMjJweDtcclxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLnN0ZXBzLWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBnYXA6IDIwcHg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbi5zdGVwLWNhcmQge1xyXG4gIGZsZXg6IDE7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgcGFkZGluZzogMjBweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZSwgYm94LXNoYWRvdyAwLjNzIGVhc2U7XHJcbn1cclxuXHJcbi5zdGVwLWNhcmQ6aG92ZXIge1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNXB4KTtcclxuICBib3gtc2hhZG93OiAwIDEwcHggMjBweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbn1cclxuXHJcbi5zdGVwLWljb24ge1xyXG4gIGZvbnQtc2l6ZTogMzZweDtcclxuICBjb2xvcjogIzBhN2FiZjtcclxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xyXG59XHJcblxyXG4uc3RlcC1jYXJkIGgzIHtcclxuICBjb2xvcjogIzMzMztcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxufVxyXG5cclxuLnN0ZXAtY2FyZCBwIHtcclxuICBjb2xvcjogIzY2NjtcclxuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xyXG4gIG1pbi1oZWlnaHQ6IDQwcHg7XHJcbn1cclxuXHJcbi5zdGVwLWJ0biB7XHJcbiAgcGFkZGluZzogMTBweCAyMHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwYTdhYmY7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3MgZWFzZTtcclxufVxyXG5cclxuLnN0ZXAtYnRuOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDg2NDk0O1xyXG59XHJcblxyXG4udXBncmFkZS1idG4ge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmQ3MDA7XHJcbiAgY29sb3I6ICMzMzM7XHJcbn1cclxuXHJcbi51cGdyYWRlLWJ0bjpob3ZlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U2YzIwMDtcclxufVxyXG5cclxuLyogU3VwcG9ydCBTZWN0aW9uIFN0eWxlcyAqL1xyXG4uc3VwcG9ydC1zZWN0aW9uIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcclxuICBwYWRkaW5nOiAzMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxufVxyXG5cclxuLnN1cHBvcnQtc2VjdGlvbiBoMiB7XHJcbiAgY29sb3I6ICMwYTdhYmY7XHJcbiAgZm9udC1zaXplOiAyMnB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbn1cclxuXHJcbi5zdXBwb3J0LXNlY3Rpb24gcCB7XHJcbiAgY29sb3I6ICM2NjY7XHJcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxuICBtYXgtd2lkdGg6IDYwMHB4O1xyXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xyXG4gIG1hcmdpbi1yaWdodDogYXV0bztcclxufVxyXG5cclxuLnN1cHBvcnQtYnRuIHtcclxuICBwYWRkaW5nOiAxMHB4IDIwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBhN2FiZjtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcyBlYXNlO1xyXG59XHJcblxyXG4uc3VwcG9ydC1idG46aG92ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwODY0OTQ7XHJcbn1cclxuXHJcbi8qIFJlc3BvbnNpdmUgU3R5bGVzICovXHJcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gIC5zdGVwcy1jb250YWluZXIge1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICB9XHJcblxyXG4gIC5zdGVwLWNhcmQge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxuICB9XHJcblxyXG4gIC5zdGVwLWNhcmQgcCB7XHJcbiAgICBtaW4taGVpZ2h0OiBhdXRvO1xyXG4gIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
      });
    }
  }
  return ConfirmacionPlanBasicoComponent;
})();

/***/ })

};
;
//# sourceMappingURL=204.js.map