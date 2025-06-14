const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription.controller');

// Obtener todas las suscripciones de un usuario
router.get('/user/:userId', subscriptionController.getUserSubscriptions);

// Obtener una suscripción por ID
router.get('/:id', subscriptionController.getSubscriptionById);

// Cancelar una suscripción
router.put('/:id/cancel', subscriptionController.cancelSubscription);

// Verificar si un usuario tiene una suscripción activa
router.get('/check/:userId', subscriptionController.checkActiveSubscription);

module.exports = router;
