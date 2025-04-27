/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 69787:
/*!*******************!*\
  !*** ./server.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   app: () => (/* binding */ app),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   extractRoutes: () => (/* binding */ extractRoutes),
/* harmony export */   renderApplication: () => (/* reexport safe */ _angular_platform_server__WEBPACK_IMPORTED_MODULE_7__.renderApplication),
/* harmony export */   renderModule: () => (/* reexport safe */ _angular_platform_server__WEBPACK_IMPORTED_MODULE_7__.renderModule),
/* harmony export */   "ɵSERVER_CONTEXT": () => (/* reexport safe */ _angular_platform_server__WEBPACK_IMPORTED_MODULE_7__["ɵSERVER_CONTEXT"])
/* harmony export */ });
/* harmony import */ var zone_js_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zone.js/node */ 55365);
/* harmony import */ var zone_js_node__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zone_js_node__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 94556);
/* harmony import */ var _angular_ssr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/ssr */ 25286);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express */ 96255);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! node:fs */ 73024);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! node:path */ 76760);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _src_main_server__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/main.server */ 71117);
/* harmony import */ var _angular_platform_server__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-server */ 51372);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 37100);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 61504);







// The Express app is exported so that it can be used by serverless Functions.
function app() {
  const server = express__WEBPACK_IMPORTED_MODULE_2___default()();
  const distFolder = (0,node_path__WEBPACK_IMPORTED_MODULE_4__.join)(process.cwd(), 'dist/tienda-web-loto-ai/browser');
  const indexHtml = (0,node_fs__WEBPACK_IMPORTED_MODULE_3__.existsSync)((0,node_path__WEBPACK_IMPORTED_MODULE_4__.join)(distFolder, 'index.original.html')) ? (0,node_path__WEBPACK_IMPORTED_MODULE_4__.join)(distFolder, 'index.original.html') : (0,node_path__WEBPACK_IMPORTED_MODULE_4__.join)(distFolder, 'index.html');
  const commonEngine = new _angular_ssr__WEBPACK_IMPORTED_MODULE_1__.CommonEngine();
  server.set('view engine', 'html');
  server.set('views', distFolder);
  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express__WEBPACK_IMPORTED_MODULE_2___default()["static"](distFolder, {
    maxAge: '1y'
  }));
  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const {
      protocol,
      originalUrl,
      baseUrl,
      headers
    } = req;
    commonEngine.render({
      bootstrap: _src_main_server__WEBPACK_IMPORTED_MODULE_5__["default"],
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: distFolder,
      providers: [{
        provide: _angular_common__WEBPACK_IMPORTED_MODULE_6__.APP_BASE_HREF,
        useValue: baseUrl
      }]
    }).then(html => res.send(html)).catch(err => next(err));
  });
  return server;
}
function run() {
  const port = process.env['PORT'] || 4000;
  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}
const mainModule = require.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_src_main_server__WEBPACK_IMPORTED_MODULE_5__["default"]);

  // EXPORTS added by @angular-devkit/build-angular
  
  /**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */



async function* getRoutesFromRouterConfig(routes, compiler, parentInjector, parentRoute = '') {
    for (const route of routes) {
        const { path, redirectTo, loadChildren, children } = route;
        if (path === undefined) {
            continue;
        }
        const currentRoutePath = buildRoutePath(parentRoute, path);
        if (redirectTo !== undefined) {
            // TODO: handle `redirectTo`.
            yield { route: currentRoutePath, success: false, redirect: true };
            continue;
        }
        if (/[:*]/.test(path)) {
            // TODO: handle parameterized routes population.
            yield { route: currentRoutePath, success: false, redirect: false };
            continue;
        }
        yield { route: currentRoutePath, success: true, redirect: false };
        if (children?.length) {
            yield* getRoutesFromRouterConfig(children, compiler, parentInjector, currentRoutePath);
        }
        if (loadChildren) {
            const loadedChildRoutes = await (0,_angular_router__WEBPACK_IMPORTED_MODULE_8__["ɵloadChildren"])(route, compiler, parentInjector).toPromise();
            if (loadedChildRoutes) {
                const { routes: childRoutes, injector = parentInjector } = loadedChildRoutes;
                yield* getRoutesFromRouterConfig(childRoutes, compiler, injector, currentRoutePath);
            }
        }
    }
}
async function* extractRoutes(bootstrapAppFnOrModule, document) {
    const platformRef = (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.createPlatformFactory)(_angular_core__WEBPACK_IMPORTED_MODULE_9__.platformCore, 'server', [
        {
            provide: _angular_platform_server__WEBPACK_IMPORTED_MODULE_7__.INITIAL_CONFIG,
            useValue: { document, url: '' },
        },
        {
            provide: _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵConsole"],
            /** An Angular Console Provider that does not print a set of predefined logs. */
            useFactory: () => {
                class Console extends _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵConsole"] {
                    ignoredLogs = new Set(['Angular is running in development mode.']);
                    log(message) {
                        if (!this.ignoredLogs.has(message)) {
                            super.log(message);
                        }
                    }
                }
                return new Console();
            },
        },
        ..._angular_platform_server__WEBPACK_IMPORTED_MODULE_7__["ɵINTERNAL_SERVER_PLATFORM_PROVIDERS"],
    ])();
    try {
        let applicationRef;
        if (isBootstrapFn(bootstrapAppFnOrModule)) {
            applicationRef = await bootstrapAppFnOrModule();
        }
        else {
            const moduleRef = await platformRef.bootstrapModule(bootstrapAppFnOrModule);
            applicationRef = moduleRef.injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_9__.ApplicationRef);
        }
        // Wait until the application is stable.
        await (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵwhenStable"])(applicationRef);
        const injector = applicationRef.injector;
        const router = injector.get(_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router);
        if (router.config.length === 0) {
            // In case there are no routes available
            yield { route: '', success: true, redirect: false };
        }
        else {
            const compiler = injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_9__.Compiler);
            // Extract all the routes from the config.
            yield* getRoutesFromRouterConfig(router.config, compiler, injector);
        }
    }
    finally {
        platformRef.destroy();
    }
}
function isBootstrapFn(value) {
    // We can differentiate between a module and a bootstrap function by reading compiler-generated `ɵmod` static property:
    return typeof value === 'function' && !('ɵmod' in value);
}
function buildRoutePath(...routeParts) {
    return routeParts.filter(Boolean).join('/');
}


/***/ }),

/***/ 47865:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 61504);
/* harmony import */ var _shared_header_header_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared/header/header.component */ 73247);
/* harmony import */ var _shared_footer_footer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/footer/footer.component */ 69743);
/* harmony import */ var _components_cookie_banner_cookie_banner_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/cookie-banner/cookie-banner.component */ 96798);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37100);
/* harmony import */ var _services_analytics_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/analytics.service */ 73933);






let AppComponent = /*#__PURE__*/(() => {
  class AppComponent {
    constructor(analyticsService) {
      this.analyticsService = analyticsService;
    }
    ngOnInit() {
      // Inicializar el servicio de análisis con tu ID de Google Analytics
      // Reemplaza 'UA-XXXXXXXXX-X' con tu ID real cuando lo tengas
      this.analyticsService.initializeAnalytics('UA-XXXXXXXXX-X');
    }
    static {
      this.ɵfac = function AppComponent_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_analytics_service__WEBPACK_IMPORTED_MODULE_3__.AnalyticsService));
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
        type: AppComponent,
        selectors: [["app-root"]],
        standalone: true,
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵStandaloneFeature"]],
        decls: 5,
        vars: 0,
        consts: [[1, "main"]],
        template: function AppComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "app-header");
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "main", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "router-outlet");
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "app-footer")(4, "app-cookie-banner");
          }
        },
        dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterOutlet, _shared_header_header_component__WEBPACK_IMPORTED_MODULE_0__.HeaderComponent, _shared_footer_footer_component__WEBPACK_IMPORTED_MODULE_1__.FooterComponent, _components_cookie_banner_cookie_banner_component__WEBPACK_IMPORTED_MODULE_2__.CookieBannerComponent],
        encapsulation: 2
      });
    }
  }
  return AppComponent;
})();

/***/ }),

/***/ 98561:
/*!**************************************!*\
  !*** ./src/app/app.config.server.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   config: () => (/* binding */ config)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 37100);
/* harmony import */ var _angular_platform_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-server */ 51372);
/* harmony import */ var _app_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.config */ 66150);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ 70356);
/* harmony import */ var _universal_fixes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./universal-fixes */ 6068);
/* harmony import */ var _ngx_bootstrap_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ngx-bootstrap-server */ 42157);






// Configurar el entorno del servidor
(0,_universal_fixes__WEBPACK_IMPORTED_MODULE_1__.suppressCssErrors)();
(0,_ngx_bootstrap_server__WEBPACK_IMPORTED_MODULE_2__.configureNgxBootstrapForServer)();
const serverConfig = {
  providers: [(0,_angular_platform_server__WEBPACK_IMPORTED_MODULE_3__.provideServerRendering)(), (0,_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.provideClientHydration)()]
};
const config = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.mergeApplicationConfig)(_app_config__WEBPACK_IMPORTED_MODULE_0__.appConfig, serverConfig);

/***/ }),

/***/ 66150:
/*!*******************************!*\
  !*** ./src/app/app.config.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appConfig: () => (/* binding */ appConfig)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 37100);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 61504);
/* harmony import */ var _app_routes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.routes */ 76054);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ 70356);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 21099);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ 77403);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 46584);
/* harmony import */ var ngx_bootstrap_carousel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-bootstrap/carousel */ 54635);









const appConfig = {
  providers: [(0,_angular_router__WEBPACK_IMPORTED_MODULE_1__.provideRouter)(_app_routes__WEBPACK_IMPORTED_MODULE_0__.routes), (0,_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__.provideClientHydration)(), (0,_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.provideHttpClient)((0,_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.withFetch)()), (0,_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__.provideAnimations)(), (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.importProvidersFrom)(_angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule, ngx_bootstrap_carousel__WEBPACK_IMPORTED_MODULE_7__.CarouselModule.forRoot())]
};

/***/ }),

/***/ 76054:
/*!*******************************!*\
  !*** ./src/app/app.routes.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   routes: () => (/* binding */ routes)
/* harmony export */ });
/* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./guards/auth.guard */ 41425);

const routes = [{
  path: 'auth',
  loadChildren: () => __webpack_require__.e(/*! import() */ 246).then(__webpack_require__.bind(__webpack_require__, /*! ./auth/auth.module */ 16246)).then(m => m.AuthModule)
}, {
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
}, {
  path: 'home',
  loadComponent: () => __webpack_require__.e(/*! import() */ 942).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/home/home.component */ 54942)).then(m => m.HomeComponent)
}, {
  path: 'conocenos',
  loadComponent: () => __webpack_require__.e(/*! import() */ 854).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/conocenos/conocenos.component */ 60854)).then(m => m.ConocenosComponent)
}, {
  path: 'accesibilidad',
  loadComponent: () => __webpack_require__.e(/*! import() */ 550).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/accesibilidad/accesibilidad.component */ 12550)).then(m => m.AccesibilidadComponent)
}, {
  path: 'aviso-legal',
  loadComponent: () => __webpack_require__.e(/*! import() */ 606).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/aviso-legal/aviso-legal.component */ 31606)).then(m => m.AvisoLegalComponent)
}, {
  path: 'ayuda',
  loadComponent: () => __webpack_require__.e(/*! import() */ 274).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/ayuda/ayuda.component */ 80274)).then(m => m.AyudaComponent)
}, {
  path: 'contacto',
  loadComponent: () => __webpack_require__.e(/*! import() */ 905).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/contacto/contacto.component */ 53286)).then(m => m.ContactoComponent)
}, {
  path: 'gestion-cookies',
  loadComponent: () => __webpack_require__.e(/*! import() */ 130).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/gestion-cookies/gestion-cookies.component */ 5130)).then(m => m.GestionCookiesComponent)
}, {
  path: 'proteccion-datos',
  loadComponent: () => __webpack_require__.e(/*! import() */ 812).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/proteccion-datos/proteccion-datos.component */ 7812)).then(m => m.ProteccionDatosComponent)
}, {
  path: 'juego-seguro',
  loadComponent: () => __webpack_require__.e(/*! import() */ 968).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/juego-seguro/juego-seguro.component */ 46968)).then(m => m.JuegoSeguroComponent)
}, {
  path: 'uso-web',
  loadComponent: () => __webpack_require__.e(/*! import() */ 286).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/uso-web/uso-web.component */ 48286)).then(m => m.UsoWebComponent)
}, {
  path: 'restriccion-edad',
  loadComponent: () => __webpack_require__.e(/*! import() */ 428).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/restriccion-edad/restriccion-edad.component */ 32428)).then(m => m.RestriccionEdadComponent)
}, {
  path: 'euromillon',
  loadComponent: () => __webpack_require__.e(/*! import() */ 788).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/euromillon/euromillon.component */ 98788)).then(m => m.EuromillonComponent)
}, {
  path: 'primitiva',
  loadComponent: () => __webpack_require__.e(/*! import() */ 110).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/primitiva/primitiva.component */ 98110)).then(m => m.PrimitivaComponent)
}, {
  path: 'gordo-primitiva',
  loadComponent: () => __webpack_require__.e(/*! import() */ 718).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/gordo-primitiva/gordo-primitiva.component */ 38718)).then(m => m.GordoPrimitivaComponent)
}, {
  path: 'eurodreams',
  loadComponent: () => __webpack_require__.e(/*! import() */ 846).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/eurodreams/eurodreams.component */ 73846)).then(m => m.EurodreamsComponent)
}, {
  path: 'loteria-nacional',
  loadComponent: () => __webpack_require__.e(/*! import() */ 612).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/loteria-nacional/loteria-nacional.component */ 42612)).then(m => m.LoteriaNacionalComponent)
}, {
  path: 'lototurf',
  loadComponent: () => __webpack_require__.e(/*! import() */ 226).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/lototurf/lototurf.component */ 47226)).then(m => m.LototurfComponent)
}, {
  path: 'bonoloto',
  loadComponent: () => __webpack_require__.e(/*! import() */ 324).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/bonoloto/bonoloto.component */ 6324)).then(m => m.BonolotoComponent)
}, {
  path: 'planes',
  loadComponent: () => __webpack_require__.e(/*! import() */ 818).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/planes/planes.component */ 15818)).then(m => m.PlanesComponent)
}, {
  path: 'pasarela-pago/:plan',
  loadComponent: () => __webpack_require__.e(/*! import() */ 798).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/pasarela-pago/pasarela-pago.component */ 15798)).then(m => m.PasarelaPagoComponent)
}, {
  path: 'confirmacion-plan-basico',
  loadComponent: () => __webpack_require__.e(/*! import() */ 204).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/confirmacion-plan-basico/confirmacion-plan-basico.component */ 48204)).then(m => m.ConfirmacionPlanBasicoComponent)
}, {
  path: 'confirmacion-plan-mensual',
  loadComponent: () => __webpack_require__.e(/*! import() */ 614).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/confirmacion-plan-mensual/confirmacion-plan-mensual.component */ 28614)).then(m => m.ConfirmacionPlanMensualComponent)
}, {
  path: 'confirmacion-plan-pro',
  loadComponent: () => __webpack_require__.e(/*! import() */ 406).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/confirmacion-plan-pro/confirmacion-plan-pro.component */ 9406)).then(m => m.ConfirmacionPlanProComponent)
}, {
  path: 'registro',
  loadComponent: () => __webpack_require__.e(/*! import() */ 760).then(__webpack_require__.bind(__webpack_require__, /*! ./auth/register/register.component */ 78760)).then(m => m.RegisterComponent)
}, {
  path: 'recuperar-password',
  loadComponent: () => __webpack_require__.e(/*! import() */ 776).then(__webpack_require__.bind(__webpack_require__, /*! ./auth/forgot-password/forgot-password.component */ 19776)).then(m => m.ForgotPasswordComponent)
}, {
  path: 'reset-password/:token',
  loadComponent: () => __webpack_require__.e(/*! import() */ 432).then(__webpack_require__.bind(__webpack_require__, /*! ./auth/reset-password/reset-password.component */ 72432)).then(m => m.ResetPasswordComponent)
}, {
  path: 'profile',
  loadComponent: () => __webpack_require__.e(/*! import() */ 826).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/profile/profile.component */ 65826)).then(m => m.ProfileComponent),
  canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.authGuard]
}, {
  path: 'verificar/:token',
  loadComponent: () => __webpack_require__.e(/*! import() */ 390).then(__webpack_require__.bind(__webpack_require__, /*! ./auth/verify-email/verify-email.component */ 50390)).then(m => m.VerifyEmailComponent)
}, {
  path: 'bienvenido',
  loadComponent: () => __webpack_require__.e(/*! import() */ 494).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/welcome/welcome.component */ 21494)).then(m => m.WelcomeComponent)
},
// Rutas de ejemplos de bolas de lotería eliminadas
{
  path: '**',
  redirectTo: 'home'
}];

/***/ }),

/***/ 96798:
/*!*********************************************************************!*\
  !*** ./src/app/components/cookie-banner/cookie-banner.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CookieBannerComponent: () => (/* binding */ CookieBannerComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 94556);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 61504);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 46584);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37100);
/* harmony import */ var _services_cookie_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/cookie.service */ 63113);







