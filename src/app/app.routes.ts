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
  {
    path: '**',
    redirectTo: 'home'
  }
];
