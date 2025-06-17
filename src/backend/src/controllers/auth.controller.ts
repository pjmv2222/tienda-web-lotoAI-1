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
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await pgPool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, hashedPassword]
      );

      const user = newUser.rows[0];
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env['JWT_SECRET'] || 'your-secret-key',
        { expiresIn: '1h' }
      );

      console.log('JWT_SECRET para generar token:', process.env['JWT_SECRET'] || 'your-secret-key');

      return res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
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
      const isMatch = await bcrypt.compare(password, user.password);

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
      const result = await pgPool.query('SELECT id, name, email FROM users WHERE id = $1', [userId]);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error in getProfile:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const { name, email } = req.body;

      const result = await pgPool.query(
        'UPDATE users SET name = $1, email = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING id, name, email',
        [name, email, userId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error in updateProfile:', error);
      if ((error as any).code === '23505') {
        return res.status(409).json({ message: 'Email already exists' });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async changePassword(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const { oldPassword, newPassword } = req.body;

      const userResult = await pgPool.query('SELECT password FROM users WHERE id = $1', [userId]);
      if (userResult.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = userResult.rows[0];
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid old password' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await pgPool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, userId]);

      return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error('Error in changePassword:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteAccount(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const result = await pgPool.query('DELETE FROM users WHERE id = $1', [userId]);

      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
      console.error('Error in deleteAccount:', error);
      return res.status(500).json({ message: 'Internal server error' });
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
        return res.status(400).send('Verification token is missing.');
      }
  
      console.log('JWT_SECRET:', process.env['JWT_SECRET'] || 'your_jwt_secret');
  
      const decoded = jwt.verify(token, process.env['JWT_SECRET'] || 'your_jwt_secret') as { userId: number };
      const userId = decoded.userId;
  
      const userResult = await pgPool.query('SELECT * FROM users WHERE id = $1', [userId]);
      if (userResult.rows.length === 0) {
        return res.status(404).send('User not found.');
      }
  
      await pgPool.query('UPDATE users SET is_verified = true WHERE id = $1', [userId]);
  
      // Redirigir a una página de éxito
      return res.redirect('/email-verificado');
    } catch (error) {
      console.error('Error verifying email:', error);
      return res.status(500).send('Error verifying email. The link may have expired.');
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
        await pgPool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, userId]);
    
        return res.status(200).json({ message: 'Password has been reset successfully.' });
    } catch (error) {
        console.error('Error in resetPassword:', error);
        return res.status(500).json({ message: 'Error resetting password.' });
    }
  }
}