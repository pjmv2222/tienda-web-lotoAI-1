"use strict";
/**
 * Configuración para mejorar la compatibilidad de Angular Universal con Bootstrap
 *
 * Este archivo proporciona funciones y configuraciones para evitar errores comunes
 * relacionados con CSS en Angular Universal (SSR).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.suppressCssErrors = void 0;
/**
 * Función para suprimir mensajes de error específicos en la consola
 * durante el renderizado del servidor.
 */
function suppressCssErrors() {
    if (typeof window === 'undefined') {
        // Solo ejecutar en el servidor (SSR)
        try {
            // Guardar la función original
            const originalConsoleError = console.error;
            // Reemplazar con una versión que filtra mensajes específicos
            console.error = function (...args) {
                // Convertir a string para facilitar la búsqueda
                const errorMsg = args.join(' ');
                // Filtrar mensajes relacionados con errores de CSS
                if (errorMsg.includes('selector errors') ||
                    errorMsg.includes('form-floating') ||
                    errorMsg.includes('traversals') ||
                    errorMsg.includes('rules skipped')) {
                    // No mostrar estos errores
                    return;
                }
                // Mostrar otros errores normalmente
                originalConsoleError.apply(console, args);
            };
        }
        catch (e) {
            // Ignorar errores al configurar la supresión
        }
    }
}
exports.suppressCssErrors = suppressCssErrors;
