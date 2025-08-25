import { Router } from 'express';
import { StatsController } from '../controllers/stats.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

// Rutas públicas (sin autenticación)
router.get('/public', StatsController.getPublicStats);
router.post('/track-visitor', StatsController.trackVisitor);

// Rutas protegidas (requieren autenticación)
router.get('/detailed', authenticateToken, StatsController.getDetailedStats);
router.post('/update-counters', authenticateToken, StatsController.updateCounters);

export default router;
