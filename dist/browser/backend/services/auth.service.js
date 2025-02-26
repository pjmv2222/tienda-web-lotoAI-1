"use strict";
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
    async register(userData) {
        try {
            const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
            // Ajustamos la query para incluir el campo name
            const result = await database_1.pool.query('INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id', [
                userData.email,
                hashedPassword,
                userData.nombre // Asumiendo que el campo viene como 'nombre' del frontend
            ]);
            const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
            const verificationToken = jsonwebtoken_1.default.sign({ userId: result.rows[0].id }, jwtSecret);
            // Llamamos a sendVerificationEmail con ambos parámetros
            await (0, email_service_1.sendVerificationEmail)(userData.email, verificationToken);
            return {
                success: true,
                message: 'Usuario registrado. Por favor verifica tu email.'
            };
        }
        catch (error) {
            console.error('Error en registro:', error);
            throw error;
        }
    },
    async validateUser(email, password) {
        const result = await database_1.pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];
        if (!user)
            return null;
        const isValid = await bcrypt_1.default.compare(password, user.password);
        if (!isValid)
            return null;
        return user;
    },
    generateToken(userId) {
        const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
        return jsonwebtoken_1.default.sign({ userId }, jwtSecret, { expiresIn: '24h' });
    }
};
//# sourceMappingURL=auth.service.js.map