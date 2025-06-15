"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const auth_guard_1 = require("./guards/auth.guard");
exports.routes = [
    {
        path: 'auth',
        loadChildren: () => Promise.resolve().then(() => __importStar(require('./auth/auth.module'))).then(m => m.AuthModule)
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./pages/home/home.component'))).then(m => m.HomeComponent)
    },
    {
        path: 'conocenos',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./pages/conocenos/conocenos.component'))).then(m => m.ConocenosComponent)
    },
    {
        path: 'accesibilidad',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./pages/accesibilidad/accesibilidad.component'))).then(m => m.AccesibilidadComponent)
    },
    {
        path: 'aviso-legal',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./pages/aviso-legal/aviso-legal.component'))).then(m => m.AvisoLegalComponent)
    },
    {
        path: 'ayuda',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./pages/ayuda/ayuda.component'))).then(m => m.AyudaComponent)
    },
    {
        path: 'contacto',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./pages/contacto/contacto.component'))).then(m => m.ContactoComponent)
    },
    {
        path: 'gestion-cookies',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./pages/gestion-cookies/gestion-cookies.component'))).then(m => m.GestionCookiesComponent)
    },
    {
        path: 'proteccion-datos',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./pages/proteccion-datos/proteccion-datos.component'))).then(m => m.ProteccionDatosComponent)
    },
    {
        path: 'juego-seguro',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./pages/juego-seguro/juego-seguro.component'))).then(m => m.JuegoSeguroComponent)
    },
    {
        path: 'uso-web',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./pages/uso-web/uso-web.component'))).then(m => m.UsoWebComponent)
    },
    {
        path: 'restriccion-edad',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./pages/restriccion-edad/restriccion-edad.component'))).then(m => m.RestriccionEdadComponent)
    },
    {
        path: 'euromillon',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./pages/euromillon/euromillon.component'))).then(m => m.EuromillonComponent)
    },
    {
        path: 'euromillon/prediccion',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./pages/euromillon-prediccion/euromillon-prediccion.component'))).then(m => m.EuromillonPrediccionComponent),
        canActivate: [auth_guard_1.authGuard]
    },
    {
        path: 'primitiva',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./pages/primitiva/primitiva.component'))).then(m => m.PrimitivaComponent)
    },
    {
        path: 'gordo-primitiva',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./pages/gordo-primitiva/gordo-primitiva.component'))).then(m => m.GordoPrimitivaComponent)
    },
    {
        path: 'eurodreams',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./pages/eurodreams/eurodreams.component'))).then(m => m.EurodreamsComponent)
    },
    {
        path: 'loteria-nacional',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./pages/loteria-nacional/loteria-nacional.component'))).then(m => m.LoteriaNacionalComponent)
    },
    {
        path: 'lototurf',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./pages/lototurf/lototurf.component'))).then(m => m.LototurfComponent)
    },
    {
        path: 'bonoloto',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./pages/bonoloto/bonoloto.component'))).then(m => m.BonolotoComponent)
    },
    {
        path: 'planes',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./pages/planes/planes.component'))).then(m => m.PlanesComponent)
    },
    {
        path: 'pasarela-pago/:plan',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./pages/pasarela-pago/pasarela-pago.component'))).then(m => m.PasarelaPagoComponent)
    },
    {
        path: 'confirmacion-plan-basico',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./pages/confirmacion-plan-basico/confirmacion-plan-basico.component'))).then(m => m.ConfirmacionPlanBasicoComponent)
    },
    {
        path: 'confirmacion-plan-mensual',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./pages/confirmacion-plan-mensual/confirmacion-plan-mensual.component'))).then(m => m.ConfirmacionPlanMensualComponent)
    },
    {
        path: 'confirmacion-plan-pro',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./pages/confirmacion-plan-pro/confirmacion-plan-pro.component'))).then(m => m.ConfirmacionPlanProComponent)
    },
    {
        path: 'registro',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./auth/register/register.component'))).then(m => m.RegisterComponent)
    },
    {
        path: 'recuperar-password',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./auth/forgot-password/forgot-password.component'))).then(m => m.ForgotPasswordComponent)
    },
    {
        path: 'reset-password/:token',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./auth/reset-password/reset-password.component'))).then(m => m.ResetPasswordComponent)
    },
    {
        path: 'profile',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./pages/profile/profile.component'))).then(m => m.ProfileComponent),
        canActivate: [auth_guard_1.authGuard]
    },
    {
        path: 'verificar/:token',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./auth/verify-email/verify-email.component'))).then(m => m.VerifyEmailComponent)
    },
    {
        path: 'bienvenido',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./pages/welcome/welcome.component'))).then(m => m.WelcomeComponent)
    },
    // Rutas de ejemplos de bolas de lotería eliminadas
    {
        path: '**',
        redirectTo: 'home'
    }
];
