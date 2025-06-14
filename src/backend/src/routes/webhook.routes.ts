import { Router } from 'express';
import { handleStripeWebhook } from '../controllers/webhook.controller';
import express from 'express';

const router = Router();

// Ruta para webhooks de Stripe
// Nota: Esta ruta debe usar express.raw para procesar correctamente la firma de Stripe
router.post('/stripe', express.raw({ type: 'application/json' }), handleStripeWebhook);

export default router;
