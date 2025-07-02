import { Request, Response } from 'express';
import { spawn, ChildProcess } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';

// Puerto fijo para el servidor IA unificado
const IA_SERVER_PORT = 5000;
const IA_SERVER_URL = `http://127.0.0.1:${IA_SERVER_PORT}`;
const IA_SERVER_SCRIPT = '/var/www/tienda-web-lotoAI-1/server-ia-unificado.py';

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

    // Iniciar el proceso Python
    iaServerProcess = spawn('python3', [IA_SERVER_SCRIPT], {
      env: {
        ...process.env,
        PORT: IA_SERVER_PORT.toString(),
        FLASK_ENV: 'production',
        PYTHONPATH: '/var/www/tienda-web-lotoAI-1',
        PYTHONUNBUFFERED: '1'
      },
      cwd: '/var/www/tienda-web-lotoAI-1',
      stdio: ['pipe', 'pipe', 'pipe']
    });

    console.log('🔧 Proceso spawn iniciado, PID:', iaServerProcess.pid);

    // Manejar la salida estándar
    iaServerProcess.stdout?.on('data', (data) => {
      const output = data.toString().trim();
      console.log(`[IA-Server STDOUT] ${output}`);
    });

    // Manejar la salida de error
    iaServerProcess.stderr?.on('data', (data) => {
      const errorOutput = data.toString().trim();
      console.error(`[IA-Server STDERR] ${errorOutput}`);
      // No rechazar inmediatamente por stderr - TensorFlow genera warnings normales
    });

    // Manejar el cierre del proceso
    iaServerProcess.on('close', (code, signal) => {
      console.log(`[IA-Server] Proceso terminado - Código: ${code}, Señal: ${signal}`);
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
  // Usar la misma clave secreta que el middleware de autenticación
  const SECRET_KEY = process.env['JWT_SECRET'] || 'your-secret-key';
  
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
  try {
    const { game } = req.params;
    console.log(`🎯 Solicitud de predicción para juego: ${game}`);
    console.log(`📁 Script IA ubicado en: ${IA_SERVER_SCRIPT}`);
    console.log(`📁 Script existe: ${fs.existsSync(IA_SERVER_SCRIPT)}`);

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

    // Detener el servidor IA después de generar la predicción (funcionamiento bajo demanda)
    setTimeout(() => {
      stopIAServer();
    }, 2000); // Esperar 2 segundos antes de detener

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
    console.error(`❌ Error al generar predicción para ${req.params.game}:`, {
      message: error.message,
      code: error.code,
      stack: error.stack,
      type: error.name,
      response: error.response?.data
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
      type: error.name
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
