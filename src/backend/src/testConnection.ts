import { pgPool } from './config/database';

async function testConnection() {
  try {
    // Probar la conexión
    const client = await pgPool.connect();
    console.log('Conexión exitosa a PostgreSQL');

    // Probar la tabla users
    const result = await client.query('SELECT * FROM users');
    console.log('Tabla users accesible. Número de registros:', result.rows.length);

    client.release();
  } catch (error) {
    console.error('Error al conectar:', error);
  } finally {
    // Cerrar el pool
    await pgPool.end();
  }
}

testConnection();
