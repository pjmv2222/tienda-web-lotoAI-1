#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de diagnóstico para verificar por qué no se actualizan los DataFrames
"""

import os
import sys
import json
import pandas as pd
from datetime import datetime
import glob

def check_file_status(filepath, description):
    """Verifica el estado de un archivo"""
    print(f"\n{'='*60}")
    print(f"Verificando: {description}")
    print(f"Ruta: {filepath}")
    
    if os.path.exists(filepath):
        print(f"✅ El archivo existe")
        
        # Obtener información del archivo
        file_stats = os.stat(filepath)
        file_size_mb = file_stats.st_size / (1024 * 1024)
        mod_time = datetime.fromtimestamp(file_stats.st_mtime)
        days_old = (datetime.now() - mod_time).days
        
        print(f"   Tamaño: {file_size_mb:.2f} MB")
        print(f"   Última modificación: {mod_time.strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"   Antigüedad: {days_old} días")
        
        if days_old > 7:
            print(f"   ⚠️ ADVERTENCIA: El archivo tiene más de 7 días sin actualizar")
        
        return True, days_old
    else:
        print(f"❌ El archivo NO existe")
        return False, -1

def check_lottery_data_json():
    """Verifica el contenido del archivo lottery-data.json"""
    json_path = r'c:\Users\Pedro\Desktop\Proyec-web-loto-ia\tienda-web-lotoAI-1\src\assets\lottery-data.json'
    
    if os.path.exists(json_path):
        try:
            with open(json_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                
            print(f"\n📊 Contenido de lottery-data.json:")
            
            if 'resultados' in data:
                resultados = data['resultados']
                print(f"   Total de resultados: {len(resultados)}")
                
                for resultado in resultados:
                    game = resultado.get('game', 'unknown')
                    date = resultado.get('date', 'sin fecha')
                    numbers = resultado.get('numbers', [])
                    print(f"   - {game}: {date} - {len(numbers)} números")
                    
                    # Verificar si la fecha es reciente
                    if 'Sorteo del' in date:
                        print(f"     Fecha encontrada: {date}")
            else:
                print("   ⚠️ No se encontró la clave 'resultados' en el JSON")
                
        except Exception as e:
            print(f"   ❌ Error al leer JSON: {e}")
    else:
        print(f"   ❌ lottery-data.json no encontrado")

def check_dataframes():
    """Verifica el estado de todos los DataFrames"""
    base_path = r'c:\Users\Pedro\Desktop\Proyec-web-loto-ia\tienda-web-lotoAI-1\IAs-Loto'
    
    dataframes = {
        'Bonoloto': os.path.join(base_path, 'Bonoloto', 'DataFrame_Bonoloto.csv'),
        'ElGordo': os.path.join(base_path, 'ElGordo', 'DataFrame_ElGordo.csv'),
        'EuroDreams': os.path.join(base_path, 'EuroDreams', 'DataFrame_EuroDreams.csv'),
        'EuroMillones': os.path.join(base_path, 'EuroMillon-CSV', 'DataFrame_Euromillones.csv'),
        'LaPrimitiva': os.path.join(base_path, 'LaPrimitiva', 'DataFrame_LaPrimitiva.csv'),
        'Loteria Nacional': os.path.join(base_path, 'LOTERIA NACIONAL', 'DataFrame_LOTERIA NACIONAL.csv'),
        'Lototurf': os.path.join(base_path, 'Lototurf', 'DataFrame_Lototurf.csv')
    }
    
    print(f"\n{'='*60}")
    print("ESTADO DE LOS DATAFRAMES:")
    print(f"{'='*60}")
    
    for name, path in dataframes.items():
        exists, days_old = check_file_status(path, f"DataFrame {name}")
        
        if exists and days_old > 3:
            # Verificar el último registro
            try:
                df = pd.read_csv(path, encoding='utf-8')
                if not df.empty:
                    # Buscar columna de fecha
                    date_col = 'Date' if 'Date' in df.columns else 'Fecha'
                    if date_col in df.columns:
                        last_date = df[date_col].iloc[-1]
                        print(f"   Última fecha en el DataFrame: {last_date}")
            except Exception as e:
                print(f"   Error al leer DataFrame: {e}")

def check_logs():
    """Verifica los logs recientes"""
    log_dirs = [
        r'c:\Users\Pedro\Desktop\Proyec-web-loto-ia\tienda-web-lotoAI-1\logs',
        r'c:\Users\Pedro\Desktop\Proyec-web-loto-ia\logs'
    ]
    
    print(f"\n{'='*60}")
    print("VERIFICACIÓN DE LOGS:")
    print(f"{'='*60}")
    
    for log_dir in log_dirs:
        if os.path.exists(log_dir):
            print(f"\n📁 Directorio de logs: {log_dir}")
            log_files = glob.glob(os.path.join(log_dir, '*.log'))
            
            if log_files:
                # Ordenar por fecha de modificación
                log_files.sort(key=os.path.getmtime, reverse=True)
                
                # Mostrar los últimos 5 logs
                for log_file in log_files[:5]:
                    mod_time = datetime.fromtimestamp(os.path.getmtime(log_file))
                    print(f"   - {os.path.basename(log_file)}: {mod_time.strftime('%Y-%m-%d %H:%M:%S')}")
                    
                # Leer las últimas líneas del log más reciente
                if log_files:
                    print(f"\n📄 Últimas líneas del log más reciente:")
                    try:
                        with open(log_files[0], 'r', encoding='utf-8') as f:
                            lines = f.readlines()
                            for line in lines[-10:]:
                                print(f"   {line.strip()}")
                    except Exception as e:
                        print(f"   Error al leer log: {e}")
            else:
                print(f"   No se encontraron archivos de log")
        else:
            print(f"   Directorio no existe: {log_dir}")

def main():
    print("="*80)
    print("DIAGNÓSTICO DE ACTUALIZACIÓN DE DATAFRAMES")
    print(f"Fecha y hora: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("="*80)
    
    # 1. Verificar lottery-data.json
    check_lottery_data_json()
    
    # 2. Verificar DataFrames
    check_dataframes()
    
    # 3. Verificar logs
    check_logs()
    
    print(f"\n{'='*80}")
    print("DIAGNÓSTICO COMPLETADO")
    print("="*80)

if __name__ == "__main__":
    main()
