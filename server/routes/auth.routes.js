const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const authenticateToken = require('../middleware/auth');

// Configurar conexión a PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'lotoia',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { email, password, nombre, apellido } = req.body;
    
    // Verificar si el usuario ya existe
    const checkUserQuery = 'SELECT id FROM users WHERE email = $1';
    const existingUser = await pool.query(checkUserQuery, [email]);
    
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }
    
    // Hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Crear usuario
    const createUserQuery = `
      INSERT INTO users (email, password_hash, nombre, apellido, created_at)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING id, email, nombre, apellido, created_at
    `;
    
    const newUser = await pool.query(createUserQuery, [email, hashedPassword, nombre, apellido]);
    const user = newUser.rows[0];
    
    // Crear token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, nombre: user.nombre, apellido: user.apellido },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    
    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        token: token
      }
    });
    
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Buscar usuario
    const getUserQuery = 'SELECT id, email, password_hash, nombre, apellido FROM users WHERE email = $1';
    const userResult = await pool.query(getUserQuery, [email]);
    
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    const user = userResult.rows[0];
    
    // Verificar contraseña
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    // Crear token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, nombre: user.nombre, apellido: user.apellido },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    
    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        token: token
      }
    });
    
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener perfil del usuario
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const getUserQuery = `
      SELECT id, email, nombre, apellido, created_at
      FROM users WHERE id = $1
    `;
    
    const userResult = await pool.query(getUserQuery, [userId]);
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    const user = userResult.rows[0];
    
    res.json({
      success: true,
      user: {
        id: user.id.toString(),
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        fechaRegistro: user.created_at
      }
    });
    
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Verificar email
router.post('/check-email', async (req, res) => {
  try {
    const { email } = req.body;
    
    const checkEmailQuery = 'SELECT id FROM users WHERE email = $1';
    const result = await pool.query(checkEmailQuery, [email]);
    
    res.json(result.rows.length > 0);
    
  } catch (error) {
    console.error('Error verificando email:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Cambiar contraseña
router.post('/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;
    
    // Obtener contraseña actual
    const getUserQuery = 'SELECT password_hash FROM users WHERE id = $1';
    const userResult = await pool.query(getUserQuery, [userId]);
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    const user = userResult.rows[0];
    
    // Verificar contraseña actual
    const passwordMatch = await bcrypt.compare(currentPassword, user.password_hash);
    
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Contraseña actual incorrecta' });
    }
    
    // Hashear nueva contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    
    // Actualizar contraseña
    const updatePasswordQuery = `
      UPDATE users SET password_hash = $1, updated_at = NOW()
      WHERE id = $2
    `;
    
    await pool.query(updatePasswordQuery, [hashedPassword, userId]);
    
    res.json({ success: true, message: 'Contraseña cambiada exitosamente' });
    
  } catch (error) {
    console.error('Error cambiando contraseña:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
