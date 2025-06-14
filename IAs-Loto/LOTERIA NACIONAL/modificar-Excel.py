import pandas as pd
import os
import re

# Ruta al archivo CSV original
ruta_archivo = r'C:\Users\Pedro\Desktop\LotoIA\LOTERIA NACIONAL\premios_mayores_completo_con_navidad_ordenado.csv'

# Cargar el archivo CSV en un DataFrame de Pandas
datos = pd.read_csv(ruta_archivo, encoding='utf-8', sep=';')

# Imprimir los nombres de las columnas para verificar
print("Columnas en el DataFrame:", datos.columns)

# Función para extraer solo el número del sorteo
def extraer_numero_sorteo(sorteo):
    match = re.search(r'(\d+)', str(sorteo))
    return match.group(1) if match else sorteo

# Simplificar la columna 'Sorteo'
datos['Sorteo'] = datos['Sorteo'].apply(extraer_numero_sorteo)

# Convertir la columna 'Fecha' a datetime
datos['Fecha'] = pd.to_datetime(datos['Fecha'], format='%d/%m/%Y', errors='coerce')

# Convertir las columnas numéricas a tipo numérico
datos['Euros'] = pd.to_numeric(datos['Euros'], errors='coerce')
datos['Numero'] = datos['Numero'].astype(str).str.zfill(5)  # Asegurar que 'Numero' tenga 5 dígitos
datos['Sorteo'] = pd.to_numeric(datos['Sorteo'], errors='coerce')

# Imprimir las primeras filas para verificar que el DataFrame se vea como se espera
print(datos.dtypes)
print(datos.head())

# Guardar el DataFrame en un archivo CSV
ruta_archivo_guardar = r'C:\Users\Pedro\Desktop\LotoIA\LOTERIA NACIONAL\DataFrame_LOTERIA NACIONAL.csv'

# Guardar el DataFrame en un archivo CSV
datos.to_csv(ruta_archivo_guardar, index=False, date_format='%d/%m/%Y')

# Verificar si el archivo existe
if os.path.exists(ruta_archivo_guardar):
    print("El archivo se ha guardado correctamente.")
else:
    print("Error: El archivo no se ha guardado.")