function CookieBannerComponent_div_0_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 5)(1, "div", 6)(2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Uso de cookies");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, " LOTO IA.COM utiliza cookies propias y de terceros para mejorar tu experiencia de navegaci\u00F3n, mostrar contenido personalizado y analizar el tr\u00E1fico del sitio. Al hacer clic en \"Aceptar todas\", consientes el uso de todas las cookies. Puedes personalizar tus preferencias o rechazar las cookies no esenciales haciendo clic en \"Personalizar\". ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 7)(7, "a", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Pol\u00EDtica de cookies");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Pol\u00EDtica de privacidad");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 10)(12, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CookieBannerComponent_div_0_div_2_Template_button_click_12_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.toggleDetails());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Personalizar");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CookieBannerComponent_div_0_div_2_Template_button_click_14_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.rejectAll());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Solo necesarias");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CookieBannerComponent_div_0_div_2_Template_button_click_16_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.acceptAll());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Aceptar todas");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
}
function CookieBannerComponent_div_0_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 13)(1, "div", 14)(2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Configuraci\u00F3n de cookies");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CookieBannerComponent_div_0_div_3_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.toggleDetails());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 16)(7, "div", 17)(8, "div", 18)(9, "div", 19)(10, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Cookies necesarias");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Siempre activas");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](15, "input", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "p", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, " Estas cookies son necesarias para el funcionamiento b\u00E1sico del sitio web y no se pueden desactivar. Incluyen cookies que permiten recordar tus acciones durante la navegaci\u00F3n, gestionar la sesi\u00F3n y proporcionar funcionalidades esenciales como el acceso a \u00E1reas seguras. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "div", 17)(19, "div", 18)(20, "div", 19)(21, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, "Cookies funcionales");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "div", 21)(24, "input", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function CookieBannerComponent_div_0_div_3_Template_input_ngModelChange_24_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r1.consent.functional, $event) || (ctx_r1.consent.functional = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "p", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26, " Estas cookies permiten mejorar la funcionalidad y personalizaci\u00F3n del sitio. Pueden ser establecidas por nosotros o por terceros cuyos servicios hemos a\u00F1adido a nuestras p\u00E1ginas. Si no aceptas estas cookies, es posible que algunos servicios no funcionen correctamente. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "div", 17)(28, "div", 18)(29, "div", 19)(30, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](31, "Cookies anal\u00EDticas");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "div", 21)(33, "input", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function CookieBannerComponent_div_0_div_3_Template_input_ngModelChange_33_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r1.consent.analytics, $event) || (ctx_r1.consent.analytics = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](34, "p", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](35, " Estas cookies nos permiten contar las visitas y fuentes de tr\u00E1fico para medir y mejorar el rendimiento de nuestro sitio. Nos ayudan a saber qu\u00E9 p\u00E1ginas son las m\u00E1s y menos populares, y c\u00F3mo se mueven los visitantes por el sitio. Si no permites estas cookies, no sabremos cu\u00E1ndo has visitado nuestro sitio. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](36, "div", 17)(37, "div", 18)(38, "div", 19)(39, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](40, "Cookies de marketing");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](41, "div", 21)(42, "input", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function CookieBannerComponent_div_0_div_3_Template_input_ngModelChange_42_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r1.consent.marketing, $event) || (ctx_r1.consent.marketing = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](43, "p", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](44, " Estas cookies pueden ser establecidas a trav\u00E9s de nuestro sitio por nuestros socios publicitarios. Pueden ser utilizadas por estas empresas para crear un perfil de tus intereses y mostrarte anuncios relevantes en otros sitios. No almacenan directamente informaci\u00F3n personal, sino que se basan en la identificaci\u00F3n \u00FAnica de tu navegador y dispositivo. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](45, "div", 17)(46, "div", 18)(47, "div", 19)(48, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](49, "Cookies de preferencias");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](50, "div", 21)(51, "input", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function CookieBannerComponent_div_0_div_3_Template_input_ngModelChange_51_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r1.consent.preferences, $event) || (ctx_r1.consent.preferences = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](52, "p", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](53, " Estas cookies permiten recordar informaci\u00F3n que cambia el aspecto o comportamiento del sitio, como tu idioma preferido o la regi\u00F3n en la que te encuentras. Ayudan a personalizar tu experiencia pero no son esenciales para el uso del sitio web. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](54, "div", 25)(55, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CookieBannerComponent_div_0_div_3_Template_button_click_55_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.rejectAll());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](56, "Rechazar todas");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](57, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CookieBannerComponent_div_0_div_3_Template_button_click_57_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.savePreferences());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](58, "Guardar preferencias");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("checked", ctx_r1.consent.necessary);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.consent.functional);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.consent.analytics);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.consent.marketing);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.consent.preferences);
  }
}
function CookieBannerComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 1)(1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, CookieBannerComponent_div_0_div_2_Template, 18, 0, "div", 3)(3, CookieBannerComponent_div_0_div_3_Template, 59, 5, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r1.showDetails);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.showDetails);
  }
}
let CookieBannerComponent = /*#__PURE__*/(() => {
  class CookieBannerComponent {
    constructor(cookieService) {
      this.cookieService = cookieService;
      this.showBanner = false;
      this.showDetails = false;
      this.consent = {
        necessary: true,
        functional: false,
        analytics: false,
        marketing: false,
        preferences: false
      };
    }
    ngOnInit() {
      // Forzar la visualización del banner para pruebas
      this.showBanner = true;
      // También verificar con el servicio (comentado para pruebas)
      // this.showBanner = this.cookieService.shouldShowCookieBanner();
      console.log('CookieBannerComponent inicializado, showBanner:', this.showBanner);
      // Obtener el consentimiento actual
      this.cookieService.consent$.subscribe(consent => {
        this.consent = {
          ...consent
        };
        console.log('Consentimiento actual:', this.consent);
      });
    }
    acceptAll() {
      this.cookieService.acceptAll();
      this.showBanner = false;
    }
    rejectAll() {
      this.cookieService.rejectAll();
      this.showBanner = false;
    }
    savePreferences() {
      this.cookieService.saveConsent(this.consent);
      this.showBanner = false;
      this.showDetails = false;
    }
    toggleDetails() {
      this.showDetails = !this.showDetails;
    }
    closeBanner() {
      // Solo oculta el banner sin guardar preferencias
      this.showBanner = false;
    }
    static {
      this.ɵfac = function CookieBannerComponent_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || CookieBannerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_cookie_service__WEBPACK_IMPORTED_MODULE_0__.CookieService));
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: CookieBannerComponent,
        selectors: [["app-cookie-banner"]],
        standalone: true,
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
        decls: 1,
        vars: 1,
        consts: [["class", "cookie-banner", 4, "ngIf"], [1, "cookie-banner"], [1, "cookie-banner-container"], ["class", "cookie-banner-main", 4, "ngIf"], ["class", "cookie-banner-details", 4, "ngIf"], [1, "cookie-banner-main"], [1, "cookie-banner-content"], [1, "cookie-banner-links"], ["routerLink", "/gestion-cookies", "target", "_blank"], ["routerLink", "/proteccion-datos", "target", "_blank"], [1, "cookie-banner-actions"], [1, "btn-secondary", 3, "click"], [1, "btn-primary", 3, "click"], [1, "cookie-banner-details"], [1, "cookie-banner-header"], [1, "btn-close", 3, "click"], [1, "cookie-categories"], [1, "cookie-category"], [1, "category-header"], [1, "category-title"], [1, "badge"], [1, "category-toggle"], ["type", "checkbox", "disabled", "", 3, "checked"], [1, "category-description"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], [1, "cookie-banner-actions", "details-actions"]],
        template: function CookieBannerComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, CookieBannerComponent_div_0_Template, 4, 2, "div", 0);
          }
          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.showBanner);
          }
        },
        dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLink, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel],
        styles: [".cookie-banner[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  background-color: rgba(0, 0, 0, 0.8);\n  z-index: 9999;\n  color: #fff;\n  padding: 20px 0;\n  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);\n}\n\n.cookie-banner-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 20px;\n}\n\n.cookie-banner-main[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.cookie-banner-content[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n\n.cookie-banner-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  margin-bottom: 10px;\n  color: #fff;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.2);\n  padding-bottom: 10px;\n}\n\n.cookie-banner-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.5;\n  margin-bottom: 15px;\n}\n\n.cookie-banner-links[_ngcontent-%COMP%] {\n  margin-bottom: 15px;\n}\n\n.cookie-banner-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #0a7abf;\n  text-decoration: none;\n  margin-right: 20px;\n  font-size: 14px;\n}\n\n.cookie-banner-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n\n.cookie-banner-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n}\n\n.btn-primary[_ngcontent-%COMP%], .btn-secondary[_ngcontent-%COMP%], .btn-close[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-weight: bold;\n  transition: background-color 0.3s;\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  background-color: #0a7abf;\n  color: white;\n}\n\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background-color: #0569a6;\n}\n\n.btn-secondary[_ngcontent-%COMP%] {\n  background-color: #444;\n  color: white;\n}\n\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background-color: #555;\n}\n\n.btn-close[_ngcontent-%COMP%] {\n  background: none;\n  font-size: 24px;\n  padding: 0;\n  color: #fff;\n}\n\n\n\n.cookie-banner-details[_ngcontent-%COMP%] {\n  background-color: #222;\n  border-radius: 5px;\n  padding: 20px;\n}\n\n.cookie-banner-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.2);\n  padding-bottom: 10px;\n}\n\n.cookie-banner-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #fff;\n}\n\n.cookie-categories[_ngcontent-%COMP%] {\n  max-height: 400px;\n  overflow-y: auto;\n  margin-bottom: 20px;\n}\n\n.cookie-category[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n  padding-bottom: 20px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n}\n\n.cookie-category[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n\n.category-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 10px;\n}\n\n.category-title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n  color: #fff;\n}\n\n.badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  background-color: #0a7abf;\n  color: white;\n  font-size: 12px;\n  padding: 2px 8px;\n  border-radius: 10px;\n  margin-left: 10px;\n}\n\n.category-description[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #ccc;\n  line-height: 1.4;\n}\n\n.category-toggle[_ngcontent-%COMP%]   input[type=\"checkbox\"][_ngcontent-%COMP%] {\n  width: 40px;\n  height: 20px;\n  appearance: none;\n  background-color: #555;\n  border-radius: 10px;\n  position: relative;\n  cursor: pointer;\n  outline: none;\n}\n\n.category-toggle[_ngcontent-%COMP%]   input[type=\"checkbox\"][_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  width: 16px;\n  height: 16px;\n  border-radius: 50%;\n  top: 2px;\n  left: 2px;\n  background-color: white;\n  transition: transform 0.3s;\n}\n\n.category-toggle[_ngcontent-%COMP%]   input[type=\"checkbox\"][_ngcontent-%COMP%]:checked {\n  background-color: #0a7abf;\n}\n\n.category-toggle[_ngcontent-%COMP%]   input[type=\"checkbox\"][_ngcontent-%COMP%]:checked::before {\n  transform: translateX(20px);\n}\n\n.category-toggle[_ngcontent-%COMP%]   input[type=\"checkbox\"][_ngcontent-%COMP%]:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n\n.details-actions[_ngcontent-%COMP%] {\n  justify-content: center;\n  margin-top: 20px;\n}\n\n\n\n@media (min-width: 768px) {\n  .cookie-banner-main[_ngcontent-%COMP%] {\n    flex-direction: row;\n    align-items: center;\n  }\n\n  .cookie-banner-content[_ngcontent-%COMP%] {\n    flex: 1;\n    margin-bottom: 0;\n    margin-right: 20px;\n  }\n\n  .cookie-banner-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    min-width: 150px;\n  }\n\n  .details-actions[_ngcontent-%COMP%] {\n    flex-direction: row;\n  }\n}\n\n\n\n@media (max-width: 767px) {\n  .cookie-banner[_ngcontent-%COMP%] {\n    padding: 15px 0;\n  }\n\n  .cookie-banner-container[_ngcontent-%COMP%] {\n    padding: 0 15px;\n  }\n\n  .cookie-banner-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n\n  .cookie-banner-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n\n  .cookie-banner-actions[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n    justify-content: center;\n  }\n\n  .btn-primary[_ngcontent-%COMP%], .btn-secondary[_ngcontent-%COMP%] {\n    width: 100%;\n    margin-bottom: 10px;\n    text-align: center;\n  }\n\n  .cookie-banner-links[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n  }\n\n  .cookie-banner-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    margin-right: 0;\n    margin-bottom: 10px;\n  }\n\n  .cookie-categories[_ngcontent-%COMP%] {\n    max-height: 300px;\n  }\n\n  .category-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .category-toggle[_ngcontent-%COMP%] {\n    margin-top: 10px;\n  }\n}\n\n\n\n@media (max-width: 480px) {\n  .cookie-banner-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n\n  .cookie-banner-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n\n  .cookie-banner-details[_ngcontent-%COMP%] {\n    padding: 15px;\n  }\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9jb29raWUtYmFubmVyL2Nvb2tpZS1iYW5uZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGVBQWU7RUFDZixTQUFTO0VBQ1QsT0FBTztFQUNQLFdBQVc7RUFDWCxvQ0FBb0M7RUFDcEMsYUFBYTtFQUNiLFdBQVc7RUFDWCxlQUFlO0VBQ2YsMENBQTBDO0FBQzVDOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGNBQWM7RUFDZCxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixtQkFBbUI7RUFDbkIsV0FBVztFQUNYLGlEQUFpRDtFQUNqRCxvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSwwQkFBMEI7QUFDNUI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IseUJBQXlCO0VBQ3pCLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsaUNBQWlDO0FBQ25DOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLFVBQVU7RUFDVixXQUFXO0FBQ2I7O0FBRUEsb0NBQW9DO0FBQ3BDO0VBQ0Usc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIsaURBQWlEO0VBQ2pELG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLFNBQVM7RUFDVCxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLG1CQUFtQjtFQUNuQixvQkFBb0I7RUFDcEIsaURBQWlEO0FBQ25EOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixtQkFBbUI7RUFDbkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsU0FBUztFQUNULGVBQWU7RUFDZixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsV0FBVztFQUNYLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osZ0JBQWdCO0VBQ2hCLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixTQUFTO0VBQ1QsdUJBQXVCO0VBQ3ZCLDBCQUEwQjtBQUM1Qjs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLFlBQVk7RUFDWixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsZ0JBQWdCO0FBQ2xCOztBQUVBLGVBQWU7QUFDZjtFQUNFO0lBQ0UsbUJBQW1CO0lBQ25CLG1CQUFtQjtFQUNyQjs7RUFFQTtJQUNFLE9BQU87SUFDUCxnQkFBZ0I7SUFDaEIsa0JBQWtCO0VBQ3BCOztFQUVBO0lBQ0Usc0JBQXNCO0lBQ3RCLGdCQUFnQjtFQUNsQjs7RUFFQTtJQUNFLG1CQUFtQjtFQUNyQjtBQUNGOztBQUVBLHFDQUFxQztBQUNyQztFQUNFO0lBQ0UsZUFBZTtFQUNqQjs7RUFFQTtJQUNFLGVBQWU7RUFDakI7O0VBRUE7SUFDRSxlQUFlO0VBQ2pCOztFQUVBO0lBQ0UsZUFBZTtFQUNqQjs7RUFFQTtJQUNFLGVBQWU7SUFDZix1QkFBdUI7RUFDekI7O0VBRUE7SUFDRSxXQUFXO0lBQ1gsbUJBQW1CO0lBQ25CLGtCQUFrQjtFQUNwQjs7RUFFQTtJQUNFLGFBQWE7SUFDYixzQkFBc0I7RUFDeEI7O0VBRUE7SUFDRSxlQUFlO0lBQ2YsbUJBQW1CO0VBQ3JCOztFQUVBO0lBQ0UsaUJBQWlCO0VBQ25COztFQUVBO0lBQ0Usc0JBQXNCO0lBQ3RCLHVCQUF1QjtFQUN6Qjs7RUFFQTtJQUNFLGdCQUFnQjtFQUNsQjtBQUNGOztBQUVBLHdDQUF3QztBQUN4QztFQUNFO0lBQ0UsZUFBZTtFQUNqQjs7RUFFQTtJQUNFLGVBQWU7RUFDakI7O0VBRUE7SUFDRSxhQUFhO0VBQ2Y7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5jb29raWUtYmFubmVyIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuOCk7XG4gIHotaW5kZXg6IDk5OTk7XG4gIGNvbG9yOiAjZmZmO1xuICBwYWRkaW5nOiAyMHB4IDA7XG4gIGJveC1zaGFkb3c6IDAgLTJweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcbn1cblxuLmNvb2tpZS1iYW5uZXItY29udGFpbmVyIHtcbiAgbWF4LXdpZHRoOiAxMjAwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBwYWRkaW5nOiAwIDIwcHg7XG59XG5cbi5jb29raWUtYmFubmVyLW1haW4ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4uY29va2llLWJhbm5lci1jb250ZW50IHtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbn1cblxuLmNvb2tpZS1iYW5uZXItY29udGVudCBoMiB7XG4gIGZvbnQtc2l6ZTogMjJweDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgY29sb3I6ICNmZmY7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMik7XG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xufVxuXG4uY29va2llLWJhbm5lci1jb250ZW50IHAge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XG59XG5cbi5jb29raWUtYmFubmVyLWxpbmtzIHtcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcbn1cblxuLmNvb2tpZS1iYW5uZXItbGlua3MgYSB7XG4gIGNvbG9yOiAjMGE3YWJmO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIG1hcmdpbi1yaWdodDogMjBweDtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4uY29va2llLWJhbm5lci1saW5rcyBhOmhvdmVyIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG59XG5cbi5jb29raWUtYmFubmVyLWFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICBnYXA6IDEwcHg7XG59XG5cbi5idG4tcHJpbWFyeSwgLmJ0bi1zZWNvbmRhcnksIC5idG4tY2xvc2Uge1xuICBwYWRkaW5nOiAxMHB4IDIwcHg7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3M7XG59XG5cbi5idG4tcHJpbWFyeSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwYTdhYmY7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLmJ0bi1wcmltYXJ5OmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzA1NjlhNjtcbn1cblxuLmJ0bi1zZWNvbmRhcnkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDQ0O1xuICBjb2xvcjogd2hpdGU7XG59XG5cbi5idG4tc2Vjb25kYXJ5OmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU1NTtcbn1cblxuLmJ0bi1jbG9zZSB7XG4gIGJhY2tncm91bmQ6IG5vbmU7XG4gIGZvbnQtc2l6ZTogMjRweDtcbiAgcGFkZGluZzogMDtcbiAgY29sb3I6ICNmZmY7XG59XG5cbi8qIEVzdGlsb3MgcGFyYSBlbCBwYW5lbCBkZXRhbGxhZG8gKi9cbi5jb29raWUtYmFubmVyLWRldGFpbHMge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjIyO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIHBhZGRpbmc6IDIwcHg7XG59XG5cbi5jb29raWUtYmFubmVyLWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcbiAgcGFkZGluZy1ib3R0b206IDEwcHg7XG59XG5cbi5jb29raWUtYmFubmVyLWhlYWRlciBoMiB7XG4gIG1hcmdpbjogMDtcbiAgY29sb3I6ICNmZmY7XG59XG5cbi5jb29raWUtY2F0ZWdvcmllcyB7XG4gIG1heC1oZWlnaHQ6IDQwMHB4O1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxuXG4uY29va2llLWNhdGVnb3J5IHtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgcGFkZGluZy1ib3R0b206IDIwcHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XG59XG5cbi5jb29raWUtY2F0ZWdvcnk6bGFzdC1jaGlsZCB7XG4gIGJvcmRlci1ib3R0b206IG5vbmU7XG59XG5cbi5jYXRlZ29yeS1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG59XG5cbi5jYXRlZ29yeS10aXRsZSBoMyB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBjb2xvcjogI2ZmZjtcbn1cblxuLmJhZGdlIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGE3YWJmO1xuICBjb2xvcjogd2hpdGU7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgcGFkZGluZzogMnB4IDhweDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XG59XG5cbi5jYXRlZ29yeS1kZXNjcmlwdGlvbiB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgY29sb3I6ICNjY2M7XG4gIGxpbmUtaGVpZ2h0OiAxLjQ7XG59XG5cbi5jYXRlZ29yeS10b2dnbGUgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdIHtcbiAgd2lkdGg6IDQwcHg7XG4gIGhlaWdodDogMjBweDtcbiAgYXBwZWFyYW5jZTogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU1NTtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbi5jYXRlZ29yeS10b2dnbGUgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdOjpiZWZvcmUge1xuICBjb250ZW50OiBcIlwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiAxNnB4O1xuICBoZWlnaHQ6IDE2cHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgdG9wOiAycHg7XG4gIGxlZnQ6IDJweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzO1xufVxuXG4uY2F0ZWdvcnktdG9nZ2xlIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXTpjaGVja2VkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBhN2FiZjtcbn1cblxuLmNhdGVnb3J5LXRvZ2dsZSBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl06Y2hlY2tlZDo6YmVmb3JlIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDIwcHgpO1xufVxuXG4uY2F0ZWdvcnktdG9nZ2xlIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXTpkaXNhYmxlZCB7XG4gIG9wYWNpdHk6IDAuNztcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cblxuLmRldGFpbHMtYWN0aW9ucyB7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBtYXJnaW4tdG9wOiAyMHB4O1xufVxuXG4vKiBSZXNwb25zaXZlICovXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgLmNvb2tpZS1iYW5uZXItbWFpbiB7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG5cbiAgLmNvb2tpZS1iYW5uZXItY29udGVudCB7XG4gICAgZmxleDogMTtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgIG1hcmdpbi1yaWdodDogMjBweDtcbiAgfVxuXG4gIC5jb29raWUtYmFubmVyLWFjdGlvbnMge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgbWluLXdpZHRoOiAxNTBweDtcbiAgfVxuXG4gIC5kZXRhaWxzLWFjdGlvbnMge1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIH1cbn1cblxuLyogTWVqb3JhcyBlc3BlY8ODwq1maWNhcyBwYXJhIG3Dg8KzdmlsZXMgKi9cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuICAuY29va2llLWJhbm5lciB7XG4gICAgcGFkZGluZzogMTVweCAwO1xuICB9XG5cbiAgLmNvb2tpZS1iYW5uZXItY29udGFpbmVyIHtcbiAgICBwYWRkaW5nOiAwIDE1cHg7XG4gIH1cblxuICAuY29va2llLWJhbm5lci1jb250ZW50IGgyIHtcbiAgICBmb250LXNpemU6IDE4cHg7XG4gIH1cblxuICAuY29va2llLWJhbm5lci1jb250ZW50IHAge1xuICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgfVxuXG4gIC5jb29raWUtYmFubmVyLWFjdGlvbnMge1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgfVxuXG4gIC5idG4tcHJpbWFyeSwgLmJ0bi1zZWNvbmRhcnkge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG5cbiAgLmNvb2tpZS1iYW5uZXItbGlua3Mge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxuXG4gIC5jb29raWUtYmFubmVyLWxpbmtzIGEge1xuICAgIG1hcmdpbi1yaWdodDogMDtcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICB9XG5cbiAgLmNvb2tpZS1jYXRlZ29yaWVzIHtcbiAgICBtYXgtaGVpZ2h0OiAzMDBweDtcbiAgfVxuXG4gIC5jYXRlZ29yeS1oZWFkZXIge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIH1cblxuICAuY2F0ZWdvcnktdG9nZ2xlIHtcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICB9XG59XG5cbi8qIEFqdXN0ZXMgcGFyYSBwYW50YWxsYXMgbXV5IHBlcXVlw4PCsWFzICovXG5AbWVkaWEgKG1heC13aWR0aDogNDgwcHgpIHtcbiAgLmNvb2tpZS1iYW5uZXItY29udGVudCBoMiB7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICB9XG5cbiAgLmNvb2tpZS1iYW5uZXItY29udGVudCBwIHtcbiAgICBmb250LXNpemU6IDEycHg7XG4gIH1cblxuICAuY29va2llLWJhbm5lci1kZXRhaWxzIHtcbiAgICBwYWRkaW5nOiAxNXB4O1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
      });
    }
  }
  return CookieBannerComponent;
})();

