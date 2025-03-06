import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { AuthService } from '../services/auth.service';
import { sendVerificationEmail } from '../services/email.service';
import { UserModel } from '../models/user.model';
import jwt from 'jsonwebtoken';

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, ...userData } = req.body;

      // Generar token de verificación
      const verificationToken = jwt.sign(
        { email },
        process.env.JWT_SECRET || 'your-secret-key'
      );

      // Registrar usuario
      const result = await AuthService.register({
        email,
        password,
        ...userData
      });

      // Enviar email de verificación
      await sendVerificationEmail(email, verificationToken);

      res.status(201).json({
        success: true,
        message: 'Usuario registrado. Por favor verifica tu email.'
      });
    } catch (error: any) {
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
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await AuthService.validateUser(email, password);
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Email o contraseña incorrectos'
        });
      }

      const token = AuthService.generateToken(user.id);
      
      res.json({
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({
        success: false,
        message: 'Error al iniciar sesión'
      });
    }
  }

  async verifyEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await UserModel.verifyEmail(email);
      
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
    } catch (error) {
      console.error('Error en verificación:', error);
      res.status(500).json({
        success: false,
        message: 'Error al verificar email'
      });
    }
  }
} 