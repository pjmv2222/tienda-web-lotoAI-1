const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/payment.model');
const Subscription = require('../models/subscription.model');

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

    // Guardar el registro de pago en la base de datos
    const payment = new Payment({
      userId: actualUserId || '000000000000000000000000', // ID temporal para usuarios no autenticados
      amount: finalAmount / 100, // Convertir de céntimos a euros
      currency: finalCurrency,
      status: 'pending',
      paymentMethod: 'card',
      stripePaymentIntentId: paymentIntent.id,
      metadata: {
        planId: actualPlanId
      }
    });

    await payment.save();

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

    // Actualizar el registro de pago
    const payment = await Payment.findOne({ stripePaymentIntentId: paymentIntentId });

    if (!payment) {
      return res.status(404).json({ error: 'Pago no encontrado' });
    }

    payment.status = 'succeeded';
    payment.userId = userId || payment.userId;
    await payment.save();

    // Crear la suscripción
    const endDate = calculateEndDate(planId || payment.metadata.planId);

    const subscription = new Subscription({
      userId: userId || payment.userId,
      planId: planId || payment.metadata.planId,
      status: 'active',
      endDate,
      stripePaymentIntentId: paymentIntentId,
      paymentMethod: 'card',
      amount: payment.amount
    });

    await subscription.save();

    // Actualizar el pago con la referencia a la suscripción
    payment.subscriptionId = subscription._id;
    await payment.save();

    res.status(200).json({
      success: true,
      subscription: {
        id: subscription._id,
        planId: subscription.planId,
        status: subscription.status,
        endDate: subscription.endDate
      }
    });
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

    // Crear el registro de pago
    const payment = new Payment({
      userId: userId || '000000000000000000000000', // ID temporal para usuarios no autenticados
      amount,
      currency: 'eur',
      status: 'pending',
      paymentMethod: 'transfer',
      referenceNumber,
      metadata: {
        planId
      }
    });

    await payment.save();

    // Crear la suscripción (en estado pendiente)
    const endDate = calculateEndDate(planId);

    const subscription = new Subscription({
      userId: userId || '000000000000000000000000',
      planId,
      status: 'pending',
      endDate,
      paymentMethod: 'transfer',
      amount
    });

    await subscription.save();

    // Actualizar el pago con la referencia a la suscripción
    payment.subscriptionId = subscription._id;
    await payment.save();

    res.status(200).json({
      success: true,
      payment: {
        id: payment._id,
        referenceNumber: payment.referenceNumber,
        status: payment.status
      },
      subscription: {
        id: subscription._id,
        planId: subscription.planId,
        status: subscription.status,
        endDate: subscription.endDate
      }
    });
  } catch (error) {
    console.error('Error al procesar el pago por transferencia:', error);
    res.status(500).json({ error: 'Error al procesar el pago por transferencia' });
  }
};

// Procesar un pago con PayPal
exports.processPayPalPayment = async (req, res) => {
  try {
    const { userId, planId, paypalOrderId } = req.body;

    if (!planId || !paypalOrderId) {
      return res.status(400).json({ error: 'Se requieren el ID del plan y el ID de la orden de PayPal' });
    }

    // Obtener el precio del plan
    const amount = getPlanPrice(planId) / 100; // Convertir de céntimos a euros

    // Crear el registro de pago
    const payment = new Payment({
      userId: userId || '000000000000000000000000', // ID temporal para usuarios no autenticados
      amount,
      currency: 'eur',
      status: 'succeeded', // Asumimos que el pago ya fue verificado por PayPal
      paymentMethod: 'paypal',
      metadata: {
        planId,
        paypalOrderId
      }
    });

    await payment.save();

    // Crear la suscripción
    const endDate = calculateEndDate(planId);

    const subscription = new Subscription({
      userId: userId || '000000000000000000000000',
      planId,
      status: 'active',
      endDate,
      paymentMethod: 'paypal',
      amount
    });

    await subscription.save();

    // Actualizar el pago con la referencia a la suscripción
    payment.subscriptionId = subscription._id;
    await payment.save();

    res.status(200).json({
      success: true,
      payment: {
        id: payment._id,
        status: payment.status
      },
      subscription: {
        id: subscription._id,
        planId: subscription.planId,
        status: subscription.status,
        endDate: subscription.endDate
      }
    });
  } catch (error) {
    console.error('Error al procesar el pago con PayPal:', error);
    res.status(500).json({ error: 'Error al procesar el pago con PayPal' });
  }
};

// Verificar si un usuario tiene pagos recientes (menos de 24 horas)
exports.checkRecentPayments = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'Se requiere el ID del usuario' });
    }

    // Calcular la fecha de hace 24 horas
    const oneDayAgo = new Date();
    oneDayAgo.setHours(oneDayAgo.getHours() - 24);

    // Buscar pagos exitosos en las últimas 24 horas
    const recentPayments = await Payment.find({
      userId,
      status: 'succeeded',
      createdAt: { $gte: oneDayAgo }
    }).sort({ createdAt: -1 });

    // Verificar si hay pagos recientes
    const hasRecentPayment = recentPayments.length > 0;

    // Si hay pagos recientes pero no hay suscripciones activas, crear una suscripción
    if (hasRecentPayment) {
      // Verificar si ya existe una suscripción activa
      const now = new Date();
      const activeSubscription = await Subscription.findOne({
        userId,
        status: 'active',
        endDate: { $gt: now }
      });

      // Si no hay suscripción activa, crear una basada en el pago más reciente
      if (!activeSubscription) {
        const latestPayment = recentPayments[0];
        const planId = latestPayment.metadata?.planId || 'basic';

        // Crear la suscripción
        const endDate = calculateEndDate(planId);

        const subscription = new Subscription({
          userId,
          planId,
          status: 'active',
          endDate,
          paymentMethod: latestPayment.paymentMethod,
          amount: latestPayment.amount
        });

        await subscription.save();

        // Actualizar el pago con la referencia a la suscripción
        latestPayment.subscriptionId = subscription._id;
        await latestPayment.save();

        console.log(`Suscripción creada automáticamente para el usuario ${userId} basada en un pago reciente`);
      }
    }

    res.status(200).json({
      success: true,
      hasRecentPayment,
      payments: hasRecentPayment ? recentPayments.map(p => ({
        id: p._id,
        amount: p.amount,
        status: p.status,
        paymentMethod: p.paymentMethod,
        createdAt: p.createdAt
      })) : []
    });
  } catch (error) {
    console.error('Error al verificar pagos recientes:', error);
    res.status(500).json({ error: 'Error al verificar pagos recientes' });
  }
};
