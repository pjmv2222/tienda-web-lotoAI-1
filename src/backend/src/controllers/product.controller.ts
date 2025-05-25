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
      const id = parseInt(req.params.id);
      const product = await ProductModel.findById(id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }

      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      console.error('Error obteniendo producto:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener producto'
      });
    }
  }
} 