import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { serverConfig } from './config/prod.config';

dotenv.config();

const app = express();
const NODE_ENV = process.env.NODE_ENV || 'development';

// Configurar CORS
const corsOptions = {
  origin: NODE_ENV === 'production' 
    ? 'https://www.loto-ia.com' 
    : 'http://localhost:4200',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Rutas
app.get('/api/', (req, res) => {
  res.json({ message: 'API Backend funcionando correctamente' });
});

app.post('/api/register', (req, res) => {
  // ... lógica de registro
});

app.post('/api/login', (req, res) => {
  // ... lógica de login
});

app.listen(serverConfig.port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${serverConfig.port}`);
});
