const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

// Importar rutas
const paymentRoutes = require('./routes/payment.routes');
const subscriptionRoutes = require('./routes/subscription.routes');
const webhookRoutes = require('./routes/webhook.routes');
const webhookController = require('./controllers/webhook.controller');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de PostgreSQL
const pgPool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'lotoia',
  password: process.env.POSTGRES_PASSWORD || 'password',
  port: process.env.POSTGRES_PORT || 5432,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false
});

// Middleware para agregar el pool de PostgreSQL a las requests
app.use((req, res, next) => {
  req.pgPool = pgPool;
  next();
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// Middleware especial para webhooks de Stripe (debe estar antes del express.json())
app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }));

// Middleware para parsear JSON en el resto de rutas
app.use(express.json());

// Rutas
app.use('/api/payments', paymentRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// Configuración especial para la ruta de webhook de Stripe
app.post('/api/webhooks/stripe', webhookController.handleStripeWebhook);

// Otras rutas de webhook
app.use('/api/webhooks', webhookRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Servidor funcionando correctamente' });
});

// Ruta de prueba de base de datos
app.get('/api/db-test', async (req, res) => {
  try {
    const client = await pgPool.connect();
    try {
      const result = await client.query('SELECT NOW()');
      res.status(200).json({ 
        message: 'Conexión a PostgreSQL exitosa', 
        timestamp: result.rows[0].now 
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error al conectar a PostgreSQL:', error);
    res.status(500).json({ error: 'Error de conexión a la base de datos' });
  }
});

// Verificar conexión a PostgreSQL e iniciar servidor
const startServer = async () => {
  try {
    // Probar la conexión a PostgreSQL
    const client = await pgPool.connect();
    console.log('Conectado a PostgreSQL');
    client.release();
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar a PostgreSQL:', error);
    process.exit(1);
  }
};

startServer();
