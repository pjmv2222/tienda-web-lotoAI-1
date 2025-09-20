#!/bin/bash

# Script completo de configuración del entorno de cron job para loterías
# Este script unifica todos los archivos corregidos y los configura automáticamente

set -e  # Terminar en caso de error

echo "=========================================="
echo "Setup Completo - Cron Job Loterías"
echo "=========================================="

# Verificaciones iniciales
if [[ $EUID -ne 0 ]]; then
   echo "Este script debe ejecutarse como root (sudo)" 1>&2
   exit 1
fi

# Configuración de rutas
BASE_DIR="/var/www/tienda-web-lotoAI-1"
SCRIPTS_DIR="$BASE_DIR/scripts"
LOGS_DIR="$BASE_DIR/logs"
DATASETS_DIR="$BASE_DIR/datasets"
ARCHIVE_DATASETS_DIR="$BASE_DIR/archivos-para-servidor/datasets"
BACKUP_DIR="$DATASETS_DIR/backup"

echo "Creando estructura de directorios..."

# Crear directorios necesarios
mkdir -p "$SCRIPTS_DIR"
mkdir -p "$LOGS_DIR"
mkdir -p "$BACKUP_DIR"
mkdir -p "$ARCHIVE_DATASETS_DIR"

# Configurar permisos
chmod 755 "$SCRIPTS_DIR"
chmod 755 "$LOGS_DIR"
chmod 755 "$BACKUP_DIR"
chmod 755 "$ARCHIVE_DATASETS_DIR"

echo "✓ Directorios creados"

# Verificar que el archivo lottery-data.json existe
LOTTERY_DATA_FILE="$BASE_DIR/src/assets/lottery-data.json"
if [ ! -f "$LOTTERY_DATA_FILE" ]; then
    echo "⚠ ADVERTENCIA: No se encuentra lottery-data.json en $LOTTERY_DATA_FILE"
    echo "Asegúrate de que el scraper haya generado este archivo antes de ejecutar el cron job"
else
    echo "✓ lottery-data.json encontrado"
fi

# Verificar que Python3 está disponible
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python3 no está instalado"
    exit 1
fi

echo "✓ Python3 disponible"

# Verificar dependencias de Python
echo "Verificando dependencias de Python..."

python3 -c "import pandas, json, logging" 2>/dev/null || {
    echo "Instalando dependencias de Python..."
    apt-get update
    apt-get install -y python3-pandas python3-pip
    pip3 install pandas
}

echo "✓ Dependencias de Python verificadas"

# Copiar script Python corregido al directorio de scripts
PYTHON_SCRIPT="$SCRIPTS_DIR/update_lottery_dataframes.py"

