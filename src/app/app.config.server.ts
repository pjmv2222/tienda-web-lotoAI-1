import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideClientHydration } from '@angular/platform-browser';
import { suppressCssErrors } from './universal-fixes';
import { configureNgxBootstrapForServer } from './ngx-bootstrap-server';

// Configurar el entorno del servidor solo una vez
suppressCssErrors();

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideClientHydration(),
    // Configurar ngx-bootstrap como provider para que se ejecute solo cuando sea necesario
    {
      provide: 'NGX_BOOTSTRAP_CONFIG',
      useFactory: () => {
        configureNgxBootstrapForServer();
        return true;
      }
    }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
