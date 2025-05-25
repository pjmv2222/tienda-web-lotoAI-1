import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { pgPool } from '../config/database';
import { sendVerificationEmail } from './email.service';

interface JwtPayload {
  userId: number;
}

export const AuthService = {
  async register(userData: any) {
    try {
      console.log('Datos recibidos para registro:', userData);
        const result = await pgPool.query(
        `INSERT INTO users (
          email, 
          password_hash, 
          nombre, 
          apellido, 
          verified, 
          role
        ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, email, nombre, apellido, verified, role`,
        [
          userData.email,
          userData.password_hash,
          userData.nombre,
          userData.apellido,
          false,
          'user'
        ]
      );

      const jwtSecret: Secret = process.env.JWT_SECRET || 'your-secret-key';
      const verificationToken = jwt.sign(
        { userId: result.rows[0].id } as JwtPayload,
        jwtSecret
      );

      await sendVerificationEmail(userData.email, verificationToken);

      return result.rows[0];
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  },

  async validateUser(email: string, password: string) {
    try {
      console.log('Validando usuario:', email);
        const result = await pgPool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      
      const user = result.rows[0];
      if (!user) {
        console.log('Usuario no encontrado');
        return null;
      }
      
      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      console.log('Contraseña válida:', isValidPassword);
      
      if (!isValidPassword) return null;
      
      return user;
    } catch (error) {
      console.error('Error en validación de usuario:', error);
      throw error;
    }
  },

  generateToken(userId: number) {
    const jwtSecret: Secret = process.env.JWT_SECRET || 'your-secret-key';
    return jwt.sign(
      { userId } as JwtPayload,
      jwtSecret,
      { expiresIn: '24h' }
    );
  }
};
