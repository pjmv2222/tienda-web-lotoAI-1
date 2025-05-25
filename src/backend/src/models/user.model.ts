import { pgPool } from '../config/database';

export interface User {
  id: number;
  email: string;
  password_hash: string;
  nombre: string;
  apellido: string;
  telefono?: string;
  verified: boolean;
  role: string;
  created_at?: Date;
}

export const UserModel = {
  async findByEmail(email: string) {
    const result = await pgPool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  },

  async findById(id: number) {
    const result = await pgPool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  async create(userData: any) {
    const result = await pgPool.query(
      `INSERT INTO users (email, password_hash, nombre, apellido, verified, role)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        userData.email,
        userData.password_hash,
        userData.nombre,
        userData.apellido,
        false,
        'user'
      ]
    );
    return result.rows[0];
  },

  async update(id: number, userData: Partial<User>) {
    const result = await pgPool.query(
      `UPDATE users 
       SET nombre = COALESCE($1, nombre),
           apellido = COALESCE($2, apellido),
           telefono = COALESCE($3, telefono)
       WHERE id = $4
       RETURNING *`,
      [
        userData.nombre,
        userData.apellido,
        userData.telefono,
        id
      ]
    );
    return result.rows[0];
  },

  async updatePassword(idOrEmail: number | string, password_hash: string) {
    const query = typeof idOrEmail === 'number' 
      ? 'UPDATE users SET password_hash = $1 WHERE id = $2 RETURNING *'
      : 'UPDATE users SET password_hash = $1 WHERE email = $2 RETURNING *';
    
    const result = await pgPool.query(query, [password_hash, idOrEmail]);
    return result.rows[0];
  },

  async delete(id: number) {
    const result = await pgPool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  },

  async verifyEmail(email: string) {
    const result = await pgPool.query(
      'UPDATE users SET verified = true WHERE email = $1 RETURNING *',
      [email]
    );
    return result.rows[0];
  }
};