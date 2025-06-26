#!/usr/bin/env node

/**
 * Script wrapper para cargar variables de entorno y ejecutar el backend
 * Solución robusta para el problema con PM2 env_file
 */

const path = require('path');
const fs = require('fs');

console.log('🔄 Iniciando carga de variables de entorno...');

// Función para cargar un archivo .env
function loadEnvFile(filePath) {
  const fullPath = path.resolve(filePath);
  
  if (fs.existsSync(fullPath)) {
    console.log(`📄 Cargando: ${fullPath}`);
    const content = fs.readFileSync(fullPath, 'utf8');
    
    content.split('\n').forEach(line => {
      line = line.trim();
      if (line && !line.startsWith('#') && line.includes('=')) {
        const [key, ...valueParts] = line.split('=');
        const value = valueParts.join('=').replace(/^["']|["']$/g, '');
        
        if (key && value) {
          process.env[key.trim()] = value;
          console.log(`✅ ${key.trim()}: ${value.substring(0, 15)}...`);
        }
      }
    });
  } else {
    console.log(`⚠️  No encontrado: ${fullPath}`);
  }
}

// Cargar archivos de variables de entorno
console.log('📋 Archivos de configuración a cargar:');
loadEnvFile('.env.stripe');
loadEnvFile('.env');

// Verificar variables críticas
const requiredVars = ['STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET'];
const missing = requiredVars.filter(varName => !process.env[varName]);

if (missing.length > 0) {
  console.error('❌ Variables faltantes:', missing);
  process.exit(1);
} else {
  console.log('✅ Todas las variables de Stripe cargadas correctamente');
}

console.log('🚀 Iniciando backend...');

// Ejecutar el backend principal
require('./dist/backend/index.js'); 