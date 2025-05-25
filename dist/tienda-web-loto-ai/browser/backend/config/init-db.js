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
const pg_1 = require("pg");
const fs_1 = require("fs");
const path_1 = require("path");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function initializeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        // Primero conectamos al servidor PostgreSQL sin especificar una base de datos
        const pool = new pg_1.Pool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT || '5432')
        });
        try {
            // Intentar crear la base de datos si no existe
            yield pool.query(`
      SELECT 'CREATE DATABASE ${process.env.DB_NAME}'
      WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${process.env.DB_NAME}')
    `);
            // Cerrar la conexión inicial
            yield pool.end();
            // Crear una nueva conexión a la base de datos específica
            const dbPool = new pg_1.Pool({
                host: process.env.DB_HOST || 'localhost',
                user: process.env.DB_USER || 'postgres',
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                port: parseInt(process.env.DB_PORT || '5432')
            });
            // Leer y ejecutar el archivo schema.sql
            const schemaPath = (0, path_1.join)(__dirname, 'schema.sql');
            const schema = (0, fs_1.readFileSync)(schemaPath, 'utf8');
            yield dbPool.query(schema);
            console.log('Base de datos inicializada correctamente');
            yield dbPool.end();
        }
        catch (error) {
            console.error('Error al inicializar la base de datos:', error);
            process.exit(1);
        }
    });
}
initializeDatabase();
