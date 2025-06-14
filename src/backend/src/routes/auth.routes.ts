import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();
const authController = new AuthController();

// console.log('Configurando rutas de autenticación...'); // DESACTIVADO: Causaba bucle infinito

// Middleware para todas las rutas de autenticación
router.use((req, res, next) => {
  console.log(`[Auth Route] ${req.method} ${req.url}`);
  next();
});

// Rutas públicas
router.post('/login', (req, res) => {
  console.log('[Auth Route] Recibida petición de login:', {
    body: req.body,
    headers: req.headers
  });
  authController.login(req, res);
});

router.post('/register', (req, res) => {
  console.log('[Auth Route] Recibida petición de registro:', req.body);
  authController.register(req, res);
});

// Ruta de verificación de email
router.get('/verify/:token', (req, res) => {
  console.log('[Auth Route] Recibida petición de verificación de email:', req.params);
  authController.verifyEmailWithToken(req, res);
});

// Rutas protegidas
router.get('/profile', authenticateToken, (req, res) => {
  console.log('[Auth Route] Recibida petición de perfil');
  authController.getProfile(req, res);
});

router.put('/profile', authenticateToken, (req, res) => {
  console.log('[Auth Route] Recibida petición de actualización de perfil');
  authController.updateProfile(req, res);
});

router.delete('/profile', authenticateToken, (req, res) => {
  console.log('[Auth Route] Recibida petición de eliminación de cuenta');
  authController.deleteAccount(req, res);
});

// Ruta de prueba en el router de autenticación
router.get('/test', (req, res) => {
  console.log('[Auth Route] Prueba de ruta auth');
  res.json({ message: 'Auth router funcionando correctamente' });
});

console.log('Rutas de autenticación configuradas');

export default router;
