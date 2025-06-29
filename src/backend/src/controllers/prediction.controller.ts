import { Request, Response } from 'express';
import { spawn, ChildProcess } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import axios from 'axios';

// Mapa para almacenar los procesos de los servidores Python
const pythonServers: { [key: string]: { 
  process: ChildProcess, 
  lastUsed: Date, 
  port: number,
  shutdownTimeout?: NodeJS.Timeout 
} } = {};

// Configuración de puertos para cada juego
const gamePorts: { [key: string]: number } = {
  'euromillon': 5001,
  'bonoloto': 5002,
  'eurodreams': 5003,
  'gordo-primitiva': 5004,
  'loteria-nacional': 5005,
  'lototurf': 5006,
  'primitiva': 5007
};

// Rutas a los scripts Python
const pythonScriptPaths: { [key: string]: string } = {
  'euromillon': path.resolve(__dirname, '../../../IAs-Loto/EuroMillon-CSV/server.py'),
  'bonoloto': path.resolve(__dirname, '../../../IAs-Loto/Bonoloto/server.py'),
  'eurodreams': path.resolve(__dirname, '../../../IAs-Loto/EuroDreams/server.py'),
  'gordo-primitiva': path.resolve(__dirname, '../../../IAs-Loto/GordoPrimitiva/server.py'),
  'loteria-nacional': path.resolve(__dirname, '../../../IAs-Loto/LOTERIA NACIONAL/server.py'),
  'lototurf': path.resolve(__dirname, '../../../IAs-Loto/Lototurf/server.py'),
  'primitiva': path.resolve(__dirname, '../../../IAs-Loto/LaPrimitiva/server.py')
};

// Tiempo de inactividad en milisegundos (5 minutos)
const INACTIVITY_TIMEOUT = 5 * 60 * 1000;

/**
 * Inicia un servidor Python para un juego específico
 * @param game Identificador del juego
 * @returns Promise que se resuelve cuando el servidor está listo
 */
async function startPythonServer(game: string): Promise<number> {
  return new Promise((resolve, reject) => {
    // Verificar si el servidor ya está en ejecución
    if (pythonServers[game] && pythonServers[game].process) {
      console.log(`Servidor Python para ${game} ya está en ejecución en el puerto ${pythonServers[game].port}`);
      pythonServers[game].lastUsed = new Date();
      resolve(pythonServers[game].port);
      return;
    }

    // Verificar que el juego es válido
    if (!gamePorts[game]) {
      reject(new Error(`Juego no válido: ${game}`));
      return;
    }

    // Verificar que el script Python existe
    const scriptPath = pythonScriptPaths[game];
    if (!fs.existsSync(scriptPath)) {
      reject(new Error(`Script Python no encontrado: ${scriptPath}`));
      return;
    }

    const port = gamePorts[game];
    console.log(`Iniciando servidor Python para ${game} en el puerto ${port}...`);

    // Iniciar el proceso Python
    const pythonProcess = spawn('python3', [scriptPath], {
      env: {
        ...process.env,
        PORT: port.toString(),
        SKIP_AUTH: 'true' // Para desarrollo, omitir la autenticación
      }
    });

    // Manejar la salida estándar
    pythonProcess.stdout.on('data', (data) => {
      console.log(`[${game}] ${data.toString().trim()}`);
    });

    // Manejar la salida de error
    pythonProcess.stderr.on('data', (data) => {
      console.error(`[${game}] Error: ${data.toString().trim()}`);
    });

    // Manejar el cierre del proceso
    pythonProcess.on('close', (code) => {
      console.log(`[${game}] Proceso terminado con código ${code}`);
      delete pythonServers[game];
    });

    // Almacenar el proceso en el mapa
    pythonServers[game] = {
      process: pythonProcess,
      lastUsed: new Date(),
      port
    };

    // Esperar a que el servidor esté listo (podría mejorar esto con una verificación real)
    setTimeout(() => {
      console.log(`Servidor Python para ${game} iniciado en el puerto ${port}`);
      resolve(port);
    }, 2000);
  });
}

/**
 * Detiene un servidor Python para un juego específico
 * @param game Identificador del juego
 */
function stopPythonServer(game: string): void {
  if (pythonServers[game] && pythonServers[game].process) {
    console.log(`Deteniendo servidor Python para ${game}...`);
    pythonServers[game].process.kill();
    delete pythonServers[game];
  }
}

/**
 * Programa el cierre automático de un servidor Python después del periodo de inactividad
 * @param game Identificador del juego
 */
function scheduleServerShutdown(game: string): void {
  if (!pythonServers[game]) return;

  // Cancelar timeout anterior si existe
  if (pythonServers[game].shutdownTimeout) {
    clearTimeout(pythonServers[game].shutdownTimeout);
  }

  // Programar nuevo timeout
  pythonServers[game].shutdownTimeout = setTimeout(() => {
    console.log(`Cerrando servidor Python para ${game} por inactividad...`);
    stopPythonServer(game);
  }, INACTIVITY_TIMEOUT);

  console.log(`Servidor Python para ${game} se cerrará en ${INACTIVITY_TIMEOUT / 1000} segundos si no hay actividad`);
}

/**
 * Detiene todos los servidores Python inactivos
 */
function cleanupInactiveServers(): void {
  const now = new Date();
  for (const [game, server] of Object.entries(pythonServers)) {
    const timeSinceLastUse = now.getTime() - server.lastUsed.getTime();
    if (timeSinceLastUse > INACTIVITY_TIMEOUT) {
      console.log(`Servidor Python para ${game} inactivo por ${timeSinceLastUse / 1000} segundos. Deteniendo...`);
      stopPythonServer(game);
    }
  }
}

// Iniciar un temporizador para limpiar servidores inactivos cada minuto
setInterval(cleanupInactiveServers, 60 * 1000);

/**
 * Controlador para obtener una predicción
 */
export const getPrediction = async (req: Request, res: Response) => {
    try {
        const { game } = req.params;
        console.log(`Solicitud de predicción para juego: ${game}`);

        // Iniciar el servidor Python para el juego específico
        const port = await startPythonServer(game);
        console.log(`Servidor Python iniciado en puerto: ${port}`);

        // Realizar la solicitud HTTP al servidor Python
        const response = await axios.post(`http://localhost:${port}/predict`, {
            input: [1, 2, 3, 4, 5, 6, 7] // Datos de entrada básicos
        }, {
            timeout: 30000 // 30 segundos de timeout
        });

        console.log(`Respuesta del servidor Python:`, response.data);

        // Programar el cierre del servidor después del periodo de inactividad
        scheduleServerShutdown(game);

        // Devolver la respuesta al frontend
        return res.status(200).json({
            success: true,
            prediction: response.data.prediction,
            game: game,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error(`Error al generar predicción para ${req.params.game}:`, error);
        
        // Si hay error, intentar limpiar el servidor
        const game = req.params.game;
        if (pythonServers[game]) {
            stopPythonServer(game);
        }

        return res.status(500).json({ 
            success: false,
            error: 'Error al generar la predicción',
            message: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};

/**
 * Controlador para verificar el estado de los servidores Python
 */
export const getServerStatus = async (req: Request, res: Response) => {
  try {
    const status = Object.entries(pythonServers).map(([game, server]) => ({
      game,
      port: server.port,
      lastUsed: server.lastUsed
    }));

    res.json({
      success: true,
      servers: status
    });
  } catch (error) {
    console.error('Error al obtener estado de servidores:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener estado de servidores',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};
