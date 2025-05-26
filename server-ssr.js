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

// Intentar cargar el archivo .env desde diferentes ubicaciones
let envLoaded = false;
for (const envPath of envPaths) {
  try {
    if (fs.existsSync(envPath)) {
      console.log(`Cargando variables de entorno desde: ${envPath}`);
      dotenv.config({ path: envPath });
      envLoaded = true;
      break;
    }
  } catch (error) {
    console.error(`Error al verificar la ruta ${envPath}:`, error.message);
  }
}

if (!envLoaded) {
  console.warn('No se encontró ningún archivo .env. Se utilizarán las variables de entorno del sistema.');
  // Si no hay archivo .env, al menos intentamos cargar las variables del ambiente
  dotenv.config();
}

// Verificar las variables críticas de Stripe
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