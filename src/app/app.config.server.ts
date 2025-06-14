import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideClientHydration } from '@angular/platform-browser';
import { suppressCssErrors } from './universal-fixes';
import { configureNgxBootstrapForServer } from './ngx-bootstrap-server';

// Configurar el entorno del servidor
suppressCssErrors();
configureNgxBootstrapForServer();

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideClientHydration()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
