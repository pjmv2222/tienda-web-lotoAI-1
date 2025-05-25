import pandas as pd

# Ruta al archivo CSV
ruta_archivo = 'C:\\Users\\Pedro\\Desktop\\LotoIA\\LaPrimitiva\\Histórico-Resultados-Primitiva.csv'

# Cargar el archivo CSV en un DataFrame de Pandas
datos = pd.read_csv(ruta_archivo, encoding='utf-8', skiprows=1, sep=';')
datos.columns = ['Date', 'Num_1', 'Num_2', 'Num_3', 'Num_4', 'Num_5', 'Num_6', 'refund']  # Cambiado 'Refund' a 'refund'

# Convertir las columnas numéricas a tipo numérico
columnas_numericas = ['Num_1', 'Num_2', 'Num_3', 'Num_4', 'Num_5', 'Num_6', 'refund']  # Cambiado 'Refund' a 'refund'
datos[columnas_numericas] = datos[columnas_numericas].apply(pd.to_numeric, errors='coerce')

# Opcional: Convertir la columna 'Date' a datetime
datos['Date'] = pd.to_datetime(datos['Date'], format='%d/%m/%Y', errors='coerce')

# Verificar los tipos de datos de las columnas
print(datos.dtypes)

# Imprimir las primeras filas para verificar que el DataFrame se vea como se espera
print(datos.head())
datos.to_csv('C:\\Users\\Pedro\\Desktop\\LotoIA\\LaPrimitiva\\DataFrame_primitiva.csv', index=False)
import os

# Ruta del archivo CSV
ruta_archivo = 'C:\\Users\\Pedro\\Desktop\\LotoIA\\LaPrimitiva\\DataFrame_primitiva.csv'

# Guardar el DataFrame en un archivo CSV
datos.to_csv(ruta_archivo, index=False)

# Verificar si el archivo existe
if os.path.exists(ruta_archivo):
    print("El archivo se ha guardado correctamente.")
else:
    print("Error: El archivo no se ha guardado.")