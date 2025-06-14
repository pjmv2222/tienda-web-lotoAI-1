/**
 * Configuración para ngx-bootstrap en el servidor
 * 
 * Este archivo proporciona una configuración para que ngx-bootstrap
 * funcione correctamente en el entorno de servidor (SSR).
 */

/**
 * Configura el entorno del servidor para ngx-bootstrap
 */
export function configureNgxBootstrapForServer(): void {
  if (typeof window === 'undefined') {
    // Solo ejecutar en el servidor (SSR)
    try {
      // Crear un objeto document simulado
      (global as any).document = {
        querySelector: () => ({}),
        createElement: () => ({
          style: {},
          setAttribute: () => {},
          appendChild: () => {}
        }),
        createTextNode: () => ({}),
        documentElement: {
          style: {}
        },
        head: {
          appendChild: () => {}
        },
        body: {
          appendChild: () => {}
        }
      };
      
      // Crear un objeto window simulado
      (global as any).window = {
        document: (global as any).document,
        getComputedStyle: () => ({
          getPropertyValue: () => ''
        }),
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true,
        location: {
          href: '',
          pathname: ''
        },
        navigator: {
          userAgent: 'SSR'
        }
      };
      
      // Otros objetos necesarios
      (global as any).Element = class {};
      (global as any).HTMLElement = class {};
      (global as any).Node = class {};
      (global as any).MutationObserver = class {
        observe() {}
        disconnect() {}
      };
      
      console.log('Configuración de ngx-bootstrap para el servidor aplicada correctamente');
    } catch (e) {
      console.error('Error al configurar ngx-bootstrap para el servidor:', e);
    }
  }
}
