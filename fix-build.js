#!/usr/bin/env node

/**
 * Script para corregir problemas de compilación SSR
 * Asegura que el archivo index.csr.html esté disponible para nginx
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Iniciando corrección de compilación SSR...');

const distPath = path.join(__dirname, 'dist', 'tienda-web-loto-ai', 'browser');
const indexHtmlPath = path.join(distPath, 'index.html');
const indexCsrPath = path.join(distPath, 'index.csr.html');

// Verificar que el directorio dist existe
if (!fs.existsSync(distPath)) {
  console.error('❌ Error: El directorio dist no existe. Ejecuta primero npm run build:ssr');
  process.exit(1);
}

console.log('📁 Verificando archivos en:', distPath);

// Listar archivos disponibles
const files = fs.readdirSync(distPath);
console.log('📄 Archivos encontrados:', files.filter(f => f.includes('index')));

// Si no existe index.csr.html pero sí index.html, crear index.csr.html
if (!fs.existsSync(indexCsrPath) && fs.existsSync(indexHtmlPath)) {
  console.log('🔄 Copiando index.html a index.csr.html...');
  fs.copyFileSync(indexHtmlPath, indexCsrPath);
  console.log('✅ Archivo index.csr.html creado correctamente');
} else if (fs.existsSync(indexCsrPath)) {
  console.log('✅ El archivo index.csr.html ya existe');
} else {
  console.error('❌ Error: No se encontró ningún archivo index válido');
  process.exit(1);
}

// Verificar que el archivo del servidor existe (Angular 18 usa main.server.mjs)
const serverPathMjs = path.join(__dirname, 'dist', 'tienda-web-loto-ai', 'server', 'main.server.mjs');
const serverPathJs = path.join(__dirname, 'dist', 'tienda-web-loto-ai', 'server', 'main.js');

if (fs.existsSync(serverPathMjs)) {
  console.log('✅ Archivo main.server.mjs encontrado (Angular 18)');
} else if (fs.existsSync(serverPathJs)) {
  console.log('✅ Archivo main.js encontrado');
} else {
  console.error('❌ Error: No se encontró archivo del servidor. La compilación SSR falló');
  process.exit(1);
}

// Verificar que el archivo de botes existe
const botesSourcePath = path.join(__dirname, 'src', 'assets', 'botes.json');
const botesDestPath = path.join(distPath, 'assets', 'botes.json');

if (fs.existsSync(botesSourcePath)) {
  // Crear directorio assets si no existe
  const assetsDir = path.join(distPath, 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // Copiar archivo de botes
  fs.copyFileSync(botesSourcePath, botesDestPath);
  console.log('✅ Archivo botes.json copiado correctamente');
} else {
  console.log('⚠️  Archivo botes.json no encontrado en src/assets/');
}

// Verificar que el backend está compilado
const backendDistPath = path.join(__dirname, 'src', 'backend', 'dist');
if (fs.existsSync(backendDistPath)) {
  console.log('✅ Backend compilado encontrado');
} else {
  console.log('⚠️  Backend no compilado. Ejecuta: cd src/backend && npm run build');
}

console.log('✅ Corrección de compilación SSR completada');
console.log('🚀 El proyecto está listo para desplegarse'); 