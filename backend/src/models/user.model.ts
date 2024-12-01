import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface User extends RowDataPacket {
  id?: number;
  email: string;
  password: string;
  name: string;
  created_at?: Date;
}

export const UserModel = {
  async create(user: Omit<User, 'id' | 'created_at'>) {
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
      [user.email, user.password, user.name]
    );
    return result;
  },

  async findByEmail(email: string) {
    const [rows] = await pool.execute<User[]>(
      'SELECT * FROM users WHERE email = ?', 
      [email]
    );
    return rows[0];
  }
}; 