#!/usr/bin/env node

/**
 * Script para corregir problemas de compilación SSR
 * Asegura que el archivo index.html esté disponible para el servidor SSR
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

// Si no existe index.html pero sí index.csr.html, crear index.html
if (!fs.existsSync(indexHtmlPath) && fs.existsSync(indexCsrPath)) {
  console.log('🔄 Copiando index.csr.html a index.html...');
  fs.copyFileSync(indexCsrPath, indexHtmlPath);
  console.log('✅ Archivo index.html creado correctamente');
} else if (fs.existsSync(indexHtmlPath)) {
  console.log('✅ El archivo index.html ya existe');
} else {
  console.error('❌ Error: No se encontró ningún archivo index válido');
  process.exit(1);
}

// Verificar que el archivo del servidor existe
const serverPath = path.join(__dirname, 'dist', 'tienda-web-loto-ai', 'server', 'main.js');
if (!fs.existsSync(serverPath)) {
  console.error('❌ Error: No se encontró main.js. La compilación SSR falló');
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
