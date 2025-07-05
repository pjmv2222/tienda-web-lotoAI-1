import { Router } from 'express';
import { PredictionController } from '../controllers/prediction.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

// Middleware de autenticación para todas las rutas
router.use(authenticateToken);

// GET /api/predictions/status/:gameType - Obtener estado de predicciones para un juego
router.get('/status/:gameType', PredictionController.getPredictionStatus);

// GET /api/predictions/summary - Obtener resumen de todas las predicciones del usuario
router.get('/summary', PredictionController.getAllPredictionCounts);

// POST /api/predictions - Crear nueva predicción
router.post('/', PredictionController.createPrediction);

// DELETE /api/predictions/:gameType - Limpiar predicciones para un juego
router.delete('/:gameType', PredictionController.clearPredictions);

export default router; 