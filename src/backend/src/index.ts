import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';

const app = express();

console.log('Iniciando configuración del servidor...');

// Middleware para parsear JSON - DEBE IR ANTES DE LAS RUTAS
app.use(express.json());

// Configuración CORS
app.use(cors({
  origin: ['http://localhost:4000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
}));

// Log de todas las peticiones
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  if (req.method !== 'GET') {
    console.log('Body:', JSON.stringify(req.body, null, 2));
  }
  next();
});

// Verificar que el servidor está vivo
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Rutas
console.log('Configurando rutas...');

// Ruta de prueba principal
app.get('/api/test', (req, res) => {
  console.log('[Main] Prueba de ruta principal');
  res.json({ message: 'API funcionando correctamente' });
});

// Montar rutas de autenticación
console.log('Montando rutas de autenticación en /api/auth');
app.use('/api/auth', authRoutes);
app.get('/api/auth/test', (req, res) => {
  console.log('[Main] Prueba de ruta auth desde main');
  res.json({ message: 'Auth router accesible desde main' });
});

// Montar otras rutas
app.use('/api/products', productRoutes);

// Manejador de rutas no encontradas
app.use((req, res) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 404 - Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    path: req.originalUrl,
    method: req.method,
    timestamp: timestamp
  });
});

// Manejador de errores global
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});

const PORT = 3000;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('='.repeat(50));
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
  console.log(`API disponible en http://localhost:${PORT}/api`);
  console.log('Rutas disponibles:');
  console.log('- GET  /api/health');
  console.log('- POST /api/auth/login');
  console.log('- POST /api/auth/register');
  console.log('- GET  /api/auth/profile');
  console.log('='.repeat(50));
});
