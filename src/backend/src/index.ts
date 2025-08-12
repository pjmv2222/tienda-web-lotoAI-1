import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import webhookRoutes from './routes/webhook.routes';
import paymentRoutes from './routes/payment.routes';
import predictionRoutes from './routes/prediction.routes';
import userPredictionRoutes from './routes/userPrediction.routes';
import subscriptionRoutes from './routes/subscription.routes';
import lotteryResultsRoutes from './routes/lottery-results.routes';
import { pgPool, initializeTables } from './config/database';

// Cargar variables de entorno desde múltiples archivos
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.stripe' });
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env.production' });

// Verificar que las variables de entorno se han cargado correctamente
console.log('Variables de entorno cargadas:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? 'Definida' : 'No definida');

const app = express();

console.log('Iniciando configuración del servidor...');

// Middleware especial para webhooks de Stripe (debe estar antes del express.json())
app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }));

// Middleware para parsear JSON - DEBE IR DESPUÉS DEL MIDDLEWARE DE STRIPE
app.use(express.json());

// Configuración CORS
const NODE_ENV = process.env.NODE_ENV || 'development';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4000';

// Definir orígenes permitidos según el entorno
let allowedOrigins: string[] = [];
if (NODE_ENV === 'production') {
  // Si FRONTEND_URL contiene múltiples URLs separadas por comas, dividirlas
  if (FRONTEND_URL.includes(',')) {
    allowedOrigins = FRONTEND_URL.split(',').map(url => url.trim());
    console.log('Múltiples orígenes configurados:', allowedOrigins);
  } else {
    allowedOrigins = [
      'https://loto-ia.com',
      'http://loto-ia.com',
      'https://www.loto-ia.com',
      'http://www.loto-ia.com'
    ];
  }
} else {
  allowedOrigins = [FRONTEND_URL];
  console.log(`Configurando CORS para desarrollo con origen: ${FRONTEND_URL}`);
}

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
}));

console.log('Orígenes CORS permitidos:', allowedOrigins);

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

// Montar rutas de pagos
app.use('/api/payments', paymentRoutes);

// Montar rutas de webhook
// Nota: La ruta principal para webhooks de Stripe ya está configurada arriba con express.raw
app.use('/api/webhooks', webhookRoutes);

// Montar rutas de suscripciones
console.log('Montando rutas de suscripciones en /api/subscriptions');
app.use('/api/subscriptions', subscriptionRoutes);

// Montar rutas de predicciones de IA (para generar predicciones)
console.log('Montando rutas de predicciones de IA en /api/predictions');
app.use('/api/predictions', predictionRoutes);

// Montar rutas de predicciones de usuario (contiene /summary)
console.log('Montando rutas de predicciones de usuario en /api/predictions/user');
app.use('/api/predictions/user', userPredictionRoutes);

// Montar rutas de resultados de lotería
console.log('Montando rutas de resultados de lotería en /api/lottery-results');
app.use('/api/lottery-results', lotteryResultsRoutes);

// Endpoint alias para compatibilidad (lottery-data -> lottery-results/latest)
app.get('/api/lottery-data', (req, res) => {
  // Redireccionar a lottery-results/latest
  req.url = '/api/lottery-results/latest';
  app._router.handle(req, res);
});

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

const PORT = parseInt(process.env.PORT || '3001', 10);

// NOTA: Este servidor se ha desactivado porque ahora se integra en server.ts
// Las rutas se exportan para ser montadas en el servidor SSR principal

// Exportar para uso en server.ts
console.log('✅ Backend configurado para integración con SSR');

// Si este archivo se ejecuta directamente (para desarrollo), iniciar servidor independiente
if (require.main === module) {
  console.log('⚠️  Modo desarrollo: Iniciando servidor backend independiente');
  console.log('🔧 Para producción, usar el servidor SSR integrado');
  
  const startServer = async () => {
    try {
      console.log('Inicializando base de datos PostgreSQL...');
      await initializeTables();
      
      const server = app.listen(PORT, '0.0.0.0', () => {
        console.log('='.repeat(50));
        console.log(`🚀 Servidor Backend (modo dev) en http://localhost:${PORT}`);
        console.log(`🔗 API disponible en http://localhost:${PORT}/api`);
        console.log(`🌍 Entorno: ${NODE_ENV}`);
        console.log('='.repeat(50));
      });
    } catch (error) {
      console.error('Error al inicializar el servidor:', error);
      process.exit(1);
    }
  };

  startServer();
}
