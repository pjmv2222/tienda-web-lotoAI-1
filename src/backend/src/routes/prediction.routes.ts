import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import { getPrediction, getServerStatus, getAllPredictionCounts } from '../controllers/prediction.controller';

const router = express.Router();

// Ruta de prueba para verificar que el router funciona
router.get('/test', (req, res) => {
  res.json({ message: 'API de predicciones funcionando correctamente' });
});

// Ruta para obtener el resumen de predicciones del usuario (profile-summary)
router.get('/profile-summary', authenticateToken, getAllPredictionCounts);

// Ruta para obtener el estado de los servidores Python
router.get('/servers/status', authenticateToken, getServerStatus);

// 🆕 RUTAS GET para compatibilidad con frontend (aceptar query params ?plan=basic)
router.get('/euromillon', authenticateToken, (req, res) => {
  req.params['game'] = 'euromillon';
  getPrediction(req, res);
});

router.get('/primitiva', authenticateToken, (req, res) => {
  req.params['game'] = 'primitiva';
  getPrediction(req, res);
});

router.get('/bonoloto', authenticateToken, (req, res) => {
  req.params['game'] = 'bonoloto';
  getPrediction(req, res);
});

router.get('/gordo', authenticateToken, (req, res) => {
  req.params['game'] = 'gordo';
  getPrediction(req, res);
});

router.get('/elgordo', authenticateToken, (req, res) => {
  req.params['game'] = 'gordo';
  getPrediction(req, res);
});

router.get('/eurodreams', authenticateToken, (req, res) => {
  req.params['game'] = 'eurodreams';
  getPrediction(req, res);
});

router.get('/loterianacional', authenticateToken, (req, res) => {
  req.params['game'] = 'loterianacional';
  getPrediction(req, res);
});

router.get('/lototurf', authenticateToken, (req, res) => {
  req.params['game'] = 'lototurf';
  getPrediction(req, res);
});

// Rutas POST (mantener para compatibilidad futura)
router.post('/euromillon', authenticateToken, (req, res) => {
  req.params['game'] = 'euromillon';
  getPrediction(req, res);
});

router.post('/primitiva', authenticateToken, (req, res) => {
  req.params['game'] = 'primitiva';
  getPrediction(req, res);
});

router.post('/bonoloto', authenticateToken, (req, res) => {
  req.params['game'] = 'bonoloto';
  getPrediction(req, res);
});

router.post('/gordo', authenticateToken, (req, res) => {
  req.params['game'] = 'gordo';
  getPrediction(req, res);
});

router.post('/elgordo', authenticateToken, (req, res) => {
  req.params['game'] = 'gordo';
  getPrediction(req, res);
});

router.post('/eurodreams', authenticateToken, (req, res) => {
  req.params['game'] = 'eurodreams';
  getPrediction(req, res);
});

router.post('/loterianacional', authenticateToken, (req, res) => {
  req.params['game'] = 'loterianacional';
  getPrediction(req, res);
});

router.post('/lototurf', authenticateToken, (req, res) => {
  req.params['game'] = 'lototurf';
  getPrediction(req, res);
});

export default router;
