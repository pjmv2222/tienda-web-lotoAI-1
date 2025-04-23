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
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = require("../config/database");
const email_service_1 = require("./email.service");
exports.AuthService = {
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Datos recibidos para registro:', userData);
                const result = yield database_1.pool.query(`INSERT INTO users (
          email, 
          password_hash, 
          nombre, 
          apellido, 
          verified, 
          role
        ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, email, nombre, apellido, verified, role`, [
                    userData.email,
                    userData.password_hash,
                    userData.nombre,
                    userData.apellido,
                    false,
                    'user'
                ]);
                const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
                const verificationToken = jsonwebtoken_1.default.sign({ userId: result.rows[0].id }, jwtSecret);
                yield (0, email_service_1.sendVerificationEmail)(userData.email, verificationToken);
                return result.rows[0];
            }
            catch (error) {
                console.error('Error en registro:', error);
                throw error;
            }
        });
    },
    validateUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Validando usuario:', email);
                const result = yield database_1.pool.query('SELECT * FROM users WHERE email = $1', [email]);
                const user = result.rows[0];
                if (!user) {
                    console.log('Usuario no encontrado');
                    return null;
                }
                const isValidPassword = yield bcrypt_1.default.compare(password, user.password_hash);
                console.log('Contraseña válida:', isValidPassword);
                if (!isValidPassword)
                    return null;
                return user;
            }
            catch (error) {
                console.error('Error en validación de usuario:', error);
                throw error;
            }
        });
    },
    generateToken(userId) {
        const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
        return jsonwebtoken_1.default.sign({ userId }, jwtSecret, { expiresIn: '24h' });
    }
};
