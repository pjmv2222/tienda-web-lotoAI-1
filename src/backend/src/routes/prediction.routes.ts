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

// Rutas específicas para cada juego de IA - usar el controlador completo
router.post('/euromillon', authenticateToken, (req, res) => {
  req.params.game = 'euromillon';
  getPrediction(req, res);
});

router.post('/primitiva', authenticateToken, (req, res) => {
  req.params.game = 'primitiva';
  getPrediction(req, res);
});

router.post('/bonoloto', authenticateToken, (req, res) => {
  req.params.game = 'bonoloto';
  getPrediction(req, res);
});

router.post('/gordo', authenticateToken, (req, res) => {
  req.params.game = 'gordo';
  getPrediction(req, res);
});

router.post('/eurodreams', authenticateToken, (req, res) => {
  req.params.game = 'eurodreams';
  getPrediction(req, res);
});

router.post('/loterianacional', authenticateToken, (req, res) => {
  req.params.game = 'loterianacional';
  getPrediction(req, res);
});

router.post('/lototurf', authenticateToken, (req, res) => {
  req.params.game = 'lototurf';
  getPrediction(req, res);
});

export default router;
