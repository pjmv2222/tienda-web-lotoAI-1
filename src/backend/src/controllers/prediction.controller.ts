import { Request, Response } from 'express';
import { spawn, ChildProcess } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import axios from 'axios';

// Puerto fijo para el servidor IA unificado
const IA_SERVER_PORT = 5000;
const IA_SERVER_URL = `http://127.0.0.1:${IA_SERVER_PORT}`;
const IA_SERVER_SCRIPT = path.resolve(__dirname, '../../../server-ia-unificado.py');

// Proceso del servidor IA unificado
let iaServerProcess: ChildProcess | null = null;

// Tiempo de espera para verificar que el servidor esté listo (3 segundos)
const STARTUP_WAIT_TIME = 3000;

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

    // Iniciar el proceso Python
    iaServerProcess = spawn('python3', [IA_SERVER_SCRIPT], {
      env: {
        ...process.env,
        PORT: IA_SERVER_PORT.toString(),
        FLASK_ENV: 'production'
      },
      cwd: path.dirname(IA_SERVER_SCRIPT)
    });

    // Manejar la salida estándar
    iaServerProcess.stdout?.on('data', (data) => {
      console.log(`[IA-Server] ${data.toString().trim()}`);
    });

    // Manejar la salida de error
    iaServerProcess.stderr?.on('data', (data) => {
      console.error(`[IA-Server] Error: ${data.toString().trim()}`);
    });

    // Manejar el cierre del proceso
    iaServerProcess.on('close', (code) => {
      console.log(`[IA-Server] Proceso terminado con código ${code}`);
      iaServerProcess = null;
    });

    // Manejar errores del proceso
    iaServerProcess.on('error', (error) => {
      console.error(`[IA-Server] Error del proceso: ${error.message}`);
      iaServerProcess = null;
      reject(error);
    });

    // Esperar a que el servidor esté listo
    setTimeout(async () => {
      try {
        // Verificar que el servidor responde
        await axios.get(`${IA_SERVER_URL}/health`);
        console.log(`✅ Servidor IA iniciado correctamente en puerto ${IA_SERVER_PORT}`);
        resolve();
      } catch (error) {
        console.error('❌ Error verificando estado del servidor IA:', error);
        reject(new Error('Servidor IA no responde'));
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
 * Genera un JWT token básico para el servidor IA
 */
function generateIAToken(): string {
  // En una implementación real, esto debería usar las credenciales del usuario autenticado
  // Por ahora, usamos un token básico para comunicación entre servicios
  const jwt = require('jsonwebtoken');
  const SECRET_KEY = process.env.JWT_SECRET || 'lotoia_super_secret_key_2024_verification_token';
  
  return jwt.sign(
    { 
      sub: 'internal_service',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 30) // 30 minutos
    },
    SECRET_KEY,
    { algorithm: 'HS256' }
  );
}

/**
 * Controlador para obtener una predicción usando el servidor IA unificado
 */
export const getPrediction = async (req: Request, res: Response) => {
  try {
    const { game } = req.params;
    console.log(`🎯 Solicitud de predicción para juego: ${game}`);

    // Mapear el nombre del juego
    const mappedGame = gameMapping[game] || game;
    console.log(`🔄 Juego mapeado: ${game} -> ${mappedGame}`);

    // Iniciar el servidor IA si no está corriendo
    await startIAServer();

    // Generar token de autenticación para el servidor IA
    const token = generateIAToken();

    // Realizar la solicitud HTTP al servidor IA unificado
    const endpoint = `${IA_SERVER_URL}/${mappedGame}/predict`;
    console.log(`📡 Enviando request a: ${endpoint}`);

    const response = await axios.post(endpoint, {
      input: [1, 2, 3, 4, 5, 6, 7] // Datos de entrada básicos
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      timeout: 45000 // 45 segundos de timeout
    });

    console.log(`✅ Respuesta del servidor IA:`, response.data);

    // Detener el servidor IA inmediatamente después de generar la predicción
    stopIAServer();

    // Devolver la respuesta al frontend (adaptando el formato del servidor IA)
    const iaResponse = response.data;
    return res.status(200).json({
      success: true,
      prediction: iaResponse.prediccion || iaResponse.prediction || iaResponse,
      game: mappedGame,
      timestamp: new Date().toISOString(),
      source: 'ia_server',
      efficiency: 'start_stop_on_demand'
    });

  } catch (error: any) {
    console.error(`❌ Error al generar predicción para ${req.params.game}:`, error.message);
    
    // SIEMPRE detener el servidor IA en caso de error para liberar recursos
    stopIAServer();
    
    // Si hay error de conexión
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      return res.status(503).json({
        success: false,
        error: 'Servidor de IA temporalmente no disponible. Reintenta en unos segundos.',
        code: 'IA_SERVER_UNAVAILABLE'
      });
    }

    // Para otros errores, devolver respuesta de error
    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor al generar predicción',
      details: error.message
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
