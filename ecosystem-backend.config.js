// ecosystem-backend.config.js - Configuración de PM2 para el backend

module.exports = {
  apps: [{
    name: 'loto-ia-backend',
    script: 'src/backend/dist/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_restarts: 10, // Limitar el número de reinicios antes de considerar el proceso como fallido
    min_uptime: '20s', // Considerar el proceso como 'estable' si ha estado activo por al menos 20 segundos
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }]
};
