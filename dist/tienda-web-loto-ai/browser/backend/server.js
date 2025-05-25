"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = parseInt(process.env.PORT || '3000', 10);
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4000';
// Configurar CORS
const corsOptions = {
    origin: NODE_ENV === 'production'
        ? 'https://www.loto-ia.com'
        : FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// Rutas
app.get('/api', (req, res) => {
    res.json({ message: 'API Backend funcionando correctamente' });
});
// Rutas de autenticación
app.use('/api/auth', auth_routes_1.default);
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`Frontend URL configurada: ${corsOptions.origin}`);
});
