const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Pool de PostgreSQL - será inyectado por el middleware
let pgPool;

// Función auxiliar para establecer el pool
const setPgPool = (pool) => {
  pgPool = pool;
};

// Manejar eventos de webhook de Stripe
exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  // Establecer el pool de PostgreSQL
  if (req.pgPool) {
    setPgPool(req.pgPool);
  }
  
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
  try {
    const client = await pgPool.connect();
    try {
      // Buscar el pago en la base de datos
      const paymentQuery = 'SELECT * FROM payments WHERE stripe_payment_intent_id = $1';
      const paymentResult = await client.query(paymentQuery, [paymentIntent.id]);
      
      if (paymentResult.rows.length === 0) {
        console.log(`Pago no encontrado para PaymentIntent: ${paymentIntent.id}`);
        return;
      }
      
      const payment = paymentResult.rows[0];
      
      // Actualizar el estado del pago
      const updatePaymentQuery = `
        UPDATE payments 
        SET status = $1, stripe_charge_id = $2, updated_at = NOW()
        WHERE id = $3
        RETURNING *
      `;
      
      const updatedPaymentResult = await client.query(updatePaymentQuery, [
        'succeeded',
        paymentIntent.latest_charge,
        payment.id
      ]);
      
      // Si hay una suscripción asociada, actualizarla
      if (payment.subscription_id) {
        const updateSubscriptionQuery = `
          UPDATE subscriptions 
          SET status = $1, updated_at = NOW()
          WHERE id = $2
        `;
        
        await client.query(updateSubscriptionQuery, ['active', payment.subscription_id]);
      }
      
      console.log(`Pago actualizado correctamente: ${payment.id}`);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error al manejar payment_intent.succeeded:', error);
    throw error;
  }
}

// Manejar evento de pago fallido
async function handlePaymentIntentFailed(paymentIntent) {
  try {
    const client = await pgPool.connect();
    try {
      // Buscar el pago en la base de datos
      const paymentQuery = 'SELECT * FROM payments WHERE stripe_payment_intent_id = $1';
      const paymentResult = await client.query(paymentQuery, [paymentIntent.id]);
      
      if (paymentResult.rows.length === 0) {
        console.log(`Pago no encontrado para PaymentIntent: ${paymentIntent.id}`);
        return;
      }
      
      const payment = paymentResult.rows[0];
      
      // Actualizar el estado del pago
      const updatePaymentQuery = `
        UPDATE payments 
        SET status = $1, updated_at = NOW()
        WHERE id = $2
      `;
      
      await client.query(updatePaymentQuery, ['failed', payment.id]);
      
      // Si hay una suscripción asociada, actualizarla
      if (payment.subscription_id) {
        const updateSubscriptionQuery = `
          UPDATE subscriptions 
          SET status = $1, updated_at = NOW()
          WHERE id = $2
        `;
        
        await client.query(updateSubscriptionQuery, ['canceled', payment.subscription_id]);
      }
      
      console.log(`Pago marcado como fallido: ${payment.id}`);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error al manejar payment_intent.payment_failed:', error);
    throw error;
  }
}

// Manejar evento de reembolso
async function handleChargeRefunded(charge) {
  try {
    const client = await pgPool.connect();
    try {
      // Buscar el pago en la base de datos
      const paymentQuery = 'SELECT * FROM payments WHERE stripe_charge_id = $1';
      const paymentResult = await client.query(paymentQuery, [charge.id]);
      
      if (paymentResult.rows.length === 0) {
        console.log(`Pago no encontrado para Charge: ${charge.id}`);
        return;
      }
      
      const payment = paymentResult.rows[0];
      
      // Actualizar el estado del pago
      const updatePaymentQuery = `
        UPDATE payments 
        SET status = $1, updated_at = NOW()
        WHERE id = $2
      `;
      
      await client.query(updatePaymentQuery, ['refunded', payment.id]);
      
      // Si hay una suscripción asociada, actualizarla
      if (payment.subscription_id) {
        const updateSubscriptionQuery = `
          UPDATE subscriptions 
          SET status = $1, updated_at = NOW()
          WHERE id = $2
        `;
        
        await client.query(updateSubscriptionQuery, ['canceled', payment.subscription_id]);
      }
      
      console.log(`Pago marcado como reembolsado: ${payment.id}`);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error al manejar charge.refunded:', error);
    throw error;
  }
}

// Manejar evento de suscripción creada
async function handleSubscriptionCreated(subscription) {
  // Implementar según sea necesario para suscripciones recurrentes
  console.log(`Suscripción creada: ${subscription.id}`);
}

// Manejar evento de suscripción actualizada
async function handleSubscriptionUpdated(subscription) {
  // Implementar según sea necesario para suscripciones recurrentes
  console.log(`Suscripción actualizada: ${subscription.id}`);
}

// Manejar evento de suscripción eliminada
async function handleSubscriptionDeleted(subscription) {
  // Implementar según sea necesario para suscripciones recurrentes
  console.log(`Suscripción eliminada: ${subscription.id}`);
}
