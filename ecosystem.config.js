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
        PORT: 3000,
        POSTGRES_HOST: 'localhost',
        POSTGRES_PORT: 5432,
        POSTGRES_USER: 'postgres',
        POSTGRES_PASSWORD: 'bM+40404040',
        POSTGRES_DB: 'lotoia',
        JWT_SECRET: '8011471e-90c3-4af3-bc53-452557b92001',
        FRONTEND_URL: 'https://www.loto-ia.com',
        MAILJET_API_KEY: '4bf635e9052dd9ad0b18200a0ae43fb0',
        MAILJET_API_SECRET: '750dabff4daca14b5a4128e1669b75f6',
      },
    },
    {
      name: 'frontend',
  // Ejecuta el SSR de Angular (archivo generado por build)
  // Nota: Angular 18 genera main.server.mjs por defecto
  script: 'dist/tienda-web-loto-ai/server/main.server.mjs',
      cwd: '/var/www/tienda-web-lotoAI-1',
  interpreter: 'node',
  // Habilita source maps para mejores trazas en producción
  node_args: '--enable-source-maps',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
  watch: false,
      max_memory_restart: '1G',
      kill_timeout: 5000,
  // Evita bucles de reinicio si el arranque falla
  min_uptime: '10s',
  max_restarts: 5,
  exp_backoff_restart_delay: 5000,
  restart_delay: 5000,
  // Logs dedicados para diagnosticar reinicios
  out_file: 'logs/frontend.out.log',
  error_file: 'logs/frontend.err.log',
  merge_logs: true,
  time: true,
      env_file: '.env',            
      env: {
        NODE_ENV: 'development',
  PORT: 4000,
  // Forzar Node sin flags experimentales problemáticos
  NODE_OPTIONS: '--enable-source-maps'
      },
      env_production: {
        NODE_ENV: 'production',
  PORT: 4000,
  NODE_OPTIONS: '--enable-source-maps'
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
