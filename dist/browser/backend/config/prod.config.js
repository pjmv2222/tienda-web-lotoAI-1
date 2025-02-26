"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverConfig = exports.dbConfig = void 0;
exports.dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'adm-loto-ia',
    password: 'tu_contraseña',
    database: 'Tienda-loto-ia'
};
exports.serverConfig = {
    port: Number(process.env.PORT) || 8080,
    cors: {
        origin: ['https://www.loto-ia.com'],
        credentials: true
    }
};
//# sourceMappingURL=prod.config.js.map