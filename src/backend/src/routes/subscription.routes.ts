import { Router } from 'express';
import { SubscriptionController } from '../controllers/subscription.controller';

const router = Router();
const subscriptionController = new SubscriptionController();

console.log('Configurando rutas de suscripciones...');

// Middleware para todas las rutas de suscripciones
router.use((req, res, next) => {
  console.log(`[Subscription Route] ${req.method} ${req.url}`);
  next();
});

// Obtener precios de planes
router.get('/plans/prices', (req, res) => {
  console.log('[Subscription Route] Obteniendo precios de planes');
  subscriptionController.getPlanPrices(req, res);
});

// Obtener todas las suscripciones de un usuario
router.get('/user/:userId', (req, res) => {
  console.log('[Subscription Route] Obteniendo suscripciones del usuario:', req.params.userId);
  subscriptionController.getUserSubscriptions(req, res);
});

// Verificar si un usuario tiene una suscripción activa
router.get('/check/:userId', (req, res) => {
  console.log('[Subscription Route] Verificando suscripción activa del usuario:', req.params.userId);
  subscriptionController.checkActiveSubscription(req, res);
});

// Obtener una suscripción por ID
router.get('/:id', (req, res) => {
  console.log('[Subscription Route] Obteniendo suscripción por ID:', req.params.id);
  subscriptionController.getSubscriptionById(req, res);
});

// Crear nueva suscripción
router.post('/', (req, res) => {
  console.log('[Subscription Route] Creando nueva suscripción:', req.body);
  subscriptionController.createSubscription(req, res);
});

// Cancelar una suscripción
router.put('/:id/cancel', (req, res) => {
  console.log('[Subscription Route] Cancelando suscripción:', req.params.id);
  subscriptionController.cancelSubscription(req, res);
});

// Ruta de prueba
router.get('/test', (req, res) => {
  console.log('[Subscription Route] Prueba de rutas de suscripciones');
  res.json({ message: 'Subscription router funcionando correctamente' });
});

export default router;
