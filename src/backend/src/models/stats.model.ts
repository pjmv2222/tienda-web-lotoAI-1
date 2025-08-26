import { pgPool } from '../config/database';
import crypto from 'crypto';

export class StatsModel {
  /**
   * Obtener estadísticas públicas para mostrar en la página de inicio
   */
  static async getPublicStats() {
    try {
      // Obtener total de usuarios registrados
      const usersResult = await pgPool.query('SELECT COUNT(*) as total FROM users');
      const totalUsers = parseInt(usersResult.rows[0].total);

      // Obtener total de usuarios con suscripciones activas
      const subscribersResult = await pgPool.query(`
        SELECT COUNT(DISTINCT user_id) as total 
        FROM subscriptions 
        WHERE status = 'active' 
        AND (end_date IS NULL OR end_date > NOW())
      `);
      const totalSubscribers = parseInt(subscribersResult.rows[0].total);

      // Obtener total de visitantes únicos
      const visitorsResult = await pgPool.query('SELECT total_visitors FROM site_stats ORDER BY updated_at DESC LIMIT 1');
      const totalVisitors = visitorsResult.rows.length > 0 ? parseInt(visitorsResult.rows[0].total_visitors) : 0;

      return {
        totalVisitors,
        totalUsers,
        totalSubscribers,
        lastUpdated: new Date()
      };
    } catch (error) {
      console.error('Error obteniendo estadísticas públicas:', error);
      throw error;
    }
  }

  /**
   * Registrar un nuevo visitante único
   */
  static async trackVisitor(visitorData: any) {
    try {
      // Crear hash único basado en IP + User Agent (para identificar visitantes únicos)
      const visitorHash = crypto.createHash('sha256')
        .update(visitorData.ip + visitorData.userAgent)
        .digest('hex');

      // Verificar si es un visitante nuevo (no visto en los últimos 30 días)
      const existingVisitor = await pgPool.query(`
        SELECT id FROM visitors 
        WHERE visitor_hash = $1 
        AND last_visit > NOW() - INTERVAL '30 days'
      `, [visitorHash]);

      let isNewVisitor = false;

      if (existingVisitor.rows.length === 0) {
        // Es un visitante nuevo o que no ha visitado en 30 días
        isNewVisitor = true;

        // Insertar/actualizar registro de visitante
        await pgPool.query(`
          INSERT INTO visitors (visitor_hash, ip_address, user_agent, referer, first_visit, last_visit)
          VALUES ($1, $2, $3, $4, $5, $5)
          ON CONFLICT (visitor_hash) 
          DO UPDATE SET 
            last_visit = $5,
            visit_count = visitors.visit_count + 1
        `, [visitorHash, visitorData.ip, visitorData.userAgent, visitorData.referer, visitorData.timestamp]);

        // Actualizar contador general de visitantes
        await pgPool.query(`
          INSERT INTO site_stats (total_visitors, updated_at)
          VALUES (1, NOW())
          ON CONFLICT ((true))
          DO UPDATE SET 
            total_visitors = site_stats.total_visitors + 1,
            updated_at = NOW()
        `);
      } else {
        // Actualizar última visita del visitante existente
        await pgPool.query(`
          UPDATE visitors 
          SET last_visit = $1, visit_count = visit_count + 1
          WHERE visitor_hash = $2
        `, [visitorData.timestamp, visitorHash]);
      }

      // Obtener total actual de visitantes
      const totalResult = await pgPool.query('SELECT total_visitors FROM site_stats LIMIT 1');
      const totalVisitors = totalResult.rows.length > 0 ? parseInt(totalResult.rows[0].total_visitors) : 0;

      return {
        isNewVisitor,
        totalVisitors
      };
    } catch (error) {
      console.error('Error registrando visitante:', error);
      throw error;
    }
  }

  /**
   * Obtener estadísticas detalladas (para panel de admin)
   */
  static async getDetailedStats() {
    try {
      const stats = await this.getPublicStats();

      // Estadísticas adicionales para admin
      const visitorsToday = await pgPool.query(`
        SELECT COUNT(*) as total FROM visitors 
        WHERE last_visit >= CURRENT_DATE
      `);

      const visitorsThisWeek = await pgPool.query(`
        SELECT COUNT(*) as total FROM visitors 
        WHERE last_visit >= CURRENT_DATE - INTERVAL '7 days'
      `);

      const visitorsThisMonth = await pgPool.query(`
        SELECT COUNT(*) as total FROM visitors 
        WHERE last_visit >= CURRENT_DATE - INTERVAL '30 days'
      `);

      const newUsersToday = await pgPool.query(`
        SELECT COUNT(*) as total FROM users 
        WHERE created_at >= CURRENT_DATE
      `);

      const newUsersThisWeek = await pgPool.query(`
        SELECT COUNT(*) as total FROM users 
        WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
      `);

      const newUsersThisMonth = await pgPool.query(`
        SELECT COUNT(*) as total FROM users 
        WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
      `);

      return {
        ...stats,
        detailed: {
          visitors: {
            today: parseInt(visitorsToday.rows[0].total),
            thisWeek: parseInt(visitorsThisWeek.rows[0].total),
            thisMonth: parseInt(visitorsThisMonth.rows[0].total)
          },
          users: {
            today: parseInt(newUsersToday.rows[0].total),
            thisWeek: parseInt(newUsersThisWeek.rows[0].total),
            thisMonth: parseInt(newUsersThisMonth.rows[0].total)
          }
        }
      };
    } catch (error) {
      console.error('Error obteniendo estadísticas detalladas:', error);
      throw error;
    }
  }

  /**
   * Actualizar contadores (para tarea programada)
   */
  static async updateCounters() {
    try {
      const stats = await this.getPublicStats();
      
      // Actualizar tabla de estadísticas
      await pgPool.query(`
        INSERT INTO site_stats (total_visitors, total_users, total_subscribers, updated_at)
        VALUES ($1, $2, $3, NOW())
        ON CONFLICT ((true))
        DO UPDATE SET 
          total_users = $2,
          total_subscribers = $3,
          updated_at = NOW()
      `, [stats.totalVisitors, stats.totalUsers, stats.totalSubscribers]);

      return stats;
    } catch (error) {
      console.error('Error actualizando contadores:', error);
      throw error;
    }
  }
}
