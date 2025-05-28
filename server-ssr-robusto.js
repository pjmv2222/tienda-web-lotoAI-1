// server-ssr.js - Script de inicio del servidor Angular SSR
// Versión robusta que funciona incluso sin dependencias externas

// Inicializar configuración fundamental
process.env.NODE_OPTIONS = '--no-zone'; // Evitar error NG0908 con NgZone

/**
 * Cargador de variables de entorno con tolerancia a fallos
 */
(function cargarVariablesEntorno() {
  // Posibles rutas para el archivo .env
  const posiblesRutas = [
    '/var/www/tienda-web-lotoAI-1/src/backend/.env',
    __dirname + '/src/backend/.env',
    __dirname + '/.env'
  ];
  
  try {
    // Intentamos cargar el módulo dotenv
    const fs = require('fs');
    const path = require('path');
    
    try {
      // Si dotenv está disponible, intentamos usarlo
      const dotenv = require('dotenv');
      console.log('✅ Módulo dotenv cargado correctamente');
      
      // Buscar en las posibles rutas
      let archivoEncontrado = false;
      
      for (const rutaArchivo of posiblesRutas) {
        try {
          if (fs.existsSync(rutaArchivo)) {
            console.log(`🔍 Archivo .env encontrado en: ${rutaArchivo}`);
            dotenv.config({ path: rutaArchivo });
            archivoEncontrado = true;
            break;
          }
        } catch (err) {
          console.warn(`⚠️ Error al verificar ruta ${rutaArchivo}: ${err.message}`);
        }
      }
      
      if (!archivoEncontrado) {
        console.warn('⚠️ No se encontró ningún archivo .env en las rutas buscadas');
      }
      
    } catch (dotenvError) {
      console.warn('⚠️ No se pudo cargar el módulo dotenv:', dotenvError.message);
      
      // Si dotenv no está disponible, intentamos una lectura manual básica
      for (const rutaArchivo of posiblesRutas) {
        try {
          if (fs.existsSync(rutaArchivo)) {
            console.log(`🔧 Intentando leer .env manualmente desde: ${rutaArchivo}`);
            const contenido = fs.readFileSync(rutaArchivo, 'utf8');
            
            // Parseo manual simple del archivo .env
            const lineas = contenido.split('\n');
            for (const linea of lineas) {
              const partes = linea.trim().split('=');
              if (partes.length >= 2 && !partes[0].startsWith('#')) {
                const clave = partes[0].trim();
                // Unir todo después del primer = (por si hay más = en el valor)
                const valor = partes.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
                if (clave && !process.env[clave]) {
                  process.env[clave] = valor;
                }
              }
            }
            
            console.log('✅ Variables de entorno cargadas manualmente');
            break;
          }
        } catch (fsError) {
          console.warn(`⚠️ Error al leer manualmente ${rutaArchivo}:`, fsError.message);
        }
      }
    }
    
  } catch (err) {
    console.warn('⚠️ Error al acceder a filesystem:', err.message);
  }
  
  // Establecer valores por defecto para variables críticas si no existen
  if (!process.env.STRIPE_SECRET_KEY) {
    console.warn('⚠️ Variable STRIPE_SECRET_KEY no encontrada, usando valor por defecto');
    process.env.STRIPE_SECRET_KEY = 'sk_dummy_key_for_ssr_startup_only';
  }
  
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.warn('⚠️ Variable STRIPE_WEBHOOK_SECRET no encontrada, usando valor por defecto');
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_dummy_key_for_ssr_startup_only';
  }
})();

// Verificar entorno
console.log(`🔵 Entorno: ${process.env.NODE_ENV || 'no definido'}`);
console.log(`🔵 Directorio actual: ${__dirname}`);

// Preparar manejo de errores global para evitar fallos silenciosos
process.on('uncaughtException', (error) => {
  console.error('❌ Error no controlado en el servidor SSR:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promesa rechazada no manejada:', reason);
});

console.log('🚀 Iniciando servidor Angular SSR...');

// Envolver el inicio del servidor en un try-catch para mayor seguridad
try {
  require('./dist/tienda-web-loto-ai/server/main.js');
  console.log('✅ Servidor Angular SSR iniciado correctamente');
} catch (error) {
  console.error('❌ Error al iniciar el servidor SSR:', error);
  console.error('🔍 Verificar si se ha compilado la aplicación correctamente con "npm run build:ssr"');
  process.exit(1);
}
