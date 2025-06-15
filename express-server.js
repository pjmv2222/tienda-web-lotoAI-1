const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000;

// Configuración CORS básica
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos del build de Angular
const distFolder = path.join(__dirname, 'dist/tienda-web-loto-ai/browser');
app.use(express.static(distFolder, {
  maxAge: '1y',
  index: false,
}));

// API básica de salud
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    server: 'Express + Angular SSR'
  });
});

// API de prueba para botes
app.get('/api/botes', (req, res) => {
  res.json({
    euromillones: '50',
    primitiva: '15',
    bonoloto: '2',
    gordo: '8',
    lototurf: '300000',
    eurodreams: '20000',
    loterianacional: '600000'
  });
});

// Todas las demás rutas sirven el index.csr.html de Angular (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(distFolder, 'index.csr.html'));
});

app.listen(port, () => {
  console.log('🚀 Servidor Express iniciado en http://localhost:' + port);
  console.log('📱 Frontend: http://localhost:' + port);
  console.log('🔗 API: http://localhost:' + port + '/api');
  console.log('🌍 Entorno: ' + (process.env.NODE_ENV || 'development'));
  console.log('📋 APIs disponibles:');
  console.log('   - GET  /api/health');
  console.log('   - GET  /api/botes');
  console.log('✅ Servidor listo para recibir conexiones');
}); 