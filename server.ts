import { APP_BASE_HREF } from '@angular/common';
import express from 'express';
import * as path from 'path';
import * as fs from 'fs';

export function app(): express.Express {
  const server = express();
  
  // Rutas correctas para los directorios
  const distPath = path.resolve(__dirname, '..');
  const browserDistFolder = path.resolve(distPath, 'browser');
  const fallbackHtml = path.resolve(browserDistFolder, 'index.csr.html');

  // Logging para depuración
  console.log('__dirname:', __dirname);
  console.log('Dist Path:', distPath);
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

  // Servir archivos estáticos
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // Todas las rutas regulares usan el renderizado del lado del cliente
  server.get('*', (req, res) => {
    try {
      // Usar directamente el fallback HTML
      if (fs.existsSync(fallbackHtml)) {
        console.log('Sirviendo index.csr.html para:', req.url);
        const fallbackContent = fs.readFileSync(fallbackHtml, 'utf8');
        res.send(fallbackContent);
      } else {
        console.error('Archivo de fallback no encontrado:', fallbackHtml);
        res.status(500).send('Error en el servidor: archivo de fallback no encontrado');
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
