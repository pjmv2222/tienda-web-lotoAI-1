"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const database_1 = require("../config/database");
exports.UserModel = {
    async findByEmail(email) {
        const result = await database_1.pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    },
    async create(user) {
        const result = await database_1.pool.query('INSERT INTO users (email, password, name, verified) VALUES ($1, $2, $3, false) RETURNING *', [user.email, user.password, user.name]);
        return result.rows[0];
    },
    async verifyEmail(email) {
        const result = await database_1.pool.query('UPDATE users SET verified = true WHERE email = $1 RETURNING *', [email]);
        return result.rows[0];
    }
};
//# sourceMappingURL=user.model.js.map