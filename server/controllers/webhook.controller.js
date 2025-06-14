const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/payment.model');
const Subscription = require('../models/subscription.model');

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
    // Buscar el pago en la base de datos
    const payment = await Payment.findOne({ stripePaymentIntentId: paymentIntent.id });
    
    if (!payment) {
      console.log(`Pago no encontrado para PaymentIntent: ${paymentIntent.id}`);
      return;
    }
    
    // Actualizar el estado del pago
    payment.status = 'succeeded';
    payment.stripeChargeId = paymentIntent.latest_charge;
    await payment.save();
    
    // Si hay una suscripción asociada, actualizarla
    if (payment.subscriptionId) {
      const subscription = await Subscription.findById(payment.subscriptionId);
      
      if (subscription) {
        subscription.status = 'active';
        await subscription.save();
      }
    }
    
    console.log(`Pago actualizado correctamente: ${payment._id}`);
  } catch (error) {
    console.error('Error al manejar payment_intent.succeeded:', error);
    throw error;
  }
}

// Manejar evento de pago fallido
async function handlePaymentIntentFailed(paymentIntent) {
  try {
    // Buscar el pago en la base de datos
    const payment = await Payment.findOne({ stripePaymentIntentId: paymentIntent.id });
    
    if (!payment) {
      console.log(`Pago no encontrado para PaymentIntent: ${paymentIntent.id}`);
      return;
    }
    
    // Actualizar el estado del pago
    payment.status = 'failed';
    await payment.save();
    
    // Si hay una suscripción asociada, actualizarla
    if (payment.subscriptionId) {
      const subscription = await Subscription.findById(payment.subscriptionId);
      
      if (subscription) {
        subscription.status = 'canceled';
        await subscription.save();
      }
    }
    
    console.log(`Pago marcado como fallido: ${payment._id}`);
  } catch (error) {
    console.error('Error al manejar payment_intent.payment_failed:', error);
    throw error;
  }
}

// Manejar evento de reembolso
async function handleChargeRefunded(charge) {
  try {
    // Buscar el pago en la base de datos
    const payment = await Payment.findOne({ stripeChargeId: charge.id });
    
    if (!payment) {
      console.log(`Pago no encontrado para Charge: ${charge.id}`);
      return;
    }
    
    // Actualizar el estado del pago
    payment.status = 'refunded';
    await payment.save();
    
    // Si hay una suscripción asociada, actualizarla
    if (payment.subscriptionId) {
      const subscription = await Subscription.findById(payment.subscriptionId);
      
      if (subscription) {
        subscription.status = 'canceled';
        await subscription.save();
      }
    }
    
    console.log(`Pago marcado como reembolsado: ${payment._id}`);
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
