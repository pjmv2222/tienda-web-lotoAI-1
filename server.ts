import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import cors from 'cors';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// La aplicación Express se exporta para que la utilice nuestro archivo de servidor principal de Node.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  // Configuración de PostgreSQL
  const pgPool = new Pool({
    user: process.env['POSTGRES_USER'] || 'postgres',
    host: process.env['POSTGRES_HOST'] || 'localhost',
    database: process.env['POSTGRES_DB'] || 'lotoia',
    password: process.env['POSTGRES_PASSWORD'] || 'password',
    port: parseInt(process.env['POSTGRES_PORT'] || '5432'),
    ssl: process.env['NODE_ENV'] === 'production' ? {
      rejectUnauthorized: false
    } : false
  });

  // Middleware de autenticación JWT
  const authenticateToken = (req: any, res: any, next: any) => {
    try {
      // Obtener token del header Authorization o de las cookies
      let token: string | null = null;
      
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
      const decoded = jwt.verify(token, process.env['JWT_SECRET'] || 'default_secret_key');
      req.user = decoded;
      next();
    } catch (error) {
      console.error('Error al verificar token:', error);
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }
  };

  // Middleware para agregar el pool de PostgreSQL a las requests
  server.use((req: any, res: any, next: any) => {
    req.pgPool = pgPool;
    next();
  });

  // Middleware CORS
  server.use(cors({
    origin: process.env['FRONTEND_URL'],
    credentials: true
  }));

  // Middleware para parsear JSON
  server.use(express.json());

  // ====== RUTAS DE API ======
  
  // Endpoint para obtener perfil de usuario (con autenticación)
  server.get('/api/auth/profile', authenticateToken, async (req: any, res: any) => {
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
  server.get('/api/predictions/summary', authenticateToken, async (req: any, res: any) => {
    try {
      const userId = req.user.id;
      
      console.log(`Obteniendo resumen de predicciones para usuario: ${userId}`);
      
      const client = await pgPool.connect();
      try {
        // Obtener información de suscripción del usuario
        const subscriptionQuery = `
          SELECT plan_type, status 
          FROM subscriptions 
          WHERE user_id = $1 AND status = 'active' 
          ORDER BY created_at DESC 
          LIMIT 1
        `;
        
        const subscriptionResult = await client.query(subscriptionQuery, [userId]);
        const subscription = subscriptionResult.rows[0];
        const planType = subscription?.plan_type || 'free';
        
        // Definir límites por tipo de plan
        const limits: Record<string, number> = {
          free: 3,
          basic: 15,
          premium: 50
        };
        
        const totalAllowed = limits[planType] || 3;
        
        // Lista de juegos disponibles
        const games = [
          { id: 1, name: 'La Primitiva' },
          { id: 2, name: 'Bonoloto' },
          { id: 3, name: 'EuroMillones' },
          { id: 4, name: 'El Gordo' },
          { id: 5, name: 'Lototurf' },
          { id: 6, name: 'EuroDreams' },
          { id: 7, name: 'Lotería Nacional' }
        ];
        
        // Obtener conteo de predicciones usadas por juego
        const usageQuery = `
          SELECT game_id, COUNT(*) as used_count
          FROM user_predictions 
          WHERE user_id = $1 
          AND created_at >= DATE_TRUNC('month', CURRENT_DATE)
          GROUP BY game_id
        `;
        
        const usageResult = await client.query(usageQuery, [userId]);
        const usageByGame = usageResult.rows.reduce((acc: any, row: any) => {
          acc[row.game_id] = parseInt(row.used_count);
          return acc;
        }, {});
        
        // Crear respuesta con datos de cada juego
        const gamePredictionUsage = games.map(game => ({
          game_id: game.id,
          game_name: game.name,
          total_allowed: totalAllowed,
          used: usageByGame[game.id] || 0,
          remaining: totalAllowed - (usageByGame[game.id] || 0)
        }));
        
        res.json({
          success: true,
          data: gamePredictionUsage
        });
        
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('Error obteniendo resumen de predicciones:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

  // Ruta de prueba de salud
  server.get('/api/health', (req: any, res: any) => {
    res.status(200).json({ message: 'Servidor funcionando correctamente' });
  });

  // ====== FIN RUTAS DE API ======

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Servir archivos estáticos desde /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // Todas las demás rutas utilizan el motor de Angular
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Iniciar el servidor Node
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Verificación para iniciar el servidor cuando se ejecuta directamente
const __filename = fileURLToPath(import.meta.url);
const isMainModule = process.argv[1] === __filename;

if (isMainModule) {
  run();
}

export default bootstrap;
