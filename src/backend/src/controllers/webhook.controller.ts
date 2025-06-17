import { Request, Response } from 'express';
import Stripe from 'stripe';
import { pgPool } from '../config/database';

// Inicializar Stripe con la clave secreta
if (!process.env['STRIPE_SECRET_KEY']) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

if (!process.env['STRIPE_WEBHOOK_SECRET']) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not set');
}

const stripe = new Stripe(process.env['STRIPE_SECRET_KEY'] || '');

/**
 * Maneja los eventos de webhook de Stripe
 */
export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'];

  try {
    if (!sig) {
        throw new Error('No stripe-signature header');
    }
    if (!process.env['STRIPE_WEBHOOK_SECRET']) {
        throw new Error('STRIPE_WEBHOOK_SECRET is not set');
    }

    const event = stripe.webhooks.constructEvent(
      req.body, 
      sig, 
      process.env['STRIPE_WEBHOOK_SECRET'] || ''
    );

    // Handle the event
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('✅ PaymentIntent was successful!', paymentIntent.id);
      
      const { userId, plan, endDate, amount, currency } = paymentIntent.metadata;

      // Usar una transacción de base de datos para asegurar la atomicidad
      const client = await pgPool.connect();
      try {
        await client.query('BEGIN');
        
        // Crear la suscripción
        const subResult = await client.query(
            `INSERT INTO subscriptions (user_id, plan_type, amount, currency, status, payment_intent_id, start_date, end_date)
             VALUES ($1, $2, $3, $4, 'active', $5, to_timestamp($6), to_timestamp($7)) RETURNING id`,
            [userId, plan, amount, currency, paymentIntent.id, paymentIntent.created, endDate]
        );
        const subscriptionId = subResult.rows[0].id;

        // Crear el registro del pago
        await client.query(
            `INSERT INTO payments (user_id, subscription_id, payment_intent_id, amount, currency, status, payment_method)
             VALUES ($1, $2, $3, $4, $5, 'succeeded', $6)`,
            [userId, subscriptionId, paymentIntent.id, paymentIntent.amount / 100, paymentIntent.currency, paymentIntent.latest_charge]
        );
        
        await client.query('COMMIT');
        console.log(`Subscription ${subscriptionId} and payment for ${paymentIntent.id} saved to DB.`);

      } catch (dbError) {
        await client.query('ROLLBACK');
        console.error('Database transaction failed:', dbError);
        // No se devuelve un res(500) para no dar una respuesta de error a Stripe,
        // ya que el webhook podría ser reenviado. El error ya está logueado.
      } finally {
        client.release();
      }
    }

    return res.status(200).json({ received: true });

  } catch (err: any) {
    console.error(`❌ Error message: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
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