/***/ }),

/***/ 41425:
/*!**************************************!*\
  !*** ./src/app/guards/auth.guard.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   authGuard: () => (/* binding */ authGuard)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37100);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 61504);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/auth.service */ 28617);



const authGuard = (route, state) => {
  const authService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService);
  const router = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router);
  if (authService.currentUserValue) {
    return true;
  }
  router.navigate(['/'], {
    queryParams: {
      returnUrl: state.url
    }
  });
  return false;
};

/***/ }),

/***/ 42157:
/*!*****************************************!*\
  !*** ./src/app/ngx-bootstrap-server.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   configureNgxBootstrapForServer: () => (/* binding */ configureNgxBootstrapForServer)
/* harmony export */ });
/**
 * Configuración para ngx-bootstrap en el servidor
 *
 * Este archivo proporciona una configuración para que ngx-bootstrap
 * funcione correctamente en el entorno de servidor (SSR).
 */
/**
 * Configura el entorno del servidor para ngx-bootstrap
 */
function configureNgxBootstrapForServer() {
  if (typeof window === 'undefined') {
    // Solo ejecutar en el servidor (SSR)
    try {
      // Crear un objeto document simulado
      global.document = {
        querySelector: () => ({}),
        createElement: () => ({
          style: {},
          setAttribute: () => {},
          appendChild: () => {}
        }),
        createTextNode: () => ({}),
        documentElement: {
          style: {}
        },
        head: {
          appendChild: () => {}
        },
        body: {
          appendChild: () => {}
        }
      };
      // Crear un objeto window simulado
      global.window = {
        document: global.document,
        getComputedStyle: () => ({
          getPropertyValue: () => ''
        }),
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true,
        location: {
          href: '',
          pathname: ''
        },
        navigator: {
          userAgent: 'SSR'
        }
      };
      // Otros objetos necesarios
      global.Element = class {};
      global.HTMLElement = class {};
      global.Node = class {};
      global.MutationObserver = class {
        observe() {}
        disconnect() {}
      };
      console.log('Configuración de ngx-bootstrap para el servidor aplicada correctamente');
    } catch (e) {
      console.error('Error al configurar ngx-bootstrap para el servidor:', e);
    }
  }
}

/***/ }),

/***/ 73933:
/*!***********************************************!*\
  !*** ./src/app/services/analytics.service.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnalyticsService: () => (/* binding */ AnalyticsService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37100);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 94556);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 61504);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 28382);
/* harmony import */ var _cookie_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cookie.service */ 63113);







let AnalyticsService = /*#__PURE__*/(() => {
  class AnalyticsService {
    constructor(router, cookieService, platformId) {
      this.router = router;
      this.cookieService = cookieService;
      this.platformId = platformId;
      this.initialized = false;
    }
    /**
     * Inicializa el servicio de análisis si el usuario ha dado su consentimiento
     */
    initializeAnalytics(googleAnalyticsId) {
      if (!(0,_angular_common__WEBPACK_IMPORTED_MODULE_1__.isPlatformBrowser)(this.platformId) || this.initialized) return;
      // Verificar si el usuario ha aceptado las cookies analíticas
      this.cookieService.consent$.subscribe(consent => {
        if (consent.analytics) {
          this.setupGoogleAnalytics(googleAnalyticsId);
          this.trackPageViews();
        } else if (this.initialized) {
          // Si el usuario revoca el consentimiento, desactivar el seguimiento
          this.disableAnalytics();
        }
      });
    }
    /**
     * Configura Google Analytics
     */
    setupGoogleAnalytics(googleAnalyticsId) {
      if (this.initialized) return;
      // Crear el script de Google Analytics
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
      document.head.appendChild(script);
      // Inicializar dataLayer y gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      // Configurar para respetar la privacidad
      window.gtag('config', googleAnalyticsId, {
        'anonymize_ip': true,
        'cookie_flags': 'SameSite=None;Secure',
        'cookie_expires': 365 * 24 * 60 * 60 // 1 año en segundos
      });
      this.initialized = true;
    }
    /**
     * Configura el seguimiento de vistas de página
     */
    trackPageViews() {
      this.router.events.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.filter)(event => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_3__.NavigationEnd)).subscribe(event => {
        if (this.initialized && window.gtag) {
          window.gtag('event', 'page_view', {
            page_path: event.urlAfterRedirects
          });
        }
      });
    }
    /**
     * Desactiva el seguimiento de análisis
     */
    disableAnalytics() {
      if (!(0,_angular_common__WEBPACK_IMPORTED_MODULE_1__.isPlatformBrowser)(this.platformId) || !this.initialized) return;
      // Eliminar cookies de Google Analytics
      this.cookieService.deleteCookie('_ga');
      this.cookieService.deleteCookie('_gid');
      this.cookieService.deleteCookie('_gat');
      // Otras cookies de GA que podrían existir
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const name = cookie.split('=')[0].trim();
        if (name.startsWith('_ga') || name.startsWith('_gid') || name.startsWith('_gat')) {
          this.cookieService.deleteCookie(name);
        }
      }
      this.initialized = false;
    }
    /**
     * Registra un evento personalizado
     */
    trackEvent(eventCategory, eventAction, eventLabel, eventValue) {
      if (!(0,_angular_common__WEBPACK_IMPORTED_MODULE_1__.isPlatformBrowser)(this.platformId) || !this.initialized || !window.gtag) return;
      window.gtag('event', eventAction, {
        'event_category': eventCategory,
        'event_label': eventLabel,
        'value': eventValue
      });
    }
    static {
      this.ɵfac = function AnalyticsService_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || AnalyticsService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_cookie_service__WEBPACK_IMPORTED_MODULE_0__.CookieService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.PLATFORM_ID));
      };
    }
    static {
      this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
        token: AnalyticsService,
        factory: AnalyticsService.ɵfac,
        providedIn: 'root'
      });
    }
  }
  return AnalyticsService;
})();

/***/ }),

/***/ 28617:
/*!******************************************!*\
  !*** ./src/app/services/auth.service.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthService: () => (/* binding */ AuthService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 37100);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 21099);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 47632);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 94556);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 28967);
/* harmony import */ var _cookie_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cookie.service */ 63113);








let AuthService = /*#__PURE__*/(() => {
  class AuthService {
    constructor(http, cookieService, platformId) {
      this.http = http;
      this.cookieService = cookieService;
      this.platformId = platformId;
      this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl;
      this.userStorageKey = 'currentUser';
      this.tokenCookieKey = 'auth_token';
      this.currentUserSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject((0,_angular_common__WEBPACK_IMPORTED_MODULE_3__.isPlatformBrowser)(this.platformId) ? this.getUserFromStorage() : null);
      this.currentUser = this.currentUserSubject.asObservable();
    }
    getUserFromStorage() {
      try {
        // Intentar obtener el usuario del localStorage
        let userStr = localStorage.getItem(this.userStorageKey);
        let user = userStr ? JSON.parse(userStr) : null;
        // Si no hay usuario en localStorage, verificar si hay un token en las cookies
        if (!user) {
          const token = this.cookieService.getCookie(this.tokenCookieKey);
          if (token) {
            // Si hay un token, intentar obtener el usuario
            this.getCurrentUserFromToken(token).subscribe({
              next: userData => {
                if (userData) {
                  user = {
                    ...userData,
                    token
                  };
                  this.setUserInStorage(user);
                  this.currentUserSubject.next(user);
                }
              },
              error: error => {
                console.error('Error al obtener usuario desde token:', error);
                this.cookieService.deleteCookie(this.tokenCookieKey);
              }
            });
          }
        }
        return user;
      } catch (error) {
        console.error('Error al leer usuario del almacenamiento:', error);
        return null;
      }
    }
    getCurrentUserFromToken(token) {
      return this.http.get(`${this.apiUrl}/auth/profile`, {
        headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(response => response.user));
    }
    get currentUserValue() {
      return this.currentUserSubject.value;
    }
    getAuthHeaders() {
      const token = this.currentUserValue?.token || this.cookieService.getCookie(this.tokenCookieKey);
      return new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    }
    checkEmailExists(email) {
      return this.http.post(`${this.apiUrl}/auth/check-email`, {
        email
      });
    }
    register(userData) {
      return this.http.post(`${this.apiUrl}/auth/register`, userData);
    }
    login(credentials) {
      const url = `${this.apiUrl}/auth/login`;
      console.log('Intentando login:', {
        url,
        email: credentials.email,
        apiUrl: this.apiUrl,
        fullUrl: url,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return this.http.post(url, credentials, {
        headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.tap)(response => {
        console.log('Respuesta del servidor:', response);
        if (response.success) {
          const user = {
            ...response.user,
            token: response.token
          };
          // Guardar el token en una cookie segura
          this.cookieService.setConditionalCookie(this.tokenCookieKey, response.token, 'necessary', {
            expires: 7,
            // 7 días
            path: '/',
            secure: true,
            sameSite: 'Strict'
          });
          // Guardar el usuario en localStorage (sin el token)
          this.setUserInStorage(user);
          this.currentUserSubject.next(user);
        }
      }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.catchError)(error => {
        console.error('Error detallado en login:', {
          status: error.status,
          statusText: error.statusText,
          url: error.url,
          message: error.message,
          error: error.error,
          headers: error.headers
        });
        throw error;
      }));
    }
    logout() {
      if ((0,_angular_common__WEBPACK_IMPORTED_MODULE_3__.isPlatformBrowser)(this.platformId)) {
        localStorage.removeItem(this.userStorageKey);
        this.cookieService.deleteCookie(this.tokenCookieKey, {
          path: '/'
        });
      }
      this.currentUserSubject.next(null);
    }
    getCurrentUser() {
      return this.http.get(`${this.apiUrl}/auth/profile`, {
        headers: this.getAuthHeaders()
      }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.tap)(response => {
        if (response.success) {
          const updatedUser = {
            ...this.currentUserValue,
            ...response.user
          };
          this.setUserInStorage(updatedUser);
          this.currentUserSubject.next(updatedUser);
        }
      }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.catchError)(error => {
        if (error.status === 401) {
          this.logout();
        }
        throw error;
      }));
    }
    forgotPassword(email) {
      return this.http.post(`${this.apiUrl}/auth/forgot-password`, {
        email
      });
    }
    resetPassword(resetData) {
      return this.http.post(`${this.apiUrl}/auth/reset-password`, resetData);
    }
    verifyEmail(token) {
      console.log('Verificando email con token:', token);
      return this.http.get(`${this.apiUrl}/auth/verify/${token}`).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.tap)(response => {
        console.log('Respuesta de verificación:', response);
      }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.catchError)(error => {
        console.error('Error en verificación:', error);
        throw error;
      }));
    }
    update(userData) {
      const currentUser = this.currentUserValue;
      if (!currentUser) {
        throw new Error('No hay usuario autenticado');
      }
      return this.http.put(`${this.apiUrl}/auth/users/${currentUser.id}`, userData).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.tap)(updatedUser => {
        const newUser = {
          ...currentUser,
          ...updatedUser
        };
        this.setUserInStorage(newUser);
        this.currentUserSubject.next(newUser);
      }));
    }
    delete() {
      const currentUser = this.currentUserValue;
      if (!currentUser) {
        throw new Error('No hay usuario autenticado');
      }
      return this.http.delete(`${this.apiUrl}/auth/users/${currentUser.id}`).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.tap)(() => {
        this.logout();
      }));
    }
    updateProfile(userId, userData) {
      return this.http.put(`${this.apiUrl}/auth/profile`, userData, {
        headers: this.getAuthHeaders()
      }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.tap)(response => {
        if (response.success) {
          const updatedUser = {
            ...this.currentUserValue,
            ...response.user
          };
          this.setUserInStorage(updatedUser);
          this.currentUserSubject.next(updatedUser);
        }
      }));
    }
    deleteAccount(userId) {
      return this.http.delete(`${this.apiUrl}/auth/profile`, {
        headers: this.getAuthHeaders()
      }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.tap)(() => {
        this.logout();
        window.location.href = '/auth/login';
      }));
    }
    changePassword(passwordData) {
      return this.http.post(`${this.apiUrl}/auth/change-password`, passwordData, {
        headers: this.getAuthHeaders()
      });
    }
    setUserInStorage(user) {
      if ((0,_angular_common__WEBPACK_IMPORTED_MODULE_3__.isPlatformBrowser)(this.platformId)) {
        try {
          if (user) {
            // Guardar usuario sin el token en localStorage
            const {
              token,
              ...userWithoutToken
            } = user;
            localStorage.setItem(this.userStorageKey, JSON.stringify(userWithoutToken));
          } else {
            localStorage.removeItem(this.userStorageKey);
          }
        } catch (error) {
          console.error('Error al guardar usuario en localStorage:', error);
        }
      }
    }
    static {
      this.ɵfac = function AuthService_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_cookie_service__WEBPACK_IMPORTED_MODULE_1__.CookieService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.PLATFORM_ID));
      };
    }
    static {
      this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
        token: AuthService,
        factory: AuthService.ɵfac,
        providedIn: 'root'
      });
    }
  }
  return AuthService;
})();

/***/ }),

/***/ 63113:
/*!********************************************!*\
  !*** ./src/app/services/cookie.service.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CookieService: () => (/* binding */ CookieService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37100);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 94556);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 47632);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_0__);




