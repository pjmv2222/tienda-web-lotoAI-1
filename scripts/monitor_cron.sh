#!/bin/bash

# Script de monitoreo para el cron job de actualización de DataFrames
# Este script se ejecuta después del script principal para verificar su estado

SCRIPT_PATH="/var/www/tienda-web-lotoAI-1/scripts/update_lottery_dataframes.py"
LOG_DIR="/var/www/tienda-web-lotoAI-1/logs"
TODAY=$(date +%Y%m%d)
LOG_FILE="${LOG_DIR}/lottery_update_${TODAY}.log"

# Verificar si el script principal se ejecutó exitosamente
if [ ! -f "$LOG_FILE" ]; then
    # El log no existe, el cron probablemente falló
    python3 -c "
import sys
sys.path.insert(0, '/var/www/tienda-web-lotoAI-1/scripts')
from update_lottery_dataframes import send_cron_failure_notification
send_cron_failure_notification('El archivo de log no fue creado. El cron job no se ejecutó.')
"
    exit 1
fi

# Verificar la última modificación del log (no debe ser mayor a 10 minutos)
if [ $(find "$LOG_FILE" -mmin +10 | wc -l) -gt 0 ]; then
    # El log no se ha actualizado en los últimos 10 minutos
    LAST_LINES=$(tail -50 "$LOG_FILE")
    python3 -c "
import sys
sys.path.insert(0, '/var/www/tienda-web-lotoAI-1/scripts')
from update_lottery_dataframes import send_cron_failure_notification
send_cron_failure_notification('El log no se ha actualizado en los últimos 10 minutos.', '''$LAST_LINES''')
"
    exit 1
fi

# Verificar si hay errores críticos en el log
if grep -q "CRITICAL\|FATAL\|No se pudieron cargar los datos" "$LOG_FILE"; then
    ERROR_MSG=$(grep "CRITICAL\|FATAL\|No se pudieron cargar los datos" "$LOG_FILE" | tail -5)
    LAST_LINES=$(tail -100 "$LOG_FILE")
    python3 -c "
import sys
sys.path.insert(0, '/var/www/tienda-web-lotoAI-1/scripts')
from update_lottery_dataframes import send_cron_failure_notification
send_cron_failure_notification('''$ERROR_MSG''', '''$LAST_LINES''')
"
fi

exit 0
