"use strict";
/**
 * Configuración para ngx-bootstrap en el servidor
 *
 * Este archivo proporciona una configuración para que ngx-bootstrap
 * funcione correctamente en el entorno de servidor (SSR).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureNgxBootstrapForServer = void 0;
/**
 * Configura el entorno del servidor para ngx-bootstrap
 */
function configureNgxBootstrapForServer() {
    if (typeof window === 'undefined') {
        // Solo ejecutar en el servidor (SSR)
        try {
            // Crear un objeto document simulado
            global.document = {
                querySelector: () => ({}),
                createElement: () => ({
                    style: {},
                    setAttribute: () => { },
                    appendChild: () => { }
                }),
                createTextNode: () => ({}),
                documentElement: {
                    style: {}
                },
                head: {
                    appendChild: () => { }
                },
                body: {
                    appendChild: () => { }
                }
            };
            // Crear un objeto window simulado
            global.window = {
                document: global.document,
                getComputedStyle: () => ({
                    getPropertyValue: () => ''
                }),
                addEventListener: () => { },
                removeEventListener: () => { },
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
            global.Element = class {
            };
            global.HTMLElement = class {
            };
            global.Node = class {
            };
            global.MutationObserver = class {
                observe() { }
                disconnect() { }
            };
            console.log('Configuración de ngx-bootstrap para el servidor aplicada correctamente');
        }
        catch (e) {
            console.error('Error al configurar ngx-bootstrap para el servidor:', e);
        }
    }
}
exports.configureNgxBootstrapForServer = configureNgxBootstrapForServer;
