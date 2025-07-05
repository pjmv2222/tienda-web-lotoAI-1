import { pgPool } from '../config/database';

export interface UserPrediction {
  id: number;
  user_id: number;
  game_type: string; // 'euromillon', 'bonoloto', etc.
  prediction_data: any; // JSON con números y estrellas
  created_at: Date;
  prediction_date: string; // Fecha del día (YYYY-MM-DD) para límites diarios
}

export interface PredictionCount {
  game_type: string;
  count: number;
  max_allowed: number;
}

export interface SubscriptionPredictionLimit {
  id: number;
  user_id: number;
  game_type: string;
  subscription_id: number;
  predictions_generated: number;
  created_at: Date;
}

export const PredictionModel = {
  /**
   * Crear nueva predicción
   */
  async create(userId: number, gameType: string, predictionData: any) {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Crear la predicción visible para el usuario
    const result = await pgPool.query(
      `INSERT INTO user_predictions (user_id, game_type, prediction_data, prediction_date)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, gameType, JSON.stringify(predictionData), today]
    );
    
    // Incrementar el contador de límites del plan
    await this.incrementPlanLimit(userId, gameType);
    
    return result.rows[0];
  },

  /**
   * Incrementar el contador de límites del plan actual
   */
  async incrementPlanLimit(userId: number, gameType: string) {
    // Obtener la suscripción activa actual
    const subscriptionResult = await pgPool.query(
      `SELECT id FROM subscriptions 
       WHERE user_id = $1 AND status = 'active' AND end_date > NOW()
       ORDER BY created_at DESC LIMIT 1`,
      [userId]
    );
    
    const subscriptionId = subscriptionResult.rows[0]?.id || 0; // 0 para plan básico sin suscripción
    
    await pgPool.query(
      `INSERT INTO subscription_prediction_limits (user_id, game_type, subscription_id, predictions_generated)
       VALUES ($1, $2, $3, 1)
       ON CONFLICT (user_id, game_type, subscription_id) 
       DO UPDATE SET predictions_generated = subscription_prediction_limits.predictions_generated + 1`,
      [userId, gameType, subscriptionId]
    );
  },

  /**
   * Obtener predicciones del usuario para un juego específico
   */
  async getUserPredictions(userId: number, gameType: string) {
    const result = await pgPool.query(
      `SELECT * FROM user_predictions 
       WHERE user_id = $1 AND game_type = $2
       ORDER BY created_at DESC`,
      [userId, gameType]
    );
    return result.rows;
  },

  /**
   * Contar predicciones GENERADAS del usuario para un juego en el plan actual
   */
  async countUserPredictions(userId: number, gameType: string) {
    // Obtener la suscripción activa actual
    const subscriptionResult = await pgPool.query(
      `SELECT id FROM subscriptions 
       WHERE user_id = $1 AND status = 'active' AND end_date > NOW()
       ORDER BY created_at DESC LIMIT 1`,
      [userId]
    );
    
    const subscriptionId = subscriptionResult.rows[0]?.id || 0; // 0 para plan básico sin suscripción
    
    const result = await pgPool.query(
      `SELECT predictions_generated 
       FROM subscription_prediction_limits 
       WHERE user_id = $1 AND game_type = $2 AND subscription_id = $3`,
      [userId, gameType, subscriptionId]
    );
    return result.rows[0]?.predictions_generated || 0;
  },

  /**
   * Obtener conteos de todas las predicciones GENERADAS del usuario para el plan actual
   */
  async getAllUserPredictionCounts(userId: number) {
    // Obtener la suscripción activa actual
    const subscriptionResult = await pgPool.query(
      `SELECT id FROM subscriptions 
       WHERE user_id = $1 AND status = 'active' AND end_date > NOW()
       ORDER BY created_at DESC LIMIT 1`,
      [userId]
    );
    
    const subscriptionId = subscriptionResult.rows[0]?.id || 0; // 0 para plan básico sin suscripción
    
    const result = await pgPool.query(
      `SELECT game_type, predictions_generated as count 
       FROM subscription_prediction_limits 
       WHERE user_id = $1 AND subscription_id = $2`,
      [userId, subscriptionId]
    );
    return result.rows;
  },

  /**
   * Eliminar todas las predicciones VISIBLES de un usuario para un juego
   * (NO elimina el contador de límites del plan)
   */
  async clearUserPredictions(userId: number, gameType: string) {
    const result = await pgPool.query(
      `DELETE FROM user_predictions 
       WHERE user_id = $1 AND game_type = $2
       RETURNING *`,
      [userId, gameType]
    );
    return result.rows;
  },

  /**
   * Limpiar predicciones antiguas (más de 30 días)
   */
  async cleanOldPredictions() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const cutoffDate = thirtyDaysAgo.toISOString().split('T')[0];
    
    const result = await pgPool.query(
      `DELETE FROM user_predictions 
       WHERE prediction_date < $1`,
      [cutoffDate]
    );
    return result.rowCount;
  }
};

/**
 * Función auxiliar para obtener límites según el plan del usuario
 */
export function getPredictionLimitsByPlan(planType: string): { [key: string]: number } {
  const limits: { [key: string]: { [key: string]: number } } = {
    'basic': {
      'euromillon': 3,
      'bonoloto': 3,
      'primitiva': 3,
      'elgordo': 3,
      'eurodreams': 3,
      'loterianacional': 3,
      'lototurf': 3
    },
    'monthly': {
      'euromillon': 10,
      'bonoloto': 10,
      'primitiva': 10,
      'elgordo': 10,
      'eurodreams': 10,
      'loterianacional': 10,
      'lototurf': 10
    },
    'pro': {
      'euromillon': 20,
      'bonoloto': 20,
      'primitiva': 20,
      'elgordo': 20,
      'eurodreams': 20,
      'loterianacional': 20,
      'lototurf': 20
    }
  };

  // Verificar si el plan existe en el objeto limits
  if (planType in limits) {
    return limits[planType];
  }
  
  // Si no existe, devolver limits básicos por defecto
  return limits['basic'];
} 