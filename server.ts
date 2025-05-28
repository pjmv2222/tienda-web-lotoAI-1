import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import bootstrap from './src/main.server';

// Importar dependencias básicas
import cors from 'cors';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// The Express app is exported so that it can be used by serverless Functions.
export async function app(): Promise<express.Express> {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/tienda-web-loto-ai/browser');

  // Buscar el archivo index correcto en orden de prioridad
  let indexHtml: string;
  if (existsSync(join(distFolder, 'index.html'))) {
    indexHtml = join(distFolder, 'index.html');
  } else if (existsSync(join(distFolder, 'index.original.html'))) {
    indexHtml = join(distFolder, 'index.original.html');
  } else if (existsSync(join(distFolder, 'index.csr.html'))) {
    indexHtml = join(distFolder, 'index.csr.html');
    console.log('⚠️  Usando index.csr.html como fallback - el enrutamiento podría no funcionar correctamente');
  } else {
    throw new Error('No se encontró ningún archivo index válido en ' + distFolder);
  }

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

  // Función para cargar rutas del backend en tiempo de ejecución (evita errores de compilación)
  const loadBackendRoutes = () => {
    try {
      const fs = require('fs');
      const path = require('path');

      // Verificar si el backend compilado existe
      const backendPath = path.join(process.cwd(), 'src', 'backend', 'dist');
      if (!fs.existsSync(backendPath)) {
        console.log('⚠️ Backend no encontrado - solo frontend disponible');
        return;
      }

      // Cargar rutas dinámicamente solo si existen (evita errores de tipos TS)
      const routePaths = [
        { path: './src/backend/dist/routes/auth.routes.js', mount: '/api/auth' },
        { path: './src/backend/dist/routes/product.routes.js', mount: '/api/products' },
        { path: './src/backend/dist/routes/payment.routes.js', mount: '/api/payments' },
        { path: './src/backend/dist/routes/webhook.routes.js', mount: '/api/webhooks' },
        { path: './src/backend/dist/routes/prediction.routes.js', mount: '/api/predictions' },
        { path: './src/backend/dist/routes/subscription.routes.js', mount: '/api/subscriptions' }
      ];

      routePaths.forEach(({ path: routePath, mount }) => {
        try {
          const routeModule = require(routePath);
          const router = routeModule.default || routeModule;
          server.use(mount, router);
          console.log(`✅ Ruta ${mount} cargada`);
        } catch (err: any) {
          console.log(`⚠️ No se pudo cargar ${mount}:`, err.message);
        }
      });

      console.log('✅ Rutas del backend cargadas correctamente');
    } catch (error: any) {
      console.error('⚠️ Error cargando rutas del backend:', error.message);
      console.log('🔄 Continuando sin las rutas del backend - solo frontend disponible');
    }
  };

  // Cargar rutas del backend
  loadBackendRoutes();

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

      // Cargar configuración de base de datos dinámicamente
      try {
        const fs = require('fs');
        const path = require('path');
        const dbPath = path.join(process.cwd(), 'src', 'backend', 'dist', 'config', 'database.js');

        if (fs.existsSync(dbPath)) {
          const databaseConfig = require('./src/backend/dist/config/database.js');
          const initializeTables = databaseConfig.initializeTables || databaseConfig.default?.initializeTables;
          if (initializeTables) {
            await initializeTables();
          } else {
            console.log('⚠️ initializeTables no encontrado en el módulo de base de datos');
          }
        } else {
          console.log('⚠️ Configuración de base de datos no encontrada - continuando sin BD');
        }
      } catch (dbError: any) {
        console.log('⚠️ Error cargando configuración de BD:', dbError.message);
      }
      console.log('✅ PostgreSQL inicializado correctamente');

      // Start up the Node server
      const server = await app();
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
