const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhook.controller');

// Webhook de Stripe
router.post('/stripe', webhookController.handleStripeWebhook);

module.exports = router;
