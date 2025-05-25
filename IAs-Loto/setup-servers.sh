#!/bin/bash

# Script para configurar los servidores Python de las IAs

# Colores para la salida
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Configurando servidores Python para las IAs de LOTO IA...${NC}"

# Verificar que Python está instalado
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Python 3 no está instalado. Por favor, instálalo primero.${NC}"
    exit 1
fi

# Verificar que pip está instalado
if ! command -v pip3 &> /dev/null; then
    echo -e "${RED}pip3 no está instalado. Por favor, instálalo primero.${NC}"
    exit 1
fi

# Instalar dependencias globales
echo -e "${YELLOW}Instalando dependencias globales...${NC}"
pip3 install flask flask-cors pyjwt numpy pandas scikit-learn tensorflow

# Verificar que supervisor está instalado
if ! command -v supervisorctl &> /dev/null; then
    echo -e "${YELLOW}Supervisor no está instalado. Instalándolo...${NC}"
    apt-get update
    apt-get install -y supervisor
    systemctl enable supervisor
    systemctl start supervisor
fi

# Crear directorio para los logs
mkdir -p /var/log/loto-ia

# Configurar cada servidor
configure_server() {
    local game=$1
    local port=$2
    local script_path=$3
    
    echo -e "${YELLOW}Configurando servidor para ${game} en el puerto ${port}...${NC}"
    
    # Crear archivo de configuración para supervisor
    cat > /etc/supervisor/conf.d/loto-ia-${game}.conf << EOF
[program:loto-ia-${game}]
command=python3 ${script_path}
directory=$(dirname ${script_path})
environment=PORT=${port},SKIP_AUTH=true
autostart=false
autorestart=true
startretries=3
stderr_logfile=/var/log/loto-ia/${game}.err.log
stdout_logfile=/var/log/loto-ia/${game}.out.log
user=root
EOF
    
    echo -e "${GREEN}Servidor para ${game} configurado.${NC}"
}

# Configurar cada servidor
configure_server "euromillon" 5001 "/var/www/tienda-web-lotoAI-1/IAs-Loto/EuroMillon-CSV/server.py"
configure_server "bonoloto" 5002 "/var/www/tienda-web-lotoAI-1/IAs-Loto/Bonoloto/server.py"
configure_server "eurodreams" 5003 "/var/www/tienda-web-lotoAI-1/IAs-Loto/EuroDreams/server.py"
configure_server "gordo-primitiva" 5004 "/var/www/tienda-web-lotoAI-1/IAs-Loto/GordoPrimitiva/server.py"
configure_server "loteria-nacional" 5005 "/var/www/tienda-web-lotoAI-1/IAs-Loto/LOTERIA NACIONAL/server.py"
configure_server "lototurf" 5006 "/var/www/tienda-web-lotoAI-1/IAs-Loto/Lototurf/server.py"
configure_server "primitiva" 5007 "/var/www/tienda-web-lotoAI-1/IAs-Loto/LaPrimitiva/server.py"

# Recargar configuración de supervisor
echo -e "${YELLOW}Recargando configuración de supervisor...${NC}"
supervisorctl reread
supervisorctl update

echo -e "${GREEN}¡Configuración completada!${NC}"
echo -e "${YELLOW}Los servidores no se inician automáticamente. Se iniciarán bajo demanda cuando se soliciten predicciones.${NC}"
echo -e "${YELLOW}Para iniciar manualmente un servidor, ejecuta:${NC}"
echo -e "supervisorctl start loto-ia-euromillon"
echo -e "${YELLOW}Para detener un servidor:${NC}"
echo -e "supervisorctl stop loto-ia-euromillon"
echo -e "${YELLOW}Para ver el estado de los servidores:${NC}"
echo -e "supervisorctl status"
