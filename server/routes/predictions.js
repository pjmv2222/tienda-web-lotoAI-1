const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const authenticateToken = require('../middleware/auth');

// Configurar conexión a PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'lotoia',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Endpoint para obtener estado de predicciones por juego
router.get('/status/:gameType', authenticateToken, async (req, res) => {
  try {
    const { gameType } = req.params;
    const userId = req.user.id;

    console.log(`Obteniendo estado de predicciones para usuario ${userId}, juego: ${gameType}`);

    // Consultar predicciones del usuario para este juego
    const query = `
      SELECT COUNT(*) as prediction_count
      FROM user_predictions 
      WHERE user_id = $1 AND game_type = $2
    `;
    
    const result = await pool.query(query, [userId, gameType]);
    const currentCount = parseInt(result.rows[0].prediction_count) || 0;
    const maxAllowed = 3; // Plan básico permite 3 predicciones por juego
    
    console.log(`Predicciones encontradas: ${currentCount}/${maxAllowed}`);

    res.json({
      success: true,
      data: {
        gameType,
        currentCount,
        maxAllowed,
        remaining: maxAllowed - currentCount,
        canGenerate: currentCount < maxAllowed
      }
    });
    
  } catch (error) {
    console.error('Error al obtener estado de predicciones:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error interno del servidor',
      message: error.message 
    });
  }
});

// Endpoint para obtener resumen completo de predicciones
router.get('/summary', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    console.log(`Obteniendo resumen completo para usuario ${userId}`);

    // Consultar todas las predicciones del usuario
    const query = `
      SELECT 
        game_type,
        COUNT(*) as used_count
      FROM user_predictions 
      WHERE user_id = $1 
      GROUP BY game_type
    `;
    
    const result = await pool.query(query, [userId]);
    
    // Juegos disponibles del Plan Básico
    const availableGames = [
      'euromillon', 'primitiva', 'bonoloto', 'elgordo', 
      'eurodreams', 'lototurf', 'loterianacional'
    ];
    
    const gameNames = {
      'euromillon': 'Euromillones',
      'primitiva': 'La Primitiva',
      'bonoloto': 'Bonoloto',
      'elgordo': 'El Gordo',
      'eurodreams': 'EuroDreams',
      'lototurf': 'Lototurf',
      'loterianacional': 'Lotería Nacional'
    };
    
    // Mapear resultados con límites del plan básico
    const gamesData = availableGames.map(gameType => {
      const gameUsage = result.rows.find(row => row.game_type === gameType);
      const used = gameUsage ? parseInt(gameUsage.used_count) : 0;
      const maxAllowed = 3;
      
      return {
        game_id: gameType,
        game_name: gameNames[gameType] || gameType,
        total_allowed: maxAllowed,
        used: used,
        remaining: maxAllowed - used
      };
    });
    
    console.log('Resumen de predicciones:', gamesData);

    res.json({
      success: true,
      data: {
        games: gamesData
      }
    });
    
  } catch (error) {
    console.error('Error al obtener resumen de predicciones:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error interno del servidor',
      message: error.message 
    });
  }
});

module.exports = router;