let CookieService = /*#__PURE__*/(() => {
  class CookieService {
    constructor(platformId) {
      this.platformId = platformId;
      this.consentKey = 'cookie_consent';
      this.consentShownKey = 'cookie_consent_shown';
      this.defaultConsent = {
        necessary: true,
        functional: false,
        analytics: false,
        marketing: false,
        preferences: false
      };
      this.consentSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(this.defaultConsent);
      this.consent$ = this.consentSubject.asObservable();
      if ((0,_angular_common__WEBPACK_IMPORTED_MODULE_1__.isPlatformBrowser)(this.platformId)) {
        // Cargar el consentimiento guardado
        const savedConsent = this.getCookie(this.consentKey);
        if (savedConsent) {
          try {
            const parsedConsent = JSON.parse(savedConsent);
            this.consentSubject.next({
              ...this.defaultConsent,
              ...parsedConsent
            });
          } catch (e) {
            console.error('Error al parsear el consentimiento de cookies:', e);
          }
        }
      }
    }
    /**
     * Establece una cookie
     */
    setCookie(name, value, options = {}) {
      if (!(0,_angular_common__WEBPACK_IMPORTED_MODULE_1__.isPlatformBrowser)(this.platformId)) return;
      let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
      if (options.expires) {
        const expireDate = options.expires instanceof Date ? options.expires : new Date(Date.now() + options.expires * 24 * 60 * 60 * 1000);
        cookieString += `; expires=${expireDate.toUTCString()}`;
      }
      if (options.path) cookieString += `; path=${options.path}`;
      if (options.domain) cookieString += `; domain=${options.domain}`;
      if (options.secure) cookieString += '; secure';
      if (options.sameSite) cookieString += `; samesite=${options.sameSite}`;
      document.cookie = cookieString;
    }
    /**
     * Obtiene el valor de una cookie
     */
    getCookie(name) {
      if (!(0,_angular_common__WEBPACK_IMPORTED_MODULE_1__.isPlatformBrowser)(this.platformId)) return null;
      const matches = document.cookie.match(new RegExp(`(?:^|; )${encodeURIComponent(name)}=([^;]*)`));
      return matches ? decodeURIComponent(matches[1]) : null;
    }
    /**
     * Elimina una cookie
     */
    deleteCookie(name, options = {}) {
      if (!(0,_angular_common__WEBPACK_IMPORTED_MODULE_1__.isPlatformBrowser)(this.platformId)) return;
      this.setCookie(name, '', {
        ...options,
        expires: new Date(0)
      });
    }
    /**
     * Guarda el consentimiento de cookies
     */
    saveConsent(consent) {
      if (!(0,_angular_common__WEBPACK_IMPORTED_MODULE_1__.isPlatformBrowser)(this.platformId)) return;
      const newConsent = {
        ...this.consentSubject.value,
        ...consent,
        necessary: true // Siempre true
      };
      this.consentSubject.next(newConsent);
      // Guardar en una cookie para persistencia
      this.setCookie(this.consentKey, JSON.stringify(newConsent), {
        expires: 365,
        // 1 año
        path: '/',
        sameSite: 'Lax'
      });
      // Marcar que se ha mostrado el banner
      this.setCookie(this.consentShownKey, 'true', {
        expires: 365,
        path: '/',
        sameSite: 'Lax'
      });
    }
    /**
     * Acepta todas las cookies
     */
    acceptAll() {
      this.saveConsent({
        necessary: true,
        functional: true,
        analytics: true,
        marketing: true,
        preferences: true
      });
    }
    /**
     * Rechaza todas las cookies excepto las necesarias
     */
    rejectAll() {
      this.saveConsent({
        necessary: true,
        functional: false,
        analytics: false,
        marketing: false,
        preferences: false
      });
    }
    /**
     * Verifica si se debe mostrar el banner de cookies
     */
    shouldShowCookieBanner() {
      if (!(0,_angular_common__WEBPACK_IMPORTED_MODULE_1__.isPlatformBrowser)(this.platformId)) return false;
      return this.getCookie(this.consentShownKey) !== 'true';
    }
    /**
     * Verifica si una categoría de cookies está permitida
     */
    isCategoryAllowed(category) {
      return category === 'necessary' || this.consentSubject.value[category];
    }
    /**
     * Establece una cookie solo si la categoría está permitida
     */
    setConditionalCookie(name, value, category, options = {}) {
      if (this.isCategoryAllowed(category)) {
        this.setCookie(name, value, options);
        return true;
      }
      return false;
    }
    static {
      this.ɵfac = function CookieService_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || CookieService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.PLATFORM_ID));
      };
    }
    static {
      this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
        token: CookieService,
        factory: CookieService.ɵfac,
        providedIn: 'root'
      });
    }
  }
  return CookieService;
})();

/***/ }),

/***/ 69743:
/*!***************************************************!*\
  !*** ./src/app/shared/footer/footer.component.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FooterComponent: () => (/* binding */ FooterComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 94556);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 61504);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37100);



let FooterComponent = /*#__PURE__*/(() => {
  class FooterComponent {
    constructor() {
      this.currentYear = new Date().getFullYear();
    }
    static {
      this.ɵfac = function FooterComponent_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || FooterComponent)();
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: FooterComponent,
        selectors: [["app-footer"]],
        standalone: true,
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
        decls: 63,
        vars: 1,
        consts: [[1, "footer"], [1, "footer-row", "links"], ["routerLink", "/conocenos"], [1, "vertical-separator"], ["routerLink", "/ayuda"], ["routerLink", "/juego-seguro"], ["routerLink", "/aviso-legal"], ["routerLink", "/proteccion-datos"], ["routerLink", "/uso-web"], ["routerLink", "/accesibilidad"], ["routerLink", "/gestion-cookies"], [1, "footer-row", "social-payment"], [1, "social-icons"], ["href", "#"], ["src", "assets/img/facebook.png", "alt", "Facebook"], ["src", "assets/img/youtube.svg", "alt", "YouTube"], ["src", "assets/img/X.png", "alt", "X"], ["routerLink", "/contacto", 1, "contact-icon"], ["src", "assets/img/icono_msg_header.svg", "alt", "Contacto"], [1, "payment-methods"], ["src", "assets/img/visa.png", "alt", "Visa"], ["src", "assets/img/mastercard.png", "alt", "Mastercard"], ["src", "assets/img/traspaso.png", "alt", "Traspaso R\u00E1pido"], ["src", "assets/img/paypal.png", "alt", "PayPal"], [1, "footer-row", "certifications"], ["routerLink", "/restriccion-edad"], ["src", "assets/img/major18.jpg", "alt", "Mayor 18", 1, "cert-icon"], ["href", "https://www.ordenacionjuego.es/participantes-juego/juego-seguro", "target", "_blank"], ["src", "assets/img/juego-seguro.png", "alt", "Juego Seguro", 1, "cert-icon"], ["href", "https://www.ordenacionjuego.es/participantes-juego/juego-seguro/rgiaj", "target", "_blank"], ["src", "assets/img/warning.svg", "alt", "Juego Autorizado", 1, "cert-icon"], ["href", "https://www.ordenacionjuego.es/participantes-juego", "target", "_blank"], ["src", "assets/img/jugar-bien.png", "alt", "Jugar Bien", 1, "cert-icon"], [1, "copyright-container"], [1, "copyright-text"]],
        template: function FooterComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "footer", 0)(1, "div", 1)(2, "a", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Con\u00F3cenos");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "|");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "a", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Ayuda");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "span", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "|");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "a", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Juego m\u00E1s seguro");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "span", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "|");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "a", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Aviso Legal");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "span", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "|");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "a", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Protecci\u00F3n de datos");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "span", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "|");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "a", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Uso Web");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "span", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "|");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "a", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Accesibilidad");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "span", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "|");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "a", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Gesti\u00F3n de cookies");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 11)(33, "div", 12)(34, "a", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "img", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "a", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](37, "img", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "a", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](39, "img", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "a", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](41, "img", 18);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "Contacto");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "|");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](47, "img", 20)(48, "img", 21)(49, "img", 22)(50, "img", 23);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 24)(52, "a", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](53, "img", 26);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "a", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](55, "img", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "a", 29);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](57, "img", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "a", 31);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](59, "img", 32);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "div", 33)(61, "p", 34);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](62);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
          }
          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](62);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" \u00A9 ", ctx.currentYear, " Todas las marcas de LOTO IA est\u00E1n registradas y est\u00E1 prohibido el uso de estas por terceros sin autorizaci\u00F3n expresa de LOTO IA ");
          }
        },
        dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLink],
        styles: ["[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  background-color: #f8f9fa;\n  border-top: 1px solid #ddd;\n  margin-top: 2rem;\n  position: relative;\n}\n\n.footer[_ngcontent-%COMP%] {\n  padding: 15px 40px;\n  font-family: Arial, sans-serif;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n\n.footer-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 10px 0;\n}\n\n\n\n.links[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n\n.links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #666;\n  text-decoration: none;\n  font-size: 14px;\n}\n\n.links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n\n.vertical-separator[_ngcontent-%COMP%] {\n  color: #666;\n  margin: 0 5px;\n}\n\n\n\n.social-payment[_ngcontent-%COMP%] {\n  justify-content: center;\n  gap: 30px;\n  margin: 20px 0;\n}\n\n.social-icons[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\n\n.social-icons[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  object-fit: contain;\n}\n\n.payment-methods[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\n\n.payment-methods[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  height: 25px;\n  width: auto;\n}\n\n.payment-methods[_ngcontent-%COMP%]   img[alt=\"PayPal\"][_ngcontent-%COMP%] {\n  height: 40px;\n}\n\n\n\n.certifications[_ngcontent-%COMP%] {\n  gap: 20px;\n}\n\n.cert-icon[_ngcontent-%COMP%] {\n  height: 35px;\n  width: auto;\n}\n\n\n\n.contact-icon[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  text-decoration: none;\n  color: #666;\n}\n\n.contact-icon[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n}\n\n.contact-icon[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n\n\n\n.copyright[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #666;\n  font-size: 12px;\n  margin-top: 15px;\n  padding-top: 10px;\n  border-top: 1px solid #ddd;\n  width: 100%;\n}\n\n.copyright-container[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 0;\n  margin-top: 10px;\n  border-top: 1px solid #ddd;\n}\n\n.copyright-text[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #666;\n  font-size: 12px;\n  margin: 0;\n  padding: 0 15px;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQWM7RUFDZCxXQUFXO0VBQ1gseUJBQXlCO0VBQ3pCLDBCQUEwQjtFQUMxQixnQkFBZ0I7RUFDaEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLDhCQUE4QjtFQUM5QixpQkFBaUI7RUFDakIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLGNBQWM7QUFDaEI7O0FBRUEsWUFBWTtBQUNaO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsU0FBUztFQUNULGVBQWU7QUFDakI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gscUJBQXFCO0VBQ3JCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSwwQkFBMEI7QUFDNUI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsYUFBYTtBQUNmOztBQUVBLDJCQUEyQjtBQUMzQjtFQUNFLHVCQUF1QjtFQUN2QixTQUFTO0VBQ1QsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsU0FBUztBQUNYOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUEsb0JBQW9CO0FBQ3BCO0VBQ0UsU0FBUztBQUNYOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFdBQVc7QUFDYjs7QUFFQSxhQUFhO0FBQ2I7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLFFBQVE7RUFDUixxQkFBcUI7RUFDckIsV0FBVztBQUNiOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUEsY0FBYztBQUNkO0VBQ0Usa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQiwwQkFBMEI7RUFDMUIsV0FBVztBQUNiOztBQUVBO0VBQ0UsV0FBVztFQUNYLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsMEJBQTBCO0FBQzVCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxlQUFlO0VBQ2YsU0FBUztFQUNULGVBQWU7QUFDakIiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjlmYTtcclxuICBib3JkZXItdG9wOiAxcHggc29saWQgI2RkZDtcclxuICBtYXJnaW4tdG9wOiAycmVtO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG5cclxuLmZvb3RlciB7XHJcbiAgcGFkZGluZzogMTVweCA0MHB4O1xyXG4gIGZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjtcclxuICBtYXgtd2lkdGg6IDEyMDBweDtcclxuICBtYXJnaW46IDAgYXV0bztcclxufVxyXG5cclxuLmZvb3Rlci1yb3cge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBtYXJnaW46IDEwcHggMDtcclxufVxyXG5cclxuLyogRW5sYWNlcyAqL1xyXG4ubGlua3Mge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBnYXA6IDEwcHg7XHJcbiAgZmxleC13cmFwOiB3cmFwO1xyXG59XHJcblxyXG4ubGlua3MgYSB7XHJcbiAgY29sb3I6ICM2NjY7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxufVxyXG5cclxuLmxpbmtzIGE6aG92ZXIge1xyXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xyXG59XHJcblxyXG4udmVydGljYWwtc2VwYXJhdG9yIHtcclxuICBjb2xvcjogIzY2NjtcclxuICBtYXJnaW46IDAgNXB4O1xyXG59XHJcblxyXG4vKiBSZWRlcyBzb2NpYWxlcyB5IHBhZ29zICovXHJcbi5zb2NpYWwtcGF5bWVudCB7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgZ2FwOiAzMHB4O1xyXG4gIG1hcmdpbjogMjBweCAwO1xyXG59XHJcblxyXG4uc29jaWFsLWljb25zIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiAxNXB4O1xyXG59XHJcblxyXG4uc29jaWFsLWljb25zIGltZyB7XHJcbiAgd2lkdGg6IDIwcHg7XHJcbiAgaGVpZ2h0OiAyMHB4O1xyXG4gIG9iamVjdC1maXQ6IGNvbnRhaW47XHJcbn1cclxuXHJcbi5wYXltZW50LW1ldGhvZHMge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDE1cHg7XHJcbn1cclxuXHJcbi5wYXltZW50LW1ldGhvZHMgaW1nIHtcclxuICBoZWlnaHQ6IDI1cHg7XHJcbiAgd2lkdGg6IGF1dG87XHJcbn1cclxuXHJcbi5wYXltZW50LW1ldGhvZHMgaW1nW2FsdD1cIlBheVBhbFwiXSB7XHJcbiAgaGVpZ2h0OiA0MHB4O1xyXG59XHJcblxyXG4vKiBDZXJ0aWZpY2FjaW9uZXMgKi9cclxuLmNlcnRpZmljYXRpb25zIHtcclxuICBnYXA6IDIwcHg7XHJcbn1cclxuXHJcbi5jZXJ0LWljb24ge1xyXG4gIGhlaWdodDogMzVweDtcclxuICB3aWR0aDogYXV0bztcclxufVxyXG5cclxuLyogQ29udGFjdG8gKi9cclxuLmNvbnRhY3QtaWNvbiB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogNXB4O1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICBjb2xvcjogIzY2NjtcclxufVxyXG5cclxuLmNvbnRhY3QtaWNvbiBpbWcge1xyXG4gIHdpZHRoOiAyMHB4O1xyXG4gIGhlaWdodDogMjBweDtcclxufVxyXG5cclxuLmNvbnRhY3QtaWNvbiBzcGFuIHtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbn1cclxuXHJcbi8qIENvcHlyaWdodCAqL1xyXG4uY29weXJpZ2h0IHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgY29sb3I6ICM2NjY7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIG1hcmdpbi10b3A6IDE1cHg7XHJcbiAgcGFkZGluZy10b3A6IDEwcHg7XHJcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkZGQ7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbi5jb3B5cmlnaHQtY29udGFpbmVyIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBwYWRkaW5nOiAxMHB4IDA7XHJcbiAgbWFyZ2luLXRvcDogMTBweDtcclxuICBib3JkZXItdG9wOiAxcHggc29saWQgI2RkZDtcclxufVxyXG5cclxuLmNvcHlyaWdodC10ZXh0IHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgY29sb3I6ICM2NjY7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIG1hcmdpbjogMDtcclxuICBwYWRkaW5nOiAwIDE1cHg7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
      });
    }
  }
  return FooterComponent;
})();

/***/ }),

/***/ 73247:
/*!***************************************************!*\
  !*** ./src/app/shared/header/header.component.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeaderComponent: () => (/* binding */ HeaderComponent)
/* harmony export */ });
/* harmony import */ var C_Users_Pedro_Desktop_Proyec_web_loto_ia_tienda_web_lotoAI_1_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 91941);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37100);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 21099);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94556);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 61504);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 46584);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/auth.service */ 28617);











