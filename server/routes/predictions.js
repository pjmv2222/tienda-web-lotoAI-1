const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const authenticateToken = require('../middleware/auth');
const axios = require('axios');

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

// Endpoint específico para el perfil - formato compatible con el frontend del perfil
router.get('/profile-summary', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    console.log(`🔍 [PROFILE-SUMMARY] Obteniendo resumen de perfil para usuario ${userId}`);

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
    
    console.log('📊 [PROFILE-SUMMARY] Datos de predicciones preparados:', gamesData);

    // Respuesta en el formato esperado por el frontend del perfil
    res.json({
      success: true,
      plans: [
        {
          plan_id: 'basic',
          plan_name: 'Plan Básico',
          is_basic_plan: true,
          status: 'active',
          status_display: 'Activo',
          created_at: null,
          expires_at: null,
          price: '1,22€',
          predictions_used: gamesData,
          games: gamesData // Compatibilidad con ambos formatos
        }
      ]
    });
    
  } catch (error) {
    console.error('❌ [PROFILE-SUMMARY] Error al obtener resumen de perfil:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error interno del servidor',
      message: error.message 
    });
  }
});

// Endpoint proxy para predicciones - redirige al servidor IA
router.post('/:juego', authenticateToken, async (req, res) => {
  try {
    const { juego } = req.params;
    const userId = req.user.id;

    console.log(`🔍 [PREDICTIONS] Generando predicción para usuario ${userId}, juego: ${juego}`);

    // Verificar que el usuario no haya excedido el límite de predicciones
    const checkQuery = `
      SELECT COUNT(*) as prediction_count
      FROM user_predictions 
      WHERE user_id = $1 AND game_type = $2
    `;
    
    const checkResult = await pool.query(checkQuery, [userId, juego]);
    const currentCount = parseInt(checkResult.rows[0].prediction_count) || 0;
    const maxAllowed = 3; // Plan básico permite 3 predicciones por juego
    
    if (currentCount >= maxAllowed) {
      return res.status(403).json({
        success: false,
        error: 'Has alcanzado el límite de predicciones para este juego',
        data: {
          gameType: juego,
          currentCount,
          maxAllowed,
          remaining: 0,
          canGenerate: false
        }
      });
    }

    // URL del servidor IA Flask
    const iaServerUrl = process.env.IA_SERVER_URL || 'http://localhost:5000';
    const predictionUrl = `${iaServerUrl}/${juego}/predict`;

    console.log(`🔍 [PREDICTIONS] Haciendo petición a: ${predictionUrl}`);

    // Obtener token de autenticación para el servidor IA
    const iaToken = process.env.IA_SERVER_TOKEN || '8011471e-90c3-4af3-bc53-452557b92001';

    // Hacer petición al servidor IA
    const iaResponse = await axios.post(predictionUrl, {}, {
      headers: {
        'Authorization': `Bearer ${iaToken}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000 // 30 segundos de timeout
    });

    console.log(`✅ [PREDICTIONS] Respuesta del servidor IA:`, iaResponse.data);

    if (!iaResponse.data.success) {
      throw new Error(iaResponse.data.error || 'Error en el servidor IA');
    }

    // Guardar la predicción en la base de datos
    const insertQuery = `
      INSERT INTO user_predictions (user_id, game_type, prediction_data, created_at)
      VALUES ($1, $2, $3, NOW())
    `;
    
    await pool.query(insertQuery, [
      userId, 
      juego, 
      JSON.stringify(iaResponse.data.prediccion)
    ]);

    console.log(`✅ [PREDICTIONS] Predicción guardada en BD para usuario ${userId}`);

    // Devolver respuesta al frontend
    res.json({
      success: true,
      data: {
        juego: juego,
        prediccion: iaResponse.data.prediccion,
        timestamp: iaResponse.data.timestamp,
        remaining: maxAllowed - (currentCount + 1)
      }
    });

  } catch (error) {
    console.error(`❌ [PREDICTIONS] Error generando predicción para ${req.params.juego}:`, error);
    
    // Manejar errores específicos
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({
        success: false,
        error: 'El servidor de IA no está disponible en este momento'
      });
    }
    
    if (error.code === 'ENOTFOUND') {
      return res.status(503).json({
        success: false,
        error: 'No se puede conectar con el servidor de IA'
      });
    }
    
    if (error.response) {
      // Error del servidor IA
      return res.status(error.response.status).json({
        success: false,
        error: error.response.data.error || 'Error en el servidor de IA'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      message: error.message
    });
  }
});

module.exports = router;
