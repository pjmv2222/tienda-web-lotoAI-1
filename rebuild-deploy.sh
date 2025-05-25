#!/bin/bash

# Script para recompilar la aplicación y desplegarla en el servidor

# Compilar la aplicación
echo "Compilando la aplicación..."
npm run build:ssr

# Copiar los archivos compilados al servidor
echo "Copiando archivos al servidor..."
scp -r dist/tienda-web-loto-ai/* root@212.227.230.103:/var/www/tienda-web-lotoAI-1/dist/tienda-web-loto-ai/

# Reiniciar los servicios
echo "Reiniciando servicios..."
ssh root@212.227.230.103 "cd /var/www/tienda-web-lotoAI-1 && pm2 restart loto-ia-ssr && pm2 restart loto-ia-backend"

echo "Despliegue completado"
