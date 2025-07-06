const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Importar rutas
const paymentRoutes = require('./routes/payment.routes');
const subscriptionRoutes = require('./routes/subscription.routes');
const webhookRoutes = require('./routes/webhook.routes');
const webhookController = require('./controllers/webhook.controller');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de autenticación JWT
const authenticateToken = (req, res, next) => {
  try {
    // Obtener token del header Authorization o de las cookies
    let token = null;
    
    // Primero intentar desde el header Authorization
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
    
    // Si no hay token en el header, buscar en las cookies
    if (!token && req.headers.cookie) {
      const cookies = req.headers.cookie.split(';');
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'auth_token') {
          token = decodeURIComponent(value);
          break;
        }
      }
    }

    if (!token) {
      return res.status(401).json({ error: 'Token de acceso requerido' });
    }

    // Verificar el token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error al verificar token:', error);
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
};

// Configuración de PostgreSQL
const pgPool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'lotoia',
  password: process.env.POSTGRES_PASSWORD || 'password',
  port: process.env.POSTGRES_PORT || 5432,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false
});

// Middleware para agregar el pool de PostgreSQL a las requests
app.use((req, res, next) => {
  req.pgPool = pgPool;
  next();
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// Middleware especial para webhooks de Stripe (debe estar antes del express.json())
app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }));

// Middleware para parsear JSON en el resto de rutas
app.use(express.json());

// Rutas
app.use('/api/payments', paymentRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// Configuración especial para la ruta de webhook de Stripe
app.post('/api/webhooks/stripe', webhookController.handleStripeWebhook);

// Otras rutas de webhook
app.use('/api/webhooks', webhookRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Servidor funcionando correctamente' });
});

// Endpoint para obtener perfil de usuario (con autenticación)
app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // Obtener ID del token JWT verificado
    
    console.log(`Obteniendo perfil para usuario autenticado: ${userId}`);
    
    const client = await pgPool.connect();
    try {
      const getUserQuery = `
        SELECT id, email, nombre, apellido, created_at
        FROM users WHERE id = $1
      `;
      
      const userResult = await client.query(getUserQuery, [userId]);
      
      if (userResult.rows.length === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      
      const user = userResult.rows[0];
      
      res.json({
        success: true,
        user: {
          id: user.id.toString(),
          email: user.email,
          nombre: user.nombre,
          apellido: user.apellido,
          telefono: '', // Agregar si existe en la tabla
          fechaRegistro: user.created_at
        }
      });
      
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para obtener resumen de predicciones (con autenticación)
app.get('/api/predictions/summary', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // Obtener ID del token JWT verificado
    
    console.log(`Obteniendo resumen de predicciones para usuario autenticado: ${userId}`);

    const client = await pgPool.connect();
    try {
      // Consultar todas las predicciones del usuario
      const query = `
        SELECT 
          game_type,
          COUNT(*) as used_count
        FROM user_predictions 
        WHERE user_id = $1 
        GROUP BY game_type
      `;
      
      const result = await client.query(query, [userId]);
      
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
      
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error al obtener resumen de predicciones:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error interno del servidor',
      message: error.message 
    });
  }
});

// Endpoint temporal para obtener perfil de usuario por email (sin autenticación)
app.get('/api/auth/profile', async (req, res) => {
  try {
    // Obtener el email del header Authorization (token JWT)
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ error: 'Token requerido' });
    }

    // Para pruebas, usar un usuario específico (pjulianmv@gmail.com)
    const userEmail = 'pjulianmv@gmail.com';
    
    const client = await req.pgPool.connect();
    try {
      const getUserQuery = `
        SELECT id, email, nombre, apellido, created_at
        FROM users WHERE email = $1
      `;
      
      const userResult = await client.query(getUserQuery, [userEmail]);
      
      if (userResult.rows.length === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      
      const user = userResult.rows[0];
      
      res.json({
        success: true,
        user: {
          id: user.id.toString(),
          email: user.email,
          nombre: user.nombre,
          apellido: user.apellido,
          fechaRegistro: user.created_at
        }
      });
      
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint temporal para obtener resumen de predicciones (sin autenticación)
app.get('/api/predictions/summary', async (req, res) => {
  try {
    // Para pruebas, usar el usuario con ID 43
    const userId = 43;
    
    console.log(`Obteniendo resumen completo para usuario ${userId}`);

    const client = await req.pgPool.connect();
    try {
      // Consultar todas las predicciones del usuario
      const query = `
        SELECT 
          game_type,
          COUNT(*) as used_count
        FROM user_predictions 
        WHERE user_id = $1 
        GROUP BY game_type
      `;
      
      const result = await client.query(query, [userId]);
      
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
      
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error al obtener resumen de predicciones:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error interno del servidor',
      message: error.message 
    });
  }
});

// Ruta de prueba de base de datos
app.get('/api/db-test', async (req, res) => {
  try {
    const client = await pgPool.connect();
    try {
      const result = await client.query('SELECT NOW()');
      res.status(200).json({ 
        message: 'Conexión a PostgreSQL exitosa', 
        timestamp: result.rows[0].now 
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error al conectar a PostgreSQL:', error);
    res.status(500).json({ error: 'Error de conexión a la base de datos' });
  }
});

// Verificar conexión a PostgreSQL e iniciar servidor
const startServer = async () => {
  try {
    // Probar la conexión a PostgreSQL
    const client = await pgPool.connect();
    console.log('Conectado a PostgreSQL');
    client.release();
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar a PostgreSQL:', error);
    process.exit(1);
  }
};

startServer();
