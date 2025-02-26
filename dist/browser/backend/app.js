"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
// Configurar variables de entorno
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:4200',
    credentials: true
}));
app.use(express_1.default.json());
// Rutas
app.use('/api/auth', auth_routes_1.default);
// Ruta de prueba
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'API funcionando correctamente' });
});
// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
    });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=app.js.map