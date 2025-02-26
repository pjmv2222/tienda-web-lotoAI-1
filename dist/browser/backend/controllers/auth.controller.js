"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const email_service_1 = require("../services/email.service");
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    async register(req, res) {
        try {
            const _a = req.body, { email, password } = _a, userData = __rest(_a, ["email", "password"]);
            // Generar token de verificación
            const verificationToken = jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET || 'your-secret-key');
            // Enviar email de verificación
            await (0, email_service_1.sendVerificationEmail)(email, verificationToken);
            // Registrar usuario
            const result = await auth_service_1.AuthService.register(Object.assign({ email,
                password }, userData));
            res.status(201).json({
                success: true,
                message: 'Usuario registrado. Por favor verifica tu email.'
            });
        }
        catch (error) {
            console.error('Error en registro:', error);
            res.status(500).json({
                success: false,
                message: 'Error al registrar usuario'
            });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await auth_service_1.AuthService.validateUser(email, password);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Email o contraseña incorrectos'
                });
            }
            const token = auth_service_1.AuthService.generateToken(user.id);
            res.json({
                success: true,
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            });
        }
        catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({
                success: false,
                message: 'Error al iniciar sesión'
            });
        }
    }
    async verifyEmail(req, res) {
        try {
            const { email } = req.body;
            const user = await user_model_1.UserModel.verifyEmail(email);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }
            res.json({
                success: true,
                message: 'Email verificado correctamente'
            });
        }
        catch (error) {
            console.error('Error en verificación:', error);
            res.status(500).json({
                success: false,
                message: 'Error al verificar email'
            });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map