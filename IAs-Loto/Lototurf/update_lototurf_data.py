#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para actualizar la base de datos histórica del Lototurf
Combina los datos históricos completos desde 2005 hasta 2025
Nota: El CABALLO es el número que los usuarios pueden elegir, el reintegro no.
"""

import pandas as pd
import numpy as np
from datetime import datetime
import shutil
import os

def parse_date_lototurf(date_str):
    """Convierte fecha de formato DD/MM/YYYY a YYYY-MM-DD"""
    try:
        return datetime.strptime(date_str, "%d/%m/%Y").strftime("%Y-%m-%d")
    except:
        return None

def validate_lototurf_numbers(row):
    """Valida que los números estén en los rangos correctos"""
    # Los 6 números principales deben estar entre 1 y 31
    main_numbers = [row['Num1'], row['Num2'], row['Num3'], row['Num4'], row['Num5'], row['Num6']]
    if not all(1 <= num <= 31 for num in main_numbers):
        return False
    
    # El CABALLO debe estar entre 1 y 12 (según el formato típico del Lototurf)
    if not (1 <= row['Horse'] <= 12):
        return False
    
    return True

def process_lototurf_data():
    """Procesa y actualiza los datos del Lototurf"""
    
    print("=== ACTUALIZACIÓN DE DATOS HISTÓRICOS DEL LOTOTURF ===")
    print(f"Fecha de proceso: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    
    # Rutas de archivos
    current_file = "DataFrame_Lototurf.csv"
    historical_file = "Histórico de Resultados - Lototurf  - 2005 a 2025.csv"
    backup_file = f"DataFrame_Lototurf_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
    
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
    
    # Leer archivo histórico
    print(f"\n📖 Leyendo archivo histórico: {historical_file}")
    historical_df = pd.read_csv(historical_file)
    print(f"✓ Archivo histórico leído: {len(historical_df)} registros")
    
    # Procesar datos históricos
    processed_data = []
    invalid_rows = 0
    
    print("\n🔄 Procesando datos históricos...")
    
    for idx, row in historical_df.iterrows():
        try:
            # Convertir fecha
            date_converted = parse_date_lototurf(row['FECHA'])
            if not date_converted:
                invalid_rows += 1
                continue
            
            # Extraer números principales (6 números)
            num1 = int(row['COMB. GANADORA'])
            num2 = int(row.iloc[2])  # Segunda columna después de FECHA
            num3 = int(row.iloc[3])
            num4 = int(row.iloc[4])
            num5 = int(row.iloc[5])
            num6 = int(row.iloc[6])
            
            # Extraer CABALLO (número elegible por el usuario)
            horse = int(row['CABALLO'])
            
            # Crear registro
            record = {
                'Date': date_converted,
                'Num1': num1,
                'Num2': num2,
                'Num3': num3,
                'Num4': num4,
                'Num5': num5,
                'Num6': num6,
                'Horse': horse
            }
            
            # Validar números
            temp_df = pd.DataFrame([record])
            if validate_lototurf_numbers(temp_df.iloc[0]):
                processed_data.append(record)
            else:
                invalid_rows += 1
                print(f"⚠ Fila inválida en {date_converted}: números fuera de rango")
        
        except Exception as e:
            invalid_rows += 1
            if idx < 5:  # Solo mostrar los primeros errores
                print(f"⚠ Error procesando fila {idx}: {str(e)}")
    
    # Crear DataFrame final
    new_df = pd.DataFrame(processed_data)
    
    if len(new_df) == 0:
        print("❌ No se pudieron procesar datos válidos")
        return
    
    # Ordenar por fecha y eliminar duplicados
    new_df = new_df.sort_values('Date').drop_duplicates(subset=['Date'], keep='last')
    
    print(f"\n📊 ESTADÍSTICAS DE PROCESAMIENTO:")
    print(f"  Registros procesados: {len(processed_data)}")
    print(f"  Registros inválidos: {invalid_rows}")
    print(f"  Registros únicos finales: {len(new_df)}")
    print(f"  Rango de fechas: {new_df['Date'].min()} a {new_df['Date'].max()}")
    
    # Análisis estadístico básico
    print(f"\n🔍 ANÁLISIS DE DATOS:")
    
    # Distribución de números principales
    all_main_numbers = []
    for col in ['Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6']:
        all_main_numbers.extend(new_df[col].tolist())
    
    main_numbers_series = pd.Series(all_main_numbers)
    print(f"  Números principales más frecuentes:")
    print(f"    {main_numbers_series.value_counts().head(5).to_dict()}")
    
    # Distribución de caballos
    horse_dist = new_df['Horse'].value_counts().sort_index()
    print(f"  Distribución de caballos (1-12):")
    print(f"    {horse_dist.to_dict()}")
    
    # Validación final de rangos
    main_min = min(new_df[['Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6']].min())
    main_max = max(new_df[['Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6']].max())
    horse_min = new_df['Horse'].min()
    horse_max = new_df['Horse'].max()
    
    print(f"\n✓ VALIDACIÓN DE RANGOS:")
    print(f"  Números principales: {main_min}-{main_max} (esperado: 1-31)")
    print(f"  Caballos: {horse_min}-{horse_max} (esperado: 1-12)")
    
    # Guardar archivo actualizado
    new_df.to_csv(current_file, index=False)
    print(f"\n💾 Archivo guardado: {current_file}")
    print(f"  Total de registros: {len(new_df)}")
    
    # Mostrar algunos registros de ejemplo
    print(f"\n📝 PRIMEROS REGISTROS:")
    print(new_df.head().to_string(index=False))
    
    print(f"\n📝 ÚLTIMOS REGISTROS:")
    print(new_df.tail().to_string(index=False))
    
    # Cobertura temporal
    start_date = datetime.strptime(new_df['Date'].min(), '%Y-%m-%d')
    end_date = datetime.strptime(new_df['Date'].max(), '%Y-%m-%d')
    total_days = (end_date - start_date).days
    coverage = len(new_df) / (total_days / 3.5) * 100  # Aproximadamente 2 sorteos por semana
    
    print(f"\n📈 COBERTURA TEMPORAL:")
    print(f"  Período: {total_days} días")
    print(f"  Sorteos registrados: {len(new_df)}")
    print(f"  Cobertura estimada: {coverage:.1f}%")
    
    print("\n✅ ACTUALIZACIÓN COMPLETADA")
    print("   Los datos del Lototurf han sido actualizados exitosamente.")
    print("   El campo 'Horse' contiene el número de caballo elegible por los usuarios.")

if __name__ == "__main__":
    process_lototurf_data()