const _c0 = () => ["/auth/register"];
function HeaderComponent_div_6_div_12_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 50)(1, "a", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Registrarse");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](1, _c0));
  }
}
function HeaderComponent_div_6_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, HeaderComponent_div_6_div_12_div_2_Template, 3, 2, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r1.loginError, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.loginError.includes("\u00BFDeseas registrarte?"));
  }
}
function HeaderComponent_div_6_span_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Entrar");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function HeaderComponent_div_6_span_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "i", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function HeaderComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 30)(1, "div", 31)(2, "div", 32)(3, "div", 33)(4, "input", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function HeaderComponent_div_6_Template_input_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r1.username, $event) || (ctx_r1.username = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 35)(6, "input", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function HeaderComponent_div_6_Template_input_ngModelChange_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r1.password, $event) || (ctx_r1.password = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("keyup.enter", function HeaderComponent_div_6_Template_input_keyup_enter_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.login());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HeaderComponent_div_6_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.togglePasswordVisibility());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "i", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 39)(10, "a", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HeaderComponent_div_6_Template_a_click_10_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.goToForgotPassword());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "\u00BFHas olvidado tu contrase\u00F1a?");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](12, HeaderComponent_div_6_div_12_Template, 3, 2, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div", 42)(14, "button", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HeaderComponent_div_6_Template_button_click_14_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.login());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](16, "img", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](17, HeaderComponent_div_6_span_17_Template, 2, 0, "span", 46)(18, HeaderComponent_div_6_span_18_Template, 2, 0, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "button", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, "REGISTRO");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.username);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("type", ctx_r1.showPassword ? "text" : "password");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.password);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("fa-eye", !ctx_r1.showPassword)("fa-eye-slash", ctx_r1.showPassword);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.loginError);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx_r1.isLoggingIn);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx_r1.isLoggingIn);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.isLoggingIn);
  }
}
function HeaderComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 53)(1, "div", 54)(2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 55)(5, "button", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Mi Perfil");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "button", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HeaderComponent_div_7_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.logout());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "Cerrar Sesi\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("Bienvenido, ", ctx_r1.currentUser.nombre, "");
  }
}
function HeaderComponent_li_27_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const juego_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r1.botes[juego_r4], " ");
  }
}
function HeaderComponent_li_27_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0, " Cargando... ");
  }
}
function HeaderComponent_li_27_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " MILLONES ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function HeaderComponent_li_27_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " 1ER PREMIO A LA SERIE ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function HeaderComponent_li_27_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " AL MES DURANTE 30 A\u00D1OS ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function HeaderComponent_li_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li", 58)(1, "a", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "img", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 61)(4, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, HeaderComponent_li_27_ng_container_5_Template, 2, 1, "ng-container", 63)(6, HeaderComponent_li_27_ng_template_6_Template, 1, 0, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, HeaderComponent_li_27_div_8_Template, 2, 0, "div", 64)(9, HeaderComponent_li_27_div_9_Template, 2, 0, "div", 64)(10, HeaderComponent_li_27_div_10_Template, 2, 0, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const juego_r4 = ctx.$implicit;
    const loadingTemplate_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](7);
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMap"](juego_r4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", ctx_r1.getRouterLink(juego_r4));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx_r1.getImageUrl(juego_r4), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"])("alt", juego_r4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx_r1.loading)("ngIfElse", loadingTemplate_r5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx_r1.loading && juego_r4 === "euromillones" || juego_r4 === "primitiva" || juego_r4 === "gordo" || juego_r4 === "bonoloto");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx_r1.loading && juego_r4 === "loterianacional");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx_r1.loading && juego_r4 === "eurodreams");
  }
}
let HeaderComponent = /*#__PURE__*/(() => {
  class HeaderComponent {
    constructor() {
      this.http = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient);
      this.router = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router);
      this.authService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_services_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService);
      this.botes = {};
      this.loading = true;
      this.juegos = ['euromillones', 'primitiva', 'bonoloto', 'gordo', 'lototurf', 'eurodreams', 'loterianacional'];
      // Variables para el login
      this.username = '';
      this.password = '';
      this.loginError = '';
      this.isLoggingIn = false;
      this.showPassword = false;
      this.currentUser = null;
    }
    ngOnInit() {
      this.cargarBotes();
      this.authService.currentUser.subscribe(user => {
        this.currentUser = user;
      });
    }
    cargarBotes() {
      var _this = this;
      return (0,C_Users_Pedro_Desktop_Proyec_web_loto_ia_tienda_web_lotoAI_1_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        try {
          const timestamp = new Date().getTime();
          const response = yield _this.http.get(`assets/botes.json?t=${timestamp}`).toPromise();
          if (response) {
            Object.keys(response).forEach(key => {
              if (response[key] && response[key] !== '0') {
                // Limpiamos el texto para mostrar solo el número
                let boteValue = response[key];
                // Eliminar texto adicional y dejar solo el número
                boteValue = boteValue.replace('MILLONES', '').replace('€', '').replace('€', '').trim();
                // Asignar el valor limpio
                _this.botes[key] = boteValue;
              }
            });
          }
        } catch (error) {
          console.error('Error cargando botes:', error);
        } finally {
          _this.loading = false;
        }
      })();
    }
    getImageUrl(juego) {
      const imageMap = {
        'euromillones': 'cabecera_EuromillonesAJ_topaz',
        'primitiva': 'cabecera_PrimitivaAJ_topaz',
        'bonoloto': 'cabecera_BonolotoAJ_topaz',
        'gordo': 'cabecera_ElGordoAJ_topaz',
        'lototurf': 'cabecera_LototurfAJ_topaz',
        'eurodreams': 'cabecera_EurodreamsAJ_topaz',
        'loterianacional': 'cabecera_LoteriaNacionalAJ_topaz'
      };
      const imageName = imageMap[juego.toLowerCase()] || juego;
      return `assets/img/${imageName}.png`;
    }
    getBoteDisplay(juego) {
      return this.botes[juego] || 'Cargando...';
    }
    // Método para iniciar sesión
    login() {
      console.log('Iniciando proceso de login...');
      // Validar campos
      if (!this.username || !this.password) {
        this.loginError = 'Por favor, complete todos los campos';
        return;
      }
      this.isLoggingIn = true;
      this.loginError = '';
      const credentials = {
        email: this.username,
        password: this.password
      };
      console.log('Enviando credenciales al servicio de autenticación...');
      this.authService.login(credentials).subscribe({
        next: response => {
          console.log('Login exitoso:', response);
          this.isLoggingIn = false;
          this.username = '';
          this.password = '';
          this.router.navigate(['/profile']);
        },
        error: error => {
          console.log('Error en login:', {
            status: error.status,
            message: error.error?.message || 'Error desconocido',
            error: error
          });
          this.isLoggingIn = false;
          if (error.status === 404) {
            this.loginError = 'No existe una cuenta con este email. ¿Deseas registrarte?';
          } else if (error.status === 401) {
            this.loginError = 'Contraseña incorrecta';
          } else {
            this.loginError = 'Error al iniciar sesión. Por favor, inténtelo de nuevo.';
          }
        }
      });
    }
    // Método para cerrar sesión
    logout() {
      this.authService.logout();
      this.router.navigate(['/']);
    }
    // Método para navegar a la página de recuperación de contraseña
    goToForgotPassword() {
      this.router.navigate(['/recuperar-password']);
    }
    // Método para navegar a la página de registro
    goToRegister() {
      this.router.navigate(['/registro']);
    }
    // Método para alternar la visibilidad de la contraseña
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
    // Método para obtener la ruta de cada juego
    getRouterLink(juego) {
      const routeMap = {
        'euromillones': '/euromillon',
        'primitiva': '/primitiva',
        'bonoloto': '/bonoloto',
        'gordo': '/gordo-primitiva',
        'lototurf': '/lototurf',
        'eurodreams': '/eurodreams',
        'loterianacional': '/loteria-nacional'
      };
      return routeMap[juego.toLowerCase()] || '/home';
    }
    static {
      this.ɵfac = function HeaderComponent_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || HeaderComponent)();
      };
    }
    static {
      this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: HeaderComponent,
        selectors: [["app-header"]],
        standalone: true,
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
        decls: 36,
        vars: 3,
        consts: [["loadingTemplate", ""], [1, "modulo-cabecera"], [1, "cabecera-superior"], [1, "logo-container"], ["routerLink", "/home"], ["src", "/assets/img/lotoIA-LOGO.jpg", "alt", "LotoIA Logo", 1, "logo"], [1, "user-actions"], ["class", "login-container", 4, "ngIf"], ["class", "user-menu", 4, "ngIf"], [1, "idioma-container"], ["for", "changeLanguage"], ["id", "changeLanguage", "name", "changeLanguage"], ["value", "es", "selected", ""], ["value", "ca"], ["value", "en"], ["value", "eu"], ["value", "gl"], ["value", "va"], [1, "cabecera-inferior"], [1, "juegos-container"], [1, "modulo-menu-juegos"], ["class", "item-menu-juegos", 3, "class", 4, "ngFor", "ngForOf"], [1, "header-line-container"], [1, "header-line-segment", "line-blue"], [1, "header-line-segment", "line-green"], [1, "header-line-segment", "line-brown"], [1, "header-line-segment", "line-red"], [1, "header-line-segment", "line-orange"], [1, "header-line-segment", "line-purple"], [1, "header-line-segment", "line-cyan"], [1, "login-container"], [1, "input-group"], [1, "inputs-row"], [1, "input-field"], ["type", "text", "id", "header-username", "name", "header-username", "placeholder", "Correo electr\u00F3nico o NIF/NIE", "autocomplete", "username", 1, "login-input", 3, "ngModelChange", "ngModel"], [1, "password-input-container"], ["id", "header-password", "name", "header-password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "autocomplete", "current-password", 1, "login-input", 3, "ngModelChange", "keyup.enter", "type", "ngModel"], ["type", "button", 1, "toggle-password-btn", 3, "click"], [1, "fas"], [1, "forgot-password"], [2, "cursor", "pointer", 3, "click"], ["class", "login-error", 4, "ngIf"], [1, "buttons-group"], ["type", "button", 1, "btn-entrar", 3, "click", "disabled"], [1, "btn-entrar-content"], ["src", "/assets/img/boton_entrar.png", "alt", "Icono entrar", 1, "icon-entrar"], [4, "ngIf"], ["type", "button", "routerLink", "/registro", 1, "btn-registro"], [1, "login-error"], ["class", "register-link", 4, "ngIf"], [1, "register-link"], [1, "btn-register", 3, "routerLink"], [1, "fas", "fa-spinner", "fa-spin"], [1, "user-menu"], [1, "user-info"], [1, "user-actions-menu"], ["routerLink", "/profile", 1, "btn-profile"], [1, "btn-logout", 3, "click"], [1, "item-menu-juegos"], [1, "link-cabecera-juego", 3, "routerLink"], [1, "logotipo-juego-cabecera", "web", 3, "src", "alt"], [1, "bote-juego"], [1, "valor"], [4, "ngIf", "ngIfElse"], ["class", "formato", 4, "ngIf"], [1, "formato"]],
        template: function HeaderComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "header", 1)(1, "div", 2)(2, "div", 3)(3, "a", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "img", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, HeaderComponent_div_6_Template, 21, 11, "div", 7)(7, HeaderComponent_div_7_Template, 9, 1, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 9)(9, "label", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Idioma");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "select", 11)(12, "option", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, "Castellano");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "option", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "Catal\u00E0");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "option", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, "English");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "option", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "Euskera");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "option", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, "Galego");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "option", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23, "Valenci\u00E0");
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "div", 18)(25, "div", 19)(26, "ul", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](27, HeaderComponent_li_27_Template, 11, 10, "li", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](28, "div", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](29, "div", 23)(30, "div", 24)(31, "div", 25)(32, "div", 26)(33, "div", 27)(34, "div", 28)(35, "div", 29);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          }
          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.currentUser);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.currentUser);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](20);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.juegos);
          }
        },
        dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClientModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule],
        styles: ["@charset \"UTF-8\";\n\n\n\nbody[_ngcontent-%COMP%], html[_ngcontent-%COMP%] {\n    margin: 0;\n    padding: 0;\n    width: 100%;\n    overflow-x: hidden;\n    font-family: Arial, sans-serif;\n    box-sizing: border-box;\n}\n\n*[_ngcontent-%COMP%], *[_ngcontent-%COMP%]:before, *[_ngcontent-%COMP%]:after {\n    box-sizing: inherit;\n}\n\nhtml[_ngcontent-%COMP%], body[_ngcontent-%COMP%], div[_ngcontent-%COMP%], span[_ngcontent-%COMP%], h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%], p[_ngcontent-%COMP%], a[_ngcontent-%COMP%], img[_ngcontent-%COMP%], ul[_ngcontent-%COMP%], li[_ngcontent-%COMP%], form[_ngcontent-%COMP%], label[_ngcontent-%COMP%] {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    font: inherit;\n    vertical-align: baseline;\n}\n\n\n\nheader.modulo-cabecera[_ngcontent-%COMP%] {\n    width: 100%;\n    max-width: 100vw;\n    background-color: #fff;\n    box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n    margin: 0;\n    padding: 0;\n    position: relative;\n    overflow-x: hidden;\n    display: block;\n}\n\n\n\n.cabecera-superior[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 0;\n    padding-right: 2rem;\n    border-bottom: 1px solid #eee;\n    width: 100%;\n    max-width: 100%;\n    box-sizing: border-box;\n    flex-wrap: wrap;\n}\n\n.logo-container[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n    display: flex;\n    align-items: center;\n    margin-right: 2rem;\n    padding: 0;\n}\n\n.logo-container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    display: block;\n    line-height: 0;\n}\n\n.logo[_ngcontent-%COMP%] {\n    height: 120px;\n    width: auto;\n    object-fit: contain;\n    margin: 0;\n    padding: 0;\n    display: block;\n}\n\n.user-actions[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 2rem;\n}\n\n.login-container[_ngcontent-%COMP%] {\n    display: flex;\n    gap: 1rem;\n    align-items: flex-start;\n}\n\n.input-group[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 0.5rem;\n}\n\n.inputs-row[_ngcontent-%COMP%] {\n    display: flex;\n    gap: 1rem;\n}\n\n.login-input[_ngcontent-%COMP%] {\n    padding: 8px 12px;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    width: 180px;\n    box-sizing: border-box;\n}\n\n.input-field[_ngcontent-%COMP%] {\n    width: 100%;\n    max-width: 180px;\n}\n\n.forgot-password[_ngcontent-%COMP%] {\n    display: flex;\n    gap: 1rem;\n    font-size: 12px;\n}\n\n.forgot-password[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    color: #0066cc;\n    text-decoration: none;\n}\n\n.forgot-password[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n    text-decoration: underline;\n}\n\n.buttons-group[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n}\n\n.icon-entrar[_ngcontent-%COMP%] {\n    height: 24px;\n    width: auto;\n    margin-right: 4px;\n    max-height: 24px; \n\n    max-width: 24px; \n\n    object-fit: contain; \n\n}\n\n.btn-entrar[_ngcontent-%COMP%] {\n    padding: 8px 16px;\n    background-color: #0066cc;\n    color: white;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    min-width: 100px;\n}\n\n.btn-entrar-content[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.btn-registro[_ngcontent-%COMP%] {\n    padding: 8px 16px;\n    background-color: #ff6600;\n    color: white;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n    min-width: 100px;\n    text-align: center;\n}\n\n.idioma-container[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 0.25rem;\n}\n\n.idioma-container[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n    font-size: 14px;\n    color: #666;\n}\n\n#changeLanguage[_ngcontent-%COMP%] {\n    padding: 6px 12px;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    width: 100%;\n    max-width: 180px;\n    box-sizing: border-box;\n}\n\n\n\n.cabecera-inferior[_ngcontent-%COMP%] {\n    padding: 0;\n    background: #fff;\n    width: 100%;\n    max-width: 100%;\n    margin: 0;\n    box-sizing: border-box;\n    overflow-x: hidden;\n}\n\n.juegos-container[_ngcontent-%COMP%] {\n    width: 100%;\n    max-width: 100%;\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n    overflow-x: hidden;\n}\n\n\n\n.modulo-menu-juegos[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: flex-start;\n    padding: 15px 0;\n    margin: 0;\n    list-style: none;\n    width: 100%;\n    max-width: 100%;\n    box-sizing: border-box;\n    flex-wrap: wrap;\n}\n\n.item-menu-juegos[_ngcontent-%COMP%] {\n    flex: 1;\n    text-align: center;\n    padding: 0 10px;\n    border-right: 1px solid #eee;\n    min-width: 100px;\n    box-sizing: border-box;\n}\n\n.item-menu-juegos[_ngcontent-%COMP%]:last-child {\n    border-right: none;\n}\n\n.link-cabecera-juego[_ngcontent-%COMP%] {\n    text-decoration: none;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n\n.logotipo-juego-cabecera[_ngcontent-%COMP%] {\n    height: 50px;\n    width: auto;\n    margin-bottom: 5px;\n    object-fit: contain;\n}\n\n.bote-juego[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    text-align: center;\n    margin-top: 2px;\n    width: 100%;\n}\n\n.valor[_ngcontent-%COMP%] {\n    font-size: 28px;\n    font-weight: bold;\n    line-height: 1.1;\n    color: inherit;\n    width: 100%;\n}\n\n.formato[_ngcontent-%COMP%] {\n    font-size: 11px;\n    text-transform: uppercase;\n    line-height: 1;\n    margin-top: 0;\n    font-weight: bold;\n    color: inherit;\n}\n\n.miles[_ngcontent-%COMP%] {\n    font-size: 12px;\n    display: block;\n}\n\n.btn-entrar[_ngcontent-%COMP%], .btn-registro[_ngcontent-%COMP%] {\n    padding: 0.8rem 1.5rem;\n    font-size: 1rem;\n    color: white;\n    background-color: #007bff; \n\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n    transition: background-color 0.3s ease;\n}\n\n.btn-entrar[_ngcontent-%COMP%]:hover, .btn-registro[_ngcontent-%COMP%]:hover {\n    background-color: #0056b3; \n\n}\n\n\n\n.btn-registro[_ngcontent-%COMP%] {\n    background-color: #28a745; \n\n}\n\n.btn-registro[_ngcontent-%COMP%]:hover {\n    background-color: #218838; \n\n}\n\n.idioma-selector[_ngcontent-%COMP%] {\n    margin-left: 10px;\n}\n\n\n\n.c-cabecera__juego--eurodreams[_ngcontent-%COMP%] {\n    border-bottom: 6px solid #6b3e98;\n    padding-bottom: 0 !important;\n}\n\n.c-cabecera__juego--eurodreams[_ngcontent-%COMP%]:hover {\n    background-image: linear-gradient(to top, rgba(107,62,152,0.1), #fff);\n    margin-bottom: 0;\n}\n\n.c-cabecera-juego__texto_topaz[_ngcontent-%COMP%] {\n    font-family: \"PublicSans-SemiBold\", Arial, sans-serif;\n    white-space: normal;\n}\n\n.c-cabecera-juego__bote_topaz--lnac[_ngcontent-%COMP%] {\n    padding-top: 15px !important;\n}\n\n.c-cabecera-juego__bote--eurodreams[_ngcontent-%COMP%] {\n    padding-top: 0;\n}\n\n.c-cabecera-juego__bote_topaz--eurodreams[_ngcontent-%COMP%] {\n    padding-top: 15px;\n}\n\n.c-cabecera-juego__titulo--eurodreams[_ngcontent-%COMP%], \n.c-cabecera-juego__bote--eurodreams[_ngcontent-%COMP%], \n.c-cabecera-juego__cantidad--eurodreams[_ngcontent-%COMP%], \n.c-cabecera-juego__texto_topaz--eurodreams[_ngcontent-%COMP%] {\n    color: #6b3e98;\n}\n\n\n\n.esta-oculto[_ngcontent-%COMP%] {\n    display: none !important;\n}\n\n.white-space-normal[_ngcontent-%COMP%] {\n    white-space: normal !important;\n}\n\n\n\n@media screen and (min-width: 1201px) {\n    .esta-oculto-pc[_ngcontent-%COMP%] {\n        display: none !important;\n    }\n}\n\n@media screen and (max-width: 1200px) {\n    header.modulo-cabecera[_ngcontent-%COMP%] {\n        flex-wrap: wrap;\n        justify-content: center;\n        height: auto;\n        padding: 15px;\n        overflow: visible; \n\n    }\n\n    .logo-container[_ngcontent-%COMP%] {\n        margin-right: 0;\n        margin-bottom: 15px;\n        width: 100%;\n        text-align: center;\n    }\n\n    .juegos-container[_ngcontent-%COMP%] {\n        order: 3;\n        width: 100%;\n        margin: 15px 0;\n    }\n\n    .modulo-menu-juegos[_ngcontent-%COMP%] {\n        height: auto;\n        flex-wrap: wrap;\n        justify-content: center;\n    }\n\n    .item-menu-juegos[_ngcontent-%COMP%] {\n        flex: 0 1 calc(25% - 10px); \n\n        margin: 5px;\n        min-width: 80px;\n    }\n\n    .user-actions[_ngcontent-%COMP%] {\n        margin-left: 0;\n        width: 100%;\n        justify-content: center;\n        flex-wrap: wrap;\n    }\n\n    .idioma-selector[_ngcontent-%COMP%] {\n        margin-right: 0;\n        margin-bottom: 10px;\n        width: 100%;\n        text-align: center;\n    }\n\n    .btn-entrar[_ngcontent-%COMP%], .btn-registro[_ngcontent-%COMP%] {\n        margin: 5px;\n    }\n\n    .logotipo-juego-cabecera.web[_ngcontent-%COMP%] {\n        height: 35px;\n    }\n\n    .valor[_ngcontent-%COMP%] {\n        font-size: 20px;\n    }\n\n    .formato[_ngcontent-%COMP%] {\n        font-size: 11px;\n    }\n}\n\n@media screen and (max-width: 768px) {\n    .logo[_ngcontent-%COMP%] {\n        height: 80px;\n    }\n\n    .link-cabecera-juego[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n        height: 30px;\n    }\n\n    .bote-juego[_ngcontent-%COMP%] {\n        font-size: 14px;\n    }\n\n    .miles[_ngcontent-%COMP%] {\n        font-size: 10px;\n    }\n\n    .btn-entrar[_ngcontent-%COMP%], .btn-registro[_ngcontent-%COMP%] {\n        padding: 10px 15px;\n        font-size: 16px;\n    }\n\n    .logotipo-juego-cabecera.web[_ngcontent-%COMP%] {\n        height: 30px;\n    }\n\n    .valor[_ngcontent-%COMP%] {\n        font-size: 18px;\n    }\n\n    .formato[_ngcontent-%COMP%] {\n        font-size: 10px;\n    }\n\n    \n\n    .modulo-menu-juegos[_ngcontent-%COMP%] {\n        flex-wrap: wrap;\n        justify-content: center;\n    }\n\n    .item-menu-juegos[_ngcontent-%COMP%] {\n        flex: 0 1 calc(33.33% - 10px);\n        margin: 5px;\n        min-width: 100px;\n        border-right: none;\n        border-bottom: 1px solid #eee;\n        padding-bottom: 10px;\n    }\n}\n\n@media screen and (max-width: 480px) {\n    \n\n    header.modulo-cabecera[_ngcontent-%COMP%] {\n        width: 100vw;\n        max-width: 100vw;\n        overflow-x: hidden;\n    }\n\n    .cabecera-superior[_ngcontent-%COMP%] {\n        flex-direction: column;\n        padding: 10px;\n        width: 100%;\n        max-width: 100%;\n        padding-right: 10px;\n    }\n\n    .logo-container[_ngcontent-%COMP%] {\n        width: 100%;\n        justify-content: center;\n        margin-bottom: 10px;\n        max-width: 100%;\n    }\n\n    .logo[_ngcontent-%COMP%] {\n        height: 80px;\n        margin: 0 auto;\n        max-width: 80%;\n        object-fit: contain;\n    }\n\n    .user-actions[_ngcontent-%COMP%] {\n        flex-direction: column;\n        width: 100%;\n        gap: 10px;\n        max-width: 100%;\n    }\n\n    .login-container[_ngcontent-%COMP%] {\n        flex-direction: column;\n        width: 100%;\n        max-width: 100%;\n    }\n\n    .input-group[_ngcontent-%COMP%] {\n        width: 100%;\n        max-width: 100%;\n    }\n\n    .inputs-row[_ngcontent-%COMP%] {\n        flex-direction: column;\n        width: 100%;\n        gap: 10px;\n        max-width: 100%;\n    }\n\n    .login-input[_ngcontent-%COMP%] {\n        width: 100%;\n        max-width: 100%;\n        box-sizing: border-box;\n    }\n\n    .input-field[_ngcontent-%COMP%] {\n        width: 100%;\n        max-width: 100%;\n    }\n\n    .password-input-container[_ngcontent-%COMP%] {\n        width: 100%;\n        max-width: 100%;\n    }\n\n    .buttons-group[_ngcontent-%COMP%] {\n        width: 100%;\n        justify-content: space-between;\n        margin-top: 10px;\n        max-width: 100%;\n    }\n\n    .btn-entrar[_ngcontent-%COMP%], .btn-registro[_ngcontent-%COMP%] {\n        padding: 8px 12px;\n        font-size: 14px;\n        margin: 0;\n        flex: 1;\n        max-width: 48%;\n    }\n\n    .icon-entrar[_ngcontent-%COMP%] {\n        height: 20px !important;\n        width: 20px !important;\n        max-height: 20px !important;\n        max-width: 20px !important;\n        margin-right: 3px !important;\n    }\n\n    .idioma-container[_ngcontent-%COMP%] {\n        width: 100%;\n        align-items: center;\n        margin-top: 10px;\n        max-width: 100%;\n    }\n\n    #changeLanguage[_ngcontent-%COMP%] {\n        width: 100%;\n        max-width: 200px;\n    }\n\n    \n\n    .cabecera-inferior[_ngcontent-%COMP%] {\n        width: 100%;\n        max-width: 100vw;\n        overflow-x: hidden;\n    }\n\n    .juegos-container[_ngcontent-%COMP%] {\n        width: 100%;\n        max-width: 100%;\n        overflow-x: hidden;\n    }\n\n    .modulo-menu-juegos[_ngcontent-%COMP%] {\n        flex-wrap: wrap;\n        justify-content: center;\n        width: 100%;\n        max-width: 100%;\n        padding: 10px 0;\n    }\n\n    .item-menu-juegos[_ngcontent-%COMP%] {\n        flex: 0 1 calc(50% - 10px); \n\n        margin-bottom: 10px;\n        border-right: none;\n        border-bottom: 1px solid #eee;\n        padding-bottom: 10px;\n    }\n\n    \n\n    .user-menu[_ngcontent-%COMP%] {\n        flex-direction: column;\n        width: 100%;\n        max-width: 100%;\n    }\n\n    .user-info[_ngcontent-%COMP%] {\n        width: 100%;\n        justify-content: center;\n        margin-bottom: 10px;\n        max-width: 100%;\n    }\n\n    .user-actions-menu[_ngcontent-%COMP%] {\n        width: 100%;\n        justify-content: center;\n        max-width: 100%;\n    }\n}\n\n\n\nbody[_ngcontent-%COMP%], html[_ngcontent-%COMP%] {\n    margin: 0;\n    padding: 0;\n    width: 100%;\n    overflow-x: hidden; \n\n}\n\n\n\n@media screen and (max-width: 360px) {\n    .logo[_ngcontent-%COMP%] {\n        height: 70px;\n    }\n\n    .btn-entrar[_ngcontent-%COMP%], .btn-registro[_ngcontent-%COMP%] {\n        padding: 6px 10px;\n        font-size: 12px;\n        min-width: 80px;\n    }\n\n    .icon-entrar[_ngcontent-%COMP%] {\n        height: 16px !important;\n        width: 16px !important;\n        max-height: 16px !important;\n        max-width: 16px !important;\n        margin-right: 2px !important;\n    }\n\n    .login-input[_ngcontent-%COMP%] {\n        padding: 6px 8px;\n        font-size: 14px;\n    }\n\n    .forgot-password[_ngcontent-%COMP%] {\n        font-size: 11px;\n    }\n\n    .idioma-container[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n        font-size: 12px;\n    }\n\n    #changeLanguage[_ngcontent-%COMP%] {\n        padding: 4px 8px;\n        font-size: 12px;\n    }\n}\n\n\n\n.mensaje-error[_ngcontent-%COMP%] {\n    border: 2px solid #e42233 !important;\n}\n\n.oculto-elige8-reserva-espacio[_ngcontent-%COMP%], \n.reserva-espacio[_ngcontent-%COMP%] {\n    visibility: hidden !important;\n}\n\n.ocultar-papelera-elige8-sencilla[_ngcontent-%COMP%] {\n    display: none !important;\n}\n\n\n\n.euromillones[_ngcontent-%COMP%] { background-color: rgba(0, 52, 141, 0.05); }\n.primitiva[_ngcontent-%COMP%] { background-color: rgba(46, 125, 50, 0.05); }\n.bonoloto[_ngcontent-%COMP%] { background-color: rgba(85, 139, 47, 0.05); }\n.gordo[_ngcontent-%COMP%] { background-color: rgba(198, 40, 40, 0.05); }\n.eurodreams[_ngcontent-%COMP%] { background-color: rgba(106, 27, 154, 0.05); }\n.loterianacional[_ngcontent-%COMP%] { background-color: rgba(2, 119, 189, 0.05); }\n.lototurf[_ngcontent-%COMP%] { background-color: rgba(239, 108, 0, 0.05); }\n\n\n\n.euromillones[_ngcontent-%COMP%]   .valor[_ngcontent-%COMP%], \n.euromillones[_ngcontent-%COMP%]   .formato[_ngcontent-%COMP%] {\n    color: #00348D;\n}\n\n.primitiva[_ngcontent-%COMP%]   .valor[_ngcontent-%COMP%], \n.primitiva[_ngcontent-%COMP%]   .formato[_ngcontent-%COMP%] {\n    color: #2E7D32;\n}\n\n.bonoloto[_ngcontent-%COMP%]   .valor[_ngcontent-%COMP%], \n.bonoloto[_ngcontent-%COMP%]   .formato[_ngcontent-%COMP%] {\n    color: #558B2F;\n}\n\n.gordo[_ngcontent-%COMP%]   .valor[_ngcontent-%COMP%], \n.gordo[_ngcontent-%COMP%]   .formato[_ngcontent-%COMP%] {\n    color: #C62828;\n}\n\n\n\n.eurodreams[_ngcontent-%COMP%]   .valor[_ngcontent-%COMP%] {\n    color: #6A1B9A;\n    font-size: 20px;\n}\n\n.loterianacional[_ngcontent-%COMP%]   .valor[_ngcontent-%COMP%] {\n    color: #0277BD;\n    font-size: 20px;\n}\n\n\n\n.eurodreams[_ngcontent-%COMP%]   .bote-juego[_ngcontent-%COMP%]::after {\n    content: \"AL MES DURANTE 30 A\u00D1OS\";\n    font-size: 10px;\n    color: #6A1B9A;\n    margin-top: 2px;\n}\n\n.loterianacional[_ngcontent-%COMP%]   .bote-juego[_ngcontent-%COMP%]::after {\n    content: \"1ER PREMIO A LA SERIE\";\n    font-size: 10px;\n    color: #0277BD;\n    margin-top: 2px;\n}\n\n\n\n.item-menu-juegos[_ngcontent-%COMP%]:hover {\n    background-color: rgba(0,0,0,0.02);\n}\n\n.item-menu-juegos[_ngcontent-%COMP%]:hover   .valor[_ngcontent-%COMP%], \n.item-menu-juegos[_ngcontent-%COMP%]:hover   .formato[_ngcontent-%COMP%] {\n    opacity: 0.9;\n}\n\n.idioma-selector[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n    padding: 0.8rem;\n    font-size: 1rem;\n}\n\n[_nghost-%COMP%] {\n    position: relative;\n}\n\n.header-line-container[_ngcontent-%COMP%] {\n    display: flex;\n    width: 100%;\n    height: 3px;\n    position: absolute;\n    bottom: 0;\n}\n\n.header-line-segment[_ngcontent-%COMP%] {\n    height: 100%;\n    flex: 1;\n}\n\n.line-blue[_ngcontent-%COMP%] {\n    background-color: #00348D;  \n\n}\n\n.line-green[_ngcontent-%COMP%] {\n    background-color: #2E7D32;  \n\n}\n\n.line-brown[_ngcontent-%COMP%] {\n    background-color: #558B2F;  \n\n}\n\n.line-red[_ngcontent-%COMP%] {\n    background-color: #C62828;  \n\n}\n\n.line-orange[_ngcontent-%COMP%] {\n    background-color: #EF6C00;  \n\n}\n\n.line-purple[_ngcontent-%COMP%] {\n    background-color: #6A1B9A;  \n\n}\n\n.line-cyan[_ngcontent-%COMP%] {\n    background-color: #0277BD;  \n\n}\n\n\n\n.password-input-container[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  width: 180px;\n}\n\n\n\n.toggle-password-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 10px;\n  top: 50%;\n  transform: translateY(-50%);\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #666;\n  font-size: 1rem;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.toggle-password-btn[_ngcontent-%COMP%]:hover {\n  color: #333;\n}\n\n.toggle-password-btn[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n\n\n\n.login-error[_ngcontent-%COMP%] {\n  color: #dc3545;\n  margin-top: 10px;\n  font-size: 0.9rem;\n  text-align: center;\n}\n\n\n\n.btn-entrar[_ngcontent-%COMP%]:disabled {\n  background-color: #6c757d;\n  cursor: not-allowed;\n}\n\n\n\n.fa-spinner[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n\n@keyframes _ngcontent-%COMP%_spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n\n.user-menu[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 0.5rem 1rem;\n  background-color: #f8f9fa;\n  border-radius: 4px;\n}\n\n.user-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.user-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #333;\n}\n\n.user-actions-menu[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n}\n\n.btn-profile[_ngcontent-%COMP%], \n.btn-logout[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 0.9rem;\n  transition: background-color 0.3s;\n}\n\n.btn-profile[_ngcontent-%COMP%] {\n  background-color: #007bff;\n  color: white;\n}\n\n.btn-profile[_ngcontent-%COMP%]:hover {\n  background-color: #0056b3;\n}\n\n.btn-logout[_ngcontent-%COMP%] {\n  background-color: #dc3545;\n  color: white;\n}\n\n.btn-logout[_ngcontent-%COMP%]:hover {\n  background-color: #c82333;\n}\n\n.register-link[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  text-align: center;\n}\n\n.btn-register[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 8px 16px;\n  background-color: #28a745;\n  color: white;\n  text-decoration: none;\n  border-radius: 4px;\n  font-size: 0.9rem;\n  transition: background-color 0.3s;\n}\n\n.btn-register[_ngcontent-%COMP%]:hover {\n  background-color: #218838;\n  text-decoration: none;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2hlYWRlci9oZWFkZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7O0FBRWhCLHNCQUFzQjtBQUN0QjtJQUNJLFNBQVM7SUFDVCxVQUFVO0lBQ1YsV0FBVztJQUNYLGtCQUFrQjtJQUNsQiw4QkFBOEI7SUFDOUIsc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0ksbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksU0FBUztJQUNULFVBQVU7SUFDVixTQUFTO0lBQ1QsZUFBZTtJQUNmLGFBQWE7SUFDYix3QkFBd0I7QUFDNUI7O0FBRUEsd0JBQXdCO0FBQ3hCO0lBQ0ksV0FBVztJQUNYLGdCQUFnQjtJQUNoQixzQkFBc0I7SUFDdEIscUNBQXFDO0lBQ3JDLFNBQVM7SUFDVCxVQUFVO0lBQ1Ysa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixjQUFjO0FBQ2xCOztBQUVBLHNDQUFzQztBQUN0QztJQUNJLGFBQWE7SUFDYiw4QkFBOEI7SUFDOUIsbUJBQW1CO0lBQ25CLFVBQVU7SUFDVixtQkFBbUI7SUFDbkIsNkJBQTZCO0lBQzdCLFdBQVc7SUFDWCxlQUFlO0lBQ2Ysc0JBQXNCO0lBQ3RCLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxjQUFjO0lBQ2QsYUFBYTtJQUNiLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsVUFBVTtBQUNkOztBQUVBO0lBQ0ksY0FBYztJQUNkLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsV0FBVztJQUNYLG1CQUFtQjtJQUNuQixTQUFTO0lBQ1QsVUFBVTtJQUNWLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLFNBQVM7QUFDYjs7QUFFQTtJQUNJLGFBQWE7SUFDYixTQUFTO0lBQ1QsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxhQUFh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O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsV0FBVztBQUNiOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7QUFDYjs7QUFFQTs7RUFFRSxvQkFBb0I7RUFDcEIsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLGlDQUFpQztBQUNuQzs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsWUFBWTtBQUNkOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixpQkFBaUI7RUFDakIseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWixxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixpQ0FBaUM7QUFDbkM7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIscUJBQXFCO0FBQ3ZCIiwic291cmNlc0NvbnRlbnQiOlsiQGNoYXJzZXQgXCJVVEYtOFwiO1xyXG5cclxuLyogRXN0aWxvcyBnZW5lcmFsZXMgKi9cclxuYm9keSwgaHRtbCB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgICBmb250LWZhbWlseTogQXJpYWwsIHNhbnMtc2VyaWY7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG59XHJcblxyXG4qLCAqOmJlZm9yZSwgKjphZnRlciB7XHJcbiAgICBib3gtc2l6aW5nOiBpbmhlcml0O1xyXG59XHJcblxyXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGEsIGltZywgdWwsIGxpLCBmb3JtLCBsYWJlbCB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gICAgYm9yZGVyOiAwO1xyXG4gICAgZm9udC1zaXplOiAxMDAlO1xyXG4gICAgZm9udDogaW5oZXJpdDtcclxuICAgIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcclxufVxyXG5cclxuLyogRXN0aWxvcyBkZSBjYWJlY2VyYSAqL1xyXG5oZWFkZXIubW9kdWxvLWNhYmVjZXJhIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgbWF4LXdpZHRoOiAxMDB2dztcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICBib3gtc2hhZG93OiAwIDJweCA0cHggcmdiYSgwLDAsMCwwLjEpO1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG4vKiBFc3RpbG9zIHBhcmEgbGEgZGl2aXNpw4PCs24gc3VwZXJpb3IgKi9cclxuLmNhYmVjZXJhLXN1cGVyaW9yIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDJyZW07XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VlZTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIGZsZXgtd3JhcDogd3JhcDtcclxufVxyXG5cclxuLmxvZ28tY29udGFpbmVyIHtcclxuICAgIGZsZXg6IDAgMCBhdXRvO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDJyZW07XHJcbiAgICBwYWRkaW5nOiAwO1xyXG59XHJcblxyXG4ubG9nby1jb250YWluZXIgYSB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIGxpbmUtaGVpZ2h0OiAwO1xyXG59XHJcblxyXG4ubG9nbyB7XHJcbiAgICBoZWlnaHQ6IDEyMHB4O1xyXG4gICAgd2lkdGg6IGF1dG87XHJcbiAgICBvYmplY3QtZml0OiBjb250YWluO1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG4udXNlci1hY3Rpb25zIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuICAgIGdhcDogMnJlbTtcclxufVxyXG5cclxuLmxvZ2luLWNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZ2FwOiAxcmVtO1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbn1cclxuXHJcbi5pbnB1dC1ncm91cCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGdhcDogMC41cmVtO1xyXG59XHJcblxyXG4uaW5wdXRzLXJvdyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZ2FwOiAxcmVtO1xyXG59XHJcblxyXG4ubG9naW4taW5wdXQge1xyXG4gICAgcGFkZGluZzogOHB4IDEycHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgd2lkdGg6IDE4MHB4O1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxufVxyXG5cclxuLmlucHV0LWZpZWxkIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgbWF4LXdpZHRoOiAxODBweDtcclxufVxyXG5cclxuLmZvcmdvdC1wYXNzd29yZCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZ2FwOiAxcmVtO1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG59XHJcblxyXG4uZm9yZ290LXBhc3N3b3JkIGEge1xyXG4gICAgY29sb3I6ICMwMDY2Y2M7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbn1cclxuXHJcbi5mb3Jnb3QtcGFzc3dvcmQgYTpob3ZlciB7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcclxufVxyXG5cclxuLmJ1dHRvbnMtZ3JvdXAge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDAuNXJlbTtcclxufVxyXG5cclxuLmljb24tZW50cmFyIHtcclxuICAgIGhlaWdodDogMjRweDtcclxuICAgIHdpZHRoOiBhdXRvO1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA0cHg7XHJcbiAgICBtYXgtaGVpZ2h0OiAyNHB4OyAvKiBBc2VndXJhciBxdWUgbm8gY3JlemNhIG3Dg8KhcyBkZSBsbyBlc3BlcmFkbyAqL1xyXG4gICAgbWF4LXdpZHRoOiAyNHB4OyAvKiBMaW1pdGFyIGVsIGFuY2hvIHRhbWJpw4PCqW4gKi9cclxuICAgIG9iamVjdC1maXQ6IGNvbnRhaW47IC8qIE1hbnRlbmVyIGxhIHByb3BvcmNpw4PCs24gKi9cclxufVxyXG5cclxuLmJ0bi1lbnRyYXIge1xyXG4gICAgcGFkZGluZzogOHB4IDE2cHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA2NmNjO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIG1pbi13aWR0aDogMTAwcHg7XHJcbn1cclxuXHJcbi5idG4tZW50cmFyLWNvbnRlbnQge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuLmJ0bi1yZWdpc3RybyB7XHJcbiAgICBwYWRkaW5nOiA4cHggMTZweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZjY2MDA7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBtaW4td2lkdGg6IDEwMHB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uaWRpb21hLWNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGdhcDogMC4yNXJlbTtcclxufVxyXG5cclxuLmlkaW9tYS1jb250YWluZXIgbGFiZWwge1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgY29sb3I6ICM2NjY7XHJcbn1cclxuXHJcbiNjaGFuZ2VMYW5ndWFnZSB7XHJcbiAgICBwYWRkaW5nOiA2cHggMTJweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIG1heC13aWR0aDogMTgwcHg7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG59XHJcblxyXG4vKiBFc3RpbG9zIHBhcmEgbGEgZGl2aXNpw4PCs24gaW5mZXJpb3IgKi9cclxuLmNhYmVjZXJhLWluZmVyaW9yIHtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG59XHJcblxyXG4uanVlZ29zLWNvbnRhaW5lciB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIG1heC13aWR0aDogMTAwJTtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG59XHJcblxyXG4vKiBNYW50ZW5lciBsb3MgZXN0aWxvcyBleGlzdGVudGVzIHBhcmEgbG9zIGp1ZWdvcyAqL1xyXG4ubW9kdWxvLW1lbnUtanVlZ29zIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuICAgIHBhZGRpbmc6IDE1cHggMDtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIG1heC13aWR0aDogMTAwJTtcclxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbn1cclxuXHJcbi5pdGVtLW1lbnUtanVlZ29zIHtcclxuICAgIGZsZXg6IDE7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nOiAwIDEwcHg7XHJcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZWVlO1xyXG4gICAgbWluLXdpZHRoOiAxMDBweDtcclxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbn1cclxuXHJcbi5pdGVtLW1lbnUtanVlZ29zOmxhc3QtY2hpbGQge1xyXG4gICAgYm9yZGVyLXJpZ2h0OiBub25lO1xyXG59XHJcblxyXG4ubGluay1jYWJlY2VyYS1qdWVnbyB7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5sb2dvdGlwby1qdWVnby1jYWJlY2VyYSB7XHJcbiAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICB3aWR0aDogYXV0bztcclxuICAgIG1hcmdpbi1ib3R0b206IDVweDtcclxuICAgIG9iamVjdC1maXQ6IGNvbnRhaW47XHJcbn1cclxuXHJcbi5ib3RlLWp1ZWdvIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIG1hcmdpbi10b3A6IDJweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4udmFsb3Ige1xyXG4gICAgZm9udC1zaXplOiAyOHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBsaW5lLWhlaWdodDogMS4xO1xyXG4gICAgY29sb3I6IGluaGVyaXQ7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLmZvcm1hdG8ge1xyXG4gICAgZm9udC1zaXplOiAxMXB4O1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICAgIGxpbmUtaGVpZ2h0OiAxO1xyXG4gICAgbWFyZ2luLXRvcDogMDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgY29sb3I6IGluaGVyaXQ7XHJcbn1cclxuXHJcbi5taWxlcyB7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxufVxyXG5cclxuLmJ0bi1lbnRyYXIsIC5idG4tcmVnaXN0cm8ge1xyXG4gICAgcGFkZGluZzogMC44cmVtIDEuNXJlbTtcclxuICAgIGZvbnQtc2l6ZTogMXJlbTtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDdiZmY7IC8qIENvbG9yIGRlIGZvbmRvIGF6dWwsIHB1ZWRlcyBhanVzdGFybG8gc2Vnw4PCum4gdHVzIHByZWZlcmVuY2lhcyAqL1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjNzIGVhc2U7XHJcbn1cclxuXHJcbi5idG4tZW50cmFyOmhvdmVyLCAuYnRuLXJlZ2lzdHJvOmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDU2YjM7IC8qIFVuIHRvbm8gbcODwqFzIG9zY3VybyBwYXJhIGVsIGVmZWN0byBob3ZlciAqL1xyXG59XHJcblxyXG4vKiBTaSBxdWllcmVzIHF1ZSBlbCBib3TDg8KzbiBkZSByZWdpc3RybyB0ZW5nYSB1biBjb2xvciBkaWZlcmVudGUsIHB1ZWRlcyBlc3BlY2lmaWNhcmxvIGFzw4PCrTogKi9cclxuLmJ0bi1yZWdpc3RybyB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjhhNzQ1OyAvKiBDb2xvciB2ZXJkZSBwYXJhIGVsIGJvdMODwrNuIGRlIHJlZ2lzdHJvICovXHJcbn1cclxuXHJcbi5idG4tcmVnaXN0cm86aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzIxODgzODsgLyogVW4gdG9ubyBtw4PCoXMgb3NjdXJvIHBhcmEgZWwgZWZlY3RvIGhvdmVyICovXHJcbn1cclxuXHJcbi5pZGlvbWEtc2VsZWN0b3Ige1xyXG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XHJcbn1cclxuXHJcbi8qIEVzdGlsb3MgZXNwZWPDg8KtZmljb3MgcGFyYSBqdWVnb3MgKi9cclxuLmMtY2FiZWNlcmFfX2p1ZWdvLS1ldXJvZHJlYW1zIHtcclxuICAgIGJvcmRlci1ib3R0b206IDZweCBzb2xpZCAjNmIzZTk4O1xyXG4gICAgcGFkZGluZy1ib3R0b206IDAgIWltcG9ydGFudDtcclxufVxyXG5cclxuLmMtY2FiZWNlcmFfX2p1ZWdvLS1ldXJvZHJlYW1zOmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsIHJnYmEoMTA3LDYyLDE1MiwwLjEpLCAjZmZmKTtcclxuICAgIG1hcmdpbi1ib3R0b206IDA7XHJcbn1cclxuXHJcbi5jLWNhYmVjZXJhLWp1ZWdvX190ZXh0b190b3BheiB7XHJcbiAgICBmb250LWZhbWlseTogXCJQdWJsaWNTYW5zLVNlbWlCb2xkXCIsIEFyaWFsLCBzYW5zLXNlcmlmO1xyXG4gICAgd2hpdGUtc3BhY2U6IG5vcm1hbDtcclxufVxyXG5cclxuLmMtY2FiZWNlcmEtanVlZ29fX2JvdGVfdG9wYXotLWxuYWMge1xyXG4gICAgcGFkZGluZy10b3A6IDE1cHggIWltcG9ydGFudDtcclxufVxyXG5cclxuLmMtY2FiZWNlcmEtanVlZ29fX2JvdGUtLWV1cm9kcmVhbXMge1xyXG4gICAgcGFkZGluZy10b3A6IDA7XHJcbn1cclxuXHJcbi5jLWNhYmVjZXJhLWp1ZWdvX19ib3RlX3RvcGF6LS1ldXJvZHJlYW1zIHtcclxuICAgIHBhZGRpbmctdG9wOiAxNXB4O1xyXG59XHJcblxyXG4uYy1jYWJlY2VyYS1qdWVnb19fdGl0dWxvLS1ldXJvZHJlYW1zLFxyXG4uYy1jYWJlY2VyYS1qdWVnb19fYm90ZS0tZXVyb2RyZWFtcyxcclxuLmMtY2FiZWNlcmEtanVlZ29fX2NhbnRpZGFkLS1ldXJvZHJlYW1zLFxyXG4uYy1jYWJlY2VyYS1qdWVnb19fdGV4dG9fdG9wYXotLWV1cm9kcmVhbXMge1xyXG4gICAgY29sb3I6ICM2YjNlOTg7XHJcbn1cclxuXHJcbi8qIFV0aWxpZGFkZXMgKi9cclxuLmVzdGEtb2N1bHRvIHtcclxuICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcclxufVxyXG5cclxuLndoaXRlLXNwYWNlLW5vcm1hbCB7XHJcbiAgICB3aGl0ZS1zcGFjZTogbm9ybWFsICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi8qIE1lZGlhIHF1ZXJpZXMgKi9cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTIwMXB4KSB7XHJcbiAgICAuZXN0YS1vY3VsdG8tcGMge1xyXG4gICAgICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcclxuICAgIH1cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTIwMHB4KSB7XHJcbiAgICBoZWFkZXIubW9kdWxvLWNhYmVjZXJhIHtcclxuICAgICAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgICAgaGVpZ2h0OiBhdXRvO1xyXG4gICAgICAgIHBhZGRpbmc6IDE1cHg7XHJcbiAgICAgICAgb3ZlcmZsb3c6IHZpc2libGU7IC8qIFBlcm1pdGUgZWwgZGVzYm9yZGFtaWVudG8gZW4gcGFudGFsbGFzIHBlcXVlw4PCsWFzICovXHJcbiAgICB9XHJcblxyXG4gICAgLmxvZ28tY29udGFpbmVyIHtcclxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDA7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTVweDtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLmp1ZWdvcy1jb250YWluZXIge1xyXG4gICAgICAgIG9yZGVyOiAzO1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIG1hcmdpbjogMTVweCAwO1xyXG4gICAgfVxyXG5cclxuICAgIC5tb2R1bG8tbWVudS1qdWVnb3Mge1xyXG4gICAgICAgIGhlaWdodDogYXV0bztcclxuICAgICAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLml0ZW0tbWVudS1qdWVnb3Mge1xyXG4gICAgICAgIGZsZXg6IDAgMSBjYWxjKDI1JSAtIDEwcHgpOyAvKiA0IGVsZW1lbnRvcyBwb3IgZmlsYSAqL1xyXG4gICAgICAgIG1hcmdpbjogNXB4O1xyXG4gICAgICAgIG1pbi13aWR0aDogODBweDtcclxuICAgIH1cclxuXHJcbiAgICAudXNlci1hY3Rpb25zIHtcclxuICAgICAgICBtYXJnaW4tbGVmdDogMDtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgICB9XHJcblxyXG4gICAgLmlkaW9tYS1zZWxlY3RvciB7XHJcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAwO1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC5idG4tZW50cmFyLCAuYnRuLXJlZ2lzdHJvIHtcclxuICAgICAgICBtYXJnaW46IDVweDtcclxuICAgIH1cclxuXHJcbiAgICAubG9nb3RpcG8tanVlZ28tY2FiZWNlcmEud2ViIHtcclxuICAgICAgICBoZWlnaHQ6IDM1cHg7XHJcbiAgICB9XHJcblxyXG4gICAgLnZhbG9yIHtcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLmZvcm1hdG8ge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTFweDtcclxuICAgIH1cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAgIC5sb2dvIHtcclxuICAgICAgICBoZWlnaHQ6IDgwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLmxpbmstY2FiZWNlcmEtanVlZ28gaW1nIHtcclxuICAgICAgICBoZWlnaHQ6IDMwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLmJvdGUtanVlZ28ge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIH1cclxuXHJcbiAgICAubWlsZXMge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgIH1cclxuXHJcbiAgICAuYnRuLWVudHJhciwgLmJ0bi1yZWdpc3RybyB7XHJcbiAgICAgICAgcGFkZGluZzogMTBweCAxNXB4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIH1cclxuXHJcbiAgICAubG9nb3RpcG8tanVlZ28tY2FiZWNlcmEud2ViIHtcclxuICAgICAgICBoZWlnaHQ6IDMwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLnZhbG9yIHtcclxuICAgICAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICB9XHJcblxyXG4gICAgLmZvcm1hdG8ge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgIH1cclxuXHJcbiAgICAvKiBNZWpvcmFzIHBhcmEgbGEgdmlzdWFsaXphY2nDg8KzbiBkZSBqdWVnb3MgZW4gdGFibGV0cyAqL1xyXG4gICAgLm1vZHVsby1tZW51LWp1ZWdvcyB7XHJcbiAgICAgICAgZmxleC13cmFwOiB3cmFwO1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC5pdGVtLW1lbnUtanVlZ29zIHtcclxuICAgICAgICBmbGV4OiAwIDEgY2FsYygzMy4zMyUgLSAxMHB4KTtcclxuICAgICAgICBtYXJnaW46IDVweDtcclxuICAgICAgICBtaW4td2lkdGg6IDEwMHB4O1xyXG4gICAgICAgIGJvcmRlci1yaWdodDogbm9uZTtcclxuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VlZTtcclxuICAgICAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcclxuICAgIH1cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDgwcHgpIHtcclxuICAgIC8qIEFqdXN0ZXMgcGFyYSBlbCBlbmNhYmV6YWRvIGVuIG3Dg8KzdmlsZXMgKi9cclxuICAgIGhlYWRlci5tb2R1bG8tY2FiZWNlcmEge1xyXG4gICAgICAgIHdpZHRoOiAxMDB2dztcclxuICAgICAgICBtYXgtd2lkdGg6IDEwMHZ3O1xyXG4gICAgICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcclxuICAgIH1cclxuXHJcbiAgICAuY2FiZWNlcmEtc3VwZXJpb3Ige1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAgcGFkZGluZzogMTBweDtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgcGFkZGluZy1yaWdodDogMTBweDtcclxuICAgIH1cclxuXHJcbiAgICAubG9nby1jb250YWluZXIge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gICAgfVxyXG5cclxuICAgIC5sb2dvIHtcclxuICAgICAgICBoZWlnaHQ6IDgwcHg7XHJcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XHJcbiAgICAgICAgbWF4LXdpZHRoOiA4MCU7XHJcbiAgICAgICAgb2JqZWN0LWZpdDogY29udGFpbjtcclxuICAgIH1cclxuXHJcbiAgICAudXNlci1hY3Rpb25zIHtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIGdhcDogMTBweDtcclxuICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICB9XHJcblxyXG4gICAgLmxvZ2luLWNvbnRhaW5lciB7XHJcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICB9XHJcblxyXG4gICAgLmlucHV0LWdyb3VwIHtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICB9XHJcblxyXG4gICAgLmlucHV0cy1yb3cge1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgZ2FwOiAxMHB4O1xyXG4gICAgICAgIG1heC13aWR0aDogMTAwJTtcclxuICAgIH1cclxuXHJcbiAgICAubG9naW4taW5wdXQge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIG1heC13aWR0aDogMTAwJTtcclxuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgfVxyXG5cclxuICAgIC5pbnB1dC1maWVsZCB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gICAgfVxyXG5cclxuICAgIC5wYXNzd29yZC1pbnB1dC1jb250YWluZXIge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIG1heC13aWR0aDogMTAwJTtcclxuICAgIH1cclxuXHJcbiAgICAuYnV0dG9ucy1ncm91cCB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gICAgfVxyXG5cclxuICAgIC5idG4tZW50cmFyLCAuYnRuLXJlZ2lzdHJvIHtcclxuICAgICAgICBwYWRkaW5nOiA4cHggMTJweDtcclxuICAgICAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICAgIGZsZXg6IDE7XHJcbiAgICAgICAgbWF4LXdpZHRoOiA0OCU7XHJcbiAgICB9XHJcblxyXG4gICAgLmljb24tZW50cmFyIHtcclxuICAgICAgICBoZWlnaHQ6IDIwcHggIWltcG9ydGFudDtcclxuICAgICAgICB3aWR0aDogMjBweCAhaW1wb3J0YW50O1xyXG4gICAgICAgIG1heC1oZWlnaHQ6IDIwcHggIWltcG9ydGFudDtcclxuICAgICAgICBtYXgtd2lkdGg6IDIwcHggIWltcG9ydGFudDtcclxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDNweCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG5cclxuICAgIC5pZGlvbWEtY29udGFpbmVyIHtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gICAgfVxyXG5cclxuICAgICNjaGFuZ2VMYW5ndWFnZSB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgbWF4LXdpZHRoOiAyMDBweDtcclxuICAgIH1cclxuXHJcbiAgICAvKiBBanVzdGVzIHBhcmEgbG9zIGp1ZWdvcyBlbiBtw4PCs3ZpbGVzICovXHJcbiAgICAuY2FiZWNlcmEtaW5mZXJpb3Ige1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIG1heC13aWR0aDogMTAwdnc7XHJcbiAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG4gICAgfVxyXG5cclxuICAgIC5qdWVnb3MtY29udGFpbmVyIHtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG4gICAgfVxyXG5cclxuICAgIC5tb2R1bG8tbWVudS1qdWVnb3Mge1xyXG4gICAgICAgIGZsZXgtd3JhcDogd3JhcDtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgcGFkZGluZzogMTBweCAwO1xyXG4gICAgfVxyXG5cclxuICAgIC5pdGVtLW1lbnUtanVlZ29zIHtcclxuICAgICAgICBmbGV4OiAwIDEgY2FsYyg1MCUgLSAxMHB4KTsgLyogMiBlbGVtZW50b3MgcG9yIGZpbGEgKi9cclxuICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gICAgICAgIGJvcmRlci1yaWdodDogbm9uZTtcclxuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VlZTtcclxuICAgICAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcclxuICAgIH1cclxuXHJcbiAgICAvKiBBanVzdGVzIHBhcmEgZWwgbWVuw4PCuiBkZSB1c3VhcmlvIGVuIG3Dg8KzdmlsZXMgKi9cclxuICAgIC51c2VyLW1lbnUge1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gICAgfVxyXG5cclxuICAgIC51c2VyLWluZm8ge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gICAgfVxyXG5cclxuICAgIC51c2VyLWFjdGlvbnMtbWVudSB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKiBBc2Vnw4PCunJhdGUgZGUgcXVlIGVsIGN1ZXJwbyB5IGVsIGh0bWwgbm8gdGVuZ2FuIHBhZGRpbmcgbyBtYXJnaW4gaW5uZWNlc2FyaW9zICovXHJcbmJvZHksIGh0bWwge1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgb3ZlcmZsb3cteDogaGlkZGVuOyAvKiBFdml0YSBlbCBkZXNwbGF6YW1pZW50byBob3Jpem9udGFsICovXHJcbn1cclxuXHJcbi8qIEVzdGlsb3MgcGFyYSBkaXNwb3NpdGl2b3MgbXV5IHBlcXVlw4PCsW9zICovXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDM2MHB4KSB7XHJcbiAgICAubG9nbyB7XHJcbiAgICAgICAgaGVpZ2h0OiA3MHB4O1xyXG4gICAgfVxyXG5cclxuICAgIC5idG4tZW50cmFyLCAuYnRuLXJlZ2lzdHJvIHtcclxuICAgICAgICBwYWRkaW5nOiA2cHggMTBweDtcclxuICAgICAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICAgICAgbWluLXdpZHRoOiA4MHB4O1xyXG4gICAgfVxyXG5cclxuICAgIC5pY29uLWVudHJhciB7XHJcbiAgICAgICAgaGVpZ2h0OiAxNnB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgd2lkdGg6IDE2cHggIWltcG9ydGFudDtcclxuICAgICAgICBtYXgtaGVpZ2h0OiAxNnB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgbWF4LXdpZHRoOiAxNnB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAycHggIWltcG9ydGFudDtcclxuICAgIH1cclxuXHJcbiAgICAubG9naW4taW5wdXQge1xyXG4gICAgICAgIHBhZGRpbmc6IDZweCA4cHg7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgfVxyXG5cclxuICAgIC5mb3Jnb3QtcGFzc3dvcmQge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTFweDtcclxuICAgIH1cclxuXHJcbiAgICAuaWRpb21hLWNvbnRhaW5lciBsYWJlbCB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgfVxyXG5cclxuICAgICNjaGFuZ2VMYW5ndWFnZSB7XHJcbiAgICAgICAgcGFkZGluZzogNHB4IDhweDtcclxuICAgICAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qIEVzdGlsb3MgYWRpY2lvbmFsZXMgKi9cclxuLm1lbnNhamUtZXJyb3Ige1xyXG4gICAgYm9yZGVyOiAycHggc29saWQgI2U0MjIzMyAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4ub2N1bHRvLWVsaWdlOC1yZXNlcnZhLWVzcGFjaW8sXHJcbi5yZXNlcnZhLWVzcGFjaW8ge1xyXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5vY3VsdGFyLXBhcGVsZXJhLWVsaWdlOC1zZW5jaWxsYSB7XHJcbiAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi8qIEVzdGlsb3MgZXNwZWPDg8KtZmljb3MgcGFyYSBjYWRhIGp1ZWdvICovXHJcbi5ldXJvbWlsbG9uZXMgeyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDUyLCAxNDEsIDAuMDUpOyB9XHJcbi5wcmltaXRpdmEgeyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDQ2LCAxMjUsIDUwLCAwLjA1KTsgfVxyXG4uYm9ub2xvdG8geyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDg1LCAxMzksIDQ3LCAwLjA1KTsgfVxyXG4uZ29yZG8geyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE5OCwgNDAsIDQwLCAwLjA1KTsgfVxyXG4uZXVyb2RyZWFtcyB7IGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTA2LCAyNywgMTU0LCAwLjA1KTsgfVxyXG4ubG90ZXJpYW5hY2lvbmFsIHsgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyLCAxMTksIDE4OSwgMC4wNSk7IH1cclxuLmxvdG90dXJmIHsgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMzksIDEwOCwgMCwgMC4wNSk7IH1cclxuXHJcbi8qIENvbG9yZXMgZXNwZWPDg8KtZmljb3MgcGFyYSBjYWRhIGp1ZWdvICovXHJcbi5ldXJvbWlsbG9uZXMgLnZhbG9yLFxyXG4uZXVyb21pbGxvbmVzIC5mb3JtYXRvIHtcclxuICAgIGNvbG9yOiAjMDAzNDhEO1xyXG59XHJcblxyXG4ucHJpbWl0aXZhIC52YWxvcixcclxuLnByaW1pdGl2YSAuZm9ybWF0byB7XHJcbiAgICBjb2xvcjogIzJFN0QzMjtcclxufVxyXG5cclxuLmJvbm9sb3RvIC52YWxvcixcclxuLmJvbm9sb3RvIC5mb3JtYXRvIHtcclxuICAgIGNvbG9yOiAjNTU4QjJGO1xyXG59XHJcblxyXG4uZ29yZG8gLnZhbG9yLFxyXG4uZ29yZG8gLmZvcm1hdG8ge1xyXG4gICAgY29sb3I6ICNDNjI4Mjg7XHJcbn1cclxuXHJcbi8qIEVzdGlsb3MgcGFyYSBsb3MganVlZ29zIGNvbiB2YWxvcmVzIGZpam9zICovXHJcbi5ldXJvZHJlYW1zIC52YWxvciB7XHJcbiAgICBjb2xvcjogIzZBMUI5QTtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxufVxyXG5cclxuLmxvdGVyaWFuYWNpb25hbCAudmFsb3Ige1xyXG4gICAgY29sb3I6ICMwMjc3QkQ7XHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcbn1cclxuXHJcbi8qIEFqdXN0ZXMgcGFyYSBlbCB0ZXh0byBhZGljaW9uYWwgKi9cclxuLmV1cm9kcmVhbXMgLmJvdGUtanVlZ286OmFmdGVyIHtcclxuICAgIGNvbnRlbnQ6IFwiQUwgTUVTIERVUkFOVEUgMzAgQcODwpFPU1wiO1xyXG4gICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgY29sb3I6ICM2QTFCOUE7XHJcbiAgICBtYXJnaW4tdG9wOiAycHg7XHJcbn1cclxuXHJcbi5sb3RlcmlhbmFjaW9uYWwgLmJvdGUtanVlZ286OmFmdGVyIHtcclxuICAgIGNvbnRlbnQ6IFwiMUVSIFBSRU1JTyBBIExBIFNFUklFXCI7XHJcbiAgICBmb250LXNpemU6IDEwcHg7XHJcbiAgICBjb2xvcjogIzAyNzdCRDtcclxuICAgIG1hcmdpbi10b3A6IDJweDtcclxufVxyXG5cclxuLyogRWZlY3RvIGhvdmVyIHBhcmEgbWVqb3JhciBsYSBpbnRlcmFjdGl2aWRhZCAqL1xyXG4uaXRlbS1tZW51LWp1ZWdvczpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsMCwwLDAuMDIpO1xyXG59XHJcblxyXG4uaXRlbS1tZW51LWp1ZWdvczpob3ZlciAudmFsb3IsXHJcbi5pdGVtLW1lbnUtanVlZ29zOmhvdmVyIC5mb3JtYXRvIHtcclxuICAgIG9wYWNpdHk6IDAuOTtcclxufVxyXG5cclxuLmlkaW9tYS1zZWxlY3RvciBzZWxlY3Qge1xyXG4gICAgcGFkZGluZzogMC44cmVtO1xyXG4gICAgZm9udC1zaXplOiAxcmVtO1xyXG59XHJcblxyXG46aG9zdCB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuXHJcbi5oZWFkZXItbGluZS1jb250YWluZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAzcHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBib3R0b206IDA7XHJcbn1cclxuXHJcbi5oZWFkZXItbGluZS1zZWdtZW50IHtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIGZsZXg6IDE7XHJcbn1cclxuXHJcbi5saW5lLWJsdWUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMzQ4RDsgIC8qIENvbG9yIGRlIEV1cm9taWxsb25lcyAqL1xyXG59XHJcblxyXG4ubGluZS1ncmVlbiB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMkU3RDMyOyAgLyogQ29sb3IgZGUgUHJpbWl0aXZhICovXHJcbn1cclxuXHJcbi5saW5lLWJyb3duIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM1NThCMkY7ICAvKiBDb2xvciBkZSBCb25vbG90byAqL1xyXG59XHJcblxyXG4ubGluZS1yZWQge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0M2MjgyODsgIC8qIENvbG9yIGRlIEVsIEdvcmRvICovXHJcbn1cclxuXHJcbi5saW5lLW9yYW5nZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRUY2QzAwOyAgLyogQ29sb3IgZGUgTG90b3R1cmYgKi9cclxufVxyXG5cclxuLmxpbmUtcHVycGxlIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM2QTFCOUE7ICAvKiBDb2xvciBkZSBFdXJvRHJlYW1zICovXHJcbn1cclxuXHJcbi5saW5lLWN5YW4ge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAyNzdCRDsgIC8qIENvbG9yIGRlIExvdGVyw4PCrWEgTmFjaW9uYWwgKi9cclxufVxyXG5cclxuLyogRXN0aWxvcyBwYXJhIGVsIGNvbnRlbmVkb3IgZGUgbGEgY29udHJhc2XDg8KxYSAqL1xyXG4ucGFzc3dvcmQtaW5wdXQtY29udGFpbmVyIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHdpZHRoOiAxODBweDtcclxufVxyXG5cclxuLyogRXN0aWxvcyBwYXJhIGVsIGJvdMODwrNuIGRlIG1vc3RyYXIvb2N1bHRhciBjb250cmFzZcODwrFhICovXHJcbi50b2dnbGUtcGFzc3dvcmQtYnRuIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgcmlnaHQ6IDEwcHg7XHJcbiAgdG9wOiA1MCU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gIGJhY2tncm91bmQ6IG5vbmU7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBjb2xvcjogIzY2NjtcclxuICBmb250LXNpemU6IDFyZW07XHJcbiAgcGFkZGluZzogMDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbi50b2dnbGUtcGFzc3dvcmQtYnRuOmhvdmVyIHtcclxuICBjb2xvcjogIzMzMztcclxufVxyXG5cclxuLnRvZ2dsZS1wYXNzd29yZC1idG46Zm9jdXMge1xyXG4gIG91dGxpbmU6IG5vbmU7XHJcbn1cclxuXHJcbi8qIEVzdGlsb3MgcGFyYSBlbCBtZW5zYWplIGRlIGVycm9yIGRlIGxvZ2luICovXHJcbi5sb2dpbi1lcnJvciB7XHJcbiAgY29sb3I6ICNkYzM1NDU7XHJcbiAgbWFyZ2luLXRvcDogMTBweDtcclxuICBmb250LXNpemU6IDAuOXJlbTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi8qIEVzdGlsb3MgcGFyYSBlbCBib3TDg8KzbiBkZSBsb2dpbiBkZXNoYWJpbGl0YWRvICovXHJcbi5idG4tZW50cmFyOmRpc2FibGVkIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNmM3NTdkO1xyXG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XHJcbn1cclxuXHJcbi8qIEVzdGlsb3MgcGFyYSBlbCBzcGlubmVyIGRlIGNhcmdhICovXHJcbi5mYS1zcGlubmVyIHtcclxuICBhbmltYXRpb246IHNwaW4gMXMgbGluZWFyIGluZmluaXRlO1xyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIHNwaW4ge1xyXG4gIDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cclxuICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfVxyXG59XHJcblxyXG4udXNlci1tZW51IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiAxcmVtO1xyXG4gIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmOGY5ZmE7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG59XHJcblxyXG4udXNlci1pbmZvIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiAwLjVyZW07XHJcbn1cclxuXHJcbi51c2VyLWluZm8gc3BhbiB7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBjb2xvcjogIzMzMztcclxufVxyXG5cclxuLnVzZXItYWN0aW9ucy1tZW51IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGdhcDogMC41cmVtO1xyXG59XHJcblxyXG4uYnRuLXByb2ZpbGUsXHJcbi5idG4tbG9nb3V0IHtcclxuICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBmb250LXNpemU6IDAuOXJlbTtcclxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3M7XHJcbn1cclxuXHJcbi5idG4tcHJvZmlsZSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwN2JmZjtcclxuICBjb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbi5idG4tcHJvZmlsZTpob3ZlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwNTZiMztcclxufVxyXG5cclxuLmJ0bi1sb2dvdXQge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNkYzM1NDU7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4uYnRuLWxvZ291dDpob3ZlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2M4MjMzMztcclxufVxyXG5cclxuLnJlZ2lzdGVyLWxpbmsge1xyXG4gIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uYnRuLXJlZ2lzdGVyIHtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgcGFkZGluZzogOHB4IDE2cHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI4YTc0NTtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICBmb250LXNpemU6IDAuOXJlbTtcclxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3M7XHJcbn1cclxuXHJcbi5idG4tcmVnaXN0ZXI6aG92ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMTg4Mzg7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
      });
    }
  }
  return HeaderComponent;
})();

