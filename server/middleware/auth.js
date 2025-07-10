const jwt = require('jsonwebtoken');

// Middleware de autenticación actualizado - busca token en headers y cookies
const authenticateToken = (req, res, next) => {
  console.log('🔍 [AUTH] Iniciando verificación de token...');
  console.log('🔍 [AUTH] URL:', req.url);
  console.log('🔍 [AUTH] Headers:', req.headers);
  
  try {
    // Obtener token del header Authorization o de las cookies
    let token = null;
    
    // Primero intentar desde el header Authorization
    const authHeader = req.headers['authorization'];
    console.log('🔍 [AUTH] Authorization header:', authHeader);
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
      console.log('✅ [AUTH] Token encontrado en Authorization header');
    }
    
    // Si no hay token en el header, buscar en las cookies
    if (!token && req.headers.cookie) {
      console.log('🔍 [AUTH] Buscando token en cookies...');
      console.log('🔍 [AUTH] Cookie header:', req.headers.cookie);
      
      const cookies = req.headers.cookie.split(';');
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        console.log('🔍 [AUTH] Cookie:', name, '=', value);
        if (name === 'auth_token') {
          token = decodeURIComponent(value);
          console.log('✅ [AUTH] Token encontrado en cookie auth_token');
          break;
        }
      }
    }

    console.log('🔍 [AUTH] Token final:', token ? 'EXISTS' : 'NULL');

    if (!token) {
      console.log('❌ [AUTH] No se encontró token');
      return res.status(401).json({ 
        success: false, 
        error: 'Token de acceso requerido' 
      });
    }

    // Verificar el token JWT
    console.log('🔍 [AUTH] Verificando token JWT...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key');
    console.log('✅ [AUTH] Token válido, usuario:', decoded.id);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('❌ [AUTH] Error al verificar token:', error);
    return res.status(403).json({ 
      success: false, 
      error: 'Token inválido o expirado' 
    });
  }
};

module.exports = authenticateToken;
