#!/usr/bin/env python3
"""
Script para reconstruir completamente los datos históricos de Bonoloto
Combina archivos históricos de 1988-2012 y 2013-2025 para crear una base de datos completa
"""

import pandas as pd
import numpy as np
from datetime import datetime
import os

def convert_date_format(date_str):
    """Convierte fecha de formato DD/MM/YYYY a YYYY-MM-DD"""
    try:
        # Formato del archivo histórico: DD/MM/YYYY
        day, month, year = date_str.split('/')
        return f"{year}-{month.zfill(2)}-{day.zfill(2)}"
    except:
        return None

def process_historical_file(file_path, file_description):
    """Procesa un archivo histórico y retorna una lista de registros"""
    print(f"📖 Procesando {file_description}...")
    
    try:
        df = pd.read_csv(file_path)
        print(f"✅ Archivo cargado: {len(df)} registros")
        print(f"   Columnas: {list(df.columns)}")
    except Exception as e:
        print(f"❌ Error leyendo {file_path}: {e}")
        return []
    
    processed_records = []
    errors_count = 0
    
    for index, row in df.iterrows():
        try:
            # Obtener la fecha y convertirla
            fecha_original = str(row.iloc[0]).strip()  # Primera columna es la fecha
            fecha_convertida = convert_date_format(fecha_original)
            
            if fecha_convertida is None:
                errors_count += 1
                continue
            
            # Extraer números (columnas 1-6 para Bonoloto)
            nums = []
            for i in range(1, 7):
                try:
                    num = int(row.iloc[i])
                    if 1 <= num <= 49:  # Validar rango de números de Bonoloto
                        nums.append(num)
                    else:
                        break
                except:
                    break
            
            # Solo procesar si tenemos 6 números válidos
            if len(nums) != 6:
                errors_count += 1
                continue
            
            # Extraer reintegro (columna R., normalmente posición 8)
            reintegro = None
            try:
                # Buscar en las últimas columnas el reintegro
                for i in range(7, min(len(row), 10)):
                    val = str(row.iloc[i]).strip()
                    if val and val != 'nan' and val.replace('-','').isdigit():
                        reintegro_val = int(val)
                        if 0 <= reintegro_val <= 9:  # Validar rango de reintegro
                            reintegro = reintegro_val
                            break
            except:
                pass
                
            if reintegro is None:
                reintegro = 0  # Valor por defecto
            
            # Crear registro
            record = {
                'Date': fecha_convertida,
                'Num1': nums[0],
                'Num2': nums[1], 
                'Num3': nums[2],
                'Num4': nums[3],
                'Num5': nums[4],
                'Num6': nums[5],
                'Refund': reintegro
            }
            
            processed_records.append(record)
            
        except Exception as e:
            errors_count += 1
            continue
    
    print(f"✅ Procesados: {len(processed_records)} registros válidos")
    if errors_count > 0:
        print(f"⚠️  Errores/omisiones: {errors_count}")
        
    return processed_records

