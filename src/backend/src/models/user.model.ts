import { pool } from '../config/database';

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  verified: boolean;
  created_at: Date;
}

export const UserModel = {
  async findByEmail(email: string) {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  },

  async create(user: Omit<User, 'id' | 'created_at' | 'verified'>) {
    const result = await pool.query(
      'INSERT INTO users (email, password, name, verified) VALUES ($1, $2, $3, false) RETURNING *',
      [user.email, user.password, user.name]
    );
    return result.rows[0];
  },

  async verifyEmail(email: string) {
    const result = await pool.query(
      'UPDATE users SET verified = true WHERE email = $1 RETURNING *',
      [email]
    );
    return result.rows[0];
  }
}; 