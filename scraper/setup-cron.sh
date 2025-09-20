#!/bin/bash

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}Configuración de Cron Job para Scraper${NC}"
echo -e "${GREEN}=========================================${NC}"

# Verificar que estamos como root o con sudo
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Por favor, ejecuta este script como root o con sudo${NC}"
    exit 1
fi

# Hacer ejecutable el script run-scraper.sh
chmod +x /var/www/tienda-web-lotoAI-1/scraper/run-scraper.sh
echo -e "${GREEN}✅ Script run-scraper.sh marcado como ejecutable${NC}"

# Verificar que el script existe
if [ ! -f "/var/www/tienda-web-lotoAI-1/scraper/run-scraper.sh" ]; then
    echo -e "${RED}❌ Error: run-scraper.sh no encontrado${NC}"
    exit 1
fi

# Crear entrada de cron
CRON_ENTRY="0 */4 * * * /var/www/tienda-web-lotoAI-1/scraper/run-scraper.sh > /var/www/tienda-web-lotoAI-1/logs/cron-scraper.log 2>&1"

# Verificar si la entrada ya existe
if crontab -l 2>/dev/null | grep -q "run-scraper.sh"; then
    echo -e "${YELLOW}⚠️  Una entrada de cron para el scraper ya existe${NC}"
    echo "Entrada actual:"
    crontab -l | grep "run-scraper.sh"
    echo ""
    read -p "¿Deseas reemplazarla? (s/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        # Eliminar entrada antigua y añadir nueva
        (crontab -l 2>/dev/null | grep -v "run-scraper.sh"; echo "$CRON_ENTRY") | crontab -
        echo -e "${GREEN}✅ Entrada de cron actualizada${NC}"
    else
        echo -e "${YELLOW}Manteniendo entrada existente${NC}"
    fi
else
    # Añadir nueva entrada
    (crontab -l 2>/dev/null; echo "$CRON_ENTRY") | crontab -
    echo -e "${GREEN}✅ Nueva entrada de cron añadida${NC}"
fi

# Mostrar configuración actual
echo ""
echo -e "${GREEN}Configuración actual del cron:${NC}"
echo "--------------------------------"
crontab -l | grep "run-scraper.sh" || echo "No hay entradas del scraper"

# Probar ejecución manual
echo ""
echo -e "${GREEN}Probando ejecución manual del scraper...${NC}"
echo "--------------------------------"
read -p "¿Ejecutar el scraper ahora para verificar? (s/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Ss]$ ]]; then
    echo -e "${YELLOW}Ejecutando scraper...${NC}"
    /var/www/tienda-web-lotoAI-1/scraper/run-scraper.sh
    
    # Verificar resultado
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Scraper ejecutado correctamente${NC}"
        
        # Mostrar últimas líneas del log
        echo ""
        echo -e "${GREEN}Últimas líneas del log:${NC}"
        tail -n 20 /var/www/tienda-web-lotoAI-1/logs/scraper-$(date +%Y%m%d).log
    else
        echo -e "${RED}❌ Error ejecutando el scraper${NC}"
        echo "Revisa los logs en /var/www/tienda-web-lotoAI-1/logs/"
    fi
fi

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}Configuración completada${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo "El scraper se ejecutará automáticamente cada 4 horas."
echo "Próximas ejecuciones programadas:"
echo ""
for i in 0 4 8 12 16 20; do
    printf "%02d:00\n" $i
done
echo ""
echo "Logs disponibles en:"
echo "  - Logs del scraper: /var/www/tienda-web-lotoAI-1/logs/scraper-*.log"
echo "  - Errores: /var/www/tienda-web-lotoAI-1/logs/scraper-error-*.log"
echo "  - Logs del cron: /var/www/tienda-web-lotoAI-1/logs/cron-scraper.log"
