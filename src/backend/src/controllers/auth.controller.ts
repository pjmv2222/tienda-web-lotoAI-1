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

      // Enviar email de verificación
      await sendVerificationEmail(email, verificationToken);

      // Registrar usuario
      const result = await AuthService.register({
        email,
        password,
        ...userData
      });

      res.status(201).json({
        success: true,
        message: 'Usuario registrado. Por favor verifica tu email.'
      });
    } catch (error) {
      console.error('Error en registro:', error);
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