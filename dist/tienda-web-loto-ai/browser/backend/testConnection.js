"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./config/database");
async function testConnection() {
    try {
        // Probar la conexión
        const client = await database_1.pool.connect();
        console.log('Conexión exitosa a PostgreSQL');
        // Probar la tabla users
        const result = await client.query('SELECT * FROM users');
        console.log('Tabla users accesible. Número de registros:', result.rows.length);
        client.release();
    }
    catch (error) {
        console.error('Error al conectar:', error);
    }
    finally {
        // Cerrar el pool
        await database_1.pool.end();
    }
}
testConnection();
//# sourceMappingURL=testConnection.js.map