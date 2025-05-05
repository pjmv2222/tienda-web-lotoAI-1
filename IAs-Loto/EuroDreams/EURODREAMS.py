# Inicio del scripts
import random
import pandas as pd
import numpy as np
from keras.models import Sequential, load_model
from keras.layers import LSTM, Dense, Input
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from datetime import datetime
import sys

if sys.version_info.major >= 3:
    sys.stdout.reconfigure(encoding='utf-8')

import os
# Usar ruta relativa para que funcione tanto en local como en la VPS
df = pd.read_csv(os.path.join(os.path.dirname(__file__), 'DataFrame_EuroDreams.csv'), encoding='utf-8')

df['Date'] = pd.to_datetime(df['Date'])
reference_date = pd.Timestamp('2000-01-01')
df['DaysSince'] = (df['Date'] - reference_date).dt.days

features = df[['DaysSince', 'Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6']]

X = df[['DaysSince', 'Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6']]
y = df[['Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6', 'Dream']]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler_X = StandardScaler()
scaler_y = StandardScaler()

scaler_X.fit(X_train)
X_train = pd.DataFrame(scaler_X.transform(X_train), columns=X.columns)
X_test = pd.DataFrame(scaler_X.transform(X_test), columns=X.columns)

scaler_y.fit(y_train)
y_train = pd.DataFrame(scaler_y.transform(y_train), columns=y.columns)
y_test = pd.DataFrame(scaler_y.transform(y_test), columns=y.columns)

X_train_reshaped = X_train.values.reshape(X_train.shape[0], X_train.shape[1], 1)

model = Sequential()
model.add(Input(shape=(X_train_reshaped.shape[1], 1)))
model.add(LSTM(units=40, return_sequences=True))
model.add(LSTM(units=40))
model.add(Dense(units=7))

model.compile(optimizer='adam', loss='mean_squared_error')
model.fit(X_train_reshaped, y_train, epochs=20, batch_size=32)

# Guardar el modelo
model_path = os.path.join(os.path.dirname(__file__), 'modelo_EuroDreams.h5')
model.save(model_path)

# Cargar el modelo
modelo = load_model(model_path)

predictions = modelo.predict(X_test.values.reshape(X_test.shape[0], X_test.shape[1], 1))
predictions = scaler_y.inverse_transform(predictions)

# El resto del script permanece sin cambios.
# Ajuste de las predicciones
def ajustar_prediccion(prediccion):
    numeros_principales, indices_principales = np.unique(prediccion[:6], return_index=True)
    Dream, indice_Dream = np.unique(prediccion[6:], return_index=True)
    numeros_principales_ordenados = numeros_principales[np.argsort(indices_principales)]
    Dream_ordenados = Dream[np.argsort(indice_Dream)]
    return np.concatenate((numeros_principales_ordenados, Dream_ordenados))

predicciones_ajustadas = np.array([ajustar_prediccion(prediccion) for prediccion in predictions])
print(predicciones_ajustadas[:5])

# Generación de nuevas entradas para predicciones
new_inputs = np.random.randint(1, 32, size=(100, 6))
new_stars = np.random.randint(1, 13, size=(100, 1))
new_inputs = np.concatenate((new_inputs, new_stars), axis=1)

new_inputs_scaled = scaler_X.transform(new_inputs)
new_inputs_reshaped = new_inputs_scaled.reshape(new_inputs_scaled.shape[0], new_inputs_scaled.shape[1], 1)

# Predicciones con nuevas entradas
new_predictions = modelo.predict(new_inputs_reshaped)
new_predictions = scaler_y.inverse_transform(new_predictions)
new_predictions = np.rint(new_predictions).astype(int)

for i, prediction in enumerate(new_predictions):
    print(f'Combinación {i+1}: {prediction}')

# Guardar las nuevas predicciones en un DataFrame y exportar a CSV
df = pd.DataFrame(new_predictions, columns=['Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6', 'Dream'])
df.to_csv(os.path.join(os.path.dirname(__file__), 'predicciones-EuroDreams.csv'), index=False)

# Función para calcular el porcentaje de aciertos
def calcular_porcentaje_combinaciones_acertadas(predicciones, reales):
    aciertos_exactos = sum([1 for pred, real in zip(predicciones, reales) if np.array_equal(pred, real)])
    porcentaje_aciertos = (aciertos_exactos / len(predicciones)) * 100
    return porcentaje_aciertos

predicciones_ajustadas_int = np.rint(predictions).astype(int)
y_test_int = np.rint(scaler_y.inverse_transform(y_test)).astype(int)

porcentaje_combinaciones_acertadas = calcular_porcentaje_combinaciones_acertadas(predicciones_ajustadas_int, y_test_int)
print(f'Porcentaje de combinaciones acertadas exactas: {porcentaje_combinaciones_acertadas}%')

# Asumiendo que `predicciones_ajustadas` es un ndarray de numpy y quieres guardarlo como CSV
# Primero, convierte `predicciones_ajustadas` a un DataFrame de pandas
datos = pd.DataFrame(predicciones_ajustadas, columns=['Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6', 'Dream'])


# Exportar los datos originales con predicciones ajustadas
datos.to_csv(os.path.join(os.path.dirname(__file__), 'EuroDreams_Predicciones.csv'), index=False, encoding='utf-8')