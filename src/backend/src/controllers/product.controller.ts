import { Request, Response } from 'express';
import { ProductModel } from '../models/product.model';

export class ProductController {
  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await ProductModel.findAll();
      res.json({
        success: true,
        data: products
      });
    } catch (error) {
      console.error('Error obteniendo productos:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener productos'
      });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params['id']);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }

      const product = await ProductModel.findById(id);

      if (product) {
        return res.status(200).json(product);
      } else {
        return res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      console.error('Error in getProductById:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
} 