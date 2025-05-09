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
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
// Ruta de prueba para verificar que el router funciona
router.get('/test', (req, res) => {
    res.json({ message: 'API de predicciones funcionando correctamente' });
});
// Ruta para obtener predicciones (protegida con autenticación)
router.get('/:game', auth_middleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { game } = req.params;
        const userId = req.user.id;
        // Verificar que el juego es válido
        const validGames = ['euromillon', 'bonoloto', 'primitiva', 'gordo-primitiva', 'eurodreams', 'loteria-nacional', 'lototurf'];
        if (!validGames.includes(game)) {
            return res.status(400).json({
                success: false,
                message: 'Juego no válido'
            });
        }
        // Aquí iría la lógica para obtener predicciones desde las APIs de IA
        // Por ahora, devolvemos una respuesta simulada
        const apiUrl = `https://api.loto-ia.com/${game}`;
        // Simulamos una respuesta exitosa
        res.json({
            success: true,
            message: `Predicción para ${game} obtenida correctamente`,
            data: {
                game,
                timestamp: new Date().toISOString(),
                apiUrl,
                // Aquí se incluirían los datos reales de la predicción
            }
        });
    }
    catch (error) {
        console.error('Error al obtener predicción:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener predicción'
        });
    }
}));
exports.default = router;
