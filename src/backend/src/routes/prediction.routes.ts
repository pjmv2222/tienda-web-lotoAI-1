import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

// Ruta de prueba para verificar que el router funciona
router.get('/test', (req, res) => {
  res.json({ message: 'API de predicciones funcionando correctamente' });
});

// Ruta para obtener predicciones (protegida con autenticación)
router.get('/:game', authenticateToken, async (req, res) => {
  try {
    const { game } = req.params;
    const userId = (req as any).user.id;

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
  } catch (error) {
    console.error('Error al obtener predicción:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener predicción'
    });
  }
});

export default router;
