import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'adm-loto-ia',
  password: 'X&HCxgcryu66sa3#x39',
  database: 'Tienda-loto-ia',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
