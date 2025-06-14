const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

// Crear un PaymentIntent
router.post('/create-payment-intent', paymentController.createPaymentIntent);

// Confirmar un pago
router.post('/confirm-payment', paymentController.confirmPayment);

// Procesar un pago por transferencia
router.post('/process-transfer', paymentController.processTransferPayment);

// Procesar un pago con PayPal
router.post('/process-paypal', paymentController.processPayPalPayment);

// Verificar si un usuario tiene pagos recientes
router.get('/recent/:userId', paymentController.checkRecentPayments);

module.exports = router;
