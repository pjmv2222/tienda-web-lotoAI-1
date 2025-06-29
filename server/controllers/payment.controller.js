const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Calcular la fecha de finalización según el plan
const calculateEndDate = (planId) => {
  const now = new Date();

  switch (planId) {
    case 'basic':
      // Plan básico: válido para el sorteo inmediato (7 días)
      return new Date(now.setDate(now.getDate() + 7));
    case 'monthly':
      // Plan mensual: válido por 30 días
      return new Date(now.setDate(now.getDate() + 30));
    case 'pro':
      // Plan pro: válido por 365 días
      return new Date(now.setDate(now.getDate() + 365));
    default:
      return new Date(now.setDate(now.getDate() + 7));
  }
};

// Obtener el precio según el plan
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

// Crear un PaymentIntent de Stripe
exports.createPaymentIntent = async (req, res) => {
  try {
    // Compatibilidad con ambos formatos: frontend Angular envía {planId, amount, currency, userId}
    // y formato original {planId, userId}
    const { planId, userId, plan, amount, currency } = req.body;
    
    console.log('Datos recibidos en createPaymentIntent:', req.body);
    
    // Usar planId o plan (compatibilidad con ambos formatos)
    const actualPlanId = planId || plan;
    const actualUserId = userId;

    console.log('Creando PaymentIntent para:', { actualPlanId, actualUserId });

    if (!actualPlanId) {
      return res.status(400).json({ 
        error: 'Se requiere el ID del plan (planId o plan)',
        received: req.body,
        missingParams: ['planId']
      });
    }

    // Verificar que Stripe esté configurado
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY no está configurada');
      return res.status(500).json({ error: 'Error de configuración del servidor' });
    }

    // Obtener el precio del plan (usar amount del frontend si está disponible, sino calcular)
    const finalAmount = amount || getPlanPrice(actualPlanId);
    const finalCurrency = currency || 'eur';
    
    console.log('Precio del plan:', finalAmount, 'céntimos');

    // Crear el PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalAmount,
      currency: finalCurrency,
      metadata: {
        planId: actualPlanId,
        userId: actualUserId || 'guest'
      }
    });

    console.log('PaymentIntent creado:', paymentIntent.id);

    // Guardar el registro de pago en PostgreSQL
    const client = await req.pgPool.connect();
    try {
      const queryText = `
        INSERT INTO payments (user_id, amount, currency, status, payment_method, stripe_payment_intent_id, plan_id, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
        RETURNING *
      `;
      
      const values = [
        actualUserId || null,
        finalAmount / 100, // Convertir de céntimos a euros
        finalCurrency,
        'pending',
        'card',
        paymentIntent.id,
        actualPlanId
      ];

      const result = await client.query(queryText, values);
      console.log('Pago guardado en PostgreSQL:', result.rows[0]);
    } finally {
      client.release();
    }

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id
    });
  } catch (error) {
    console.error('Error al crear PaymentIntent:', error);
    res.status(500).json({ error: 'Error al procesar el pago' });
  }
};

// Confirmar un pago
exports.confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId, userId, planId } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({ error: 'Se requiere el ID del PaymentIntent' });
    }

    // Obtener el PaymentIntent de Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ error: 'El pago no ha sido completado' });
    }

    const client = await req.pgPool.connect();
    try {
      // Actualizar el registro de pago
      const updatePaymentQuery = `
        UPDATE payments 
        SET status = $1, user_id = COALESCE($2, user_id), updated_at = NOW()
        WHERE stripe_payment_intent_id = $3
        RETURNING *
      `;
      
      const paymentResult = await client.query(updatePaymentQuery, ['succeeded', userId, paymentIntentId]);

      if (paymentResult.rows.length === 0) {
        return res.status(404).json({ error: 'Pago no encontrado' });
      }

      const payment = paymentResult.rows[0];

      // Crear la suscripción
      const endDate = calculateEndDate(planId || payment.plan_id);

      const subscriptionQuery = `
        INSERT INTO subscriptions (user_id, plan_id, status, start_date, end_date, created_at)
        VALUES ($1, $2, $3, NOW(), $4, NOW())
        RETURNING *
      `;

      const subscriptionValues = [
        userId || payment.user_id,
        planId || payment.plan_id,
        'active',
        endDate
      ];

      const subscriptionResult = await client.query(subscriptionQuery, subscriptionValues);
      const subscription = subscriptionResult.rows[0];

      // Actualizar el pago con la referencia a la suscripción
      await client.query(
        'UPDATE payments SET subscription_id = $1, updated_at = NOW() WHERE id = $2',
        [subscription.id, payment.id]
      );

      res.status(200).json({
        success: true,
        subscription: {
          id: subscription.id,
          planId: subscription.plan_id,
          status: subscription.status,
          endDate: subscription.end_date
        }
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error al confirmar el pago:', error);
    res.status(500).json({ error: 'Error al confirmar el pago' });
  }
};

// Procesar un pago por transferencia
exports.processTransferPayment = async (req, res) => {
  try {
    const { userId, planId, referenceNumber } = req.body;

    if (!planId) {
      return res.status(400).json({ error: 'Se requiere el ID del plan' });
    }

    // Obtener el precio del plan
    const amount = getPlanPrice(planId) / 100; // Convertir de céntimos a euros

    const client = await req.pgPool.connect();
    try {
      // Crear el registro de pago
      const paymentQuery = `
        INSERT INTO payments (user_id, amount, currency, status, payment_method, reference_number, plan_id, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
        RETURNING *
      `;

      const paymentValues = [
        userId || null,
        amount,
        'eur',
        'pending',
        'transfer',
        referenceNumber,
        planId
      ];

      const paymentResult = await client.query(paymentQuery, paymentValues);
      const payment = paymentResult.rows[0];

      // Crear la suscripción (en estado pendiente)
      const endDate = calculateEndDate(planId);

      const subscriptionQuery = `
        INSERT INTO subscriptions (user_id, plan_id, status, start_date, end_date, created_at)
        VALUES ($1, $2, $3, NOW(), $4, NOW())
        RETURNING *
      `;

      const subscriptionValues = [
        userId || payment.user_id,
        planId,
        'pending',
        endDate
      ];

      const subscriptionResult = await client.query(subscriptionQuery, subscriptionValues);
      const subscription = subscriptionResult.rows[0];

      // Actualizar el pago con la referencia a la suscripción
      await client.query(
        'UPDATE payments SET subscription_id = $1, updated_at = NOW() WHERE id = $2',
        [subscription.id, payment.id]
      );

      res.status(200).json({
        success: true,
        payment: {
          id: payment.id,
          status: payment.status,
          referenceNumber: payment.reference_number
        },
        subscription: {
          id: subscription.id,
          planId: subscription.plan_id,
          status: subscription.status,
          endDate: subscription.end_date
        }
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error al procesar el pago por transferencia:', error);
    res.status(500).json({ error: 'Error al procesar el pago por transferencia' });
  }
};

// Obtener el historial de pagos de un usuario
exports.getPaymentHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'Se requiere el ID del usuario' });
    }

    const client = await req.pgPool.connect();
    try {
      const queryText = `
        SELECT * FROM payments
        WHERE user_id = $1
        ORDER BY created_at DESC
      `;

      const result = await client.query(queryText, [userId]);

      res.status(200).json({
        success: true,
        payments: result.rows
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error al obtener el historial de pagos:', error);
    res.status(500).json({ error: 'Error al obtener el historial de pagos' });
  }
};
