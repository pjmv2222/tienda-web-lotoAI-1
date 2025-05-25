print("Inicio del script")
import pandas as pd
import numpy as np
from keras.models import Sequential
from keras.layers import LSTM, Dense, Input
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
import sys

if sys.version_info.major >= 3:
    sys.stdout.reconfigure(encoding='utf-8')

# Lectura del archivo CSV ajustada a la nueva estructura
datos = pd.read_csv('C:\\Users\\Pedro\\Desktop\\LotoIA\\LaPrimitiva\\DataFrame_primitiva.csv', encoding='utf-8')
# Imprime los nombres de las columnas para verificar el nombre correcto
print(datos.columns)
# Ajuste de los datos de entrada y salida
X = datos[['Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6', 'Refund']]
y = datos[['Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6', 'Refund']]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler_X = MinMaxScaler()
scaler_y = MinMaxScaler()

scaler_X.fit(X_train)
scaler_y.fit(y_train)

X_train = pd.DataFrame(scaler_X.transform(X_train), columns=X.columns)
X_test = pd.DataFrame(scaler_X.transform(X_test), columns=X.columns)
y_train = pd.DataFrame(scaler_y.transform(y_train), columns=y.columns)
y_test = pd.DataFrame(scaler_y.transform(y_test), columns=y.columns)

X_train_reshaped = X_train.values.reshape(X_train.shape[0], X_train.shape[1], 1)

model = Sequential()
model.add(Input(shape=(X_train_reshaped.shape[1], 1)))
model.add(LSTM(units=50, return_sequences=True))
model.add(LSTM(units=50))
model.add(Dense(units=7))  # Ajuste a 7 unidades para incluir el reintegro

model.compile(optimizer='adam', loss='mean_squared_error')
model.fit(X_train_reshaped, y_train, epochs=20, batch_size=32)

try:
    model.save('modelo_primitiva.h5')
except Exception as e:
    print(f"Error al guardar el modelo: {e}")

modelo = load_model('modelo_primitiva.h5')

predictions = modelo.predict(X_test.values.reshape(X_test.shape[0], X_test.shape[1], 1))
predictions = scaler_y.inverse_transform(predictions)

# Ajuste de predicción y generación de nuevas predicciones según sea necesario
# El resto del código permanece igual, asegurándose de que se ajuste a la nueva estructura de datos

print("Iniciando ajuste de predicción")
def ajustar_prediccion(prediccion):
    numeros, indices = np.unique(prediccion[:6], return_index=True)
    numeros = list(numeros)  # Convertir a lista para permitir la modificación
    reintegro = prediccion[6]  # El reintegro puede repetirse
    contador = 0  # Inicializa el contador

    while len(numeros) < 6:
        print(f"Iteración {contador}")  # Para depuración
        if contador > 100:  # Límite de iteraciones para evitar bucle infinito
            print("Límite de iteraciones alcanzado")  # Para depuración
            break
        nuevo_numero = np.random.randint(1, 50)
        if nuevo_numero not in numeros:
            numeros.append(nuevo_numero)  # Modificación permitida en una lista
        contador += 1  # Incrementa el contador en cada iteración

    numeros_ordenados = sorted(numeros)[:6]  # Asegura tener solo 6 números y ordenados
    
    return np.concatenate((numeros_ordenados, [reintegro]))

predicciones = modelo.predict(X_test.values.reshape(X_test.shape[0], X_test.shape[1], 1))
predicciones = scaler_y.inverse_transform(predicciones)
predicciones_ajustadas = np.array([ajustar_prediccion(prediccion) for prediccion in predicciones])

print(predicciones_ajustadas[:5])

new_inputs = np.random.randint(1, 50, size=(100, 6))
new_reintegro = np.random.randint(0, 10, size=(100, 1))
new_inputs = np.concatenate((new_inputs, new_reintegro), axis=1)

new_inputs_scaled = scaler_X.transform(new_inputs)
new_inputs_reshaped = new_inputs_scaled.reshape(new_inputs_scaled.shape[0], new_inputs_scaled.shape[1], 1)

new_predictions = model.predict(new_inputs_reshaped)
new_predictions = scaler_y.inverse_transform(new_predictions)
new_predictions = np.rint(new_predictions).astype(int)

print(f'Tamaño de new_predictions: {len(new_predictions)}')  # Depuración

for i, prediction in enumerate(new_predictions):
    print(f'Combinación {i+1}: {prediction}')

if len(new_predictions) > 0:
    df = pd.DataFrame(new_predictions, columns=['Num_1', 'Num_2', 'Num_3', 'Num_4', 'Num_5', 'Num_6', 'refund'])
    df.to_csv('C:\\Users\\Pedro\\Desktop\\LotoIA\\LaPrimitiva\\predicciones_primitiva.csv', index=False, encoding='utf-8')
    print(f'Archivo CSV guardado con éxito en C:\\Users\\Pedro\\Desktop\\LotoIA\\LaPrimitiva\\predicciones_primitiva.csv')
else:
    print('No hay predicciones para guardar.')