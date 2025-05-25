
import { pgPool } from '../config/database';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  created_at: Date;
}

export const ProductModel = {
  async findAll(): Promise<Product[]> {
    const result = await pgPool.query('SELECT * FROM products');
    return result.rows;
  },
  async findById(id: number): Promise<Product | null> {
    const result = await pgPool.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  },
  async create(product: Omit<Product, 'id' | 'created_at'>): Promise<Product> {
    const result = await pgPool.query(
      'INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *',
      [product.name, product.description, product.price]
    );
    return result.rows[0];
  }
}; 