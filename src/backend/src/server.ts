import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/database';
import setupRoutes from './routes';

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env['PORT'] || 3000;

// Middlewares
const NODE_ENV = process.env['NODE_ENV'] || 'development';
const allowedOrigins = NODE_ENV === 'production'
  ? ['https://loto-ia.com', 'http://loto-ia.com', 'https://www.loto-ia.com', 'http://www.loto-ia.com']
  : ['http://localhost:4200', 'http://localhost:4000'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// El webhook de Stripe necesita el body en formato raw, por lo que debe ir antes de express.json()
const webhookRoutes = require('./routes/webhook.routes').default;
app.use('/api/webhooks', webhookRoutes);

// El resto de las rutas usan JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Verificar conexión a la base de datos e iniciar el servidor
db.connect()
  .then(client => {
    console.log('✅ (Backend) Conexión a la base de datos establecida.');
    client.release(); // Liberar el cliente inmediatamente después de la prueba
    
    // Configurar las rutas de la API
    setupRoutes(app);
    
    app.listen(port, () => {
      console.log(`🚀 (Backend) Servidor API iniciado en el puerto ${port}`);
    });
  })
  .catch((error: Error) => {
    console.error('❌ (Backend) Error fatal al conectar con la base de datos:', error);
    process.exit(1);
  });
