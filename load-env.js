/**
 * Script para cargar variables de entorno desde archivos .env
 * Este archivo se ejecuta antes de iniciar la aplicación principal
 */

const path = require('path');
const fs = require('fs');

// Función para cargar variables de entorno desde un archivo
function loadEnvFile(filePath) {
  if (fs.existsSync(filePath)) {
    console.log(`📄 Cargando variables de entorno desde: ${filePath}`);
    const envContent = fs.readFileSync(filePath, 'utf8');
    
    envContent.split('\n').forEach(line => {
      line = line.trim();
      if (line && !line.startsWith('#') && line.includes('=')) {
        const [key, ...valueParts] = line.split('=');
        const value = valueParts.join('=').replace(/^["']|["']$/g, ''); // Remover comillas
        
        // Solo establecer si no existe ya en process.env
        if (!process.env[key.trim()]) {
          process.env[key.trim()] = value;
          console.log(`✅ ${key.trim()}: ${value.substring(0, 10)}...`);
        }
      }
    });
  } else {
    console.log(`⚠️  Archivo no encontrado: ${filePath}`);
  }
}

// Cargar archivos .env en orden de prioridad
const envFiles = [
  path.join(__dirname, '.env'),
  path.join(__dirname, '.env.stripe'),
  path.join(__dirname, '.env.local'),
  path.join(__dirname, '.env.production')
];

console.log('🔄 Iniciando carga de variables de entorno...');

envFiles.forEach(loadEnvFile);

// Verificar variables críticas de Stripe
const requiredStripeVars = ['STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET'];
const missingVars = requiredStripeVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Variables de entorno faltantes:', missingVars);
  console.error('🔧 Asegúrate de que existen en .env.stripe');
} else {
  console.log('✅ Todas las variables de entorno de Stripe están cargadas');
}

console.log('🚀 Variables de entorno cargadas. Iniciando aplicación...');

// Requerir y ejecutar el archivo principal del backend
require('./dist/backend/src/index.js'); 