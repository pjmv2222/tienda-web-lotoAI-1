import { Request, Response } from 'express';
import { spawn, ChildProcess } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import { PredictionModel, getPredictionLimitsByPlan } from '../models/prediction.model';
import { pgPool } from '../config/database';

// Puerto fijo para el servidor IA unificado
const IA_SERVER_PORT = 5000;
const IA_SERVER_URL = `http://127.0.0.1:${IA_SERVER_PORT}`;
const IA_SERVER_SCRIPT = '/var/www/tienda-web-lotoAI-1/archivos-para-servidor/server-ia-unificado.py';

// Proceso del servidor IA unificado
let iaServerProcess: ChildProcess | null = null;

// Tiempo de espera para verificar que el servidor esté listo (15 segundos)
const STARTUP_WAIT_TIME = 15000;

// Mapeo de nombres de juegos entre frontend y servidor IA
const gameMapping: { [key: string]: string } = {
  'euromillon': 'euromillon',
  'euromillones': 'euromillon',
  'primitiva': 'primitiva',
  'bonoloto': 'bonoloto',
  'gordo': 'elgordo',
  'gordo-primitiva': 'elgordo',
  'eurodreams': 'eurodreams',
  'loterianacional': 'loterianacional',
  'loteria-nacional': 'loterianacional',
  'lototurf': 'lototurf'
};

/**
 * Inicia el servidor IA unificado si no está corriendo
 */
async function startIAServer(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Si ya está corriendo, no hacer nada
    if (iaServerProcess && !iaServerProcess.killed) {
      console.log('Servidor IA ya está en ejecución');
      resolve();
      return;
    }

    // Verificar que el script Python existe
    if (!fs.existsSync(IA_SERVER_SCRIPT)) {
      reject(new Error(`Script server-ia-unificado.py no encontrado en: ${IA_SERVER_SCRIPT}`));
      return;
    }

    console.log('Iniciando servidor IA unificado...');
    console.log('🔧 Debug spawn:');
    console.log('  - Comando: python3');
    console.log('  - Script:', IA_SERVER_SCRIPT);
    console.log('  - CWD:', '/var/www/tienda-web-lotoAI-1');
    console.log('  - Puerto:', IA_SERVER_PORT);
    console.log('  - JWT_SECRET en env:', process.env['JWT_SECRET'] ? 'SET' : 'NOT_SET');

    // Verificar Python y dependencias básicas
    console.log('🔍 [DEBUG] Verificando entorno Python...');

    // Iniciar el proceso Python
    iaServerProcess = spawn('python3', [IA_SERVER_SCRIPT], {
      env: {
        ...process.env,
        PORT: IA_SERVER_PORT.toString(),
        FLASK_ENV: 'production',
        PYTHONPATH: '/var/www/tienda-web-lotoAI-1',
        PYTHONUNBUFFERED: '1',
        JWT_SECRET: process.env['JWT_SECRET'] || '8011471e-90c3-4af3-bc53-452557b92001'
      },
      cwd: '/var/www/tienda-web-lotoAI-1',
      stdio: ['pipe', 'pipe', 'pipe']
    });

    console.log('🔧 Proceso spawn iniciado, PID:', iaServerProcess.pid);

    // Buffer para capturar errores críticos de inicio
    let startupErrors = '';
    let startupOutput = '';

    // Manejar la salida estándar
    iaServerProcess.stdout?.on('data', (data) => {
      const output = data.toString().trim();
      startupOutput += output + '\n';
      console.log(`[IA-Server STDOUT] ${output}`);
      
      // Detectar cuando el servidor está listo
      if (output.includes('Running on') || output.includes('Servidor IA iniciado')) {
        console.log('🚀 [DEBUG] Servidor IA reporta estar listo');
      }
    });

    // Manejar la salida de error
    iaServerProcess.stderr?.on('data', (data) => {
      const errorOutput = data.toString().trim();
      startupErrors += errorOutput + '\n';
      console.error(`[IA-Server STDERR] ${errorOutput}`);
      
      // Detectar errores críticos específicos
      if (errorOutput.includes('ModuleNotFoundError')) {
        console.error('🚨 [ERROR] Dependencia Python faltante:', errorOutput);
      }
      if (errorOutput.includes('ImportError')) {
        console.error('🚨 [ERROR] Error de importación Python:', errorOutput);
      }
      if (errorOutput.includes('Permission denied')) {
        console.error('🚨 [ERROR] Error de permisos:', errorOutput);
      }
      if (errorOutput.includes('Address already in use')) {
        console.error('🚨 [ERROR] Puerto ya en uso:', errorOutput);
      }
    });

    // Manejar el cierre del proceso
    iaServerProcess.on('close', (code, signal) => {
      console.log(`[IA-Server] Proceso terminado - Código: ${code}, Señal: ${signal}`);
      if (code !== 0) {
        console.error(`🚨 [ERROR] Servidor IA terminó con código de salida: ${code}`);
        console.error(`🚨 [ERROR] Errores capturados:`, startupErrors);
        console.error(`🚨 [ERROR] Salida capturada:`, startupOutput);
      }
      iaServerProcess = null;
    });

    // Manejar errores del proceso (esto es lo crítico)
    iaServerProcess.on('error', (error) => {
      console.error(`🚨 [IA-Server] ERROR SPAWN:`, {
        message: error.message,
        code: (error as any).code,
        errno: (error as any).errno,
        syscall: (error as any).syscall,
        path: (error as any).path,
        stack: error.stack
      });
      iaServerProcess = null;
      reject(error);
    });

    // Verificar inmediatamente si el proceso se inició correctamente
    if (!iaServerProcess.pid) {
      const spawnError = new Error('Proceso spawn no se inició - PID undefined');
      console.error('🚨 Spawn falló inmediatamente');
      reject(spawnError);
      return;
    }

    // Esperar a que el servidor esté listo
    setTimeout(async () => {
      try {
        // Verificar que el servidor responde
        console.log(`🔍 [DEBUG] Verificando health check después de ${STARTUP_WAIT_TIME}ms...`);
        const healthResponse = await axios.get(`${IA_SERVER_URL}/health`);
        console.log(`✅ Servidor IA iniciado correctamente en puerto ${IA_SERVER_PORT}`, healthResponse.data);
        resolve();
      } catch (error: any) {
        console.error('❌ Error verificando estado del servidor IA:', {
          message: error.message,
          code: error.code,
          status: error.response?.status,
          startupErrors: startupErrors,
          startupOutput: startupOutput
        });
        reject(new Error(`Servidor IA no responde: ${error.message}. Errores: ${startupErrors}`));
      }
    }, STARTUP_WAIT_TIME);
  });
}

