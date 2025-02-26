"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_model_1 = require("../models/product.model");
class ProductController {
    async getAllProducts(req, res) {
        try {
            const products = await product_model_1.ProductModel.findAll();
            res.json({
                success: true,
                data: products
            });
        }
        catch (error) {
            console.error('Error obteniendo productos:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener productos'
            });
        }
    }
    async getProductById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const product = await product_model_1.ProductModel.findById(id);
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
        }
        catch (error) {
            console.error('Error obteniendo producto:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener producto'
            });
        }
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map