#!/usr/bin/env python3
"""
Script para actualizar los datos históricos de La Primitiva
Combina el archivo existente con los nuevos datos desde 25/06/2024
"""

import pandas as pd
import numpy as np
from datetime import datetime
import os

def convert_date_format(date_str):
    """Convierte fecha de formato DD/MM/YYYY a YYYY-MM-DD"""
    try:
        # Formato del archivo nuevo: DD/MM/YYYY
        day, month, year = date_str.split('/')
        return f"{year}-{month.zfill(2)}-{day.zfill(2)}"
    except:
        return None

def main():
    print("🎲 Iniciando actualización de datos de La Primitiva...")
    
    # Rutas de archivos
    base_dir = os.path.dirname(os.path.abspath(__file__))
    existing_file = os.path.join(base_dir, "DataFrame_LaPrimitiva_guardado.csv")
    new_file = os.path.join(base_dir, "Histórico de Resultados - Primitiva - 2013 a 2025.csv")
    backup_file = os.path.join(base_dir, "DataFrame_LaPrimitiva_guardado_backup.csv")
    
    # Verificar que existen los archivos
    if not os.path.exists(existing_file):
        print(f"❌ Error: No se encontró el archivo {existing_file}")
        return
        
    if not os.path.exists(new_file):
        print(f"❌ Error: No se encontró el archivo {new_file}")
        return
    
    # Crear backup del archivo original
    print("📋 Creando backup del archivo original...")
    try:
        import shutil
        shutil.copy2(existing_file, backup_file)
        print(f"✅ Backup creado: {backup_file}")
    except Exception as e:
        print(f"⚠️  Advertencia: No se pudo crear backup: {e}")
    
    # Leer archivo existente
    print("📖 Leyendo archivo existente...")
    try:
        existing_df = pd.read_csv(existing_file)
        print(f"✅ Archivo existente cargado: {len(existing_df)} registros")
        print(f"   Última fecha: {existing_df['Date'].iloc[-1]}")
    except Exception as e:
        print(f"❌ Error leyendo archivo existente: {e}")
        return
    
    # Leer archivo nuevo
    print("📖 Leyendo archivo histórico nuevo...")
    try:
        # Leer con las columnas correctas
        new_df = pd.read_csv(new_file, header=0)
        print(f"✅ Archivo nuevo cargado: {len(new_df)} registros")
        print(f"   Columnas encontradas: {list(new_df.columns)}")
    except Exception as e:
        print(f"❌ Error leyendo archivo nuevo: {e}")
        return
    
    # Procesar el archivo nuevo
    print("🔄 Procesando datos del archivo nuevo...")
    
    # Crear DataFrame con el formato correcto
    processed_records = []
    
    for index, row in new_df.iterrows():
        try:
            # Obtener la fecha y convertirla
            fecha_original = str(row.iloc[0]).strip()  # Primera columna es la fecha
            fecha_convertida = convert_date_format(fecha_original)
            
            if fecha_convertida is None:
                continue
                
            # Convertir fecha a datetime para comparación
            fecha_dt = datetime.strptime(fecha_convertida, "%Y-%m-%d")
            fecha_limite = datetime.strptime("2024-06-24", "%Y-%m-%d")
            
            # Solo procesar fechas posteriores al 24/06/2024
            if fecha_dt <= fecha_limite:
                continue
            
            # Extraer números (columnas 1-6)
            nums = []
            for i in range(1, 7):
                try:
                    num = int(row.iloc[i])
                    nums.append(num)
                except:
                    break
            
            # Solo procesar si tenemos 6 números
            if len(nums) != 6:
                continue
                
            # Extraer reintegro (columna 7 o buscar en las siguientes)
            reintegro = None
            for i in range(7, min(len(row), 10)):
                try:
                    val = str(row.iloc[i]).strip()
                    if val and val != 'nan' and val.isdigit() and len(val) <= 2:
                        reintegro = int(val)
                        break
                except:
                    continue
            
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
            print(f"⚠️  Error procesando fila {index}: {e}")
            continue
    
    if not processed_records:
        print("❌ No se encontraron datos nuevos para agregar")
        return
    
    # Crear DataFrame con nuevos datos
    new_data_df = pd.DataFrame(processed_records)
    new_data_df = new_data_df.sort_values('Date')  # Ordenar por fecha
    
    print(f"✅ Procesados {len(new_data_df)} nuevos registros")
    print(f"   Desde: {new_data_df['Date'].iloc[0]}")
    print(f"   Hasta: {new_data_df['Date'].iloc[-1]}")
    
    # Combinar DataFrames
    print("🔗 Combinando datos...")
    combined_df = pd.concat([existing_df, new_data_df], ignore_index=True)
    combined_df = combined_df.drop_duplicates(subset=['Date'], keep='last')  # Eliminar duplicados
    combined_df = combined_df.sort_values('Date')  # Ordenar por fecha
    
    print(f"✅ Datos combinados: {len(combined_df)} registros totales")
    
    # Guardar archivo actualizado
    print("💾 Guardando archivo actualizado...")
    try:
        combined_df.to_csv(existing_file, index=False)
        print(f"✅ Archivo actualizado guardado: {existing_file}")
        print(f"   Total registros: {len(combined_df)}")
        print(f"   Nueva fecha final: {combined_df['Date'].iloc[-1]}")
    except Exception as e:
        print(f"❌ Error guardando archivo: {e}")
        return
    
    # Mostrar resumen
    print("\n📊 RESUMEN DE LA ACTUALIZACIÓN:")
    print(f"   • Registros originales: {len(existing_df)}")
    print(f"   • Nuevos registros agregados: {len(new_data_df)}")
    print(f"   • Total registros finales: {len(combined_df)}")
    print(f"   • Período actualizado: del 25/06/2024 al {new_data_df['Date'].iloc[-1]}")
    print(f"   • Backup creado en: {backup_file}")
    
    print("\n🎉 ¡Actualización completada exitosamente!")

if __name__ == "__main__":
    main()
