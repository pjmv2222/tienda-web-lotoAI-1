"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const webhook_controller_1 = require("../controllers/webhook.controller");
const express_2 = __importDefault(require("express"));
const router = (0, express_1.Router)();
// Ruta para webhooks de Stripe
// Nota: Esta ruta debe usar express.raw para procesar correctamente la firma de Stripe
router.post('/stripe', express_2.default.raw({ type: 'application/json' }), webhook_controller_1.handleStripeWebhook);
exports.default = router;
