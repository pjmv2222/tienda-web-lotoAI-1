import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();

// Ruta para registro
router.post('/register', authController.register.bind(authController));

// Ruta para login
router.post('/login', authController.login.bind(authController));

// Ruta para verificación de email (POST)
router.post('/verify-email', authController.verifyEmail.bind(authController));

// Ruta para verificación de email con token (GET)
router.get('/verify-email/:token', authController.verifyEmailWithToken.bind(authController));

// Rutas para recuperación de contraseña
router.post('/request-password-reset', authController.requestPasswordReset.bind(authController));
router.post('/reset-password', authController.resetPassword.bind(authController));

export default router;
