import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'home', 
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
    loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
  },
  // ... otras rutas ...
  { 
    path: '**', 
    redirectTo: 'home' 
  }
];