/***/ }),

/***/ 6068:
/*!************************************!*\
  !*** ./src/app/universal-fixes.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   suppressCssErrors: () => (/* binding */ suppressCssErrors)
/* harmony export */ });
/**
 * Configuración para mejorar la compatibilidad de Angular Universal con Bootstrap
 *
 * Este archivo proporciona funciones y configuraciones para evitar errores comunes
 * relacionados con CSS en Angular Universal (SSR).
 */
/**
 * Función para suprimir mensajes de error específicos en la consola
 * durante el renderizado del servidor.
 */
function suppressCssErrors() {
  if (typeof window === 'undefined') {
    // Solo ejecutar en el servidor (SSR)
    try {
      // Guardar la función original
      const originalConsoleError = console.error;
      // Reemplazar con una versión que filtra mensajes específicos
      console.error = function (...args) {
        // Convertir a string para facilitar la búsqueda
        const errorMsg = args.join(' ');
        // Filtrar mensajes relacionados con errores de CSS
        if (errorMsg.includes('selector errors') || errorMsg.includes('form-floating') || errorMsg.includes('traversals') || errorMsg.includes('rules skipped')) {
          // No mostrar estos errores
          return;
        }
        // Mostrar otros errores normalmente
        originalConsoleError.apply(console, args);
      };
    } catch (e) {
      // Ignorar errores al configurar la supresión
    }
  }
}

