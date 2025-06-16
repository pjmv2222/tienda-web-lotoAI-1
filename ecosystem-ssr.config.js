// ecosystem-ssr.config.js - Configuración de PM2 para el servidor SSR

module.exports = {
  apps: [{
    name: 'loto-ia-ssr',
    script: 'express-server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_restarts: 10, // Limitar el número de reinicios antes de considerar el proceso como fallido
    min_uptime: '20s', // Considerar el proceso como 'estable' si ha estado activo por al menos 20 segundos
    env: {
      NODE_ENV: 'production'
    }
  }]
};
