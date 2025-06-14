import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { AuthService } from '../services/auth.service';
import { sendVerificationEmail, sendPasswordResetEmail } from '../services/email.service';
import { UserModel } from '../models/user.model';
import jwt from 'jsonwebtoken';

export class AuthController {
  // Añadir método para verificar si un email ya existe
  async checkEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'El email es requerido'
        });
      }

      // Verificar si el usuario existe
      const user = await UserModel.findByEmail(email);

      // Devolver true si el email ya existe, false si no
      res.json(!!user);
    } catch (error) {
      console.error('Error al verificar email:', error);
      res.status(500).json({
        success: false,
        message: 'Error al verificar email'
      });
    }
  }

  async register(req: Request, res: Response) {
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
      const password_hash = await bcrypt.hash(password, 10);
      console.log('Contraseña hasheada correctamente');

      // Generar token de verificación
      console.log('JWT_SECRET usado para generar token:', process.env.JWT_SECRET || 'your-secret-key');
      const verificationToken = jwt.sign(
        { email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );
      console.log('Token de verificación generado:', verificationToken);

      // Registrar usuario con password_hash
      const result = await AuthService.register({
        email,
        password_hash,
        nombre,
        apellido
      });
      console.log('Usuario registrado correctamente:', result.id);

      // Enviar email de verificación
      const emailSent = await sendVerificationEmail(email, verificationToken);
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
    console.log('='.repeat(50));
    console.log('Iniciando proceso de login en el controlador...');
    console.log('Headers recibidos:', req.headers);
    console.log('Body recibido:', req.body);
    console.log('='.repeat(50));

    try {
      const { email, password } = req.body;
      console.log('Datos extraídos:', { email, password: '***' });

      // Primero verificar si el usuario existe
      const user = await UserModel.findByEmail(email);
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
      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      console.log('Contraseña válida:', isValidPassword);

      if (!isValidPassword) {
        console.log('Contraseña incorrecta');
        return res.status(401).json({
          success: false,
          message: 'Contraseña incorrecta',
          code: 'INVALID_PASSWORD'
        });
      }

      const token = AuthService.generateToken(user.id);
      console.log('Token generado');

      // Excluir información sensible
      const { password_hash, ...userWithoutPassword } = user;

      console.log('Enviando respuesta exitosa');
      res.json({
        success: true,
        token,
        user: userWithoutPassword
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({
        success: false,
        message: 'Error al iniciar sesión',
        code: 'SERVER_ERROR'
      });
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const userId = req.user.id; // El middleware ya ha verificado el usuario
      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }

      // Excluir información sensible
      const { password_hash, ...userWithoutPassword } = user;

      res.json({
        success: true,
        user: userWithoutPassword
      });
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener perfil'
      });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const { nombre, apellido, telefono } = req.body;

      const updatedUser = await UserModel.update(userId, {
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
      const { password_hash, ...userWithoutPassword } = updatedUser;

      res.json({
        success: true,
        user: userWithoutPassword
      });
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar perfil'
      });
    }
  }

  async changePassword(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const { currentPassword, newPassword } = req.body;

      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }

      // Verificar contraseña actual
      const isValidPassword = await bcrypt.compare(currentPassword, user.password_hash);
      if (!isValidPassword) {
        return res.status(400).json({
          success: false,
          message: 'Contraseña actual incorrecta'
        });
      }

      // Encriptar nueva contraseña
      const newPasswordHash = await bcrypt.hash(newPassword, 10);
      await UserModel.updatePassword(userId, newPasswordHash);

      res.json({
        success: true,
        message: 'Contraseña actualizada correctamente'
      });
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      res.status(500).json({
        success: false,
        message: 'Error al cambiar contraseña'
      });
    }
  }

  async deleteAccount(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const deleted = await UserModel.delete(userId);

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
    } catch (error) {
      console.error('Error al eliminar cuenta:', error);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar cuenta'
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
      console.log('='.repeat(50));
      console.log('Iniciando verificación de email con token');
      const { token } = req.params;
      console.log('Token recibido:', token);

      // Verificar el token
      console.log('JWT_SECRET:', process.env.JWT_SECRET || 'your_jwt_secret');
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret') as { email: string };
        console.log('Token decodificado exitosamente:', decoded);
        const email = decoded.email;
        console.log('Email extraído del token:', email);

        // Buscar el usuario por email
        const user = await UserModel.findByEmail(email);
        console.log('Usuario encontrado:', user ? 'Sí' : 'No');

        if (!user) {
          console.log('Usuario no encontrado:', email);
          return res.status(404).json({
            success: false,
            message: 'Usuario no encontrado'
          });
        }

        // Actualizar el estado de verificación del usuario
        await UserModel.verifyEmail(email);
        console.log('Email verificado correctamente');

        // Generar un nuevo token de autenticación para el usuario
        const authToken = AuthService.generateToken(user.id);
        console.log('Token de autenticación generado para el usuario verificado');

        // Excluir información sensible
        const { password_hash, ...userWithoutPassword } = user;

        // Enviar respuesta exitosa con token y datos del usuario
        res.json({
          success: true,
          message: 'Email verificado correctamente',
          token: authToken,
          user: userWithoutPassword
        });
      } catch (jwtError) {
        console.error('Error al verificar el token JWT:', jwtError);
        return res.status(400).json({
          success: false,
          message: 'Token inválido o expirado'
        });
      }
    } catch (error) {
      console.error('Error general al verificar email con token:', error);
      res.status(500).json({
        success: false,
        message: 'Error al verificar el email'
      });
    }
  }

  async requestPasswordReset(req: Request, res: Response) {
    try {
      const { email } = req.body;

      // Verificar si el usuario existe
      const user = await UserModel.findByEmail(email);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }

      // Generar token de reset
      const resetToken = jwt.sign(
        { email },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '1h' }
      );

      // Enviar email con el token
      await sendPasswordResetEmail(email, resetToken);

      res.json({
        success: true,
        message: 'Se ha enviado un email con las instrucciones para restablecer tu contraseña'
      });
    } catch (error) {
      console.error('Error al solicitar reset de contraseña:', error);
      res.status(500).json({
        success: false,
        message: 'Error al procesar la solicitud'
      });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { token, password } = req.body;

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret') as { email: string };
      const email = decoded.email;

      // Hash nueva contraseña
      const password_hash = await bcrypt.hash(password, 10);

      // Actualizar contraseña usando el email
      const user = await UserModel.updatePassword(email, password_hash);

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
    } catch (error) {
      console.error('Error al resetear contraseña:', error);
      res.status(500).json({
        success: false,
        message: 'Error al resetear contraseña'
      });
    }
  }
}