import { APP_BASE_HREF } from '@angular/common';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { enableProdMode } from '@angular/core';
import * as path from 'path';
import * as fs from 'fs';

// Habilitar modo producción
enableProdMode();

export function app(): express.Express {
  const server = express();
  
  // Rutas correctas para los directorios
  const distPath = path.resolve(__dirname, '..');
  const serverDistFolder = path.resolve(__dirname);
  const browserDistFolder = path.resolve(distPath, 'browser');
  const fallbackHtml = path.resolve(browserDistFolder, 'index.csr.html');

  // Logging para depuración
  console.log('__dirname:', __dirname);
  console.log('Dist Path:', distPath);
  console.log('Server Dist Folder:', serverDistFolder);
  console.log('Browser Dist Folder:', browserDistFolder);
  console.log('Fallback HTML:', fallbackHtml);
  
  // Listar archivos en el directorio browser
  if (fs.existsSync(browserDistFolder)) {
    console.log('Archivos en Browser Dist Folder:');
    fs.readdirSync(browserDistFolder).forEach(file => {
      console.log(' - ' + file);
    });
  } else {
    console.log('Browser Dist Folder no existe');
  }

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Logging middleware para debug
  server.use((req, res, next) => {
    console.log('Request URL:', req.url);
    next();
  });

  // Servir archivos estáticos
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // Todas las rutas regulares usan el renderizado del lado del cliente
  server.get('*', (req: express.Request, res: express.Response) => {
    try {
      // Usar directamente el fallback HTML
      if (fs.existsSync(fallbackHtml)) {
        console.log('Sirviendo index.csr.html para:', req.url);
        const fallbackContent = fs.readFileSync(fallbackHtml, 'utf8');
        res.send(fallbackContent);
      } else {
        console.error('Archivo de fallback no encontrado:', fallbackHtml);
        // Enviar una respuesta básica
        res.status(200).send(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Loto IA</title>
              <base href="/">
            </head>
            <body>
              <app-root></app-root>
              <script src="/main-DEOM3VTC.js" type="module"></script>
              <script src="/chunk-QGI5KIKJ.js" type="module"></script>
              <script src="/chunk-45XLK2AI.js" type="module"></script>
            </body>
          </html>
        `);
      }
    } catch (e) {
      console.error('Error general en el servidor:', e);
      res.status(500).send('Error en el servidor');
    }
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
