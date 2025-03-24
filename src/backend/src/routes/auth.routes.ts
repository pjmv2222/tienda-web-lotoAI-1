import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();
const authController = new AuthController();

// Middleware para manejar OPTIONS
router.options('*', (req, res) => {
  res.status(200).end();
});

// Rutas públicas (mantener como están)
router.post('/login', authController.login.bind(authController));
router.post('/verify-email', authController.verifyEmail.bind(authController));
router.get('/verify-email/:token', authController.verifyEmailWithToken.bind(authController));
router.post('/request-password-reset', authController.requestPasswordReset.bind(authController));
router.post('/reset-password', authController.resetPassword.bind(authController));

// Rutas protegidas (requieren autenticación)
router.get('/profile', authenticateToken, authController.getProfile.bind(authController));
router.get('/check-session', authenticateToken, (req, res) => {
  res.json({ 
    success: true,
    message: 'Sesión válida',
    user: req.user
  });
});

export default router;
