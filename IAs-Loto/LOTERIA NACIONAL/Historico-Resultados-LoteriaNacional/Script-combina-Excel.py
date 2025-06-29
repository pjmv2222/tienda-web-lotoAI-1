import pandas as pd
import os
from datetime import datetime
import re

# Rutas de los archivos Excel
ruta_base = r'C:\Users\Pedro\Desktop\LotoIA\LOTERIA NACIONAL\Historico-Resultados-LoteriaNacional'
archivo_ordinarios = os.path.join(ruta_base, 'premios_mayores_completo-1.xlsx')
archivo_navidad = os.path.join(ruta_base, 'Premios-Extraordinarios-Navidad-Combinado-1.xlsx')
archivo_combinado = os.path.join(ruta_base, 'premios_mayores_completo_con_navidad_ordenado.xlsx')

# Función para convertir la fecha a un formato consistente
def convertir_fecha(fecha):
    if isinstance(fecha, str):
        return datetime.strptime(fecha, '%d/%m/%Y')
    return fecha

# Función para extraer el número de sorteo
def extraer_numero_sorteo(sorteo):
    if pd.isna(sorteo):
        return 0
    if isinstance(sorteo, (int, float)):
        return int(sorteo)
    match = re.search(r'(\d+)', str(sorteo))
    return int(match.group(1)) if match else 0

# Leer los archivos Excel
df_ordinarios = pd.read_excel(archivo_ordinarios)
df_navidad = pd.read_excel(archivo_navidad)

print("Columnas en df_ordinarios:", df_ordinarios.columns)
print("Columnas en df_navidad:", df_navidad.columns)

# Renombrar la columna 'Número' a 'Numero' en df_navidad si existe
if 'Número' in df_navidad.columns:
    df_navidad = df_navidad.rename(columns={'Número': 'Numero'})

# Asegurarse de que ambos DataFrames tengan las columnas necesarias
columnas_requeridas = ['Fecha', 'Sorteo', 'Euros', 'Numero', 'Categoria']
for df in [df_ordinarios, df_navidad]:
    for col in columnas_requeridas:
        if col not in df.columns:
            df[col] = None  # Añadir columna faltante con valores nulos

# Asegurar que ambos DataFrames tengan las mismas columnas en el mismo orden
df_ordinarios = df_ordinarios[columnas_requeridas].copy()
df_navidad = df_navidad[columnas_requeridas].copy()

# Convertir las fechas a un formato consistente
df_ordinarios['Fecha'] = df_ordinarios['Fecha'].apply(convertir_fecha)
df_navidad['Fecha'] = df_navidad['Fecha'].apply(convertir_fecha)

# Extraer el número de sorteo
df_ordinarios['NumeroSorteo'] = df_ordinarios['Sorteo'].apply(extraer_numero_sorteo)
df_navidad['NumeroSorteo'] = df_navidad['Sorteo'].apply(extraer_numero_sorteo)

# Combinar los DataFrames
df_combinado = pd.concat([df_ordinarios, df_navidad])

# Ordenar por fecha y número de sorteo
df_combinado = df_combinado.sort_values(['Fecha', 'NumeroSorteo'])

# Eliminar la columna auxiliar NumeroSorteo
df_combinado = df_combinado.drop('NumeroSorteo', axis=1)

# Guardar el DataFrame combinado en un nuevo archivo Excel
with pd.ExcelWriter(archivo_combinado, engine='openpyxl') as writer:
    df_combinado.to_excel(writer, index=False)
    worksheet = writer.sheets['Sheet1']
    for idx, col in enumerate(df_combinado.columns):
        if col == 'Numero':
            for cell in worksheet[chr(65 + idx)]:
                cell.number_format = '@'
        elif col == 'Fecha':
            for cell in worksheet[chr(65 + idx)]:
                cell.number_format = 'DD/MM/YYYY'

print(f"Se ha creado el archivo combinado y ordenado: {archivo_combinado}")
print(f"Total de registros: {len(df_combinado)}")