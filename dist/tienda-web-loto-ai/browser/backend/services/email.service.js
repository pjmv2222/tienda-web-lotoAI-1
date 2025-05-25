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
exports.sendVerificationEmail = sendVerificationEmail;
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const node_mailjet_1 = __importDefault(require("node-mailjet"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mailjet = new node_mailjet_1.default({
    apiKey: process.env.MAILJET_API_KEY || '6d0949fe3bebd9e83bdca5d4ec3e19db',
    apiSecret: process.env.MAILJET_API_SECRET || 'fcd11e866b78ed68526fd750a7bd6138'
});
function sendVerificationEmail(email, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4000';
            const verificationLink = `${frontendUrl}/verificar/${token}`;
            console.log('Link de verificación:', verificationLink);
            const result = yield mailjet.post('send', { version: 'v3.1' }).request({
                Messages: [
                    {
                        From: {
                            Email: "adm@loto-ia.com",
                            Name: "LotoIA"
                        },
                        To: [
                            {
                                Email: email,
                                Name: email
                            }
                        ],
                        Subject: "Verifica tu cuenta en LotoIA",
                        TextPart: "Por favor verifica tu cuenta de LotoIA",
                        HTMLPart: `
            <h3>Bienvenido a LotoIA</h3>
            <p>Por favor verifica tu cuenta haciendo clic en el siguiente enlace:</p>
            <a href="${verificationLink}">
              Verificar cuenta
            </a>
            <p>Este enlace expirará en 24 horas.</p>
            <p>Si no creaste esta cuenta, puedes ignorar este correo.</p>
            <p>Saludos,<br>El equipo de LotoIA</p>
          `
                    }
                ]
            });
            return true;
        }
        catch (error) {
            console.error('Error enviando email:', error);
            return false;
        }
    });
}
function sendPasswordResetEmail(email, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4000';
            const resetLink = `${frontendUrl}/reset-password/${token}`;
            const result = yield mailjet.post('send', { version: 'v3.1' }).request({
                Messages: [
                    {
                        From: {
                            Email: "adm@loto-ia.com",
                            Name: "LotoIA"
                        },
                        To: [
                            {
                                Email: email,
                                Name: email
                            }
                        ],
                        Subject: "Recuperación de contraseña en LotoIA",
                        TextPart: "Recupera tu contraseña en LotoIA",
                        HTMLPart: `
            <h3>Recuperación de contraseña en LotoIA</h3>
            <p>Has solicitado restablecer tu contraseña en LotoIA.</p>
            <p>Para completar el proceso, haz clic en el siguiente enlace:</p>
            <a href="${resetLink}">
              Restablecer contraseña
            </a>
            <p>Este enlace expirará en 1 hora.</p>
            <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
            <p>Saludos,<br>El equipo de LotoIA</p>
          `
                    }
                ]
            });
            console.log('Email de recuperación enviado a:', email);
            return true;
        }
        catch (error) {
            console.error('Error enviando email de recuperación:', error);
            return false;
        }
    });
}
