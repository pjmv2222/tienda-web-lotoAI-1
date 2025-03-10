import { ApplicationConfig, mergeApplicationConfig, NgZone } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: NgZone,
      useValue: new NgZone({ shouldCoalesceEventChangeDetection: false })
    }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
