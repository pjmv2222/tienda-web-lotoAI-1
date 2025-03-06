import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();

// Ruta para registro
router.post('/register', authController.register.bind(authController));

// Ruta para login
router.post('/login', authController.login.bind(authController));

// Ruta para verificación de email
router.post('/verify-email', authController.verifyEmail.bind(authController));

export default router;
