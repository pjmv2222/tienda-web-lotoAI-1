import { Routes } from '@angular/router';

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
  // ... otras rutas ...
  {
    path: 'verificar/:token',
    loadComponent: () => import('./auth/verify-email/verify-email.component')
      .then(m => m.VerifyEmailComponent)
  },
  { 
    path: '**', 
    redirectTo: 'home' 
  }
];
