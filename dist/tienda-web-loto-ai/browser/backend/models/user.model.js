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
exports.UserModel = void 0;
const database_1 = require("../config/database");
exports.UserModel = {
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.pool.query('SELECT * FROM users WHERE email = $1', [email]);
            return result.rows[0];
        });
    },
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.pool.query('SELECT * FROM users WHERE id = $1', [id]);
            return result.rows[0];
        });
    },
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.pool.query(`INSERT INTO users (email, password_hash, nombre, apellido, verified, role)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`, [
                userData.email,
                userData.password_hash,
                userData.nombre,
                userData.apellido,
                false,
                'user'
            ]);
            return result.rows[0];
        });
    },
    update(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.pool.query(`UPDATE users 
       SET nombre = COALESCE($1, nombre),
           apellido = COALESCE($2, apellido),
           telefono = COALESCE($3, telefono)
       WHERE id = $4
       RETURNING *`, [
                userData.nombre,
                userData.apellido,
                userData.telefono,
                id
            ]);
            return result.rows[0];
        });
    },
    updatePassword(idOrEmail, password_hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = typeof idOrEmail === 'number'
                ? 'UPDATE users SET password_hash = $1 WHERE id = $2 RETURNING *'
                : 'UPDATE users SET password_hash = $1 WHERE email = $2 RETURNING *';
            const result = yield database_1.pool.query(query, [password_hash, idOrEmail]);
            return result.rows[0];
        });
    },
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
            return result.rows[0];
        });
    },
    verifyEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.pool.query('UPDATE users SET verified = true WHERE email = $1 RETURNING *', [email]);
            return result.rows[0];
        });
    }
};
