#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para actualizar la base de datos histórica de EuroDreams
Combina los datos históricos desde 2023 hasta 2025
Nota: El Dream Number es el número que los usuarios pueden elegir
"""

import pandas as pd
import numpy as np
from datetime import datetime
import shutil
import os
import re

def parse_date_eurodreams(date_str):
    """Convierte fecha de diferentes formatos a YYYY-MM-DD"""
    try:
        date_str = date_str.strip()
        
        # Formato "Jue-4-09-2025" o "Lun-25-08-2025"
        if '-' in date_str and any(day in date_str for day in ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']):
            # Remover el día de la semana
            parts = date_str.split('-')[1:]  # Saltar el día de semana
            if len(parts) == 3:
                day = int(parts[0])
                month = int(parts[1])  
                year = int(parts[2])
                return datetime(year, month, day).strftime("%Y-%m-%d")
        
        # Formato "DD-MM-YYYY"
        elif '-' in date_str and len(date_str.split('-')) == 3:
            parts = date_str.split('-')
            if len(parts[0]) <= 2 and len(parts[1]) <= 2 and len(parts[2]) == 4:
                return datetime(int(parts[2]), int(parts[1]), int(parts[0])).strftime("%Y-%m-%d")
        
        # Formato "YYYY-MM-DD" ya correcto
        elif len(date_str) == 10 and date_str[4] == '-':
            return date_str
            
        return None
    except Exception as e:
        print(f"Error procesando fecha '{date_str}': {e}")
        return None

def parse_eurodreams_row(row_data):
    """Extrae los datos de una fila de EuroDreams"""
    try:
        # Si es un string, separar por ";"
        if isinstance(row_data, str):
            parts = [p.strip() for p in row_data.split(';')]
        else:
            parts = row_data
        
        # Filtrar partes vacías
        parts = [p for p in parts if p and p.strip()]
        
        if len(parts) < 7:
            return None
        
        date_str = parts[0].strip()
        date_parsed = parse_date_eurodreams(date_str)
        
        if not date_parsed:
            return None
        
        # Extraer números (6 números principales)
        nums = []
        for i in range(1, 7):  
            try:
                num = int(parts[i].strip())
                if 1 <= num <= 40:  # Validar rango
                    nums.append(num)
                else:
                    return None
            except:
                return None
        
        # Extraer Dream Number (campo R)
        try:
            if len(parts) > 7:
                dream = int(parts[7].strip())
            else:
                dream = int(parts[6].strip())  # A veces puede estar en posición 6
            
            if 1 <= dream <= 5:  # Validar rango Dream
                return {
                    'Date': date_parsed,
                    'Num1': nums[0], 'Num2': nums[1], 'Num3': nums[2],
                    'Num4': nums[3], 'Num5': nums[4], 'Num6': nums[5],
                    'Dream': dream
                }
        except:
            pass
        
        return None
        
    except Exception as e:
        return None

def process_historical_file(file_path):
    """Procesa un archivo histórico de EuroDreams"""
    processed_data = []
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        print(f"  Procesando {len(lines)} líneas de {file_path}")
        
        for line_num, line in enumerate(lines, 1):
            line = line.strip()
            if not line or line.startswith('FECHA') or line.count(';') < 6:
                continue
            
            parsed_row = parse_eurodreams_row(line)
            if parsed_row:
                processed_data.append(parsed_row)
            elif line_num <= 10:  # Solo mostrar errores de las primeras líneas
                print(f"    ⚠ Error en línea {line_num}: {line[:50]}...")
    
    except Exception as e:
        print(f"  ❌ Error leyendo archivo {file_path}: {e}")
    
    return processed_data

def validate_eurodreams_numbers(row):
    """Valida que los números estén en los rangos correctos"""
    # Los 6 números principales deben estar entre 1 y 40
    main_numbers = [row['Num1'], row['Num2'], row['Num3'], row['Num4'], row['Num5'], row['Num6']]
    if not all(1 <= num <= 40 for num in main_numbers):
        return False
    
    # El Dream debe estar entre 1 y 5
    if not (1 <= row['Dream'] <= 5):
        return False
    
    return True

def process_eurodreams_data():
    """Procesa y actualiza los datos de EuroDreams"""
    
    print("=== ACTUALIZACIÓN DE DATOS HISTÓRICOS DE EURODREAMS ===")
    print(f"Fecha de proceso: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    
    # Rutas de archivos
    current_file = "DataFrame_EuroDreams.csv"
    historical_file_2024 = "Histórico de sorteos de Eurodreams-2024.csv"
    historical_file_2025 = "Histórico de sorteos de Eurodreams-2025.csv"
    backup_file = f"DataFrame_EuroDreams_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
    
    # Crear backup del archivo actual si existe
    if os.path.exists(current_file):
        shutil.copy2(current_file, backup_file)
        print(f"✓ Backup creado: {backup_file}")
        
        # Leer archivo actual para estadísticas
        current_df = pd.read_csv(current_file)
        print(f"✓ Archivo actual: {len(current_df)} registros")
        print(f"  Rango actual: {current_df['Date'].min()} a {current_df['Date'].max()}")
    else:
        print("⚠ No existe archivo previo")
        current_df = pd.DataFrame()
    
    # Procesar archivos históricos
    all_processed_data = []
    
    # Procesar archivo 2024
    if os.path.exists(historical_file_2024):
        print(f"\n📖 Procesando archivo: {historical_file_2024}")
        data_2024 = process_historical_file(historical_file_2024)
        all_processed_data.extend(data_2024)
        print(f"✓ Procesados {len(data_2024)} registros de 2024")
    else:
        print(f"⚠ No se encuentra: {historical_file_2024}")
    
    # Procesar archivo 2025
    if os.path.exists(historical_file_2025):
        print(f"\n📖 Procesando archivo: {historical_file_2025}")
        data_2025 = process_historical_file(historical_file_2025)
        all_processed_data.extend(data_2025)
        print(f"✓ Procesados {len(data_2025)} registros de 2025")
    else:
        print(f"⚠ No se encuentra: {historical_file_2025}")
    
    if len(all_processed_data) == 0:
        print("❌ No se pudieron procesar datos válidos")
        return
    
    # Crear DataFrame con todos los datos
    new_df = pd.DataFrame(all_processed_data)
    
    # Validar datos
    print(f"\n🔍 Validando {len(new_df)} registros...")
    valid_data = []
    invalid_count = 0
    
    for _, row in new_df.iterrows():
        if validate_eurodreams_numbers(row):
            valid_data.append(row.to_dict())
        else:
            invalid_count += 1
    
    if len(valid_data) == 0:
        print("❌ No hay datos válidos después de la validación")
        return
    
    # Crear DataFrame final
    final_df = pd.DataFrame(valid_data)
    
    # Ordenar por fecha y eliminar duplicados
    final_df = final_df.sort_values('Date').drop_duplicates(subset=['Date'], keep='last')
    
    print(f"\n📊 ESTADÍSTICAS DE PROCESAMIENTO:")
    print(f"  Registros procesados: {len(all_processed_data)}")
    print(f"  Registros válidos: {len(valid_data)}")
    print(f"  Registros inválidos: {invalid_count}")
    print(f"  Registros únicos finales: {len(final_df)}")
    print(f"  Rango de fechas: {final_df['Date'].min()} a {final_df['Date'].max()}")
    
    # Análisis estadístico básico
    print(f"\n🔍 ANÁLISIS DE DATOS:")
    
    # Distribución de números principales
    all_main_numbers = []
    for col in ['Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6']:
        all_main_numbers.extend(final_df[col].tolist())
    
    main_numbers_series = pd.Series(all_main_numbers)
    print(f"  Números principales más frecuentes:")
    print(f"    {main_numbers_series.value_counts().head(5).to_dict()}")
    
    # Distribución de Dream Numbers
    dream_dist = final_df['Dream'].value_counts().sort_index()
    print(f"  Distribución de Dream Numbers (1-5):")
    print(f"    {dream_dist.to_dict()}")
    
    # Validación final de rangos
    main_min = min(final_df[['Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6']].min())
    main_max = max(final_df[['Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6']].max())
    dream_min = final_df['Dream'].min()
    dream_max = final_df['Dream'].max()
    
    print(f"\n✓ VALIDACIÓN DE RANGOS:")
    print(f"  Números principales: {main_min}-{main_max} (esperado: 1-40)")
    print(f"  Dream Numbers: {dream_min}-{dream_max} (esperado: 1-5)")
    
    # Guardar archivo actualizado
    final_df.to_csv(current_file, index=False)
    print(f"\n💾 Archivo guardado: {current_file}")
    print(f"  Total de registros: {len(final_df)}")
    
    # Mostrar algunos registros de ejemplo
    print(f"\n📝 PRIMEROS REGISTROS:")
    print(final_df.head().to_string(index=False))
    
    print(f"\n📝 ÚLTIMOS REGISTROS:")
    print(final_df.tail().to_string(index=False))
    
    # Cobertura temporal
    start_date = datetime.strptime(final_df['Date'].min(), '%Y-%m-%d')
    end_date = datetime.strptime(final_df['Date'].max(), '%Y-%m-%d')
    total_days = (end_date - start_date).days
    expected_draws = total_days / 3.5  # Aproximadamente 2 sorteos por semana
    coverage = len(final_df) / expected_draws * 100 if expected_draws > 0 else 0
    
    print(f"\n📈 COBERTURA TEMPORAL:")
    print(f"  Período: {total_days} días")
    print(f"  Sorteos registrados: {len(final_df)}")
    print(f"  Cobertura estimada: {coverage:.1f}%")
    
    # Análisis por años
    final_df['Year'] = pd.to_datetime(final_df['Date']).dt.year
    yearly_counts = final_df['Year'].value_counts().sort_index()
    print(f"\n📅 DISTRIBUCIÓN POR AÑOS:")
    for year, count in yearly_counts.items():
        print(f"  {year}: {count} sorteos")
    
    print("\n✅ ACTUALIZACIÓN COMPLETADA")
    print("   Los datos de EuroDreams han sido actualizados exitosamente.")
    print("   El campo 'Dream' contiene el Dream Number elegible por los usuarios.")

if __name__ == "__main__":
    process_eurodreams_data()
