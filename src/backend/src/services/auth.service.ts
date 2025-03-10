import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { pool } from '../config/database';
import { sendVerificationEmail } from './email.service';

interface JwtPayload {
  userId: number;
}

export const AuthService = {
  async register(userData: any) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      console.log('Datos recibidos para registro:', userData);
      
      // Ajustamos la query para incluir el campo name
      const result = await pool.query(
        'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id',
        [
          userData.email, 
          hashedPassword,
          userData.nombre  // Asumiendo que el campo viene como 'nombre' del frontend
        ]
      );

      const jwtSecret: Secret = process.env.JWT_SECRET || 'your-secret-key';
      const verificationToken = jwt.sign(
        { userId: result.rows[0].id } as JwtPayload,
        jwtSecret
      );

      // Llamamos a sendVerificationEmail con ambos parámetros
      await sendVerificationEmail(userData.email, verificationToken);

      return {
        success: true,
        message: 'Usuario registrado. Por favor verifica tu email.'
      };
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  },

  async validateUser(email: string, password: string) {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    const user = result.rows[0];
    if (!user) return null;
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;
    
    return user;
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
