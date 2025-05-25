"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const prediction_controller_1 = require("../controllers/prediction.controller");
const router = express_1.default.Router();
// Ruta de prueba para verificar que el router funciona
router.get('/test', (req, res) => {
    res.json({ message: 'API de predicciones funcionando correctamente' });
});
// Ruta para obtener el estado de los servidores Python
router.get('/servers/status', auth_middleware_1.authenticateToken, prediction_controller_1.getServerStatus);
// Ruta para obtener predicciones (protegida con autenticación)
router.get('/:game', auth_middleware_1.authenticateToken, prediction_controller_1.getPrediction);
// Ruta para obtener predicciones mediante POST (protegida con autenticación)
router.post('/:game', auth_middleware_1.authenticateToken, prediction_controller_1.getPrediction);
exports.default = router;
