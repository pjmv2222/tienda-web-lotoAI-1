#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para actualizar los DataFrames de resultados de loterías
desde el archivo lottery-data.json generado por el scraper
VERSIÓN OPTIMIZADA - Correcciones reales de pandas sin supresión de warnings
"""

import os
import sys
import json
import pandas as pd
import logging
from datetime import datetime
import traceback
import requests  # Para Mailjet API

# Detectar el sistema operativo y ajustar las rutas
if sys.platform == "win32":
    # Rutas para Windows (ajusta según tu estructura real)
    BASE_DIR = r'c:\Users\Pedro\Desktop\Proyec-web-loto-ia\tienda-web-lotoAI-1'
    LOG_DIR = os.path.join(BASE_DIR, 'logs')
    LOTTERY_DATA_PATH = os.path.join(BASE_DIR, 'src', 'assets', 'lottery-data.json')
    BASE_PATH = os.path.join(BASE_DIR, 'IAs-Loto')
    BACKUP_PATH = os.path.join(BASE_DIR, 'datasets', 'backup')
else:
    # Rutas para Linux (servidor)
    LOG_DIR = '/var/www/tienda-web-lotoAI-1/logs'
    LOTTERY_DATA_PATH = '/var/www/tienda-web-lotoAI-1/src/assets/lottery-data.json'
    BASE_PATH = '/var/www/tienda-web-lotoAI-1/IAs-Loto'
    BACKUP_PATH = '/var/www/tienda-web-lotoAI-1/datasets/backup'

# Configuración de logging
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

# Mapeo de loterías a sus rutas de DataFrame - USANDO COLUMNAS EXISTENTES
LOTTERY_PATHS = {
    'bonoloto': {
        'path': f'{BASE_PATH}/Bonoloto/DataFrame_Bonoloto.csv',
        'columns': ['Date', 'Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6', 'Refund']
    },
    'elgordo': {
        'path': f'{BASE_PATH}/ElGordo/DataFrame_ElGordo.csv',
        'columns': ['Date', 'Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Clue']
    },
    'eurodreams': {
        'path': f'{BASE_PATH}/EuroDreams/DataFrame_EuroDreams.csv',
        'columns': ['Date', 'Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6', 'Dream']
    },
    'euromillones': {
        'path': f'{BASE_PATH}/EuroMillon-CSV/DataFrame_Euromillones.csv',
        'columns': ['Date', 'Num_1', 'Num_2', 'Num_3', 'Num_4', 'Num_5', 'Start_1', 'Star_2']
    },
    'primitiva': {
        'path': f'{BASE_PATH}/LaPrimitiva/DataFrame_LaPrimitiva.csv',
        'columns': ['Date', 'Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6', 'Refund']  # Sin joker
    },
    'loterianacional': {
        'path': f'{BASE_PATH}/LOTERIA NACIONAL/DataFrame_LOTERIA NACIONAL.csv',
        'columns': ['Fecha', 'Sorteo', 'Euros', 'Numero', 'Categoria']
    },
    'lototurf': {
        'path': f'{BASE_PATH}/Lototurf/DataFrame_Lototurf.csv',
        'columns': ['Date', 'Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6', 'Horse']
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
    """Extrae y formatea la fecha al formato YYYY-MM-DD que usan los DataFrames"""
    if not date_str:
        return datetime.now().strftime('%Y-%m-%d')
    
    try:
        # Buscar patrón DD/MM/YYYY y convertir a YYYY-MM-DD
        import re
        date_pattern = r'(\d{1,2})/(\d{1,2})/(\d{4})'
        match = re.search(date_pattern, str(date_str))
        
        if match:
            day, month, year = match.groups()
            return f"{year}-{month.zfill(2)}-{day.zfill(2)}"
        
        # Si no encontramos patrón, usar fecha actual
        return datetime.now().strftime('%Y-%m-%d')
        
    except Exception as e:
        logger.error(f"Error al procesar fecha '{date_str}': {e}")
        return datetime.now().strftime('%Y-%m-%d')

def get_original_columns(lottery_name):
    """Devuelve las columnas ORIGINALES de cada DataFrame (sin duplicados y sin joker)"""
    original_schemas = {
        'bonoloto': ['Date', 'Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6', 'Refund'],
        'primitiva': ['Date', 'Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6', 'Refund'],  # Sin joker - no es parte de la predicción
        'euromillones': ['Date', 'Num_1', 'Num_2', 'Num_3', 'Num_4', 'Num_5', 'Start_1', 'Star_2'],
        'elgordo': ['Date', 'Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Clue'],
        'eurodreams': ['Date', 'Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6', 'Dream'],
        'lototurf': ['Date', 'Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6', 'Horse'],
        'loterianacional': ['Fecha', 'Sorteo', 'Euros', 'Numero', 'Categoria']
    }
    return original_schemas.get(lottery_name, [])

def load_existing_dataframe(lottery_info):
    """Carga un DataFrame existente usando SOLO las columnas originales"""
    csv_path = lottery_info['path']
    lottery_name = None
    
    # Detectar el tipo de lotería por la ruta
    for name, info in LOTTERY_PATHS.items():
        if info['path'] == csv_path:
            lottery_name = name
            break
    
    try:
        # Obtener las columnas originales ANTES de cargar
        original_columns = get_original_columns(lottery_name)
        
        if os.path.exists(csv_path):
            # LEER SOLO las columnas originales usando usecols
            try:
                df = pd.read_csv(csv_path, encoding='utf-8', dtype=str, na_filter=False, usecols=original_columns)
                logger.info(f"DataFrame cargado: {len(df)} filas, columnas originales: {list(df.columns)}")
            except ValueError as ve:
                # Si alguna columna original no existe, cargar normalmente y filtrar
                logger.warning(f"Algunas columnas originales no existen, filtrando: {ve}")
                df_full = pd.read_csv(csv_path, encoding='utf-8', dtype=str, na_filter=False)
                existing_original_cols = [col for col in original_columns if col in df_full.columns]
                df = df_full[existing_original_cols].copy()
                logger.info(f"Columnas filtradas disponibles: {list(df.columns)}")
                
            return df
        else:
            logger.warning(f"Archivo CSV no existe, creando nuevo DataFrame: {csv_path}")
            # Crear DataFrame vacío con las columnas originales
            df = pd.DataFrame(columns=original_columns)
            return df
            
    except Exception as e:
        logger.error(f"Error al cargar DataFrame {csv_path}: {e}")
        logger.error(traceback.format_exc())
        # En caso de error, crear DataFrame vacío con columnas correctas
        original_columns = get_original_columns(lottery_name) or []
        return pd.DataFrame(columns=original_columns)

def parse_lottery_result(game_name, result_data):
    """Parsea los datos de una lotería específica usando columnas EXISTENTES"""
    try:
        fecha = extract_date_from_string(result_data.get('date', ''))
        
        # VALIDACIÓN: Asegurar que la fecha esté en formato correcto YYYY-MM-DD
        try:
            datetime.strptime(fecha, '%Y-%m-%d')
        except ValueError:
            logger.error(f"FECHA INVÁLIDA generada para {game_name}: '{fecha}'")
            fecha = datetime.now().strftime('%Y-%m-%d')
            logger.info(f"Usando fecha actual como respaldo: {fecha}")
        
        parsed_data = None
        
        if game_name == 'bonoloto':
            numbers = result_data.get('numbers', [])
            if len(numbers) >= 6:
                # Si no hay reintegro, usar 0 como valor por defecto
                reintegro = result_data.get('reintegro', 0)
                if reintegro == '' or reintegro is None:
                    reintegro = 0
                parsed_data = {
                    'Date': fecha,
                    'Num1': int(numbers[0]),
                    'Num2': int(numbers[1]),
                    'Num3': int(numbers[2]),
                    'Num4': int(numbers[3]),
                    'Num5': int(numbers[4]),
                    'Num6': int(numbers[5]),
                    'Refund': reintegro
                }
        
        elif game_name == 'primitiva':
            numbers = result_data.get('numbers', [])
            if len(numbers) >= 6:
                # Si no hay reintegro, usar 0 como valor por defecto
                reintegro = result_data.get('reintegro', 0)
                if reintegro == '' or reintegro is None:
                    reintegro = 0
                parsed_data = {
                    'Date': fecha,
                    'Num1': int(numbers[0]),
                    'Num2': int(numbers[1]),
                    'Num3': int(numbers[2]),
                    'Num4': int(numbers[3]),
                    'Num5': int(numbers[4]),
                    'Num6': int(numbers[5]),
                    'Refund': reintegro
                    # Joker NO incluido - no es parte de la predicción del usuario
                }
        
        elif game_name == 'euromillones':
            numbers = result_data.get('numbers', [])
            stars = result_data.get('stars', [])
            if len(numbers) >= 5 and len(stars) >= 2:
                parsed_data = {
                    'Date': fecha,
                    'Num_1': int(numbers[0]),
                    'Num_2': int(numbers[1]),
                    'Num_3': int(numbers[2]),
                    'Num_4': int(numbers[3]),
                    'Num_5': int(numbers[4]),
                    'Start_1': int(stars[0]),
                    'Star_2': int(stars[1])
                }
        
        elif game_name == 'elgordo':
            numbers = result_data.get('numbers', [])
            if len(numbers) >= 5:
                parsed_data = {
                    'Date': fecha,
                    'Num1': int(numbers[0]),
                    'Num2': int(numbers[1]),
                    'Num3': int(numbers[2]),
                    'Num4': int(numbers[3]),
                    'Num5': int(numbers[4]),
                    'Clue': result_data.get('clave', '')
                }
        
        elif game_name == 'eurodreams':
            numbers = result_data.get('numbers', [])
            if len(numbers) >= 6:
                parsed_data = {
                    'Date': fecha,
                    'Num1': int(numbers[0]),
                    'Num2': int(numbers[1]),
                    'Num3': int(numbers[2]),
                    'Num4': int(numbers[3]),
                    'Num5': int(numbers[4]),
                    'Num6': int(numbers[5]),
                    'Dream': result_data.get('dream', '')
                }
        
        elif game_name == 'loterianacional':
            # La lotería nacional tiene un formato especial con sorteos
            sorteos = result_data.get('sorteos', [])
            if sorteos and len(sorteos) > 0:
                primer_sorteo = sorteos[0]
                premios = primer_sorteo.get('premios', [])
                parsed_data = {
                    'Fecha': extract_date_from_string(primer_sorteo.get('fecha', fecha)),
                    'Sorteo': primer_sorteo.get('sorteo', ''),
                    'Euros': 300000,  # Valor por defecto
                    'Numero': premios[0] if len(premios) > 0 else '',
                    'Categoria': 'Primer Premio Ordinario'
                }
        
        elif game_name == 'lototurf':
            numbers = result_data.get('numbers', [])
            if len(numbers) >= 6:
                parsed_data = {
                    'Date': fecha,
                    'Num1': int(numbers[0]),
                    'Num2': int(numbers[1]),
                    'Num3': int(numbers[2]),
                    'Num4': int(numbers[3]),
                    'Num5': int(numbers[4]),
                    'Num6': int(numbers[5]),
                    'Horse': result_data.get('caballo', '')
                }
        
        return parsed_data
        
    except Exception as e:
        logger.error(f"Error al parsear datos de {game_name}: {e}")
        logger.error(traceback.format_exc())
        return None

def update_dataframe(lottery_name, lottery_info, new_data):
    """Actualiza el DataFrame con los nuevos datos usando columnas EXISTENTES"""
    try:
        # Cargar DataFrame existente
        df = load_existing_dataframe(lottery_info)
        
        if new_data is None:
            logger.warning(f"No hay nuevos datos para actualizar {lottery_name}")
            return False

        # Obtener las columnas originales para esta lotería
        original_columns = get_original_columns(lottery_name)
        if not original_columns:
            logger.error(f"No se pudieron obtener columnas originales para {lottery_name}")
            return False
        
        # VALIDAR: Filtrar new_data para incluir SOLO las columnas originales
        filtered_new_data = {}
        for col in original_columns:
            if col in new_data:
                filtered_new_data[col] = new_data[col]
            else:
                logger.warning(f"Columna original {col} no encontrada en new_data para {lottery_name}")
        
        if not filtered_new_data:
            logger.error(f"No hay datos válidos después de filtrar por columnas originales para {lottery_name}")
            return False

        # Detectar la columna de fecha según el esquema
        date_column = 'Fecha' if 'Fecha' in original_columns else 'Date'
        fecha_nueva = filtered_new_data.get(date_column)
        
        if fecha_nueva and date_column in df.columns and not df.empty:
            # Convertir columna fecha a string de forma explícita
            existing_dates = df[date_column].astype(str, copy=False).values
            if fecha_nueva in existing_dates:
                logger.info(f"La fecha {fecha_nueva} ya existe en {lottery_name}, actualizando registro...")
                # Actualizar registro existente SOLO con columnas originales
                mask = df[date_column].astype(str, copy=False) == fecha_nueva
                for column, value in filtered_new_data.items():
                    if column in df.columns:
                        df.loc[mask, column] = value
            else:
                # Agregar nueva fila SOLO con columnas originales
                logger.info(f"Agregando nueva fecha {fecha_nueva} a {lottery_name}")
                new_row = pd.DataFrame([filtered_new_data])
                df = pd.concat([df, new_row], ignore_index=True, sort=False)
        else:
            # Si el DataFrame está vacío o no hay fecha, simplemente agregar con columnas originales
            logger.info(f"Agregando datos a {lottery_name} (DataFrame vacío o sin fecha)")
            new_row = pd.DataFrame([filtered_new_data])
            df = pd.concat([df, new_row], ignore_index=True, sort=False)
        
        # Crear backup antes de guardar
        create_backup(lottery_info['path'])
        
        # GARANTIZAR: Trabajar SOLO con columnas originales antes de guardar
        df_clean = df[original_columns].copy()
        
        # LIMPIAR: Eliminar filas completamente vacías o con solo NaN
        df_clean = df_clean.dropna(how='all')
        
        # LIMPIAR: Eliminar filas donde la columna de fecha está vacía (son datos inválidos)
        date_column = 'Fecha' if 'Fecha' in df_clean.columns else 'Date'
        if date_column in df_clean.columns:
            df_clean = df_clean[df_clean[date_column].notna()]
            df_clean = df_clean[df_clean[date_column].astype(str).str.strip() != '']
        
        # Guardar el DataFrame limpio sin valores NaN
        os.makedirs(os.path.dirname(lottery_info['path']), exist_ok=True)
        df_clean.to_csv(lottery_info['path'], index=False, encoding='utf-8', na_rep='')
        logger.info(f"DataFrame {lottery_name} guardado: {len(df_clean)} filas con columnas: {list(df_clean.columns)}")
        
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

def send_mailjet_notification(subject, html_content, text_content=""):
    """Envía notificación por email usando Mailjet API"""
    try:
        # Configuración de Mailjet
        API_KEY = '4bf635e9052dd9ad0b18200a0ae43fb0'
        API_SECRET = '750dabff4daca14b5a4128e1669b75f6'
        
        # Configuración del mensaje
        sender_email = "notificaciones@lotoai.com"  # Ajusta según tu dominio verificado en Mailjet
        sender_name = "Sistema LotoAI"
        receiver_email = "pjulianmv@gmail.com"
        receiver_name = "Pedro Julián"
        
        # URL de la API de Mailjet
        url = "https://api.mailjet.com/v3.1/send"
        
        # Datos del mensaje
        data = {
            "Messages": [
                {
                    "From": {
                        "Email": sender_email,
                        "Name": sender_name
                    },
                    "To": [
                        {
                            "Email": receiver_email,
                            "Name": receiver_name
                        }
                    ],
                    "Subject": subject,
                    "TextPart": text_content if text_content else "Por favor, vea la versión HTML de este mensaje.",
                    "HTMLPart": html_content,
                    "CustomID": f"LotoAI-Update-{datetime.now().strftime('%Y%m%d-%H%M%S')}"
                }
            ]
        }
        
        # Enviar petición a Mailjet
        response = requests.post(
            url,
            auth=(API_KEY, API_SECRET),
            json=data
        )
        
        if response.status_code == 200:
            logger.info("✅ Notificación enviada exitosamente vía Mailjet")
            return True
        else:
            logger.error(f"❌ Error al enviar email vía Mailjet: {response.status_code} - {response.text}")
            return False
            
    except Exception as e:
        logger.error(f"❌ Excepción al enviar notificación por Mailjet: {e}")
        logger.error(traceback.format_exc())
        return False

def send_error_notification(error_details, success_count, error_count):
    """Envía notificación por email cuando hay errores en la actualización"""
    try:
        # Asunto del email
        subject = f"⚠️ Error en actualización de DataFrames - {datetime.now().strftime('%Y-%m-%d')}"
        
        # Cuerpo HTML del email
        html = f"""
        <html>
          <head>
            <style>
              body {{ font-family: Arial, sans-serif; }}
              .header {{ background-color: #f44336; color: white; padding: 20px; border-radius: 5px; }}
              .content {{ padding: 20px; }}
              .success {{ color: #4CAF50; font-weight: bold; }}
              .error {{ color: #f44336; font-weight: bold; }}
              .details {{ background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px; }}
              pre {{ white-space: pre-wrap; word-wrap: break-word; }}
              .footer {{ margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }}
            </style>
          </head>
          <body>
            <div class="header">
              <h2>⚠️ Error en la actualización de DataFrames de Lotería</h2>
            </div>
            <div class="content">
              <p><strong>Fecha:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
              <p><strong>Servidor:</strong> {'Windows (Desarrollo)' if sys.platform == 'win32' else 'Linux (Producción)'}</p>
              
              <h3>📊 Resumen de Resultados:</h3>
              <ul>
                <li class="success">✅ Actualizaciones exitosas: {success_count}</li>
                <li class="error">❌ Errores encontrados: {error_count}</li>
              </ul>
              
              <div class="details">
                <h3>📝 Detalles de los errores:</h3>
                <pre>{chr(10).join(error_details) if error_details else 'No hay detalles específicos'}</pre>
              </div>
              
              <h3>🔧 Acciones recomendadas:</h3>
              <ol>
                <li>Revisar los logs en: {LOG_DIR}/lottery_update_{datetime.now().strftime('%Y%m%d')}.log</li>
                <li>Verificar que el scraper esté funcionando correctamente</li>
                <li>Comprobar la estructura del archivo lottery-data.json</li>
                <li>Verificar permisos de escritura en los directorios de DataFrames</li>
              </ol>
              
              <div class="footer">
                <p>Este es un mensaje automático del sistema de actualización de LotoAI.</p>
                <p>No responder a este correo.</p>
              </div>
            </div>
          </body>
        </html>
        """
        
        # Texto plano alternativo
        text = f"""
        Error en la actualización de DataFrames de Lotería
        
        Fecha: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        Servidor: {'Windows (Desarrollo)' if sys.platform == 'win32' else 'Linux (Producción)'}
        
        Resultados:
        - Actualizaciones exitosas: {success_count}
        - Errores encontrados: {error_count}
        
        Detalles de los errores:
        {chr(10).join(error_details) if error_details else 'No hay detalles específicos'}
        
        Por favor, revisa los logs para más información.
        """
        
        return send_mailjet_notification(subject, html, text)
        
    except Exception as e:
        logger.error(f"Error preparando notificación: {e}")
        return False

def send_success_summary(success_count, total_count):
    """Envía un resumen de éxito cuando todo sale bien (opcional)"""
    try:
        # Solo enviar si es el primer día del mes o si se solicita explícitamente
        if datetime.now().day != 1 and '--force-summary' not in sys.argv:
            return
        
        subject = f"✅ Actualización exitosa de DataFrames - {datetime.now().strftime('%Y-%m-%d')}"
        
        html = f"""
        <html>
          <head>
            <style>
              body {{ font-family: Arial, sans-serif; }}
              .header {{ background-color: #4CAF50; color: white; padding: 20px; border-radius: 5px; }}
              .content {{ padding: 20px; }}
              .footer {{ margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }}
            </style>
          </head>
          <body>
            <div class="header">
              <h2>✅ Actualización Exitosa de DataFrames</h2>
            </div>
            <div class="content">
              <p><strong>Fecha:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
              <p><strong>Servidor:</strong> {'Windows (Desarrollo)' if sys.platform == 'win32' else 'Linux (Producción)'}</p>
              
              <h3>📊 Resumen:</h3>
              <p>Todas las loterías se actualizaron correctamente.</p>
              <ul>
                <li>✅ Total de loterías actualizadas: {success_count}/{total_count}</li>
              </ul>
              
              <div class="footer">
                <p>Este es un resumen mensual automático del sistema LotoAI.</p>
              </div>
            </div>
          </body>
        </html>
        """
        
        text = f"""
        Actualización Exitosa de DataFrames
        
        Fecha: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        Total de loterías actualizadas: {success_count}/{total_count}
        
        Todas las loterías se actualizaron correctamente.
        """
        
        return send_mailjet_notification(subject, html, text)
        
    except Exception as e:
        logger.error(f"Error enviando resumen de éxito: {e}")
        return False

def send_cron_failure_notification(error_msg, log_content=""):
    """Envía notificación cuando falla el cron job"""
    try:
        subject = f"🔴 CRÍTICO: Fallo en Cron Job de LotoAI - {datetime.now().strftime('%Y-%m-%d')}"
        
        html = f"""
        <html>
          <head>
            <style>
              body {{ font-family: Arial, sans-serif; }}
              .header {{ background-color: #d32f2f; color: white; padding: 20px; border-radius: 5px; }}
              .content {{ padding: 20px; }}
              .critical {{ color: #d32f2f; font-weight: bold; font-size: 18px; }}
              .details {{ background-color: #ffebee; padding: 15px; border-radius: 5px; margin-top: 20px; border-left: 4px solid #d32f2f; }}
              pre {{ white-space: pre-wrap; word-wrap: break-word; background-color: #f5f5f5; padding: 10px; }}
              .footer {{ margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }}
            </style>
          </head>
          <body>
            <div class="header">
              <h2>🔴 FALLO CRÍTICO EN CRON JOB</h2>
            </div>
            <div class="content">
              <p class="critical">⚠️ El sistema automático de actualización ha fallado</p>
              
              <p><strong>Fecha y hora:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
              <p><strong>Servidor:</strong> {'Windows (Desarrollo)' if sys.platform == 'win32' else 'Linux (Producción)'}</p>
              
              <div class="details">
                <h3>Error detectado:</h3>
                <pre>{error_msg}</pre>
              </div>
              
              {f'<div class="details"><h3>Últimas líneas del log:</h3><pre>{log_content}</pre></div>' if log_content else ''}
              
              <h3>🚨 ACCIÓN URGENTE REQUERIDA:</h3>
              <ol>
                <li><strong>Verificar el estado del servidor</strong></li>
                <li><strong>Revisar los logs del sistema en: {LOG_DIR}</strong></li>
                <li><strong>Comprobar el crontab: sudo crontab -l</strong></li>
                <li><strong>Ejecutar manualmente el script para diagnosticar</strong></li>
                <li><strong>Verificar permisos y rutas de archivos</strong></li>
              </ol>
              
              <h3>Comandos útiles para diagnóstico:</h3>
              <pre>
# Ver logs del cron
sudo grep CRON /var/log/syslog | tail -20

# Ejecutar script manualmente
cd /var/www/tienda-web-lotoAI-1/scripts
python3 update_lottery_dataframes.py

# Verificar permisos
ls -la /var/www/tienda-web-lotoAI-1/scripts/
ls -la /var/www/tienda-web-lotoAI-1/logs/
              </pre>
              
              <div class="footer">
                <p><strong>⚠️ Este es un mensaje crítico que requiere atención inmediata.</strong></p>
                <p>Sistema de monitoreo LotoAI</p>
              </div>
            </div>
          </body>
        </html>
        """
        
        text = f"""
        FALLO CRÍTICO EN CRON JOB DE LOTOAI
        
        Fecha: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        Servidor: {'Windows (Desarrollo)' if sys.platform == 'win32' else 'Linux (Producción)'}
        
        Error: {error_msg}
        
        ACCIÓN URGENTE REQUERIDA - Revisar el sistema inmediatamente.
        
        Consultar los logs en: {LOG_DIR}
        """
        
        return send_mailjet_notification(subject, html, text)
        
    except Exception as e:
        logger.error(f"Error enviando notificación crítica: {e}")
        return False

def main():
    """Función principal"""
    logger.info("="*60)
    logger.info("Iniciando actualización de DataFrames de loterías")
    logger.info(f"Fecha y hora: {datetime.now()}")
    logger.info("="*60)
    
    error_details = []  # Almacenar detalles de errores
    
    # Verificar que el archivo lottery-data.json existe y es reciente
    if os.path.exists(LOTTERY_DATA_PATH):
        file_mod_time = datetime.fromtimestamp(os.path.getmtime(LOTTERY_DATA_PATH))
        days_old = (datetime.now() - file_mod_time).days
        if days_old > 1:
            error_msg = f"⚠️ El archivo lottery-data.json tiene {days_old} días de antigüedad"
            logger.warning(error_msg)
            error_details.append(error_msg)
    
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
        
        try:
            if lottery_name in resultados_por_juego:
                # Parsear datos de la lotería
                new_data = parse_lottery_result(lottery_name, resultados_por_juego[lottery_name])
                
                # Actualizar DataFrame
                if update_dataframe(lottery_name, lottery_info, new_data):
                    success_count += 1
                    logger.info(f"✓ {lottery_name} actualizado correctamente")
                else:
                    error_count += 1
                    error_msg = f"✗ Error al actualizar {lottery_name}"
                    logger.error(error_msg)
                    error_details.append(error_msg)
            else:
                logger.warning(f"No se encontraron datos para {lottery_name} en lottery-data.json")
                error_count += 1
                error_details.append(f"No hay datos para {lottery_name}")
        except Exception as e:
            error_count += 1
            error_msg = f"Excepción procesando {lottery_name}: {str(e)}"
            logger.error(error_msg)
            error_details.append(error_msg)
    
    # Resumen final
    logger.info("\n" + "="*60)
    logger.info("RESUMEN DE LA ACTUALIZACIÓN")
    logger.info(f"Loterías actualizadas exitosamente: {success_count}")
    logger.info(f"Loterías con errores: {error_count}")
    logger.info(f"Total de loterías procesadas: {success_count + error_count}")
    logger.info("="*60)
    
    # Enviar notificación si hay errores
    if error_count > 0 or len(error_details) > 0:
        send_error_notification(
            error_details, 
            success_count, 
            error_count
        )
    elif success_count == len(LOTTERY_PATHS):
        # Opcionalmente enviar resumen de éxito (solo el día 1 de cada mes)
        send_success_summary(success_count, len(LOTTERY_PATHS))
    
    # Retornar código de salida apropiado
    if error_count > 0:
        sys.exit(1)
    else:
        sys.exit(0)

if __name__ == "__main__":
    main()