import { Request, Response } from 'express';
import { StatsModel } from '../models/stats.model';

export class StatsController {
  /**
   * Obtener estadísticas generales para la página de inicio
   */
  static async getPublicStats(req: Request, res: Response) {
    try {
      const stats = await StatsModel.getPublicStats();
      
      res.json({
        success: true,
        data: {
          totalVisitors: stats.totalVisitors,
          totalUsers: stats.totalUsers,
          totalSubscribers: stats.totalSubscribers,
          lastUpdated: stats.lastUpdated
        }
      });
    } catch (error) {
      console.error('Error obteniendo estadísticas públicas:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  }

  /**
   * Registrar una nueva visita (visitante único)
   */
  static async trackVisitor(req: Request, res: Response) {
    try {
      const visitorData = {
        ip: req.ip || req.connection.remoteAddress || 'unknown',
        userAgent: req.get('User-Agent') || 'unknown',
        referer: req.get('Referer') || null,
        timestamp: new Date()
      };

      const result = await StatsModel.trackVisitor(visitorData);
      
      res.json({
        success: true,
        data: {
          isNewVisitor: result.isNewVisitor,
          totalVisitors: result.totalVisitors
        }
      });
    } catch (error) {
      console.error('Error registrando visitante:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  }

  /**
   * Obtener estadísticas detalladas (solo para admin)
   */
  static async getDetailedStats(req: Request, res: Response) {
    try {
      const stats = await StatsModel.getDetailedStats();
      
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('Error obteniendo estadísticas detalladas:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  }

  /**
   * Actualizar contadores (tarea programada)
   */
  static async updateCounters(req: Request, res: Response) {
    try {
      const result = await StatsModel.updateCounters();
      
      res.json({
        success: true,
        data: {
          message: 'Contadores actualizados correctamente',
          stats: result
        }
      });
    } catch (error) {
      console.error('Error actualizando contadores:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  }
}
