import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import bootstrap from './src/main.server';

// Importar rutas del backend directamente
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/backend/src/routes/auth.routes';
import productRoutes from './src/backend/src/routes/product.routes';
import webhookRoutes from './src/backend/src/routes/webhook.routes';
import paymentRoutes from './src/backend/src/routes/payment.routes';
import predictionRoutes from './src/backend/src/routes/prediction.routes';
import subscriptionRoutes from './src/backend/src/routes/subscription.routes';
import { pgPool, initializeTables } from './src/backend/src/config/database';

// Cargar variables de entorno
dotenv.config();

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/tienda-web-loto-ai/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? join(distFolder, 'index.original.html')
    : join(distFolder, 'index.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Configuración CORS para el backend integrado
  const NODE_ENV = process.env.NODE_ENV || 'development';
  const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4200';
  
  let allowedOrigins: string[] = [];
  if (NODE_ENV === 'production') {
    allowedOrigins = [
      'https://loto-ia.com',
      'http://loto-ia.com', 
      'https://www.loto-ia.com',
      'http://www.loto-ia.com'
    ];
  } else {
    allowedOrigins = [FRONTEND_URL, 'http://localhost:4200'];
  }

  server.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  }));

  // Middleware especial para webhooks de Stripe (debe estar antes del express.json())
  server.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }));

  // Middleware para parsear JSON en el resto de rutas
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  // Rutas del backend API
  server.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  // Montar rutas del backend
  server.use('/api/auth', authRoutes);
  server.use('/api/products', productRoutes);
  server.use('/api/payments', paymentRoutes);
  server.use('/api/webhooks', webhookRoutes);
  server.use('/api/predictions', predictionRoutes);
  server.use('/api/subscriptions', subscriptionRoutes);

  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: distFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Inicializar PostgreSQL y luego arrancar el servidor
  const startServer = async () => {
    try {
      console.log('Inicializando base de datos PostgreSQL...');
      await initializeTables();
      console.log('✅ PostgreSQL inicializado correctamente');
      
      // Start up the Node server
      const server = app();
      server.listen(port, () => {
        console.log('='.repeat(50));
        console.log(`🚀 Servidor SSR + API iniciado en http://localhost:${port}`);
        console.log(`📱 Frontend: http://localhost:${port}`);
        console.log(`🔗 API: http://localhost:${port}/api`);
        console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
        console.log('📋 APIs disponibles:');
        console.log('   - GET  /api/health');
        console.log('   - POST /api/auth/login');
        console.log('   - POST /api/auth/register');
        console.log('   - GET  /api/subscriptions/user/:userId');
        console.log('   - GET  /api/subscriptions/check/:userId');
        console.log('   - POST /api/payments/create-payment-intent');
        console.log('   - POST /api/webhooks/stripe');
        console.log('='.repeat(50));
      });
    } catch (error) {
      console.error('❌ Error al inicializar el servidor:', error);
      process.exit(1);
    }
  };

  startServer();
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export default bootstrap;
