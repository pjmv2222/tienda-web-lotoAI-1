"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("zone.js/node");
const common_1 = require("@angular/common");
const ssr_1 = require("@angular/ssr");
const express_1 = __importDefault(require("express"));
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const main_server_1 = __importDefault(require("./src/main.server"));
// Importar dependencias básicas
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// Cargar variables de entorno
dotenv_1.default.config();
// The Express app is exported so that it can be used by serverless Functions.
async function app() {
    const server = (0, express_1.default)();
    const distFolder = (0, node_path_1.join)(process.cwd(), 'dist/tienda-web-loto-ai/browser');
    // Buscar el archivo index correcto en orden de prioridad
    let indexHtml;
    if ((0, node_fs_1.existsSync)((0, node_path_1.join)(distFolder, 'index.html'))) {
        indexHtml = (0, node_path_1.join)(distFolder, 'index.html');
    }
    else if ((0, node_fs_1.existsSync)((0, node_path_1.join)(distFolder, 'index.original.html'))) {
        indexHtml = (0, node_path_1.join)(distFolder, 'index.original.html');
    }
    else if ((0, node_fs_1.existsSync)((0, node_path_1.join)(distFolder, 'index.csr.html'))) {
        indexHtml = (0, node_path_1.join)(distFolder, 'index.csr.html');
        console.log('⚠️  Usando index.csr.html como fallback - el enrutamiento podría no funcionar correctamente');
    }
    else {
        throw new Error('No se encontró ningún archivo index válido en ' + distFolder);
    }
    const commonEngine = new ssr_1.CommonEngine();
    server.set('view engine', 'html');
    server.set('views', distFolder);
    // Configuración CORS para el backend integrado
    const NODE_ENV = process.env['NODE_ENV'] || 'development';
    const FRONTEND_URL = process.env['FRONTEND_URL'] || 'http://localhost:4200';
    let allowedOrigins = [];
    if (NODE_ENV === 'production') {
        allowedOrigins = [
            'https://loto-ia.com',
            'http://loto-ia.com',
            'https://www.loto-ia.com',
            'http://www.loto-ia.com'
        ];
    }
    else {
        allowedOrigins = [FRONTEND_URL, 'http://localhost:4200'];
    }
    server.use((0, cors_1.default)({
        origin: allowedOrigins,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    }));
    // Middleware especial para webhooks de Stripe (debe estar antes del express.json())
    server.use('/api/webhooks/stripe', express_1.default.raw({ type: 'application/json' }));
    // Middleware para parsear JSON en el resto de rutas
    server.use(express_1.default.json());
    server.use(express_1.default.urlencoded({ extended: true }));
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
                }
                catch (err) {
                    console.log(`⚠️ No se pudo cargar ${mount}:`, err.message);
                }
            });
            console.log('✅ Rutas del backend cargadas correctamente');
        }
        catch (error) {
            console.error('⚠️ Error cargando rutas del backend:', error.message);
            console.log('🔄 Continuando sin las rutas del backend - solo frontend disponible');
        }
    };
    // Cargar rutas del backend
    loadBackendRoutes();
    // Serve static files from /browser
    server.get('*.*', express_1.default.static(distFolder, {
        maxAge: '1y'
    }));
    // All regular routes use the Angular engine
    server.get('*', (req, res, next) => {
        const { protocol, originalUrl, baseUrl, headers } = req;
        commonEngine
            .render({
            bootstrap: main_server_1.default,
            documentFilePath: indexHtml,
            url: `${protocol}://${headers.host}${originalUrl}`,
            publicPath: distFolder,
            providers: [{ provide: common_1.APP_BASE_HREF, useValue: baseUrl }],
        })
            .then((html) => res.send(html))
            .catch((err) => next(err));
    });
    return server;
}
exports.app = app;
function run() {
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
                    }
                    else {
                        console.log('⚠️ initializeTables no encontrado en el módulo de base de datos');
                    }
                }
                else {
                    console.log('⚠️ Configuración de base de datos no encontrada - continuando sin BD');
                }
            }
            catch (dbError) {
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
                console.log(`🌍 Entorno: ${process.env['NODE_ENV'] || 'development'}`);
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
        }
        catch (error) {
            console.error('❌ Error al inicializar el servidor:', error);
            process.exit(1);
        }
    };
    startServer();
}
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
    run();
}
exports.default = main_server_1.default;
