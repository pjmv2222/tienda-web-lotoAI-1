import pandas as pd
import numpy as np
from keras.models import Sequential
from keras.layers import LSTM, Dense, Input
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
import sys  # Importar sys

# Asegurarse de que stdout maneje correctamente la codificación UTF-8
if sys.version_info.major >= 3:
    sys.stdout.reconfigure(encoding='utf-8')

# Carga de datos con especificación de codificación UTF-8
import os
# Usar ruta relativa para que funcione tanto en local como en la VPS
datos = pd.read_csv(os.path.join(os.path.dirname(__file__), 'DataFrame_Euromillones.csv'), encoding='utf-8')
# Verificar los primeros registros para entender la estructura de los datos
print(datos.head())

# Estadísticas descriptivas
print(datos.describe())

# Verificación de valores faltantes
print(datos.isnull().sum())

# Seleccionamos las columnas de interés para las entradas y las salidas
X = datos[['Num_1', 'Num_2', 'Num_3', 'Num_4', 'Num_5', 'Start_1', 'Star_2']]
y = datos[['Num_1', 'Num_2', 'Num_3', 'Num_4', 'Num_5', 'Start_1', 'Star_2']]

# Dividimos los datos en entrenamiento y prueba (80% entrenamiento, 20% prueba)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Inicializamos el escalador
scaler_X = MinMaxScaler()
scaler_y = MinMaxScaler()

# Ajustamos los escaladores
scaler_X.fit(X_train)
scaler_y.fit(y_train)

# Transformamos los datos
X_train = pd.DataFrame(scaler_X.transform(X_train), columns=X.columns)
X_test = pd.DataFrame(scaler_X.transform(X_test), columns=X.columns)
y_train = pd.DataFrame(scaler_y.transform(y_train), columns=y.columns)
y_test = pd.DataFrame(scaler_y.transform(y_test), columns=y.columns)

# Reorganizar los datos
X_train_reshaped = X_train.values.reshape(X_train.shape[0], X_train.shape[1], 1)  # Asumiendo que tienes un solo valor por paso de tiempo

# Crear y configurar el modelo LSTM
model = Sequential()
model.add(Input(shape=(X_train_reshaped.shape[1], 1)))
model.add(LSTM(units=50, return_sequences=True))
model.add(LSTM(units=50))
model.add(Dense(units=7))  # 7 números a predecir

# Entrenar el modelo
model.compile(optimizer='adam', loss='mean_squared_error')
model.fit(X_train_reshaped, y_train, epochs=20, batch_size=32)

# Guardar el modelo
model_path = os.path.join(os.path.dirname(__file__), 'modelo_euromillon.h5')
model.save(model_path)

# Cargar el modelo
modelo = load_model(model_path)

# Hacer predicciones
predictions = model.predict(X_test.values.reshape(X_test.shape[0], X_test.shape[1], 1))
# Desnormalizamos las predicciones para obtener los números reales
predictions = scaler_y.inverse_transform(predictions)
# Ya hemos cargado el modelo anteriormente, no es necesario volver a cargarlo

# Función para ajustar las predicciones y asegurar que no haya duplicados
def ajustar_prediccion(prediccion):
    # Asegurar que los números principales (5 primeros números) no tengan duplicados
    numeros_principales = np.unique(prediccion[:5], return_index=True)
    # Asegurar que las estrellas (últimos 2 números) no tengan duplicados
    estrellas = np.unique(prediccion[5:], return_index=True)

    # Si hay duplicados, rellenar hasta tener la cantidad necesaria
    while len(numeros_principales[0]) < 5:
        nuevo_numero = np.random.randint(1, 51)
        if nuevo_numero not in numeros_principales[0]:
            numeros_principales[0] = np.append(numeros_principales[0], nuevo_numero)
            numeros_principales[1] = np.append(numeros_principales[1], -1)  # -1 como marcador de posición

    while len(estrellas[0]) < 2:
        nueva_estrella = np.random.randint(1, 13)
        if nueva_estrella not in estrellas[0]:
            estrellas[0] = np.append(estrellas[0], nueva_estrella)
            estrellas[1] = np.append(estrellas[1], -1)  # -1 como marcador de posición

    # Ordenar los números principales y las estrellas por su índice original para mantener el orden
    numeros_principales_ordenados = numeros_principales[0][np.argsort(numeros_principales[1])]
    estrellas_ordenadas = estrellas[0][np.argsort(estrellas[1])]

    # Combinar y retornar la predicción ajustada
    return np.concatenate((numeros_principales_ordenados, estrellas_ordenadas))

