"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const prod_config_1 = require("./config/prod.config");
dotenv_1.default.config();
const app = (0, express_1.default)();
const NODE_ENV = process.env.NODE_ENV || 'development';
// Configurar CORS
const corsOptions = {
    origin: NODE_ENV === 'production'
        ? 'https://www.loto-ia.com'
        : 'http://localhost:4200',
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// Rutas
app.get('/api/', (req, res) => {
    res.json({ message: 'API Backend funcionando correctamente' });
});
app.post('/api/register', (req, res) => {
    // ... lógica de registro
});
app.post('/api/login', (req, res) => {
    // ... lógica de login
});
app.listen(prod_config_1.serverConfig.port, '0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto ${prod_config_1.serverConfig.port}`);
});
//# sourceMappingURL=server.js.map