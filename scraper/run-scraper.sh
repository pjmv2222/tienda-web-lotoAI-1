#!/bin/bash

# Configuración
SCRIPT_DIR="/var/www/tienda-web-lotoAI-1/scraper"
LOG_DIR="/var/www/tienda-web-lotoAI-1/logs"
LOG_FILE="$LOG_DIR/scraper-$(date +%Y%m%d).log"
ERROR_LOG="$LOG_DIR/scraper-error-$(date +%Y%m%d).log"

# Crear directorio de logs si no existe
mkdir -p "$LOG_DIR"

# Función para logging
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Función para manejar errores
handle_error() {
    log "ERROR: $1"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: $1" >> "$ERROR_LOG"
    exit 1
}

# Inicio del script
log "========================================="
log "Iniciando scraper de lotería..."
log "========================================="

# Verificar que el directorio del scraper existe
if [ ! -d "$SCRIPT_DIR" ]; then
    handle_error "Directorio del scraper no encontrado: $SCRIPT_DIR"
fi

# Cambiar al directorio del proyecto
cd /var/www/tienda-web-lotoAI-1 || handle_error "No se pudo cambiar al directorio del proyecto"

# Cargar NVM si está disponible
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Verificar Node.js
if ! command -v node &> /dev/null; then
    handle_error "Node.js no está instalado o no se encuentra en PATH"
fi

log "Node.js version: $(node --version)"
log "NPM version: $(npm --version)"

# Verificar que el archivo TypeScript existe
if [ ! -f "$SCRIPT_DIR/scraper-extended.ts" ]; then
    handle_error "Archivo scraper-extended.ts no encontrado"
fi

# Instalar dependencias si es necesario
log "Verificando dependencias..."
cd "$SCRIPT_DIR" || handle_error "No se pudo cambiar al directorio del scraper"

if [ ! -d "node_modules" ]; then
    log "Instalando dependencias..."
    npm install >> "$LOG_FILE" 2>> "$ERROR_LOG" || handle_error "Error instalando dependencias"
fi

# Compilar TypeScript
log "Compilando TypeScript..."
npx tsc scraper-extended.ts --lib es2020,dom --module commonjs --target es2020 --esModuleInterop >> "$LOG_FILE" 2>> "$ERROR_LOG"

if [ ! -f "scraper-extended.js" ]; then
    handle_error "Error compilando TypeScript"
fi

# Ejecutar el scraper con timeout de 5 minutos
log "Ejecutando scraper..."
timeout 300 node scraper-extended.js >> "$LOG_FILE" 2>> "$ERROR_LOG"
SCRAPER_EXIT_CODE=$?

if [ $SCRAPER_EXIT_CODE -eq 124 ]; then
    handle_error "El scraper excedió el tiempo límite de 5 minutos"
elif [ $SCRAPER_EXIT_CODE -ne 0 ]; then
    handle_error "El scraper terminó con código de error: $SCRAPER_EXIT_CODE"
fi

# Verificar que los archivos se crearon correctamente
log "Verificando archivos generados..."

# Verificar botes.json
if [ -f "/var/www/tienda-web-lotoAI-1/src/assets/botes.json" ]; then
    BOTES_COUNT=$(grep -o '"[^"]*":' /var/www/tienda-web-lotoAI-1/src/assets/botes.json | wc -l)
    log "✅ botes.json creado con $BOTES_COUNT juegos"
    
    # Copiar a dist si existe
    if [ -d "/var/www/tienda-web-lotoAI-1/dist/tienda-web-loto-ai/browser/assets" ]; then
        cp /var/www/tienda-web-lotoAI-1/src/assets/botes.json /var/www/tienda-web-lotoAI-1/dist/tienda-web-loto-ai/browser/assets/
        log "✅ botes.json copiado a dist"
    fi
else
    handle_error "botes.json no fue creado"
fi

# Verificar lottery-data.json
if [ -f "/var/www/tienda-web-lotoAI-1/src/assets/lottery-data.json" ]; then
    FILE_SIZE=$(stat -c%s "/var/www/tienda-web-lotoAI-1/src/assets/lottery-data.json")
    log "✅ lottery-data.json creado (tamaño: $FILE_SIZE bytes)"
    
    # Copiar a dist si existe
    if [ -d "/var/www/tienda-web-lotoAI-1/dist/tienda-web-loto-ai/browser/assets" ]; then
        cp /var/www/tienda-web-lotoAI-1/src/assets/lottery-data.json /var/www/tienda-web-lotoAI-1/dist/tienda-web-loto-ai/browser/assets/
        log "✅ lottery-data.json copiado a dist"
    fi
else
    handle_error "lottery-data.json no fue creado"
fi

# Limpiar logs antiguos (mantener solo los últimos 7 días)
find "$LOG_DIR" -name "scraper-*.log" -mtime +7 -delete
find "$LOG_DIR" -name "scraper-error-*.log" -mtime +7 -delete

log "✅ Scraper ejecutado exitosamente"
log "========================================="

# Mostrar resumen
echo "Resumen de botes extraídos:"
cat /var/www/tienda-web-lotoAI-1/src/assets/botes.json | python3 -m json.tool 2>/dev/null || cat /var/www/tienda-web-lotoAI-1/src/assets/botes.json

exit 0
