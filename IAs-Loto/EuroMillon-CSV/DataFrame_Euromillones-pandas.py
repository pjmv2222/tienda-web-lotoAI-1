import pandas as pd
import os

# Ruta al archivo CSV
ruta_archivo = 'C:\\Users\\Pedro\\Desktop\\LotoIA\\EuroMillon-CSV\\DataFrame_Euromillones_2024.csv'
print(f"Ruta del archivo: {ruta_archivo}")

# Definir los nombres de las columnas
nombres_columnas = ['Date', 'Num_1', 'Num_2', 'Num_3', 'Num_4', 'Num_5', 'Start_1', 'Star_2']

# Cargar el archivo CSV en un DataFrame de Pandas, especificando el delimitador correcto y los nombres de las columnas
datos = pd.read_csv(ruta_archivo, encoding='utf-8', skiprows=1, delimiter=';', names=nombres_columnas)

# Convertir la columna 'Date' a datetime primero
datos['Date'] = pd.to_datetime(datos['Date'], format='%d/%m/%Y', errors='coerce')

# Convertir las columnas numéricas a tipo numérico, excluyendo 'Date'
columnas_numericas = ['Num_1', 'Num_2', 'Num_3', 'Num_4', 'Num_5', 'Start_1', 'Star_2']
datos[columnas_numericas] = datos[columnas_numericas].apply(pd.to_numeric, errors='coerce')

# Verificar los tipos de datos de las columnas
print(datos.dtypes)

# Imprimir las primeras filas para verificar que el DataFrame se vea como se espera
print(datos.head())

# Ruta del archivo CSV para guardar
ruta_archivo_guardar = 'C:\\Users\\Pedro\\Desktop\\LotoIA\\EuroMillon-CSV\\DataFrame_Euromillones.csv'

# Guardar el DataFrame en un archivo CSV
datos.to_csv(ruta_archivo_guardar, index=False)

# Verificar si el archivo existe
if os.path.exists(ruta_archivo_guardar):
    print("El archivo se ha guardado correctamente.")
else:
    print("Error: El archivo no se ha guardado.")