def main():
    print("🎲 Iniciando reconstrucción completa de datos de Bonoloto...")
    print("   Combinando archivos históricos 1988-2012 y 2013-2025")
    
    # Rutas de archivos
    base_dir = os.path.dirname(os.path.abspath(__file__))
    target_file = os.path.join(base_dir, "DataFrame_Bonoloto.csv")
    old_file = os.path.join(base_dir, "Histórico de Resultados - Bonoloto - 1988 a 2012.csv")
    new_file = os.path.join(base_dir, "Histórico de Resultados - Bonoloto - 2013 a 2025.csv")
    backup_file = os.path.join(base_dir, "DataFrame_Bonoloto_backup_completo.csv")
    
    # Verificar archivos
    if not os.path.exists(old_file):
        print(f"❌ Error: No se encontró {old_file}")
        return
        
    if not os.path.exists(new_file):
        print(f"❌ Error: No se encontró {new_file}")
        return
    
    # Crear backup del archivo actual si existe
    if os.path.exists(target_file):
        print("📋 Creando backup del archivo actual...")
        try:
            import shutil
            shutil.copy2(target_file, backup_file)
            print(f"✅ Backup creado: {backup_file}")
        except Exception as e:
            print(f"⚠️  Advertencia: No se pudo crear backup: {e}")
    
    # Procesar archivo histórico 1988-2012
    records_old = process_historical_file(old_file, "archivo 1988-2012")
    
    # Procesar archivo histórico 2013-2025
    records_new = process_historical_file(new_file, "archivo 2013-2025")
    
    # Combinar todos los registros
    print("🔗 Combinando todos los registros...")
    all_records = records_old + records_new
    
    if not all_records:
        print("❌ No se encontraron registros válidos para procesar")
        return
    
    # Crear DataFrame completo
    complete_df = pd.DataFrame(all_records)
    
    # Ordenar por fecha
    complete_df = complete_df.sort_values('Date')
    
    # Eliminar duplicados (mantener el más reciente)
    complete_df = complete_df.drop_duplicates(subset=['Date'], keep='last')
    
    print(f"✅ Base de datos combinada:")
    print(f"   • Total registros: {len(complete_df)}")
    print(f"   • Desde: {complete_df['Date'].iloc[0]}")
    print(f"   • Hasta: {complete_df['Date'].iloc[-1]}")
    
    # Verificar continuidad de datos
    fecha_inicio = datetime.strptime(complete_df['Date'].iloc[0], "%Y-%m-%d")
    fecha_fin = datetime.strptime(complete_df['Date'].iloc[-1], "%Y-%m-%d")
    dias_total = (fecha_fin - fecha_inicio).days
    cobertura_pct = (len(complete_df) / dias_total) * 100 if dias_total > 0 else 0
    
    print(f"   • Cobertura temporal: {cobertura_pct:.1f}%")
    
    # Guardar archivo completo
    print("💾 Guardando base de datos completa...")
    try:
        complete_df.to_csv(target_file, index=False)
        print(f"✅ Archivo completo guardado: {target_file}")
    except Exception as e:
        print(f"❌ Error guardando archivo: {e}")
        return
    
    # Verificación de algunos registros
    print("🔍 Verificación de registros:")
    
    # Primeros registros
    print("   Primeros 3 registros:")
    for i in range(min(3, len(complete_df))):
        row = complete_df.iloc[i]
        print(f"     {row['Date']}: [{row['Num1']:2d},{row['Num2']:2d},{row['Num3']:2d},{row['Num4']:2d},{row['Num5']:2d},{row['Num6']:2d}] R:{row['Refund']}")
    
    # Últimos registros
    print("   Últimos 3 registros:")
    for i in range(max(0, len(complete_df)-3), len(complete_df)):
        row = complete_df.iloc[i]
        print(f"     {row['Date']}: [{row['Num1']:2d},{row['Num2']:2d},{row['Num3']:2d},{row['Num4']:2d},{row['Num5']:2d},{row['Num6']:2d}] R:{row['Refund']}")
    
    # Estadísticas por década
    print("📊 Distribución por décadas:")
    for decada in [1980, 1990, 2000, 2010, 2020]:
        count = len(complete_df[(complete_df['Date'] >= f"{decada}-01-01") & 
                               (complete_df['Date'] < f"{decada+10}-01-01")])
        print(f"   • {decada}s: {count} sorteos")
    
    # Mostrar resumen final
    print("\n📊 RESUMEN DE LA RECONSTRUCCIÓN:")
    print(f"   • Archivo 1988-2012: {len(records_old)} registros")
    print(f"   • Archivo 2013-2025: {len(records_new)} registros")
    print(f"   • Total final: {len(complete_df)} registros únicos")
    print(f"   • Período: {complete_df['Date'].iloc[0]} al {complete_df['Date'].iloc[-1]}")
    print(f"   • Base de datos robusta creada para entrenamiento de IA")
    if os.path.exists(backup_file):
        print(f"   • Backup del archivo anterior: {backup_file}")
    
    print("\n🎉 ¡Reconstrucción completa de Bonoloto finalizada!")

if __name__ == "__main__":
    main()
