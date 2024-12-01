import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface Product extends RowDataPacket {
  id?: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  stock: number;
  created_at?: Date;
}

export const ProductModel = {
  async getAll() {
    const [rows] = await pool.execute<Product[]>('SELECT * FROM products');
    return rows;
  },

  async getById(id: number) {
    const [rows] = await pool.execute<Product[]>(
      'SELECT * FROM products WHERE id = ?', 
      [id]
    );
    return rows[0];
  },

  async create(product: Omit<Product, 'id' | 'created_at'>) {
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO products (name, description, price, image_url, stock) VALUES (?, ?, ?, ?, ?)',
      [product.name, product.description, product.price, product.image_url, product.stock]
    );
    return result;
  }
}; 