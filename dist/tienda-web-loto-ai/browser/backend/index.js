"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const webhook_routes_1 = __importDefault(require("./routes/webhook.routes"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
const prediction_routes_1 = __importDefault(require("./routes/prediction.routes"));
const subscription_routes_1 = __importDefault(require("./routes/subscription.routes"));
const database_1 = require("./config/database");
// Cargar variables de entorno
dotenv_1.default.config();
// Verificar que las variables de entorno se han cargado correctamente
console.log('Variables de entorno cargadas:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? 'Definida' : 'No definida');
const app = (0, express_1.default)();
console.log('Iniciando configuración del servidor...');
// Middleware especial para webhooks de Stripe (debe estar antes del express.json())
app.use('/api/webhooks/stripe', express_1.default.raw({ type: 'application/json' }));
// Middleware para parsear JSON - DEBE IR DESPUÉS DEL MIDDLEWARE DE STRIPE
app.use(express_1.default.json());
// Configuración CORS
const NODE_ENV = process.env.NODE_ENV || 'development';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4000';
// Definir orígenes permitidos según el entorno
let allowedOrigins = [];
if (NODE_ENV === 'production') {
    // Si FRONTEND_URL contiene múltiples URLs separadas por comas, dividirlas
    if (FRONTEND_URL.includes(',')) {
        allowedOrigins = FRONTEND_URL.split(',').map(url => url.trim());
        console.log('Múltiples orígenes configurados:', allowedOrigins);
    }
    else {
        allowedOrigins = [
            'https://loto-ia.com',
            'http://loto-ia.com',
            'https://www.loto-ia.com',
            'http://www.loto-ia.com'
        ];
    }
}
else {
    allowedOrigins = [FRONTEND_URL];
    console.log(`Configurando CORS para desarrollo con origen: ${FRONTEND_URL}`);
}
app.use((0, cors_1.default)({
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
app.use('/api/auth', auth_routes_1.default);
app.get('/api/auth/test', (req, res) => {
    console.log('[Main] Prueba de ruta auth desde main');
    res.json({ message: 'Auth router accesible desde main' });
});
// Montar otras rutas
app.use('/api/products', product_routes_1.default);
// Montar rutas de pagos
app.use('/api/payments', payment_routes_1.default);
// Montar rutas de webhook
// Nota: La ruta principal para webhooks de Stripe ya está configurada arriba con express.raw
app.use('/api/webhooks', webhook_routes_1.default);
// Montar rutas de suscripciones
console.log('Montando rutas de suscripciones en /api/subscriptions');
app.use('/api/subscriptions', subscription_routes_1.default);
// Montar rutas de predicciones
console.log('Montando rutas de predicciones en /api/predictions');
app.use('/api/predictions', prediction_routes_1.default);
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
app.use((err, req, res, next) => {
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
    const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('Inicializando base de datos PostgreSQL...');
            yield (0, database_1.initializeTables)();
            const server = app.listen(PORT, '0.0.0.0', () => {
                console.log('='.repeat(50));
                console.log(`🚀 Servidor Backend (modo dev) en http://localhost:${PORT}`);
                console.log(`🔗 API disponible en http://localhost:${PORT}/api`);
                console.log(`🌍 Entorno: ${NODE_ENV}`);
                console.log('='.repeat(50));
            });
        }
        catch (error) {
            console.error('Error al inicializar el servidor:', error);
            process.exit(1);
        }
    });
    startServer();
}
