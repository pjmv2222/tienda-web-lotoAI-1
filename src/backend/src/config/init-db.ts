import { Pool } from 'pg';
import { readFileSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

async function initializeDatabase() {
  // Primero conectamos al servidor PostgreSQL sin especificar una base de datos
  const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432')
  });

  try {
    // Intentar crear la base de datos si no existe
    await pool.query(`
      SELECT 'CREATE DATABASE ${process.env.DB_NAME}'
      WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${process.env.DB_NAME}')
    `);

    // Cerrar la conexión inicial
    await pool.end();

    // Crear una nueva conexión a la base de datos específica
    const dbPool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT || '5432')
    });

    // Leer y ejecutar el archivo schema.sql
    const schemaPath = join(__dirname, 'schema.sql');
    const schema = readFileSync(schemaPath, 'utf8');
    await dbPool.query(schema);

    console.log('Base de datos inicializada correctamente');
    await dbPool.end();
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    process.exit(1);
  }
}

initializeDatabase(); 