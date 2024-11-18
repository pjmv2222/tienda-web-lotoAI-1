import { Routes } from '@angular/router';

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
  // ... otras rutas ...
  { 
    path: '**', 
    redirectTo: 'home' 
  }
];
