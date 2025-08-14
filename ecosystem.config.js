module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'src/backend/dist/index.js',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env_file: '.env',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'frontend',
      script: '/var/www/tienda-web-lotoAI-1/dist/tienda-web-loto-ai/server/server.mjs',
      cwd: '/var/www/tienda-web-lotoAI-1',
      interpreter: 'node',
      interpreter_args: '--experimental-modules --es-module-specifier-resolution=node',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '1G',
      kill_timeout: 5000,
      env_file: '.env',            
      env: {
        NODE_ENV: 'development',
        PORT: 4000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 4000
      },
    },
    {
      name: 'ia-server',
      script: 'archivos-para-servidor/server-ia-unificado.py',
      interpreter: 'python3',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '2G',
      env: {
        NODE_ENV: 'development',
        JWT_SECRET: '8011471e-90c3-4af3-bc53-452557b92001',
        PORT: 5000
      },
      env_production: {
        NODE_ENV: 'production',
        JWT_SECRET: '8011471e-90c3-4af3-bc53-452557b92001',
        PORT: 5000
      },
    },
  ],
};
