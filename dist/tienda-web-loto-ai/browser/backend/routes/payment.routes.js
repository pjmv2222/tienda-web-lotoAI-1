"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("../controllers/payment.controller");
const router = (0, express_1.Router)();
// Crear un PaymentIntent
router.post('/create-payment-intent', payment_controller_1.createPaymentIntent);
// Confirmar un pago
router.post('/confirm-payment', payment_controller_1.confirmPayment);
// Procesar un pago por transferencia
router.post('/process-transfer', payment_controller_1.processTransferPayment);
// Crear una orden de pago con PayPal
router.post('/create-paypal-order', payment_controller_1.createPayPalOrder);
// Procesar un pago con PayPal
router.post('/process-paypal', payment_controller_1.processPayPalPayment);
exports.default = router;