cat > "$PYTHON_SCRIPT" << 'EOF'
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para actualizar los DataFrames de resultados de loterías
desde el archivo lottery-data.json generado por el scraper
VERSIÓN CORREGIDA - Manejo mejorado de columnas y fechas
"""

import os
import sys
import json
import pandas as pd
import logging
from datetime import datetime
import traceback

# Configuración de logging
LOG_DIR = '/var/www/tienda-web-lotoAI-1/logs'
if not os.path.exists(LOG_DIR):
    os.makedirs(LOG_DIR)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(f'{LOG_DIR}/lottery_update_{datetime.now().strftime("%Y%m%d")}.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

# Rutas de archivos
LOTTERY_DATA_PATH = '/var/www/tienda-web-lotoAI-1/src/assets/lottery-data.json'
BASE_PATH = '/var/www/tienda-web-lotoAI-1/IAs-Loto'
BACKUP_PATH = '/var/www/tienda-web-lotoAI-1/datasets/backup'
DATASETS_PATH = '/var/www/tienda-web-lotoAI-1/archivos-para-servidor/datasets'

# Mapeo de loterías a sus rutas de DataFrame
LOTTERY_PATHS = {
    'bonoloto': {
        'path': f'{BASE_PATH}/Bonoloto/DataFrame_Bonoloto.csv',
        'columns': ['fecha', 'n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'complementario', 'reintegro']
    },
    'elgordo': {
        'path': f'{BASE_PATH}/ElGordo/DataFrame_ElGordo.csv',
        'columns': ['fecha', 'n1', 'n2', 'n3', 'n4', 'n5', 'clave']
    },
    'eurodreams': {
        'path': f'{BASE_PATH}/EuroDreams/DataFrame_EuroDreams.csv',
        'columns': ['fecha', 'n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'sueño']
    },
    'euromillones': {
        'path': f'{BASE_PATH}/EuroMillon-CSV/DataFrame_Euromillones.csv',
        'columns': ['fecha', 'n1', 'n2', 'n3', 'n4', 'n5', 'estrella1', 'estrella2']
    },
    'primitiva': {
        'path': f'{BASE_PATH}/LaPrimitiva/DataFrame_LaPrimitiva.csv',
        'columns': ['fecha', 'n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'complementario', 'reintegro', 'joker']
    },
    'loterianacional': {
        'path': f'{BASE_PATH}/LOTERIA NACIONAL/DataFrame_LOTERIA NACIONAL.csv',
        'columns': ['fecha', 'primer_premio', 'segundo_premio', 'reintegros', 'serie', 'fraccion', 'sorteo']
    },
    'lototurf': {
        'path': f'{BASE_PATH}/Lototurf/DataFrame_Lototurf.csv',
        'columns': ['fecha', 'n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'caballo', 'reintegro']
    }
}

def load_lottery_data():
    """Carga el archivo lottery-data.json"""
    try:
        if not os.path.exists(LOTTERY_DATA_PATH):
            logger.error(f"No se encuentra el archivo: {LOTTERY_DATA_PATH}")
            return None
            
        with open(LOTTERY_DATA_PATH, 'r', encoding='utf-8') as file:
            data = json.load(file)
            logger.info(f"Archivo lottery-data.json cargado correctamente")
            return data
    except Exception as e:
        logger.error(f"Error al cargar lottery-data.json: {e}")
        logger.error(traceback.format_exc())
        return None

def extract_date_from_string(date_str):
    """Extrae y formatea la fecha de diferentes formatos de string"""
    if not date_str:
        return datetime.now().strftime('%d/%m/%Y')
    
    try:
        import re
        
        # Patrón para fechas DD/MM/YYYY
        date_pattern = r'(\d{1,2})/(\d{1,2})/(\d{4})'
        match = re.search(date_pattern, date_str)
        
        if match:
            day, month, year = match.groups()
            return f"{day.zfill(2)}/{month.zfill(2)}/{year}"
        
        # Si no encontramos patrón, devolver fecha actual
        logger.warning(f"No se pudo extraer fecha de: '{date_str}', usando fecha actual")
        return datetime.now().strftime('%d/%m/%Y')
        
    except Exception as e:
        logger.error(f"Error al procesar fecha '{date_str}': {e}")
        return datetime.now().strftime('%d/%m/%Y')

def load_existing_dataframe(lottery_info):
    """Carga un DataFrame existente o crea uno nuevo si no existe"""
    csv_path = lottery_info['path']
    expected_columns = lottery_info['columns']
    
    try:
        if os.path.exists(csv_path):
            df = pd.read_csv(csv_path, encoding='utf-8')
            logger.info(f"DataFrame cargado: {len(df)} filas, columnas: {list(df.columns)}")
            
            # Verificar si las columnas esperadas están presentes
            missing_columns = [col for col in expected_columns if col not in df.columns]
            if missing_columns:
                logger.warning(f"Columnas faltantes en DataFrame: {missing_columns}")
                # Agregar columnas faltantes con valores vacíos
                for col in missing_columns:
                    df[col] = ''
                    
            return df
        else:
            logger.warning(f"Archivo CSV no existe, creando nuevo DataFrame: {csv_path}")
            # Crear DataFrame vacío con las columnas esperadas
            df = pd.DataFrame(columns=expected_columns)
            return df
            
    except Exception as e:
        logger.error(f"Error al cargar DataFrame {csv_path}: {e}")
        logger.error(traceback.format_exc())
        # En caso de error, crear DataFrame vacío
        return pd.DataFrame(columns=expected_columns)

def parse_lottery_result(game_name, result_data):
    """Parsea los datos de una lotería específica"""
    try:
        fecha = extract_date_from_string(result_data.get('date', ''))
        
        if game_name == 'bonoloto':
            numbers = result_data.get('numbers', [])
            if len(numbers) >= 6:
                return {
                    'fecha': fecha,
                    'n1': numbers[0],
                    'n2': numbers[1],
                    'n3': numbers[2],
                    'n4': numbers[3],
                    'n5': numbers[4],
                    'n6': numbers[5],
                    'complementario': result_data.get('complementary', ''),
                    'reintegro': result_data.get('reintegro', '')
                }
        
        elif game_name == 'elgordo':
            numbers = result_data.get('numbers', [])
            if len(numbers) >= 5:
                return {
                    'fecha': fecha,
                    'n1': numbers[0],
                    'n2': numbers[1],
                    'n3': numbers[2],
                    'n4': numbers[3],
                    'n5': numbers[4],
                    'clave': result_data.get('clave', '')
                }
        
        elif game_name == 'eurodreams':
            numbers = result_data.get('numbers', [])
            if len(numbers) >= 6:
                return {
                    'fecha': fecha,
                    'n1': numbers[0],
                    'n2': numbers[1],
                    'n3': numbers[2],
                    'n4': numbers[3],
                    'n5': numbers[4],
                    'n6': numbers[5],
                    'sueño': result_data.get('dream', '')
                }
        
        elif game_name == 'euromillones':
            numbers = result_data.get('numbers', [])
            stars = result_data.get('stars', [])
            if len(numbers) >= 5:
                return {
                    'fecha': fecha,
                    'n1': numbers[0],
                    'n2': numbers[1],
                    'n3': numbers[2],
                    'n4': numbers[3],
                    'n5': numbers[4],
                    'estrella1': stars[0] if len(stars) > 0 else '',
                    'estrella2': stars[1] if len(stars) > 1 else ''
                }
        
        elif game_name == 'primitiva':
            numbers = result_data.get('numbers', [])
            if len(numbers) >= 6:
                return {
                    'fecha': fecha,
                    'n1': numbers[0],
                    'n2': numbers[1],
                    'n3': numbers[2],
                    'n4': numbers[3],
                    'n5': numbers[4],
                    'n6': numbers[5],
                    'complementario': result_data.get('complementary', ''),
                    'reintegro': result_data.get('reintegro', ''),
                    'joker': result_data.get('joker', '')
                }
        
        elif game_name == 'loterianacional':
            # La lotería nacional tiene un formato especial con sorteos
            sorteos = result_data.get('sorteos', [])
            if sorteos and len(sorteos) > 0:
                primer_sorteo = sorteos[0]
                premios = primer_sorteo.get('premios', [])
                return {
                    'fecha': extract_date_from_string(primer_sorteo.get('fecha', fecha)),
                    'primer_premio': premios[0] if len(premios) > 0 else '',
                    'segundo_premio': premios[1] if len(premios) > 1 else '',
                    'reintegros': ','.join(map(str, primer_sorteo.get('reintegros', []))),
                    'serie': primer_sorteo.get('serie', ''),
                    'fraccion': primer_sorteo.get('fraccion', ''),
                    'sorteo': primer_sorteo.get('sorteo', '')
                }
        
        elif game_name == 'lototurf':
            numbers = result_data.get('numbers', [])
            if len(numbers) >= 6:
                return {
                    'fecha': fecha,
                    'n1': numbers[0],
                    'n2': numbers[1],
                    'n3': numbers[2],
                    'n4': numbers[3],
                    'n5': numbers[4],
                    'n6': numbers[5],
                    'caballo': result_data.get('caballo', ''),
                    'reintegro': result_data.get('reintegro', '')
                }
        
        return None
        
    except Exception as e:
        logger.error(f"Error al parsear datos de {game_name}: {e}")
        logger.error(traceback.format_exc())
        return None

def update_dataframe(lottery_name, lottery_info, new_data):
    """Actualiza el DataFrame con los nuevos datos"""
    try:
        # Cargar DataFrame existente
        df = load_existing_dataframe(lottery_info)
        
        if new_data is None:
            logger.warning(f"No hay nuevos datos para actualizar {lottery_name}")
            return False
        
        # Verificar si la fecha ya existe
        fecha_nueva = new_data.get('fecha')
        if fecha_nueva and 'fecha' in df.columns and not df.empty:
            existing_dates = df['fecha'].astype(str).values
            if fecha_nueva in existing_dates:
                logger.info(f"La fecha {fecha_nueva} ya existe en {lottery_name}, actualizando registro...")
                # Actualizar registro existente
                mask = df['fecha'].astype(str) == fecha_nueva
                for column, value in new_data.items():
                    if column in df.columns:
                        df.loc[mask, column] = value
            else:
                # Agregar nueva fila
                logger.info(f"Agregando nueva fecha {fecha_nueva} a {lottery_name}")
                new_row = pd.DataFrame([new_data])
                df = pd.concat([df, new_row], ignore_index=True)
        else:
            # Si el DataFrame está vacío o no hay fecha, simplemente agregar
            logger.info(f"Agregando datos a {lottery_name} (DataFrame vacío o sin fecha)")
            new_row = pd.DataFrame([new_data])
            df = pd.concat([df, new_row], ignore_index=True)
        
        # Crear backup antes de guardar
        create_backup(lottery_info['path'])
        
        # Guardar el DataFrame actualizado
        # Asegurar que el directorio existe
        os.makedirs(os.path.dirname(lottery_info['path']), exist_ok=True)
        
        df.to_csv(lottery_info['path'], index=False, encoding='utf-8')
        logger.info(f"DataFrame {lottery_name} guardado: {len(df)} filas total")
        
        # Copiar también al directorio datasets
        copy_to_datasets(lottery_name, lottery_info['path'])
        
        return True
        
    except Exception as e:
        logger.error(f"Error al actualizar DataFrame {lottery_name}: {e}")
        logger.error(traceback.format_exc())
        return False

def create_backup(csv_path):
    """Crea una copia de seguridad del CSV antes de modificarlo"""
    try:
        if not os.path.exists(csv_path):
            return
            
        # Crear directorio de backup si no existe
        os.makedirs(BACKUP_PATH, exist_ok=True)
        
        # Nombre del backup con timestamp
        filename = os.path.basename(csv_path)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_filename = f"{timestamp}_{filename}"
        backup_path = os.path.join(BACKUP_PATH, backup_filename)
        
        # Copiar archivo
        import shutil
        shutil.copy2(csv_path, backup_path)
        logger.info(f"Backup creado: {backup_filename}")
        
        # Limpiar backups antiguos (mantener solo los últimos 10)
        cleanup_old_backups(filename)
        
    except Exception as e:
        logger.warning(f"No se pudo crear backup para {csv_path}: {e}")

def cleanup_old_backups(filename):
    """Limpia backups antiguos manteniendo solo los más recientes"""
    try:
        if not os.path.exists(BACKUP_PATH):
            return
            
        # Buscar archivos de backup para este CSV
        backup_files = []
        for file in os.listdir(BACKUP_PATH):
            if file.endswith(filename):
                backup_files.append(os.path.join(BACKUP_PATH, file))
        
        # Ordenar por fecha de modificación (más recientes primero)
        backup_files.sort(key=os.path.getmtime, reverse=True)
        
        # Eliminar archivos antiguos (mantener solo los últimos 10)
        for file_to_delete in backup_files[10:]:
            os.remove(file_to_delete)
            logger.info(f"Backup antiguo eliminado: {os.path.basename(file_to_delete)}")
            
    except Exception as e:
        logger.warning(f"Error al limpiar backups para {filename}: {e}")

def copy_to_datasets(lottery_name, csv_path):
    """Copia el DataFrame actualizado al directorio datasets"""
    try:
        import shutil
        
        # Crear directorio datasets si no existe
        os.makedirs(DATASETS_PATH, exist_ok=True)
        
        # Nombre del archivo en datasets
        filename = os.path.basename(csv_path)
        datasets_path = os.path.join(DATASETS_PATH, filename)
        
        # Copiar archivo
        shutil.copy2(csv_path, datasets_path)
        logger.info(f"DataFrame copiado a datasets: {filename}")
        
    except Exception as e:
        logger.warning(f"No se pudo copiar {lottery_name} a datasets: {e}")

def main():
    """Función principal"""
    logger.info("="*60)
    logger.info("Iniciando actualización de DataFrames de loterías")
    logger.info(f"Fecha y hora: {datetime.now()}")
    logger.info("="*60)
    
    # Cargar datos del JSON
    lottery_data = load_lottery_data()
    if not lottery_data:
        logger.error("No se pudieron cargar los datos del archivo lottery-data.json")
        sys.exit(1)
    
    # Obtener resultados
    resultados = lottery_data.get('resultados', [])
    if not resultados:
        logger.error("No se encontraron resultados en los datos de lotería")
        sys.exit(1)
    
    # Crear un diccionario de resultados por juego
    resultados_por_juego = {}
    for resultado in resultados:
        game = resultado.get('game')
        if game:
            resultados_por_juego[game] = resultado
    
    logger.info(f"Resultados encontrados para: {list(resultados_por_juego.keys())}")
    logger.info(f"Loterías configuradas: {list(LOTTERY_PATHS.keys())}")
    
    # Procesar cada lotería
    success_count = 0
    error_count = 0
    
    for lottery_name, lottery_info in LOTTERY_PATHS.items():
        logger.info(f"\nProcesando: {lottery_name}")
        logger.info("-"*40)
        
        if lottery_name in resultados_por_juego:
            # Parsear datos de la lotería
            new_data = parse_lottery_result(lottery_name, resultados_por_juego[lottery_name])
            
            # Actualizar DataFrame
            if update_dataframe(lottery_name, lottery_info, new_data):
                success_count += 1
                logger.info(f"✓ {lottery_name} actualizado correctamente")
            else:
                error_count += 1
                logger.error(f"✗ Error al actualizar {lottery_name}")
        else:
            logger.warning(f"No se encontraron datos para {lottery_name} en lottery-data.json")
            error_count += 1
    
    # Resumen final
    logger.info("\n" + "="*60)
    logger.info("RESUMEN DE LA ACTUALIZACIÓN")
    logger.info(f"Loterías actualizadas exitosamente: {success_count}")
    logger.info(f"Loterías con errores: {error_count}")
    logger.info(f"Total de loterías procesadas: {success_count + error_count}")
    logger.info("="*60)
    
    # Retornar código de salida apropiado
    if error_count > 0:
        sys.exit(1)
    else:
        sys.exit(0)

if __name__ == "__main__":
    main()
EOF

chmod +x "$PYTHON_SCRIPT"
echo "✓ Script Python creado y configurado"

# Crear script wrapper
WRAPPER_SCRIPT="$SCRIPTS_DIR/lottery_update_wrapper.sh"

cat > "$WRAPPER_SCRIPT" << 'EOF'
#!/bin/bash

# Wrapper script para la actualización de DataFrames de loterías
# Este script se ejecutará desde cron y maneja el entorno correctamente

# Configuración de variables de entorno
export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
export LANG=es_ES.UTF-8
export LC_ALL=es_ES.UTF-8

# Directorios
SCRIPT_DIR="/var/www/tienda-web-lotoAI-1/scripts"
LOG_DIR="/var/www/tienda-web-lotoAI-1/logs"
LOCK_FILE="/tmp/lottery_update.lock"

# Archivo de log para este wrapper
WRAPPER_LOG="$LOG_DIR/wrapper_$(date +%Y%m%d).log"

# Función para escribir en el log
log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$WRAPPER_LOG"
}

# Función para limpiar al salir
cleanup() {
    if [ -f "$LOCK_FILE" ]; then
        rm -f "$LOCK_FILE"
        log_message "Lock file eliminado"
    fi
}

# Configurar trap para limpiar en caso de error
trap cleanup EXIT

# Verificar si ya hay una instancia en ejecución
if [ -f "$LOCK_FILE" ]; then
    log_message "ERROR: Ya hay una actualización en progreso (lock file existe)"
    exit 1
fi

# Crear lock file
touch "$LOCK_FILE"
log_message "=========================================="
log_message "Iniciando actualización de DataFrames"
log_message "=========================================="

# Verificar que el script Python existe
if [ ! -f "$SCRIPT_DIR/update_lottery_dataframes.py" ]; then
    log_message "ERROR: No se encuentra el script Python en $SCRIPT_DIR/update_lottery_dataframes.py"
    exit 1
fi

# Verificar que el archivo lottery-data.json existe y no está vacío
LOTTERY_DATA_FILE="/var/www/tienda-web-lotoAI-1/src/assets/lottery-data.json"
if [ ! -f "$LOTTERY_DATA_FILE" ]; then
    log_message "ERROR: No se encuentra el archivo lottery-data.json"
    exit 1
fi

# Verificar que el archivo lottery-data.json no esté vacío
if [ ! -s "$LOTTERY_DATA_FILE" ]; then
    log_message "ERROR: El archivo lottery-data.json está vacío"
    exit 1
fi

# Esperar un momento para asegurar que el scraper haya terminado
sleep 10

log_message "Verificando integridad del archivo lottery-data.json..."
python3 -c "import json; json.load(open('$LOTTERY_DATA_FILE'))" 2>/dev/null
if [ $? -ne 0 ]; then
    log_message "ERROR: El archivo lottery-data.json no es válido JSON"
    exit 1
fi

log_message "Archivo lottery-data.json verificado correctamente"

# Ejecutar el script Python de actualización
log_message "Ejecutando script de actualización Python..."
cd "$SCRIPT_DIR"
python3 update_lottery_dataframes.py >> "$WRAPPER_LOG" 2>&1
PYTHON_EXIT_CODE=$?

if [ $PYTHON_EXIT_CODE -eq 0 ]; then
    log_message "✓ Script Python ejecutado exitosamente"
else
    log_message "✗ Error al ejecutar el script Python (código de salida: $PYTHON_EXIT_CODE)"
fi

# Limpiar logs antiguos (mantener solo los últimos 30 días)
log_message "Limpiando logs antiguos..."
find "$LOG_DIR" -name "*.log" -type f -mtime +30 -delete

log_message "Proceso de actualización finalizado"
log_message "=========================================="

exit $PYTHON_EXIT_CODE
EOF

chmod +x "$WRAPPER_SCRIPT"
echo "✓ Script wrapper creado"

# Configurar cron job
CRON_TIME="30 23 * * *"  # 11:30 PM todos los días

echo "Configurando cron job..."

# Crear backup del crontab actual
crontab -l > /tmp/crontab.backup 2>/dev/null || echo "No hay crontab existente"

# Remover cualquier entrada previa para este script específico
crontab -l 2>/dev/null | grep -v "lottery_update_wrapper" | crontab - 2>/dev/null || true

# Agregar la nueva entrada
(crontab -l 2>/dev/null || echo ""; echo "$CRON_TIME $WRAPPER_SCRIPT >> /var/log/cron_lottery.log 2>&1") | crontab -

# Verificar que se agregó correctamente
if crontab -l | grep -q "lottery_update_wrapper"; then
    echo "✓ Cron job configurado exitosamente"
else
    echo "✗ Error: No se pudo configurar el cron job"
    exit 1
fi

# Verificar que el servicio cron está funcionando
echo "Verificando servicio cron..."
if systemctl is-active --quiet cron; then
    echo "✓ Servicio cron está activo"
elif systemctl is-active --quiet crond; then
    echo "✓ Servicio crond está activo"
else
    echo "⚠ Advertencia: El servicio cron podría no estar activo"
    echo "Intenta ejecutar: systemctl start cron"
fi

echo ""
echo "=========================================="
echo "CONFIGURACIÓN COMPLETADA"
echo "=========================================="
echo ""
echo "✓ Directorios creados: $SCRIPTS_DIR, $LOGS_DIR, $BACKUP_DIR"
echo "✓ Script Python: $PYTHON_SCRIPT"
echo "✓ Script wrapper: $WRAPPER_SCRIPT"
echo "✓ Cron job configurado: diariamente a las 2:00 AM"
echo ""
echo "Logs disponibles:"
echo "  - Wrapper: $LOGS_DIR/wrapper_YYYYMMDD.log"
echo "  - Python: $LOGS_DIR/lottery_update_YYYYMMDD.log"
echo "  - Cron: /var/log/cron_lottery.log"
echo ""
echo "Para ejecutar manualmente: $WRAPPER_SCRIPT"
echo "Para ver cron jobs: crontab -l"
echo ""