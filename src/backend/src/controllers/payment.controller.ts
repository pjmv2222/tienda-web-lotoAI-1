import { Request, Response } from 'express';
import Stripe from 'stripe';
import * as PayPalService from '../services/paypal.service';
import { pgPool } from '../config/database';

// Inicializar Stripe
const stripe = new Stripe(process.env['STRIPE_SECRET_KEY'] || '', {
  apiVersion: '2025-05-28.basil',
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
    const { amount, currency, plan, userId } = req.body;
    if (!amount || !currency || !plan || !userId) {
      return res.status(400).json({ error: 'Faltan parámetros requeridos' });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: currency,
      metadata: { plan, userId },
    });
    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error('Error al crear el PaymentIntent:', error);
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Confirmar un pago
 */
export const confirmPayment = async (req: Request, res: Response) => {
  try {
    const { paymentIntentId, userId, planType, endDate, amount, currency } = req.body;
    const client = await pgPool.connect();
    try {
      await client.query('BEGIN');
      const subResult = await client.query(
        `INSERT INTO subscriptions (user_id, plan_type, amount, currency, status, payment_intent_id, start_date, end_date)
         VALUES ($1, $2, $3, $4, 'active', $5, CURRENT_TIMESTAMP, $6) RETURNING id`,
        [userId, planType, amount, currency, paymentIntentId, endDate]
      );
      const subscriptionId = subResult.rows[0].id;
      await client.query(
        `INSERT INTO payments (user_id, subscription_id, payment_intent_id, amount, currency, status)
         VALUES ($1, $2, $3, $4, $5, 'succeeded')`,
        [userId, subscriptionId, paymentIntentId, amount, currency]
      );
      await client.query('COMMIT');
      return res.status(200).json({ success: true, message: 'Pago confirmado y suscripción creada.' });
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  } catch (error: any) {
    console.error('Error al confirmar el pago:', error);
    return res.status(500).json({ error: error.message });
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

    return res.status(200).json({
      success: true,
      payment: {
        referenceNumber,
        status: 'pending'
      }
    });
  } catch (error: any) {
    console.error('Error al procesar el pago por transferencia:', error);
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Crear una orden de pago con PayPal
 */
export const createPayPalOrder = async (req: Request, res: Response) => {
  try {
    const { amount, description } = req.body;
    if (!amount || !description) {
      return res.status(400).json({ error: 'Amount and description are required' });
    }
    const order = await PayPalService.createOrder(amount, 'EUR', description);
    return res.status(201).json(order);
  } catch (error: any) {
    console.error('Error creating PayPal order:', error);
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Procesar un pago con PayPal
 */
export const processPayPalPayment = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required' });
    }
    const capture = await PayPalService.captureOrder(orderId);
    return res.status(200).json(capture);
  } catch (error: any) {
    console.error('Error processing PayPal payment:', error);
    return res.status(500).json({ error: error.message });
  }
};
