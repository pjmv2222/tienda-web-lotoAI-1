import pandas as pd

# Paso 2: Cargar el archivo CSV
df = pd.read_csv('C:\\Users\\Pedro\\Desktop\\LotoIA\\Lototurf\\DataFrame_Lototurf.csv', encoding='utf-8')

# Paso 3 y 4: Identificar y contar los valores NaN
nan_count = df.isna().sum()

print(nan_count)# Filtrar las filas donde la columna 'Horse' tiene valores NaN
filas_con_nan = df[df['Horse'].isna()]

# Acceder a los índices de esas filas y imprimirlos
indices_filas_con_nan = filas_con_nan.index

print(indices_filas_con_nan)