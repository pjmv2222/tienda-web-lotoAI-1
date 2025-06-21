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
        PORT: 3000,
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