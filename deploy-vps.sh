#!/bin/bash

# Script para desplegar la aplicación en la VPS

# Colores para mensajes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Iniciando despliegue en la VPS...${NC}"

# Navegar al directorio del proyecto
cd /var/www/tienda-web-lotoAI-1

# Obtener los últimos cambios
echo -e "${YELLOW}Obteniendo los últimos cambios del repositorio...${NC}"
git pull origin main
if [ $? -ne 0 ]; then
  echo -e "${RED}Error: Falló al obtener los cambios del repositorio.${NC}"
  exit 1
fi

# Copiar el archivo .env.production a .env para el backend
echo -e "${YELLOW}Copiando archivo .env.production a .env para el backend...${NC}"
cp src/backend/.env.production src/backend/.env
if [ $? -ne 0 ]; then
  echo -e "${RED}Error: Falló al copiar el archivo .env.production.${NC}"
  exit 1
fi

# Reiniciar el backend
echo -e "${YELLOW}Reiniciando el backend...${NC}"
pm2 restart loto-ia-backend
if [ $? -ne 0 ]; then
  echo -e "${RED}Error: Falló al reiniciar el backend.${NC}"
  exit 1
fi

# Reiniciar el frontend SSR
echo -e "${YELLOW}Reiniciando el frontend SSR...${NC}"
pm2 restart loto-ia-ssr
if [ $? -ne 0 ]; then
  echo -e "${RED}Error: Falló al reiniciar el frontend SSR.${NC}"
  exit 1
fi

echo -e "${GREEN}¡Despliegue en la VPS completado con éxito!${NC}"
echo -e "${YELLOW}Verificando los logs del backend:${NC}"
pm2 logs loto-ia-backend --lines 20