/**
 * Detiene el servidor IA unificado inmediatamente
 */
function stopIAServer(): void {
  if (iaServerProcess && !iaServerProcess.killed) {
    console.log('🛑 Deteniendo servidor IA después de generar predicción...');
    iaServerProcess.kill('SIGTERM');
    iaServerProcess = null;
  }
}

/**
 * Verifica si hay un servidor IA permanente corriendo
 */
async function checkPermanentServer(): Promise<boolean> {
  try {
    await axios.get(`${IA_SERVER_URL}/health`, { timeout: 2000 });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Genera un JWT token básico para el servidor IA
 */
function generateIAToken(): string {
  // Usar la misma clave secreta que el middleware de autenticación y PM2
  const SECRET_KEY = process.env['JWT_SECRET'] || '8011471e-90c3-4af3-bc53-452557b92001';
  
  const payload = {
    id: 999, // ID de servicio interno
    email: 'internal@loto-ia.com',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 30) // 30 minutos
  };

  console.log('🔑 Generando token JWT con payload:', payload);
  console.log('🔑 Usando clave JWT:', SECRET_KEY.substring(0, 10) + '...');
  
  const token = jwt.sign(payload, SECRET_KEY, { algorithm: 'HS256' });
  console.log('🔑 Token generado:', token.substring(0, 50) + '...');
  
  return token;
}

/**
 * Controlador para obtener una predicción usando el servidor IA unificado
 */
export const getPrediction = async (req: Request, res: Response) => {
  console.log(`🎯 [DEBUG] Iniciando solicitud de predicción para juego: ${req.params.game}`);
  
  try {
    const { game } = req.params;
    console.log(`🎯 Solicitud de predicción para juego: ${game}`);
    console.log(`📁 Script IA ubicado en: ${IA_SERVER_SCRIPT}`);
    console.log(`📁 Script existe: ${fs.existsSync(IA_SERVER_SCRIPT)}`);

    // Mapear el nombre del juego
    const mappedGame = gameMapping[game] || game;
    console.log(`🔄 Juego mapeado: ${game} -> ${mappedGame}`);

    // Verificar si hay un servidor IA permanente ya corriendo
    let serverReady = false;
    let isPermanentServer = false;
    
    console.log(`🔍 [DEBUG] Verificando servidor IA permanente en ${IA_SERVER_URL}`);
    
    try {
      const healthResponse = await axios.get(`${IA_SERVER_URL}/health`, { timeout: 3000 });
      console.log(`✅ [DEBUG] Servidor IA permanente detectado - respuesta: ${JSON.stringify(healthResponse.data)}`);
      isPermanentServer = true;
      serverReady = true;
    } catch (healthError: any) {
      console.log(`📊 [DEBUG] No hay servidor IA permanente disponible:`, {
        message: healthError.message,
        code: healthError.code,
        status: healthError.response?.status
      });
      
      console.log(`🚀 [DEBUG] Iniciando servidor IA bajo demanda...`);
      try {
        await startIAServer();
        console.log(`✅ [DEBUG] Servidor IA iniciado bajo demanda exitosamente`);
        serverReady = true;
      } catch (startError: any) {
        console.error(`❌ [ERROR] Fallo al iniciar servidor IA:`, {
          message: startError.message,
          code: startError.code,
          stack: startError.stack
        });
        return res.status(503).json({
          success: false,
          error: 'No se pudo iniciar el servidor de IA',
          code: 'IA_SERVER_START_FAILED',
          details: startError.message
        });
      }
    }

    if (!serverReady) {
      console.error(`❌ [ERROR] Servidor IA no está listo después de intentar iniciarlo`);
      return res.status(503).json({
        success: false,
        error: 'Servidor de IA no disponible',
        code: 'IA_SERVER_NOT_READY'
      });
    }

    // Generar token de autenticación para el servidor IA
    console.log(`🔑 [DEBUG] Generando token JWT para autenticación...`);
    const token = generateIAToken();

    // Realizar la solicitud HTTP al servidor IA unificado
    const endpoint = `${IA_SERVER_URL}/${mappedGame}/predict`;
    console.log(`📡 [DEBUG] Enviando request a: ${endpoint}`);
    console.log(`📡 [DEBUG] Headers: Authorization: Bearer ${token.substring(0, 50)}...`);

    let response;
    try {
      response = await axios.post(endpoint, {
        input: [1, 2, 3, 4, 5, 6, 7] // Datos de entrada básicos
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        timeout: 45000 // 45 segundos de timeout
      });
      
      console.log(`✅ [DEBUG] Respuesta exitosa del servidor IA:`, {
        status: response.status,
        statusText: response.statusText,
        data: response.data
      });
      
    } catch (axiosError: any) {
      console.error(`❌ [ERROR] Error en la solicitud HTTP al servidor IA:`, {
        message: axiosError.message,
        code: axiosError.code,
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        data: axiosError.response?.data,
        config: {
          url: axiosError.config?.url,
          method: axiosError.config?.method,
          headers: axiosError.config?.headers
        }
      });
      
      // Manejar errores específicos de la comunicación con el servidor IA
      if (axiosError.response?.status === 401) {
        return res.status(500).json({
          success: false,
          error: 'Error de autenticación con el servidor IA - JWT inválido',
          code: 'IA_AUTH_ERROR',
          details: axiosError.response?.data
        });
      }
      
      if (axiosError.response?.status === 404) {
        return res.status(500).json({
          success: false,
          error: `Endpoint no encontrado en servidor IA: ${endpoint}`,
          code: 'IA_ENDPOINT_NOT_FOUND',
          details: `El juego '${mappedGame}' no está disponible`
        });
      }
      
      if (axiosError.code === 'ECONNREFUSED') {
        return res.status(503).json({
          success: false,
          error: 'No se puede conectar al servidor IA',
          code: 'IA_CONNECTION_REFUSED',
          details: 'El servidor IA no está respondiendo'
        });
      }
      
      throw axiosError; // Re-lanzar para el catch general
    }

    // Solo detener el servidor IA si fue iniciado bajo demanda (no el permanente)
    if (!isPermanentServer) {
      setTimeout(() => {
        console.log(`🛑 [DEBUG] Deteniendo servidor IA iniciado bajo demanda en 2 segundos...`);
        stopIAServer();
      }, 2000); // Esperar 2 segundos antes de detener
    } else {
      console.log(`🏠 [DEBUG] Usando servidor IA permanente - NO se detiene`);
    }

    // Devolver la respuesta al frontend (adaptando el formato del servidor IA)
    const iaResponse = response.data;
    const finalResponse = {
      success: true,
      prediction: iaResponse.prediccion || iaResponse.prediction || iaResponse,
      game: mappedGame,
      timestamp: new Date().toISOString(),
      source: 'ia_server',
      efficiency: isPermanentServer ? 'permanent_server' : 'start_stop_on_demand'
    };
    
    console.log(`🎉 [DEBUG] Enviando respuesta final al frontend:`, finalResponse);
    return res.status(200).json(finalResponse);

  } catch (error: any) {
    console.error(`❌ [ERROR] Error crítico al generar predicción para ${req.params.game}:`, {
      message: error.message,
      code: error.code,
      stack: error.stack,
      type: error.name,
      response: error.response?.data,
      url: error.config?.url
    });
    
    // Solo detener el servidor IA en errores críticos, no en errores de conexión temporales
    if (error.code === 'ECONNREFUSED' || error.message?.includes('ENOENT')) {
      console.log('🛑 Deteniendo servidor IA debido a error crítico');
      stopIAServer();
    }
    
    // Si hay error de conexión
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      return res.status(503).json({
        success: false,
        error: 'Servidor de IA temporalmente no disponible. Reintenta en unos segundos.',
        code: 'IA_SERVER_UNAVAILABLE',
        details: error.message
      });
    }

    // Si es error de JWT o dependencias faltantes
    if (error.message && error.message.includes('jwt') || error.message.includes('jsonwebtoken')) {
      return res.status(500).json({
        success: false,
        error: 'Error de configuración del servidor - problema con JWT',
        code: 'JWT_ERROR',
        details: error.message
      });
    }

    // Si es error de Python/archivo no encontrado
    if (error.message && (error.message.includes('ENOENT') || error.message.includes('python'))) {
      return res.status(500).json({
        success: false,
        error: 'Error de configuración - script IA no encontrado o Python no disponible',
        code: 'PYTHON_ERROR',
        details: error.message
      });
    }

    // Para otros errores, devolver respuesta de error con más detalles
    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor al generar predicción',
      code: 'INTERNAL_ERROR',
      details: error.message,
      type: error.name,
      game: req.params.game
    });
  }
};

