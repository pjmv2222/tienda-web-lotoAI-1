import { Request, Response } from 'express';
import { ProductModel } from '../models/product.model';

export const ProductController = {
  async getAll(req: Request, res: Response) {
    try {
      const products = await ProductModel.getAll();
      res.json(products);
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({ message: 'Error al obtener productos' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const product = await ProductModel.getById(id);
      
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      
      res.json(product);
    } catch (error) {
      console.error('Error al obtener producto:', error);
      res.status(500).json({ message: 'Error al obtener producto' });
    }
  }
}; 