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
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_service_1 = require("../services/auth.service");
const email_service_1 = require("../services/email.service");
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    // Añadir método para verificar si un email ya existe
    checkEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                if (!email) {
                    return res.status(400).json({
                        success: false,
                        message: 'El email es requerido'
                    });
                }
                // Verificar si el usuario existe
                const user = yield user_model_1.UserModel.findByEmail(email);
                // Devolver true si el email ya existe, false si no
                res.json(!!user);
            }
            catch (error) {
                console.error('Error al verificar email:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error al verificar email'
                });
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('='.repeat(50));
                console.log('Iniciando registro de usuario');
                const { email, password, nombre, apellido } = req.body;
                console.log('Datos recibidos:', { email, nombre, apellido, password: '***' });
                // Validar campos requeridos
                if (!email || !password || !nombre || !apellido) {
                    console.log('Campos faltantes:', {
                        email: !email,
                        password: !password,
                        nombre: !nombre,
                        apellido: !apellido
                    });
                    return res.status(400).json({
                        success: false,
                        message: 'Todos los campos son requeridos'
                    });
                }
                // Hash de la contraseña
                const password_hash = yield bcrypt_1.default.hash(password, 10);
                console.log('Contraseña hasheada correctamente');
                // Generar token de verificación
                console.log('JWT_SECRET usado para generar token:', process.env.JWT_SECRET || 'your-secret-key');
                const verificationToken = jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
                console.log('Token de verificación generado:', verificationToken);
                // Registrar usuario con password_hash
                const result = yield auth_service_1.AuthService.register({
                    email,
                    password_hash,
                    nombre,
                    apellido
                });
                console.log('Usuario registrado correctamente:', result.id);
                // Enviar email de verificación
                const emailSent = yield (0, email_service_1.sendVerificationEmail)(email, verificationToken);
                console.log('Email de verificación enviado:', emailSent ? 'Sí' : 'No');
                // Devolver respuesta en el formato que espera el frontend
                res.status(201).json({
                    id: result.id,
                    email,
                    nombre,
                    apellido,
                    verified: false,
                    role: 'user',
                    token: verificationToken
                });
            }
            catch (error) {
                console.error('Error en registro:', error);
                // Si el error es de duplicado de email
                if (error.code === '23505' && error.constraint === 'users_email_key') {
                    return res.status(409).json({
                        success: false,
                        message: 'Este email ya está registrado. Por favor, utiliza otro email o inicia sesión.'
                    });
                }
                // Cualquier otro error
                res.status(500).json({
                    success: false,
                    message: 'Error al registrar usuario'
                });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('='.repeat(50));
            console.log('Iniciando proceso de login en el controlador...');
            console.log('Headers recibidos:', req.headers);
            console.log('Body recibido:', req.body);
            console.log('='.repeat(50));
            try {
                const { email, password } = req.body;
                console.log('Datos extraídos:', { email, password: '***' });
                // Primero verificar si el usuario existe
                const user = yield user_model_1.UserModel.findByEmail(email);
                console.log('Usuario encontrado:', user ? 'Sí' : 'No');
                if (!user) {
                    console.log('Usuario no encontrado');
                    return res.status(404).json({
                        success: false,
                        message: 'No existe una cuenta con este email. ¿Deseas registrarte?',
                        code: 'USER_NOT_FOUND'
                    });
                }
                // Verificar la contraseña
                const isValidPassword = yield bcrypt_1.default.compare(password, user.password_hash);
                console.log('Contraseña válida:', isValidPassword);
                if (!isValidPassword) {
                    console.log('Contraseña incorrecta');
                    return res.status(401).json({
                        success: false,
                        message: 'Contraseña incorrecta',
                        code: 'INVALID_PASSWORD'
                    });
                }
                const token = auth_service_1.AuthService.generateToken(user.id);
                console.log('Token generado');
                // Excluir información sensible
                const { password_hash } = user, userWithoutPassword = __rest(user, ["password_hash"]);
                console.log('Enviando respuesta exitosa');
                res.json({
                    success: true,
                    token,
                    user: userWithoutPassword
                });
            }
            catch (error) {
                console.error('Error en login:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error al iniciar sesión',
                    code: 'SERVER_ERROR'
                });
            }
        });
    }
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id; // El middleware ya ha verificado el usuario
                const user = yield user_model_1.UserModel.findById(userId);
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: 'Usuario no encontrado'
                    });
                }
                // Excluir información sensible
                const { password_hash } = user, userWithoutPassword = __rest(user, ["password_hash"]);
                res.json({
                    success: true,
                    user: userWithoutPassword
                });
            }
            catch (error) {
                console.error('Error al obtener perfil:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error al obtener perfil'
                });
            }
        });
    }
    updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const { nombre, apellido, telefono } = req.body;
                const updatedUser = yield user_model_1.UserModel.update(userId, {
                    nombre,
                    apellido,
                    telefono
                });
                if (!updatedUser) {
                    return res.status(404).json({
                        success: false,
                        message: 'Usuario no encontrado'
                    });
                }
                // Excluir información sensible
                const { password_hash } = updatedUser, userWithoutPassword = __rest(updatedUser, ["password_hash"]);
                res.json({
                    success: true,
                    user: userWithoutPassword
                });
            }
            catch (error) {
                console.error('Error al actualizar perfil:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error al actualizar perfil'
                });
            }
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.userId;
                const { currentPassword, newPassword } = req.body;
                const user = yield user_model_1.UserModel.findById(userId);
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: 'Usuario no encontrado'
                    });
                }
                // Verificar contraseña actual
                const isValidPassword = yield bcrypt_1.default.compare(currentPassword, user.password_hash);
                if (!isValidPassword) {
                    return res.status(400).json({
                        success: false,
                        message: 'Contraseña actual incorrecta'
                    });
                }
                // Encriptar nueva contraseña
                const newPasswordHash = yield bcrypt_1.default.hash(newPassword, 10);
                yield user_model_1.UserModel.updatePassword(userId, newPasswordHash);
                res.json({
                    success: true,
                    message: 'Contraseña actualizada correctamente'
                });
            }
            catch (error) {
                console.error('Error al cambiar contraseña:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error al cambiar contraseña'
                });
            }
        });
    }
    deleteAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const deleted = yield user_model_1.UserModel.delete(userId);
                if (!deleted) {
                    return res.status(404).json({
                        success: false,
                        message: 'Usuario no encontrado'
                    });
                }
                res.json({
                    success: true,
                    message: 'Cuenta eliminada correctamente'
                });
            }
            catch (error) {
                console.error('Error al eliminar cuenta:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error al eliminar cuenta'
                });
            }
        });
    }
    verifyEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const user = yield user_model_1.UserModel.verifyEmail(email);
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
                console.error('Error en verificación de email:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error al verificar email'
                });
            }
        });
    }
    verifyEmailWithToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('='.repeat(50));
                console.log('Iniciando verificación de email con token');
                const { token } = req.params;
                console.log('Token recibido:', token);
                // Verificar el token
                console.log('JWT_SECRET:', process.env.JWT_SECRET || 'your_jwt_secret');
                try {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
                    console.log('Token decodificado exitosamente:', decoded);
                    const email = decoded.email;
                    console.log('Email extraído del token:', email);
                    // Buscar el usuario por email
                    const user = yield user_model_1.UserModel.findByEmail(email);
                    console.log('Usuario encontrado:', user ? 'Sí' : 'No');
                    if (!user) {
                        console.log('Usuario no encontrado:', email);
                        return res.status(404).json({
                            success: false,
                            message: 'Usuario no encontrado'
                        });
                    }
                    // Actualizar el estado de verificación del usuario
                    yield user_model_1.UserModel.verifyEmail(email);
                    console.log('Email verificado correctamente');
                    // Enviar respuesta exitosa
                    res.json({
                        success: true,
                        message: 'Email verificado correctamente'
                    });
                }
                catch (jwtError) {
                    console.error('Error al verificar el token JWT:', jwtError);
                    return res.status(400).json({
                        success: false,
                        message: 'Token inválido o expirado'
                    });
                }
            }
            catch (error) {
                console.error('Error general al verificar email con token:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error al verificar el email'
                });
            }
        });
    }
    requestPasswordReset(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                // Verificar si el usuario existe
                const user = yield user_model_1.UserModel.findByEmail(email);
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: 'Usuario no encontrado'
                    });
                }
                // Generar token de reset
                const resetToken = jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
                // Enviar email con el token
                yield (0, email_service_1.sendPasswordResetEmail)(email, resetToken);
                res.json({
                    success: true,
                    message: 'Se ha enviado un email con las instrucciones para restablecer tu contraseña'
                });
            }
            catch (error) {
                console.error('Error al solicitar reset de contraseña:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error al procesar la solicitud'
                });
            }
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, password } = req.body;
                // Verificar token
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
                const email = decoded.email;
                // Hash nueva contraseña
                const password_hash = yield bcrypt_1.default.hash(password, 10);
                // Actualizar contraseña usando el email
                const user = yield user_model_1.UserModel.updatePassword(email, password_hash);
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: 'Usuario no encontrado'
                    });
                }
                res.json({
                    success: true,
                    message: 'Contraseña actualizada correctamente'
                });
            }
            catch (error) {
                console.error('Error al resetear contraseña:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error al resetear contraseña'
                });
            }
        });
    }
}
exports.AuthController = AuthController;
