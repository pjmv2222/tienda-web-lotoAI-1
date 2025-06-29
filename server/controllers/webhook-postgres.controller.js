const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Pool } = require('pg');

// Configuración de PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'lotoia',
  password: process.env.DB_PASSWORD || '',
  port: 5432,
});

// Manejar eventos de webhook de Stripe
exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  let event;
  
  try {
    // Verificar la firma del webhook
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Error de firma del webhook: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // Log del evento recibido
  console.log(`Webhook recibido: ${event.type} - ${event.id}`);
  
  // Manejar diferentes tipos de eventos
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object);
        break;
        
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object);
        break;
        
      case 'charge.refunded':
        await handleChargeRefunded(event.data.object);
        break;
        
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object);
        break;
        
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;
        
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;
        
      default:
        console.log(`Evento no manejado: ${event.type}`);
    }
    
    res.status(200).json({ received: true });
  } catch (error) {
    console.error(`Error al manejar el evento ${event.type}:`, error);
    res.status(500).json({ error: 'Error al procesar el webhook' });
  }
};

// Manejar evento de pago exitoso
async function handlePaymentIntentSucceeded(paymentIntent) {
  const client = await pool.connect();
  
  try {
    console.log(`Procesando payment_intent.succeeded: ${paymentIntent.id}`);
    
    // Buscar el pago en PostgreSQL
    const paymentQuery = `
      SELECT * FROM payments 
      WHERE stripe_payment_intent_id = $1
    `;
    const paymentResult = await client.query(paymentQuery, [paymentIntent.id]);
    
    if (paymentResult.rows.length === 0) {
      console.log(`Pago no encontrado para PaymentIntent: ${paymentIntent.id}`);
      
      // Crear el pago si no existe (fallback)
      const metadata = paymentIntent.metadata || {};
      const userId = metadata.user_id;
      const planType = metadata.plan_type || 'basic';
      
      if (userId) {
        await createPaymentAndSubscription(client, {
          userId,
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount / 100, // Stripe usa centavos
          planType,
          chargeId: paymentIntent.latest_charge
        });
      }
      
      return;
    }
    
    const payment = paymentResult.rows[0];
    
    // Actualizar el estado del pago
    const updatePaymentQuery = `
      UPDATE payments 
      SET status = 'succeeded', 
          stripe_charge_id = $1,
          updated_at = NOW()
      WHERE id = $2
    `;
    await client.query(updatePaymentQuery, [paymentIntent.latest_charge, payment.id]);
    
    // Si hay una suscripción asociada, activarla
    if (payment.subscription_id) {
      const updateSubscriptionQuery = `
        UPDATE subscriptions 
        SET status = 'active',
            updated_at = NOW()
        WHERE id = $1
      `;
      await client.query(updateSubscriptionQuery, [payment.subscription_id]);
      
      console.log(`Suscripción activada: ${payment.subscription_id}`);
    }
    
    console.log(`Pago actualizado correctamente: ${payment.id}`);
  } catch (error) {
    console.error('Error al manejar payment_intent.succeeded:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Crear pago y suscripción (fallback para pagos perdidos)
async function createPaymentAndSubscription(client, data) {
  try {
    console.log(`Creando pago y suscripción para usuario ${data.userId}`);
    
    // Crear suscripción
    const subscriptionQuery = `
      INSERT INTO subscriptions (user_id, plan_id, status, start_date, end_date, amount, stripe_payment_intent_id, payment_method, created_at)
      VALUES ($1, $2, 'active', NOW(), NOW() + INTERVAL '10 years', $3, $4, 'card', NOW())
      RETURNING id
    `;
    const subscriptionResult = await client.query(subscriptionQuery, [
      data.userId,
      data.planType,
      data.amount,
      data.paymentIntentId
    ]);
    
    const subscriptionId = subscriptionResult.rows[0].id;
    
    // Crear pago
    const paymentQuery = `
      INSERT INTO payments (user_id, subscription_id, amount, status, payment_method, stripe_payment_intent_id, stripe_charge_id, created_at)
      VALUES ($1, $2, $3, 'succeeded', 'card', $4, $5, NOW())
    `;
    await client.query(paymentQuery, [
      data.userId,
      subscriptionId,
      data.amount,
      data.paymentIntentId,
      data.chargeId
    ]);
    
    console.log(`Pago y suscripción creados exitosamente para usuario ${data.userId}`);
  } catch (error) {
    console.error('Error creando pago y suscripción:', error);
    throw error;
  }
}

// Manejar evento de pago fallido
async function handlePaymentIntentFailed(paymentIntent) {
  const client = await pool.connect();
  
  try {
    console.log(`Procesando payment_intent.failed: ${paymentIntent.id}`);
    
    const updateQuery = `
      UPDATE payments 
      SET status = 'failed',
          updated_at = NOW()
      WHERE stripe_payment_intent_id = $1
    `;
    await client.query(updateQuery, [paymentIntent.id]);
    
    console.log(`Pago marcado como fallido: ${paymentIntent.id}`);
  } catch (error) {
    console.error('Error al manejar payment_intent.failed:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Manejar evento de reembolso
async function handleChargeRefunded(charge) {
  const client = await pool.connect();
  
  try {
    console.log(`Procesando charge.refunded: ${charge.id}`);
    
    const updateQuery = `
      UPDATE payments 
      SET status = 'refunded',
          updated_at = NOW()
      WHERE stripe_charge_id = $1
    `;
    await client.query(updateQuery, [charge.id]);
    
    console.log(`Pago marcado como reembolsado: ${charge.id}`);
  } catch (error) {
    console.error('Error al manejar charge.refunded:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Manejar eventos de suscripción (para implementar después)
async function handleSubscriptionCreated(subscription) {
  console.log(`Suscripción creada: ${subscription.id}`);
}

async function handleSubscriptionUpdated(subscription) {
  console.log(`Suscripción actualizada: ${subscription.id}`);
}

async function handleSubscriptionDeleted(subscription) {
  console.log(`Suscripción eliminada: ${subscription.id}`);
}

module.exports = exports; 