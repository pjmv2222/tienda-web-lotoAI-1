"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
console.log('Configurando rutas de autenticación...');
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
router.get('/profile', auth_middleware_1.authenticateToken, (req, res) => {
    console.log('[Auth Route] Recibida petición de perfil');
    authController.getProfile(req, res);
});
router.put('/profile', auth_middleware_1.authenticateToken, (req, res) => {
    console.log('[Auth Route] Recibida petición de actualización de perfil');
    authController.updateProfile(req, res);
});
router.delete('/profile', auth_middleware_1.authenticateToken, (req, res) => {
    console.log('[Auth Route] Recibida petición de eliminación de cuenta');
    authController.deleteAccount(req, res);
});
// Ruta de prueba en el router de autenticación
router.get('/test', (req, res) => {
    console.log('[Auth Route] Prueba de ruta auth');
    res.json({ message: 'Auth router funcionando correctamente' });
});
console.log('Rutas de autenticación configuradas');
exports.default = router;
