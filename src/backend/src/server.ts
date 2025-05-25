import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = parseInt(process.env.PORT || '3000', 10);
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4000';

// Configurar CORS
const corsOptions = {
  origin: NODE_ENV === 'production' 
    ? 'https://www.loto-ia.com' 
    : FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Rutas
app.get('/api', (req, res) => {
  res.json({ message: 'API Backend funcionando correctamente' });
});

// Rutas de autenticación
app.use('/api/auth', authRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`Frontend URL configurada: ${corsOptions.origin}`);
});
