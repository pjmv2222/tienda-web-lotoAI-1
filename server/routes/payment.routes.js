const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

// Crear un PaymentIntent
router.post('/create-payment-intent', paymentController.createPaymentIntent);

// Confirmar un pago
router.post('/confirm-payment', paymentController.confirmPayment);

// Procesar un pago por transferencia
router.post('/process-transfer', paymentController.processTransferPayment);

// Obtener historial de pagos de un usuario
router.get('/history/:userId', paymentController.getPaymentHistory);

module.exports = router;
