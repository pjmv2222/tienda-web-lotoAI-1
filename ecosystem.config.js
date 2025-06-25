module.exports = {
  apps: [
    {
      name: 'loto-ia-backend',
      script: './dist/backend/server.js',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        POSTGRES_HOST: 'localhost',
        POSTGRES_PORT: 5432,
        POSTGRES_USER: 'postgres',
        POSTGRES_PASSWORD: 'bM+40404040',
        POSTGRES_DB: 'lotoia',
        JWT_SECRET: '8011471e-90c3-4af3-bc53-452557b92001',
        FRONTEND_URL: 'https://www.loto-ia.com',
        MAILJET_API_KEY: '4bf635e9052dd9ad0b18200a0ae43fb0',
        MAILJET_API_SECRET: '750dabff4daca14b5a4128e1669b75f6'
      },
    },
    {
      name: 'loto-ia-frontend',
      script: 'dist/tienda-web-loto-ai/server/main.server.mjs',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 4000
      },
    },
  ],
};
