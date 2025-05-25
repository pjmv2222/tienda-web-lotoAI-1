import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'conocenos',
    loadComponent: () => import('./pages/conocenos/conocenos.component').then(m => m.ConocenosComponent)
  },
  {
    path: 'accesibilidad',
    loadComponent: () => import('./pages/accesibilidad/accesibilidad.component').then(m => m.AccesibilidadComponent)
  },
  {
    path: 'aviso-legal',
    loadComponent: () => import('./pages/aviso-legal/aviso-legal.component').then(m => m.AvisoLegalComponent)
  },
  {
    path: 'ayuda',
    loadComponent: () => import('./pages/ayuda/ayuda.component').then(m => m.AyudaComponent)
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contacto/contacto.component').then(m => m.ContactoComponent)
  },
  {
    path: 'gestion-cookies',
    loadComponent: () => import('./pages/gestion-cookies/gestion-cookies.component').then(m => m.GestionCookiesComponent)
  },
  {
    path: 'proteccion-datos',
    loadComponent: () => import('./pages/proteccion-datos/proteccion-datos.component').then(m => m.ProteccionDatosComponent)
  },
  {
    path: 'juego-seguro',
    loadComponent: () => import('./pages/juego-seguro/juego-seguro.component').then(m => m.JuegoSeguroComponent)
  },
  {
    path: 'uso-web',
    loadComponent: () => import('./pages/uso-web/uso-web.component').then(m => m.UsoWebComponent)
  },
  {
    path: 'restriccion-edad',
    loadComponent: () => import('./pages/restriccion-edad/restriccion-edad.component').then(m => m.RestriccionEdadComponent)
  },
  {
    path: 'euromillon',
    loadComponent: () => import('./pages/euromillon/euromillon.component').then(m => m.EuromillonComponent)
  },
  {
    path: 'euromillon/prediccion',
    loadComponent: () => import('./pages/euromillon-prediccion/euromillon-prediccion.component').then(m => m.EuromillonPrediccionComponent),
    canActivate: [authGuard]
  },
  {
    path: 'primitiva',
    loadComponent: () => import('./pages/primitiva/primitiva.component').then(m => m.PrimitivaComponent)
  },
  {
    path: 'gordo-primitiva',
    loadComponent: () => import('./pages/gordo-primitiva/gordo-primitiva.component').then(m => m.GordoPrimitivaComponent)
  },
  {
    path: 'eurodreams',
    loadComponent: () => import('./pages/eurodreams/eurodreams.component').then(m => m.EurodreamsComponent)
  },
  {
    path: 'loteria-nacional',
    loadComponent: () => import('./pages/loteria-nacional/loteria-nacional.component').then(m => m.LoteriaNacionalComponent)
  },
  {
    path: 'lototurf',
    loadComponent: () => import('./pages/lototurf/lototurf.component').then(m => m.LototurfComponent)
  },
  {
    path: 'bonoloto',
    loadComponent: () => import('./pages/bonoloto/bonoloto.component').then(m => m.BonolotoComponent)
  },
  {
    path: 'planes',
    loadComponent: () => import('./pages/planes/planes.component').then(m => m.PlanesComponent)
  },
  {
    path: 'pasarela-pago/:plan',
    loadComponent: () => import('./pages/pasarela-pago/pasarela-pago.component').then(m => m.PasarelaPagoComponent)
  },
  {
    path: 'confirmacion-plan-basico',
    loadComponent: () => import('./pages/confirmacion-plan-basico/confirmacion-plan-basico.component').then(m => m.ConfirmacionPlanBasicoComponent)
  },
  {
    path: 'confirmacion-plan-mensual',
    loadComponent: () => import('./pages/confirmacion-plan-mensual/confirmacion-plan-mensual.component').then(m => m.ConfirmacionPlanMensualComponent)
  },
  {
    path: 'confirmacion-plan-pro',
    loadComponent: () => import('./pages/confirmacion-plan-pro/confirmacion-plan-pro.component').then(m => m.ConfirmacionPlanProComponent)
  },
  {
    path: 'registro',
    loadComponent: () => import('./auth/register/register.component')
      .then(m => m.RegisterComponent)
  },
  {
    path: 'recuperar-password',
    loadComponent: () => import('./auth/forgot-password/forgot-password.component')
      .then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'reset-password/:token',
    loadComponent: () => import('./auth/reset-password/reset-password.component')
      .then(m => m.ResetPasswordComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'verificar/:token',
    loadComponent: () => import('./auth/verify-email/verify-email.component')
      .then(m => m.VerifyEmailComponent)
  },
  {
    path: 'bienvenido',
    loadComponent: () => import('./pages/welcome/welcome.component').then(m => m.WelcomeComponent)
  },
  // Rutas de ejemplos de bolas de lotería eliminadas
  {
    path: '**',
    redirectTo: 'home'
  }
];
