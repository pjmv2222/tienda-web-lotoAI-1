#!/bin/bash

# Script para actualizar la configuración de Stripe en el servidor

# Copiar el archivo .env.production al servidor
scp src/backend/.env.production root@212.227.230.103:/var/www/tienda-web-lotoAI-1/src/backend/.env

# Reiniciar el servicio backend
ssh root@212.227.230.103 "cd /var/www/tienda-web-lotoAI-1 && pm2 restart loto-ia-backend"

echo "Configuración de Stripe actualizada y servicio reiniciado"
