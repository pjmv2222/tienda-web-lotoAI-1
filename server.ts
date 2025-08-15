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
import axios from 'axios';

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
  // Usar el mismo valor por defecto que el backend para evitar desajustes
  const decoded = jwt.verify(token, process.env['JWT_SECRET'] || 'your-secret-key');
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
    console.log('🚨🚨🚨 [SERVER] ENDPOINT /api/auth/profile EJECUTÁNDOSE 🚨🚨🚨');
    console.log('🚨🚨🚨 [SERVER] Este mensaje DEBE aparecer en la consola del servidor 🚨🚨🚨');
    
    try {
      const userId = req.user.id; // Obtener ID del token JWT verificado
      
      console.log(`🚨🚨🚨 [SERVER] Obteniendo perfil para usuario autenticado: ${userId} 🚨🚨🚨`);
      
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
        
        // ✅ DEBUGGING CRÍTICO: Ver exactamente qué devuelve la BD
        console.log('🚨 [SERVER] Datos RAW del usuario desde BD:');
        console.log(`  - user.id: "${user.id}" (${typeof user.id})`);
        console.log(`  - user.created_at: "${user.created_at}" (${typeof user.created_at})`);
        console.log(`  - user completo:`, JSON.stringify(user, null, 2));
        
        const responseData = {
          success: true,
          user: {
            id: user.id.toString(),
            email: user.email,
            nombre: user.nombre,
            apellido: user.apellido,
            telefono: '', // Agregar si existe en la tabla
            fechaRegistro: user.created_at
          }
        };
        
        console.log('🚨 [SERVER] Respuesta que se envía al frontend:');
        console.log('  - fechaRegistro enviado:', responseData.user.fechaRegistro);
        console.log('  - Respuesta completa:', JSON.stringify(responseData, null, 2));
        
        res.json(responseData);
        
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('Error obteniendo perfil:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

  // PROXY: Autenticación (login, register, refresh, etc.) hacia backend en :3000
  // Nota: Excluimos el GET de /api/auth/profile (ya implementado arriba) y solo proxificamos el resto
  server.all('/api/auth/*', async (req: any, res: any, next: any) => {
    try {
      // Dejar pasar el GET de /api/auth/profile a la ruta previa
      if (req.method === 'GET' && req.path === '/api/auth/profile') {
        return next();
      }

  const targetUrl = `http://localhost:3000${req.originalUrl}`;

      // Construir cabeceras a reenviar
      const headers: any = {
        'Content-Type': req.headers['content-type'] || 'application/json'
      };
      if (req.headers.authorization) headers['Authorization'] = req.headers.authorization;
      if (req.headers.cookie) headers['Cookie'] = req.headers.cookie;

      // Seleccionar método y datos
      const method = req.method.toUpperCase();
      const config = { headers, validateStatus: () => true, timeout: 60000 };

      let backendResponse;
      if (method === 'GET' || method === 'DELETE') {
        backendResponse = await axios({ url: targetUrl, method, headers, validateStatus: () => true, timeout: 60000 });
      } else {
        backendResponse = await axios({ url: targetUrl, method, data: req.body, headers, validateStatus: () => true, timeout: 60000 });
      }

      // Propagar Set-Cookie si existe
      const setCookie = backendResponse.headers?.['set-cookie'];
      if (setCookie) {
        res.setHeader('set-cookie', setCookie);
      }

      return res.status(backendResponse.status).send(backendResponse.data);
    } catch (error: any) {
      console.error('❌ [PROXY AUTH] Error:', {
        method: req.method,
        url: req.originalUrl,
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      return res.status(error.response?.status || 500).json({
        success: false,
        error: 'Error en el proxy de autenticación',
        details: error.message
      });
    }
  });

  // PROXY: Redirigir todas las llamadas POST de predicciones al backend en puerto 3000
  server.post('/api/predictions/*', async (req: any, res: any) => {
    try {
      const backendUrl = `http://localhost:3000${req.originalUrl}`;
      console.log(`🔄 [PROXY] Redirigiendo POST de predicción: ${req.originalUrl} -> ${backendUrl}`);
      
      // Reenviar headers de autenticación
      const headers: any = {
        'Content-Type': 'application/json'
      };
      
      if (req.headers.authorization) {
        headers.Authorization = req.headers.authorization;
      }
      
      // Hacer la petición al backend
  const response = await axios.post(backendUrl, req.body, { headers, timeout: 60000 });
      
      console.log(`✅ [PROXY] Respuesta del backend para ${req.originalUrl}:`, response.status);
      return res.status(response.status).json(response.data);
      
    } catch (error: any) {
      console.error(`❌ [PROXY] Error redirigiendo predicción:`, {
        url: req.originalUrl,
        error: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      
      return res.status(error.response?.status || 500).json({
        success: false,
        error: 'Error en el proxy de predicciones',
        details: error.message
      });
    }
  });

  // Endpoint para obtener resumen de predicciones (con autenticación)
  server.get('/api/predictions/summary', authenticateToken, async (req: any, res: any) => {
    try {
      const userId = req.user.id;
      
      console.log(`Obteniendo resumen de predicciones para usuario: ${userId}`);
      
      const client = await pgPool.connect();
      try {
        // Obtener información de la suscripción básica ACTUAL del usuario
        const subscriptionQuery = `
          SELECT plan_type, status, start_date, plan_id 
          FROM subscriptions 
          WHERE user_id = $1 AND status = 'active' AND plan_id = 'basic'
          ORDER BY created_at DESC 
          LIMIT 1
        `;
        
        const subscriptionResult = await client.query(subscriptionQuery, [userId]);
        const subscription = subscriptionResult.rows[0];
        
        console.log('📊 [SERVER] Suscripción básica actual:', subscription);
        
        // Si no hay plan básico activo, devolver datos por defecto
        if (!subscription) {
          console.log('⚠️ [SERVER] No hay plan básico activo para usuario', userId);
          const defaultGames = [
            { game_id: 'primitiva', game_name: 'La Primitiva', total_allowed: 3, used: 0, remaining: 3 },
            { game_id: 'bonoloto', game_name: 'Bonoloto', total_allowed: 3, used: 0, remaining: 3 },
            { game_id: 'euromillon', game_name: 'EuroMillones', total_allowed: 3, used: 0, remaining: 3 },
            { game_id: 'elgordo', game_name: 'El Gordo', total_allowed: 3, used: 0, remaining: 3 },
            { game_id: 'lototurf', game_name: 'Lototurf', total_allowed: 3, used: 0, remaining: 3 },
            { game_id: 'eurodreams', game_name: 'EuroDreams', total_allowed: 3, used: 0, remaining: 3 },
            { game_id: 'loterianacional', game_name: 'Lotería Nacional', total_allowed: 3, used: 0, remaining: 3 }
          ];
          
          return res.json({
            success: true,
            data: { games: defaultGames }
          });
        }
        
        const planStartDate = subscription.start_date;
        
        // Para Plan Básico, el límite es 3 predicciones por juego
        const totalAllowed = 3;
        
        // Lista de juegos disponibles con IDs corregidos según la tabla user_predictions
        const games = [
          { id: 'primitiva', name: 'La Primitiva' },
          { id: 'bonoloto', name: 'Bonoloto' },
          { id: 'euromillon', name: 'EuroMillones' },
          { id: 'elgordo', name: 'El Gordo' },
          { id: 'lototurf', name: 'Lototurf' },
          { id: 'eurodreams', name: 'EuroDreams' },
          { id: 'loterianacional', name: 'Lotería Nacional' }
        ];
        
        // CORRECCIÓN CLAVE: Obtener conteo de predicciones SOLO desde la fecha de inicio del plan básico actual
        const usageQuery = `
          SELECT game_type as game_id, COUNT(*) as used_count
          FROM user_predictions 
          WHERE user_id = $1 
          AND created_at >= $2
          GROUP BY game_type
        `;
        
        console.log('📊 [SERVER] Consultando predicciones desde:', planStartDate, 'para usuario:', userId);
        
        const usageResult = await client.query(usageQuery, [userId, planStartDate]);
        const usageByGame = usageResult.rows.reduce((acc: any, row: any) => {
          acc[row.game_id] = parseInt(row.used_count);
          return acc;
        }, {});
        
        console.log('📊 [SERVER] Uso por juego desde plan actual:', usageByGame);
        
        // Crear respuesta con datos de cada juego
        const gamePredictionUsage = games.map(game => ({
          game_id: game.id,
          game_name: game.name,
          total_allowed: totalAllowed,
          used: usageByGame[game.id] || 0,
          remaining: totalAllowed - (usageByGame[game.id] || 0)
        }));
        
        console.log('📊 [SERVER] Respuesta final:', { games: gamePredictionUsage });
        
        res.json({
          success: true,
          data: {
            games: gamePredictionUsage
          }
        });
        
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('Error obteniendo resumen de predicciones:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

  // Obtener suscripciones del usuario
  server.get('/api/predictions/summary', async (req: any, res: any) => {
    try {
      // Ruta pública: devolver solo los botes (jackpots) y datos generales, sin datos de usuario
      // Leer archivo botes.json y devolverlo como respuesta
      const fs = await import('fs/promises');
      const path = await import('path');
      const botesPath = path.resolve(process.cwd(), 'src/assets/botes.json');
      const botesRaw = await fs.readFile(botesPath, 'utf-8');
      const botes = JSON.parse(botesRaw);
      res.json({ success: true, data: botes });
    } catch (error: any) {
      console.error('❌ [SERVER] Error al leer botes.json:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener los botes',
        details: error.message
      });
    }
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
