import { pgPool } from '../config/database';

export interface UserPrediction {
  id: number;
  user_id: number;
  game_type: string; // 'euromillon', 'bonoloto', etc.
  prediction_data: any; // JSON con números y estrellas
  created_at: Date;
  prediction_date: string; // Fecha del día (YYYY-MM-DD) para límites diarios
  subscription_plan?: string; // 'basic', 'monthly', 'pro'
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
  async create(userId: number, gameType: string, predictionData: any, subscriptionPlan?: string) {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Crear la predicción visible para el usuario
    const result = await pgPool.query(
      `INSERT INTO user_predictions (user_id, game_type, prediction_data, prediction_date, subscription_plan)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [userId, gameType, JSON.stringify(predictionData), today, subscriptionPlan]
    );
    
    return result.rows[0];
  },

  /**
   * Obtener predicciones del usuario para un juego específico
   * @param userId ID del usuario
   * @param gameType Tipo de juego
   * @param subscriptionPlan Plan de suscripción (opcional, si se especifica filtra por plan)
   */
  async getUserPredictions(userId: number, gameType: string, subscriptionPlan?: string) {
    let query = `SELECT * FROM user_predictions 
                 WHERE user_id = $1 AND game_type = $2`;
    let params = [userId, gameType];
    
    // Si se especifica un plan, filtrar por él
    if (subscriptionPlan) {
      query += ` AND subscription_plan = $3`;
      params.push(subscriptionPlan);
    }
    
    query += ` ORDER BY created_at DESC`;
    
    const result = await pgPool.query(query, params);
    return result.rows;
  },

  /**
   * Obtener todas las predicciones del usuario (para historial completo)
   */
  async getAllUserPredictions(userId: number) {
    const result = await pgPool.query(
      `SELECT * FROM user_predictions 
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );
    return result.rows;
  },

  /**
   * Contar predicciones del usuario para un juego específico calculado dinámicamente
   * @param userId ID del usuario
   * @param gameType Tipo de juego
   * @param subscriptionPlan Plan de suscripción (opcional, si se especifica filtra por plan)
   */
  async countUserPredictions(userId: number, gameType: string, subscriptionPlan?: string) {
    let query = `SELECT COUNT(*) as count 
                 FROM user_predictions 
                 WHERE user_id = $1 AND game_type = $2`;
    let params = [userId, gameType];
    
    // Si se especifica un plan, filtrar por él
    if (subscriptionPlan) {
      query += ` AND subscription_plan = $3`;
      params.push(subscriptionPlan);
    }
    
    const result = await pgPool.query(query, params);
    return parseInt(result.rows[0]?.count || '0');
  },

  /**
   * Obtener conteos de todas las predicciones del usuario calculados dinámicamente
   */
  async getAllUserPredictionCounts(userId: number) {
    console.log(`[DEBUG] getAllUserPredictionCounts - Consultando predicciones para userId: ${userId}`);
    
    // Calcular dinámicamente desde user_predictions
    const result = await pgPool.query(
      `SELECT 
        game_type, 
        COUNT(*) as count 
       FROM user_predictions 
       WHERE user_id = $1
       GROUP BY game_type`,
      [userId]
    );
    
    console.log(`[DEBUG] getAllUserPredictionCounts - Resultado de consulta:`, result.rows);
    console.log(`[DEBUG] getAllUserPredictionCounts - Número de filas encontradas: ${result.rows.length}`);
    
    return result.rows;
  },

  /**
   * Obtener conteos de predicciones por plan específico
   */
  async getPredictionCountsByPlan(userId: number, subscriptionPlan: string) {
    console.log(`[DEBUG] getPredictionCountsByPlan - Consultando predicciones para userId: ${userId}, plan: ${subscriptionPlan}`);
    
    const result = await pgPool.query(
      `SELECT 
        game_type, 
        COUNT(*) as count 
       FROM user_predictions 
       WHERE user_id = $1 AND subscription_plan = $2
       GROUP BY game_type`,
      [userId, subscriptionPlan]
    );
    
    console.log(`[DEBUG] getPredictionCountsByPlan - Resultado de consulta:`, result.rows);
    
    return result.rows;
  },

  /**
   * Eliminar todas las predicciones de un usuario para un juego
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
      // Plan mensual: ILIMITADAS predicciones durante 30 días
      'euromillon': 999999,
      'bonoloto': 999999,
      'primitiva': 999999,
      'elgordo': 999999,
      'eurodreams': 999999,
      'loterianacional': 999999,
      'lototurf': 999999
    },
    'pro': {
      // Plan pro: ILIMITADAS predicciones durante 365 días
      'euromillon': 999999,
      'bonoloto': 999999,
      'primitiva': 999999,
      'elgordo': 999999,
      'eurodreams': 999999,
      'loterianacional': 999999,
      'lototurf': 999999
    }
  };

  // Verificar si el plan existe en el objeto limits
  if (planType in limits) {
    return limits[planType];
  }
  
  // Si no existe, devolver limits básicos por defecto
  return limits['basic'];
} 