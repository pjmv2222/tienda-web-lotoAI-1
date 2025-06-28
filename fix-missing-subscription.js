const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Pool } = require('pg');

// Configuración de la base de datos
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'loto_ia_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
});

// Función para calcular la fecha de finalización según el plan
const calculateEndDate = (planId) => {
  const now = new Date();
  switch (planId) {
    case 'basic':
      return new Date(now.setDate(now.getDate() + 7));
    case 'monthly':
      return new Date(now.setDate(now.getDate() + 30));
    case 'pro':
      return new Date(now.setDate(now.getDate() + 365));
    default:
      return new Date(now.setDate(now.getDate() + 7));
  }
};

// Función para obtener el precio según el plan
const getPlanPrice = (planId) => {
  switch (planId) {
    case 'basic':
      return 122; // 1.22€ en céntimos
    case 'monthly':
      return 1022; // 10.22€ en céntimos
    case 'pro':
      return 12200; // 122€ en céntimos
    default:
      return 122;
  }
};

async function fixMissingSubscription(paymentIntentId) {
  try {
    console.log('Recuperando información del PaymentIntent de Stripe...');
    
    // Obtener información del PaymentIntent de Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    console.log('PaymentIntent encontrado:', {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
      metadata: paymentIntent.metadata
    });

    if (paymentIntent.status !== 'succeeded') {
      console.error('El pago no fue exitoso en Stripe');
      return;
    }

    // Extraer información del metadata
    const planId = paymentIntent.metadata.planId;
    const userId = paymentIntent.metadata.userId;

    if (!planId || !userId) {
      console.error('Faltan datos en el metadata del PaymentIntent');
      console.log('Metadata disponible:', paymentIntent.metadata);
      return;
    }

    console.log('Datos extraídos:', { planId, userId });

    // Calcular datos de la suscripción
    const amount = getPlanPrice(planId) / 100; // Convertir de céntimos a euros
    const currency = 'eur';
    const endDate = calculateEndDate(planId);

    console.log('Datos de suscripción calculados:', {
      amount,
      currency,
      endDate
    });

    // Conectar a la base de datos
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');

      // Verificar si ya existe una suscripción para este PaymentIntent
      const existingCheck = await client.query(
        'SELECT id FROM subscriptions WHERE payment_intent_id = $1',
        [paymentIntentId]
      );

      if (existingCheck.rows.length > 0) {
        console.log('Ya existe una suscripción para este PaymentIntent');
        await client.query('ROLLBACK');
        return;
      }

      // Crear la suscripción
      const subResult = await client.query(
        `INSERT INTO subscriptions (user_id, plan_type, amount, currency, status, payment_intent_id, start_date, end_date)
         VALUES ($1, $2, $3, $4, 'active', $5, CURRENT_TIMESTAMP, $6) RETURNING id`,
        [userId, planId, amount, currency, paymentIntentId, endDate]
      );
      
      const subscriptionId = subResult.rows[0].id;
      console.log('Suscripción creada con ID:', subscriptionId);

      // Crear el registro de pago
      await client.query(
        `INSERT INTO payments (user_id, subscription_id, payment_intent_id, amount, currency, status)
         VALUES ($1, $2, $3, $4, $5, 'succeeded')`,
        [userId, subscriptionId, paymentIntentId, amount, currency]
      );

      console.log('Registro de pago creado exitosamente');

      await client.query('COMMIT');
      
      console.log('✅ Suscripción reparada exitosamente!');
      console.log(`Usuario ${userId} ahora tiene acceso al plan ${planId} hasta ${endDate}`);

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Error al reparar la suscripción:', error);
  } finally {
    await pool.end();
  }
}

// Ejecutar el script con el PaymentIntent específico
const paymentIntentId = process.argv[2] || 'pi_3RegggLtOcaQbzqZ0kk0j7EQ';

console.log(`Iniciando reparación para PaymentIntent: ${paymentIntentId}`);
fixMissingSubscription(paymentIntentId); 