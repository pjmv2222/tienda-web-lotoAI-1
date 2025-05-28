#!/usr/bin/env node

/**
 * Script para iniciar el backend API por separado
 * Este script inicia el servidor backend en puerto 3001
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🔧 Iniciando servidor backend API...');

// Verificar que el backend esté compilado
const backendDistPath = path.join(__dirname, 'src', 'backend', 'dist');
if (!fs.existsSync(backendDistPath)) {
  console.error('❌ Error: Backend no compilado');
  console.log('📝 Ejecuta primero: cd src/backend && npm run build');
  process.exit(1);
}

// Verificar que el archivo principal existe
const mainFile = path.join(backendDistPath, 'index.js');
if (!fs.existsSync(mainFile)) {
  console.error('❌ Error: Archivo principal del backend no encontrado');
  console.log('📝 Esperado en:', mainFile);
  process.exit(1);
}

// Configurar variables de entorno para el backend
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.PORT = process.env.PORT || '3001';

console.log('✅ Backend compilado encontrado');
console.log(`🚀 Iniciando backend en puerto ${process.env.PORT}...`);

// Iniciar el proceso del backend
const backend = spawn('node', [mainFile], {
  cwd: __dirname,
  stdio: 'inherit',
  env: process.env
});

backend.on('error', (error) => {
  console.error('❌ Error al iniciar el backend:', error);
  process.exit(1);
});

backend.on('exit', (code) => {
  console.log(`🔄 Backend terminado con código: ${code}`);
  process.exit(code);
});

// Manejar señales de terminación
process.on('SIGINT', () => {
  console.log('\n🛑 Deteniendo backend...');
  backend.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Deteniendo backend...');
  backend.kill('SIGTERM');
});
