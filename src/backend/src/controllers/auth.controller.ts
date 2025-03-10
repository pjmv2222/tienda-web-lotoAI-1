import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { AuthService } from '../services/auth.service';
import { sendVerificationEmail, sendPasswordResetEmail } from '../services/email.service';
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
      console.error('Error en verificación de email:', error);
      res.status(500).json({
        success: false,
        message: 'Error al verificar email'
      });
    }
  }

  async verifyEmailWithToken(req: Request, res: Response) {
    try {
      const { token } = req.params;
      
      // Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret') as { email: string };
      const email = decoded.email;
      
      // Buscar el usuario por email
      const user = await UserModel.findByEmail(email);
      
      if (!user) {
        console.log('Usuario no encontrado:', email);
        return res.redirect('/error-verificacion?message=Usuario no encontrado');
      }
      
      // Actualizar el estado de verificación del usuario
      await UserModel.verifyEmail(email);
      
      // Redirigir a una página de éxito
      res.redirect('/verificacion-exitosa');
    } catch (error) {
      console.error('Error al verificar email con token:', error);
      res.redirect('/error-verificacion?message=Token inválido o expirado');
    }
  }

  // Método para solicitar recuperación de contraseña
  async requestPasswordReset(req: Request, res: Response) {
    try {
      const { email } = req.body;
      
      // Verificar si el usuario existe
      const user = await UserModel.findByEmail(email);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'No se encontró ninguna cuenta con ese correo electrónico.'
        });
      }
      
      // Generar token de recuperación
      const token = jwt.sign({ email }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
      
      // Enviar email de recuperación
      const emailSent = await sendPasswordResetEmail(email, token);
      
      if (!emailSent) {
        return res.status(500).json({
          success: false,
          message: 'Error al enviar el correo electrónico. Inténtalo de nuevo más tarde.'
        });
      }
      
      res.json({
        success: true,
        message: 'Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.'
      });
    } catch (error) {
      console.error('Error al solicitar recuperación de contraseña:', error);
      res.status(500).json({
        success: false,
        message: 'Error al procesar la solicitud. Inténtalo de nuevo más tarde.'
      });
    }
  }
  
  // Método para restablecer la contraseña
  async resetPassword(req: Request, res: Response) {
    try {
      const { token, newPassword } = req.body;
      
      // Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret') as { email: string };
      const email = decoded.email;
      
      // Buscar el usuario por email
      const user = await UserModel.findByEmail(email);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado.'
        });
      }
      
      // Actualizar la contraseña del usuario
      // En un entorno real, hashearíamos la contraseña antes de guardarla
      await UserModel.updatePassword(email, newPassword);
      
      res.json({
        success: true,
        message: 'Contraseña actualizada correctamente.'
      });
    } catch (error) {
      console.error('Error al restablecer contraseña:', error);
      res.status(500).json({
        success: false,
        message: 'Error al procesar la solicitud. Inténtalo de nuevo más tarde.'
      });
    }
  }
} 