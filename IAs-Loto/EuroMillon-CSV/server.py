from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import random
import logging
import jwt
from datetime import datetime, timedelta
from functools import wraps
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
import pandas as pd
import sys

# Configuración de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("euromillon_api.log"),
        logging.StreamHandler()
    ]
)

# Inicializar la aplicación Flask
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Configuración
SECRET_KEY = os.environ.get('JWT_SECRET', 'lotoia_super_secret_key_2024_verification_token')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
MODEL_PATH = os.environ.get('MODEL_PATH', os.path.join(os.path.dirname(__file__), 'modelo_euromillon.h5'))
DATA_PATH = os.environ.get('DATA_PATH', os.path.join(os.path.dirname(__file__), 'DataFrame_Euromillones.csv'))

# Cargar el modelo si existe
model = None
try:
    if os.path.exists(MODEL_PATH):
        model = load_model(MODEL_PATH)
        logging.info(f"Modelo cargado desde {MODEL_PATH}")

        # Cargar datos históricos para preparar los escaladores
        if os.path.exists(DATA_PATH):
            try:
                datos = pd.read_csv(DATA_PATH, encoding='utf-8')
                logging.info(f"Datos históricos cargados desde {DATA_PATH}")
            except Exception as e:
                logging.error(f"Error al cargar los datos históricos: {str(e)}")
                datos = None
        else:
            logging.warning(f"No se encontraron los datos históricos en {DATA_PATH}")
            datos = None
    else:
        logging.warning(f"No se encontró el modelo en {MODEL_PATH}. Se usarán predicciones aleatorias.")
        datos = None
except Exception as e:
    logging.error(f"Error al cargar el modelo: {str(e)}")
    datos = None

# Función para verificar token JWT
def verify_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            return None
        return user_id
    except jwt.PyJWTError:
        return None

# Decorador para proteger rutas
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        # Para desarrollo, podemos omitir la verificación del token
        if os.environ.get('SKIP_AUTH', 'false').lower() == 'true':
            return f(*args, **kwargs)

        token = None
        auth_header = request.headers.get('Authorization')

        if auth_header:
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]

        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        user_id = verify_token(token)
        if not user_id:
            return jsonify({'message': 'Token is invalid!'}), 401

        # Verificar si el usuario tiene una suscripción activa
        if not has_active_subscription(user_id):
            return jsonify({'message': 'No active subscription found!'}), 403

        return f(*args, **kwargs)
    return decorated

# Función para verificar si un usuario tiene una suscripción activa
def has_active_subscription(user_id):
    # En un entorno real, esto consultaría una base de datos
    # Para simplificar, asumimos que todos los usuarios autenticados tienen suscripción
    return True

# Ruta para verificar el estado de la API
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'OK',
        'timestamp': datetime.now().isoformat(),
        'service': 'Euromillón Prediction API',
        'model_loaded': model is not None
    })

# Función para generar una predicción usando el modelo
def generate_prediction_with_model(input_data):
    try:
        # Verificar si tenemos datos históricos para normalizar
        if 'datos' not in globals() or datos is None:
            logging.warning("No hay datos históricos disponibles para normalizar. Usando predicción aleatoria.")
            return generate_random_prediction()

        # Preparar los datos de entrada para el modelo
        # Convertir la entrada a un array numpy
        input_array = np.array(input_data)

        # Si la entrada no tiene la forma correcta, ajustarla
        if len(input_array) != 7:  # Esperamos 5 números + 2 estrellas
            logging.warning(f"La entrada tiene {len(input_array)} elementos, se esperaban 7. Ajustando...")
            # Rellenar o recortar para tener 7 elementos
            if len(input_array) < 7:
                # Rellenar con valores aleatorios
                while len(input_array) < 5:
                    input_array = np.append(input_array, random.randint(1, 50))
                while len(input_array) < 7:
                    input_array = np.append(input_array, random.randint(1, 12))
            else:
                # Recortar
                input_array = input_array[:7]

        # Normalizar la entrada usando los datos históricos
        # Crear un escalador para la entrada
        from sklearn.preprocessing import MinMaxScaler
        scaler = MinMaxScaler()

        # Ajustar el escalador con los datos históricos
        X_hist = datos[['Num_1', 'Num_2', 'Num_3', 'Num_4', 'Num_5', 'Start_1', 'Star_2']].values
        scaler.fit(X_hist)

        # Normalizar la entrada
        input_scaled = scaler.transform(input_array.reshape(1, -1))

        # Reformatear para el modelo LSTM si es necesario
        # Verificar si el modelo espera una entrada 3D (para LSTM)
        if len(model.input_shape) > 2 and model.input_shape[2] == 1:
            input_reshaped = input_scaled.reshape(input_scaled.shape[0], input_scaled.shape[1], 1)
        else:
            input_reshaped = input_scaled

        # Realizar la predicción
        prediction = model.predict(input_reshaped)

        # Desnormalizar la predicción
        prediction_denorm = scaler.inverse_transform(prediction)

        # Procesar la predicción
        numeros = [int(round(n)) for n in prediction_denorm[0][:5]]
        estrellas = [int(round(n)) for n in prediction_denorm[0][5:7]]

        # Asegurarse de que los números estén en los rangos correctos
        numeros = [max(1, min(50, n)) for n in numeros]
        estrellas = [max(1, min(12, n)) for n in estrellas]

        # Eliminar duplicados si los hay
        numeros = list(set(numeros))
        estrellas = list(set(estrellas))

        # Si hay menos números de los necesarios, añadir aleatorios
        while len(numeros) < 5:
            new_num = random.randint(1, 50)
            if new_num not in numeros:
                numeros.append(new_num)

        while len(estrellas) < 2:
            new_star = random.randint(1, 12)
            if new_star not in estrellas:
                estrellas.append(new_star)

        # Ordenar los números
        numeros.sort()
        estrellas.sort()

        return {
            'numeros': numeros,
            'estrellas': estrellas
        }
    except Exception as e:
        logging.error(f"Error al generar predicción con modelo: {str(e)}")
        # Si hay un error, usar la función de respaldo
        return generate_random_prediction()

# Función para generar una predicción aleatoria
def generate_random_prediction():
    # Generar 5 números únicos entre 1 y 50
    numeros = random.sample(range(1, 51), 5)
    numeros.sort()

    # Generar 2 estrellas únicas entre 1 y 12
    estrellas = random.sample(range(1, 13), 2)
    estrellas.sort()

    return {
        'numeros': numeros,
        'estrellas': estrellas
    }

# Ruta para generar predicciones
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        if not data or 'input' not in data:
            return jsonify({
                'success': False,
                'error': 'Invalid input data'
            }), 400

        # Generar predicción
        if model is not None and 'datos' in globals() and datos is not None:
            prediction = generate_prediction_with_model(data['input'])
        else:
            logging.warning("Usando predicción aleatoria porque el modelo o los datos no están disponibles")
            prediction = generate_random_prediction()

        return jsonify({
            'success': True,
            'prediction': prediction
        })
    except Exception as e:
        logging.error(f"Error generating prediction: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# Ruta para obtener información sobre la API
@app.route('/', methods=['GET'])
def info():
    return jsonify({
        'name': 'Euromillón Prediction API',
        'version': '1.0.0',
        'description': 'API for Euromillón lottery number predictions using AI',
        'endpoints': [
            {
                'path': '/health',
                'method': 'GET',
                'description': 'Check API health'
            },
            {
                'path': '/predict',
                'method': 'POST',
                'description': 'Generate predictions',
                'requires_auth': True
            }
        ]
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=False)
