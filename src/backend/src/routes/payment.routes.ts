import { Router } from 'express';
import {
  createPaymentIntent,
  confirmPayment,
  processTransferPayment,
  processPayPalPayment,
  createPayPalOrder
} from '../controllers/payment.controller';

const router = Router();

// Crear un PaymentIntent
router.post('/create-payment-intent', createPaymentIntent);

// Confirmar un pago
router.post('/confirm-payment', confirmPayment);

// Procesar un pago por transferencia
router.post('/process-transfer', processTransferPayment);

// Crear una orden de pago con PayPal
router.post('/create-paypal-order', createPayPalOrder);

// Procesar un pago con PayPal
router.post('/process-paypal', processPayPalPayment);

export default router;
