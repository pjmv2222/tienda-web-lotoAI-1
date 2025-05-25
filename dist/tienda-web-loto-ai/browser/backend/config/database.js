"use strict";
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
exports.pgPool = exports.initializeTables = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
// Cargar variables de entorno
dotenv_1.default.config();
// Configuración de PostgreSQL
const pgPool = new pg_1.Pool({
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DB || 'lotoai_dev',
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    max: 20, // Máximo número de conexiones
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
exports.pgPool = pgPool;
// Verificar conexión
pgPool.on('connect', () => {
    console.log('✅ Conectado a PostgreSQL');
});
pgPool.on('error', (err) => {
    console.error('❌ Error en PostgreSQL:', err);
});
// Función para inicializar las tablas si no existen
const initializeTables = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Crear tabla de usuarios si no existe
        yield pgPool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_verified BOOLEAN DEFAULT false,
        verification_token VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        // Crear tabla de suscripciones si no existe
        yield pgPool.query(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        plan_type VARCHAR(50) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(3) DEFAULT 'EUR',
        status VARCHAR(20) DEFAULT 'active',
        payment_intent_id VARCHAR(255),
        start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        end_date TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        // Crear tabla de pagos si no existe
        yield pgPool.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        subscription_id INTEGER REFERENCES subscriptions(id) ON DELETE SET NULL,
        payment_intent_id VARCHAR(255) UNIQUE NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(3) DEFAULT 'EUR',
        status VARCHAR(20) NOT NULL,
        payment_method VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        console.log('✅ Tablas de PostgreSQL inicializadas correctamente');
    }
    catch (error) {
        console.error('❌ Error inicializando tablas:', error);
        throw error;
    }
});
exports.initializeTables = initializeTables;
exports.default = pgPool;
