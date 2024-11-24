import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const NODE_ENV = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

// Configurar CORS
const corsOptions = {
  origin: NODE_ENV === 'production' 
    ? 'https://piensasolutions.com/tienda' 
    : 'http://localhost:4200',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.json({ message: 'API Backend funcionando correctamente' });
});

app.post('/api/register', (req, res) => {
  // ... lógica de registro
});

app.post('/api/login', (req, res) => {
  // ... lógica de login
});

app.listen(port, () => {
  console.log(`API Backend corriendo en http://localhost:${port}`);
});
