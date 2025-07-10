const jwt = require('jsonwebtoken');

// Middleware de autenticación actualizado - busca token en headers y cookies
const authenticateToken = (req, res, next) => {
  try {
    // Obtener token del header Authorization o de las cookies
    let token = null;
    
    // Primero intentar desde el header Authorization
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
    
    // Si no hay token en el header, buscar en las cookies
    if (!token && req.headers.cookie) {
      const cookies = req.headers.cookie.split(';');
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'auth_token') {
          token = decodeURIComponent(value);
          break;
        }
      }
    }

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        error: 'Token de acceso requerido' 
      });
    }

    // Verificar el token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error al verificar token:', error);
    return res.status(403).json({ 
      success: false, 
      error: 'Token inválido o expirado' 
    });
  }
};

module.exports = authenticateToken;
