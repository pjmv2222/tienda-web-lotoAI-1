"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStripeWebhook = void 0;
const stripe_1 = __importDefault(require("stripe"));
// Inicializar Stripe con la clave secreta
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-03-31.basil',
});
/**
 * Maneja los eventos de webhook de Stripe
 */
const handleStripeWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sig = req.headers['stripe-signature'];
    if (!sig) {
        console.error('No se encontró la firma de Stripe en el encabezado');
        return res.status(400).send('Webhook Error: No se encontró la firma de Stripe');
    }
    let event;
    try {
        // Verificar la firma del webhook
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET || '');
    }
    catch (err) {
        console.error(`Error de firma del webhook: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Manejar diferentes tipos de eventos
    try {
        console.log(`Evento recibido: ${event.type}`);
        switch (event.type) {
            case 'payment_intent.succeeded':
                yield handlePaymentIntentSucceeded(event.data.object);
                break;
            case 'payment_intent.payment_failed':
                yield handlePaymentIntentFailed(event.data.object);
                break;
            case 'charge.succeeded':
                yield handleChargeSucceeded(event.data.object);
                break;
            case 'charge.refunded':
                yield handleChargeRefunded(event.data.object);
                break;
            case 'customer.subscription.created':
                yield handleSubscriptionCreated(event.data.object);
                break;
            case 'customer.subscription.updated':
                yield handleSubscriptionUpdated(event.data.object);
                break;
            case 'customer.subscription.deleted':
                yield handleSubscriptionDeleted(event.data.object);
                break;
            default:
                console.log(`Evento no manejado: ${event.type}`);
        }
        // Responder con éxito
        res.status(200).json({ received: true });
    }
    catch (error) {
        console.error(`Error al manejar el evento ${event.type}:`, error);
        res.status(500).json({ error: 'Error al procesar el webhook' });
    }
});
exports.handleStripeWebhook = handleStripeWebhook;
// Funciones auxiliares para manejar diferentes tipos de eventos
function handlePaymentIntentSucceeded(paymentIntent) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`PaymentIntent exitoso: ${paymentIntent.id}`);
        // Aquí implementarías la lógica para actualizar tu base de datos
        // Por ejemplo, actualizar el estado de un pedido, activar una suscripción, etc.
    });
}
function handlePaymentIntentFailed(paymentIntent) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`PaymentIntent fallido: ${paymentIntent.id}`);
        // Implementar lógica para manejar pagos fallidos
    });
}
function handleChargeSucceeded(charge) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Cargo exitoso: ${charge.id}`);
        // Implementar lógica para manejar cargos exitosos
    });
}
function handleChargeRefunded(charge) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Cargo reembolsado: ${charge.id}`);
        // Implementar lógica para manejar reembolsos
    });
}
function handleSubscriptionCreated(subscription) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Suscripción creada: ${subscription.id}`);
        // Implementar lógica para manejar suscripciones nuevas
    });
}
function handleSubscriptionUpdated(subscription) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Suscripción actualizada: ${subscription.id}`);
        // Implementar lógica para manejar actualizaciones de suscripciones
    });
}
function handleSubscriptionDeleted(subscription) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Suscripción eliminada: ${subscription.id}`);
        // Implementar lógica para manejar cancelaciones de suscripciones
    });
}
