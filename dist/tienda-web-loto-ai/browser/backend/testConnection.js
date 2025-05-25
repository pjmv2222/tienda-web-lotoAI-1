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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./config/database");
function testConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Probar la conexión
            const client = yield database_1.pool.connect();
            console.log('Conexión exitosa a PostgreSQL');
            // Probar la tabla users
            const result = yield client.query('SELECT * FROM users');
            console.log('Tabla users accesible. Número de registros:', result.rows.length);
            client.release();
        }
        catch (error) {
            console.error('Error al conectar:', error);
        }
        finally {
            // Cerrar el pool
            yield database_1.pool.end();
        }
    });
}
testConnection();
