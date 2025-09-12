import pandas as pd
import shutil
import os

print('🔄 FINALIZANDO ACTUALIZACIÓN DEL ARCHIVO ORIGINAL')
print('=' * 60)

# Rutas de archivos
archivo_original = r'C:\Users\Pedro\Desktop\Proyec-web-loto-ia\tienda-web-lotoAI-1\IAs-Loto\LOTERIA NACIONAL\DataFrame_LOTERIA NACIONAL.csv'
archivo_backup = r'C:\Users\Pedro\Desktop\Proyec-web-loto-ia\tienda-web-lotoAI-1\IAs-Loto\LOTERIA NACIONAL\DataFrame_LOTERIA NACIONAL_BACKUP.csv'
archivo_nuevos = r'C:\Users\Pedro\Desktop\Proyec-web-loto-ia\tienda-web-lotoAI-1\IAs-Loto\LOTERIA NACIONAL\DataFrame_LOTERIA_NACIONAL_ACTUALIZADO.csv'
archivo_temporal = r'C:\Users\Pedro\Desktop\Proyec-web-loto-ia\tienda-web-lotoAI-1\IAs-Loto\LOTERIA NACIONAL\DataFrame_TEMPORAL.csv'

# Cargar archivos
print('📖 Cargando archivos...')
df_backup = pd.read_csv(archivo_backup)  # Datos originales
df_nuevos = pd.read_csv(archivo_nuevos)  # Nuevos datos procesados

print(f'✅ Datos originales (backup): {len(df_backup)} registros')
print(f'✅ Nuevos datos: {len(df_nuevos)} registros')

# Combinar
print('\n🔄 Combinando datasets...')
df_completo = pd.concat([df_backup, df_nuevos], ignore_index=True)

# Ordenar por fecha
df_completo['Fecha_dt'] = pd.to_datetime(df_completo['Fecha'], format='%d/%m/%Y', errors='coerce')
df_completo = df_completo.sort_values('Fecha_dt')
df_completo = df_completo.drop('Fecha_dt', axis=1)
df_completo = df_completo.reset_index(drop=True)

print(f'📊 Total registros combinados: {len(df_completo)}')

# Verificaciones finales
print('\n🔍 VERIFICACIONES FINALES:')
print(f'📅 Rango de fechas: {df_completo["Fecha"].min()} → {df_completo["Fecha"].max()}')

sorteos_unicos = sorted(df_completo['Sorteo'].unique())
print(f'🎯 Rango de sorteos: {min(sorteos_unicos)} → {max(sorteos_unicos)}')

# Verificar 2024-2025
datos_2024_2025 = df_completo[df_completo['Fecha'].str.contains('2024|2025', na=False)]
print(f'📊 Registros 2024-2025: {len(datos_2024_2025)}')

# Verificar Navidad 2024
navidad_2024 = df_completo[(df_completo['Sorteo'] == 102) & (df_completo['Fecha'].str.contains('2024', na=False))]
print(f'🎄 Navidad 2024: {len(navidad_2024)} registros')

# Guardar en archivo temporal
print(f'\n💾 Guardando en archivo temporal...')
df_completo.to_csv(archivo_temporal, index=False)

# Verificar que el archivo temporal se guardó correctamente
if os.path.exists(archivo_temporal):
    print(f'✅ Archivo temporal creado exitosamente')
    
    # Mostrar últimos registros
    print(f'\n📋 ÚLTIMOS 5 REGISTROS:')
    for _, row in df_completo.tail(5).iterrows():
        print(f'  {row["Fecha"]} | Sorteo {row["Sorteo"]} | {row["Numero"]} | {row["Euros"]} € | {row["Categoria"]}')
    
    print(f'\n✅ PROCESO COMPLETADO')
    print(f'📄 Archivo temporal: {archivo_temporal}')
    print(f'📊 Total registros: {len(df_completo)}')
    print(f'📋 Backup disponible: {archivo_backup}')
    print(f'\n⚠️  PRÓXIMO PASO: Cierra el archivo DataFrame_LOTERIA NACIONAL.csv en el editor')
    print(f'   y luego renombra o copia el archivo temporal para reemplazar el original.')
else:
    print(f'❌ Error al crear archivo temporal')

print('=' * 60)
