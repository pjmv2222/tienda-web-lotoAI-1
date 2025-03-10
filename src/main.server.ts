import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { NgZone } from '@angular/core';

// Configuración personalizada para evitar problemas con NgZone en SSR
const customConfig = {
  ...config,
  providers: [
    ...(config.providers || []),
    { provide: NgZone, useValue: new NgZone({ shouldCoalesceEventChangeDetection: false }) }
  ]
};

const bootstrap = () => bootstrapApplication(AppComponent, customConfig);

export default bootstrap;
