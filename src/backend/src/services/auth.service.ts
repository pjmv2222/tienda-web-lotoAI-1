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
      // Ya no necesitamos hashear aquí porque viene hasheado del controlador
      console.log('Datos recibidos para registro:', userData);
      
      const result = await pool.query(
        'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id',
        [
          userData.email, 
          userData.password_hash,  // Usamos password_hash en lugar de password
          userData.nombre
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
  },  // <-- Asegurarse de que hay una coma aquí

  async validateUser(email: string, password: string) {
    try {
      console.log('Validando usuario:', email);
      
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      
      const user = result.rows[0];
      if (!user) {
        console.log('Usuario no encontrado');
        return null;
      }
      
      const isValid = await bcrypt.compare(password, user.password_hash);
      console.log('Contraseña válida:', isValid);
      
      if (!isValid) return null;
      
      return {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        verified: user.verified,
        role: user.role
      };
    } catch (error) {
      console.error('Error en validateUser:', error);
      throw error;
    }
  },  // <-- Asegurarse de que hay una coma aquí

  generateToken(userId: number) {
    const jwtSecret: Secret = process.env.JWT_SECRET || 'your-secret-key';
    return jwt.sign(
      { userId } as JwtPayload,
      jwtSecret,
      { expiresIn: '24h' }
    );
  }  // <-- No necesita coma por ser el último método
};
