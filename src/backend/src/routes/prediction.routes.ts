import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import { getPrediction, getServerStatus } from '../controllers/prediction.controller';

const router = express.Router();

// Ruta de prueba para verificar que el router funciona
router.get('/test', (req, res) => {
  res.json({ message: 'API de predicciones funcionando correctamente' });
});

// Ruta de prueba para euromillon SIN autenticación (temporal para debug)
router.post('/euromillon/debug', (req, res) => {
  console.log('[DEBUG] Request recibido para euromillon sin autenticación');
  res.json({
    success: true,
    prediction: {
      numeros: [7, 14, 22, 33, 45],
      estrellas: [3, 9]
    }
  });
});

// Ruta para obtener el estado de los servidores Python
router.get('/servers/status', authenticateToken, getServerStatus);

// Ruta para obtener predicciones (protegida con autenticación)
router.get('/:game', authenticateToken, getPrediction);

// Ruta para obtener predicciones mediante POST (protegida con autenticación)
router.post('/:game', authenticateToken, getPrediction);

export default router;
