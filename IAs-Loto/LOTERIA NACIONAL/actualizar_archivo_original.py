import pandas as pd

print('🔄 ACTUALIZANDO ARCHIVO ORIGINAL DEL MODELO')
print('=' * 60)

# Rutas de archivos
archivo_original = r'C:\Users\Pedro\Desktop\Proyec-web-loto-ia\tienda-web-lotoAI-1\IAs-Loto\LOTERIA NACIONAL\DataFrame_LOTERIA NACIONAL.csv'
archivo_nuevos = r'C:\Users\Pedro\Desktop\Proyec-web-loto-ia\tienda-web-lotoAI-1\IAs-Loto\LOTERIA NACIONAL\DataFrame_LOTERIA_NACIONAL_ACTUALIZADO.csv'
archivo_backup = r'C:\Users\Pedro\Desktop\Proyec-web-loto-ia\tienda-web-lotoAI-1\IAs-Loto\LOTERIA NACIONAL\DataFrame_LOTERIA NACIONAL_BACKUP.csv'

# 1. Crear backup del archivo original
print('📋 Creando backup del archivo original...')
df_original = pd.read_csv(archivo_original)
df_original.to_csv(archivo_backup, index=False)
print(f'✅ Backup creado: {len(df_original)} registros')
print(f'   Ubicación: {archivo_backup}')

# 2. Cargar nuevos datos procesados
print('\n📖 Cargando nuevos datos procesados...')
df_nuevos = pd.read_csv(archivo_nuevos)
print(f'✅ Nuevos datos: {len(df_nuevos)} registros')

# 3. Analizar rangos de fechas para evitar duplicados
print('\n🔍 ANÁLISIS DE RANGOS DE FECHAS:')

# Convertir fechas para análisis
df_original['Fecha_dt'] = pd.to_datetime(df_original['Fecha'], format='%d/%m/%Y', errors='coerce')
df_nuevos['Fecha_dt'] = pd.to_datetime(df_nuevos['Fecha'], format='%d/%m/%Y', errors='coerce')

fecha_max_original = df_original['Fecha_dt'].max()
fecha_min_nuevos = df_nuevos['Fecha_dt'].min()

print(f'  📅 Datos originales: hasta {fecha_max_original.strftime("%d/%m/%Y")}')
print(f'  📅 Datos nuevos: desde {fecha_min_nuevos.strftime("%d/%m/%Y")}')

# 4. Verificar si hay solapamiento
if fecha_min_nuevos <= fecha_max_original:
    print('⚠️  Hay solapamiento de fechas - eliminando duplicados del archivo original')
    
    # Eliminar del archivo original las fechas que están en los nuevos datos
    df_original_filtrado = df_original[df_original['Fecha_dt'] < fecha_min_nuevos]
    print(f'   Registros originales después del filtro: {len(df_original_filtrado)}')
else:
    print('✅ No hay solapamiento - se pueden combinar directamente')
    df_original_filtrado = df_original

# 5. Combinar datos
print('\n🔄 Combinando datasets...')
df_original_filtrado = df_original_filtrado.drop('Fecha_dt', axis=1)
df_nuevos = df_nuevos.drop('Fecha_dt', axis=1)

df_completo = pd.concat([df_original_filtrado, df_nuevos], ignore_index=True)

# 6. Ordenar por fecha
print('📅 Ordenando cronológicamente...')
df_completo['Fecha_dt'] = pd.to_datetime(df_completo['Fecha'], format='%d/%m/%Y', errors='coerce')
df_completo = df_completo.sort_values('Fecha_dt')
df_completo = df_completo.drop('Fecha_dt', axis=1)
df_completo = df_completo.reset_index(drop=True)

# 7. Verificaciones finales
print('\n🔍 VERIFICACIONES FINALES:')
print(f'📊 Total registros finales: {len(df_completo)}')

# Verificar últimas fechas
ultimas_fechas = df_completo['Fecha'].tail(10).tolist()
print(f'📅 Últimas 10 fechas: {ultimas_fechas}')

# Verificar sorteos únicos
sorteos_unicos = sorted(df_completo['Sorteo'].unique())
print(f'🎯 Rango de sorteos: {min(sorteos_unicos)} → {max(sorteos_unicos)}')

# Verificar datos de 2024-2025
datos_2024_2025 = df_completo[df_completo['Fecha'].str.contains('2024|2025', na=False)]
print(f'📊 Registros 2024-2025: {len(datos_2024_2025)}')

# Verificar Navidad 2024
navidad_2024 = df_completo[(df_completo['Sorteo'] == 102) & (df_completo['Fecha'].str.contains('2024', na=False))]
print(f'🎄 Navidad 2024: {len(navidad_2024)} registros')

# 8. Guardar archivo actualizado
print('\n💾 Guardando archivo actualizado...')
df_completo.to_csv(archivo_original, index=False)

print(f'\n✅ ACTUALIZACIÓN COMPLETADA')
print(f'📄 Archivo actualizado: {archivo_original}')
print(f'📊 Total registros: {len(df_completo)}')
print(f'📋 Backup disponible en: {archivo_backup}')
print(f'🎯 Dataset completo desde {df_completo["Fecha"].min()} hasta {df_completo["Fecha"].max()}')

# Mostrar últimos registros para verificar
print(f'\n📋 ÚLTIMOS 5 REGISTROS DEL ARCHIVO ACTUALIZADO:')
for _, row in df_completo.tail(5).iterrows():
    print(f'  {row["Fecha"]} | Sorteo {row["Sorteo"]} | {row["Numero"]} | {row["Euros"]} € | {row["Categoria"]}')

print('=' * 60)
