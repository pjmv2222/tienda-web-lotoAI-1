import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import { getPrediction, getServerStatus } from '../controllers/prediction.controller';
import axios from 'axios';

const router = express.Router();

// Ruta de prueba para verificar que el router funciona
router.get('/test', (req, res) => {
  res.json({ message: 'API de predicciones funcionando correctamente' });
});

// Ruta para obtener el estado de los servidores Python
router.get('/servers/status', authenticateToken, getServerStatus);

// Ruta POST para predicciones - redirige al servidor IA
router.post('/:juego', authenticateToken, async (req, res) => {
  try {
    const { juego } = req.params;
    const userId = req.user.id;

    console.log(`🔍 [PREDICTIONS] Generando predicción para usuario ${userId}, juego: ${juego}`);

    // URL del servidor IA Flask
    const iaServerUrl = process.env.IA_SERVER_URL || 'http://localhost:5000';
    const predictionUrl = `${iaServerUrl}/${juego}/predict`;

    console.log(`🔍 [PREDICTIONS] Haciendo petición a: ${predictionUrl}`);

    // Obtener token de autenticación para el servidor IA
    const iaToken = process.env.IA_SERVER_TOKEN || '8011471e-90c3-4af3-bc53-452557b92001';

    // Hacer petición al servidor IA
    const iaResponse = await axios.post(predictionUrl, {}, {
      headers: {
        'Authorization': `Bearer ${iaToken}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000 // 30 segundos de timeout
    });

    console.log(`✅ [PREDICTIONS] Respuesta del servidor IA:`, iaResponse.data);

    if (!iaResponse.data.success) {
      throw new Error(iaResponse.data.error || 'Error en el servidor IA');
    }

    // Devolver respuesta al frontend
    res.json({
      success: true,
      data: {
        juego: juego,
        prediccion: iaResponse.data.prediccion,
        timestamp: iaResponse.data.timestamp
      }
    });

  } catch (error) {
    console.error(`❌ [PREDICTIONS] Error generando predicción para ${req.params.juego}:`, error);
    
    // Manejar errores específicos
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({
        success: false,
        error: 'El servidor de IA no está disponible en este momento'
      });
    }
    
    if (error.code === 'ENOTFOUND') {
      return res.status(503).json({
        success: false,
        error: 'No se puede conectar con el servidor de IA'
      });
    }
    
    if (error.response) {
      // Error del servidor IA
      return res.status(error.response.status).json({
        success: false,
        error: error.response.data.error || 'Error en el servidor de IA'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      message: error.message
    });
  }
});

export default router;
