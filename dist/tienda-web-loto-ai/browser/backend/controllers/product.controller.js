"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_model_1 = require("../models/product.model");
class ProductController {
    getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield product_model_1.ProductModel.findAll();
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
        });
    }
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const product = yield product_model_1.ProductModel.findById(id);
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
        });
    }
}
exports.ProductController = ProductController;
