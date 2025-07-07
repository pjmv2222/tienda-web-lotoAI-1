import { Pool } from 'pg';
import * as dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Configuración de PostgreSQL
const pgPool = new Pool({
  user: process.env['POSTGRES_USER'] || 'postgres',
  password: process.env['POSTGRES_PASSWORD'],
  host: process.env['POSTGRES_HOST'] || 'localhost',
  database: process.env['POSTGRES_DB'] || 'lotoai_dev',
  port: parseInt(process.env['POSTGRES_PORT'] || '5432'),
  max: 20, // Máximo número de conexiones
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Verificar conexión
pgPool.on('connect', () => {
  console.log('✅ Conectado a PostgreSQL');
});

pgPool.on('error', (err: Error) => {
  console.error('❌ Error en PostgreSQL:', err);
  process.exit(-1);
});

// Función para inicializar las tablas si no existen
export const initializeTables = async (): Promise<void> => {
  try {
    // Crear tabla de usuarios si no existe
    await pgPool.query(`
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
    await pgPool.query(`
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
    await pgPool.query(`
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

    // Crear tabla de predicciones de usuario si no existe
    await pgPool.query(`
      CREATE TABLE IF NOT EXISTS user_predictions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        game_type VARCHAR(50) NOT NULL,
        prediction_data JSONB NOT NULL,
        prediction_date DATE NOT NULL DEFAULT CURRENT_DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Crear índices para optimizar consultas
    await pgPool.query(`
      CREATE INDEX IF NOT EXISTS idx_user_predictions_user_game_date 
      ON user_predictions(user_id, game_type, prediction_date);
    `);

    await pgPool.query(`
      CREATE INDEX IF NOT EXISTS idx_user_predictions_date 
      ON user_predictions(prediction_date);
    `);

    console.log('✅ Tablas de PostgreSQL inicializadas correctamente');
  } catch (error) {
    console.error('❌ Error inicializando tablas:', error);
    throw error;
  }
};

export { pgPool };
export default pgPool;
