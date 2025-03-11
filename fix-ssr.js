const fs = require('fs');
const path = require('path');

// Ruta al archivo server.ts
const serverTsPath = path.join(__dirname, 'server.ts');

// Leer el contenido actual del archivo
let serverTsContent = fs.readFileSync(serverTsPath, 'utf8');

// Verificar si ya contiene la importación de NgZone
if (!serverTsContent.includes('import { NgZone } from \'@angular/core\';')) {
  // Añadir importación de NgZone
  serverTsContent = serverTsContent.replace(
    'import bootstrap from \'./src/main.server\';',
    'import bootstrap from \'./src/main.server\';\nimport { NgZone } from \'@angular/core\';'
  );
}

// Crear función para NgZone personalizado
const ngZoneFunction = `
// Función para crear NgZone personalizado
function createNgZone() {
  return new NgZone({
    enableLongStackTrace: false,
    shouldCoalesceEventChangeDetection: false
  });
}
`;

// Añadir la función si no existe
if (!serverTsContent.includes('function createNgZone()')) {
  // Añadir después de las importaciones
  const importEndIndex = serverTsContent.indexOf('export function app()');
  serverTsContent = serverTsContent.slice(0, importEndIndex) + 
                    ngZoneFunction + 
                    serverTsContent.slice(importEndIndex);
}

// Modificar la configuración de CommonEngine para incluir NgZone
if (!serverTsContent.includes('platformProviders:')) {
  // Buscar la creación de CommonEngine
  const commonEnginePattern = /const commonEngine = new CommonEngine\(\{([^}]*)\}\);/s;
  const commonEngineMatch = serverTsContent.match(commonEnginePattern);
  
  if (commonEngineMatch) {
    const commonEngineOptions = commonEngineMatch[1];
    const updatedOptions = commonEngineOptions.trim() ? 
      `${commonEngineOptions},
    platformProviders: [
      {
        provide: NgZone,
        useFactory: createNgZone
      }
    ]` : 
      `
    platformProviders: [
      {
        provide: NgZone,
        useFactory: createNgZone
      }
    ]`;
    
    serverTsContent = serverTsContent.replace(
      commonEnginePattern,
      `const commonEngine = new CommonEngine({${updatedOptions}
});`
    );
  }
}

// Guardar los cambios
fs.writeFileSync(serverTsPath, serverTsContent);

console.log('✅ Archivo server.ts modificado correctamente para solucionar el error NG0908.');

// Verificar si necesitamos crear el archivo fix-ngzone.ts
const fixNgZonePath = path.join(__dirname, 'src', 'fix-ngzone.ts');
if (!fs.existsSync(fixNgZonePath)) {
  const fixNgZoneContent = `import { NgZone } from '@angular/core';

export function createNgZone(): NgZone {
  return new NgZone({
    enableLongStackTrace: false,
    shouldCoalesceEventChangeDetection: false
  });
}
`;
  
  // Crear el directorio si no existe
  const fixNgZoneDir = path.dirname(fixNgZonePath);
  if (!fs.existsSync(fixNgZoneDir)) {
    fs.mkdirSync(fixNgZoneDir, { recursive: true });
  }
  
  fs.writeFileSync(fixNgZonePath, fixNgZoneContent);
  console.log('✅ Archivo src/fix-ngzone.ts creado correctamente.');
  
  // Actualizar server.ts para importar desde fix-ngzone.ts
  serverTsContent = serverTsContent.replace(
    'import { NgZone } from \'@angular/core\';',
    'import { NgZone } from \'@angular/core\';\nimport { createNgZone } from \'./src/fix-ngzone\';'
  );
  
  // Eliminar la función createNgZone del server.ts
  serverTsContent = serverTsContent.replace(ngZoneFunction, '');
  
  // Guardar los cambios actualizados
  fs.writeFileSync(serverTsPath, serverTsContent);
  console.log('✅ Archivo server.ts actualizado para usar fix-ngzone.ts.');
}

console.log('🚀 Corrección de SSR completada. Ejecuta npm run build:ssr para reconstruir la aplicación.'); 