/***/ }),

/***/ 28967:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
const environment = {
  production: false,
  apiUrl: 'http://localhost:3001/api',
  frontendUrl: 'http://localhost:4000',
  // Cambiado a localhost para consistencia
  stripe: {
    publishableKey: 'pk_test_51RBei6LtOcaQbzqZSjGanXrEU1SVzItDkHRliCzAMY0NOaU9DqviYJ1OcNIeaAff7CMbsvhuwyCjnuptOnuzhP32006eWSnxrR'
  },
  paypal: {
    clientId: 'AZmPtWE4VJ_VbGy-N_FPYDLgZuc73JjF7AEnkvWEig1GHHg-rWgCfteYVlqtDj-zIHdDW3pZBag_WDn1',
    currency: 'EUR'
  }
};

/***/ }),

/***/ 71117:
/*!****************************!*\
  !*** ./src/main.server.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ 70356);
/* harmony import */ var _app_app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.component */ 47865);
/* harmony import */ var _app_app_config_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app.config.server */ 98561);



const bootstrap = () => (0,_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__.bootstrapApplication)(_app_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent, _app_app_config_server__WEBPACK_IMPORTED_MODULE_1__.config);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (bootstrap);

/***/ }),

/***/ 19246:
/*!****************************************!*\
  !*** ./node_modules/express/lib/ sync ***!
  \****************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 19246;
module.exports = webpackEmptyContext;

/***/ }),

