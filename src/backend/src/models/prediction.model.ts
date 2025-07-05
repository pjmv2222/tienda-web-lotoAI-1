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

export const PredictionModel = {
  /**
   * Crear nueva predicción
   */
  async create(userId: number, gameType: string, predictionData: any) {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    const result = await pgPool.query(
      `INSERT INTO user_predictions (user_id, game_type, prediction_data, prediction_date)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, gameType, JSON.stringify(predictionData), today]
    );
    return result.rows[0];
  },

  /**
   * Obtener predicciones del usuario para un juego específico y fecha
   */
  async getUserPredictions(userId: number, gameType: string, date?: string) {
    const targetDate = date || new Date().toISOString().split('T')[0];
    
    const result = await pgPool.query(
      `SELECT * FROM user_predictions 
       WHERE user_id = $1 AND game_type = $2 AND prediction_date = $3
       ORDER BY created_at DESC`,
      [userId, gameType, targetDate]
    );
    return result.rows;
  },

  /**
   * Contar predicciones del usuario para un juego y fecha específica
   */
  async countUserPredictions(userId: number, gameType: string, date?: string) {
    const targetDate = date || new Date().toISOString().split('T')[0];
    
    const result = await pgPool.query(
      `SELECT COUNT(*) as count 
       FROM user_predictions 
       WHERE user_id = $1 AND game_type = $2 AND prediction_date = $3`,
      [userId, gameType, targetDate]
    );
    return parseInt(result.rows[0].count);
  },

  /**
   * Obtener conteos de todas las predicciones del usuario para hoy
   */
  async getAllUserPredictionCounts(userId: number, date?: string) {
    const targetDate = date || new Date().toISOString().split('T')[0];
    
    const result = await pgPool.query(
      `SELECT game_type, COUNT(*) as count 
       FROM user_predictions 
       WHERE user_id = $1 AND prediction_date = $2
       GROUP BY game_type`,
      [userId, targetDate]
    );
    return result.rows;
  },

  /**
   * Eliminar todas las predicciones de un usuario para un juego y fecha
   */
  async clearUserPredictions(userId: number, gameType: string, date?: string) {
    const targetDate = date || new Date().toISOString().split('T')[0];
    
    const result = await pgPool.query(
      `DELETE FROM user_predictions 
       WHERE user_id = $1 AND game_type = $2 AND prediction_date = $3
       RETURNING *`,
      [userId, gameType, targetDate]
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