import { Request, Response } from 'express';
import Stripe from 'stripe';

// Inicializar Stripe con la clave secreta
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('ADVERTENCIA: Variable de entorno STRIPE_SECRET_KEY no encontrada');
  console.error('Asegúrate de que el archivo .env existe y contiene STRIPE_SECRET_KEY');
}

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  console.error('ADVERTENCIA: Variable de entorno STRIPE_WEBHOOK_SECRET no encontrada');
  console.error('Asegúrate de que el archivo .env existe y contiene STRIPE_WEBHOOK_SECRET');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  // Usar la versión de la API desde los tipos de Stripe para evitar errores de compilación
  apiVersion: '2025-03-31.basil' as Stripe.LatestApiVersion,
});

/**
 * Maneja los eventos de webhook de Stripe
 */
export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;

  if (!sig) {
    console.error('No se encontró la firma de Stripe en el encabezado');
    return res.status(400).send('Webhook Error: No se encontró la firma de Stripe');
  }

  let event: Stripe.Event;

  try {
    // Verificar la firma del webhook
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error('Error: No se encontró la variable de entorno STRIPE_WEBHOOK_SECRET');
    }

    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err: any) {
    console.error(`Error de firma del webhook: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Manejar diferentes tipos de eventos
  try {
    console.log(`Evento recibido: ${event.type}`);

    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      case 'charge.succeeded':
        await handleChargeSucceeded(event.data.object as Stripe.Charge);
        break;

      case 'charge.refunded':
        await handleChargeRefunded(event.data.object as Stripe.Charge);
        break;

      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      default:
        console.log(`Evento no manejado: ${event.type}`);
    }

    // Responder con éxito
    res.status(200).json({ received: true });
  } catch (error: any) {
    console.error(`Error al manejar el evento ${event.type}:`, error);
    res.status(500).json({ error: 'Error al procesar el webhook' });
  }
};

// Funciones auxiliares para manejar diferentes tipos de eventos

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log(`PaymentIntent exitoso: ${paymentIntent.id}`);
  // Aquí implementarías la lógica para actualizar tu base de datos
  // Por ejemplo, actualizar el estado de un pedido, activar una suscripción, etc.
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log(`PaymentIntent fallido: ${paymentIntent.id}`);
  // Implementar lógica para manejar pagos fallidos
}

async function handleChargeSucceeded(charge: Stripe.Charge) {
  console.log(`Cargo exitoso: ${charge.id}`);
  // Implementar lógica para manejar cargos exitosos
}

async function handleChargeRefunded(charge: Stripe.Charge) {
  console.log(`Cargo reembolsado: ${charge.id}`);
  // Implementar lógica para manejar reembolsos
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log(`Suscripción creada: ${subscription.id}`);
  // Implementar lógica para manejar suscripciones nuevas
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log(`Suscripción actualizada: ${subscription.id}`);
  // Implementar lógica para manejar actualizaciones de suscripciones
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log(`Suscripción eliminada: ${subscription.id}`);
  // Implementar lógica para manejar cancelaciones de suscripciones
}
