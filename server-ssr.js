// Cargar variables de entorno desde el archivo .env del backend
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Configuración para evitar el error NG0908 con NgZone
process.env.NODE_OPTIONS = '--no-zone';

// Definir posibles rutas para el archivo .env
const envPaths = [
  '/var/www/tienda-web-lotoAI-1/src/backend/.env', // Ruta específica en el servidor de producción
  path.join(__dirname, 'src', 'backend', '.env'),
  path.join(__dirname, 'server', '.env'),
  path.join(__dirname, '.env')
];

// Intentar cargar el archivo .env desde las rutas definidas
let envLoaded = false;
for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    console.log(`Cargando variables de entorno desde: ${envPath}`);
    dotenv.config({ path: envPath });
    envLoaded = true;
    break;
  }
}

if (!envLoaded) {
  console.log('No se encontró archivo .env en las rutas especificadas. Usando variables de entorno del sistema.');
}

// Verificar variables de entorno críticas y asignar valores por defecto si es necesario
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('ADVERTENCIA: Variable de entorno STRIPE_SECRET_KEY no encontrada en el archivo .env ni en el ambiente');
  console.error('El servidor SSR podría fallar si esta variable es requerida');

  // Asignar un valor por defecto solo para evitar errores al iniciar
  // (esto permitirá que el servidor inicie aunque Stripe no funcione correctamente)
  process.env.STRIPE_SECRET_KEY = 'sk_dummy_key_for_ssr_startup_only';
}

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  console.error('ADVERTENCIA: Variable de entorno STRIPE_WEBHOOK_SECRET no encontrada en el archivo .env ni en el ambiente');
  console.error('El servidor SSR podría fallar si esta variable es requerida');

  // Asignar un valor por defecto solo para evitar errores al iniciar
  process.env.STRIPE_WEBHOOK_SECRET = 'whsec_dummy_key_for_ssr_startup_only';
}

console.log('Iniciando servidor SSR...');

// Importar y ejecutar el servidor
require('./dist/tienda-web-loto-ai/server/main.js');