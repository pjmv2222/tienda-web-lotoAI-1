import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import { getPrediction, getServerStatus } from '../controllers/prediction.controller';

const router = express.Router();

// Ruta de prueba para verificar que el router funciona
router.get('/test', (req, res) => {
  res.json({ message: 'API de predicciones funcionando correctamente' });
});

// Ruta eliminada - ahora se usa el sistema IA real

// Ruta para obtener el estado de los servidores Python
router.get('/servers/status', authenticateToken, getServerStatus);

// Ruta para obtener predicciones (protegida con autenticación)
router.get('/:game', authenticateToken, getPrediction);

// Ruta para obtener predicciones mediante POST (protegida con autenticación)
router.post('/:game', authenticateToken, getPrediction);

export default router;
