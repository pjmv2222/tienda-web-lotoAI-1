import pandas as pd
import numpy as np
from keras.models import Sequential
from keras.layers import LSTM, Dense, Input
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
import sys

# Asegurarse de que stdout maneje correctamente la codificación UTF-8
if sys.version_info.major >= 3:
    sys.stdout.reconfigure(encoding='utf-8')

# Lectura del archivo CSV
datos = pd.read_csv('C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\DataFrame_LOTERIA NACIONAL.csv', encoding='utf-8')
print(datos.head())
print(datos.describe())
print(datos.isnull().sum())

# Ajuste de los datos de entrada y salida
X = datos[['Fecha', 'Sorteo', 'Euros']].copy()  # Usamos .copy() para evitar SettingWithCopyWarning
y = datos['Numero']

# Convertir 'Fecha' a timestamp numérico
X['Fecha'] = pd.to_datetime(X['Fecha'], format='%d/%m/%Y').astype('int64') // 10**9

# Asegurarse de que 'Sorteo' sea numérico
X['Sorteo'] = pd.to_numeric(X['Sorteo'], errors='coerce')

# Manejar valores NaN
X = X.dropna()
y = y[X.index]

# Dividimos los datos en entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Inicializamos y ajustamos los escaladores
scaler_X = MinMaxScaler()
scaler_y = MinMaxScaler()
X_train_scaled = scaler_X.fit_transform(X_train)
X_test_scaled = scaler_X.transform(X_test)
y_train_scaled = scaler_y.fit_transform(y_train.values.reshape(-1, 1))
y_test_scaled = scaler_y.transform(y_test.values.reshape(-1, 1))

# Reorganizar los datos
X_train_reshaped = X_train_scaled.reshape(X_train_scaled.shape[0], X_train_scaled.shape[1], 1)

# Crear y configurar el modelo LSTM
model = Sequential([
    Input(shape=(X_train_reshaped.shape[1], 1)),
    LSTM(50, return_sequences=True),
    LSTM(50),
    Dense(1)
])

# Entrenar el modelo
model.compile(optimizer='adam', loss='mean_squared_error')
history = model.fit(X_train_reshaped, y_train_scaled, epochs=20, batch_size=32, validation_split=0.2, verbose=1)

# Guardar el modelo
model.save('C:/Users/Pedro/Desktop/LotoIA/LOTERIA NACIONAL/modelo_LoteriaNacional.h5')

# Hacer predicciones
X_test_reshaped = X_test_scaled.reshape(X_test_scaled.shape[0], X_test_scaled.shape[1], 1)
predictions_scaled = model.predict(X_test_reshaped)
predictions = scaler_y.inverse_transform(predictions_scaled)

# Función para ajustar las predicciones a números de 5 dígitos
def ajustar_prediccion(prediccion):
    return int(np.clip(prediccion, 0, 99999))

# Ajustar las predicciones
predicciones_ajustadas = np.array([ajustar_prediccion(pred[0]) for pred in predictions if not np.isnan(pred[0])])

print("Muestra de predicciones ajustadas:", predicciones_ajustadas[:5])

# Generar 100 nuevas entradas aleatorias
new_inputs = np.random.rand(100, 3)  # 3 columnas: Fecha, Sorteo, Euros
new_inputs_scaled = scaler_X.transform(new_inputs)
new_inputs_reshaped = new_inputs_scaled.reshape(new_inputs_scaled.shape[0], new_inputs_scaled.shape[1], 1)

# Hacer predicciones
new_predictions_scaled = model.predict(new_inputs_reshaped)
new_predictions = scaler_y.inverse_transform(new_predictions_scaled)
new_predictions_adjusted = np.array([ajustar_prediccion(pred[0]) for pred in new_predictions if not np.isnan(pred[0])])

# Imprimir las predicciones
for i, prediction in enumerate(new_predictions_adjusted):
    print(f'Predicción {i+1}: {prediction:05d}')

# Crear un DataFrame con las predicciones
df = pd.DataFrame(new_predictions_adjusted, columns=['Numero'])

# Definir Métricas de Evaluación Personalizadas
def calcular_precision(predicciones, reales):
    predicciones = predicciones.astype(int)
    reales = reales.astype(int)
    aciertos = (predicciones == reales).sum()
    return aciertos / len(predicciones)

# Aplicar las Métricas al Conjunto de Test
y_test_int = y_test.astype(int)
precision = calcular_precision(predicciones_ajustadas, y_test_int[:len(predicciones_ajustadas)])

print(f'Precisión del modelo: {precision}')

# Guardar las predicciones
df.to_csv('predicciones-LoteriaNacional.csv', index=False)
datos.to_csv('C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\LoteriaNacional_Predicciones.csv', index=False, encoding='utf-8')