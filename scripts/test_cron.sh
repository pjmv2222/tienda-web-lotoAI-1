#!/bin/bash
# Script de prueba para verificar que los scripts funcionan correctamente

echo "=========================================="
echo "Prueba de ejecución: $(date)"
echo "=========================================="

# Cambiar al directorio de scripts
cd /var/www/tienda-web-lotoAI-1/scripts

# Ejecutar scraper
echo "Ejecutando lottery_scraper.py..."
/usr/bin/python3 lottery_scraper.py
SCRAPER_EXIT=$?
echo "Scraper finalizado con código: $SCRAPER_EXIT"

# Esperar 2 segundos
sleep 2

# Ejecutar actualización de DataFrames
echo "Ejecutando update_lottery_dataframes.py..."
/usr/bin/python3 update_lottery_dataframes.py
UPDATE_EXIT=$?
echo "Update finalizado con código: $UPDATE_EXIT"

echo "=========================================="
echo "Prueba completada"
echo "=========================================="

exit $((SCRAPER_EXIT + UPDATE_EXIT))
