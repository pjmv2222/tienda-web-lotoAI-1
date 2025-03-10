const fs = require('fs');
const path = require('path');

// Ruta al archivo main.js compilado
const mainJsPath = path.join(__dirname, 'dist', 'tienda-web-loto-ai', 'server', 'main.js');

console.log('Aplicando fix para NgZone en SSR...');
console.log(`Ruta del archivo: ${mainJsPath}`);

// Verificar si el archivo existe
if (!fs.existsSync(mainJsPath)) {
  console.error(`Error: No se encontró el archivo ${mainJsPath}`);
  process.exit(1);
}

// Leer el contenido del archivo
let content = fs.readFileSync(mainJsPath, 'utf8');

// Buscar la definición de NgZone y modificarla
// Esta es una solución temporal que busca patrones específicos en el código compilado
// y los modifica para evitar el error NG0908

// Patrón 1: Buscar la creación de NgZone y modificar sus opciones
const ngZonePattern = /new NgZone\(\{[^}]*\}\)/g;
content = content.replace(ngZonePattern, 'new NgZone({shouldCoalesceEventChangeDetection: false})');

// Patrón 2: Buscar la función de fábrica de NgZone y modificarla
const ngZoneFactoryPattern = /ngZoneFactory[^{]*\{[^}]*return new NgZone\([^)]*\)/g;
content = content.replace(ngZoneFactoryPattern, match => {
  return match.replace(/return new NgZone\([^)]*\)/, 'return new NgZone({shouldCoalesceEventChangeDetection: false})');
});

// Guardar el archivo modificado
fs.writeFileSync(mainJsPath, content);

console.log('Fix aplicado correctamente.'); 