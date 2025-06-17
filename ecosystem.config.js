module.exports = {
  apps: [
    {
      name: 'loto-ia',
      script: 'dist/tienda-web-loto-ai/server/main.server.mjs',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 4000
      }
    }
  ]
}; 