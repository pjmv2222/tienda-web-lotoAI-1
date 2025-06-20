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
        MAILJET_API_KEY: '6d0949fe3bebd9e83bdca5d4e1669402',
        MAILJET_API_SECRET: 'fcd11e866b78ed68526543b355823103',
        STRIPE_SECRET_KEY: 'sk_test_51OqXXXXXXXXXXXXXXXXXXXXX',
        STRIPE_WEBHOOK_SECRET: 'whsec_XXXXXXXXXXXXXXXXXXXXXXXX'
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
