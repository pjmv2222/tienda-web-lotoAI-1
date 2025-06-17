import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import bootstrap from './src/main.server';

// --- Dependencias del Backend ---
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeTables } from './src/backend/src/config/database';

// --- Routers del Backend ---
import authRoutes from './src/backend/src/routes/auth.routes';
import paymentRoutes from './src/backend/src/routes/payment.routes';
import predictionRoutes from './src/backend/src/routes/prediction.routes';
import productRoutes from './src/backend/src/routes/product.routes';
import subscriptionRoutes from './src/backend/src/routes/subscription.routes';
import webhookRoutes from './src/backend/src/routes/webhook.routes';

// Cargar variables de entorno desde .env
dotenv.config();

export async function app(): Promise<express.Express> {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/tienda-web-loto-ai/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? join(distFolder, 'index.original.html')
    : join(distFolder, 'index.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // --- Middlewares del Backend ---
  const NODE_ENV = process.env['NODE_ENV'] || 'development';
  const allowedOrigins = NODE_ENV === 'production'
    ? ['https://loto-ia.com', 'http://loto-ia.com', 'https://www.loto-ia.com', 'http://www.loto-ia.com']
    : ['http://localhost:4200'];

  server.use(cors({
    origin: allowedOrigins,
    credentials: true,
  }));

  // El webhook de Stripe necesita el body en formato raw
  server.use('/api/webhooks', webhookRoutes);

  // El resto de las rutas usan JSON
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  // --- Rutas del API ---
  server.get('/api/health', (req, res) => res.json({ status: 'OK' }));
  server.use('/api/auth', authRoutes);
  server.use('/api/subscriptions', subscriptionRoutes);
  server.use('/api/predictions', predictionRoutes);
  server.use('/api/payments', paymentRoutes);
  server.use('/api/products', productRoutes);
  
  console.log('✅ API Endpoints registrados');

  // Servir archivos estáticos (e.g., images) desde la carpeta 'browser'
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // Todas las demás rutas son manejadas por Angular
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

async function run(): Promise<void> {
  const port = process.env['PORT'] || 4000;

  try {
    // 1. Inicializar la base de datos
    console.log('🔄 Inicializando la base de datos...');
    await initializeTables();
    console.log('✅ Base de datos inicializada correctamente.');

    // 2. Iniciar el servidor de Express
    const server = await app();
    server.listen(port, () => {
      console.log('='.repeat(50));
      console.log(`🚀 Servidor Unificado (SSR + API) iniciado en http://localhost:${port}`);
      console.log(`🌍 Entorno: ${process.env['NODE_ENV'] || 'development'}`);
      console.log('='.repeat(50));
    });
  } catch (error) {
    console.error('❌ Error fatal al iniciar el servidor:', error);
    process.exit(1);
  }
}

// Iniciar el servidor solo cuando el script es ejecutado directamente
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export default bootstrap;
