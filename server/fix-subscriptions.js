// Script para verificar y corregir el estado de las suscripciones
const { Pool } = require('pg');
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();

// Configuración de la conexión a PostgreSQL
const pgPool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
});

// Importar modelos de MongoDB
const Subscription = require('./models/subscription.model');
const Payment = require('./models/payment.model');

async function fixSubscriptions() {
  console.log('Iniciando verificación de suscripciones...');
  
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');
    
    // Verificar si hay conexión a PostgreSQL
    if (process.env.USE_POSTGRES === 'true') {
      await pgPool.query('SELECT NOW()');
      console.log('Conectado a PostgreSQL');
      
      // Verificar y corregir suscripciones en PostgreSQL
      await fixPostgresSubscriptions();
    } else {
      // Verificar y corregir suscripciones en MongoDB
      await fixMongoSubscriptions();
    }
    
    console.log('Verificación de suscripciones completada');
  } catch (error) {
    console.error('Error al verificar suscripciones:', error);
  } finally {
    // Cerrar conexiones
    await mongoose.connection.close();
    await pgPool.end();
  }
}

async function fixMongoSubscriptions() {
  try {
    console.log('Verificando suscripciones en MongoDB...');
    
    // Obtener pagos exitosos con suscripciones pendientes
    const paymentsWithPendingSubscriptions = await Payment.find({
      status: 'succeeded',
      subscriptionId: { $exists: true }
    }).populate('subscriptionId');
    
    console.log(`Se encontraron ${paymentsWithPendingSubscriptions.length} pagos exitosos con suscripciones`);
    
    // Actualizar suscripciones pendientes a activas
    for (const payment of paymentsWithPendingSubscriptions) {
      if (payment.subscriptionId && payment.subscriptionId.status === 'pending') {
        console.log(`Actualizando suscripción ${payment.subscriptionId._id} a activa`);
        
        await Subscription.updateOne(
          { _id: payment.subscriptionId._id },
          { $set: { status: 'active', updatedAt: new Date() } }
        );
      }
    }
    
    // Verificar con Stripe los pagos exitosos que no tienen suscripción activa
    const successfulPaymentsWithoutSubscription = await Payment.find({
      status: 'succeeded',
      subscriptionId: { $exists: false },
      stripePaymentIntentId: { $exists: true, $ne: null }
    });
    
    console.log(`Se encontraron ${successfulPaymentsWithoutSubscription.length} pagos exitosos sin suscripción`);
    
    for (const payment of successfulPaymentsWithoutSubscription) {
      try {
        // Verificar el estado del pago en Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(payment.stripePaymentIntentId);
        
        if (paymentIntent.status === 'succeeded') {
          console.log(`Pago verificado en Stripe: ${payment._id}`);
          
          // Obtener la información del plan de la metadata del pago
          const planId = payment.metadata?.planId || 'basic';
          
          // Calcular la fecha de finalización según el plan
          const now = new Date();
          let endDate;
          
          switch (planId) {
            case 'monthly':
              endDate = new Date(now.setDate(now.getDate() + 30));
              break;
            case 'pro':
              endDate = new Date(now.setDate(now.getDate() + 365));
              break;
            default: // basic
              endDate = new Date(now.setDate(now.getDate() + 7));
          }
          
          // Crear una nueva suscripción
          const newSubscription = new Subscription({
            userId: payment.userId,
            planId,
            status: 'active',
            startDate: payment.createdAt || new Date(),
            endDate,
            stripePaymentIntentId: payment.stripePaymentIntentId,
            paymentMethod: payment.paymentMethod,
            amount: payment.amount,
            currency: payment.currency
          });
          
          await newSubscription.save();
          console.log(`Nueva suscripción creada: ${newSubscription._id}`);
          
          // Actualizar el pago con la referencia a la suscripción
          payment.subscriptionId = newSubscription._id;
          await payment.save();
        }
      } catch (error) {
        console.error(`Error al verificar pago ${payment._id} en Stripe:`, error);
      }
    }
    
    console.log('Verificación de suscripciones en MongoDB completada');
  } catch (error) {
    console.error('Error al verificar suscripciones en MongoDB:', error);
  }
}