# Generar predicciones con el modelo
predicciones = modelo.predict(X_test)
model.fit(X_train_reshaped, y_train, epochs=20, batch_size=32, verbose=2)
# Ajustar las predicciones para asegurar que no haya duplicados
predicciones_ajustadas = np.array([ajustar_prediccion(prediccion) for prediccion in predicciones])

# Imprimir una muestra de las predicciones ajustadas
print(predicciones_ajustadas[:5])

# Generar 100 nuevas entradas aleatorias en el rango correcto
new_inputs = np.random.randint(1, 51, size=(100, 5))  # Para Num_1 a Num_5
new_stars = np.random.randint(1, 13, size=(100, 2))  # Para Star_1 y Star_2
new_inputs = np.concatenate((new_inputs, new_stars), axis=1)

# Normalizar las nuevas entradas
new_inputs_scaled = scaler_X.transform(new_inputs)

# Reformatear las nuevas entradas para que coincidan con el formato de entrada del modelo
new_inputs_reshaped = new_inputs_scaled.reshape(new_inputs_scaled.shape[0], new_inputs_scaled.shape[1], 1)

# Hacer predicciones
new_predictions = model.predict(new_inputs_reshaped)

# Desnormalizar las predicciones para obtener los números reales
new_predictions = scaler_y.inverse_transform(new_predictions)

# Redondear las predicciones y convertirlas a enteros
new_predictions = np.rint(new_predictions).astype(int)

# Imprimir las predicciones
for i, prediction in enumerate(new_predictions):
    try:
         print(f'Combinación {i+1}: {prediction}'.encode('utf-8').decode('cp850', 'replace'))
    except UnicodeEncodeError as e:
        print(f'Combinación {i+1}: [Error al imprimir caracteres especiales: {e}]')

# Crear un DataFrame con las predicciones
df = pd.DataFrame(new_predictions, columns=['Num_1', 'Num_2', 'Num_3', 'Num_4', 'Num_5', 'Star_1', 'Star_2'])

# Paso 1: Definir Métricas de Evaluación Personalizadas
def calcular_precision(predicciones, reales):
    # Inicializar contadores
    total_aciertos_numeros = 0
    total_aciertos_estrellas = 0
    total_predicciones = len(predicciones)

    # Iterar sobre el conjunto de predicciones y reales
    for pred, real in zip(predicciones, reales):
        # Comparar números (primeros 5 valores)
        aciertos_numeros = len(set(pred[:5]) & set(real[:5]))
        total_aciertos_numeros += aciertos_numeros

        # Comparar estrellas (últimos 2 valores)
        aciertos_estrellas = len(set(pred[5:]) & set(real[5:]))
        total_aciertos_estrellas += aciertos_estrellas

    # Calcular métricas
    precision_media_numeros = total_aciertos_numeros / total_predicciones
    precision_media_estrellas = total_aciertos_estrellas / total_predicciones

    return precision_media_numeros, precision_media_estrellas

# Paso 2: Aplicar las Métricas al Conjunto de Test
# Asegurarse de que las predicciones y los valores reales estén en el formato correcto
predicciones_ajustadas_int = np.rint(new_predictions).astype(int)
# Aquí necesitarás tener acceso a y_test o a los valores reales para comparar
y_test_int = np.rint(scaler_y.inverse_transform(y_test)).astype(int)

# Calcular la precisión
precision_numeros, precision_estrellas = calcular_precision(predicciones_ajustadas_int, y_test_int)

# Paso 3: Reportar los Resultados
print(f'Precisión media de números acertados por predicción: {precision_numeros}')
print(f'Precisión media de estrellas acertadas por predicción: {precision_estrellas}')
# Guardar el DataFrame en un archivo CSV
df.to_csv(os.path.join(os.path.dirname(__file__), 'predicciones.csv'), index=False)

# Al final de tu script, para guardar el DataFrame 'datos' (o el DataFrame que desees guardar) en un archivo CSV, especificando la codificación UTF-8
datos.to_csv(os.path.join(os.path.dirname(__file__), 'Euromillones_Predicciones.csv'), index=False, encoding='utf-8')