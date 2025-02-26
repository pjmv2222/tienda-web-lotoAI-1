"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const router = (0, express_1.Router)();
const productController = new product_controller_1.ProductController();
// Rutas de productos
router.get('/', productController.getAllProducts.bind(productController));
router.get('/:id', productController.getProductById.bind(productController));
exports.default = router;
//# sourceMappingURL=product.routes.js.map