"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerStatus = exports.getPrediction = void 0;
const child_process_1 = require("child_process");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const axios_1 = __importDefault(require("axios"));
// Mapa para almacenar los procesos de los servidores Python
const pythonServers = {};
// Configuración de puertos para cada juego
const gamePorts = {
    'euromillon': 5001,
    'bonoloto': 5002,
    'eurodreams': 5003,
    'gordo-primitiva': 5004,
    'loteria-nacional': 5005,
    'lototurf': 5006,
    'primitiva': 5007
};
// Rutas a los scripts Python
const pythonScriptPaths = {
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
function startPythonServer(game) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const pythonProcess = (0, child_process_1.spawn)('python3', [scriptPath], {
                env: Object.assign(Object.assign({}, process.env), { PORT: port.toString(), SKIP_AUTH: 'true' // Para desarrollo, omitir la autenticación
                 })
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
    });
}
/**
 * Detiene un servidor Python para un juego específico
 * @param game Identificador del juego
 */
function stopPythonServer(game) {
    if (pythonServers[game] && pythonServers[game].process) {
        console.log(`Deteniendo servidor Python para ${game}...`);
        pythonServers[game].process.kill();
        delete pythonServers[game];
    }
}
/**
 * Detiene todos los servidores Python inactivos
 */
function cleanupInactiveServers() {
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
const getPrediction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { game } = req.params;
        const userId = req.user.id;
        console.log(`Solicitud de predicción para ${game} del usuario ${userId}`);
        // Verificar que el juego es válido
        const validGames = Object.keys(gamePorts);
        if (!validGames.includes(game)) {
            return res.status(400).json({
                success: false,
                message: 'Juego no válido'
            });
        }
        // Iniciar el servidor Python si no está en ejecución
        const port = yield startPythonServer(game);
        // Realizar la solicitud a la API de IA
        const response = yield axios_1.default.post(`http://localhost:${port}/predict`, {
            input: [1, 2, 3, 4, 5, 6, 7] // Datos de entrada para la IA (podrían ser personalizados)
        });
        // Devolver la respuesta al cliente
        res.json({
            success: true,
            message: `Predicción para ${game} obtenida correctamente`,
            prediction: response.data.prediction || response.data
        });
    }
    catch (error) {
        console.error('Error al obtener predicción:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener predicción',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
exports.getPrediction = getPrediction;
/**
 * Controlador para verificar el estado de los servidores Python
 */
const getServerStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    catch (error) {
        console.error('Error al obtener estado de servidores:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener estado de servidores',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
exports.getServerStatus = getServerStatus;
