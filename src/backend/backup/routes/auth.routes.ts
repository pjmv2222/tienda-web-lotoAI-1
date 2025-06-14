import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();

// Rutas de autenticación
router.post('/register', authController.register.bind(authController));
router.post('/verify-email', authController.verifyEmail.bind(authController));

export default router;