/***/ 90290:
/*!******************************!*\
  !*** external "async_hooks" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("async_hooks");

/***/ }),

/***/ 20181:
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ 76982:
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 24434:
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 79896:
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 58611:
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 65692:
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 69278:
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 73024:
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ 51455:
/*!***********************************!*\
  !*** external "node:fs/promises" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs/promises");

/***/ }),

/***/ 76760:
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ 73136:
/*!***************************!*\
  !*** external "node:url" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:url");

/***/ }),

/***/ 70857:
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 16928:
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 83480:
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ 2203:
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 13193:
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");

/***/ }),

/***/ 53557:
/*!*************************!*\
  !*** external "timers" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("timers");

/***/ }),

/***/ 52018:
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ 87016:
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 39023:
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 43106:
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 		__webpack_require__.O(undefined, [121], () => (__webpack_require__(74011)))
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, [121], () => (__webpack_require__(69787)))
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + (chunkId === 121 ? "vendor" : chunkId) + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			792: 1
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.O.require = (chunkId) => (installedChunks[chunkId]);
/******/ 		
/******/ 		var installChunk = (chunk) => {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 			__webpack_require__.O();
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__webpack_require__.f.require = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					installChunk(require("./" + __webpack_require__.u(chunkId)));
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	(() => {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			__webpack_require__.e(121);
/******/ 			return next();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map