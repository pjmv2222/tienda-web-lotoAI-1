import { Request, Response } from 'express';
import Stripe from 'stripe';
import * as PayPalService from '../services/paypal.service';

// Inicializar Stripe con la clave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  // Usar la versión de la API desde los tipos de Stripe para evitar errores de compilación
  apiVersion: '2025-03-31.basil' as Stripe.LatestApiVersion,
});

// Obtener el precio según el plan
const getPlanPrice = (planId: string): number => {
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

/**
 * Crear un PaymentIntent de Stripe
 */
export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount, planId, userId } = req.body;

    if (!planId) {
      return res.status(400).json({ error: 'Se requiere el ID del plan' });
    }

    // Usar el monto proporcionado o calcular basado en el planId
    const finalAmount = amount || getPlanPrice(planId);

    // Crear el PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalAmount,
      currency: 'eur',
      metadata: {
        planId,
        userId: userId || 'guest'
      }
    });

    // Guardar el registro de pago en la base de datos (si tienes un modelo)
    // const payment = new Payment({...});
    // await payment.save();

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id
    });
  } catch (error: any) {
    console.error('Error al crear PaymentIntent:', error);
    res.status(500).json({ error: 'Error al procesar el pago' });
  }
};

/**
 * Confirmar un pago
 */
export const confirmPayment = async (req: Request, res: Response) => {
  try {
    const { paymentIntentId, userId, planId } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({ error: 'Se requiere el ID del PaymentIntent' });
    }

    // Recuperar el PaymentIntent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({
        success: false,
        error: 'El pago no ha sido completado correctamente'
      });
    }

    // Actualizar el registro de pago en la base de datos (si tienes un modelo)
    // const payment = await Payment.findOne({ stripePaymentIntentId: paymentIntentId });
    // if (payment) {
    //   payment.status = 'succeeded';
    //   await payment.save();
    // }

    // Crear una suscripción (si corresponde)
    // const subscription = new Subscription({...});
    // await subscription.save();

    res.status(200).json({
      success: true,
      paymentIntent: {
        id: paymentIntent.id,
        status: paymentIntent.status
      }
    });
  } catch (error: any) {
    console.error('Error al confirmar el pago:', error);
    res.status(500).json({ error: 'Error al confirmar el pago' });
  }
};

/**
 * Procesar un pago por transferencia
 */
export const processTransferPayment = async (req: Request, res: Response) => {
  try {
    const { userId, planId, referenceNumber } = req.body;

    if (!planId) {
      return res.status(400).json({ error: 'Se requiere el ID del plan' });
    }

    // Obtener el precio del plan
    const amount = getPlanPrice(planId) / 100; // Convertir de céntimos a euros

    // Crear el registro de pago en la base de datos (si tienes un modelo)
    // const payment = new Payment({...});
    // await payment.save();

    // Crear la suscripción (en estado pendiente)
    // const subscription = new Subscription({...});
    // await subscription.save();

    res.status(200).json({
      success: true,
      payment: {
        referenceNumber,
        status: 'pending'
      }
    });
  } catch (error: any) {
    console.error('Error al procesar el pago por transferencia:', error);
    res.status(500).json({ error: 'Error al procesar el pago por transferencia' });
  }
};

/**
 * Crear una orden de pago con PayPal
 */
export const createPayPalOrder = async (req: Request, res: Response) => {
  try {
    const { planId } = req.body;

    if (!planId) {
      return res.status(400).json({ error: 'Se requiere el ID del plan' });
    }

    // Obtener el precio del plan
    const amount = getPlanPrice(planId) / 100; // Convertir de céntimos a euros

    // Crear la descripción del plan
    let planName = 'Plan Básico';
    if (planId === 'monthly') planName = 'Plan Mensual';
    if (planId === 'pro') planName = 'Plan Pro';

    // Crear la orden en PayPal
    const order = await PayPalService.createOrder(
      amount,
      'EUR',
      `LotoIA - ${planName}`
    );

    res.status(200).json({
      success: true,
      orderId: order.id,
      approvalUrl: order.links.find((link: any) => link.rel === 'approve').href
    });
  } catch (error: any) {
    console.error('Error al crear la orden de PayPal:', error);
    res.status(500).json({ error: 'Error al crear la orden de PayPal' });
  }
};

/**
 * Procesar un pago con PayPal
 */
export const processPayPalPayment = async (req: Request, res: Response) => {
  try {
    const { userId, planId, paypalOrderId } = req.body;

    if (!planId || !paypalOrderId) {
      return res.status(400).json({ error: 'Se requieren el ID del plan y el ID de la orden de PayPal' });
    }

    // Verificar el estado de la orden
    const orderDetails = await PayPalService.getOrderDetails(paypalOrderId);

    if (orderDetails.status !== 'COMPLETED') {
      // Capturar la orden si aún no está completada
      const captureResult = await PayPalService.captureOrder(paypalOrderId);

      if (captureResult.status !== 'COMPLETED') {
        return res.status(400).json({
          success: false,
          error: 'No se pudo completar el pago con PayPal'
        });
      }
    }

    // Obtener el precio del plan
    const amount = getPlanPrice(planId) / 100; // Convertir de céntimos a euros

    // Crear el registro de pago en la base de datos (si tienes un modelo)
    // const payment = new Payment({...});
    // await payment.save();

    // Crear la suscripción
    // const subscription = new Subscription({...});
    // await subscription.save();

    res.status(200).json({
      success: true,
      payment: {
        status: 'succeeded',
        orderId: paypalOrderId
      }
    });
  } catch (error: any) {
    console.error('Error al procesar el pago con PayPal:', error);
    res.status(500).json({ error: 'Error al procesar el pago con PayPal' });
  }
};
