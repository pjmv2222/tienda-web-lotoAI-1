// Configuración para evitar el error NG0908 con NgZone
process.env.NODE_OPTIONS = '--no-zone';

// Importar y ejecutar el servidor
require('./dist/tienda-web-loto-ai/server/main.js'); 