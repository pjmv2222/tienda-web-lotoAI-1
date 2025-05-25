#!/bin/bash

# Script para actualizar las dependencias del backend

# Colores para la salida
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Actualizando dependencias del backend...${NC}"

# Verificar que npm está instalado
if ! command -v npm &> /dev/null; then
    echo -e "${RED}npm no está instalado. Por favor, instálalo primero.${NC}"
    exit 1
fi

# Instalar axios para las solicitudes HTTP
echo -e "${YELLOW}Instalando axios...${NC}"
npm install axios --save

# Instalar child_process para ejecutar procesos
echo -e "${YELLOW}Instalando child_process...${NC}"
npm install child_process --save

echo -e "${GREEN}¡Dependencias actualizadas correctamente!${NC}"
