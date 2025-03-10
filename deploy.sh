#!/bin/bash

# Navegar al directorio del proyecto
cd /var/www/tienda-web-lotoAI-1

# Obtener los últimos cambios
git pull origin main

# Instalar dependencias del frontend
npm install --legacy-peer-deps

# Construir el frontend con SSR
npm run build:ssr

# Verificar que nginx esté configurado correctamente
nginx -t && systemctl reload nginx

# Navegar al directorio del backend
cd src/backend

# Instalar dependencias del backend
npm install

# Reiniciar el servicio del backend
pm2 restart loto-ia-backend || pm2 start npm --name "loto-ia-backend" -- start

# Reiniciar el servicio SSR
pm2 restart loto-ia-ssr || pm2 start npm --name "loto-ia-ssr" -- run serve:ssr

# Guardar la configuración de PM2
pm2 save

echo "Despliegue completado con éxito!" 