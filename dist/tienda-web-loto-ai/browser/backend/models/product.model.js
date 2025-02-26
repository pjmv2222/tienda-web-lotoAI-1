"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const database_1 = require("../config/database");
exports.ProductModel = {
    async findAll() {
        const result = await database_1.pool.query('SELECT * FROM products');
        return result.rows;
    },
    async findById(id) {
        const result = await database_1.pool.query('SELECT * FROM products WHERE id = $1', [id]);
        return result.rows[0] || null;
    },
    async create(product) {
        const result = await database_1.pool.query('INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *', [product.name, product.description, product.price]);
        return result.rows[0];
    }
};
//# sourceMappingURL=product.model.js.map