async function fixPostgresSubscriptions() {
  const client = await pgPool.connect();
  
  try {
    console.log('Verificando suscripciones en PostgreSQL...');
    
    // Obtener pagos exitosos con suscripciones pendientes
    const pendingResult = await client.query(`
      SELECT p.id as payment_id, s.id as subscription_id, s.user_id, s.plan_id, s.stripe_payment_intent_id
      FROM payments p
      JOIN subscriptions s ON p.subscription_id = s.id
      WHERE p.status = 'succeeded'
      AND s.status = 'pending'
    `);
    
    console.log(`Se encontraron ${pendingResult.rows.length} pagos exitosos con suscripciones pendientes`);
    
    // Actualizar suscripciones pendientes a activas
    for (const row of pendingResult.rows) {
      console.log(`Actualizando suscripción ${row.subscription_id} a activa`);
      
      await client.query(
        'UPDATE subscriptions SET status = $1, updated_at = NOW() WHERE id = $2',
        ['active', row.subscription_id]
      );
    }
    
    // Verificar con Stripe los pagos exitosos que no tienen suscripción
    const noSubscriptionResult = await client.query(`
      SELECT p.id as payment_id, p.user_id, p.stripe_payment_intent_id, p.amount, p.currency, 
             p.payment_method, p.created_at, p.metadata
      FROM payments p
      LEFT JOIN subscriptions s ON p.subscription_id = s.id
      WHERE p.status = 'succeeded'
      AND p.stripe_payment_intent_id IS NOT NULL
      AND p.subscription_id IS NULL
    `);
    
    console.log(`Se encontraron ${noSubscriptionResult.rows.length} pagos exitosos sin suscripción`);
    
    for (const row of noSubscriptionResult.rows) {
      try {
        if (!row.stripe_payment_intent_id) continue;
        
        // Verificar el estado del pago en Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(row.stripe_payment_intent_id);
        
        if (paymentIntent.status === 'succeeded') {
          console.log(`Pago verificado en Stripe: ${row.payment_id}`);
          
          // Obtener la información del plan de la metadata del pago
          const metadata = row.metadata || {};
          const planId = metadata.planId || 'basic';
          
          // Calcular la fecha de finalización según el plan
          const now = new Date();
          let endDate;
          
          switch (planId) {
            case 'monthly':
              endDate = new Date(now.setDate(now.getDate() + 30));
              break;
            case 'pro':
              endDate = new Date(now.setDate(now.getDate() + 365));
              break;
            default: // basic
              endDate = new Date(now.setDate(now.getDate() + 7));
          }
          
          // Crear una nueva suscripción
          const subscriptionResult = await client.query(
            `INSERT INTO subscriptions
            (user_id, plan_id, status, start_date, end_date, stripe_payment_intent_id,
             payment_method, amount, currency, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
            RETURNING id`,
            [
              row.user_id,
              planId,
              'active',
              row.created_at,
              endDate,
              row.stripe_payment_intent_id,
              row.payment_method,
              row.amount,
              row.currency,
              row.created_at
            ]
          );
          
          const subscriptionId = subscriptionResult.rows[0].id;
          console.log(`Nueva suscripción creada: ${subscriptionId}`);
          
          // Actualizar el pago con la referencia a la suscripción
          await client.query(
            'UPDATE payments SET subscription_id = $1 WHERE id = $2',
            [subscriptionId, row.payment_id]
          );
        }
      } catch (error) {
        console.error(`Error al verificar pago ${row.payment_id} en Stripe:`, error);
      }
    }
    
    // Verificar específicamente el usuario mencionado
    // Si tienes algún usuario específico que reportó el problema, puedes buscarlo aquí
    
    console.log('Verificación de suscripciones en PostgreSQL completada');
  } catch (error) {
    console.error('Error al verificar suscripciones en PostgreSQL:', error);
  } finally {
    client.release();
  }
}

// Ejecutar el script
fixSubscriptions()
  .then(() => {
    console.log('Script completado con éxito');
    process.exit(0);
  })
  .catch(error => {
    console.error('Error al ejecutar el script:', error);
    process.exit(1);
  });
