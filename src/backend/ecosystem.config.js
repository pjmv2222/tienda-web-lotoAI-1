// Cargar variables de entorno desde .env
require('dotenv').config();

module.exports = {
  apps: [{
    name: 'loto-ia-backend',
    script: 'dist/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: 'development',
      PORT: 3001
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    env_file: process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
  }]
};
