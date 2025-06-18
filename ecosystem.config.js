module.exports = {
  apps: [
    {
      name: 'loto-ia-backend',
      script: './dist/backend/src/server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001,
        POSTGRES_HOST: 'localhost',
        POSTGRES_PORT: 5432,
        POSTGRES_USER: 'postgres',
        POSTGRES_PASSWORD: 'bM+40404040',
        POSTGRES_DB: 'lotoia',
        JWT_SECRET: '8011471e-90c3-4af3-bc53-452557b92001',
        // --- Variables para Email ---
        FRONTEND_URL: 'https://www.loto-ia.com',
        MAILJET_API_KEY: '6d0949fe3bebd9e83bdca5d4e1669402',
        MAILJET_API_SECRET: 'fcd11e866b78ed68526543b355823103',
      },
    },
    {
      name: 'loto-ia-frontend',
      script: 'dist/tienda-web-loto-ai/server/main.server.mjs',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 4000,
      },
    },
  ],
}; 