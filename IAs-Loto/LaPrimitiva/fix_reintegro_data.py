#!/usr/bin/env python3
"""
Script para corregir DataFrame_LaPrimitiva_guardado.csv
Reemplaza el complementario por el reintegro correcto para entrenamiento del modelo
"""

import pandas as pd
import numpy as np
from datetime import datetime
import os

def convert_date_format(date_str):
    """Convierte fecha de formato DD/MM/YYYY a YYYY-MM-DD"""
    try:
        day, month, year = date_str.split('/')
        return f"{year}-{month.zfill(2)}-{day.zfill(2)}"
    except:
        return None

def convert_date_format_reverse(date_str):
    """Convierte fecha de formato YYYY-MM-DD a DD/MM/YYYY"""
    try:
        year, month, day = date_str.split('-')
        return f"{day.lstrip('0')}/{month.lstrip('0')}/{year}"
    except:
        return None

def main():
    print("🔧 Iniciando corrección del archivo DataFrame_LaPrimitiva_guardado.csv...")
    print("   Objetivo: Reemplazar complementario por reintegro correcto")
    
    # Rutas de archivos
    base_dir = os.path.dirname(os.path.abspath(__file__))
    target_file = os.path.join(base_dir, "DataFrame_LaPrimitiva_guardado.csv")
    source_file = os.path.join(base_dir, "Histórico de Resultados - Primitiva - 2013 a 2025.csv")
    backup_file = os.path.join(base_dir, "DataFrame_LaPrimitiva_guardado_ANTES_CORRECCION.csv")
    
    # Verificar archivos
    if not os.path.exists(target_file):
        print(f"❌ Error: No se encontró {target_file}")
        return
        
    if not os.path.exists(source_file):
        print(f"❌ Error: No se encontró {source_file}")
        return
    
    # Crear backup
    print("📋 Creando backup antes de la corrección...")
    try:
        import shutil
        shutil.copy2(target_file, backup_file)
        print(f"✅ Backup creado: {backup_file}")
    except Exception as e:
        print(f"⚠️  Advertencia: No se pudo crear backup: {e}")
    
    # Leer archivo a corregir
    print("📖 Leyendo archivo a corregir...")
    try:
        target_df = pd.read_csv(target_file)
        print(f"✅ Archivo cargado: {len(target_df)} registros")
    except Exception as e:
        print(f"❌ Error leyendo archivo objetivo: {e}")
        return
    
    # Leer archivo fuente con datos correctos
    print("📖 Leyendo archivo fuente con reintegros correctos...")
    try:
        source_df = pd.read_csv(source_file)
        print(f"✅ Archivo fuente cargado: {len(source_df)} registros")
    except Exception as e:
        print(f"❌ Error leyendo archivo fuente: {e}")
        return
    
    # Crear diccionario de fecha -> reintegro correcto
    print("🔍 Creando mapa de fechas -> reintegros correctos...")
    fecha_reintegro_map = {}
    
    for index, row in source_df.iterrows():
        try:
            # Obtener fecha y convertir a formato YYYY-MM-DD
            fecha_original = str(row.iloc[0]).strip()
            fecha_convertida = convert_date_format(fecha_original)
            
            if fecha_convertida is None:
                continue
                
            # Obtener el reintegro (columna 8, índice 8)
            reintegro = None
            try:
                reintegro = int(row.iloc[8])  # Columna R.
            except:
                continue
                
            if reintegro is not None:
                fecha_reintegro_map[fecha_convertida] = reintegro
                
        except Exception as e:
            continue
    
    print(f"✅ Mapa creado con {len(fecha_reintegro_map)} fechas")
    
    # Corregir el DataFrame objetivo
    print("🔧 Aplicando correcciones...")
    correcciones_realizadas = 0
    fechas_no_encontradas = []
    
    for index, row in target_df.iterrows():
        fecha = row['Date']
        
        if fecha in fecha_reintegro_map:
            reintegro_correcto = fecha_reintegro_map[fecha]
            reintegro_actual = row['Refund']
            
            if reintegro_actual != reintegro_correcto:
                target_df.at[index, 'Refund'] = reintegro_correcto
                correcciones_realizadas += 1
        else:
            fechas_no_encontradas.append(fecha)
    
    print(f"✅ Correcciones aplicadas: {correcciones_realizadas}")
    
    if fechas_no_encontradas:
        print(f"⚠️  Fechas no encontradas en archivo fuente: {len(fechas_no_encontradas)}")
        if len(fechas_no_encontradas) <= 10:
            for fecha in fechas_no_encontradas[:5]:
                print(f"   - {fecha}")
            if len(fechas_no_encontradas) > 5:
                print(f"   ... y {len(fechas_no_encontradas)-5} más")
    
    # Guardar archivo corregido
    print("💾 Guardando archivo corregido...")
    try:
        target_df.to_csv(target_file, index=False)
        print(f"✅ Archivo corregido guardado: {target_file}")
    except Exception as e:
        print(f"❌ Error guardando archivo: {e}")
        return
    
    # Verificación final
    print("🔍 Verificación final...")
    
    # Verificar algunas fechas recientes
    fechas_verificar = ['2025-09-04', '2025-09-01', '2025-08-30']
    for fecha in fechas_verificar:
        if fecha in fecha_reintegro_map:
            fila = target_df[target_df['Date'] == fecha]
            if not fila.empty:
                reintegro_archivo = int(fila.iloc[0]['Refund'])
                reintegro_esperado = fecha_reintegro_map[fecha]
                estado = "✅" if reintegro_archivo == reintegro_esperado else "❌"
                print(f"   {estado} {fecha}: {reintegro_archivo} (esperado: {reintegro_esperado})")
    
    # Mostrar resumen
    print("\n📊 RESUMEN DE LA CORRECCIÓN:")
    print(f"   • Total registros procesados: {len(target_df)}")
    print(f"   • Correcciones aplicadas: {correcciones_realizadas}")
    print(f"   • Fechas sin datos fuente: {len(fechas_no_encontradas)}")
    print(f"   • Backup creado en: {backup_file}")
    print(f"   • Archivo corregido: {target_file}")
    
    print("\n🎉 ¡Corrección completada!")
    print("   Ahora el archivo contiene los REINTEGROS correctos")
    print("   (números que SÍ se pueden elegir en el boleto)")

if __name__ == "__main__":
    main()
