export const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'adm-loto-ia',
  password: 'tu_contraseña',
  database: 'Tienda-loto-ia'
};

export const serverConfig = {
  port: Number(process.env.PORT) || 8080,
  cors: {
    origin: ['https://www.loto-ia.com'],
    credentials: true
  }
};