/**
 * Controlador para verificar el estado del servidor IA
 */
export const getServerStatus = async (req: Request, res: Response) => {
  try {
    const isRunning = iaServerProcess && !iaServerProcess.killed;
    
    let healthStatus = 'unknown';
    if (isRunning) {
      try {
        await axios.get(`${IA_SERVER_URL}/health`, { timeout: 5000 });
        healthStatus = 'healthy';
      } catch (error) {
        healthStatus = 'unhealthy';
      }
    } else {
      healthStatus = 'stopped';
    }

    res.json({
      success: true,
      server: {
        running: isRunning,
        health: healthStatus,
        port: IA_SERVER_PORT,
        mode: 'start_stop_on_demand',
        script: IA_SERVER_SCRIPT
      }
    });
    
  } catch (error) {
    console.error('Error al verificar estado del servidor:', error);
    res.status(500).json({
      success: false,
      error: 'Error al verificar estado del servidor'
    });
  }
};

// Limpieza al cerrar la aplicación
process.on('SIGTERM', stopIAServer);
process.on('SIGINT', stopIAServer);

export const PredictionController = {
  /**
   * Obtener el estado actual de predicciones del usuario
   */
  async getPredictionStatus(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
      }

      const { gameType } = req.params;
      
      // Obtener el plan actual del usuario
      const userPlan = await getUserCurrentPlan(userId);
      const limits = getPredictionLimitsByPlan(userPlan);
      
      // Contar predicciones actuales
      const currentCount = await PredictionModel.countUserPredictions(userId, gameType);
      const maxAllowed = limits[gameType] || 3;
      
      // Obtener predicciones existentes
      const predictions = await PredictionModel.getUserPredictions(userId, gameType);
      
      res.json({
        success: true,
        data: {
          gameType,
          currentCount,
          maxAllowed,
          remaining: Math.max(0, maxAllowed - currentCount),
          canGenerate: currentCount < maxAllowed,
          predictions: predictions.map(p => ({
            id: p.id,
            data: p.prediction_data,
            createdAt: p.created_at
          })),
          userPlan
        }
      });
    } catch (error) {
      console.error('Error obteniendo estado de predicciones:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  /**
   * Crear nueva predicción
   */
  async createPrediction(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
      }

      const { gameType, predictionData } = req.body;

      // Validar datos
      if (!gameType || !predictionData) {
        return res.status(400).json({ error: 'gameType y predictionData son requeridos' });
      }

      // Obtener el plan actual del usuario
      const userPlan = await getUserCurrentPlan(userId);
      const limits = getPredictionLimitsByPlan(userPlan);
      
      // Verificar límite
      const currentCount = await PredictionModel.countUserPredictions(userId, gameType);
      const maxAllowed = limits[gameType] || 3;
      
      if (currentCount >= maxAllowed) {
        return res.status(400).json({ 
          error: `Límite de ${maxAllowed} predicciones alcanzado para ${gameType}`,
          currentCount,
          maxAllowed,
          userPlan
        });
      }

      // Crear la predicción
      const newPrediction = await PredictionModel.create(userId, gameType, predictionData);
      
      res.json({
        success: true,
        data: {
          id: newPrediction.id,
          gameType,
          predictionData: newPrediction.prediction_data,
          createdAt: newPrediction.created_at,
          currentCount: currentCount + 1,
          maxAllowed,
          remaining: Math.max(0, maxAllowed - currentCount - 1)
        }
      });
    } catch (error) {
      console.error('Error creando predicción:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  /**
   * Limpiar predicciones del usuario para un juego
   */
  async clearPredictions(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
      }

      const { gameType } = req.params;
      
      // Obtener información del plan y límites ANTES de limpiar
      const userPlan = await getUserCurrentPlan(userId);
      const limits = getPredictionLimitsByPlan(userPlan);
      const predictionsGenerated = await PredictionModel.countUserPredictions(userId, gameType);
      const maxAllowed = limits[gameType] || 3;
      
      // Limpiar solo las predicciones visibles (NO el contador de límites del plan)
      const deletedPredictions = await PredictionModel.clearUserPredictions(userId, gameType);
      
      res.json({
        success: true,
        data: {
          gameType,
          deletedCount: deletedPredictions.length,
          message: `Se eliminaron ${deletedPredictions.length} predicciones visibles de ${gameType}`,
          predictionsGenerated,
          maxAllowed,
          remaining: Math.max(0, maxAllowed - predictionsGenerated),
          canGenerate: predictionsGenerated < maxAllowed,
          userPlan,
          note: predictionsGenerated >= maxAllowed ? 
            `Has alcanzado el límite de ${maxAllowed} predicciones para ${gameType} en tu plan ${userPlan}. Para generar más predicciones, actualiza tu suscripción.` : 
            `Predicciones limpiadas. Puedes generar ${Math.max(0, maxAllowed - predictionsGenerated)} predicciones más para ${gameType}.`
        }
      });
    } catch (error) {
      console.error('Error limpiando predicciones:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  /**
   * Obtener resumen de todas las predicciones del usuario
   */
  async getAllPredictionCounts(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
      }

      // Obtener el plan actual del usuario
      const userPlan = await getUserCurrentPlan(userId);
      const limits = getPredictionLimitsByPlan(userPlan);
      
      // Obtener conteos actuales
      const counts = await PredictionModel.getAllUserPredictionCounts(userId);
      
      // Crear resumen completo
      const games = ['euromillon', 'bonoloto', 'primitiva', 'elgordo', 'eurodreams', 'loterianacional', 'lototurf'];
      const summary = games.map(game => {
        const currentCount = counts.find(c => c.game_type === game)?.count || 0;
        const maxAllowed = limits[game] || 3;
        
        return {
          gameType: game,
          currentCount: parseInt(currentCount),
          maxAllowed,
          remaining: Math.max(0, maxAllowed - parseInt(currentCount)),
          canGenerate: parseInt(currentCount) < maxAllowed
        };
      });

      res.json({
        success: true,
        data: {
          userPlan,
          games: summary,
          totalPredictionsToday: counts.reduce((sum, c) => sum + parseInt(c.count), 0)
        }
      });
    } catch (error) {
      console.error('Error obteniendo resumen de predicciones:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

/**
 * Función auxiliar para obtener el plan actual del usuario
 */
async function getUserCurrentPlan(userId: number): Promise<string> {
  try {
    const result = await pgPool.query(
      `SELECT plan_type FROM subscriptions 
       WHERE user_id = $1 AND status = 'active' AND end_date > NOW()
       ORDER BY created_at DESC LIMIT 1`,
      [userId]
    );
    
    return result.rows[0]?.plan_type || 'basic';
  } catch (error) {
    console.error('Error obteniendo plan del usuario:', error);
    return 'basic'; // Plan por defecto
  }
}
