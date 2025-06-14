import pandas as pd
import os

# Ruta al archivo CSV
ruta_archivo = 'C:\\Users\\Pedro\\Desktop\\LotoIA\\EuroDreams\\Histórico-Resultados-EuroDreams.csv'

# Definir los nombres de las columnas
nombres_columnas = ['Date', 'Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6', 'Dream']

# Cargar el archivo CSV en un DataFrame de Pandas
datos = pd.read_csv(ruta_archivo, encoding='utf-8', skiprows=1, delimiter=';', names=nombres_columnas)

# Convertir la columna 'Date' a datetime
datos['Date'] = pd.to_datetime(datos['Date'], format='%d/%m/%Y', errors='coerce')

# Convertir las columnas numéricas a tipo numérico
# Si no hay necesidad de manejar datos faltantes específicamente para 'Dream', esta línea se mantiene para asegurar el tipo correcto de las columnas
columnas_numericas = ['Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6', 'Dream']
datos[columnas_numericas] = datos[columnas_numericas].apply(pd.to_numeric, errors='coerce')

# Imprimir las primeras filas para verificar que el DataFrame se vea como se espera
print(datos.dtypes)
print(datos.head())

# Guardar el DataFrame en un archivo CSV
ruta_archivo_guardar = 'C:\\Users\\Pedro\\Desktop\\LotoIA\\EuroDreams\\DataFrame_EuroDreams.csv'

# Guardar el DataFrame en un archivo CSV
datos.to_csv(ruta_archivo_guardar, index=False)

# Verificar si el archivo existe
if os.path.exists(ruta_archivo_guardar):
    print("El archivo se ha guardado correctamente.")
else:
    print("Error: El archivo no se ha guardado.")