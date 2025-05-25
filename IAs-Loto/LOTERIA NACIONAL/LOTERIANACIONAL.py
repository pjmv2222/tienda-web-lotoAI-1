import tensorflow as tf
import pandas as pd
import numpy as np

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Input
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from keras.utils import to_categorical
import sys

# Asegurarse de que stdout maneje correctamente la codificación UTF-8
if sys.version_info.major >= 3:
    sys.stdout.reconfigure(encoding='utf-8')

# Lectura del archivo CSV
import os
# Usar ruta relativa para que funcione tanto en local como en la VPS
datos = pd.read_csv(os.path.join(os.path.dirname(__file__), 'DataFrame_LOTERIA NACIONAL.csv'), encoding='utf-8')
print(datos.head())
print(datos.describe())
print(datos.isnull().sum())

# Ajuste de los datos de entrada y salida
X = datos[['Fecha', 'Sorteo', 'Euros']].copy()
y = datos['Numero'].astype(str).str.zfill(5)  # Asegurarse de que todos los números tengan 5 dígitos

# Convertir 'Fecha' a timestamp numérico
X['Fecha'] = pd.to_datetime(X['Fecha'], format='%d/%m/%Y').astype('int64') // 10**9

# Asegurarse de que 'Sorteo' sea numérico
X['Sorteo'] = pd.to_numeric(X['Sorteo'], errors='coerce')

# Manejar valores NaN
X = X.dropna()
y = y[X.index]

# Dividir el número en dígitos individuales
y_digits = np.array([list(map(int, num)) for num in y])

# Dividimos los datos en entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(X, y_digits, test_size=0.2, random_state=42)

# Inicializamos y ajustamos el escalador para X
scaler_X = MinMaxScaler()
X_train_scaled = scaler_X.fit_transform(X_train)
X_test_scaled = scaler_X.transform(X_test)

# Reorganizar los datos
X_train_reshaped = X_train_scaled.reshape(X_train_scaled.shape[0], X_train_scaled.shape[1], 1)
X_test_reshaped = X_test_scaled.reshape(X_test_scaled.shape[0], X_test_scaled.shape[1], 1)

# Crear y configurar el modelo LSTM
model = Sequential([
    Input(shape=(X_train_reshaped.shape[1], 1)),
    LSTM(100, return_sequences=True),
    LSTM(50),
    Dense(250, activation='relu'),
    Dense(5 * 10, activation='softmax')  # 5 dígitos, cada uno con 10 posibles valores
])

# Entrenar el modelo
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
y_train_cat = to_categorical(y_train).reshape(y_train.shape[0], -1)
history = model.fit(X_train_reshaped, y_train_cat, epochs=50, batch_size=32, validation_split=0.2, verbose=1)

# Guardar el modelo
model_path = os.path.join(os.path.dirname(__file__), 'modelo_LoteriaNacional.h5')
model.save(model_path)

# Función para generar predicciones con ruido
def predict_with_noise(model, X, noise_level=0.1):
    predictions = model.predict(X)
    predictions = predictions.reshape(-1, 5, 10)
    noisy_predictions = predictions + np.random.normal(0, noise_level, predictions.shape)
    return np.argmax(noisy_predictions, axis=2)

# Hacer predicciones en el conjunto de prueba
test_predictions = predict_with_noise(model, X_test_reshaped)

# Función para calcular la precisión por dígito
def calcular_precision_por_digito(predicciones, reales):
    return np.mean(predicciones == reales, axis=0)

# Calcular y mostrar la precisión por dígito
precision_por_digito = calcular_precision_por_digito(test_predictions, y_test)
for i, precision in enumerate(precision_por_digito):
    print(f'Precisión para el dígito {i+1}: {precision:.4f}')

# Generar 100 nuevas entradas aleatorias
new_inputs = np.random.rand(100, 3)  # 3 columnas: Fecha, Sorteo, Euros
new_inputs_scaled = scaler_X.transform(new_inputs)
new_inputs_reshaped = new_inputs_scaled.reshape(new_inputs_scaled.shape[0], new_inputs_scaled.shape[1], 1)

# Hacer predicciones con ruido
new_predictions = predict_with_noise(model, new_inputs_reshaped)

# Imprimir las predicciones
for i, prediction in enumerate(new_predictions):
    print(f'Predicción {i+1}: {"".join(map(str, prediction))}')

# Crear un DataFrame con las predicciones
df = pd.DataFrame(["".join(map(str, pred)) for pred in new_predictions], columns=['Numero'])

# Guardar las predicciones
df.to_csv(os.path.join(os.path.dirname(__file__), 'predicciones-LoteriaNacional.csv'), index=False)
datos.to_csv(os.path.join(os.path.dirname(__file__), 'LoteriaNacional_Predicciones.csv'), index=False, encoding='utf-8')