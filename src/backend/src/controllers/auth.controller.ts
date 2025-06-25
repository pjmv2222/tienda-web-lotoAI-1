import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { AuthService } from '../services/auth.service';
import { sendVerificationEmail, sendPasswordResetEmail } from '../services/email.service';
import { UserModel } from '../models/user.model';
import jwt from 'jsonwebtoken';
import pgPool from '../config/database';

export class AuthController {
  // Añadir método para verificar si un email ya existe
  async checkEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const result = await pgPool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (result.rows.length > 0) {
        return res.status(200).json({ exists: true });
      } else {
        return res.status(200).json({ exists: false });
      }
    } catch (error) {
      console.error('Error in checkEmail:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async register(req: Request, res: Response) {
    try {
      console.log('[Auth Route] Recibida petición de registro:', req.body);
      const { nombre, apellido, email, password, telefono } = req.body;
      
      // Combinar nombre y apellido en el campo name
      const fullName = `${nombre} ${apellido}`.trim();
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser = await pgPool.query(
        'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
        [fullName, email, hashedPassword]
      );

      const user = newUser.rows[0];

      // Generar token de verificación de email
      const verificationToken = jwt.sign(
        { userId: user.id },
        process.env['JWT_SECRET'] || 'your-secret-key',
        { expiresIn: '24h' }
      );

      // Enviar email de verificación
      console.log('Intentando enviar email de verificación a:', user.email);
      const emailSent = await sendVerificationEmail(user.email, verificationToken);
      
      if (!emailSent) {
        console.error('Error: No se pudo enviar el email de verificación');
        // Aún así, devolvemos éxito porque el usuario se registró correctamente
        return res.status(201).json({
          message: 'User registered successfully. However, there was an issue sending the verification email. Please contact support.',
        });
      }

      console.log('Email de verificación enviado exitosamente a:', user.email);
      
      // NO devolver token de sesión, el usuario debe verificar su email primero
      return res.status(201).json({
        message: 'User registered successfully. Please check your email to verify your account.',
      });
    } catch (error) {
      console.error('Error in register:', error);
      if ((error as any).code === '23505') { // Unique violation
        return res.status(409).json({ message: 'Email already exists' });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await pgPool.query('SELECT * FROM users WHERE email = $1', [email]);

      if (result.rows.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = result.rows[0];

      // Comprobar si el usuario ha verificado su email
      if (!user.is_verified) {
        return res.status(403).json({ 
          message: 'Please verify your email before logging in.',
          email: user.email,
          needsVerification: true
        });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env['JWT_SECRET'] || 'your-secret-key',
        { expiresIn: '1h' }
      );

      return res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      });
    } catch (error) {
      console.error('Error in login:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // Retornar solo los campos necesarios
      const { id, email, nombre, apellido, telefono, is_verified, role } = user;
      return res.status(200).json({ id, email, nombre, apellido, telefono, is_verified, role });
    } catch (error) {
      console.error('Error en getProfile:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const { nombre, apellido, telefono } = req.body;

      const updatedUser = await UserModel.update(userId, { nombre, apellido, telefono });

      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // Retornar solo los campos actualizados
      const { id, email, nombre: n, apellido: a, telefono: t, is_verified, role } = updatedUser;
      return res.status(200).json({ id, email, nombre: n, apellido: a, telefono: t, is_verified, role });
    } catch (error) {
      console.error('Error en updateProfile:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  async changePassword(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const { oldPassword, newPassword } = req.body;

      const userResult = await pgPool.query('SELECT password_hash FROM users WHERE id = $1', [userId]);
      if (userResult.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = userResult.rows[0];
      const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid old password' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await pgPool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [hashedPassword, userId]);

      return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error('Error in changePassword:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteAccount(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const deletedUser = await UserModel.delete(userId);

      if (!deletedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      return res.status(200).json({ message: 'Cuenta eliminada exitosamente' });
    } catch (error) {
      console.error('Error en deleteAccount:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  async verifyEmail(req: Request, res: Response) {
    try {
      const { token } = req.query;
      // ... (lógica de verificación)
      return res.status(200).send("Email verified");
    } catch (error) {
      console.error('Error in verifyEmail:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  async verifyEmailWithToken(req: Request, res: Response) {
    try {
      const { token } = req.params;
      console.log('Received token:', token);
  
      if (!token) {
        return res.status(400).json({ message: 'Verification token is missing.' });
      }
  
      console.log('JWT_SECRET:', process.env['JWT_SECRET'] || 'your_jwt_secret');
  
      const decoded = jwt.verify(token, process.env['JWT_SECRET'] || 'your_jwt_secret') as { userId: number };
      const userId = decoded.userId;
  
      const userResult = await pgPool.query('SELECT * FROM users WHERE id = $1', [userId]);
      if (userResult.rows.length === 0) {
        return res.status(404).json({ message: 'User not found.' });
      }

      const user = userResult.rows[0];

      // Verificar si ya está verificado
      if (user.is_verified) {
        return res.status(200).json({ 
          message: 'Email already verified',
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          }
        });
      }
  
      await pgPool.query('UPDATE users SET is_verified = true WHERE id = $1', [userId]);

      // Generar nuevo token de sesión
      const sessionToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env['JWT_SECRET'] || 'your-secret-key',
        { expiresIn: '1h' }
      );

      // Devolver respuesta JSON con usuario y token
      return res.status(200).json({
        message: 'Email verified successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token: sessionToken
      });
    } catch (error) {
      console.error('Error verifying email:', error);
      return res.status(500).json({ message: 'Error verifying email. The link may have expired.' });
    }
  }

  async requestPasswordReset(req: Request, res: Response) {
    try {
        // ... (lógica)
        return res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error('Error in requestPasswordReset:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
        const { token } = req.params;
        const { password } = req.body;
    
        const decoded = jwt.verify(token, process.env['JWT_SECRET'] || 'your_jwt_secret') as { userId: number };
        const userId = decoded.userId;
    
        const hashedPassword = await bcrypt.hash(password, 10);
        await pgPool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [hashedPassword, userId]);
    
        return res.status(200).json({ message: 'Password has been reset successfully.' });
    } catch (error) {
        console.error('Error in resetPassword:', error);
        return res.status(500).json({ message: 'Error resetting password.' });
    }
  }

  async resendVerificationEmail(req: Request, res: Response) {
    try {
      console.log('[resendVerificationEmail] Iniciando proceso de reenvío');
      console.log('[resendVerificationEmail] Request body:', req.body);
      
      const { email } = req.body;
      
      if (!email) {
        console.error('[resendVerificationEmail] Email no proporcionado');
        return res.status(400).json({ message: 'Email is required' });
      }
      
      console.log('[resendVerificationEmail] Buscando usuario con email:', email);
      
      // Buscar el usuario
      const result = await pgPool.query('SELECT * FROM users WHERE email = $1', [email]);
      console.log('[resendVerificationEmail] Resultado de búsqueda:', result.rows.length, 'usuarios encontrados');
      
      if (result.rows.length === 0) {
        console.error('[resendVerificationEmail] Usuario no encontrado');
        return res.status(404).json({ message: 'User not found' });
      }

      const user = result.rows[0];
      console.log('[resendVerificationEmail] Usuario encontrado:', { id: user.id, email: user.email, is_verified: user.is_verified });

      // Verificar si el usuario ya está verificado
      if (user.is_verified) {
        console.log('[resendVerificationEmail] Usuario ya verificado');
        return res.status(400).json({ message: 'Email is already verified' });
      }

      console.log('[resendVerificationEmail] Generando token de verificación');
      
      // Generar nuevo token de verificación
      const verificationToken = jwt.sign(
        { userId: user.id },
        process.env['JWT_SECRET'] || 'your-secret-key',
        { expiresIn: '24h' }
      );

      console.log('[resendVerificationEmail] Token generado, enviando email a:', user.email);
      
      // Enviar nuevo email de verificación
      const emailSent = await sendVerificationEmail(user.email, verificationToken);
      
      console.log('[resendVerificationEmail] Resultado del envío de email:', emailSent);
      
      if (!emailSent) {
        console.error('[resendVerificationEmail] Error: No se pudo reenviar el email de verificación');
        return res.status(500).json({
          message: 'Could not send verification email. Please try again later.',
        });
      }

      console.log('[resendVerificationEmail] Email de verificación reenviado exitosamente a:', user.email);
      return res.status(200).json({
        message: 'Verification email has been resent. Please check your inbox.',
      });
    } catch (error) {
      console.error('[resendVerificationEmail] Error completo:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : 'No stack trace',
        error: error
      });
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}