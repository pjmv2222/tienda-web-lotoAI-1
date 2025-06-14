import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Logging middleware para debug
  server.use((req, res, next) => {
    console.log('Request URL:', req.url);
    next();
  });

  // Servir archivos estáticos desde /browser con configuración específica
  server.use(express.static(browserDistFolder, {
    maxAge: '1y',
    index: false, // Importante: deshabilitar index para evitar conflictos
    etag: true,
    lastModified: true
  }));

  // Servir assets específicamente
  server.use('/assets', express.static(join(browserDistFolder, 'assets'), {
    maxAge: '1y',
    etag: true
  }));

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
    console.log(`Serving static files from: ${resolve(dirname(fileURLToPath(import.meta.url)), '../browser')}`);
  });
}

run();
