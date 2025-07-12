import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import { getPrediction, getServerStatus } from '../controllers/prediction.controller';

const router = express.Router();

// Ruta de prueba para verificar que el router funciona
router.get('/test', (req, res) => {
  res.json({ message: 'API de predicciones funcionando correctamente' });
});

// Ruta para obtener el estado de los servidores Python
router.get('/servers/status', authenticateToken, getServerStatus);

// Ruta POST para predicciones - usar el controlador completo que maneja el servidor IA
router.post('/:juego', authenticateToken, async (req, res) => {
  // Mapear el parámetro :juego a :game que espera getPrediction
  req.params.game = req.params.juego;
  
  // Interceptar la respuesta para adaptarla al formato del frontend
  const originalSend = res.json;
  res.json = function(data: any) {
    // Si la respuesta es exitosa, adaptar el formato
    if (data.success && data.prediction) {
      const adaptedResponse = {
        success: true,
        prediction: data.prediction,
        error: undefined
      };
      return originalSend.call(this, adaptedResponse);
    }
    
    // Si hay error, mantener el formato original
    return originalSend.call(this, data);
  };
  
  return getPrediction(req, res);
});

export default router;
