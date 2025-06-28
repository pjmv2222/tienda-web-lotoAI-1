import { Request, Response } from 'express';
import { pgPool } from '../config/database';
import { 
  Subscription, 
  CreateSubscriptionData, 
  SubscriptionStatus,
  PlanType 
} from '../models/subscription.model';

export class SubscriptionController {
  
  // Obtener todas las suscripciones de un usuario
  async getUserSubscriptions(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      
      if (!userId) {
        res.status(400).json({ error: 'Se requiere el ID del usuario' });
        return;
      }

      const result = await pgPool.query(
        'SELECT * FROM subscriptions WHERE user_id = $1 ORDER BY created_at DESC',
        [userId]
      );

      res.status(200).json({
        success: true,
        subscriptions: result.rows
      });
    } catch (error) {
      console.error('Error al obtener las suscripciones:', error);
      res.status(500).json({ error: 'Error al obtener las suscripciones' });
    }
  }

  // Obtener una suscripción por ID
  async getSubscriptionById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      if (!id) {
        res.status(400).json({ error: 'Se requiere el ID de la suscripción' });
        return;
      }

      const result = await pgPool.query(
        'SELECT * FROM subscriptions WHERE id = $1',
        [id]
      );

      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Suscripción no encontrada' });
        return;
      }

      res.status(200).json({
        success: true,
        subscription: result.rows[0]
      });
    } catch (error) {
      console.error('Error al obtener la suscripción:', error);
      res.status(500).json({ error: 'Error al obtener la suscripción' });
    }
  }

  // Cancelar una suscripción
  async cancelSubscription(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      if (!id) {
        res.status(400).json({ error: 'Se requiere el ID de la suscripción' });
        return;
      }

      const result = await pgPool.query(
        'UPDATE subscriptions SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
        [SubscriptionStatus.CANCELED, id]
      );

      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Suscripción no encontrada' });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Suscripción cancelada correctamente',
        subscription: result.rows[0]
      });
    } catch (error) {
      console.error('Error al cancelar la suscripción:', error);
      res.status(500).json({ error: 'Error al cancelar la suscripción' });
    }
  }

  // Verificar si un usuario tiene una suscripción activa
  async checkActiveSubscription(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      
      if (!userId) {
        res.status(400).json({ error: 'Se requiere el ID del usuario' });
        return;
      }

      const now = new Date();
      
      const result = await pgPool.query(
        `SELECT * FROM subscriptions 
         WHERE user_id = $1 
         AND status = $2 
         AND end_date > $3 
         ORDER BY end_date DESC 
         LIMIT 1`,
        [userId, SubscriptionStatus.ACTIVE, now]
      );

      if (result.rows.length === 0) {
        res.status(200).json({
          success: true,
          hasActiveSubscription: false,
          message: 'No se encontró ninguna suscripción activa'
        });
        return;
      }

      res.status(200).json({
        success: true,
        hasActiveSubscription: true,
        subscription: result.rows[0]
      });
    } catch (error) {
      console.error('Error al verificar la suscripción activa:', error);
      res.status(500).json({ error: 'Error al verificar la suscripción activa' });
    }
  }

  // Crear nueva suscripción
  async createSubscription(req: Request, res: Response): Promise<void> {
    try {
      const {
        user_id,
        plan_type,
        amount,
        currency = 'EUR',
        payment_intent_id,
        end_date
      }: CreateSubscriptionData = req.body;

      if (!user_id || !plan_type || !amount || !end_date) {
        res.status(400).json({ 
          error: 'Se requieren user_id, plan_type, amount y end_date' 
        });
        return;
      }

      const result = await pgPool.query(
        `INSERT INTO subscriptions 
         (user_id, plan_type, amount, currency, payment_intent_id, end_date) 
         VALUES ($1, $2, $3, $4, $5, $6) 
         RETURNING *`,
        [user_id, plan_type, amount, currency, payment_intent_id, end_date]
      );

      res.status(201).json({
        success: true,
        message: 'Suscripción creada correctamente',
        subscription: result.rows[0]
      });
    } catch (error) {
      console.error('Error al crear la suscripción:', error);
      res.status(500).json({ error: 'Error al crear la suscripción' });
    }
  }

  // Obtener información de precios de planes
  async getPlanPrices(req: Request, res: Response): Promise<void> {
    try {
      const planPrices = {
        [PlanType.BASIC]: { amount: 1.22, duration: 'combinaciones', description: 'Plan Básico - 3 combinaciones por cada uno de los 7 juegos (21 total)' },
        [PlanType.MONTHLY]: { amount: 10.22, duration: 30, description: 'Plan Mensual - 30 días ilimitado' },
        [PlanType.PRO]: { amount: 122.00, duration: 365, description: 'Plan Pro - 365 días ilimitado' }
      };

      res.status(200).json({
        success: true,
        plans: planPrices
      });
    } catch (error) {
      console.error('Error al obtener precios de planes:', error);
      res.status(500).json({ error: 'Error al obtener precios de planes' });
    }
  }
}
