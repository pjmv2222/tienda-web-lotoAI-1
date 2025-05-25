#!/bin/bash

# Script para desplegar la aplicación en producción

# Colores para mensajes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Iniciando despliegue de LotoIA en producción...${NC}"

# Verificar que estamos en la rama main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo -e "${RED}Error: No estás en la rama main. Por favor, cambia a la rama main antes de desplegar.${NC}"
  exit 1
fi

# Verificar que no hay cambios sin commitear
if [ -n "$(git status --porcelain)" ]; then
  echo -e "${RED}Error: Hay cambios sin commitear. Por favor, haz commit de tus cambios antes de desplegar.${NC}"
  exit 1
fi

# Construir el backend
echo -e "${YELLOW}Construyendo el backend...${NC}"
cd src/backend
npm install
npm run build
if [ $? -ne 0 ]; then
  echo -e "${RED}Error: Falló la construcción del backend.${NC}"
  exit 1
fi
cd ../..

# Construir el frontend con SSR
echo -e "${YELLOW}Construyendo el frontend con SSR...${NC}"
npm run build:ssr
if [ $? -ne 0 ]; then
  echo -e "${RED}Error: Falló la construcción del frontend.${NC}"
  exit 1
fi

# Hacer commit de los cambios en dist
echo -e "${YELLOW}Haciendo commit de los cambios en dist...${NC}"
git add dist
git commit -m "Build: Actualización para producción $(date +"%Y-%m-%d %H:%M:%S")"
if [ $? -ne 0 ]; then
  echo -e "${RED}Error: Falló el commit de los cambios en dist.${NC}"
  exit 1
fi

# Subir los cambios a GitHub
echo -e "${YELLOW}Subiendo los cambios a GitHub...${NC}"
git push origin main
if [ $? -ne 0 ]; then
  echo -e "${RED}Error: Falló el push a GitHub.${NC}"
  exit 1
fi

echo -e "${GREEN}¡Despliegue completado con éxito!${NC}"
echo -e "${YELLOW}Ahora debes conectarte a la VPS y ejecutar:${NC}"
echo -e "ssh root@212.227.230.103"
echo -e "cd /var/www/tienda-web-lotoAI-1"
echo -e "git pull origin main"
echo -e "pm2 restart loto-ia-backend"
echo -e "pm2 restart loto-ia-ssr"
