import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AuthInterceptor } from './interceptors/auth.interceptor';

/**
 * Inicializador que limpia cache y tokens corruptos antes de inicializar la app
 */
function initializeApp(): () => Promise<void> {
  return (): Promise<void> => {
    return new Promise((resolve) => {
      try {
        // Versión de cache para forzar renovación cuando sea necesario
        const CACHE_VERSION = 'v2025.1.14-auth-fix';
        
        console.log('🔧 [APP_INITIALIZER] Verificando versión de cache...');
        
        // Verificar versión de cache almacenada
        const storedVersion = localStorage.getItem('app_cache_version');
        
        if (storedVersion !== CACHE_VERSION) {
          console.log('🔄 [APP_INITIALIZER] Nueva versión detectada - limpiando cache y tokens');
          
          // Limpiar datos corruptos
          const keysToRemove = [
            'currentUser',
            'loto_auth_token',
            'loto_refresh_token'
          ];
          
          keysToRemove.forEach(key => {
            const removed = localStorage.removeItem(key);
            console.log(`🗑️ [APP_INITIALIZER] Removed ${key} from localStorage`);
          });
          
          // Limpiar cookies de autenticación
          const cookiesToClear = ['loto_auth_token', 'loto_refresh_token'];
          cookiesToClear.forEach(cookieName => {
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.loto-ia.com`;
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
            console.log(`🗑️ [APP_INITIALIZER] Cleared auth cookie: ${cookieName}`);
          });
          
          // Marcar nueva versión como procesada
          localStorage.setItem('app_cache_version', CACHE_VERSION);
          
          console.log('✅ [APP_INITIALIZER] Cache limpiado exitosamente');
        } else {
          console.log('✅ [APP_INITIALIZER] Versión de cache actual, no se requiere limpieza');
        }
        
        // Pequeño delay para asegurar que la limpieza se complete
        setTimeout(() => {
          resolve();
        }, 100);
        
      } catch (error) {
        console.error('❌ [APP_INITIALIZER] Error en limpieza de cache:', error);
        resolve(); // Continuar aunque haya error
      }
    });
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimations(),
    importProvidersFrom(
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      CarouselModule.forRoot()
    ),
    // Configurar interceptor de autenticación
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true
    }
  ]
};
